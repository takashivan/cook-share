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
  CompanyDetailResult,
  DeleteJobData,
  GetJob2Data,
  GetJobData,
  PatchJobData,
  PatchJobPayload,
  PostJobData,
  PostJobPayload,
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
}
