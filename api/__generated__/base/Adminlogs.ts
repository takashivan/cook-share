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

export class Adminlogs<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
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

  adminlogsDeleteQueryArgs = (
    adminlogId: number,
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/adminlogs/${adminlogId}`] : null;
    const fetcher = () =>
      this.adminlogsDelete(adminlogId, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description Get adminlog record <br /><br /> <b>Authentication:</b> required
   *
   * @tags adminlogs
   * @name AdminlogsDetail
   * @summary Get adminlog record
   * @request GET:/adminlogs/{adminlog_id}
   * @secure
   */
  adminlogsDetail = (adminlogId: number, params: RequestParams = {}) =>
    this.request<AdminlogsDetailData, void>({
      path: `/adminlogs/${adminlogId}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });

  adminlogsDetailQueryArgs = (
    adminlogId: number,
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/adminlogs/${adminlogId}`] : null;
    const fetcher = () =>
      this.adminlogsDetail(adminlogId, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description Edit adminlog record <br /><br /> <b>Authentication:</b> not required
   *
   * @tags adminlogs
   * @name AdminlogsPartialUpdate
   * @summary Edit adminlog record
   * @request PATCH:/adminlogs/{adminlog_id}
   */
  adminlogsPartialUpdate = (
    adminlogId: number,
    data: AdminlogsPartialUpdatePayload,
    params: RequestParams = {},
  ) =>
    this.request<AdminlogsPartialUpdateData, void>({
      path: `/adminlogs/${adminlogId}`,
      method: "PATCH",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });

  adminlogsPartialUpdateQueryArgs = (
    adminlogId: number,
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/adminlogs/${adminlogId}`] : null;
    const fetcher: (
      url: string[],
      { arg }: { arg: AdminlogsPartialUpdatePayload },
    ) => Promise<AdminlogsPartialUpdateData> = (_, { arg }) =>
      this.adminlogsPartialUpdate(adminlogId, arg, params).then(
        (res) => res.data,
      );
    return [key, fetcher] as const;
  };

  /**
   * @description Query all adminlog records <br /><br /> <b>Authentication:</b> required
   *
   * @tags adminlogs
   * @name AdminlogsList
   * @summary Query all adminlog records
   * @request GET:/adminlogs
   * @secure
   */
  adminlogsList = (params: RequestParams = {}) =>
    this.request<AdminlogsListData, void>({
      path: `/adminlogs`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });

  adminlogsListQueryArgs = (
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/adminlogs`] : null;
    const fetcher = () => this.adminlogsList(params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description Add adminlog record <br /><br /> <b>Authentication:</b> required
   *
   * @tags adminlogs
   * @name AdminlogsCreate
   * @summary Add adminlog record
   * @request POST:/adminlogs
   * @secure
   */
  adminlogsCreate = (
    data: AdminlogsCreatePayload,
    params: RequestParams = {},
  ) =>
    this.request<AdminlogsCreateData, void>({
      path: `/adminlogs`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });

  adminlogsCreateQueryArgs = (
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/adminlogs`] : null;
    const fetcher: (
      url: string[],
      { arg }: { arg: AdminlogsCreatePayload },
    ) => Promise<AdminlogsCreateData> = (_, { arg }) =>
      this.adminlogsCreate(arg, params).then((res) => res.data);
    return [key, fetcher] as const;
  };
}
