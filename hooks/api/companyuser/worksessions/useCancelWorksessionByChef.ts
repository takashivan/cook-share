import { Jobs } from "@/api/__generated__/base/Jobs";
import { Worksessions } from "@/api/__generated__/base/Worksessions";
import { getApi } from "@/api/api-factory";
import { useSWRConfig } from "swr";
import useSWRMutation from "swr/mutation";

interface Params {
  worksession_id: number;
  reason: string;
}

export const useCancelWorksessionByChef = (params: Params) => {
  const { mutate } = useSWRConfig();
  const worksessions = getApi(Worksessions);

  return useSWRMutation(
    `cancel-worksession-${params.worksession_id}`,
    () =>
      worksessions.cancelByChefPartialUpdate(
        params.worksession_id,
        {
          reason: params.reason,
        },
        {
          headers: {
            "X-User-Type": "chef",
          },
        }
      ),
    {
      onSuccess: () => {
        // キャッシュを更新
        const jobs = getApi(Jobs);
        const worksessionsByJobIdKey =
          jobs.worksessionsRestaurantTodosListQueryArgs(
            params.worksession_id
          )[0];
        mutate(worksessionsByJobIdKey);
      },
    }
  );
};
