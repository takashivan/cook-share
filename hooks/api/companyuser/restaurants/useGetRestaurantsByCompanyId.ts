import { getApi } from "@/api/api-factory"
import useSWR from "swr"
import { Companies } from "@/api/__generated__/base/Companies";
export interface Params {
  companyId?: string;
}

export const useGetRestaurantsByCompanyId = (params: Params) => {
  const companies = getApi(Companies);
  return useSWR(...companies.restaurantsListQueryArgs(params.companyId ?? '', {
    headers: {
      "X-User-Type": "company"
    }
  }, params.companyId != null));
}
