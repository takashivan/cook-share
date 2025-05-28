import { getApi } from "@/api/api-factory"
import useSWR from "swr"
import { Chat } from "@/api/__generated__/base/Chat";
import useSWRSubscription from "swr/subscription";
import { XanoRealtimeChannel } from "@xano/js-sdk/lib/models/realtime-channel";
import realTimeClient from "@/api/xano";
import { WorksessionsRestaurantTodosListData } from "@/api/__generated__/base/data-contracts";

// XANOから生成されるSwaggerの定義が不完全なため、レスポンスの型を手動で定義する
interface Message {
  id: number;
  created_at: number;
  content: string;
  is_read: boolean;
  updated_at: number;
  application_id: string | null;
  chef_id: string;
  sender_type: 'chef' | 'restaurant';
  restaurant_id: number;
  worksession_id: number;
  message_seq: number;
};
export interface MessageSummary {
  first_message: Message | null;
  unread_count: number;
  worksession: WorksessionsRestaurantTodosListData[number];
}
interface MessageSummaryResponse {
  message_summaries: MessageSummary[];
}
export interface Params {
  restaurantId?: number;
}

export const useSubscriptionMessageSummaryByRestaurantId = (params: Params) => {
  const cahtApi = getApi(Chat);
  const channelKey = `restaurant_chat/${params.restaurantId}`;

  const [key, fetcher] = cahtApi.summaryRestaurantListQueryArgs({
    restaurant_id: params.restaurantId ?? -1
  }, {
    headers: {
      "X-User-Type": "company"
    }
  }, params.restaurantId != null);

  const getRequest = useSWR(
    key,
    fetcher as unknown as () => Promise<MessageSummaryResponse>,
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
    messageSummaryData: getRequest.data?.message_summaries,
    mutateMessageSummary: getRequest.mutate,
    isLoading: getRequest.isLoading,
    error: getRequest.error,
  };
}
