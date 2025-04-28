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

import { WebhookCreateData } from "./data-contracts";
import { HttpClient, RequestParams } from "./http-client";

export class Stripe<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags stripe
   * @name WebhookCreate
   * @request POST:/stripe/webhook
   */
  webhookCreate = (params: RequestParams = {}) =>
    this.request<WebhookCreateData, void>({
      path: `/stripe/webhook`,
      method: "POST",
      format: "json",
      ...params,
    });

  webhookCreateQueryArgs = (
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/stripe/webhook`] : null;
    const fetcher: (url: string[]) => Promise<WebhookCreateData> = (_) =>
      this.webhookCreate(params).then((res) => res.data);
    return [key, fetcher] as const;
  };
}
