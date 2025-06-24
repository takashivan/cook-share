import { getApi } from "@/api/api-factory";
import useSWR, { useSWRConfig } from "swr";
import useSWRSubscription from 'swr/subscription';
import { MessagesCreatePayload } from "@/api/__generated__/base/data-contracts";
import realTimeClient from "@/api/xano";
import { Companyusers } from "@/api/__generated__/base/Companyusers";
import { XanoRealtimeChannel } from "@xano/js-sdk/lib/models/realtime-channel";
import { Worksessions } from "@/api/__generated__/base/Worksessions";

export interface Params {
  companyUserId?: string;
  workSessionId?: number;
}

export const useSubscriptionMessagesByCompanyUserId = (params: Params) => {
  const { mutate } = useSWRConfig();

  const companyusersApi = getApi(Companyusers);
  const channelKey = `worksession/${params.workSessionId}`;

  const [key, fetcher] = companyusersApi.worksessionsMessagesListQueryArgs(params.companyUserId ?? '', params.workSessionId ?? -1, {
    headers: {
      "X-User-Type": "company"
    }
  }, params.companyUserId != null && params.workSessionId != null);

  const getRequest = useSWR(key, fetcher);

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

                  // jobの変更リクエストの再取得
                  if (params.workSessionId) {
                    const worksessionsApi = getApi(Worksessions);
                    const jobChangeRequestsKey =
                      worksessionsApi.jobChangeRequestRestaurantListQueryArgs(params.workSessionId)[0];
                    mutate(jobChangeRequestsKey);
                  }

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

  const sendMessage = async ({
    message,
    shouldNotify = true,
  }: {
    message: string,
    shouldNotify?: boolean;
  }) => {
    if (!message.trim() || !key || !params.workSessionId || !params.companyUserId) return;

    try {
      const messageParams: MessagesCreatePayload = {
        content: message,
        worksession_id: params.workSessionId,
        shouldNotify,
      };

      await companyusersApi.messagesCreate(params.companyUserId, messageParams, {
        headers: {
          "X-User-Type": "company"
        }
      });

      getRequest.mutate();
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  return {
    messagesData: getRequest.data,
    isLoading: getRequest.isLoading,
    error: getRequest.error,
    mutateMessages: getRequest.mutate,
    sendMessage,
  };
}
