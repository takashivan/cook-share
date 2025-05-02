import { getApi } from "@/api/api-factory"
import useSWR from "swr"
import { QueryConfigType } from "../../config-type";
import { Companies } from "@/api/__generated__/company/Companies";

export interface Params {
  companyId?: string;
}

export const useGetCurrentBillingSummaryByCompanyId = (params: Params, config?: QueryConfigType) => {
  const { dedupingInterval } = config || {};
  const companies = getApi(Companies);
  return useSWR(...companies.billingSummaryCurrentListQueryArgs(params.companyId ?? '', {
    headers: {
      "X-User-Type": "company"
    }
  }, params.companyId != null), {
    dedupingInterval
  });
}
