import { Companyusers } from "@/api/__generated__/base/Companyusers";
import { Jobs } from "@/api/__generated__/base/Jobs";
import { Restaurants } from "@/api/__generated__/base/Restaurants";
import { Worksessions } from "@/api/__generated__/base/Worksessions";
import { getApi } from "@/api/api-factory";
import { useSWRConfig } from "swr";
import useSWRMutation from "swr/mutation";

export interface Params {
  worksessionId?: number;
  reason?: string;
  handleSuccess?: () => void;
  handleError?: () => void;
}

export const useRejectWorksession = (params: Params) => {
  const { mutate } = useSWRConfig();

  const worksessions = getApi(Worksessions);
  return useSWRMutation(
    ...worksessions.rejectPartialUpdateQueryArgs(
      params.worksessionId ?? -1,
      {
        headers: {
          "X-User-Type": "company",
        },
      },
      params.worksessionId != null
    ),
    {
      onSuccess: () => {
        if (params.handleSuccess) params.handleSuccess();
      },
      onError: () => {
        if (params.handleError) params.handleError();
      },
    }
  );
};
