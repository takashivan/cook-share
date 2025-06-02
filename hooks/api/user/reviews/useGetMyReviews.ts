import useSWR from "swr";
import { Users } from "@/api/__generated__/base/Users";
import { getApi } from "@/api/api-factory";

interface Params {
  userId?: string;
}

// 自分が書いたレビューを取得するためのフック
export const useGetMyReviews = (
  params: Params,
) => {
  const users = getApi(Users);
  return useSWR(...users.chefReviewsListQueryArgs(params.userId ?? "", {
    headers: {
      "X-User-Type": "chef"
    }
  }, params.userId != null));
};
