import { getApi } from "@/api/api-factory"
import useSWR from "swr"
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

export const useSubscriptionUnreadMessagesByRestaurantId = (params: Params) => {
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
  );

  useSWRSubscription(
    key,
    ([_key], { next }) => {
      if (!key) return;

      let channel: XanoRealtimeChannel | null = null;
      let cleanup = () => {};

      const setupChannel = async () => {
        try {
          // 接続を待機
          while (!channel) {
            try {
              channel = realTimeClient.channel(channelKey);
              // チャンネルが作成されたら、メッセージの購読を開始
              channel.on((message: any) => {
                console.log("Received message:", message);
                if (message.action === "error") {
                  console.error("Channel error:", message.payload);
                  // エラーが発生した場合、一定時間後に再試行
                  setTimeout(() => {
                    console.log("Retrying channel setup...");
                    getRequest.mutate();
                  }, 5000);
                } else if (message.action === "connection_status") {
                  return;
                } else {
                  getRequest.mutate();
                  next();
                }
              });
              break; // チャンネルが作成され、メッセージの購読が開始されたらループを抜ける
            } catch (error) {
              await new Promise((resolve) => setTimeout(resolve, 100));
            }
          }

          console.log("Channel setup for key:", channelKey);

          // クリーンアップ関数を設定
          cleanup = () => {
            try {
              if (channel) {
                // チャンネルへの参照を解除
                channel = null;
              }
            } catch (error) {
              console.error("Error in cleanup:", error);
            }
          };
        } catch (error) {
          console.error("Error setting up channel:", error);
        }
      };

      setupChannel();

      // 常にクリーンアップ関数を返す
      return cleanup;
    },
  )

  return {
    unreadMessagesData: getRequest.data,
    mutateUnreadMessages: getRequest.mutate,
  };
}
