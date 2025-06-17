import { getApi } from "@/api/api-factory";
import useSWRMutation from "swr/mutation";
import { JobChangeRequests } from "@/api/__generated__/base/JobChangeRequests";
import { useSWRConfig } from "swr";
import { JobChangeRequestChefListData, JobChangeRequestsListData, JobsDetailData } from "@/api/__generated__/base/data-contracts";
import { Jobs } from "@/api/__generated__/base/Jobs";
import { Users } from "@/api/__generated__/base/Users";
import { Worksessions } from "@/api/__generated__/base/Worksessions";
export interface Params {
  jobChangeRequestId?: string;
  userId?: string;
  workSessionId?: number;
}

export const useAcceptJobChangeRequest = (params: Params) => {
  const { mutate } = useSWRConfig();

  const jobChangeRequests = getApi(JobChangeRequests);
  return useSWRMutation(
    ...jobChangeRequests.acceptPartialUpdateQueryArgs(params.jobChangeRequestId ?? "",
      {
        headers: {
          "X-User-Type": "chef",
        },
      },
      params.jobChangeRequestId != null
    ), {
      throwOnError: true,
      onSuccess: (data) => {
        if (params.workSessionId) {
          // Job変更リクエストのリストのキャッシュを更新
          const worksessionsApi = getApi(Worksessions);
          const jobChangeRequestsKey =
            worksessionsApi.jobChangeRequestChefListQueryArgs(params.workSessionId)[0];
          mutate(jobChangeRequestsKey, async (currentItem: JobChangeRequestChefListData | undefined) => {
            if (!currentItem) return currentItem;

            return data.job_change_request;
          }, { revalidate: false });
        }

        // 該当のJobのキャッシュを更新
        const jobId = data.job.id;
        const jobs = getApi(Jobs);
        const jobKey = jobs.jobsDetailQueryArgs(jobId)[0];
        mutate(jobKey, async (currentJob: JobsDetailData | undefined) => {
          if (!currentJob) return currentJob;

          // 更新されたデータで上書き
          return {
            ...currentJob,
            job: data.job,
          };
        }
        , { revalidate: false });

        if (params.userId) {
          const users = getApi(Users);
          const worksessionsByUserIdKey = users.worksessionsListQueryArgs(params.userId)[0];
          mutate(worksessionsByUserIdKey);
  
          const worksessionsByUserIdTodoKey = users.worksessionsUserTodosListQueryArgs(params.userId)[0];
          mutate(worksessionsByUserIdTodoKey);
        }
      }
    }
  );
};
