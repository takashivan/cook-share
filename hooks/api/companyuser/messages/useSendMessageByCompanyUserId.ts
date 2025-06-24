import { Companyusers } from "@/api/__generated__/base/Companyusers";
import { getApi } from "@/api/api-factory";
import { useSWRConfig } from "swr";
import useSWRMutation from "swr/mutation";

interface Params {
  companyUserId?: string;
  workSessionId?: number;
}

export const useSendMessageByCompanyUserId = (params: Params) => {
  const { mutate } = useSWRConfig();

  const companyusersApi = getApi(Companyusers);

  return useSWRMutation(...companyusersApi.messagesCreateQueryArgs(
    params.companyUserId ?? '',
    {
      headers: {
        "X-User-Type": "company"
      }
    },
    params.companyUserId != null
  ), {
    throwOnError: true,
    onSuccess: () => {
      if (params.companyUserId && params.workSessionId) {
        const messagesKey = companyusersApi.worksessionsMessagesListQueryArgs(params.companyUserId ?? '', params.workSessionId ?? -1);
        mutate(messagesKey);
      }
    }
  })
}