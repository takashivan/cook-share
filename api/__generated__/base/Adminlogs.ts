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
  AdminlogsCreateData,
  AdminlogsCreatePayload,
  AdminlogsDeleteData,
  AdminlogsDetailData,
  AdminlogsListData,
  AdminlogsPartialUpdateData,
  AdminlogsPartialUpdatePayload,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Adminlogs<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * @description Delete adminlog record. <br /><br /> <b>Authentication:</b> not required
   *
   * @tags adminlogs
   * @name AdminlogsDelete
   * @summary Delete adminlog record.
   * @request DELETE:/adminlogs/{adminlog_id}
   */
  adminlogsDelete = (adminlogId: number, params: RequestParams = {}) =>
    this.request<AdminlogsDeleteData, void>({
      path: `/adminlogs/${adminlogId}`,
      method: "DELETE",
      format: "json",
      ...params,
    });
  /**
   * @description Get adminlog record <br /><br /> <b>Authentication:</b> not required
   *
   * @tags adminlogs
   * @name AdminlogsDetail
   * @summary Get adminlog record
   * @request GET:/adminlogs/{adminlog_id}
   */
  adminlogsDetail = (adminlogId: number, params: RequestParams = {}) =>
    this.request<AdminlogsDetailData, void>({
      path: `/adminlogs/${adminlogId}`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * @description Edit adminlog record <br /><br /> <b>Authentication:</b> not required
   *
   * @tags adminlogs
   * @name AdminlogsPartialUpdate
   * @summary Edit adminlog record
   * @request PATCH:/adminlogs/{adminlog_id}
   */
  adminlogsPartialUpdate = (adminlogId: number, data: AdminlogsPartialUpdatePayload, params: RequestParams = {}) =>
    this.request<AdminlogsPartialUpdateData, void>({
      path: `/adminlogs/${adminlogId}`,
      method: "PATCH",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Query all adminlog records <br /><br /> <b>Authentication:</b> not required
   *
   * @tags adminlogs
   * @name AdminlogsList
   * @summary Query all adminlog records
   * @request GET:/adminlogs
   */
  adminlogsList = (params: RequestParams = {}) =>
    this.request<AdminlogsListData, void>({
      path: `/adminlogs`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * @description Add adminlog record <br /><br /> <b>Authentication:</b> not required
   *
   * @tags adminlogs
   * @name AdminlogsCreate
   * @summary Add adminlog record
   * @request POST:/adminlogs
   */
  adminlogsCreate = (data: AdminlogsCreatePayload, params: RequestParams = {}) =>
    this.request<AdminlogsCreateData, void>({
      path: `/adminlogs`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
}
