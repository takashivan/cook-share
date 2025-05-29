import { getApi } from "@/api/api-factory";
import useSWR from "swr";
import { Companies } from "@/api/__generated__/base/Companies";

export interface Params {
  companyId: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  logo: string;
}

export const useGetCompany = (params: Params) => {
  const companies = getApi(Companies);
  return useSWR(
    ...companies.companiesPartialUpdateQueryArgs(
      params.companyId ?? "",
      {
        headers: {
          "X-User-Type": "company",
        },
      },
      params.companyId != null
    )
  );
};
