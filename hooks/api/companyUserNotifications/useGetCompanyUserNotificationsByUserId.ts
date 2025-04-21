import { getApi } from "@/api/api-factory"
import useSWR from "swr"
import { QueryConfigType } from "../config-type";
import { Companyusers } from "@/api/__generated__/base/Companyusers";

export interface Params {
  userId?: string;
}

export const useGetCompanyUserNotificationsByUserId = (params: Params, config?: QueryConfigType) => {
  const { dedupingInterval } = config || {};
  const companyusers = getApi(Companyusers);
  return useSWR(...companyusers.companyuserNotificationsListQueryArgs(params.userId ?? '', {}, params.userId != null), {
    dedupingInterval
  });
}
