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
  ApplicationDetailParams1,
  ApplicationDetailResult,
  FinishPartialUpdateData,
  FinishPartialUpdatePayload,
  RestaurantTodoDetailData,
  StartPartialUpdateData,
  StartPartialUpdatePayload,
  UserTodoDetailData,
  VerifyPartialUpdateData,
  VerifyPartialUpdatePayload,
  WorksessionCreateData,
  WorksessionCreatePayload,
  WorksessionDeleteData,
  WorksessionDetailResult,
  WorksessionListData,
  WorksessionPartialUpdateData,
  WorksessionPartialUpdatePayload,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Worksession<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags worksession
   * @name ApplicationDetail
   * @request GET:/worksession/application/{application_id}
   */
  applicationDetail = ({ applicationId, ...query }: ApplicationDetailParams1, params: RequestParams = {}) =>
    this.request<ApplicationDetailResult, void>({
      path: `/worksession/application/${applicationId}`,
      method: "GET",
      query: query,
      format: "json",
      ...params,
    });
  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags worksession
   * @name RestaurantTodoDetail
   * @request GET:/worksession/restaurant_todo/{job_id}
   */
  restaurantTodoDetail = (jobId: number, params: RequestParams = {}) =>
    this.request<RestaurantTodoDetailData, void>({
      path: `/worksession/restaurant_todo/${jobId}`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags worksession
   * @name UserTodoDetail
   * @request GET:/worksession/user_todo/{user_id}
   */
  userTodoDetail = (userId: string, params: RequestParams = {}) =>
    this.request<UserTodoDetailData, void>({
      path: `/worksession/user_todo/${userId}`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags worksession
   * @name FinishPartialUpdate
   * @request PATCH:/worksession/{worksession_id}/finish
   */
  finishPartialUpdate = (worksessionId: number, data: FinishPartialUpdatePayload, params: RequestParams = {}) =>
    this.request<FinishPartialUpdateData, void>({
      path: `/worksession/${worksessionId}/finish`,
      method: "PATCH",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags worksession
   * @name StartPartialUpdate
   * @request PATCH:/worksession/{worksession_id}/start
   */
  startPartialUpdate = (worksessionId: number, data: StartPartialUpdatePayload, params: RequestParams = {}) =>
    this.request<StartPartialUpdateData, void>({
      path: `/worksession/${worksessionId}/start`,
      method: "PATCH",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags worksession
   * @name VerifyPartialUpdate
   * @request PATCH:/worksession/{worksession_id}/verify
   */
  verifyPartialUpdate = (worksessionId: number, data: VerifyPartialUpdatePayload, params: RequestParams = {}) =>
    this.request<VerifyPartialUpdateData, void>({
      path: `/worksession/${worksessionId}/verify`,
      method: "PATCH",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Delete worksession record. <br /><br /> <b>Authentication:</b> not required
   *
   * @tags worksession
   * @name WorksessionDelete
   * @summary Delete worksession record.
   * @request DELETE:/worksession/{worksession_id}
   */
  worksessionDelete = (worksessionId: number, params: RequestParams = {}) =>
    this.request<WorksessionDeleteData, void>({
      path: `/worksession/${worksessionId}`,
      method: "DELETE",
      format: "json",
      ...params,
    });
  /**
   * @description Get worksession record <br /><br /> <b>Authentication:</b> not required
   *
   * @tags worksession
   * @name WorksessionDetail
   * @summary Get worksession record
   * @request GET:/worksession/{worksession_id}
   */
  worksessionDetail = (worksessionId: number, params: RequestParams = {}) =>
    this.request<WorksessionDetailResult, void>({
      path: `/worksession/${worksessionId}`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * @description Edit worksession record <br /><br /> <b>Authentication:</b> not required
   *
   * @tags worksession
   * @name WorksessionPartialUpdate
   * @summary Edit worksession record
   * @request PATCH:/worksession/{worksession_id}
   */
  worksessionPartialUpdate = (
    worksessionId: number,
    data: WorksessionPartialUpdatePayload,
    params: RequestParams = {},
  ) =>
    this.request<WorksessionPartialUpdateData, void>({
      path: `/worksession/${worksessionId}`,
      method: "PATCH",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Query all worksession records <br /><br /> <b>Authentication:</b> not required
   *
   * @tags worksession
   * @name WorksessionList
   * @summary Query all worksession records
   * @request GET:/worksession
   */
  worksessionList = (params: RequestParams = {}) =>
    this.request<WorksessionListData, void>({
      path: `/worksession`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * @description Add worksession record <br /><br /> <b>Authentication:</b> not required
   *
   * @tags worksession
   * @name WorksessionCreate
   * @summary Add worksession record
   * @request POST:/worksession
   */
  worksessionCreate = (data: WorksessionCreatePayload, params: RequestParams = {}) =>
    this.request<WorksessionCreateData, void>({
      path: `/worksession`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
}
