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
  AdminlogDetailData,
  AdminlogListData,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Adminlog<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description [AUTHED-Operator]運営者だけがPOSTできる、操作履歴 <br /><br /> <b>Authentication:</b> required
   *
   * @tags adminlog
   * @name AdminlogDetail
   * @summary [AUTHED-Operator]運営者だけがPOSTできる、操作履歴
   * @request GET:/adminlog/{adminlog_id}
   * @secure
   */
  adminlogDetail = (adminlogId: number, params: RequestParams = {}) =>
    this.request<AdminlogDetailData, void>({
      path: `/adminlog/${adminlogId}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });

  adminlogDetailQueryArgs = (
    adminlogId: number,
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/adminlog/${adminlogId}`] : null;
    const fetcher = () =>
      this.adminlogDetail(adminlogId, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description [AUTHED-Operator]運営者だけが見られる、操作履歴 <br /><br /> <b>Authentication:</b> required
   *
   * @tags adminlog
   * @name AdminlogList
   * @summary [AUTHED-Operator]運営者だけが見られる、操作履歴
   * @request GET:/adminlog
   * @secure
   */
  adminlogList = (params: RequestParams = {}) =>
    this.request<AdminlogListData, void>({
      path: `/adminlog`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });

  adminlogListQueryArgs = (
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/adminlog`] : null;
    const fetcher = () => this.adminlogList(params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description [AUTHED-Operator]運営者だけがPOSTできる、操作履歴 <br /><br /> <b>Authentication:</b> required
   *
   * @tags adminlog
   * @name AdminlogCreate
   * @summary [AUTHED-Operator]運営者だけがPOSTできる、操作履歴
   * @request POST:/adminlog
   * @secure
   */
  adminlogCreate = (data: AdminlogCreatePayload, params: RequestParams = {}) =>
    this.request<AdminlogCreateData, void>({
      path: `/adminlog`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });

  adminlogCreateQueryArgs = (
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/adminlog`] : null;
    const fetcher: (
      url: string[],
      { arg }: { arg: AdminlogCreatePayload },
    ) => Promise<AdminlogCreateData> = (_, { arg }) =>
      this.adminlogCreate(arg, params).then((res) => res.data);
    return [key, fetcher] as const;
  };
}
