import { Jobs } from "@/api/__generated__/base/Jobs";
import { QueryConfigType } from "../../config-type";
import { getApi } from "@/api/api-factory";
import useSWR from "swr";
import { WorksessionsRestaurantTodosListData } from "@/api/__generated__/base/data-contracts";

export interface Params {
  jobIds: number[];
}

export const useGetMultipleWorksessionsByJobId = (params: Params, config?: QueryConfigType) => {
  const { dedupingInterval } = config || {};
  const jobs = getApi(Jobs);

  const keys: string[] = [];
  const fetchers: (() => Promise<WorksessionsRestaurantTodosListData>)[] = [];
  for (const jobId of params.jobIds) {
    const [key, fetcher] = jobs.worksessionsRestaurantTodosListQueryArgs(jobId, {
      headers: {
        "X-User-Type": "company"
      }
    }, jobId != null);
    if (key != null) {
      keys.push(key[0]);
      fetchers.push(fetcher);
    }
  }

  return useSWR(
    keys.length > 0 ? keys : null,
    () => Promise.all(fetchers.map((fetcher) => fetcher())),
    {
      dedupingInterval,
    }
  );
}
