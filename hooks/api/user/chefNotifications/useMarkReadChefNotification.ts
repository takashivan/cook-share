import { ChefNotifications } from '@/api/__generated__/base/ChefNotifications';
import { ByUserDetailData } from '@/api/__generated__/base/data-contracts';
import { getApi } from '@/api/api-factory';
import { useSWRConfig } from 'swr';
import useSWRMutation from 'swr/mutation'

export interface Params {
  chefNotificationId?: number;
  userId?: string;
  handleSuccess?: () => void;
  handleError?: () => void;
}

export const useMarkReadChefNotification = (params: Params) => {
  const { mutate } = useSWRConfig();

  const notificationsApi = getApi(ChefNotifications);
  return useSWRMutation(...notificationsApi.readPartialUpdateQueryArgs(params.chefNotificationId ?? -1, {
    headers: {
      "X-User-Type": "chef"
    }
  }, params.chefNotificationId != null), {
    throwOnError: true,
    onSuccess: (data) => {
      // Notificationsリストのキャッシュを更新
      if (params.userId) {
        const notificationsByUserIdKey = notificationsApi.byUserDetailQueryArgs(params.userId)[0];
        mutate(notificationsByUserIdKey, async (currentItems: ByUserDetailData | undefined) => {
          if (!currentItems) return currentItems;

          return currentItems.map((notification) => {
            if (notification.id === data.id) {
              return {
                ...notification,
                is_read: true
              };
            }
            return notification;
          })
        }
        , { revalidate: false });
      }

      if (params.handleSuccess) {
        params.handleSuccess();
      }
    },
    onError: (error) => {
      if (params.handleError) {
        params.handleError();
      }
    }
  })
}
