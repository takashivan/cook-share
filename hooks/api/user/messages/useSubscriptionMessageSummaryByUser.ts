import { getApi } from "@/api/api-factory";
import useSWR, { useSWRConfig } from "swr";
import { Chat } from "@/api/__generated__/base/Chat";
import useSWRSubscription from "swr/subscription";
import realTimeClient from "@/api/xano";
import { XanoRealtimeChannel } from "@xano/js-sdk/lib/models/realtime-channel";
import { JobsDetailData, WorksessionsUserTodosListData } from "@/api/__generated__/base/data-contracts";
import { JobChangeRequests } from "@/api/__generated__/base/JobChangeRequests";

// XANOから生成されるSwaggerの定義が不完全なため、レスポンスの型を手動で定義する
type FirstMessage = {
  id: number;
  created_at: number;
  content: string;
  is_read: boolean;
  updated_at: number;
  application_id: string;
  chef_id: string;
  sender_type: 'chef' | 'restaurant';
  restaurant_id: number;
  worksession_id: number;
  message_seq: number;
};

type Worksession = {
  id: number;
  created_at: number;
  check_in_time: number;
  check_out_time: number;
  total_hours: number;
  location_data: string;
  status: 'SCHEDULED' | 'COMPLETED' | 'CANCELLED' | string;
  updated_at: number;
  application_id: string;
  user_id: string;
  restaurant_id: number;
  job_id: number;
  paid_amount: number;
  chef_feedback: string;
  restaurant_feedback: string;
  chef_rating: number;
  restaurant_rating: number;
  start_time: number;
  job: JobsDetailData['job'];
  restaurant: JobsDetailData['restaurant'];
};

export type MessageSummary = {
  first_message: FirstMessage;
  unread_count: number;
  worksession: Omit<WorksessionsUserTodosListData[number], 'job' | 'restaurant'> & {
    job: WorksessionsUserTodosListData[number]['job'];
    restaurant: WorksessionsUserTodosListData[number]['job']['restaurant'];
  };
};

// シェフ画面用のメッセージサマリー
export interface MessageWithWorksession {
  message_summaries: MessageSummary[];
}

export interface Params {
  userId?: string;
}

export const useSubscriptionMessageSummaryByUser = (
  params: Params,
) => {
  const { mutate } = useSWRConfig();

  const chatApi = getApi(Chat);
  const channelKey = `user_chat/${params.userId}`;

  const [key, fetcher] = chatApi.summaryChefListQueryArgs({
    user_id: params.userId ?? '',
  },{
    headers: {
      "X-User-Type": "chef",
    },
  }, params.userId != null);

  const getRequest = useSWR(
    key,
    fetcher as unknown as () => Promise<MessageWithWorksession>,
  );

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
              } else {
                getRequest.mutate();

                // TODO: メッセージでworkSessionIdをもらわないといけない
                // jobの変更リクエストの再取得
                // if (params.workSessionId) {
                //   const worksessionsApi = getApi(Worksessions);
                //   const jobChangeRequestsKey =
                //     worksessionsApi.jobChangeRequestChefListQueryArgs(params.workSessionId)[0];
                //   mutate(jobChangeRequestsKey);
                // }

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

  return {
    messageSummaryData: getRequest.data,
    isLoading: getRequest.isLoading,
    error: getRequest.error,
    mutateUnreadMessages: getRequest.mutate,
  };
};
