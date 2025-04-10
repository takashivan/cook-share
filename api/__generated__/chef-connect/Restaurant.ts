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
  CompanyDetailResult,
  RestaurantCreateData,
  RestaurantCreatePayload,
  RestaurantDeleteData,
  RestaurantDetailResult,
  RestaurantListData,
  RestaurantPartialUpdateData,
  RestaurantPartialUpdatePayload,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Restaurant<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags restaurant
   * @name CompanyDetail
   * @request GET:/restaurant/company/{company_id}
   */
  companyDetail = (companyId: string, params: RequestParams = {}) =>
    this.request<CompanyDetailResult, void>({
      path: `/restaurant/company/${companyId}`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * @description Delete restaurant record. <br /><br /> <b>Authentication:</b> not required
   *
   * @tags restaurant
   * @name RestaurantDelete
   * @summary Delete restaurant record.
   * @request DELETE:/restaurant/{restaurant_id}
   */
  restaurantDelete = (restaurantId: number, params: RequestParams = {}) =>
    this.request<RestaurantDeleteData, void>({
      path: `/restaurant/${restaurantId}`,
      method: "DELETE",
      format: "json",
      ...params,
    });
  /**
   * @description Get restaurant record <br /><br /> <b>Authentication:</b> not required
   *
   * @tags restaurant
   * @name RestaurantDetail
   * @summary Get restaurant record
   * @request GET:/restaurant/{restaurant_id}
   */
  restaurantDetail = (restaurantId: number, params: RequestParams = {}) =>
    this.request<RestaurantDetailResult, void>({
      path: `/restaurant/${restaurantId}`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * @description Edit restaurant record <br /><br /> <b>Authentication:</b> not required
   *
   * @tags restaurant
   * @name RestaurantPartialUpdate
   * @summary Edit restaurant record
   * @request PATCH:/restaurant/{restaurant_id}
   */
  restaurantPartialUpdate = (restaurantId: number, data: RestaurantPartialUpdatePayload, params: RequestParams = {}) =>
    this.request<RestaurantPartialUpdateData, void>({
      path: `/restaurant/${restaurantId}`,
      method: "PATCH",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Query all restaurant records <br /><br /> <b>Authentication:</b> not required
   *
   * @tags restaurant
   * @name RestaurantList
   * @summary Query all restaurant records
   * @request GET:/restaurant
   */
  restaurantList = (params: RequestParams = {}) =>
    this.request<RestaurantListData, void>({
      path: `/restaurant`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * @description Add restaurant record <br /><br /> <b>Authentication:</b> not required
   *
   * @tags restaurant
   * @name RestaurantCreate
   * @summary Add restaurant record
   * @request POST:/restaurant
   */
  restaurantCreate = (data: RestaurantCreatePayload, params: RequestParams = {}) =>
    this.request<RestaurantCreateData, void>({
      path: `/restaurant`,
      method: "POST",
      body: data,
      type: ContentType.FormData,
      format: "json",
      ...params,
    });
}
