import { getApi } from "@/api/api-factory";
import { QueryConfigType } from "../config-type";
import useSWR from "swr";
import useSWRSubscription from 'swr/subscription';
import { Messages } from "@/api/__generated__/base/Messages";
import { MessagesCreatePayload } from "@/api/__generated__/base/data-contracts";
import realTimeClient from "@/api/xano";
import { Companyusers } from "@/api/__generated__/base/Companyusers";
import { XanoRealtimeChannel } from "@xano/js-sdk/lib/models/realtime-channel";

export interface Params {
  companyUserId?: string;
  workSessionId?: number;
  applicationId?: string;
}

export const useSubscriptionMessagesByCompanyUserId = (params: Params, config?: QueryConfigType) => {
  const { dedupingInterval } = config || {};
  const companyusersApi = getApi(Companyusers);
  const messagesApi = getApi(Messages);
  const channelKey = `worksession/${params.workSessionId}`;

  const [key, fetcher] = companyusersApi.worksessionsMessagesListQueryArgs(params.companyUserId ?? '', params.workSessionId ?? -1, {
    headers: {
      "X-User-Type": "company"
    }
  }, params.companyUserId != null && params.workSessionId != null);

  const getRequest = useSWR(key, fetcher, {
    dedupingInterval
  });

  useSWRSubscription(
    key,
    ([_key], { next }) => {
      if (!key) return;

      let channel: XanoRealtimeChannel;
      try {
        channel = realTimeClient.channel(channelKey);
        console.log("Channel setup for key:", channelKey);

        // メッセージの購読
        channel.on((message: any) => {
          console.log("Received message:", message);
          getRequest.mutate();
          next();
        });
      } catch (error) {
        console.error("Error setting up channel:", error);
      }

      return () => {
        try {
          if (channel) {
            channel.destroy();
          }
        } catch (error) {
          console.error("Error destroying channel:", error);
        }
      };
    },
  )

  const sendMessage = async (message: string) => {
    if (!message.trim() || !key || !params.workSessionId || !params.applicationId) return;

    try {
      const messageParams: MessagesCreatePayload = {
        content: message,
        worksession_id: params.workSessionId,
        application_id: params.applicationId,
        sender_type: "restaurant",
      };

      await messagesApi.messagesCreate(messageParams, {
        headers: {
          "X-User-Type": "company"
        }
      });

      const channel = realTimeClient.channel(channelKey);
      channel.message(messageParams);

      getRequest.mutate();
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  return {
    messagesData: getRequest.data,
    mutateMessages: getRequest.mutate,
    sendMessage,
  };
}
