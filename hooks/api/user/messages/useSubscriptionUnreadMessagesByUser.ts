import { getApi } from "@/api/api-factory";
import useSWR, { useSWRConfig } from "swr";
import { Chat } from "@/api/__generated__/base/Chat";
import { UnreadMessage } from "@/hooks/api/companyuser/messages/useSubscriptionUnreadMessagesByRestaurantId";
import useSWRSubscription from "swr/subscription";
import realTimeClient from "@/api/xano";
import { XanoRealtimeChannel } from "@xano/js-sdk/lib/models/realtime-channel";
import { JobChangeRequests } from "@/api/__generated__/base/JobChangeRequests";

// XANOから生成されるSwaggerの定義が不完全なため、レスポンスの型を手動で定義する
// レストランの型定義
interface Restaurant {
  id: number;
  created_at: number;
  name: string;
  address: string;
  cuisine_type: string;
  business_hours: string;
  contact_info: string;
  profile_image: string;
  updated_at: number;
  is_active: boolean;
  companies_id: string;
  station: string;
  access: string;
  rating: number;
  is_approved: boolean;
  restaurant_cuisine_id: number[];
  description: string;
  phone: string;
}

// ワークセッションのジョブの型
interface Job {
  id: number;
  created_at: number;
  title: string;
  description: string;
  work_date: string;
  start_time: number;
  end_time: number;
  hourly_rate: number;
  required_skills: any[];
  status: string;
  updated_at: number;
  restaurant_id: number;
  image: string;
  task: string;
  skill: string;
  whattotake: string;
  note: string;
  point: string;
  transportation: string;
  is_approved: boolean;
  number_of_spots: number;
  fee: number;
  expiry_date: number;
}

// ワークセッションの型
interface Worksession {
  id: number;
  created_at: number;
  check_in_time: number;
  check_out_time: number;
  total_hours: number;
  location_data: string;
  status: string;
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
  job: Job;
  restaurant: Restaurant;
}

// シェフ画面用の未読メッセージサマリー
export interface UnreadMessageWithWorksession {
  unread_messages: UnreadMessage[];
  unread_message_count: number;
  worksession: Worksession;
}

export interface Params {
  userId?: string;
}

export const useSubscriptionUnreadMessagesByUser = (
  params: Params,
) => {
  const { mutate } = useSWRConfig();

  const chatApi = getApi(Chat);
  const channelKey = `user_chat/${params.userId}`;

  const [key, fetcher] = chatApi.unreadSummaryChefListQueryArgs({
    headers: {
      "X-User-Type": "chef",
    },
  });

  const getRequest = useSWR(
    key,
    fetcher as unknown as () => Promise<UnreadMessageWithWorksession[]>,
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

                // jobの変更リクエストの再取得
                const jobChangeRequestsApi = getApi(JobChangeRequests);
                const jobChangeRequestsKey = jobChangeRequestsApi.jobChangeRequestsListQueryArgs()[0];
                mutate(jobChangeRequestsKey)

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
    unreadMessagesData: getRequest.data,
    mutateUnreadMessages: getRequest.mutate,
  };
};
