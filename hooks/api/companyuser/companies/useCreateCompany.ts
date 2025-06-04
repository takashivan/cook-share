import { Companies } from '@/api/__generated__/company/Companies';
import { getApi } from '@/api/api-factory';
import useSWRMutation from 'swr/mutation'

export interface Params {
  handleSuccess?: (data: any) => void;
  handleError?: (error: any) => void;
}

export const useCreateCompany = (params: Params) => {
  const companiesApi = getApi(Companies);
  return useSWRMutation(...companiesApi.initialCreateQueryArgs({
    headers: {
      "X-User-Type": "company"
    }
  }), {
    onSuccess: (data) => {
      // 成功時のコールバック
      if (params.handleSuccess) {
        params.handleSuccess(data);
      }
    },
    onError: (error) => {
      // エラー時のコールバック
      if (params.handleError) {
        params.handleError(error);
      }
    },
  })
}
