import { getApi } from "@/api/api-factory";
import useSWR from "swr";
import { JobChangeRequests } from "@/api/__generated__/base/JobChangeRequests";
export interface Params {
  worksessionId?: number;
}

export const useGetJobChangeRequestByWorksessionId = (params: Params) => {
  const jobChangeRequests = getApi(JobChangeRequests);
  return useSWR(
    ...jobChangeRequests.jobChangeRequestsListQueryArgs(
      {
        headers: {
          "X-User-Type": "company",
        },
      },
      params.worksessionId != null
    )
  );
};
