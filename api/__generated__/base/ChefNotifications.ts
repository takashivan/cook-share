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
  ChefNotificationsCreateData,
  ChefNotificationsCreatePayload,
  ChefNotificationsDetailData,
  ChefNotificationsListData,
  Clone0DeleteData,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class ChefNotifications<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags chef-notifications
   * @name Clone0Delete
   * @request DELETE:/chef-notifications/{chef_notification_id}/clone_0
   */
  clone0Delete = (chefNotificationId: number, params: RequestParams = {}) =>
    this.request<Clone0DeleteData, void>({
      path: `/chef-notifications/${chefNotificationId}/clone_0`,
      method: "DELETE",
      format: "json",
      ...params,
    });
  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags chef-notifications
   * @name ChefNotificationsDetail
   * @request GET:/chef-notifications/{chef_notification_id}
   */
  chefNotificationsDetail = (chefNotificationId: number, params: RequestParams = {}) =>
    this.request<ChefNotificationsDetailData, void>({
      path: `/chef-notifications/${chefNotificationId}`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags chef-notifications
   * @name ChefNotificationsList
   * @request GET:/chef-notifications
   */
  chefNotificationsList = (params: RequestParams = {}) =>
    this.request<ChefNotificationsListData, void>({
      path: `/chef-notifications`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags chef-notifications
   * @name ChefNotificationsCreate
   * @request POST:/chef-notifications
   */
  chefNotificationsCreate = (data: ChefNotificationsCreatePayload, params: RequestParams = {}) =>
    this.request<ChefNotificationsCreateData, void>({
      path: `/chef-notifications`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
}
