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
  return useSWR<SessionHistoryCurrentListResult>(
    params.userId ? ["sessionHistoryCurrentList", params.userId] : null,
    async () => {
      if (!params.userId) return [];
      const response = await users.sessionHistoryCurrentList(params.userId, {
        headers: {
          "X-User-Type": "chef",
        },
      });
      return response.data;
    },
  );
};
