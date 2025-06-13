import useSWRMutation from "swr/mutation";
import { JobChangeRequests } from "@/api/__generated__/base/JobChangeRequests";
import { getApi } from "@/api/api-factory";
import { useSWRConfig } from "swr";
import { Worksessions } from "@/api/__generated__/base/Worksessions";

export interface Params {
  jobChangeRequestId?: string;
  worksessionsId?: number;
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
        if (params.worksessionsId) {
          const worksessionsApi = getApi(Worksessions);
          const jobChangeRequestsKey =
            worksessionsApi.jobChangeRequestRestaurantListQueryArgs(params.worksessionsId)[0];
          mutate(jobChangeRequestsKey);
        }
      },
    }
  );
};
