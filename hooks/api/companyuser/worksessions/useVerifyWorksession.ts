import { Companyusers } from '@/api/__generated__/base/Companyusers';
import { WorksessionsRestaurantTodosListData } from '@/api/__generated__/base/data-contracts';
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
  executedCompanyuserId?: string;
}

export const useVerifyWorksession = (params: Params) => {
  const { mutate, cache } = useSWRConfig();

  const worksessions = getApi(Worksessions);
  return useSWRMutation(...worksessions.verifyPartialUpdateQueryArgs(params.worksessionId ?? -1, {
    headers: {
      "X-User-Type": "company"
    }
  }, params.worksessionId != null), {
    throwOnError: true,
    onSuccess: (newData) => {
      // 更新したWorksessionが属する求人のWorksessionリストのキャッシュを更新
      if (params.jobId) {
        const jobs = getApi(Jobs);
        const worksessionsByJobIdKey = jobs.worksessionsRestaurantTodosListQueryArgs(params.jobId)[0];
        mutate(worksessionsByJobIdKey);
      }

      for (const key of cache.keys()) {
        if (key.includes("MultipleWorksessionsByJobId")) {
          mutate(key, async (currentItems: WorksessionsRestaurantTodosListData[] | undefined) => {
            if (!currentItems) return currentItems;

            const newList = currentItems.map((item) => {
              return item.map((worksession) => {
                if (worksession.id === newData.result1.id) {
                  return {
                    ...worksession,
                    ...newData.result1,
                  };
                }
                return worksession;
              });
            });
            return newList;
          }, { revalidate: false })
        }
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

      if (params.executedCompanyuserId) {
        // ダッシュボードのキャッシュを更新
        const companyusers = getApi(Companyusers);
        const dashboardListKey = companyusers.dashboardListQueryArgs(params.executedCompanyuserId)[0];
        mutate(dashboardListKey);
      }
    },
  })
}
