import { ChefNotifications } from '@/api/__generated__/base/ChefNotifications';
import { ByUserDetailData } from '@/api/__generated__/base/data-contracts';
import { getApi } from '@/api/api-factory';
import { useSWRConfig } from 'swr';
import useSWRMutation from 'swr/mutation'

export interface Params {
  userId?: string;
}

export const useMarkReadAllChefNotifications = (params: Params) => {
  const { mutate } = useSWRConfig();

  const notificationsApi = getApi(ChefNotifications);
  return useSWRMutation(...notificationsApi.markReadAllPartialUpdateQueryArgs({
    headers: {
      "X-User-Type": "chef"
    }
  }), {
    throwOnError: true,
    onSuccess: (data) => {
      // Notificationsリストのキャッシュを更新
      if (params.userId) {
        const notificationsByUserIdKey = notificationsApi.byUserDetailQueryArgs(params.userId)[0];
        mutate(notificationsByUserIdKey, async (currentItems: ByUserDetailData | undefined) => {
          if (!currentItems) return currentItems;

          return currentItems.map((notification) => ({
            ...notification,
            is_read: true
          }))
        }
        , { revalidate: false });
      }
    },
  })
}
