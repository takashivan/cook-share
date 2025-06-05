import { Jobs } from "@/api/__generated__/base/Jobs";
import { Users } from "@/api/__generated__/base/Users";
import { Worksessions } from "@/api/__generated__/base/Worksessions";
import { getApi } from "@/api/api-factory";
import { useSWRConfig } from "swr";
import useSWRMutation from "swr/mutation";

interface Params {
  worksessionId?: number;
  userId?: string;
}

export const useCancelWorksessionByChef = (params: Params) => {
  const { mutate } = useSWRConfig();
  const worksessions = getApi(Worksessions);

  return useSWRMutation(
    ...worksessions.cancelByChefPartialUpdateQueryArgs(
      params.worksessionId ?? -1,
      {
        headers: {
          "X-User-Type": "chef",
        },
      },
      params.worksessionId != null
    ),
    {
      onSuccess: () => {
        // キャッシュを更新
        if (params.userId) {
          const usersApi = getApi(Users);
          const worksessionsByUserIdKey =
            usersApi.worksessionsListQueryArgs(params.userId)[0];
          mutate(worksessionsByUserIdKey);

          const worksessionsByUserIdTodoKey =
            usersApi.worksessionsUserTodosListQueryArgs(params.userId)[0];
          mutate(worksessionsByUserIdTodoKey);
        }
      },
    }
  );
};
