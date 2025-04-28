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

import { LineNotifyCreateData } from "./data-contracts";
import { HttpClient, RequestParams } from "./http-client";

export class LineNotify<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags line-notify
   * @name LineNotifyCreate
   * @request POST:/line-notify
   */
  lineNotifyCreate = (params: RequestParams = {}) =>
    this.request<LineNotifyCreateData, void>({
      path: `/line-notify`,
      method: "POST",
      format: "json",
      ...params,
    });

  lineNotifyCreateQueryArgs = (
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/line-notify`] : null;
    const fetcher: (url: string[]) => Promise<LineNotifyCreateData> = (_) =>
      this.lineNotifyCreate(params).then((res) => res.data);
    return [key, fetcher] as const;
  };
}
