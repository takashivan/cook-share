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

import { RestaurantsDetailData, RestaurantsListData } from "./data-contracts";
import { HttpClient, RequestParams } from "./http-client";

export class Restaurants<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description [AUTHED-Operator]運営者だけが見られる、店舗の詳細 <br /><br /> <b>Authentication:</b> required
   *
   * @tags restaurants
   * @name RestaurantsDetail
   * @summary [AUTHED-Operator]運営者だけが見られる、店舗の詳細
   * @request GET:/restaurants/{restaurant_id}
   * @secure
   */
  restaurantsDetail = (restaurantId: number, params: RequestParams = {}) =>
    this.request<RestaurantsDetailData, void>({
      path: `/restaurants/${restaurantId}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });

  restaurantsDetailQueryArgs = (
    restaurantId: number,
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/restaurants/${restaurantId}`] : null;
    const fetcher = () =>
      this.restaurantsDetail(restaurantId, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description [AUTHED-Operator]運営者だけが見られる、店舗一覧 <br /><br /> <b>Authentication:</b> required
   *
   * @tags restaurants
   * @name RestaurantsList
   * @summary [AUTHED-Operator]運営者だけが見られる、店舗一覧
   * @request GET:/restaurants
   * @secure
   */
  restaurantsList = (params: RequestParams = {}) =>
    this.request<RestaurantsListData, void>({
      path: `/restaurants`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });

  restaurantsListQueryArgs = (
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/restaurants`] : null;
    const fetcher = () => this.restaurantsList(params).then((res) => res.data);
    return [key, fetcher] as const;
  };
}
