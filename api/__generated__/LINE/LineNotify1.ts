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

import { LineNotify1CreateData } from "./data-contracts";
import { HttpClient, RequestParams } from "./http-client";

export class LineNotify1<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags line-notify_1
   * @name LineNotify1Create
   * @request POST:/line-notify_1
   */
  lineNotify1Create = (params: RequestParams = {}) =>
    this.request<LineNotify1CreateData, void>({
      path: `/line-notify_1`,
      method: "POST",
      format: "json",
      ...params,
    });

  lineNotify1CreateQueryArgs = (
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/line-notify_1`] : null;
    const fetcher: (url: string[]) => Promise<LineNotify1CreateData> = (_) =>
      this.lineNotify1Create(params).then((res) => res.data);
    return [key, fetcher] as const;
  };
}
