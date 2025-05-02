import { getApi } from "@/api/api-factory"
import useSWR from "swr"
import { Restaurants } from "@/api/__generated__/base/Restaurants";
export interface Params {
  restaurantId?: number;
}

export const useGetJobsByRestaurantId = (params: Params) => {
  const restaurant = getApi(Restaurants);
  return useSWR(...restaurant.jobsListQueryArgs(params.restaurantId ?? -1, {
    headers: {
      "X-User-Type": "company"
    }
  }, params.restaurantId != null),);
}
