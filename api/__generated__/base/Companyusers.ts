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
  CompanyuserNotificationsListResult,
  CompanyusersCreateBody,
  CompanyusersCreateResult,
  CompanyusersDeleteData,
  CompanyusersListResult,
  CompanyusersPartialUpdateData,
  CompanyusersPartialUpdatePayload,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Companyusers<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * @description Delete CompanyUser record. <br /><br /> <b>Authentication:</b> not required
   *
   * @tags companyusers
   * @name CompanyusersDelete
   * @summary Delete CompanyUser record.
   * @request DELETE:/companyusers/{companyuser_id}
   */
  companyusersDelete = (companyuserId: string, params: RequestParams = {}) =>
    this.request<CompanyusersDeleteData, void>({
      path: `/companyusers/${companyuserId}`,
      method: "DELETE",
      format: "json",
      ...params,
    });
  /**
   * @description Edit CompanyUser record <br /><br /> <b>Authentication:</b> not required
   *
   * @tags companyusers
   * @name CompanyusersPartialUpdate
   * @summary Edit CompanyUser record
   * @request PATCH:/companyusers/{companyuser_id}
   */
  companyusersPartialUpdate = (
    companyuserId: string,
    data: CompanyusersPartialUpdatePayload,
    params: RequestParams = {},
  ) =>
    this.request<CompanyusersPartialUpdateData, void>({
      path: `/companyusers/${companyuserId}`,
      method: "PATCH",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags companyusers
   * @name CompanyuserNotificationsList
   * @request GET:/companyusers/{user_id}/companyuser-notifications
   */
  companyuserNotificationsList = (userId: string, params: RequestParams = {}) =>
    this.request<CompanyuserNotificationsListResult, void>({
      path: `/companyusers/${userId}/companyuser-notifications`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * @description Query all CompanyUser records <br /><br /> <b>Authentication:</b> not required
   *
   * @tags companyusers
   * @name CompanyusersList
   * @summary Query all CompanyUser records
   * @request GET:/companyusers
   */
  companyusersList = (params: RequestParams = {}) =>
    this.request<CompanyusersListResult, void>({
      path: `/companyusers`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * @description Add CompanyUser record <br /><br /> <b>Authentication:</b> not required
   *
   * @tags companyusers
   * @name CompanyusersCreate
   * @summary Add CompanyUser record
   * @request POST:/companyusers
   */
  companyusersCreate = (data: CompanyusersCreateBody, params: RequestParams = {}) =>
    this.request<CompanyusersCreateResult, void>({
      path: `/companyusers`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
}
