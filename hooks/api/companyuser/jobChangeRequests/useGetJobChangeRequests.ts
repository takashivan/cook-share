import { getApi } from "@/api/api-factory";
import useSWR from "swr";
import { JobChangeRequests } from "@/api/__generated__/base/JobChangeRequests";
import { JobChangeRequestsListData } from "@/api/__generated__/base/data-contracts";

// XANOから生成されるSwaggerの定義が不完全なため、レスポンスの型を手動で定義する
type BaseJobChangeRequest = Omit<JobChangeRequestsListData[number], "proposed_changes">;
export interface JobChangeRequest extends BaseJobChangeRequest {
  proposed_changes: {
    work_date: string;
    start_time: number;
    end_time: number;
    fee: number;
    task: string;
  }
}

export const useGetJobChangeRequests = () => {
  const jobChangeRequests = getApi(JobChangeRequests);
  const [key, fetcher] = jobChangeRequests.jobChangeRequestsListQueryArgs(
    {
      headers: {
        "X-User-Type": "company",
      },
    },
  );

  return useSWR(
    key,
    fetcher as unknown as () => Promise<JobChangeRequest[]>,
  );
};
