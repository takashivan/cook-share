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
  ApplicationsListResult,
  ApplyCreateData,
  ApplyCreatePayload,
  JobsCreateData,
  JobsCreatePayload,
  JobsDeleteData,
  JobsDetailData,
  JobsListResult,
  JobsPartialUpdateData,
  JobsPartialUpdatePayload,
  QueryUpcomingListResult,
  WorksessionsRestaurantTodosListData,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Jobs<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description [UNAUTHED]トップページの今後のジョブの一覧が見れる <br /><br /> <b>Authentication:</b> not required
   *
   * @tags jobs
   * @name QueryUpcomingList
   * @summary [UNAUTHED]トップページの今後のジョブの一覧が見れる
   * @request GET:/jobs/query/upcoming
   */
  queryUpcomingList = (params: RequestParams = {}) =>
    this.request<QueryUpcomingListResult, void>({
      path: `/jobs/query/upcoming`,
      method: "GET",
      format: "json",
      ...params,
    });

  queryUpcomingListQueryArgs = (
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/jobs/query/upcoming`] : null;
    const fetcher = () =>
      this.queryUpcomingList(params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags jobs
   * @name ApplicationsList
   * @request GET:/jobs/{job_id}/applications
   */
  applicationsList = (jobId: number, params: RequestParams = {}) =>
    this.request<ApplicationsListResult, void>({
      path: `/jobs/${jobId}/applications`,
      method: "GET",
      format: "json",
      ...params,
    });

  applicationsListQueryArgs = (
    jobId: number,
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/jobs/${jobId}/applications`] : null;
    const fetcher = () =>
      this.applicationsList(jobId, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags jobs
   * @name ApplyCreate
   * @request POST:/jobs/{job_id}/apply
   */
  applyCreate = (
    jobId: number,
    data: ApplyCreatePayload,
    params: RequestParams = {},
  ) =>
    this.request<ApplyCreateData, void>({
      path: `/jobs/${jobId}/apply`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });

  applyCreateQueryArgs = (
    jobId: number,
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/jobs/${jobId}/apply`] : null;
    const fetcher: (
      url: string[],
      { arg }: { arg: ApplyCreatePayload },
    ) => Promise<ApplyCreateData> = (_, { arg }) =>
      this.applyCreate(jobId, arg, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description [AUTH]restaurantの権限 <br /><br /> <b>Authentication:</b> not required
   *
   * @tags jobs
   * @name WorksessionsRestaurantTodosList
   * @summary [AUTH]restaurantの権限
   * @request GET:/jobs/{job_id}/worksessions/restaurant_todos
   */
  worksessionsRestaurantTodosList = (
    jobId: number,
    params: RequestParams = {},
  ) =>
    this.request<WorksessionsRestaurantTodosListData, void>({
      path: `/jobs/${jobId}/worksessions/restaurant_todos`,
      method: "GET",
      format: "json",
      ...params,
    });

  worksessionsRestaurantTodosListQueryArgs = (
    jobId: number,
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled
      ? [`/jobs/${jobId}/worksessions/restaurant_todos`]
      : null;
    const fetcher = () =>
      this.worksessionsRestaurantTodosList(jobId, params).then(
        (res) => res.data,
      );
    return [key, fetcher] as const;
  };

  /**
   * @description Delete job record. <br /><br /> <b>Authentication:</b> not required
   *
   * @tags jobs
   * @name JobsDelete
   * @summary Delete job record.
   * @request DELETE:/jobs/{job_id}
   */
  jobsDelete = (jobId: number, params: RequestParams = {}) =>
    this.request<JobsDeleteData, void>({
      path: `/jobs/${jobId}`,
      method: "DELETE",
      format: "json",
      ...params,
    });

  jobsDeleteQueryArgs = (
    jobId: number,
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/jobs/${jobId}`] : null;
    const fetcher = () =>
      this.jobsDelete(jobId, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description Get job record <br /><br /> <b>Authentication:</b> not required
   *
   * @tags jobs
   * @name JobsDetail
   * @summary Get job record
   * @request GET:/jobs/{job_id}
   */
  jobsDetail = (jobId: number, params: RequestParams = {}) =>
    this.request<JobsDetailData, void>({
      path: `/jobs/${jobId}`,
      method: "GET",
      format: "json",
      ...params,
    });

  jobsDetailQueryArgs = (
    jobId: number,
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/jobs/${jobId}`] : null;
    const fetcher = () =>
      this.jobsDetail(jobId, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description [AUTHED]レストランアクセスを持っているユーザーだけが編集できる <br /><br /> <b>Authentication:</b> not required
   *
   * @tags jobs
   * @name JobsPartialUpdate
   * @summary [AUTHED]レストランアクセスを持っているユーザーだけが編集できる
   * @request PATCH:/jobs/{job_id}
   */
  jobsPartialUpdate = (
    jobId: number,
    data: JobsPartialUpdatePayload,
    params: RequestParams = {},
  ) =>
    this.request<JobsPartialUpdateData, void>({
      path: `/jobs/${jobId}`,
      method: "PATCH",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });

  jobsPartialUpdateQueryArgs = (
    jobId: number,
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/jobs/${jobId}`] : null;
    const fetcher: (
      url: string[],
      { arg }: { arg: JobsPartialUpdatePayload },
    ) => Promise<JobsPartialUpdateData> = (_, { arg }) =>
      this.jobsPartialUpdate(jobId, arg, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description Query all job records <br /><br /> <b>Authentication:</b> not required
   *
   * @tags jobs
   * @name JobsList
   * @summary Query all job records
   * @request GET:/jobs
   */
  jobsList = (params: RequestParams = {}) =>
    this.request<JobsListResult, void>({
      path: `/jobs`,
      method: "GET",
      format: "json",
      ...params,
    });

  jobsListQueryArgs = (params: RequestParams = {}, enabled: boolean = true) => {
    const key = enabled ? [`/jobs`] : null;
    const fetcher = () => this.jobsList(params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description [AUTHED]レストランアクセスを持っているユーザーだけがJOBをポストできる <br /><br /> <b>Authentication:</b> not required
   *
   * @tags jobs
   * @name JobsCreate
   * @summary [AUTHED]レストランアクセスを持っているユーザーだけがJOBをポストできる
   * @request POST:/jobs
   */
  jobsCreate = (data: JobsCreatePayload, params: RequestParams = {}) =>
    this.request<JobsCreateData, void>({
      path: `/jobs`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });

  jobsCreateQueryArgs = (
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/jobs`] : null;
    const fetcher: (
      url: string[],
      { arg }: { arg: JobsCreatePayload },
    ) => Promise<JobsCreateData> = (_, { arg }) =>
      this.jobsCreate(arg, params).then((res) => res.data);
    return [key, fetcher] as const;
  };
}
