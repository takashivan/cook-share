import useSWR from "swr";
import { getApi } from "@/api/api-factory";
import { Restaurants } from "@/api/__generated__/base/Restaurants";

interface Params {
  restaurantId?: number;
  worksessionId?: number;
  enabled?: boolean;
}

// シェフ→レストランのレビューを取得
export const useGetChefReviewByWorksessionId = (
  params: Params,
) => {
  console.log("useGetChefReviewByWorksessionId", params.enabled);
  const restaurantApi = getApi(Restaurants);
  return useSWR(
    ...restaurantApi.worksessionsChefReviewListQueryArgs(
      params.worksessionId ?? -1,
      params.restaurantId ?? -1,
      {},
      params.enabled === true && params.restaurantId != null && params.worksessionId != null,
    ),
  );
};
