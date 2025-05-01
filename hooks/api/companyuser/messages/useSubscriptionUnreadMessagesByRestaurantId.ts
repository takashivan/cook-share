import { getApi } from "@/api/api-factory"
import useSWR from "swr"
import { QueryConfigType } from "../../config-type";
import { Chat } from "@/api/__generated__/base/Chat";
import useSWRSubscription from "swr/subscription";
import { XanoRealtimeChannel } from "@xano/js-sdk/lib/models/realtime-channel";
import realTimeClient from "@/api/xano";

// XANOから生成されるSwaggerの定義が不完全なため、レスポンスの型を手動で定義する
export interface UnreadMessage {
  id: number;
  created_at: number;
  content: string;
  is_read: boolean;
  updated_at: number;
  application_id: string;
  chef_id: string;
  sender_type: 'restaurant' | 'chef';
  restaurant_id: number | null;
  worksession_id: number;
  message_seq: number;
}

// 企業ユーザー画面用の未読メッセージサマリー
export interface UnreadMessageSummary {
  unread_messages: UnreadMessage[];
  unread_message_count: number;
}

export interface Params {
  restaurantId?: number;
}

export const useSubscriptionUnreadMessagesByRestaurantId = (params: Params, config?: QueryConfigType) => {
  const { dedupingInterval } = config || {};
  const chat = getApi(Chat);
  const channelKey = `restaurant_chat/${params.restaurantId}`;

  const [key, fetcher] = chat.unreadSummaryRestaurantDetailQueryArgs(params.restaurantId ?? -1, {
    headers: {
      "X-User-Type": "company"
    }
  }, params.restaurantId != null);

  const getRequest = useSWR(
    key,
    fetcher as unknown as () => Promise<UnreadMessageSummary[]>,
    {
      dedupingInterval
    }
  );

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

  return {
    unreadMessagesData: getRequest.data,
    mutateUnreadMessages: getRequest.mutate,
  };
}
