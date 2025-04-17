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
  RestaurantaccessesCreateData,
  RestaurantaccessesCreatePayload,
  RestaurantaccessesDeleteData,
  RestaurantaccessesListData,
  RestaurantaccessesPartialUpdateData,
  RestaurantaccessesPartialUpdatePayload,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Restaurantaccesses<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * @description Delete RestaurantAccess record. <br /><br /> <b>Authentication:</b> not required
   *
   * @tags restaurantaccesses
   * @name RestaurantaccessesDelete
   * @summary Delete RestaurantAccess record.
   * @request DELETE:/restaurantaccesses/{restaurantaccess_id}
   */
  restaurantaccessesDelete = (restaurantaccessId: string, params: RequestParams = {}) =>
    this.request<RestaurantaccessesDeleteData, void>({
      path: `/restaurantaccesses/${restaurantaccessId}`,
      method: "DELETE",
      format: "json",
      ...params,
    });

  /**
   * @description Edit RestaurantAccess record <br /><br /> <b>Authentication:</b> not required
   *
   * @tags restaurantaccesses
   * @name RestaurantaccessesPartialUpdate
   * @summary Edit RestaurantAccess record
   * @request PATCH:/restaurantaccesses/{restaurantaccess_id}
   */
  restaurantaccessesPartialUpdate = (
    restaurantaccessId: string,
    data: RestaurantaccessesPartialUpdatePayload,
    params: RequestParams = {},
  ) =>
    this.request<RestaurantaccessesPartialUpdateData, void>({
      path: `/restaurantaccesses/${restaurantaccessId}`,
      method: "PATCH",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });

  /**
   * @description Query all RestaurantAccess records <br /><br /> <b>Authentication:</b> not required
   *
   * @tags restaurantaccesses
   * @name RestaurantaccessesList
   * @summary Query all RestaurantAccess records
   * @request GET:/restaurantaccesses
   */
  restaurantaccessesList = (params: RequestParams = {}) =>
    this.request<RestaurantaccessesListData, void>({
      path: `/restaurantaccesses`,
      method: "GET",
      format: "json",
      ...params,
    });

  restaurantaccessesListQueryArgs = (params: RequestParams = {}, enabled: boolean = true) => {
    const key = enabled ? [`/restaurantaccesses`] : null;
    const fetcher = () => this.restaurantaccessesList(params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description Add RestaurantAccess record <br /><br /> <b>Authentication:</b> not required
   *
   * @tags restaurantaccesses
   * @name RestaurantaccessesCreate
   * @summary Add RestaurantAccess record
   * @request POST:/restaurantaccesses
   */
  restaurantaccessesCreate = (data: RestaurantaccessesCreatePayload, params: RequestParams = {}) =>
    this.request<RestaurantaccessesCreateData, void>({
      path: `/restaurantaccesses`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
}
