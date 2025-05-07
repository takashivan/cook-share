import { getApi } from "@/api/api-factory";
import useSWRMutation from "swr/mutation";
import { JobChangeRequests } from "@/api/__generated__/base/JobChangeRequests";
export interface Params {
  jobChangeRequestId: string;
}

export const useRejectJobChangeRequest = (params: Params) => {
  const jobChangeRequests = getApi(JobChangeRequests);
  return useSWRMutation(
    ...jobChangeRequests.rejectPartialUpdateQueryArgs(params.jobChangeRequestId)
  );
};
