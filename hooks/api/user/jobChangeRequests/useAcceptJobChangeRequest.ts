import { getApi } from "@/api/api-factory";
import useSWRMutation from "swr/mutation";
import { JobChangeRequests } from "@/api/__generated__/base/JobChangeRequests";
export interface Params {
  jobChangeRequestId?: string;
}

export const useAcceptJobChangeRequest = (params: Params) => {
  const jobChangeRequests = getApi(JobChangeRequests);
  return useSWRMutation(
    ...jobChangeRequests.acceptPartialUpdateQueryArgs(params.jobChangeRequestId ?? "",
      {
        headers: {
          "X-User-Type": "chef",
        },
      },
      params.jobChangeRequestId != null
    )
  );
};
