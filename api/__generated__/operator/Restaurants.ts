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

import { RestaurantsListData } from "./data-contracts";
import { HttpClient, RequestParams } from "./http-client";

export class Restaurants<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
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
