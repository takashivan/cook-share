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
  AdminlogCreateData,
  AdminlogCreatePayload,
  AdminlogDeleteData,
  AdminlogDetailData,
  AdminlogListData,
  AdminlogPartialUpdateData,
  AdminlogPartialUpdatePayload,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Adminlog<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * @description Delete adminlog record. <br /><br /> <b>Authentication:</b> not required
   *
   * @tags adminlog
   * @name AdminlogDelete
   * @summary Delete adminlog record.
   * @request DELETE:/adminlog/{adminlog_id}
   */
  adminlogDelete = (adminlogId: number, params: RequestParams = {}) =>
    this.request<AdminlogDeleteData, void>({
      path: `/adminlog/${adminlogId}`,
      method: "DELETE",
      format: "json",
      ...params,
    });
  /**
   * @description Get adminlog record <br /><br /> <b>Authentication:</b> not required
   *
   * @tags adminlog
   * @name AdminlogDetail
   * @summary Get adminlog record
   * @request GET:/adminlog/{adminlog_id}
   */
  adminlogDetail = (adminlogId: number, params: RequestParams = {}) =>
    this.request<AdminlogDetailData, void>({
      path: `/adminlog/${adminlogId}`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * @description Edit adminlog record <br /><br /> <b>Authentication:</b> not required
   *
   * @tags adminlog
   * @name AdminlogPartialUpdate
   * @summary Edit adminlog record
   * @request PATCH:/adminlog/{adminlog_id}
   */
  adminlogPartialUpdate = (adminlogId: number, data: AdminlogPartialUpdatePayload, params: RequestParams = {}) =>
    this.request<AdminlogPartialUpdateData, void>({
      path: `/adminlog/${adminlogId}`,
      method: "PATCH",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Query all adminlog records <br /><br /> <b>Authentication:</b> not required
   *
   * @tags adminlog
   * @name AdminlogList
   * @summary Query all adminlog records
   * @request GET:/adminlog
   */
  adminlogList = (params: RequestParams = {}) =>
    this.request<AdminlogListData, void>({
      path: `/adminlog`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * @description Add adminlog record <br /><br /> <b>Authentication:</b> not required
   *
   * @tags adminlog
   * @name AdminlogCreate
   * @summary Add adminlog record
   * @request POST:/adminlog
   */
  adminlogCreate = (data: AdminlogCreatePayload, params: RequestParams = {}) =>
    this.request<AdminlogCreateData, void>({
      path: `/adminlog`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
}
