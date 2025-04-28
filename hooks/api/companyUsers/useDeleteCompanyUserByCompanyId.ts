import { Companies } from "@/api/__generated__/base/Companies";
import { CompanyusersListData, CompanyusersListOutput } from "@/api/__generated__/base/data-contracts";
import { Restaurants } from "@/api/__generated__/base/Restaurants";
import { getApi } from "@/api/api-factory";
import { useSWRConfig } from "swr";
import useSWRMutation from "swr/mutation";

export interface Params {
  companyId?: string;
  companyUserId?: string;
  restaurantId?: number;
}

export const useDeleteCompanyUserByCompanyId = (params: Params) => {
  const { mutate } = useSWRConfig();

  const companies = getApi(Companies);
  const restaurants = getApi(Restaurants);

  return useSWRMutation(...companies.companyusersDeleteQueryArgs(
    params.companyId ?? "",
    params.companyUserId ?? "",
    {
      companies_id: params.companyId ?? "",
      companyUser_id: params.companyUserId ?? "",
    },
    {
      headers: {
        "X-User-Type": "company"
      }
    },
    params.companyId != null && params.companyUserId != null
  ), {
    onSuccess: (data) => {
      console.log("Company user deleted successfully:", data);

      // 削除したユーザーが所属するレストランに関連するCompanyUsersリストのキャッシュを更新
      if (params.restaurantId) {
        const companyUsersListByCompanyIdKey = restaurants.companyusersListQueryArgs(params.restaurantId)[0];
        mutate(companyUsersListByCompanyIdKey, async (currentItems: CompanyusersListOutput | undefined) => {
          if (!currentItems) return currentItems;

          return {
            ...currentItems,
            admin: currentItems.admin.filter((staff) => staff.id !== params.companyUserId)
          };
        }, { revalidate: false });
      }

      //  削除したユーザーが所属する会社のCompanyUsersリストのキャッシュを更新
      if (params.companyId) {
        const companyUsersKey = companies.companyusersListQueryArgs(params.companyId)[0];
        mutate(companyUsersKey, async (currentItems: CompanyusersListData | undefined) => {
          if (!currentItems) return currentItems;

          return currentItems.filter((staff) => staff.id !== params.companyUserId);
        }, { revalidate: false });
      }
    }
  })
}