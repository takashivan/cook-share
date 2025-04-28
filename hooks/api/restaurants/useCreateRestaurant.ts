import { Companies } from '@/api/__generated__/base/Companies';
import { Restaurants } from '@/api/__generated__/base/Restaurants';
import { getApi } from '@/api/api-factory';
import { useSWRConfig } from 'swr';
import useSWRMutation from 'swr/mutation'

export interface Params {
  companyId?: string;
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

      // Restaurantsリストのキャッシュを更新
      const restaurantsKey = restaurants.restaurantsListQueryArgs()[0];
      mutate(restaurantsKey);

      // 追加したレストランの会社が持つRestaurantsリストのキャッシュを更新
      if (params.companyId) {
        const companies = getApi(Companies);
        const restaurantsByCompanyIdKey = companies.restaurantsListQueryArgs(params.companyId)[0];
        mutate(restaurantsByCompanyIdKey);
      }
    }
  })
}
