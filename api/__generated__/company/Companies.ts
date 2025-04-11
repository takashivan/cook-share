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
  CompaniesCreateData,
  CompaniesCreatePayload,
  CompaniesDeleteData,
  CompaniesDetailData,
  CompaniesListData,
  CompaniesPartialUpdateData,
  CompaniesPartialUpdatePayload,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Companies<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * @description Delete Companies record. <br /><br /> <b>Authentication:</b> not required
   *
   * @tags companies
   * @name CompaniesDelete
   * @summary Delete Companies record.
   * @request DELETE:/companies/{companies_id}
   */
  companiesDelete = (companiesId: string, params: RequestParams = {}) =>
    this.request<CompaniesDeleteData, void>({
      path: `/companies/${companiesId}`,
      method: "DELETE",
      format: "json",
      ...params,
    });
  /**
   * @description Get Companies record <br /><br /> <b>Authentication:</b> not required
   *
   * @tags companies
   * @name CompaniesDetail
   * @summary Get Companies record
   * @request GET:/companies/{companies_id}
   */
  companiesDetail = (companiesId: string, params: RequestParams = {}) =>
    this.request<CompaniesDetailData, void>({
      path: `/companies/${companiesId}`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * @description Edit Companies record <br /><br /> <b>Authentication:</b> not required
   *
   * @tags companies
   * @name CompaniesPartialUpdate
   * @summary Edit Companies record
   * @request PATCH:/companies/{companies_id}
   */
  companiesPartialUpdate = (companiesId: string, data: CompaniesPartialUpdatePayload, params: RequestParams = {}) =>
    this.request<CompaniesPartialUpdateData, void>({
      path: `/companies/${companiesId}`,
      method: "PATCH",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Query all Companies records <br /><br /> <b>Authentication:</b> not required
   *
   * @tags companies
   * @name CompaniesList
   * @summary Query all Companies records
   * @request GET:/companies
   */
  companiesList = (params: RequestParams = {}) =>
    this.request<CompaniesListData, void>({
      path: `/companies`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * @description Add Companies record <br /><br /> <b>Authentication:</b> not required
   *
   * @tags companies
   * @name CompaniesCreate
   * @summary Add Companies record
   * @request POST:/companies
   */
  companiesCreate = (data: CompaniesCreatePayload, params: RequestParams = {}) =>
    this.request<CompaniesCreateData, void>({
      path: `/companies`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
}
