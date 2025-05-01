import useSWR from "swr";
import { QueryConfigType } from "../../config-type";
import { ChefReviews } from "@/api/__generated__/base/ChefReviews";
import { getApi } from "@/api/api-factory";
import { Restaurants } from "@/api/__generated__/base/Restaurants";
import { ChefReviewsListData } from "@/api/__generated__/base/data-contracts";

interface Params {
  restaurantId?: number;
}

export const useGetRestaurantReviewByRestaurantId = (
  params: Params,
  config?: QueryConfigType
) => {
  const { dedupingInterval } = config || {};
  const reviews = getApi(ChefReviews);
  const restaurants = getApi(Restaurants);
  return useSWR<ChefReviewsListData>(
    params.restaurantId ? ["reviews", params.restaurantId] : null,
    async () => {
      if (!params.restaurantId) return [];
      const response = await restaurants.chefReviewsList(params.restaurantId, {
        headers: {
          "X-User-Type": "company",
        },
      });
      return response.data;
    },
    {
      dedupingInterval,
    }
  );
};
