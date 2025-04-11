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
  CompanyDetailData,
  CompanyuserCreateData,
  CompanyuserCreatePayload,
  CompanyuserDeleteData,
  CompanyuserDetailData,
  CompanyuserListData,
  CompanyuserPartialUpdateData,
  CompanyuserPartialUpdatePayload,
  MeRestaurantsListData,
  MeRestaurantsListParams,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Companyuser<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags companyuser
   * @name CompanyDetail
   * @request GET:/companyuser/company/{company_id}
   */
  companyDetail = (companyId: string, params: RequestParams = {}) =>
    this.request<CompanyDetailData, void>({
      path: `/companyuser/company/${companyId}`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags companyuser
   * @name MeRestaurantsList
   * @request GET:/companyuser/me/restaurants
   */
  meRestaurantsList = (query: MeRestaurantsListParams, params: RequestParams = {}) =>
    this.request<MeRestaurantsListData, void>({
      path: `/companyuser/me/restaurants`,
      method: "GET",
      query: query,
      format: "json",
      ...params,
    });
  /**
   * @description Delete CompanyUser record. <br /><br /> <b>Authentication:</b> not required
   *
   * @tags companyuser
   * @name CompanyuserDelete
   * @summary Delete CompanyUser record.
   * @request DELETE:/companyuser/{companyuser_id}
   */
  companyuserDelete = (companyuserId: string, params: RequestParams = {}) =>
    this.request<CompanyuserDeleteData, void>({
      path: `/companyuser/${companyuserId}`,
      method: "DELETE",
      format: "json",
      ...params,
    });
  /**
   * @description Get CompanyUser record <br /><br /> <b>Authentication:</b> not required
   *
   * @tags companyuser
   * @name CompanyuserDetail
   * @summary Get CompanyUser record
   * @request GET:/companyuser/{companyuser_id}
   */
  companyuserDetail = (companyuserId: string, params: RequestParams = {}) =>
    this.request<CompanyuserDetailData, void>({
      path: `/companyuser/${companyuserId}`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * @description Edit CompanyUser record <br /><br /> <b>Authentication:</b> not required
   *
   * @tags companyuser
   * @name CompanyuserPartialUpdate
   * @summary Edit CompanyUser record
   * @request PATCH:/companyuser/{companyuser_id}
   */
  companyuserPartialUpdate = (
    companyuserId: string,
    data: CompanyuserPartialUpdatePayload,
    params: RequestParams = {},
  ) =>
    this.request<CompanyuserPartialUpdateData, void>({
      path: `/companyuser/${companyuserId}`,
      method: "PATCH",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Query all CompanyUser records <br /><br /> <b>Authentication:</b> not required
   *
   * @tags companyuser
   * @name CompanyuserList
   * @summary Query all CompanyUser records
   * @request GET:/companyuser
   */
  companyuserList = (params: RequestParams = {}) =>
    this.request<CompanyuserListData, void>({
      path: `/companyuser`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * @description Add CompanyUser record <br /><br /> <b>Authentication:</b> not required
   *
   * @tags companyuser
   * @name CompanyuserCreate
   * @summary Add CompanyUser record
   * @request POST:/companyuser
   */
  companyuserCreate = (data: CompanyuserCreatePayload, params: RequestParams = {}) =>
    this.request<CompanyuserCreateData, void>({
      path: `/companyuser`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
}
