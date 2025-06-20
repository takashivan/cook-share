import { getApi } from "@/api/api-factory"
import useSWR from "swr"
import { Users } from "@/api/__generated__/base/Users";

export interface Params {
  userId?: string;
}

export const useGetWorksessionsByUserIdByTodo = (params: Params) => {
  const users = getApi(Users);
  return useSWR(...users.worksessionsUserTodosListQueryArgs(params.userId ?? '', {
    headers: {
      "X-User-Type": "chef"
    }
  }, params.userId != null), {
    revalidateOnMount: true,
    dedupingInterval: 0,
  });
}
