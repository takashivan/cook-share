import { Chat } from "@/api/__generated__/base/Chat";
import { Users } from "@/api/__generated__/base/Users";
import { getApi } from "@/api/api-factory";
import { useSWRConfig } from "swr";
import useSWRMutation from "swr/mutation";

export interface Params {
  userId?: string;
  workSessionId?: number;
}

export const useUpdateReadMessageByUser = (params: Params) => {
  const { mutate } = useSWRConfig();

  const chat = getApi(Chat);
  const [key, fetcher] = chat.updateReadChefPartialUpdateQueryArgs({
    headers: {
      "X-User-Type": "chef",
    },
  });

  return useSWRMutation(key, fetcher, {
    throwOnError: true,
    onSuccess: () => {
      // Messagesリストのキャッシュを更新
      if (params.userId && params.workSessionId) {
        const usersApi = getApi(Users);
        const messagesByUserIdKey = usersApi.worksessionsMessagesListQueryArgs(
          params.userId,
          params.workSessionId,
        )[0];
        mutate(messagesByUserIdKey);
      }

      // 未読のMessagesリストのキャッシュを更新
      const unreadMessagesByUserIdKey = chat.unreadSummaryChefListQueryArgs()[0];
      mutate(unreadMessagesByUserIdKey);

      // Messagesサマリーのキャッシュを更新
      const messagesSummaryByUserIdKey = chat.summaryChefListQueryArgs({
        user_id: params.userId ?? '',
      })[0];
      mutate(messagesSummaryByUserIdKey);
    },
  });
};
