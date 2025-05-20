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
  LineDisconnectCreateData,
  LineDisconnectCreatePayload,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class LineDisconnect<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags line-disconnect
   * @name LineDisconnectCreate
   * @request POST:/line-disconnect
   */
  lineDisconnectCreate = (
    data: LineDisconnectCreatePayload,
    params: RequestParams = {},
  ) =>
    this.request<LineDisconnectCreateData, void>({
      path: `/line-disconnect`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });

  lineDisconnectCreateQueryArgs = (
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/line-disconnect`] : null;
    const fetcher: (
      url: string[],
      { arg }: { arg: LineDisconnectCreatePayload },
    ) => Promise<LineDisconnectCreateData> = (_, { arg }) =>
      this.lineDisconnectCreate(arg, params).then((res) => res.data);
    return [key, fetcher] as const;
  };
}
