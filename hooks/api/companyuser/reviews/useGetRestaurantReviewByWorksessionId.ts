import useSWR from "swr";
import { getApi } from "@/api/api-factory";
import { Worksessions } from "@/api/__generated__/base/Worksessions";

interface Params {
  worksessionId?: number;
}

export const useGetRestaurantReviewByWorksessionId = (
  params: Params,
) => {
  const worksessionsApi = getApi(Worksessions);
  return useSWR(
    ...worksessionsApi.chefReviewListQueryArgs(
      params.worksessionId ?? -1,
      {
        headers: {
          "X-User-Type": "company",
        },
      },
      params.worksessionId != null,
    ),
  );
};
