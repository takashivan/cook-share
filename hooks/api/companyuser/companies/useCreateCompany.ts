import { Companies } from '@/api/__generated__/company/Companies';
import { getApi } from '@/api/api-factory';
import useSWRMutation from 'swr/mutation'

export const useCreateCompany = () => {
  const companiesApi = getApi(Companies);
  return useSWRMutation(...companiesApi.initialCreateQueryArgs({
    headers: {
      "X-User-Type": "company"
    }
  }), {
    throwOnError: true,
  })
}
