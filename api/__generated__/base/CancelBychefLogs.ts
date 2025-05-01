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

import { CancelBychefLogsListData } from "./data-contracts";
import { HttpClient, RequestParams } from "./http-client";

export class CancelBychefLogs<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description <br /><br /> <b>Authentication:</b> required
   *
   * @tags cancel-bychef-logs
   * @name CancelBychefLogsList
   * @request GET:/cancel-bychef-logs
   * @secure
   */
  cancelBychefLogsList = (params: RequestParams = {}) =>
    this.request<CancelBychefLogsListData, void>({
      path: `/cancel-bychef-logs`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });

  cancelBychefLogsListQueryArgs = (
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/cancel-bychef-logs`] : null;
    const fetcher = () =>
      this.cancelBychefLogsList(params).then((res) => res.data);
    return [key, fetcher] as const;
  };
}
