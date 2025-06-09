import { Jobs } from '@/api/__generated__/base/Jobs';
import { Users } from '@/api/__generated__/base/Users';
import { getApi } from '@/api/api-factory';
import { useSWRConfig } from 'swr';
import useSWRMutation from 'swr/mutation'

export interface Params {
  jobId?: number;
  userId?: string;
}

export const useApplyJob = (params: Params) => {
  const { mutate } = useSWRConfig();

  const jobsApi = getApi(Jobs);
  return useSWRMutation(...jobsApi.applyCreateQueryArgs(params.jobId ?? -1, {
    headers: {
      "X-User-Type": "chef"
    }
  }, params.jobId != null), {
    throwOnError: true,
    onSuccess: (data) => {
      if (params.jobId) {
        const worksessionsByUserIdKey = jobsApi.queryUpcomingListQueryArgs()[0];
        mutate(worksessionsByUserIdKey);
      }

      if (params.userId) {
        const usersApi = getApi(Users);
        const worksessionsByUserIdKey = usersApi.worksessionsListQueryArgs(params.userId)[0];
        mutate(worksessionsByUserIdKey);

        const worksessionsByUserIdTodoKey = usersApi.worksessionsUserTodosListQueryArgs(params.userId)[0];
        mutate(worksessionsByUserIdTodoKey);

        const worksessionsByUserIdHistoryKey = usersApi.sessionHistoryCurrentListQueryArgs(params.userId)[0];
        mutate(worksessionsByUserIdHistoryKey);
      }
    },
  })
}
