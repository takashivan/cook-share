import { getApi } from "@/api/api-factory";
import useSWR from "swr";
import { Users } from "@/api/__generated__/base/Users";

interface Params {
  userId?: string;
}

export const useGetPayoutLogsByUserId = (
  params: Params,
) => {
  const users = getApi(Users);
  return useSWR(...users.payoutLogsListQueryArgs(params.userId ?? '', {
    headers: {
      "X-User-Type": "chef"
    }
  }, params.userId != null));
};
