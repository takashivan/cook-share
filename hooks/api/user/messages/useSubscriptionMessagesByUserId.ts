import { getApi } from "@/api/api-factory";
import useSWR from "swr";
import useSWRSubscription from "swr/subscription";
import { Messages } from "@/api/__generated__/base/Messages";
import { MessagesCreatePayload } from "@/api/__generated__/base/data-contracts";
import realTimeClient from "@/api/xano";
import { Users } from "@/api/__generated__/base/Users";
import { XanoRealtimeChannel } from "@xano/js-sdk/lib/models/realtime-channel";

export interface Params {
  userId?: string;
  workSessionId?: number;
}

export const useSubscriptionMessagesByUserId = (
  params: Params,
) => {
  const usersApi = getApi(Users);
  const messagesApi = getApi(Messages);
  const channelKey = `worksession/${params.workSessionId}`;

  const [key, fetcher] = usersApi.worksessionsMessagesListQueryArgs(
    params.userId ?? "",
    params.workSessionId ?? -1,
    {
      headers: {
        "X-User-Type": "chef",
      },
    },
    params.userId != null && params.workSessionId != null
  );

  const getRequest = useSWR(key, fetcher,);

  useSWRSubscription(key, ([_key], { next }) => {
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
  });

  const sendMessage = async (message: string) => {
    if (
      !message.trim() ||
      !key ||
      !params.workSessionId
    )
      return;

    try {
      const messageParams: MessagesCreatePayload = {
        content: message,
        worksession_id: params.workSessionId,
        sender_type: "chef",
      };

      await messagesApi.messagesCreate(messageParams, {
        headers: {
          "X-User-Type": "chef",
        },
      });

      const channel = realTimeClient.channel(channelKey);
      channel.message(messageParams);

      getRequest.mutate();
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return {
    messagesData: getRequest.data,
    mutateMessages: getRequest.mutate,
    sendMessage,
  };
};
