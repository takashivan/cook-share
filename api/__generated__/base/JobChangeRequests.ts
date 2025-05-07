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
  JobChangeRequestsCreateData,
  JobChangeRequestsCreatePayload,
  JobChangeRequestsDeleteData,
  JobChangeRequestsDetailData,
  JobChangeRequestsListData,
  JobChangeRequestsPartialUpdateData,
  JobChangeRequestsPartialUpdatePayload,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class JobChangeRequests<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description Delete job_change_request record. <br /><br /> <b>Authentication:</b> not required
   *
   * @tags job-change-requests
   * @name JobChangeRequestsDelete
   * @summary Delete job_change_request record.
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
   * @description Get job_change_request record <br /><br /> <b>Authentication:</b> not required
   *
   * @tags job-change-requests
   * @name JobChangeRequestsDetail
   * @summary Get job_change_request record
   * @request GET:/job-change-requests/{job_change_request_id}
   */
  jobChangeRequestsDetail = (
    jobChangeRequestId: string,
    params: RequestParams = {},
  ) =>
    this.request<JobChangeRequestsDetailData, void>({
      path: `/job-change-requests/${jobChangeRequestId}`,
      method: "GET",
      format: "json",
      ...params,
    });

  jobChangeRequestsDetailQueryArgs = (
    jobChangeRequestId: string,
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/job-change-requests/${jobChangeRequestId}`] : null;
    const fetcher = () =>
      this.jobChangeRequestsDetail(jobChangeRequestId, params).then(
        (res) => res.data,
      );
    return [key, fetcher] as const;
  };

  /**
   * @description Edit job_change_request record <br /><br /> <b>Authentication:</b> not required
   *
   * @tags job-change-requests
   * @name JobChangeRequestsPartialUpdate
   * @summary Edit job_change_request record
   * @request PATCH:/job-change-requests/{job_change_request_id}
   */
  jobChangeRequestsPartialUpdate = (
    jobChangeRequestId: string,
    data: JobChangeRequestsPartialUpdatePayload,
    params: RequestParams = {},
  ) =>
    this.request<JobChangeRequestsPartialUpdateData, void>({
      path: `/job-change-requests/${jobChangeRequestId}`,
      method: "PATCH",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });

  jobChangeRequestsPartialUpdateQueryArgs = (
    jobChangeRequestId: string,
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/job-change-requests/${jobChangeRequestId}`] : null;
    const fetcher: (
      url: string[],
      { arg }: { arg: JobChangeRequestsPartialUpdatePayload },
    ) => Promise<JobChangeRequestsPartialUpdateData> = (_, { arg }) =>
      this.jobChangeRequestsPartialUpdate(jobChangeRequestId, arg, params).then(
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
   * @description Add job_change_request record <br /><br /> <b>Authentication:</b> not required
   *
   * @tags job-change-requests
   * @name JobChangeRequestsCreate
   * @summary Add job_change_request record
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
