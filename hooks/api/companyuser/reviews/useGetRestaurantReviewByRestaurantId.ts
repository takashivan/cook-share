import useSWR from "swr";
import { getApi } from "@/api/api-factory";
import { Restaurants } from "@/api/__generated__/base/Restaurants";

interface Params {
  restaurantId?: number;
}

export const useGetRestaurantReviewByRestaurantId = (
  params: Params,
) => {
  const restaurants = getApi(Restaurants);
  return useSWR(
    ...restaurants.chefReviewsListQueryArgs(
      params.restaurantId ?? -1,
      {
        headers: {
          "X-User-Type": "company",
        },
      },
      params.restaurantId != null,
    ),
  );
};
