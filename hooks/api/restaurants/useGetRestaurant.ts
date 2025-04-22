import { getApi } from "@/api/api-factory"
import useSWR from "swr"
import { QueryConfigType } from "../config-type";
import { Restaurants } from "@/api/__generated__/base/Restaurants";

export interface Params {
  restaurantId?: number;
}

export const useGetRestaurant = (params: Params, config?: QueryConfigType) => {
  const { dedupingInterval } = config || {};
  const restaurants = getApi(Restaurants);
  return useSWR(...restaurants.restaurantsDetailQueryArgs(params.restaurantId ?? -1, {
    headers: {
      "X-User-Type": "company"
    }
  }, params.restaurantId != null), {
    dedupingInterval
  });
}
