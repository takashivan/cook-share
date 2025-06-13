import useSWRMutation from "swr/mutation";
import { JobChangeRequests } from "@/api/__generated__/base/JobChangeRequests";
import { getApi } from "@/api/api-factory";
import { useSWRConfig } from "swr";
import { Worksessions } from "@/api/__generated__/base/Worksessions";

interface Params {
  worksessionsId?: number;
}

export const useCreateJobChangeRequest = (params: Params) => {
  const { mutate } = useSWRConfig();

  const jobChangeRequests = getApi(JobChangeRequests);
  return useSWRMutation(
    ...jobChangeRequests.jobChangeRequestsCreateQueryArgs({
      headers: {
        "X-User-Type": "company",
      },
    }),
    {
      throwOnError: true,
      onSuccess: (data) => {
        // Job変更リクエストのリストのキャッシュを更新
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
