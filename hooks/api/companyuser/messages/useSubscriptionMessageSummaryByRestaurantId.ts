import { getApi } from "@/api/api-factory"
import useSWR from "swr"
import { Chat } from "@/api/__generated__/base/Chat";
import useSWRSubscription from "swr/subscription";
import { XanoRealtimeChannel } from "@xano/js-sdk/lib/models/realtime-channel";
import realTimeClient from "@/api/xano";

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

interface WorkSession {
  id: number;
  created_at: number;
  check_in_time: number;
  check_out_time: number;
  total_hours: number;
  location_data: string;
  status:
    | "SCHEDULED"
    | "IN_PROGRESS"
    | "CANCELED_BY_CHEF"
    | "CANCELED_BY_RESTAURANT"
    | "COMPLETED"
    | "VERIFIED"
    | "DISPUTE"
    | "ESCALATED"
    | "PAID"
    | "CANCELED";
  updated_at: number;
  application_id: string | null;
  user_id: string;
  restaurant_id: number;
  job_id: number;
  paid_amount: number;
  chef_feedback: string;
  restaurant_feedback: string;
  chef_rating: number;
  restaurant_rating: number;
  start_time: number | null;
  check_in_code: number | null;
  job: Job;
  user: User;
};

interface Job {
  id: number;
  created_at: number;
  title: string;
  description: string;
  work_date: string;
  start_time: number;
  end_time: number;
  hourly_rate: number;
  required_skills: string[];
  status: 'PUBLISHED' | 'FILLED' | 'EXPIRED';
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
};

interface User {
  id: string;
  created_at: number;
  name: string;
  email: string;
  password: string;
  user_type: string;
  status: string;
  last_login_at: number | null;
  updated_at: number | null;
  skills: string[];
  experience_level: string;
  bio: string;
  certifications: string[];
  dateofbirth: string;
  profile_image: string;
  is_approved: boolean;
  line_user_id: string;
  line_display_name: string;
  line_notification_enabled: boolean;
  is_verified: boolean;
  verify_token: string;
  stripe_account_id: string;
  pending_email: string;
  email_change_token: string;
  password_reset_token: string;
  stripe_verified: boolean;
  stripe_requirements: StripeRequirements | string;
  address: string;
  phone: string;
  last_name: string;
  given_name: string;
  last_name_kana: string;
  given_name_kana: string;
  categories: string[];
  postal_code: string;
  prefecture: string;
  address2: string;
  city: string;
  town: string;
  street: string;
  profile_completed: boolean;
  magic_link: string | null;
};

interface StripeRequirements {
  errors: any[];
  past_due: any[];
  alternatives: any[];
  currently_due: any[];
  eventually_due: any[];
  disabled_reason: string;
  current_deadline: number | null;
  pending_verification: any[];
};

export interface MessageSummary {
  first_message: Message | null;
  unread_count: number;
  worksession: WorkSession;
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
