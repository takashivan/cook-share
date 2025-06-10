import { getApi } from "@/api/api-factory";
import useSWR from "swr";
import { Jobs } from "@/api/__generated__/base/Jobs";

export interface Params {
  jobId?: number;
}

export const useGetJob = (params: Params) => {
  const jobs = getApi(Jobs);
  return useSWR(
    ...jobs.jobsDetailQueryArgs(
      params.jobId ?? -1,
      {},
      params.jobId != null
    )
  );
};
