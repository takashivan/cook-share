import { CompanyuserNotifications } from '@/api/__generated__/base/CompanyuserNotifications';
import { ByUserDetailOutput } from '@/api/__generated__/notification/data-contracts';
import { getApi } from '@/api/api-factory';
import { useSWRConfig } from 'swr';
import useSWRMutation from 'swr/mutation'

export interface Params {
  userId?: string;
  handleSuccess?: () => void;
  handleError?: () => void;
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
