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

import { RestaurantCuisineListData } from "./data-contracts";
import { HttpClient, RequestParams } from "./http-client";

export class RestaurantCuisine<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags restaurant_cuisine
   * @name RestaurantCuisineList
   * @request GET:/restaurant_cuisine
   */
  restaurantCuisineList = (params: RequestParams = {}) =>
    this.request<RestaurantCuisineListData, void>({
      path: `/restaurant_cuisine`,
      method: "GET",
      format: "json",
      ...params,
    });
}
