import { getApi } from "@/api/api-factory"
import useSWR from "swr"
import { RestaurantCuisines } from "@/api/__generated__/base/RestaurantCuisines";

export const useGetRestaurantCuisines = () => {
  const restaurantCuisinesApi = getApi(RestaurantCuisines);
  return useSWR(...restaurantCuisinesApi.restaurantCuisinesListQueryArgs());
}
