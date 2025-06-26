import useSWR from "swr";
import { getApi } from "@/api/api-factory";
import { Restaurants } from "@/api/__generated__/base/Restaurants";

interface Params {
  restaurantId?: number;
}

// シェフ→レストランのレビュー一覧を取得
export const useGetChefReviewsByRestaurantId = (
  params: Params,
) => {
  const restaurantApi = getApi(Restaurants);
  return useSWR(
    ...restaurantApi.chefReviewsListQueryArgs(
      params.restaurantId ?? -1,
      {},
      params.restaurantId != null,
    ),
  );
};
