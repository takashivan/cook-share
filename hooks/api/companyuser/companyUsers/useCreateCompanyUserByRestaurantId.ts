import { Restaurants } from '@/api/__generated__/base/Restaurants';
import { Companies } from '@/api/__generated__/base/Companies';
import { getApi } from '@/api/api-factory';
import { useSWRConfig } from 'swr';
import useSWRMutation from 'swr/mutation'

export interface Params {
  restaurantId?: number;
  companyId?: string;
}

export const useCreateCompanyUserByRestaurantId = (params: Params) => {
  const { mutate } = useSWRConfig();

  const restaurants = getApi(Restaurants);
  return useSWRMutation(...restaurants.companyusersCreateQueryArgs(params.restaurantId ?? -1, {
    headers: {
      "X-User-Type": "company"
    }
  }, params.restaurantId != null), {
    throwOnError: true,
    onSuccess: (data) => {
      console.log('Company user created successfully:', data);

      // 追加したユーザーが所属するレストランに関連するCompanyUsersリストのキャッシュを更新
      if (params.restaurantId) {
        const companyUsersKey = restaurants.companyusersListQueryArgs(params.restaurantId)[0];
        mutate(companyUsersKey);
      }

      // 追加したユーザーが所属する会社のCompanyUsersリストのキャッシュを更新
      if (params.companyId) {
        const companies = getApi(Companies);
        const companyUsersListByCompanyIdKey = companies.companyusersListQueryArgs(params.companyId)[0];
        mutate(companyUsersListByCompanyIdKey);
      }
    }
  })
}
