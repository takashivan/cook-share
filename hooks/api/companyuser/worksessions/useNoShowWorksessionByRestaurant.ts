import { WorksessionsRestaurantTodosListData } from "@/api/__generated__/base/data-contracts";
import { Jobs } from "@/api/__generated__/base/Jobs";
import { Worksessions } from "@/api/__generated__/base/Worksessions";
import { getApi } from "@/api/api-factory";
import { useSWRConfig } from "swr";
import useSWRMutation from "swr/mutation";

interface Params {
  worksession_id?: number;
  jobId?: number;
}

export const useNoShowWorksessionByRestaurant = (params: Params) => {
  const { mutate, cache } = useSWRConfig();
  const worksessions = getApi(Worksessions);

  return useSWRMutation(
    ...worksessions.noShowPartialUpdateQueryArgs(
      params.worksession_id ?? -1,
      {
        headers: {
          "X-User-Type": "company",
        },
      },
      params.worksession_id != null
    ),
    {
      throwOnError: true,
      onSuccess: (newData) => {
        // キャッシュを更新
        if (params.jobId) {
          const jobs = getApi(Jobs);
          const worksessionsByJobIdKey =
            jobs.worksessionsRestaurantTodosListQueryArgs(
              params.jobId
            )[0];
          mutate(worksessionsByJobIdKey);
        }

        for (const key of cache.keys()) {
          if (key.includes("MultipleWorksessionsByJobId")) {
            mutate(key, async (currentItems: WorksessionsRestaurantTodosListData[] | undefined) => {
              if (!currentItems) return currentItems;
  
              const newList = currentItems.map((item) => {
                return item.map((worksession) => {
                  if (worksession.id === newData.result1.id) {
                    return {
                      ...worksession,
                      ...newData.result1,
                    };
                  }
                  return worksession;
                });
              });
              return newList;
            }, { revalidate: false })
          }
        }
      },
    }
  );
};
