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

import { DashboardQueryListData, ToBeReviewedListData } from "./data-contracts";
import { HttpClient, RequestParams } from "./http-client";

export class Users<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description <br /><br /> <b>Authentication:</b> required
   *
   * @tags users
   * @name DashboardQueryList
   * @request GET:/users/dashboard-query
   * @secure
   */
  dashboardQueryList = (params: RequestParams = {}) =>
    this.request<DashboardQueryListData, void>({
      path: `/users/dashboard-query`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });

  dashboardQueryListQueryArgs = (
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/users/dashboard-query`] : null;
    const fetcher = () =>
      this.dashboardQueryList(params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description <br /><br /> <b>Authentication:</b> required
   *
   * @tags users
   * @name ToBeReviewedList
   * @request GET:/users/to-be-reviewed
   * @secure
   */
  toBeReviewedList = (params: RequestParams = {}) =>
    this.request<ToBeReviewedListData, void>({
      path: `/users/to-be-reviewed`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });

  toBeReviewedListQueryArgs = (
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/users/to-be-reviewed`] : null;
    const fetcher = () => this.toBeReviewedList(params).then((res) => res.data);
    return [key, fetcher] as const;
  };
}
