import useSWR from "swr";
import { getApi } from "@/api/api-factory";
import { Users } from "@/api/__generated__/base/Users";

interface Params {
  userId?: string;
}

// シェフ→レストランのレビュー一覧を取得
export const useGetRestaurantReviewsByUserId = (
  params: Params,
) => {
  const userApi = getApi(Users);
  return useSWR(
    ...userApi.restaurantReviewsListQueryArgs(
      params.userId ?? '',
      {},
      params.userId != null,
    ),
  );
};
