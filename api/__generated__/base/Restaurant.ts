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
  CheckAccessListData,
  CheckAccessListParams,
  CompanyusersClone0ListData,
  CompanyusersDetailData,
  RestaurantCreateData,
  RestaurantCreatePayload,
  RestaurantDeleteData,
  RestaurantDetailResult,
  RestaurantListData,
  RestaurantPartialUpdateData,
  RestaurantPartialUpdatePayload,
  StaffInviteCreateBody,
  StaffInviteCreateResult,
  StaffsListData,
  StaffsListParams,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Restaurant<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags restaurant
   * @name CheckAccessList
   * @request GET:/restaurant/check-access
   */
  checkAccessList = (query: CheckAccessListParams, params: RequestParams = {}) =>
    this.request<CheckAccessListData, void>({
      path: `/restaurant/check-access`,
      method: "GET",
      query: query,
      format: "json",
      ...params,
    });
  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags restaurant
   * @name CompanyusersClone0List
   * @request GET:/restaurant/companyusers/{restaurant_id}/clone_0
   */
  companyusersClone0List = (restaurantId: number, params: RequestParams = {}) =>
    this.request<CompanyusersClone0ListData, void>({
      path: `/restaurant/companyusers/${restaurantId}/clone_0`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags restaurant
   * @name CompanyusersDetail
   * @request GET:/restaurant/companyusers/{restaurant_id}
   */
  companyusersDetail = (restaurantId: number, params: RequestParams = {}) =>
    this.request<CompanyusersDetailData, void>({
      path: `/restaurant/companyusers/${restaurantId}`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags restaurant
   * @name StaffInviteCreate
   * @request POST:/restaurant/staff/invite
   */
  staffInviteCreate = (data: StaffInviteCreateBody, params: RequestParams = {}) =>
    this.request<StaffInviteCreateResult, void>({
      path: `/restaurant/staff/invite`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags restaurant
   * @name StaffsList
   * @request GET:/restaurant/staffs
   */
  staffsList = (query: StaffsListParams, params: RequestParams = {}) =>
    this.request<StaffsListData, void>({
      path: `/restaurant/staffs`,
      method: "GET",
      query: query,
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
