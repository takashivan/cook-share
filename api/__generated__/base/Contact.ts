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

import { ContactCreateData, ContactCreatePayload } from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Contact<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags contact
   * @name ContactCreate
   * @request POST:/contact
   */
  contactCreate = (data: ContactCreatePayload, params: RequestParams = {}) =>
    this.request<ContactCreateData, void>({
      path: `/contact`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });

  contactCreateQueryArgs = (
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/contact`] : null;
    const fetcher: (
      url: string[],
      { arg }: { arg: ContactCreatePayload },
    ) => Promise<ContactCreateData> = (_, { arg }) =>
      this.contactCreate(arg, params).then((res) => res.data);
    return [key, fetcher] as const;
  };
}
