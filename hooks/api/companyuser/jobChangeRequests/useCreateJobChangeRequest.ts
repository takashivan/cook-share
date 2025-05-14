import useSWRMutation from "swr/mutation";
import { JobChangeRequests } from "@/api/__generated__/base/JobChangeRequests";
import { getApi } from "@/api/api-factory";
import { useSWRConfig } from "swr";

export const useCreateJobChangeRequest = () => {
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
        console.log("Job change request created successfully:", data);

        // Jobsリストのキャッシュを更新
        const jobChangeRequestsKey =
          jobChangeRequests.jobChangeRequestsListQueryArgs()[0];
        mutate(jobChangeRequestsKey);
      },
    }
  );
};
