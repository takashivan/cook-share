import { getApi } from "@/api/api-factory";
import useSWR from "swr";
import { CompanyuserNotifications } from "@/api/__generated__/base/CompanyuserNotifications";

// XANOから生成されるSwaggerの定義が不完全なため、レスポンスの型を手動で定義する
export type ByUserDetailOutput = {
  /** @format uuid */
  id: string;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at: number;
  /** @format uuid */
  companyuser_id: string | null;
  type:
    | "new_job"
    | "application_status"
    | "new_message"
    | "review"
    | "operator"
    | "payment";
  related_link: string;
  /** @default "false" */
  is_read: boolean;
  content: string;
  /** @format int64 */
  job_id: number | null;
  /** @format int64 */
  restaurant_id: number | null;
}[];

export interface Params {
  userId?: string;
}

export const useGetCompanyUserNotificationsByUserId = (
  params: Params,
) => {
  const notificationsApi = getApi(CompanyuserNotifications);
  const [key, fetcher] = notificationsApi.byUserDetailQueryArgs(
    params.userId ?? '',
    {
      headers: {
        "X-User-Type": "company",
      },
    },
    params.userId != null
  );

  return useSWR(
    key,
    fetcher as unknown as () => Promise<ByUserDetailOutput>,
  );
};
