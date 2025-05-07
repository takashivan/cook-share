/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

import {
  AcceptPartialUpdateOutput,
  JobChangeRequestsCreateData,
  JobChangeRequestsCreatePayload,
  JobChangeRequestsDeleteData,
  JobChangeRequestsListData,
  RejectPartialUpdateResult,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class JobChangeRequests<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description [AUTH-CHEF]受け取ったユーザーのみがaccept <br /><br /> <b>Authentication:</b> not required
   *
   * @tags job-change-requests
   * @name AcceptPartialUpdate
   * @summary [AUTH-CHEF]受け取ったユーザーのみがaccept
   * @request PATCH:/job-change-requests/{job_change_request_id}/accept
   */
  acceptPartialUpdate = (
    jobChangeRequestId: string,
    params: RequestParams = {},
  ) =>
    this.request<AcceptPartialUpdateOutput, void>({
      path: `/job-change-requests/${jobChangeRequestId}/accept`,
      method: "PATCH",
      format: "json",
      ...params,
    });

  acceptPartialUpdateQueryArgs = (
    jobChangeRequestId: string,
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled
      ? [`/job-change-requests/${jobChangeRequestId}/accept`]
      : null;
    const fetcher: (url: string[]) => Promise<AcceptPartialUpdateOutput> = (
      _,
    ) =>
      this.acceptPartialUpdate(jobChangeRequestId, params).then(
        (res) => res.data,
      );
    return [key, fetcher] as const;
  };

  /**
   * @description [AUTH-CHEF]受け取ったユーザーのみがreject <br /><br /> <b>Authentication:</b> not required
   *
   * @tags job-change-requests
   * @name RejectPartialUpdate
   * @summary [AUTH-CHEF]受け取ったユーザーのみがreject
   * @request PATCH:/job-change-requests/{job_change_request_id}/reject
   */
  rejectPartialUpdate = (
    jobChangeRequestId: string,
    params: RequestParams = {},
  ) =>
    this.request<RejectPartialUpdateResult, void>({
      path: `/job-change-requests/${jobChangeRequestId}/reject`,
      method: "PATCH",
      format: "json",
      ...params,
    });

  rejectPartialUpdateQueryArgs = (
    jobChangeRequestId: string,
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled
      ? [`/job-change-requests/${jobChangeRequestId}/reject`]
      : null;
    const fetcher: (url: string[]) => Promise<RejectPartialUpdateResult> = (
      _,
    ) =>
      this.rejectPartialUpdate(jobChangeRequestId, params).then(
        (res) => res.data,
      );
    return [key, fetcher] as const;
  };

  /**
   * @description [AUTH-CompanyUser]レストランの権限持ってる人だけ <br /><br /> <b>Authentication:</b> not required
   *
   * @tags job-change-requests
   * @name JobChangeRequestsDelete
   * @summary [AUTH-CompanyUser]レストランの権限持ってる人だけ
   * @request DELETE:/job-change-requests/{job_change_request_id}
   */
  jobChangeRequestsDelete = (
    jobChangeRequestId: string,
    params: RequestParams = {},
  ) =>
    this.request<JobChangeRequestsDeleteData, void>({
      path: `/job-change-requests/${jobChangeRequestId}`,
      method: "DELETE",
      format: "json",
      ...params,
    });

  jobChangeRequestsDeleteQueryArgs = (
    jobChangeRequestId: string,
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/job-change-requests/${jobChangeRequestId}`] : null;
    const fetcher = () =>
      this.jobChangeRequestsDelete(jobChangeRequestId, params).then(
        (res) => res.data,
      );
    return [key, fetcher] as const;
  };

  /**
   * @description Query all job_change_request records <br /><br /> <b>Authentication:</b> not required
   *
   * @tags job-change-requests
   * @name JobChangeRequestsList
   * @summary Query all job_change_request records
   * @request GET:/job-change-requests
   */
  jobChangeRequestsList = (params: RequestParams = {}) =>
    this.request<JobChangeRequestsListData, void>({
      path: `/job-change-requests`,
      method: "GET",
      format: "json",
      ...params,
    });

  jobChangeRequestsListQueryArgs = (
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/job-change-requests`] : null;
    const fetcher = () =>
      this.jobChangeRequestsList(params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description [AUTH-CompanyUser]レストランの権限持ってる人だけ <br /><br /> <b>Authentication:</b> not required
   *
   * @tags job-change-requests
   * @name JobChangeRequestsCreate
   * @summary [AUTH-CompanyUser]レストランの権限持ってる人だけ
   * @request POST:/job-change-requests
   */
  jobChangeRequestsCreate = (
    data: JobChangeRequestsCreatePayload,
    params: RequestParams = {},
  ) =>
    this.request<JobChangeRequestsCreateData, void>({
      path: `/job-change-requests`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });

  jobChangeRequestsCreateQueryArgs = (
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/job-change-requests`] : null;
    const fetcher: (
      url: string[],
      { arg }: { arg: JobChangeRequestsCreatePayload },
    ) => Promise<JobChangeRequestsCreateData> = (_, { arg }) =>
      this.jobChangeRequestsCreate(arg, params).then((res) => res.data);
    return [key, fetcher] as const;
  };
}
