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

import { CheckLineUserDetailData } from "./data-contracts";
import { HttpClient, RequestParams } from "./http-client";

export class CheckLineUser<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags check-line-user
   * @name CheckLineUserDetail
   * @request GET:/check-line-user/{line_user_id}
   */
  checkLineUserDetail = (lineUserId: string, params: RequestParams = {}) =>
    this.request<CheckLineUserDetailData, void>({
      path: `/check-line-user/${lineUserId}`,
      method: "GET",
      format: "json",
      ...params,
    });

  checkLineUserDetailQueryArgs = (
    lineUserId: string,
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/check-line-user/${lineUserId}`] : null;
    const fetcher = () =>
      this.checkLineUserDetail(lineUserId, params).then((res) => res.data);
    return [key, fetcher] as const;
  };
}
