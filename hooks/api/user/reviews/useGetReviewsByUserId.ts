import useSWR from "swr";
import { Users } from "@/api/__generated__/base/Users";
import { getApi } from "@/api/api-factory";

interface Params {
  userId?: string;
}

export const useGetReviewsByUserId = (
  params: Params,
) => {
  const users = getApi(Users);
  return useSWR(...users.reviewsListQueryArgs(params.userId ?? '', {
    headers: {
      "X-User-Type": "chef"
    }
  }, params.userId != null), {
    revalidateOnMount: true,
    dedupingInterval: 0,
  });
};
