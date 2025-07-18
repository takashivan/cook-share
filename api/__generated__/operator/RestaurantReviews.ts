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

import { RestaurantReviewsListData } from "./data-contracts";
import { HttpClient, RequestParams } from "./http-client";

export class RestaurantReviews<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description [AUTHED-Operator]運営者だけが見られる、レストランからシェフへのレビュー一覧 <br /><br /> <b>Authentication:</b> required
   *
   * @tags restaurant_reviews
   * @name RestaurantReviewsList
   * @summary [AUTHED-Operator]運営者だけが見られる、レストランからシェフへのレビュー一覧
   * @request GET:/restaurant_reviews
   * @secure
   */
  restaurantReviewsList = (params: RequestParams = {}) =>
    this.request<RestaurantReviewsListData, void>({
      path: `/restaurant_reviews`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });

  restaurantReviewsListQueryArgs = (
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/restaurant_reviews`] : null;
    const fetcher = () =>
      this.restaurantReviewsList(params).then((res) => res.data);
    return [key, fetcher] as const;
  };
}
