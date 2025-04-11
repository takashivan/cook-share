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
}
