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
  return useSWR(
    params.userId ? ["worksessionsList", params.userId] : null,
    async () => {
      if (!params.userId) return [];
      const response = await users.worksessionsList(params.userId, {
        headers: {
          "X-User-Type": "chef",
        },
      });
      return response.data;
    },
  );
};
