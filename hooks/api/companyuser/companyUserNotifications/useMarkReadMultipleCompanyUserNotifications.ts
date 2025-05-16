import { CompanyuserNotifications } from "@/api/__generated__/base/CompanyuserNotifications";
import { ByUserDetailOutput, MarkReadPartialUpdateData } from "@/api/__generated__/base/data-contracts";
import { getApi } from "@/api/api-factory";
import { useSWRConfig } from "swr";
import useSWRMutation from "swr/mutation";

export interface Params {
  companyUserNotificationIds: string[];
  userId?: string;
  handleSuccess?: () => void;
  handleError?: () => void;
}

export const useMarkReadMultipleCompanyUserNotifications = (params: Params) => {
  const { mutate } = useSWRConfig();

  const companyuserNotifications = getApi(CompanyuserNotifications);

  const keys: string[] = [];
  const fetchers: ((url: string[]) => Promise<MarkReadPartialUpdateData>)[] = [];
  for (const companyUserNotificationId of params.companyUserNotificationIds) {
    const [key, fetcher] = companyuserNotifications.markReadPartialUpdateQueryArgs(companyUserNotificationId, {
      headers: {
        "X-User-Type": "company"
      }
    }, companyUserNotificationId != null);
    if (key != null) {
      keys.push(key[0]);
      fetchers.push(fetcher);
    }
  }

  console.log("keys", keys);

  return useSWRMutation(
    keys.length > 0 ? keys : null,
    () => Promise.all(fetchers.map((fetcher) => fetcher(params.companyUserNotificationIds))), {
    onSuccess: (data) => {
      // Notificationsリストのキャッシュを更新
      if (params.userId) {
        const notificationsByUserIdKey = companyuserNotifications.byUserDetailQueryArgs(params.userId)[0];
        mutate(notificationsByUserIdKey, async (currentItems: ByUserDetailOutput | undefined) => {
          if (!currentItems) return currentItems;

          return currentItems.map((notification) => {
            if (data.some((item) => item.id === notification.id)) {
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
