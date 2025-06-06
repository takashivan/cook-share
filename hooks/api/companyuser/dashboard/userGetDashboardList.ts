import { getApi } from "@/api/api-factory";
import useSWR from "swr";
import { Companyusers } from "@/api/__generated__/base/Companyusers";

// XANOから生成されるSwaggerの定義が不完全なため、レスポンスの型を手動で定義する
export interface DashboardListData {
  restaurant_count: string;
  /** @format int64 */
  job_all_publised: number;
  /** @format int64 */
  job_filled: number;
  /** @format int64 */
  job_now_published: number;
  to_be_verified_reviews: {
    /** @format int64 */
    id: number;
    /**
     * @format timestamptz
     * @default "now"
     */
    created_at: number;
    /** @format int64 */
    rating: number;
    comment: string;
    /** @format timestamptz */
    updated_at: number;
    /** @format int64 */
    session_id: number;
    /** @format uuid */
    reviewer_id: string;
    /** @format int64 */
    reviewee_id: number;
    worksession: {
      /** @format timestamptz */
      check_in_time: number;
      /** @format timestamptz */
      check_out_time: number;
      status:
        | "SCHEDULED"
        | "IN_PROGRESS"
        | "CANCELED_BY_CHEF"
        | "CANCELED_BY_RESTAURANT"
        | "COMPLETED"
        | "VERIFIED"
        | "DISPUTE"
        | "ESCALATED"
        | "PAID"
        | "CANCELED"
        | "VERIFY_REJECTED";
      job: {
        title: string;
        /** @format date */
        work_date: string;
        /** @format timestamptz */
        start_time: number;
        /** @format timestamptz */
        end_time: number;
      } | null;
      user: {
        name: string;
        profile_image: string;
      } | null;
    };
    restaurant: {
      name: string;
    } | null;
  }[];
  worksessions_today: {
    /** @format int64 */
    id: number;
    /** @format timestamptz */
    check_in_time: number;
    status:
      | "SCHEDULED"
      | "IN_PROGRESS"
      | "CANCELED_BY_CHEF"
      | "CANCELED_BY_RESTAURANT"
      | "COMPLETED"
      | "VERIFIED"
      | "DISPUTE"
      | "ESCALATED"
      | "PAID"
      | "CANCELED"
      | "VERIFY_REJECTED";
    /** @format uuid */
    user_id: string | null;
    /** @format int64 */
    restaurant_id: number;
    /** @format int64 */
    job_id: number;
    /** @format int64 */
    check_in_code: number | null;
    job: {
      title: string;
      /** @format date */
      work_date: string;
      /** @format timestamptz */
      start_time: number;
      /** @format timestamptz */
      end_time: number;
    } | null;
    restaurant: {
      name: string;
    } | null;
    user: {
      name: string;
      profile_image: string;
      phone: string;
    } | null;
  }[];
  chef_review: {
    chef_review_rating: number;
  };
  to_be_verified_worksessions: {
    /** @format int64 */
    id: number;
    /** @format timestamptz */
    check_in_time: number;
    /** @format timestamptz */
    check_out_time: number;
    status:
      | "SCHEDULED"
      | "IN_PROGRESS"
      | "CANCELED_BY_CHEF"
      | "CANCELED_BY_RESTAURANT"
      | "COMPLETED"
      | "VERIFIED"
      | "DISPUTE"
      | "ESCALATED"
      | "PAID"
      | "CANCELED"
      | "VERIFY_REJECTED";
    /** @format int64 */
    restaurant_id: number;
    /** @format int64 */
    job_id: number;
    /** @format int64 */
    paid_amount: number;
    /** @format int64 */
    transportation_expenses: number | null;
    /** @format int64 */
    actual_fee: number;
    transportation_type: "FIXED" | "NONE" | "MAX";
    job: {
      /** @format int64 */
      id: number;
      title: string;
      /** @format date */
      work_date: string;
      /** @format timestamptz */
      start_time: number;
      /** @format timestamptz */
      end_time: number;
      /** @format int64 */
      restaurant_id: number;
    } | null;
    restaurant: {
      /** @format int64 */
      id: number;
      name: string;
    } | null;
    user: {
      name: string;
      profile_image: string;
    } | null;
    chef_review: {
      /** @format int64 */
      id: number;
      /** @format timestamptz */
      updated_at: number;
    } | null;
  }[];
}
export interface Params {
  companyuserId?: string;
}

export const useGetDashboardList = (params: Params) => {
  const companyusers = getApi(Companyusers);
  const [key, fetcher] = companyusers.dashboardListQueryArgs(
    params.companyuserId ?? "",
    {
      headers: {
        "X-User-Type": "company",
      },
    },
    params.companyuserId != null
  );

  return useSWR(
    key,
    fetcher as unknown as () => Promise<DashboardListData>,
    {
      revalidateOnMount: true,
      dedupingInterval: 0,
    }
  );
};
