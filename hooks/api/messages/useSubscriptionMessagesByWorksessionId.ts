import { getApi } from "@/api/api-factory";
import { QueryConfigType } from "../config-type";
import { Worksessions } from "@/api/__generated__/base/Worksessions";
import useSWR from "swr";
import useSWRSubscription from 'swr/subscription';
import { Messages } from "@/api/__generated__/base/Messages";
import { MessagesCreatePayload } from "@/api/__generated__/base/data-contracts";
import realTimeClient from "@/api/xano";

export interface Params {
  workSessionId?: number;
  applicationId?: string;
  userType?: "chef" | "company";
}

export const useSubscriptionMessagesByWorksessionId = (params: Params, config?: QueryConfigType) => {
  const { dedupingInterval } = config || {};
  const worksessionsApi = getApi(Worksessions);
  const messagesApi = getApi(Messages);
  const channelKey = `worksession/${params.workSessionId}`;

  const [key, fetcher] = worksessionsApi.messagesListQueryArgs(params.workSessionId ?? -1, {
    headers: {
      "X-User-Type": params.userType ?? "chef"
    }
  }, params.workSessionId != null);

  const getRequest = useSWR(key, fetcher, {
    dedupingInterval
  });

  useSWRSubscription(
    key,
    ([_key], { next }) => {
      if (!key) return;

      const channel = realTimeClient.channel(channelKey);
      console.log("Channel setup for key:", channelKey);

      // メッセージの購読
      channel.on((message: any) => {
        console.log("Received message:", message);
        getRequest.mutate();
        next();
      });

      return () => {
        channel.destroy();
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
        sender_type: params.userType === "chef" ? "chef" : "restaurant",
      };

      await messagesApi.messagesCreate(messageParams, {
        headers: {
          "X-User-Type": params.userType ?? "chef"
        }
      });

      const channel = realTimeClient.channel(channelKey);
      channel.message(messageParams);

      getRequest.mutate(); // 手動で再取得
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  return {
    messages: getRequest.data,
    mutateMessages: getRequest.mutate,
    sendMessage,
  };
}