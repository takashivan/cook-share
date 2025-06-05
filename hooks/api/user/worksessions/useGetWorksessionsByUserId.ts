import { getApi } from "@/api/api-factory";
import useSWR from "swr";
import { Users } from "@/api/__generated__/base/Users";

interface Params {
  userId?: string;
}

export const useGetWorksessionsByUserId = (
  params: Params,
) => {
  const users = getApi(Users);
  return useSWR(...users.worksessionsListQueryArgs(params.userId ?? '', {
    headers: {
      "X-User-Type": "chef"
    }
  }, params.userId != null), {
    revalidateOnMount: true,
    dedupingInterval: 0,
  });
};
