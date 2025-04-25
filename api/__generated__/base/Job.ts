/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

import {
  CompanyDetailResult,
  DeleteJobData,
  GetJob2Data,
  GetJobData,
  PatchJobData,
  PatchJobPayload,
  PostJobData,
  PostJobPayload,
  QueryUpcomingListData,
  RestaurantDetailData,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Job<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags job
   * @name CompanyDetail
   * @request GET:/job/company/{companyId}
   */
  companyDetail = (companyId: string, params: RequestParams = {}) =>
    this.request<CompanyDetailResult, void>({
      path: `/job/company/${companyId}`,
      method: "GET",
      format: "json",
      ...params,
    });

  companyDetailQueryArgs = (companyId: string, params: RequestParams = {}, enabled: boolean = true) => {
    const key = enabled ? [`/job/company/${companyId}`] : null;
    const fetcher = () => this.companyDetail(companyId, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description Query all job records <br /><br /> <b>Authentication:</b> not required
   *
   * @tags job
   * @name QueryUpcomingList
   * @summary Query all job records
   * @request GET:/job/query/upcoming
   */
  queryUpcomingList = (params: RequestParams = {}) =>
    this.request<QueryUpcomingListData, void>({
      path: `/job/query/upcoming`,
      method: "GET",
      format: "json",
      ...params,
    });

  queryUpcomingListQueryArgs = (params: RequestParams = {}, enabled: boolean = true) => {
    const key = enabled ? [`/job/query/upcoming`] : null;
    const fetcher = () => this.queryUpcomingList(params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags job
   * @name RestaurantDetail
   * @request GET:/job/restaurant/{restaurant_id}
   */
  restaurantDetail = (restaurantId: number, params: RequestParams = {}) =>
    this.request<RestaurantDetailData, void>({
      path: `/job/restaurant/${restaurantId}`,
      method: "GET",
      format: "json",
      ...params,
    });

  restaurantDetailQueryArgs = (restaurantId: number, params: RequestParams = {}, enabled: boolean = true) => {
    const key = enabled ? [`/job/restaurant/${restaurantId}`] : null;
    const fetcher = () => this.restaurantDetail(restaurantId, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description Delete job record. <br /><br /> <b>Authentication:</b> not required
   *
   * @tags job
   * @name DeleteJob
   * @summary Delete job record.
   * @request DELETE:/job/{job_id}
   */
  deleteJob = (jobId: number, params: RequestParams = {}) =>
    this.request<DeleteJobData, void>({
      path: `/job/${jobId}`,
      method: "DELETE",
      format: "json",
      ...params,
    });

  /**
   * @description Get job record <br /><br /> <b>Authentication:</b> not required
   *
   * @tags job
   * @name GetJob
   * @summary Get job record
   * @request GET:/job/{job_id}
   */
  getJob = (jobId: number, params: RequestParams = {}) =>
    this.request<GetJobData, void>({
      path: `/job/${jobId}`,
      method: "GET",
      format: "json",
      ...params,
    });

  getJobQueryArgs = (jobId: number, params: RequestParams = {}, enabled: boolean = true) => {
    const key = enabled ? [`/job/${jobId}`] : null;
    const fetcher = () => this.getJob(jobId, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description Edit job record <br /><br /> <b>Authentication:</b> not required
   *
   * @tags job
   * @name PatchJob
   * @summary Edit job record
   * @request PATCH:/job/{job_id}
   */
  patchJob = (jobId: number, data: PatchJobPayload, params: RequestParams = {}) =>
    this.request<PatchJobData, void>({
      path: `/job/${jobId}`,
      method: "PATCH",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });

  patchJobQueryArgs = (jobId: number, params: RequestParams = {}, enabled: boolean = true) => {
    const key = enabled ? [`/job/${jobId}`] : null;
    const fetcher: (url: string[], { arg }: { arg: PatchJobPayload }) => Promise<PatchJobData> = (_, { arg }) =>
      this.patchJob(jobId, arg, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description Query all job records <br /><br /> <b>Authentication:</b> not required
   *
   * @tags job
   * @name GetJob2
   * @summary Query all job records
   * @request GET:/job
   * @originalName getJob
   * @duplicate
   */
  getJob2 = (params: RequestParams = {}) =>
    this.request<GetJob2Data, void>({
      path: `/job`,
      method: "GET",
      format: "json",
      ...params,
    });

  getJob2QueryArgs = (params: RequestParams = {}, enabled: boolean = true) => {
    const key = enabled ? [`/job`] : null;
    const fetcher = () => this.getJob2(params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description Add job record <br /><br /> <b>Authentication:</b> not required
   *
   * @tags job
   * @name PostJob
   * @summary Add job record
   * @request POST:/job
   */
  postJob = (data: PostJobPayload, params: RequestParams = {}) =>
    this.request<PostJobData, void>({
      path: `/job`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });

  postJobQueryArgs = (params: RequestParams = {}, enabled: boolean = true) => {
    const key = enabled ? [`/job`] : null;
    const fetcher: (url: string[], { arg }: { arg: PostJobPayload }) => Promise<PostJobData> = (_, { arg }) =>
      this.postJob(arg, params).then((res) => res.data);
    return [key, fetcher] as const;
  };
}
