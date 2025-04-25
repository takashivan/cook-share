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
  CompanyuserNotificationsCreateData,
  CompanyuserNotificationsCreatePayload,
  CompanyuserNotificationsDeleteData,
  CompanyuserNotificationsDetailData,
  CompanyuserNotificationsListData,
  CompanyuserNotificationsPartialUpdateData,
  CompanyuserNotificationsPartialUpdatePayload,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class CompanyuserNotifications<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * @description Delete companyUser_notification record. <br /><br /> <b>Authentication:</b> not required
   *
   * @tags companyuser-notifications
   * @name CompanyuserNotificationsDelete
   * @summary Delete companyUser_notification record.
   * @request DELETE:/companyuser-notifications/{companyuser_notification_id}
   */
  companyuserNotificationsDelete = (companyuserNotificationId: string, params: RequestParams = {}) =>
    this.request<CompanyuserNotificationsDeleteData, void>({
      path: `/companyuser-notifications/${companyuserNotificationId}`,
      method: "DELETE",
      format: "json",
      ...params,
    });

  companyuserNotificationsDeleteQueryArgs = (
    companyuserNotificationId: string,
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/companyuser-notifications/${companyuserNotificationId}`] : null;
    const fetcher = () =>
      this.companyuserNotificationsDelete(companyuserNotificationId, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description Get companyUser_notification record <br /><br /> <b>Authentication:</b> not required
   *
   * @tags companyuser-notifications
   * @name CompanyuserNotificationsDetail
   * @summary Get companyUser_notification record
   * @request GET:/companyuser-notifications/{companyuser_notification_id}
   */
  companyuserNotificationsDetail = (companyuserNotificationId: string, params: RequestParams = {}) =>
    this.request<CompanyuserNotificationsDetailData, void>({
      path: `/companyuser-notifications/${companyuserNotificationId}`,
      method: "GET",
      format: "json",
      ...params,
    });

  companyuserNotificationsDetailQueryArgs = (
    companyuserNotificationId: string,
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/companyuser-notifications/${companyuserNotificationId}`] : null;
    const fetcher = () =>
      this.companyuserNotificationsDetail(companyuserNotificationId, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description Edit companyUser_notification record <br /><br /> <b>Authentication:</b> not required
   *
   * @tags companyuser-notifications
   * @name CompanyuserNotificationsPartialUpdate
   * @summary Edit companyUser_notification record
   * @request PATCH:/companyuser-notifications/{companyuser_notification_id}
   */
  companyuserNotificationsPartialUpdate = (
    companyuserNotificationId: string,
    data: CompanyuserNotificationsPartialUpdatePayload,
    params: RequestParams = {},
  ) =>
    this.request<CompanyuserNotificationsPartialUpdateData, void>({
      path: `/companyuser-notifications/${companyuserNotificationId}`,
      method: "PATCH",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });

  companyuserNotificationsPartialUpdateQueryArgs = (
    companyuserNotificationId: string,
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/companyuser-notifications/${companyuserNotificationId}`] : null;
    const fetcher: (
      url: string[],
      { arg }: { arg: CompanyuserNotificationsPartialUpdatePayload },
    ) => Promise<CompanyuserNotificationsPartialUpdateData> = (_, { arg }) =>
      this.companyuserNotificationsPartialUpdate(companyuserNotificationId, arg, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description Query all companyUser_notification records <br /><br /> <b>Authentication:</b> not required
   *
   * @tags companyuser-notifications
   * @name CompanyuserNotificationsList
   * @summary Query all companyUser_notification records
   * @request GET:/companyuser-notifications
   */
  companyuserNotificationsList = (params: RequestParams = {}) =>
    this.request<CompanyuserNotificationsListData, void>({
      path: `/companyuser-notifications`,
      method: "GET",
      format: "json",
      ...params,
    });

  companyuserNotificationsListQueryArgs = (params: RequestParams = {}, enabled: boolean = true) => {
    const key = enabled ? [`/companyuser-notifications`] : null;
    const fetcher = () => this.companyuserNotificationsList(params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description Add companyUser_notification record <br /><br /> <b>Authentication:</b> not required
   *
   * @tags companyuser-notifications
   * @name CompanyuserNotificationsCreate
   * @summary Add companyUser_notification record
   * @request POST:/companyuser-notifications
   */
  companyuserNotificationsCreate = (data: CompanyuserNotificationsCreatePayload, params: RequestParams = {}) =>
    this.request<CompanyuserNotificationsCreateData, void>({
      path: `/companyuser-notifications`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });

  companyuserNotificationsCreateQueryArgs = (params: RequestParams = {}, enabled: boolean = true) => {
    const key = enabled ? [`/companyuser-notifications`] : null;
    const fetcher: (
      url: string[],
      { arg }: { arg: CompanyuserNotificationsCreatePayload },
    ) => Promise<CompanyuserNotificationsCreateData> = (_, { arg }) =>
      this.companyuserNotificationsCreate(arg, params).then((res) => res.data);
    return [key, fetcher] as const;
  };
}
