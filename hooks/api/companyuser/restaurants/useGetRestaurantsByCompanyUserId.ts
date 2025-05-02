import { getApi } from "@/api/api-factory"
import useSWR from "swr"
import { Companyusers } from "@/api/__generated__/base/Companyusers";
export interface Params {
  companyuserId?: string;
}

export const useGetRestaurantsByCompanyUserId = (params: Params) => {
  const companyusers = getApi(Companyusers);
  return useSWR(...companyusers.restaurantsListQueryArgs(params.companyuserId ?? '', {
    headers: {
      "X-User-Type": "company"
    }
  }, params.companyuserId != null));
}
