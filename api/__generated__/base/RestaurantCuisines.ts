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
  RestaurantCuisinesCreateData,
  RestaurantCuisinesCreatePayload,
  RestaurantCuisinesDeleteData,
  RestaurantCuisinesDetailData,
  RestaurantCuisinesListData,
  RestaurantCuisinesPartialUpdateData,
  RestaurantCuisinesPartialUpdatePayload,
  RestaurantCuisinesUpdateData,
  RestaurantCuisinesUpdatePayload,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class RestaurantCuisines<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * @description <br /><br /> <b>Authentication:</b> required
   *
   * @tags restaurant-cuisines
   * @name RestaurantCuisinesDelete
   * @request DELETE:/restaurant-cuisines/{restaurant_cuisine_id}
   * @secure
   */
  restaurantCuisinesDelete = (restaurantCuisineId: number, params: RequestParams = {}) =>
    this.request<RestaurantCuisinesDeleteData, void>({
      path: `/restaurant-cuisines/${restaurantCuisineId}`,
      method: "DELETE",
      secure: true,
      format: "json",
      ...params,
    });

  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags restaurant-cuisines
   * @name RestaurantCuisinesDetail
   * @request GET:/restaurant-cuisines/{restaurant_cuisine_id}
   */
  restaurantCuisinesDetail = (restaurantCuisineId: number, params: RequestParams = {}) =>
    this.request<RestaurantCuisinesDetailData, void>({
      path: `/restaurant-cuisines/${restaurantCuisineId}`,
      method: "GET",
      format: "json",
      ...params,
    });

  restaurantCuisinesDetailQueryArgs = (
    restaurantCuisineId: number,
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/restaurant-cuisines/${restaurantCuisineId}`] : null;
    const fetcher = () => this.restaurantCuisinesDetail(restaurantCuisineId, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags restaurant-cuisines
   * @name RestaurantCuisinesPartialUpdate
   * @request PATCH:/restaurant-cuisines/{restaurant_cuisine_id}
   */
  restaurantCuisinesPartialUpdate = (
    restaurantCuisineId: number,
    data: RestaurantCuisinesPartialUpdatePayload,
    params: RequestParams = {},
  ) =>
    this.request<RestaurantCuisinesPartialUpdateData, void>({
      path: `/restaurant-cuisines/${restaurantCuisineId}`,
      method: "PATCH",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });

  restaurantCuisinesPartialUpdateQueryArgs = (
    restaurantCuisineId: number,
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/restaurant-cuisines/${restaurantCuisineId}`] : null;
    const fetcher: (
      url: string[],
      { arg }: { arg: RestaurantCuisinesPartialUpdatePayload },
    ) => Promise<RestaurantCuisinesPartialUpdateData> = (_, { arg }) =>
      this.restaurantCuisinesPartialUpdate(restaurantCuisineId, arg, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags restaurant-cuisines
   * @name RestaurantCuisinesUpdate
   * @request PUT:/restaurant-cuisines/{restaurant_cuisine_id}
   */
  restaurantCuisinesUpdate = (
    restaurantCuisineId: number,
    data: RestaurantCuisinesUpdatePayload,
    params: RequestParams = {},
  ) =>
    this.request<RestaurantCuisinesUpdateData, void>({
      path: `/restaurant-cuisines/${restaurantCuisineId}`,
      method: "PUT",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });

  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags restaurant-cuisines
   * @name RestaurantCuisinesList
   * @request GET:/restaurant-cuisines
   */
  restaurantCuisinesList = (params: RequestParams = {}) =>
    this.request<RestaurantCuisinesListData, void>({
      path: `/restaurant-cuisines`,
      method: "GET",
      format: "json",
      ...params,
    });

  restaurantCuisinesListQueryArgs = (params: RequestParams = {}, enabled: boolean = true) => {
    const key = enabled ? [`/restaurant-cuisines`] : null;
    const fetcher = () => this.restaurantCuisinesList(params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags restaurant-cuisines
   * @name RestaurantCuisinesCreate
   * @request POST:/restaurant-cuisines
   */
  restaurantCuisinesCreate = (data: RestaurantCuisinesCreatePayload, params: RequestParams = {}) =>
    this.request<RestaurantCuisinesCreateData, void>({
      path: `/restaurant-cuisines`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });

  restaurantCuisinesCreateQueryArgs = (params: RequestParams = {}, enabled: boolean = true) => {
    const key = enabled ? [`/restaurant-cuisines`] : null;
    const fetcher: (
      url: string[],
      { arg }: { arg: RestaurantCuisinesCreatePayload },
    ) => Promise<RestaurantCuisinesCreateData> = (_, { arg }) =>
      this.restaurantCuisinesCreate(arg, params).then((res) => res.data);
    return [key, fetcher] as const;
  };
}
