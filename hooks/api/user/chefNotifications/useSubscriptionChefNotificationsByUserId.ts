import { getApi } from "@/api/api-factory";
import useSWR from "swr";
import useSWRSubscription from 'swr/subscription';
import realTimeClient from "@/api/xano";
import { XanoRealtimeChannel } from "@xano/js-sdk/lib/models/realtime-channel";
import { ChefNotifications } from "@/api/__generated__/base/ChefNotifications";

export interface Params {
  userId?: string;
  handleSuccessGetMessage?: (message: any) => void;
}

export const useSubscriptionChefNotificationsByUserId = (params: Params) => {
  const notificationsApi = getApi(ChefNotifications);

  const channelKey = `chef-notifications/${params.userId}`;

  const [key, fetcher] = notificationsApi.byUserDetailQueryArgs(params.userId ?? '', {
    headers: {
      "X-User-Type": "chef"
    }
  }, params.userId != null);

  const getRequest = useSWR(key, fetcher);

  useSWRSubscription(key, ([_key], { next }) => {
    if (!key) return () => {};

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
                if (params.handleSuccessGetMessage) {
                  params.handleSuccessGetMessage(message);
                }
                next();
              }
            });
            break; // チャンネルが作成され、メッセージの購読が開始されたらループを抜ける
          } catch (error) {
            await new Promise((resolve) => setTimeout(resolve, 100));
          }
        }

        console.log("Channel setup for notification key:", channelKey);

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
  });

  return {
    notifications: getRequest.data,
    isLoading: getRequest.isLoading,
    error: getRequest.error,
    mutateNotifications: getRequest.mutate,
  };
}