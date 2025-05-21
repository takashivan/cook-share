import { Jobs } from '@/api/__generated__/base/Jobs';
import { Restaurants } from '@/api/__generated__/base/Restaurants';
import { Worksessions } from '@/api/__generated__/base/Worksessions';
import { getApi } from '@/api/api-factory';
import { useSWRConfig } from 'swr';
import useSWRMutation from 'swr/mutation'

export interface Params {
  worksessionId?: number;
  jobId?: number;
  restaurantId?: number;
  handleSuccess?: () => void;
  handleError?: () => void;
}

export const useVerifyWorksession = (params: Params) => {
  const { mutate } = useSWRConfig();

  const worksessions = getApi(Worksessions);
  return useSWRMutation(...worksessions.verifyPartialUpdateQueryArgs(params.worksessionId ?? -1, {
    headers: {
      "X-User-Type": "company"
    }
  }, params.worksessionId != null), {
    onSuccess: () => {
      // 更新したWorksessionが属する求人のWorksessionリストのキャッシュを更新
      if (params.jobId) {
        const jobs = getApi(Jobs);
        const worksessionsByJobIdKey = jobs.worksessionsRestaurantTodosListQueryArgs(params.jobId)[0];
        mutate(worksessionsByJobIdKey);
      }

      // レビューのキャッシュを更新
      if (params.restaurantId) {
        const restaurants = getApi(Restaurants);
        const reviewsByRestaurantIdKey = restaurants.chefReviewsListQueryArgs(params.restaurantId)[0];
        mutate(reviewsByRestaurantIdKey);
      }
      if (params.worksessionId) {
        const worksessions = getApi(Worksessions);
        const worksessionsByIdKey = worksessions.chefReviewListQueryArgs(params.worksessionId)[0];
        mutate(worksessionsByIdKey);
      }

      if (params.handleSuccess) {
        params.handleSuccess();
      }
    },
    onError: () => {
      if (params.handleError) {
        params.handleError();
      }
    }
  })
}
