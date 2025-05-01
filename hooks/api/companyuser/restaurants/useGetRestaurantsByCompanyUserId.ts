import { getApi } from "@/api/api-factory"
import useSWR from "swr"
import { QueryConfigType } from "../../config-type";
import { Companyusers } from "@/api/__generated__/base/Companyusers";

export interface Params {
  companyuserId?: string;
}

export const useGetRestaurantsByCompanyUserId = (params: Params, config?: QueryConfigType) => {
  const { dedupingInterval } = config || {};
  const companyusers = getApi(Companyusers);
  return useSWR(...companyusers.restaurantsListQueryArgs(params.companyuserId ?? '', {
    headers: {
      "X-User-Type": "company"
    }
  }, params.companyuserId != null), {
    dedupingInterval
  });
}
