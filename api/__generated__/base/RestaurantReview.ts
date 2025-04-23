/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

import {
  ByChefDetailData,
  ByRestaurantDetailResult,
  BySessionDetailResult,
  RestaurantReviewCreateData,
  RestaurantReviewCreatePayload,
  RestaurantReviewDeleteData,
  RestaurantReviewDetailData,
  RestaurantReviewListData,
  RestaurantReviewPartialUpdateData,
  RestaurantReviewPartialUpdatePayload,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class RestaurantReview<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags restaurant_review
   * @name ByChefDetail
   * @request GET:/restaurant_review/byChef/{user_id}
   */
  byChefDetail = (userId: string, params: RequestParams = {}) =>
    this.request<ByChefDetailData, void>({
      path: `/restaurant_review/byChef/${userId}`,
      method: "GET",
      format: "json",
      ...params,
    });

  byChefDetailQueryArgs = (userId: string, params: RequestParams = {}, enabled: boolean = true) => {
    const key = enabled ? [`/restaurant_review/byChef/${userId}`] : null;
    const fetcher = () => this.byChefDetail(userId, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags restaurant_review
   * @name ByRestaurantDetail
   * @request GET:/restaurant_review/byRestaurant/{restaurant_id}
   */
  byRestaurantDetail = (restaurantId: number, params: RequestParams = {}) =>
    this.request<ByRestaurantDetailResult, void>({
      path: `/restaurant_review/byRestaurant/${restaurantId}`,
      method: "GET",
      format: "json",
      ...params,
    });

  byRestaurantDetailQueryArgs = (restaurantId: number, params: RequestParams = {}, enabled: boolean = true) => {
    const key = enabled ? [`/restaurant_review/byRestaurant/${restaurantId}`] : null;
    const fetcher = () => this.byRestaurantDetail(restaurantId, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags restaurant_review
   * @name BySessionDetail
   * @request GET:/restaurant_review/bySession/{worksession_id}
   */
  bySessionDetail = (worksessionId: number, params: RequestParams = {}) =>
    this.request<BySessionDetailResult, void>({
      path: `/restaurant_review/bySession/${worksessionId}`,
      method: "GET",
      format: "json",
      ...params,
    });

  bySessionDetailQueryArgs = (worksessionId: number, params: RequestParams = {}, enabled: boolean = true) => {
    const key = enabled ? [`/restaurant_review/bySession/${worksessionId}`] : null;
    const fetcher = () => this.bySessionDetail(worksessionId, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags restaurant_review
   * @name RestaurantReviewDelete
   * @request DELETE:/restaurant_review/{restaurant_review_id}
   */
  restaurantReviewDelete = (restaurantReviewId: number, params: RequestParams = {}) =>
    this.request<RestaurantReviewDeleteData, void>({
      path: `/restaurant_review/${restaurantReviewId}`,
      method: "DELETE",
      format: "json",
      ...params,
    });

  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags restaurant_review
   * @name RestaurantReviewDetail
   * @request GET:/restaurant_review/{restaurant_review_id}
   */
  restaurantReviewDetail = (restaurantReviewId: number, params: RequestParams = {}) =>
    this.request<RestaurantReviewDetailData, void>({
      path: `/restaurant_review/${restaurantReviewId}`,
      method: "GET",
      format: "json",
      ...params,
    });

  restaurantReviewDetailQueryArgs = (
    restaurantReviewId: number,
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/restaurant_review/${restaurantReviewId}`] : null;
    const fetcher = () => this.restaurantReviewDetail(restaurantReviewId, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags restaurant_review
   * @name RestaurantReviewPartialUpdate
   * @request PATCH:/restaurant_review/{restaurant_review_id}
   */
  restaurantReviewPartialUpdate = (
    restaurantReviewId: number,
    data: RestaurantReviewPartialUpdatePayload,
    params: RequestParams = {},
  ) =>
    this.request<RestaurantReviewPartialUpdateData, void>({
      path: `/restaurant_review/${restaurantReviewId}`,
      method: "PATCH",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });

  restaurantReviewPartialUpdateQueryArgs = (
    restaurantReviewId: number,
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/restaurant_review/${restaurantReviewId}`] : null;
    const fetcher: (
      url: string[],
      { arg }: { arg: RestaurantReviewPartialUpdatePayload },
    ) => Promise<RestaurantReviewPartialUpdateData> = (_, { arg }) =>
      this.restaurantReviewPartialUpdate(restaurantReviewId, arg, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags restaurant_review
   * @name RestaurantReviewList
   * @request GET:/restaurant_review
   */
  restaurantReviewList = (params: RequestParams = {}) =>
    this.request<RestaurantReviewListData, void>({
      path: `/restaurant_review`,
      method: "GET",
      format: "json",
      ...params,
    });

  restaurantReviewListQueryArgs = (params: RequestParams = {}, enabled: boolean = true) => {
    const key = enabled ? [`/restaurant_review`] : null;
    const fetcher = () => this.restaurantReviewList(params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags restaurant_review
   * @name RestaurantReviewCreate
   * @request POST:/restaurant_review
   */
  restaurantReviewCreate = (data: RestaurantReviewCreatePayload, params: RequestParams = {}) =>
    this.request<RestaurantReviewCreateData, void>({
      path: `/restaurant_review`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });

  restaurantReviewCreateQueryArgs = (params: RequestParams = {}, enabled: boolean = true) => {
    const key = enabled ? [`/restaurant_review`] : null;
    const fetcher: (
      url: string[],
      { arg }: { arg: RestaurantReviewCreatePayload },
    ) => Promise<RestaurantReviewCreateData> = (_, { arg }) =>
      this.restaurantReviewCreate(arg, params).then((res) => res.data);
    return [key, fetcher] as const;
  };
}
