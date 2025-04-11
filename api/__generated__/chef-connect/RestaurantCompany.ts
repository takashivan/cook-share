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

import { RestaurantCompanyDetailData } from "./data-contracts";
import { HttpClient, RequestParams } from "./http-client";

export class RestaurantCompany<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags restaurant_company
   * @name RestaurantCompanyDetail
   * @request GET:/restaurant_company/{company_id}
   */
  restaurantCompanyDetail = (companyId: string, params: RequestParams = {}) =>
    this.request<RestaurantCompanyDetailData, void>({
      path: `/restaurant_company/${companyId}`,
      method: "GET",
      format: "json",
      ...params,
    });
}
