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

import { LineWebhookCreateData } from "./data-contracts";
import { HttpClient, RequestParams } from "./http-client";

export class LineWebhook<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags line-webhook
   * @name LineWebhookCreate
   * @request POST:/line-webhook
   */
  lineWebhookCreate = (params: RequestParams = {}) =>
    this.request<LineWebhookCreateData, void>({
      path: `/line-webhook`,
      method: "POST",
      format: "json",
      ...params,
    });

  lineWebhookCreateQueryArgs = (
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/line-webhook`] : null;
    const fetcher: (url: string[]) => Promise<LineWebhookCreateData> = (_) =>
      this.lineWebhookCreate(params).then((res) => res.data);
    return [key, fetcher] as const;
  };
}
