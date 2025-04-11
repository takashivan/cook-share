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
  StaffrestaurantaccessCreateData,
  StaffrestaurantaccessDeleteData,
  StaffrestaurantaccessDetailData,
  StaffrestaurantaccessListData,
  StaffrestaurantaccessPartialUpdateData,
} from "./data-contracts";
import { HttpClient, RequestParams } from "./http-client";

export class Staffrestaurantaccess<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * @description Delete StaffRestaurantAccess record. <br /><br /> <b>Authentication:</b> not required
   *
   * @tags staffrestaurantaccess
   * @name StaffrestaurantaccessDelete
   * @summary Delete StaffRestaurantAccess record.
   * @request DELETE:/staffrestaurantaccess/{staffrestaurantaccess_id}
   */
  staffrestaurantaccessDelete = (staffrestaurantaccessId: string, params: RequestParams = {}) =>
    this.request<StaffrestaurantaccessDeleteData, void>({
      path: `/staffrestaurantaccess/${staffrestaurantaccessId}`,
      method: "DELETE",
      format: "json",
      ...params,
    });
  /**
   * @description Get StaffRestaurantAccess record <br /><br /> <b>Authentication:</b> not required
   *
   * @tags staffrestaurantaccess
   * @name StaffrestaurantaccessDetail
   * @summary Get StaffRestaurantAccess record
   * @request GET:/staffrestaurantaccess/{staffrestaurantaccess_id}
   */
  staffrestaurantaccessDetail = (staffrestaurantaccessId: string, params: RequestParams = {}) =>
    this.request<StaffrestaurantaccessDetailData, void>({
      path: `/staffrestaurantaccess/${staffrestaurantaccessId}`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * @description Edit StaffRestaurantAccess record <br /><br /> <b>Authentication:</b> not required
   *
   * @tags staffrestaurantaccess
   * @name StaffrestaurantaccessPartialUpdate
   * @summary Edit StaffRestaurantAccess record
   * @request PATCH:/staffrestaurantaccess/{staffrestaurantaccess_id}
   */
  staffrestaurantaccessPartialUpdate = (staffrestaurantaccessId: string, params: RequestParams = {}) =>
    this.request<StaffrestaurantaccessPartialUpdateData, void>({
      path: `/staffrestaurantaccess/${staffrestaurantaccessId}`,
      method: "PATCH",
      format: "json",
      ...params,
    });
  /**
   * @description Query all StaffRestaurantAccess records <br /><br /> <b>Authentication:</b> not required
   *
   * @tags staffrestaurantaccess
   * @name StaffrestaurantaccessList
   * @summary Query all StaffRestaurantAccess records
   * @request GET:/staffrestaurantaccess
   */
  staffrestaurantaccessList = (params: RequestParams = {}) =>
    this.request<StaffrestaurantaccessListData, void>({
      path: `/staffrestaurantaccess`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * @description Add StaffRestaurantAccess record <br /><br /> <b>Authentication:</b> not required
   *
   * @tags staffrestaurantaccess
   * @name StaffrestaurantaccessCreate
   * @summary Add StaffRestaurantAccess record
   * @request POST:/staffrestaurantaccess
   */
  staffrestaurantaccessCreate = (params: RequestParams = {}) =>
    this.request<StaffrestaurantaccessCreateData, void>({
      path: `/staffrestaurantaccess`,
      method: "POST",
      format: "json",
      ...params,
    });
}
