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
  RestaurantaccessCreateData,
  RestaurantaccessCreatePayload,
  RestaurantaccessDeleteData,
  RestaurantaccessDetailData,
  RestaurantaccessListData,
  RestaurantaccessPartialUpdateData,
  RestaurantaccessPartialUpdatePayload,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Restaurantaccess<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * @description Delete RestaurantAccess record. <br /><br /> <b>Authentication:</b> not required
   *
   * @tags restaurantaccess
   * @name RestaurantaccessDelete
   * @summary Delete RestaurantAccess record.
   * @request DELETE:/restaurantaccess/{restaurantaccess_id}
   */
  restaurantaccessDelete = (restaurantaccessId: string, params: RequestParams = {}) =>
    this.request<RestaurantaccessDeleteData, void>({
      path: `/restaurantaccess/${restaurantaccessId}`,
      method: "DELETE",
      format: "json",
      ...params,
    });

  /**
   * @description Get RestaurantAccess record <br /><br /> <b>Authentication:</b> not required
   *
   * @tags restaurantaccess
   * @name RestaurantaccessDetail
   * @summary Get RestaurantAccess record
   * @request GET:/restaurantaccess/{restaurantaccess_id}
   */
  restaurantaccessDetail = (restaurantaccessId: string, params: RequestParams = {}) =>
    this.request<RestaurantaccessDetailData, void>({
      path: `/restaurantaccess/${restaurantaccessId}`,
      method: "GET",
      format: "json",
      ...params,
    });

  restaurantaccessDetailQueryArgs = (
    restaurantaccessId: string,
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/restaurantaccess/${restaurantaccessId}`] : null;
    const fetcher = () => this.restaurantaccessDetail(restaurantaccessId, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description Edit RestaurantAccess record <br /><br /> <b>Authentication:</b> not required
   *
   * @tags restaurantaccess
   * @name RestaurantaccessPartialUpdate
   * @summary Edit RestaurantAccess record
   * @request PATCH:/restaurantaccess/{restaurantaccess_id}
   */
  restaurantaccessPartialUpdate = (
    restaurantaccessId: string,
    data: RestaurantaccessPartialUpdatePayload,
    params: RequestParams = {},
  ) =>
    this.request<RestaurantaccessPartialUpdateData, void>({
      path: `/restaurantaccess/${restaurantaccessId}`,
      method: "PATCH",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });

  restaurantaccessPartialUpdateQueryArgs = (
    restaurantaccessId: string,
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/restaurantaccess/${restaurantaccessId}`] : null;
    const fetcher: (
      url: string[],
      { arg }: { arg: RestaurantaccessPartialUpdatePayload },
    ) => Promise<RestaurantaccessPartialUpdateData> = (_, { arg }) =>
      this.restaurantaccessPartialUpdate(restaurantaccessId, arg, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description Query all RestaurantAccess records <br /><br /> <b>Authentication:</b> not required
   *
   * @tags restaurantaccess
   * @name RestaurantaccessList
   * @summary Query all RestaurantAccess records
   * @request GET:/restaurantaccess
   */
  restaurantaccessList = (params: RequestParams = {}) =>
    this.request<RestaurantaccessListData, void>({
      path: `/restaurantaccess`,
      method: "GET",
      format: "json",
      ...params,
    });

  restaurantaccessListQueryArgs = (params: RequestParams = {}, enabled: boolean = true) => {
    const key = enabled ? [`/restaurantaccess`] : null;
    const fetcher = () => this.restaurantaccessList(params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description Add RestaurantAccess record <br /><br /> <b>Authentication:</b> not required
   *
   * @tags restaurantaccess
   * @name RestaurantaccessCreate
   * @summary Add RestaurantAccess record
   * @request POST:/restaurantaccess
   */
  restaurantaccessCreate = (data: RestaurantaccessCreatePayload, params: RequestParams = {}) =>
    this.request<RestaurantaccessCreateData, void>({
      path: `/restaurantaccess`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });

  restaurantaccessCreateQueryArgs = (params: RequestParams = {}, enabled: boolean = true) => {
    const key = enabled ? [`/restaurantaccess`] : null;
    const fetcher: (
      url: string[],
      { arg }: { arg: RestaurantaccessCreatePayload },
    ) => Promise<RestaurantaccessCreateData> = (_, { arg }) =>
      this.restaurantaccessCreate(arg, params).then((res) => res.data);
    return [key, fetcher] as const;
  };
}
