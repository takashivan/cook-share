import { getApi } from "@/api/api-factory";
import useSWR from "swr";
import { Worksessions } from "@/api/__generated__/base/Worksessions";
import { JobChangeRequestChefListData } from "@/api/__generated__/base/data-contracts";

// XANOから生成されるSwaggerの定義が不完全なため、レスポンスの型を手動で定義する
type BaseJobChangeRequest = Omit<JobChangeRequestChefListData, "proposed_changes">;
export interface JobChangeRequest extends BaseJobChangeRequest {
  proposed_changes: {
    work_date: string;
    start_time: number;
    end_time: number;
    fee: number;
    task: string;
  }
}

interface Params {
  worksessionsId?: number;
}

export const useGetJobChangeRequest = (params: Params) => {
  const worksessionsApi = getApi(Worksessions);
  const [key, fetcher] = worksessionsApi.jobChangeRequestChefListQueryArgs(
    params.worksessionsId ?? 0,
    {
      headers: {
        "X-User-Type": "chef",
      },
    },
    params.worksessionsId != null,
  );

  return useSWR(
    key,
    fetcher as unknown as () => Promise<JobChangeRequest>,
  );
};
