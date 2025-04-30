import { getApi } from "@/api/api-factory"
import useSWR from "swr"
import { QueryConfigType } from "../config-type";
import { Chat } from "@/api/__generated__/base/Chat";

export interface Params {
  restaurantId?: number;
}

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

// APIレスポンスの型
interface UnreadMessagesByCompanyUserIdResponse {
  data: UnreadMessageSummary[];
}

export const useGetUnreadMessagesByCompanyUserId = (params: Params, config?: QueryConfigType) => {
  const { dedupingInterval } = config || {};
  const chat = getApi(Chat);
  const [queryKey, fetcher] = chat.unreadSummaryRestaurantDetailQueryArgs(params.restaurantId ?? -1, {
    headers: {
      "X-User-Type": "company"
    }
  }, params.restaurantId != null);

  return useSWR(
    queryKey,
    fetcher as unknown as () => Promise<UnreadMessagesByCompanyUserIdResponse>,
    {
      dedupingInterval
    }
  );
}
