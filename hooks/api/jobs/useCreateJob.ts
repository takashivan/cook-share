import { Companies } from '@/api/__generated__/base/Companies';
import { Jobs } from '@/api/__generated__/base/Jobs';
import { Restaurants } from '@/api/__generated__/base/Restaurants';
import { getApi } from '@/api/api-factory';
import { useSWRConfig } from 'swr';
import useSWRMutation from 'swr/mutation'

export interface Params {
  companyId?: string;
  restaurantId?: number;
}

export const useCreateJob = (params: Params) => {
  const { mutate } = useSWRConfig();

  const jobs = getApi(Jobs);
  return useSWRMutation(...jobs.jobsCreateQueryArgs(), {
    onSuccess: (data) => {
      console.log('Job created successfully:', data);

      const jobsKey = jobs.jobsListQueryArgs()[0];
      mutate(jobsKey);

      const companies = getApi(Companies);
      const jobsByCompanyIdKey = companies.jobsListQueryArgs(params.companyId ?? '')[0];
      mutate(jobsByCompanyIdKey);

      const restaurant = getApi(Restaurants);
      const jobsByRestaurantIdKey = restaurant.jobsListQueryArgs(params.restaurantId ?? -1)[0];
      mutate(jobsByRestaurantIdKey);
    }
  })
}
