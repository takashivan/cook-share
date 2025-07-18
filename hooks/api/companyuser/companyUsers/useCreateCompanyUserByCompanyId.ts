import { Restaurants } from '@/api/__generated__/base/Restaurants';
import { Companies } from '@/api/__generated__/base/Companies';
import { getApi } from '@/api/api-factory';
import { useSWRConfig } from 'swr';
import useSWRMutation from 'swr/mutation'

export interface Params {
  companyId?: string;
}

export const useCreateCompanyUserByCompanyId = (params: Params) => {
  const { mutate } = useSWRConfig();

  const companiesApi = getApi(Companies);
  return useSWRMutation(...companiesApi.companyusersCreateQueryArgs(params.companyId ?? '', {
    headers: {
      "X-User-Type": "company"
    }
  }, params.companyId != null), {
    throwOnError: true,
    onSuccess: (data) => {
      // キャッシュを更新
      // すべてのレストランのcompanyuserのキャッシュを更新する
      const restaurants = getApi(Restaurants);
      const sampleKeyArray = restaurants.companyusersListQueryArgs(0)[0];
      const sampleKey = Array.isArray(sampleKeyArray) ? sampleKeyArray[0] : '';
      const regexString = sampleKey.replace(/0/, '\\d+');
      const regex = new RegExp(`^${regexString}$`);
      mutate((key) => {
        console.log('key', key, regexString, Array.isArray(key) && regex.test(key[0]));
        return Array.isArray(key) && typeof key[0] === 'string' && regex.test(key[0]);
      });

      if (params.companyId) {
        const companies = getApi(Companies);
        const companyUsersListByCompanyIdKey = companies.companyusersListQueryArgs(params.companyId)[0];
        mutate(companyUsersListByCompanyIdKey);
      }
    },
  })
}
