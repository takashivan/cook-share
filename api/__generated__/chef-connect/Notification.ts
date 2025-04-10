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
  NotificationCreateData,
  NotificationCreatePayload,
  NotificationDeleteData,
  NotificationDetailData,
  NotificationListData,
  NotificationPartialUpdateData,
  NotificationPartialUpdatePayload,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Notification<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * @description Delete notification record. <br /><br /> <b>Authentication:</b> not required
   *
   * @tags notification
   * @name NotificationDelete
   * @summary Delete notification record.
   * @request DELETE:/notification/{notification_id}
   */
  notificationDelete = (notificationId: number, params: RequestParams = {}) =>
    this.request<NotificationDeleteData, void>({
      path: `/notification/${notificationId}`,
      method: "DELETE",
      format: "json",
      ...params,
    });
  /**
   * @description Get notification record <br /><br /> <b>Authentication:</b> not required
   *
   * @tags notification
   * @name NotificationDetail
   * @summary Get notification record
   * @request GET:/notification/{notification_id}
   */
  notificationDetail = (notificationId: number, params: RequestParams = {}) =>
    this.request<NotificationDetailData, void>({
      path: `/notification/${notificationId}`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * @description Edit notification record <br /><br /> <b>Authentication:</b> not required
   *
   * @tags notification
   * @name NotificationPartialUpdate
   * @summary Edit notification record
   * @request PATCH:/notification/{notification_id}
   */
  notificationPartialUpdate = (
    notificationId: number,
    data: NotificationPartialUpdatePayload,
    params: RequestParams = {},
  ) =>
    this.request<NotificationPartialUpdateData, void>({
      path: `/notification/${notificationId}`,
      method: "PATCH",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Query all notification records <br /><br /> <b>Authentication:</b> not required
   *
   * @tags notification
   * @name NotificationList
   * @summary Query all notification records
   * @request GET:/notification
   */
  notificationList = (params: RequestParams = {}) =>
    this.request<NotificationListData, void>({
      path: `/notification`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * @description Add notification record <br /><br /> <b>Authentication:</b> not required
   *
   * @tags notification
   * @name NotificationCreate
   * @summary Add notification record
   * @request POST:/notification
   */
  notificationCreate = (data: NotificationCreatePayload, params: RequestParams = {}) =>
    this.request<NotificationCreateData, void>({
      path: `/notification`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
}
