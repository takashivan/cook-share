import { getApi } from "@/api/api-factory"
import useSWR from "swr"
import { Restaurants } from "@/api/__generated__/base/Restaurants";
export interface Params {
  restaurantId?: number;
}

export const useGetCompanyUsersByRestaurantId = (params: Params) => {
  const restaurants = getApi(Restaurants);
  return useSWR(...restaurants.companyusersListQueryArgs(params.restaurantId ?? -1, {
    headers: {
      "X-User-Type": "company"
    }
  }));
}
