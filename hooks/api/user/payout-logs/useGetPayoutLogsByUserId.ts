import { getApi } from "@/api/api-factory";
import useSWR from "swr";
import { QueryConfigType } from "../../config-type";
import { Users } from "@/api/__generated__/base/Users";
import { ChefPayoutLog } from "@/api/__generated__/base/ChefPayoutLog";
import { ChefPayoutLogListData } from "@/api/__generated__/base/data-contracts";
interface Params {
  userId?: string;
}

export const useGetPayoutLogsByUserId = (
  params: Params,
  config?: QueryConfigType
) => {
  const { dedupingInterval } = config || {};
  const payoutLogs = getApi(ChefPayoutLog);
  const users = getApi(Users);
  return useSWR<ChefPayoutLogListData>(
    params.userId ? ["payoutLogs", params.userId] : null,
    async () => {
      if (!params.userId) return [];
      const response = await users.payoutLogsList(params.userId, {
        headers: {
          "X-User-Type": "chef",
        },
      });
      return response.data;
    },
    {
      dedupingInterval,
    }
  );
};
