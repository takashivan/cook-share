import useSWR from "swr";
import { RestaurantReviews } from "@/api/__generated__/base/RestaurantReviews";
import { ReviewsListResult } from "@/api/__generated__/base/data-contracts";
import { Users } from "@/api/__generated__/base/Users";
import { getApi } from "@/api/api-factory";

interface Params {
  userId?: string;
}

export const useGetReviewsByUserId = (
  params: Params,
) => {
  const reviews = getApi(RestaurantReviews);
  const users = getApi(Users);
  return useSWR(...users.reviewsListQueryArgs(params.userId ?? '', {
    headers: {
      "X-User-Type": "chef"
    }
  }, params.userId != null));
};
