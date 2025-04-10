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
  RestaurantCuisineCreateData,
  RestaurantCuisineCreatePayload,
  RestaurantCuisineDeleteData,
  RestaurantCuisineDetailData,
  RestaurantCuisineListData,
  RestaurantCuisinePartialUpdateData,
  RestaurantCuisinePartialUpdatePayload,
  RestaurantCuisineUpdateData,
  RestaurantCuisineUpdatePayload,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class RestaurantCuisine<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * @description <br /><br /> <b>Authentication:</b> required
   *
   * @tags restaurant_cuisine
   * @name RestaurantCuisineDelete
   * @request DELETE:/restaurant_cuisine/{restaurant_cuisine_id}
   * @secure
   */
  restaurantCuisineDelete = (restaurantCuisineId: number, params: RequestParams = {}) =>
    this.request<RestaurantCuisineDeleteData, void>({
      path: `/restaurant_cuisine/${restaurantCuisineId}`,
      method: "DELETE",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags restaurant_cuisine
   * @name RestaurantCuisineDetail
   * @request GET:/restaurant_cuisine/{restaurant_cuisine_id}
   */
  restaurantCuisineDetail = (restaurantCuisineId: number, params: RequestParams = {}) =>
    this.request<RestaurantCuisineDetailData, void>({
      path: `/restaurant_cuisine/${restaurantCuisineId}`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags restaurant_cuisine
   * @name RestaurantCuisinePartialUpdate
   * @request PATCH:/restaurant_cuisine/{restaurant_cuisine_id}
   */
  restaurantCuisinePartialUpdate = (
    restaurantCuisineId: number,
    data: RestaurantCuisinePartialUpdatePayload,
    params: RequestParams = {},
  ) =>
    this.request<RestaurantCuisinePartialUpdateData, void>({
      path: `/restaurant_cuisine/${restaurantCuisineId}`,
      method: "PATCH",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags restaurant_cuisine
   * @name RestaurantCuisineUpdate
   * @request PUT:/restaurant_cuisine/{restaurant_cuisine_id}
   */
  restaurantCuisineUpdate = (
    restaurantCuisineId: number,
    data: RestaurantCuisineUpdatePayload,
    params: RequestParams = {},
  ) =>
    this.request<RestaurantCuisineUpdateData, void>({
      path: `/restaurant_cuisine/${restaurantCuisineId}`,
      method: "PUT",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
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
  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags restaurant_cuisine
   * @name RestaurantCuisineCreate
   * @request POST:/restaurant_cuisine
   */
  restaurantCuisineCreate = (data: RestaurantCuisineCreatePayload, params: RequestParams = {}) =>
    this.request<RestaurantCuisineCreateData, void>({
      path: `/restaurant_cuisine`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
}
