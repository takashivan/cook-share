import { Jobs } from "@/api/__generated__/base/Jobs";
import { Worksessions } from "@/api/__generated__/base/Worksessions";
import { getApi } from "@/api/api-factory";
import { useSWRConfig } from "swr";
import useSWRMutation from "swr/mutation";

export interface Params {
  worksessionId?: number;
  jobId?: number;
}

export const useRejectWorksession = (params: Params) => {
  const { mutate } = useSWRConfig();

  const worksessions = getApi(Worksessions);
  return useSWRMutation(
    ...worksessions.rejectPartialUpdateQueryArgs(
      params.worksessionId ?? -1,
      {
        headers: {
          "X-User-Type": "company",
        },
      },
      params.worksessionId != null
    ),
    {
      throwOnError: true,
      onSuccess: () => {
        // キャッシュを更新
        if (params.jobId) {
          const jobs = getApi(Jobs);
          const worksessionsByJobIdKey =
            jobs.worksessionsRestaurantTodosListQueryArgs(
              params.jobId
            )[0];
          mutate(worksessionsByJobIdKey);
        }
      },
    }
  );
};
