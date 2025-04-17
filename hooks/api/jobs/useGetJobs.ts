import { Jobs } from "@/api/__generated__/base/Jobs"
import { getApi } from "@/api/api-factory"
import useSWR from "swr"

interface Params {
  dedupingInterval?: number;
}

export const useGetJobs = (config?: Params) => {
  const { dedupingInterval } = config || {};
  const jobs = getApi(Jobs);
  return useSWR(...jobs.jobsListQueryArgs(), {
    dedupingInterval: dedupingInterval ?? 60 * 1000 // デフォルトの重複排除間隔を1分に設定
  });
}
