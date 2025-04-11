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
  CompanyusersListData,
  CompanyusersListParams,
  StaffsListData,
  StaffsListParams,
} from "./data-contracts";
import { HttpClient, RequestParams } from "./http-client";

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
   * @name CompanyusersList
   * @request GET:/restaurant/companyusers
   */
  companyusersList = (query: CompanyusersListParams, params: RequestParams = {}) =>
    this.request<CompanyusersListData, void>({
      path: `/restaurant/companyusers`,
      method: "GET",
      query: query,
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
}
