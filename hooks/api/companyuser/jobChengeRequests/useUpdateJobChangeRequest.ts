import { JobChangeRequests } from "@/api/__generated__/base/JobChangeRequests";
import { getApi } from "@/api/api-factory";
import { useSWRConfig } from "swr";
import useSWRMutation from "swr/mutation";

export interface Params {
  jobChangeRequestId?: string;
  job_id?: number;
  user_id?: string;
  requested_by?: number;
  proposed_changes?: string;
  status?: string;
  updated_at?: string;
  reason?: string;
  worksession_id?: number;
}

export const useUpdateJobChangeRequest = (params: Params) => {
  const { mutate } = useSWRConfig();

  const jobChangeRequests = getApi(JobChangeRequests);
  return useSWRMutation(
    ...jobChangeRequests.jobChangeRequestsPartialUpdateQueryArgs(
      params.jobChangeRequestId ?? "",
      {
        headers: {
          "X-User-Type": "company",
        },
      },
      params.jobChangeRequestId != null
    ),
    {
      onSuccess: () => {
        // Jobsリストのキャッシュを更新
        const jobChangeRequestsKey =
          jobChangeRequests.jobChangeRequestsListQueryArgs()[0];
        mutate(jobChangeRequestsKey);
      },
    }
  );
};
