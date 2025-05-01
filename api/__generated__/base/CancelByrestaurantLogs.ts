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

import { CancelByrestaurantLogsListData } from "./data-contracts";
import { HttpClient, RequestParams } from "./http-client";

export class CancelByrestaurantLogs<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description <br /><br /> <b>Authentication:</b> required
   *
   * @tags cancel-byrestaurant-logs
   * @name CancelByrestaurantLogsList
   * @request GET:/cancel-byrestaurant-logs
   * @secure
   */
  cancelByrestaurantLogsList = (params: RequestParams = {}) =>
    this.request<CancelByrestaurantLogsListData, void>({
      path: `/cancel-byrestaurant-logs`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });

  cancelByrestaurantLogsListQueryArgs = (
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/cancel-byrestaurant-logs`] : null;
    const fetcher = () =>
      this.cancelByrestaurantLogsList(params).then((res) => res.data);
    return [key, fetcher] as const;
  };
}
