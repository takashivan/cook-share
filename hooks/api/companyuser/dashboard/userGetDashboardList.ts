import { getApi } from "@/api/api-factory";
import useSWR from "swr";
import { Companyusers } from "@/api/__generated__/base/Companyusers";
import { DashboardListData } from "@/api/__generated__/base/data-contracts";

export interface Params {
  companyuserId?: string;
}

export const useGetDashboardList = (params: Params) => {
  const companyusers = getApi(Companyusers);
  return useSWR(
    ...companyusers.dashboardListQueryArgs(
      params.companyuserId ?? "",
      {
        headers: {
          "X-User-Type": "company",
        },
      },
      params.companyuserId != null
    )
  );
};
