import useSWR from "swr";
import { getApi } from "@/api/api-factory";
import { Worksessions } from "@/api/__generated__/base/Worksessions";

interface Params {
  worksessionId?: number;
}

// シェフ→レストランのレビュー一覧を取得
export const useGetRestaurantReviewByWorksessionId = (
  params: Params,
) => {
  const worksessionsApi = getApi(Worksessions);
  return useSWR(
    ...worksessionsApi.restaurantReviewListQueryArgs(
      params.worksessionId ?? -1,
      {},
      params.worksessionId != null,
    ),
  );
};
