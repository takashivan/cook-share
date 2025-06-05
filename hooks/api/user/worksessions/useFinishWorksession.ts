import { Users } from '@/api/__generated__/base/Users';
import { Worksessions } from '@/api/__generated__/base/Worksessions';
import { getApi } from '@/api/api-factory';
import { useSWRConfig } from 'swr';
import useSWRMutation from 'swr/mutation'

export interface Params {
  worksessionId?: number;
  userId?: string;
  handleSuccess?: () => void;
  handleError?: (error: any) => void;
}

export const useFinishWorksession = (params: Params) => {
  const { mutate } = useSWRConfig();

  const worksessions = getApi(Worksessions);
  return useSWRMutation(...worksessions.finishPartialUpdateQueryArgs(params.worksessionId ?? -1, {
    headers: {
      "X-User-Type": "chef"
    }
  }, params.worksessionId != null), {
    onSuccess: () => {
      if (params.userId) {
        const users = getApi(Users);
        const worksessionsByUserIdKey = users.worksessionsListQueryArgs(params.userId)[0];
        mutate(worksessionsByUserIdKey);

        const worksessionsByUserIdTodoKey = users.worksessionsUserTodosListQueryArgs(params.userId)[0];
        mutate(worksessionsByUserIdTodoKey);

        const myReviews = users.chefReviewsListQueryArgs(params.userId)[0];
        mutate(myReviews);
      }

      if (params.handleSuccess) {
        params.handleSuccess();
      }
    },
    onError: (error) => {
      if (params.handleError) {
        params.handleError(error);
      }
    }
  })
}
