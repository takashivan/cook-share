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

import { RestaurantJobDetailData } from "./data-contracts";
import { HttpClient, RequestParams } from "./http-client";

export class RestaurantJob<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags restaurant_job
   * @name RestaurantJobDetail
   * @request GET:/restaurant_job/{restaurant_id}
   */
  restaurantJobDetail = (restaurantId: number, params: RequestParams = {}) =>
    this.request<RestaurantJobDetailData, void>({
      path: `/restaurant_job/${restaurantId}`,
      method: "GET",
      format: "json",
      ...params,
    });
}
