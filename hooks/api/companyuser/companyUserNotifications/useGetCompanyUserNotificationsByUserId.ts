import { getApi } from "@/api/api-factory";
import useSWR from "swr";
import { CompanyuserNotifications } from "@/api/__generated__/base/CompanyuserNotifications";

export interface Params {
  userId?: string;
}

export const useGetCompanyUserNotificationsByUserId = (
  params: Params,
) => {
  const notificationsApi = getApi(CompanyuserNotifications);
  return useSWR(
    ...notificationsApi.byUserDetailQueryArgs(
      params.userId ?? '',
      {
        headers: {
          "X-User-Type": "company",
        },
      },
      params.userId != null
    ),
  );
};
