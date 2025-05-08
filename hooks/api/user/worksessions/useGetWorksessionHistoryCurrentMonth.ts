import { getApi } from "@/api/api-factory";
import useSWR from "swr";
import { Users } from "@/api/__generated__/base/Users";
import { SessionHistoryCurrentListResult } from "@/api/__generated__/base/data-contracts";

interface Params {
  userId?: string;
}

export const useGetWorksessionHistoryCurrentMonth = (
  params: Params,
) => {
  const users = getApi(Users);
  return useSWR(...users.sessionHistoryCurrentListQueryArgs(params.userId ?? '', {
    headers: {
      "X-User-Type": "chef"
    }
  }, params.userId != null));
};
