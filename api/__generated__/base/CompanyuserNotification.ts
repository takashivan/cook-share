/* eslint-disable */
/* tslint:disable */
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
  ByUserDetailOutput,
  CompanyuserNotificationCreateData,
  CompanyuserNotificationCreatePayload,
  CompanyuserNotificationDeleteData,
  CompanyuserNotificationDetailData,
  CompanyuserNotificationListData,
  CompanyuserNotificationPartialUpdateData,
  CompanyuserNotificationPartialUpdatePayload,
  MarkReadAllPartialUpdateData,
  MarkReadAllPartialUpdatePayload,
  MarkReadPartialUpdateData,
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
  byRestaurantCreate = (restaurantId: number, params: RequestParams = {}) =>
    this.request<ByRestaurantCreateData, void>({
      path: `/companyuser_notification/byRestaurant/${restaurantId}`,
      method: "POST",
      format: "json",
      ...params,
    });

  byRestaurantCreateQueryArgs = (restaurantId: number, params: RequestParams = {}, enabled: boolean = true) => {
    const key = enabled ? [`/companyuser_notification/byRestaurant/${restaurantId}`] : null;
    const fetcher: (url: string[]) => Promise<ByRestaurantCreateData> = (_) =>
      this.byRestaurantCreate(restaurantId, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

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

  byUserDetailQueryArgs = (userId: string, params: RequestParams = {}, enabled: boolean = true) => {
    const key = enabled ? [`/companyuser_notification/byUser/${userId}`] : null;
    const fetcher = () => this.byUserDetail(userId, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags companyuser_notification
   * @name MarkReadAllPartialUpdate
   * @request PATCH:/companyuser_notification/mark-read/all
   */
  markReadAllPartialUpdate = (data: MarkReadAllPartialUpdatePayload, params: RequestParams = {}) =>
    this.request<MarkReadAllPartialUpdateData, void>({
      path: `/companyuser_notification/mark-read/all`,
      method: "PATCH",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });

  markReadAllPartialUpdateQueryArgs = (params: RequestParams = {}, enabled: boolean = true) => {
    const key = enabled ? [`/companyuser_notification/mark-read/all`] : null;
    const fetcher: (
      url: string[],
      { arg }: { arg: MarkReadAllPartialUpdatePayload },
    ) => Promise<MarkReadAllPartialUpdateData> = (_, { arg }) =>
      this.markReadAllPartialUpdate(arg, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

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

  companyuserNotificationDeleteQueryArgs = (
    companyuserNotificationId: string,
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/companyuser_notification/${companyuserNotificationId}`] : null;
    const fetcher = () => this.companyuserNotificationDelete(companyuserNotificationId, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

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

  companyuserNotificationDetailQueryArgs = (
    companyuserNotificationId: string,
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/companyuser_notification/${companyuserNotificationId}`] : null;
    const fetcher = () => this.companyuserNotificationDetail(companyuserNotificationId, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

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

  companyuserNotificationPartialUpdateQueryArgs = (
    companyuserNotificationId: string,
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/companyuser_notification/${companyuserNotificationId}`] : null;
    const fetcher: (
      url: string[],
      { arg }: { arg: CompanyuserNotificationPartialUpdatePayload },
    ) => Promise<CompanyuserNotificationPartialUpdateData> = (_, { arg }) =>
      this.companyuserNotificationPartialUpdate(companyuserNotificationId, arg, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags companyuser_notification
   * @name MarkReadPartialUpdate
   * @request PATCH:/companyuser_notification/{id}/mark-read
   */
  markReadPartialUpdate = (id: string, params: RequestParams = {}) =>
    this.request<MarkReadPartialUpdateData, void>({
      path: `/companyuser_notification/${id}/mark-read`,
      method: "PATCH",
      format: "json",
      ...params,
    });

  markReadPartialUpdateQueryArgs = (id: string, params: RequestParams = {}, enabled: boolean = true) => {
    const key = enabled ? [`/companyuser_notification/${id}/mark-read`] : null;
    const fetcher: (url: string[]) => Promise<MarkReadPartialUpdateData> = (_) =>
      this.markReadPartialUpdate(id, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

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

  companyuserNotificationListQueryArgs = (params: RequestParams = {}, enabled: boolean = true) => {
    const key = enabled ? [`/companyuser_notification`] : null;
    const fetcher = () => this.companyuserNotificationList(params).then((res) => res.data);
    return [key, fetcher] as const;
  };

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

  companyuserNotificationCreateQueryArgs = (params: RequestParams = {}, enabled: boolean = true) => {
    const key = enabled ? [`/companyuser_notification`] : null;
    const fetcher: (
      url: string[],
      { arg }: { arg: CompanyuserNotificationCreatePayload },
    ) => Promise<CompanyuserNotificationCreateData> = (_, { arg }) =>
      this.companyuserNotificationCreate(arg, params).then((res) => res.data);
    return [key, fetcher] as const;
  };
}
