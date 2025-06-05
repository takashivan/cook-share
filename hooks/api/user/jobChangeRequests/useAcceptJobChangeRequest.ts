import { getApi } from "@/api/api-factory";
import useSWRMutation from "swr/mutation";
import { JobChangeRequests } from "@/api/__generated__/base/JobChangeRequests";
import { useSWRConfig } from "swr";
import { JobChangeRequestsListData, JobsDetailData } from "@/api/__generated__/base/data-contracts";
import { Jobs } from "@/api/__generated__/base/Jobs";
export interface Params {
  jobChangeRequestId?: string;
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
      onSuccess: (data) => {
        // Job変更リクエストのリストのキャッシュを更新
        const jobChangeRequestsKey =
          jobChangeRequests.jobChangeRequestsListQueryArgs()[0];
        mutate(jobChangeRequestsKey, async (currentItems: JobChangeRequestsListData | undefined) => {
          if (!currentItems) return currentItems;

          const updatedItems = currentItems.map((item) => {
            if (item.id !== data.job_change_request.id) {
              return item;
            }
            // レスポンスのidと一致するJob変更リクエストを見つけたら、更新されたデータで上書き
            return data.job_change_request;
          });

          return updatedItems;
        }, { revalidate: false });

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
      }
    }
  );
};
