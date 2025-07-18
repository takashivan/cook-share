import { CompanyuserNotifications } from '@/api/__generated__/base/CompanyuserNotifications';
import { getApi } from '@/api/api-factory';
import { useSWRConfig } from 'swr';
import useSWRMutation from 'swr/mutation'
import { ByUserDetailOutput } from './useGetCompanyUserNotificationsByUserId';

export interface Params {
  companyUserNotificationId?: string;
  userId?: string;
}

export const useMarkReadCompanyUserNotifications = (params: Params) => {
  const { mutate } = useSWRConfig();

  const companyuserNotifications = getApi(CompanyuserNotifications);
  return useSWRMutation(...companyuserNotifications.markReadPartialUpdateQueryArgs(params.companyUserNotificationId ?? '', {
    headers: {
      "X-User-Type": "company"
    }
  }, params.companyUserNotificationId != null), {
    throwOnError: true,
    onSuccess: (data) => {
      // Notificationsリストのキャッシュを更新
      if (params.userId) {
        const notificationsByUserIdKey = companyuserNotifications.byUserDetailQueryArgs(params.userId)[0];
        mutate(notificationsByUserIdKey, async (currentItems: ByUserDetailOutput | undefined) => {
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
    },
  })
}
