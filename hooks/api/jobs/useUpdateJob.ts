import { Companies } from '@/api/__generated__/base/Companies';
import { Jobs } from '@/api/__generated__/base/Jobs';
import { Restaurants } from '@/api/__generated__/base/Restaurants';
import { getApi } from '@/api/api-factory';
import { useSWRConfig } from 'swr';
import useSWRMutation from 'swr/mutation'

export interface Params {
  jobId?: number;
  companyId?: string;
  restaurantId?: number;
}

export const useUpdateJob = (params: Params) => {
  const { mutate } = useSWRConfig();

  const jobs = getApi(Jobs);
  return useSWRMutation(...jobs.jobsPartialUpdateQueryArgs(params.jobId ?? -1, {}, params.jobId != null), {
    onSuccess: () => {
      // Jobsリストのキャッシュを更新
      const jobsKey = jobs.jobsListQueryArgs()[0];
      mutate(jobsKey);

      // 更新した求人の会社が持つJobsリストのキャッシュを更新
      if (params.companyId) {
        const companies = getApi(Companies);
        const jobsByCompanyIdKey = companies.jobsListQueryArgs(params.companyId)[0];
        mutate(jobsByCompanyIdKey);
      }

      // 更新した求人のレストランが持つJobsリストのキャッシュを更新
      if (params.restaurantId) {
        const restaurant = getApi(Restaurants);
        const jobsByRestaurantIdKey = restaurant.jobsListQueryArgs(params.restaurantId)[0];
        mutate(jobsByRestaurantIdKey);
      }
    }
  })
}
