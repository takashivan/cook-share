import { getApi } from "@/api/api-factory"
import useSWR from "swr"
import { QueryConfigType } from "../config-type";
import { Jobs } from "@/api/__generated__/base/Jobs";

export interface Params {
  jobId?: number;
}

export const useGetApplicationsByJobId = (params: Params, config?: QueryConfigType) => {
  const { dedupingInterval } = config || {};
  const jobs = getApi(Jobs);
  return useSWR(...jobs.applicationsListQueryArgs(params.jobId ?? -1, {
    headers: {
      "X-User-Type": "company"
    }
  }, params.jobId != null), {
    dedupingInterval
  });
}
