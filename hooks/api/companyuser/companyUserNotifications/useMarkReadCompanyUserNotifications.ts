import { CompanyuserNotifications } from '@/api/__generated__/base/CompanyuserNotifications';
import { ByUserDetailOutput } from '@/api/__generated__/notification/data-contracts';
import { getApi } from '@/api/api-factory';
import { useSWRConfig } from 'swr';
import useSWRMutation from 'swr/mutation'

export interface Params {
  companyUserNotificationId?: string;
  userId?: string;
  handleSuccess?: () => void;
  handleError?: () => void;
}

export const useMarkReadCompanyUserNotifications = (params: Params) => {
  const { mutate } = useSWRConfig();

  const companyuserNotifications = getApi(CompanyuserNotifications);
  return useSWRMutation(...companyuserNotifications.markReadPartialUpdateQueryArgs(params.companyUserNotificationId ?? '', {
    headers: {
      "X-User-Type": "company"
    }
  }, params.companyUserNotificationId != null), {
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
