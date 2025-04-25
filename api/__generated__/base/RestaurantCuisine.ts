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

import { RestaurantCuisineList2Data, RestaurantCuisineListData } from "./data-contracts";
import { HttpClient, RequestParams } from "./http-client";

export class RestaurantCuisine<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags restaurant-cuisine
   * @name RestaurantCuisineList
   * @request GET:/restaurant-cuisine
   */
  restaurantCuisineList = (params: RequestParams = {}) =>
    this.request<RestaurantCuisineListData, void>({
      path: `/restaurant-cuisine`,
      method: "GET",
      format: "json",
      ...params,
    });

  restaurantCuisineListQueryArgs = (params: RequestParams = {}, enabled: boolean = true) => {
    const key = enabled ? [`/restaurant-cuisine`] : null;
    const fetcher = () => this.restaurantCuisineList(params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags restaurant_cuisine
   * @name RestaurantCuisineList2
   * @request GET:/restaurant_cuisine
   * @originalName restaurantCuisineList
   * @duplicate
   */
  restaurantCuisineList2 = (params: RequestParams = {}) =>
    this.request<RestaurantCuisineList2Data, void>({
      path: `/restaurant_cuisine`,
      method: "GET",
      format: "json",
      ...params,
    });

  restaurantCuisineList2QueryArgs = (params: RequestParams = {}, enabled: boolean = true) => {
    const key = enabled ? [`/restaurant_cuisine`] : null;
    const fetcher = () => this.restaurantCuisineList2(params).then((res) => res.data);
    return [key, fetcher] as const;
  };
}
