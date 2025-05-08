import useSWRMutation from "swr/mutation";
import { JobChangeRequests } from "@/api/__generated__/base/JobChangeRequests";
import { getApi } from "@/api/api-factory";
import { useSWRConfig } from "swr";

export interface Params {
  jobChangeRequestId: string;
  job_id: number;
  user_id: string;
  requested_by: number;
  proposed_changes: string;
  status: string;
  reason: string;
  worksession_id: number;
}

export const useDeleteJobChangeRequest = (params: Params) => {
  const { mutate } = useSWRConfig();

  const jobChangeRequests = getApi(JobChangeRequests);
  return useSWRMutation(
    ...jobChangeRequests.jobChangeRequestsDeleteQueryArgs(
      params.jobChangeRequestId,
      {
        headers: {
          "X-User-Type": "company",
        },
      }
    ),
    {
      onSuccess: (data) => {
        console.log("Job change request deleted successfully:", data);

        // Jobsリストのキャッシュを更新
        const jobChangeRequestsKey =
          jobChangeRequests.jobChangeRequestsListQueryArgs()[0];
        mutate(jobChangeRequestsKey);
      },
    }
  );
};
