import { getApi } from "@/api/api-factory";
import useSWR from "swr";
import { Jobs } from "@/api/__generated__/base/Jobs";

export interface Params {
  jobId?: number;
}

export const useGetWorksessionsByJobId = (
  params: Params,
) => {
  const jobs = getApi(Jobs);
  return useSWR(
    ...jobs.worksessionsRestaurantTodosListQueryArgs(
      params.jobId ?? -1,
      {
        headers: {
          "X-User-Type": "company",
        },
      },
      params.jobId != null
    ),
  );
};
