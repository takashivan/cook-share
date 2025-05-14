import { Companies } from '@/api/__generated__/base/Companies';
import { Companyusers } from '@/api/__generated__/base/Companyusers';
import { Restaurants } from '@/api/__generated__/base/Restaurants';
import { getApi } from '@/api/api-factory';
import { useSWRConfig } from 'swr';
import useSWRMutation from 'swr/mutation'

export interface Params {
  companyId?: string;
  companyUserId?: string;
  handleSuccess?: () => void;
  handleError?: (error: any) => void;
}

export const useCreateRestaurant = (params: Params) => {
  const { mutate } = useSWRConfig();

  const restaurants = getApi(Restaurants);
  return useSWRMutation(...restaurants.restaurantsCreateQueryArgs(
    {
      headers: {
        "X-User-Type": "company"
      }
    }
  ), {
    onSuccess: (data) => {
      console.log('Restaurant created successfully:', data);

      // キャッシュを更新
      if (params.companyId) {
        const companies = getApi(Companies);
        const restaurantsByCompanyIdKey = companies.restaurantsListQueryArgs(params.companyId)[0];
        mutate(restaurantsByCompanyIdKey);
      }

      if (params.companyUserId) {
        const companyusers = getApi(Companyusers);
        const restaurantsByCompanyUserIdKey = companyusers.restaurantsListQueryArgs(params.companyUserId)[0];
        mutate(restaurantsByCompanyUserIdKey);
      }

      if (params.handleSuccess) {
        params.handleSuccess();
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
