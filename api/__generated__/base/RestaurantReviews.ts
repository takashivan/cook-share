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
  RestaurantReviewsCreateData,
  RestaurantReviewsCreatePayload,
  RestaurantReviewsDeleteData,
  RestaurantReviewsDetailData,
  RestaurantReviewsListData,
  RestaurantReviewsPartialUpdateData,
  RestaurantReviewsPartialUpdatePayload,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class RestaurantReviews<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags restaurant_reviews
   * @name RestaurantReviewsDelete
   * @request DELETE:/restaurant_reviews/{restaurant_review_id}
   */
  restaurantReviewsDelete = (restaurantReviewId: number, params: RequestParams = {}) =>
    this.request<RestaurantReviewsDeleteData, void>({
      path: `/restaurant_reviews/${restaurantReviewId}`,
      method: "DELETE",
      format: "json",
      ...params,
    });

  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags restaurant_reviews
   * @name RestaurantReviewsDetail
   * @request GET:/restaurant_reviews/{restaurant_review_id}
   */
  restaurantReviewsDetail = (restaurantReviewId: number, params: RequestParams = {}) =>
    this.request<RestaurantReviewsDetailData, void>({
      path: `/restaurant_reviews/${restaurantReviewId}`,
      method: "GET",
      format: "json",
      ...params,
    });

  restaurantReviewsDetailQueryArgs = (
    restaurantReviewId: number,
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/restaurant_reviews/${restaurantReviewId}`] : null;
    const fetcher = () => this.restaurantReviewsDetail(restaurantReviewId, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags restaurant_reviews
   * @name RestaurantReviewsPartialUpdate
   * @request PATCH:/restaurant_reviews/{restaurant_review_id}
   */
  restaurantReviewsPartialUpdate = (
    restaurantReviewId: number,
    data: RestaurantReviewsPartialUpdatePayload,
    params: RequestParams = {},
  ) =>
    this.request<RestaurantReviewsPartialUpdateData, void>({
      path: `/restaurant_reviews/${restaurantReviewId}`,
      method: "PATCH",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });

  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags restaurant_reviews
   * @name RestaurantReviewsList
   * @request GET:/restaurant_reviews
   */
  restaurantReviewsList = (params: RequestParams = {}) =>
    this.request<RestaurantReviewsListData, void>({
      path: `/restaurant_reviews`,
      method: "GET",
      format: "json",
      ...params,
    });

  restaurantReviewsListQueryArgs = (params: RequestParams = {}, enabled: boolean = true) => {
    const key = enabled ? [`/restaurant_reviews`] : null;
    const fetcher = () => this.restaurantReviewsList(params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags restaurant_reviews
   * @name RestaurantReviewsCreate
   * @request POST:/restaurant_reviews
   */
  restaurantReviewsCreate = (data: RestaurantReviewsCreatePayload, params: RequestParams = {}) =>
    this.request<RestaurantReviewsCreateData, void>({
      path: `/restaurant_reviews`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
}
