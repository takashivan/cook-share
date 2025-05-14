import { getApi } from "@/api/api-factory";
import useSWRMutation from "swr/mutation";
import { JobChangeRequests } from "@/api/__generated__/base/JobChangeRequests";
import { useSWRConfig } from "swr";
export interface Params {
  jobChangeRequestId?: string;
}

export const useRejectJobChangeRequest = (params: Params) => {
  const { mutate } = useSWRConfig();

  const jobChangeRequests = getApi(JobChangeRequests);
  return useSWRMutation(
    ...jobChangeRequests.rejectPartialUpdateQueryArgs(params.jobChangeRequestId ?? "",
      {
        headers: {
          "X-User-Type": "chef",
        },
      },
      params.jobChangeRequestId != null
    ), {
      onSuccess: (data) => {
        console.log("Job change request rejected successfully:", data);

        // Job変更リクエストのリストのキャッシュを更新
        const jobChangeRequestsKey =
          jobChangeRequests.jobChangeRequestsListQueryArgs()[0];
        mutate(jobChangeRequestsKey);
      }
    }
  );
};
