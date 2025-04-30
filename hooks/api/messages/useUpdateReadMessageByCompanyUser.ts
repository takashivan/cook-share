import { Chat } from '@/api/__generated__/base/Chat';
import { Companyusers } from '@/api/__generated__/base/Companyusers';
import { getApi } from '@/api/api-factory';
import { useSWRConfig } from 'swr';
import useSWRMutation from 'swr/mutation'

export interface Params {
  companyUserId?: string;
  workSessionId?: number;
  restaurantId?: number;
}

export const useUpdateReadMessageByCompanyUser = (params: Params) => {
  const { mutate } = useSWRConfig();

  const chat = getApi(Chat);
  return useSWRMutation(...chat.updateReadRestaurantPartialUpdateQueryArgs({
    headers: {
      "X-User-Type": "company"
    }
  }), {
    onSuccess: () => {
      // Messagesリストのキャッシュを更新
      if (params.companyUserId && params.workSessionId) {
        const companyusersApi = getApi(Companyusers);
        const messagesByUserIdKey = companyusersApi.worksessionsMessagesListQueryArgs(params.companyUserId, params.workSessionId)[0];
        mutate(messagesByUserIdKey);
      }

      // 未読のMessagesリストのキャッシュを更新
      if (params.restaurantId) {
        const unreadMessagesByCompanyUserIdKey = chat.unreadSummaryRestaurantDetailQueryArgs(params.restaurantId)[0];
        mutate(unreadMessagesByCompanyUserIdKey);
      }
    }
  })
}
