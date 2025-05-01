import { getApi } from "@/api/api-factory";
import useSWR from "swr";
import { QueryConfigType } from "../config-type";
import { Chat } from "@/api/__generated__/base/Chat";
import { UnreadMessage } from "./useGetUnreadMessagesByCompanyUserId";
import useSWRSubscription from "swr/subscription";
import realTimeClient from "@/api/xano";
import { XanoRealtimeChannel } from "@xano/js-sdk/lib/models/realtime-channel";

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
  config?: QueryConfigType
) => {
  const { dedupingInterval } = config || {};
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
    {
      dedupingInterval,
    }
  );

  useSWRSubscription(key, ([_key], { next }) => {
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
  });

  return {
    unreadMessagesData: getRequest.data,
    mutateUnreadMessages: getRequest.mutate,
  };
};
