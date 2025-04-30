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
  RestaurantCuisinesCreateData,
  RestaurantCuisinesCreatePayload,
  RestaurantCuisinesDeleteData,
  RestaurantCuisinesListData,
  RestaurantCuisinesPartialUpdateData,
  RestaurantCuisinesPartialUpdatePayload,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class RestaurantCuisines<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description [AUTH-Operator]運営だけが削除できる <br /><br /> <b>Authentication:</b> required
   *
   * @tags restaurant-cuisines
   * @name RestaurantCuisinesDelete
   * @summary [AUTH-Operator]運営だけが削除できる
   * @request DELETE:/restaurant-cuisines/{restaurant_cuisine_id}
   * @secure
   */
  restaurantCuisinesDelete = (
    restaurantCuisineId: number,
    params: RequestParams = {},
  ) =>
    this.request<RestaurantCuisinesDeleteData, void>({
      path: `/restaurant-cuisines/${restaurantCuisineId}`,
      method: "DELETE",
      secure: true,
      format: "json",
      ...params,
    });

  restaurantCuisinesDeleteQueryArgs = (
    restaurantCuisineId: number,
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled
      ? [`/restaurant-cuisines/${restaurantCuisineId}`]
      : null;
    const fetcher = () =>
      this.restaurantCuisinesDelete(restaurantCuisineId, params).then(
        (res) => res.data,
      );
    return [key, fetcher] as const;
  };

  /**
   * @description [AUTH-Operator]運営だけが編集できる <br /><br /> <b>Authentication:</b> required
   *
   * @tags restaurant-cuisines
   * @name RestaurantCuisinesPartialUpdate
   * @summary [AUTH-Operator]運営だけが編集できる
   * @request PATCH:/restaurant-cuisines/{restaurant_cuisine_id}
   * @secure
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
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });

  restaurantCuisinesPartialUpdateQueryArgs = (
    restaurantCuisineId: number,
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled
      ? [`/restaurant-cuisines/${restaurantCuisineId}`]
      : null;
    const fetcher: (
      url: string[],
      { arg }: { arg: RestaurantCuisinesPartialUpdatePayload },
    ) => Promise<RestaurantCuisinesPartialUpdateData> = (_, { arg }) =>
      this.restaurantCuisinesPartialUpdate(
        restaurantCuisineId,
        arg,
        params,
      ).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description [UNAUTHED]誰でも見られます。 <br /><br /> <b>Authentication:</b> not required
   *
   * @tags restaurant-cuisines
   * @name RestaurantCuisinesList
   * @summary [UNAUTHED]誰でも見られます。
   * @request GET:/restaurant-cuisines
   */
  restaurantCuisinesList = (params: RequestParams = {}) =>
    this.request<RestaurantCuisinesListData, void>({
      path: `/restaurant-cuisines`,
      method: "GET",
      format: "json",
      ...params,
    });

  restaurantCuisinesListQueryArgs = (
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/restaurant-cuisines`] : null;
    const fetcher = () =>
      this.restaurantCuisinesList(params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description [AUTH-Operator]運営だけが追加できる <br /><br /> <b>Authentication:</b> required
   *
   * @tags restaurant-cuisines
   * @name RestaurantCuisinesCreate
   * @summary [AUTH-Operator]運営だけが追加できる
   * @request POST:/restaurant-cuisines
   * @secure
   */
  restaurantCuisinesCreate = (
    data: RestaurantCuisinesCreatePayload,
    params: RequestParams = {},
  ) =>
    this.request<RestaurantCuisinesCreateData, void>({
      path: `/restaurant-cuisines`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });

  restaurantCuisinesCreateQueryArgs = (
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/restaurant-cuisines`] : null;
    const fetcher: (
      url: string[],
      { arg }: { arg: RestaurantCuisinesCreatePayload },
    ) => Promise<RestaurantCuisinesCreateData> = (_, { arg }) =>
      this.restaurantCuisinesCreate(arg, params).then((res) => res.data);
    return [key, fetcher] as const;
  };
}
