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
  RestaurantNotificationCreateData,
  RestaurantNotificationCreatePayload,
  RestaurantNotificationDeleteData,
  RestaurantNotificationDetailData,
  RestaurantNotificationListData,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class RestaurantNotification<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags restaurant_notification
   * @name RestaurantNotificationDelete
   * @request DELETE:/restaurant_notification/{restaurant_notification_id}
   */
  restaurantNotificationDelete = (restaurantNotificationId: number, params: RequestParams = {}) =>
    this.request<RestaurantNotificationDeleteData, void>({
      path: `/restaurant_notification/${restaurantNotificationId}`,
      method: "DELETE",
      format: "json",
      ...params,
    });

  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags restaurant_notification
   * @name RestaurantNotificationDetail
   * @request GET:/restaurant_notification/{restaurant_notification_id}
   */
  restaurantNotificationDetail = (restaurantNotificationId: number, params: RequestParams = {}) =>
    this.request<RestaurantNotificationDetailData, void>({
      path: `/restaurant_notification/${restaurantNotificationId}`,
      method: "GET",
      format: "json",
      ...params,
    });

  restaurantNotificationDetailQueryArgs = (
    restaurantNotificationId: number,
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/restaurant_notification/${restaurantNotificationId}`] : null;
    const fetcher = () => this.restaurantNotificationDetail(restaurantNotificationId, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags restaurant_notification
   * @name RestaurantNotificationList
   * @request GET:/restaurant_notification
   */
  restaurantNotificationList = (params: RequestParams = {}) =>
    this.request<RestaurantNotificationListData, void>({
      path: `/restaurant_notification`,
      method: "GET",
      format: "json",
      ...params,
    });

  restaurantNotificationListQueryArgs = (params: RequestParams = {}, enabled: boolean = true) => {
    const key = enabled ? [`/restaurant_notification`] : null;
    const fetcher = () => this.restaurantNotificationList(params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags restaurant_notification
   * @name RestaurantNotificationCreate
   * @request POST:/restaurant_notification
   */
  restaurantNotificationCreate = (data: RestaurantNotificationCreatePayload, params: RequestParams = {}) =>
    this.request<RestaurantNotificationCreateData, void>({
      path: `/restaurant_notification`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
}
