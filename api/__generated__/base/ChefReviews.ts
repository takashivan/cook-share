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
  ChefReviewsCreateData,
  ChefReviewsCreatePayload,
  ChefReviewsDeleteData,
  ChefReviewsDetailData,
  ChefReviewsListData,
  ChefReviewsPartialUpdateData,
  ChefReviewsPartialUpdatePayload,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class ChefReviews<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags chef-reviews
   * @name ChefReviewsDelete
   * @request DELETE:/chef-reviews/{chef_review_id}
   */
  chefReviewsDelete = (chefReviewId: number, params: RequestParams = {}) =>
    this.request<ChefReviewsDeleteData, void>({
      path: `/chef-reviews/${chefReviewId}`,
      method: "DELETE",
      format: "json",
      ...params,
    });

  chefReviewsDeleteQueryArgs = (
    chefReviewId: number,
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/chef-reviews/${chefReviewId}`] : null;
    const fetcher = () =>
      this.chefReviewsDelete(chefReviewId, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags chef-reviews
   * @name ChefReviewsDetail
   * @request GET:/chef-reviews/{chef_review_id}
   */
  chefReviewsDetail = (chefReviewId: number, params: RequestParams = {}) =>
    this.request<ChefReviewsDetailData, void>({
      path: `/chef-reviews/${chefReviewId}`,
      method: "GET",
      format: "json",
      ...params,
    });

  chefReviewsDetailQueryArgs = (
    chefReviewId: number,
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/chef-reviews/${chefReviewId}`] : null;
    const fetcher = () =>
      this.chefReviewsDetail(chefReviewId, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags chef-reviews
   * @name ChefReviewsPartialUpdate
   * @request PATCH:/chef-reviews/{chef_review_id}
   */
  chefReviewsPartialUpdate = (
    chefReviewId: number,
    data: ChefReviewsPartialUpdatePayload,
    params: RequestParams = {},
  ) =>
    this.request<ChefReviewsPartialUpdateData, void>({
      path: `/chef-reviews/${chefReviewId}`,
      method: "PATCH",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });

  chefReviewsPartialUpdateQueryArgs = (
    chefReviewId: number,
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/chef-reviews/${chefReviewId}`] : null;
    const fetcher: (
      url: string[],
      { arg }: { arg: ChefReviewsPartialUpdatePayload },
    ) => Promise<ChefReviewsPartialUpdateData> = (_, { arg }) =>
      this.chefReviewsPartialUpdate(chefReviewId, arg, params).then(
        (res) => res.data,
      );
    return [key, fetcher] as const;
  };

  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags chef-reviews
   * @name ChefReviewsList
   * @request GET:/chef-reviews
   */
  chefReviewsList = (params: RequestParams = {}) =>
    this.request<ChefReviewsListData, void>({
      path: `/chef-reviews`,
      method: "GET",
      format: "json",
      ...params,
    });

  chefReviewsListQueryArgs = (
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/chef-reviews`] : null;
    const fetcher = () => this.chefReviewsList(params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags chef-reviews
   * @name ChefReviewsCreate
   * @request POST:/chef-reviews
   */
  chefReviewsCreate = (
    data: ChefReviewsCreatePayload,
    params: RequestParams = {},
  ) =>
    this.request<ChefReviewsCreateData, void>({
      path: `/chef-reviews`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });

  chefReviewsCreateQueryArgs = (
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/chef-reviews`] : null;
    const fetcher: (
      url: string[],
      { arg }: { arg: ChefReviewsCreatePayload },
    ) => Promise<ChefReviewsCreateData> = (_, { arg }) =>
      this.chefReviewsCreate(arg, params).then((res) => res.data);
    return [key, fetcher] as const;
  };
}
