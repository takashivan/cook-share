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
  ByUserDetailData,
  ChefNotificationCreateData,
  ChefNotificationCreatePayload,
  ChefNotificationDeleteData,
  ChefNotificationDetailData,
  ChefNotificationListData,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class ChefNotification<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags chef_notification
   * @name ByUserDetail
   * @request GET:/chef_notification/byUser/{user_id}
   */
  byUserDetail = (userId: string, params: RequestParams = {}) =>
    this.request<ByUserDetailData, void>({
      path: `/chef_notification/byUser/${userId}`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags chef_notification
   * @name ChefNotificationDelete
   * @request DELETE:/chef_notification/{chef_notification_id}
   */
  chefNotificationDelete = (chefNotificationId: number, params: RequestParams = {}) =>
    this.request<ChefNotificationDeleteData, void>({
      path: `/chef_notification/${chefNotificationId}`,
      method: "DELETE",
      format: "json",
      ...params,
    });
  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags chef_notification
   * @name ChefNotificationDetail
   * @request GET:/chef_notification/{chef_notification_id}
   */
  chefNotificationDetail = (chefNotificationId: number, params: RequestParams = {}) =>
    this.request<ChefNotificationDetailData, void>({
      path: `/chef_notification/${chefNotificationId}`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags chef_notification
   * @name ChefNotificationList
   * @request GET:/chef_notification
   */
  chefNotificationList = (params: RequestParams = {}) =>
    this.request<ChefNotificationListData, void>({
      path: `/chef_notification`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags chef_notification
   * @name ChefNotificationCreate
   * @request POST:/chef_notification
   */
  chefNotificationCreate = (data: ChefNotificationCreatePayload, params: RequestParams = {}) =>
    this.request<ChefNotificationCreateData, void>({
      path: `/chef_notification`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
}
