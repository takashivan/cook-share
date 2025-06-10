import useSWRMutation from "swr/mutation";
import { JobChangeRequests } from "@/api/__generated__/base/JobChangeRequests";
import { getApi } from "@/api/api-factory";
import { useSWRConfig } from "swr";

export interface Params {
  jobChangeRequestId?: string;
}

export const useDeleteJobChangeRequest = (params: Params) => {
  const { mutate } = useSWRConfig();

  const jobChangeRequests = getApi(JobChangeRequests);
  return useSWRMutation(
    ...jobChangeRequests.jobChangeRequestsDeleteQueryArgs(
      params.jobChangeRequestId ?? "",
      {
        headers: {
          "X-User-Type": "company",
        },
      },
      params.jobChangeRequestId != null
    ),
    {
      throwOnError: true,
      onSuccess: (data) => {
        console.log("Job change request deleted successfully:", data);

        // Job変更リクエストのリストのキャッシュを更新
        const jobChangeRequestsKey =
          jobChangeRequests.jobChangeRequestsListQueryArgs()[0];
        mutate(jobChangeRequestsKey);
      },
    }
  );
};
