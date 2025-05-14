import { getApi } from "@/api/api-factory";
import useSWR from "swr";
import { JobChangeRequests } from "@/api/__generated__/base/JobChangeRequests";
import { JobChangeRequest } from "../../companyuser/jobChangeRequests/useGetJobChangeRequests";

export const useGetJobChangeRequests = () => {
  const jobChangeRequests = getApi(JobChangeRequests);
  const [key, fetcher] = jobChangeRequests.jobChangeRequestsListQueryArgs(
    {
      headers: {
        "X-User-Type": "chef",
      },
    },
  );

  return useSWR(
    key,
    fetcher as unknown as () => Promise<JobChangeRequest[]>,
  );
};
