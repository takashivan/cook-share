import useSWRMutation from "swr/mutation";
import { JobChangeRequests } from "@/api/__generated__/base/JobChangeRequests";
import { getApi } from "@/api/api-factory";
import { useSWRConfig } from "swr";

interface Params {
  handleSuccess?: () => void;
  handleError?: (error: any) => void;
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
      onSuccess: (data) => {
        // Job変更リクエストのリストのキャッシュを更新
        const jobChangeRequestsKey =
          jobChangeRequests.jobChangeRequestsListQueryArgs()[0];
        mutate(jobChangeRequestsKey);

        // 成功時のコールバック
        if (params.handleSuccess) {
          params.handleSuccess();
        }
      },
      onError: (error) => {
        // エラー時のコールバック
        if (params.handleError) {
          params.handleError(error);
        }
      }
    }
  );
};
