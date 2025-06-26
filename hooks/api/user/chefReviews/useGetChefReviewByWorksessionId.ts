import useSWR from "swr";
import { getApi } from "@/api/api-factory";
import { Users } from "@/api/__generated__/base/Users";

interface Params {
  userId?: string;
  worksessionId?: number;
}

// シェフ→レストランのレビューを取得
export const useGetChefReviewByWorksessionId = (
  params: Params,
) => {
  const userApi = getApi(Users);
  return useSWR(
    ...userApi.worksessionsChefReviewListQueryArgs(
      params.worksessionId ?? -1,
      params.userId ?? '',
      {},
      params.userId != null && params.worksessionId != null,
    ),
  );
};
