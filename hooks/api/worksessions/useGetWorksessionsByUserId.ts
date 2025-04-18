import { getApi } from "@/api/api-factory"
import useSWR from "swr"
import { QueryConfigType } from "../config-type";
import { Users } from "@/api/__generated__/base/Users";

interface Params {
  userId?: string;
}

export const useGetWorksessionsByUserId = (params: Params, config?: QueryConfigType) => {
  const { dedupingInterval } = config || {};
  const users = getApi(Users);
  return useSWR(...users.worksessionsListQueryArgs(params.userId ?? '', {}, params.userId != null), {
    dedupingInterval
  });
}
