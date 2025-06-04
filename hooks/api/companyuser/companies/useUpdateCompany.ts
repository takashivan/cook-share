import { getApi } from "@/api/api-factory";
import useSWR, { useSWRConfig } from "swr";
import { Companies } from "@/api/__generated__/base/Companies";
import useSWRMutation from "swr/mutation";

export interface Params {
  companyId: string;
}

export const useUpdateCompany = (params: Params) => {
  const { mutate } = useSWRConfig();

  const companies = getApi(Companies);
  return useSWRMutation(
    ...companies.companiesPartialUpdateQueryArgs(
      params.companyId ?? "",
      {
        headers: {
          "X-User-Type": "company",
        },
      },
      params.companyId != null
    ), {
      onSuccess: () => {
        // キャッシュを更新
        if (params.companyId) {
          const companyDetailKey = companies.companiesDetailQueryArgs(params.companyId)[0];
          mutate(companyDetailKey);
        }
      }
    }
  );
};
