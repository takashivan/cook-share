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
  ConnectLineAccountCreateData,
  ConnectLineAccountCreatePayload,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class ConnectLineAccount<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags connect-line-account
   * @name ConnectLineAccountCreate
   * @request POST:/connect-line-account
   */
  connectLineAccountCreate = (
    data: ConnectLineAccountCreatePayload,
    params: RequestParams = {},
  ) =>
    this.request<ConnectLineAccountCreateData, void>({
      path: `/connect-line-account`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });

  connectLineAccountCreateQueryArgs = (
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/connect-line-account`] : null;
    const fetcher: (
      url: string[],
      { arg }: { arg: ConnectLineAccountCreatePayload },
    ) => Promise<ConnectLineAccountCreateData> = (_, { arg }) =>
      this.connectLineAccountCreate(arg, params).then((res) => res.data);
    return [key, fetcher] as const;
  };
}
