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
  LinkLineIdCreateData,
  LinkLineIdCreatePayload,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class LinkLineId<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags link-line-id
   * @name LinkLineIdCreate
   * @request POST:/link-line-id
   */
  linkLineIdCreate = (
    data: LinkLineIdCreatePayload,
    params: RequestParams = {},
  ) =>
    this.request<LinkLineIdCreateData, void>({
      path: `/link-line-id`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });

  linkLineIdCreateQueryArgs = (
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/link-line-id`] : null;
    const fetcher: (
      url: string[],
      { arg }: { arg: LinkLineIdCreatePayload },
    ) => Promise<LinkLineIdCreateData> = (_, { arg }) =>
      this.linkLineIdCreate(arg, params).then((res) => res.data);
    return [key, fetcher] as const;
  };
}
