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

import { PostCreateData, PostCreatePayload } from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Jobtest<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags jobtest
   * @name PostCreate
   * @request POST:/jobtest/post
   */
  postCreate = (data: PostCreatePayload, params: RequestParams = {}) =>
    this.request<PostCreateData, void>({
      path: `/jobtest/post`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });

  postCreateQueryArgs = (
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/jobtest/post`] : null;
    const fetcher: (
      url: string[],
      { arg }: { arg: PostCreatePayload },
    ) => Promise<PostCreateData> = (_, { arg }) =>
      this.postCreate(arg, params).then((res) => res.data);
    return [key, fetcher] as const;
  };
}
