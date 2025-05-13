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
  handleSuccess?: (data: any) => void;
  handleError?: (error: any) => void;
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
    onSuccess: (data) => {
      console.log('Restaurant created successfully:', data);

      // キャッシュを更新
      const restaurantsKey = restaurants.restaurantsListQueryArgs()[0];
      mutate(restaurantsKey);

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

      if (params.handleSuccess) {
        params.handleSuccess(data);
      }
    },
    onError: (error) => {
      console.error('Error creating restaurant:', error);
      if (params.handleError) {
        params.handleError(error);
      }
    },
  })
}
