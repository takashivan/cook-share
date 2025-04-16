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
  ByRestaurantCreateData,
  ByRestaurantCreatePayload,
  ByUserDetailOutput,
  CompanyuserNotificationCreateData,
  CompanyuserNotificationCreatePayload,
  CompanyuserNotificationDeleteData,
  CompanyuserNotificationDetailData,
  CompanyuserNotificationListData,
  CompanyuserNotificationPartialUpdateData,
  CompanyuserNotificationPartialUpdatePayload,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class CompanyuserNotification<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags companyuser_notification
   * @name ByRestaurantCreate
   * @request POST:/companyuser_notification/byRestaurant/{restaurant_id}
   */
  byRestaurantCreate = (restaurantId: number, data: ByRestaurantCreatePayload, params: RequestParams = {}) =>
    this.request<ByRestaurantCreateData, void>({
      path: `/companyuser_notification/byRestaurant/${restaurantId}`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags companyuser_notification
   * @name ByUserDetail
   * @request GET:/companyuser_notification/byUser/{user_id}
   */
  byUserDetail = (userId: string, params: RequestParams = {}) =>
    this.request<ByUserDetailOutput, void>({
      path: `/companyuser_notification/byUser/${userId}`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * @description Delete companyUser_notification record. <br /><br /> <b>Authentication:</b> not required
   *
   * @tags companyuser_notification
   * @name CompanyuserNotificationDelete
   * @summary Delete companyUser_notification record.
   * @request DELETE:/companyuser_notification/{companyuser_notification_id}
   */
  companyuserNotificationDelete = (companyuserNotificationId: string, params: RequestParams = {}) =>
    this.request<CompanyuserNotificationDeleteData, void>({
      path: `/companyuser_notification/${companyuserNotificationId}`,
      method: "DELETE",
      format: "json",
      ...params,
    });
  /**
   * @description Get companyUser_notification record <br /><br /> <b>Authentication:</b> not required
   *
   * @tags companyuser_notification
   * @name CompanyuserNotificationDetail
   * @summary Get companyUser_notification record
   * @request GET:/companyuser_notification/{companyuser_notification_id}
   */
  companyuserNotificationDetail = (companyuserNotificationId: string, params: RequestParams = {}) =>
    this.request<CompanyuserNotificationDetailData, void>({
      path: `/companyuser_notification/${companyuserNotificationId}`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * @description Edit companyUser_notification record <br /><br /> <b>Authentication:</b> not required
   *
   * @tags companyuser_notification
   * @name CompanyuserNotificationPartialUpdate
   * @summary Edit companyUser_notification record
   * @request PATCH:/companyuser_notification/{companyuser_notification_id}
   */
  companyuserNotificationPartialUpdate = (
    companyuserNotificationId: string,
    data: CompanyuserNotificationPartialUpdatePayload,
    params: RequestParams = {},
  ) =>
    this.request<CompanyuserNotificationPartialUpdateData, void>({
      path: `/companyuser_notification/${companyuserNotificationId}`,
      method: "PATCH",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Query all companyUser_notification records <br /><br /> <b>Authentication:</b> not required
   *
   * @tags companyuser_notification
   * @name CompanyuserNotificationList
   * @summary Query all companyUser_notification records
   * @request GET:/companyuser_notification
   */
  companyuserNotificationList = (params: RequestParams = {}) =>
    this.request<CompanyuserNotificationListData, void>({
      path: `/companyuser_notification`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * @description Add companyUser_notification record <br /><br /> <b>Authentication:</b> not required
   *
   * @tags companyuser_notification
   * @name CompanyuserNotificationCreate
   * @summary Add companyUser_notification record
   * @request POST:/companyuser_notification
   */
  companyuserNotificationCreate = (data: CompanyuserNotificationCreatePayload, params: RequestParams = {}) =>
    this.request<CompanyuserNotificationCreateData, void>({
      path: `/companyuser_notification`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
}
