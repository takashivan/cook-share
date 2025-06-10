import { Companies } from '@/api/__generated__/base/Companies';
import { Companyusers } from '@/api/__generated__/base/Companyusers';
import { Restaurants } from '@/api/__generated__/base/Restaurants';
import { getApi } from '@/api/api-factory';
import { useSWRConfig } from 'swr';
import useSWRMutation from 'swr/mutation'

export interface Params {
  restaurantId?: number;
  companyId?: string;
  companyuserId?: string;
}

export const useUpdateRestaurant = (params: Params) => {
  const { mutate } = useSWRConfig();

  const restaurants = getApi(Restaurants);
  return useSWRMutation(...restaurants.restaurantsPartialUpdateQueryArgs(
    params.restaurantId ?? -1,
    {
      headers: {
        "X-User-Type": "company"
      }
    },
    params.restaurantId != null
  ), {
    throwOnError: true,
    onSuccess: (data) => {
      console.log('Restaurant created successfully:', data);

      // キャッシュを更新
      if (params.restaurantId) {
        const restaurantKey = restaurants.restaurantsDetailQueryArgs(params.restaurantId)[0];
        mutate(restaurantKey);
      }

      if (params.companyId) {
        const companies = getApi(Companies);
        const restaurantsByCompanyIdKey = companies.restaurantsListQueryArgs(params.companyId)[0];
        mutate(restaurantsByCompanyIdKey);
      }

      if (params.companyuserId) {
        const companyusers = getApi(Companyusers);
        const restaurantsByCompanyUserIdKey = companyusers.restaurantsListQueryArgs(params.companyuserId)[0];
        mutate(restaurantsByCompanyUserIdKey);
      }
    },
  })
}
