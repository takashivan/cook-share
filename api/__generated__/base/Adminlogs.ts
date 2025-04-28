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
  AdminlogsDetailData,
  AdminlogsListData,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Adminlogs<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description [AUTHED-Operator]運営者だけがPOSTできる、操作履歴 <br /><br /> <b>Authentication:</b> required
   *
   * @tags adminlogs
   * @name AdminlogsDetail
   * @summary [AUTHED-Operator]運営者だけがPOSTできる、操作履歴
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
   * @description [AUTHED-Operator]運営者だけが見られる、操作履歴 <br /><br /> <b>Authentication:</b> required
   *
   * @tags adminlogs
   * @name AdminlogsList
   * @summary [AUTHED-Operator]運営者だけが見られる、操作履歴
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
   * @description [AUTHED-Operator]運営者だけがPOSTできる、操作履歴 <br /><br /> <b>Authentication:</b> required
   *
   * @tags adminlogs
   * @name AdminlogsCreate
   * @summary [AUTHED-Operator]運営者だけがPOSTできる、操作履歴
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
