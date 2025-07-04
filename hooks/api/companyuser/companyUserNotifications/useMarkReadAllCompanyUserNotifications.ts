import { CompanyuserNotifications } from '@/api/__generated__/base/CompanyuserNotifications';
import { getApi } from '@/api/api-factory';
import { useSWRConfig } from 'swr';
import useSWRMutation from 'swr/mutation'
import { ByUserDetailOutput } from './useGetCompanyUserNotificationsByUserId';

export interface Params {
  userId?: string;
}

export const useMarkReadAllCompanyUserNotifications = (params: Params) => {
  const { mutate } = useSWRConfig();

  const companyuserNotifications = getApi(CompanyuserNotifications);
  return useSWRMutation(...companyuserNotifications.markReadAllPartialUpdateQueryArgs({
    headers: {
      "X-User-Type": "company"
    }
  }), {
    throwOnError: true,
    onSuccess: (data) => {
      // Notificationsリストのキャッシュを更新
      if (params.userId) {
        const notificationsByUserIdKey = companyuserNotifications.byUserDetailQueryArgs(params.userId)[0];
        mutate(notificationsByUserIdKey, async (currentItems: ByUserDetailOutput | undefined) => {
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
