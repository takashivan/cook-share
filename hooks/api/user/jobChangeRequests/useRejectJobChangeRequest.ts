import { getApi } from "@/api/api-factory";
import useSWRMutation from "swr/mutation";
import { JobChangeRequests } from "@/api/__generated__/base/JobChangeRequests";
import { useSWRConfig } from "swr";
import { Worksessions } from "@/api/__generated__/base/Worksessions";
export interface Params {
  jobChangeRequestId?: string;
  workSessionId?: number;
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
      throwOnError: true,
      onSuccess: (data) => {
        console.log("Job change request rejected successfully:", data);

        if (params.workSessionId) {
          // Job変更リクエストのリストのキャッシュを更新
          const worksessionsApi = getApi(Worksessions);
          const jobChangeRequestsKey =
            worksessionsApi.jobChangeRequestChefListQueryArgs(params.workSessionId)[0];
          mutate(jobChangeRequestsKey, null);
        }
      }
    }
  );
};
