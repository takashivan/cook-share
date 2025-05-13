import { Jobs } from '@/api/__generated__/base/Jobs';
import { Users } from '@/api/__generated__/base/Users';
import { Worksessions } from '@/api/__generated__/base/Worksessions';
import { getApi } from '@/api/api-factory';
import { useSWRConfig } from 'swr';
import useSWRMutation from 'swr/mutation'

export interface Params {
  worksessionId?: number;
  userId?: string;
}

export const useStartWorksession = (params: Params) => {
  const { mutate } = useSWRConfig();

  const worksessions = getApi(Worksessions);
  return useSWRMutation(...worksessions.startPartialUpdateQueryArgs(params.worksessionId ?? -1, {
    headers: {
      "X-User-Type": "chef"
    }
  }, params.worksessionId != null), {
    onSuccess: () => {
      if (params.userId) {
        const users = getApi(Users);
        const worksessionsByUserIdKey = users.worksessionsListQueryArgs(params.userId)[0];
        mutate(worksessionsByUserIdKey);

        const worksessionsByUserIdTodoKey = users.worksessionsListQueryArgs(params.userId)[0];
        mutate(worksessionsByUserIdTodoKey);
      }
    }
  })
}
