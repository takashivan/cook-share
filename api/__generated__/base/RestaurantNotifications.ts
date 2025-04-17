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
  RestaurantNotificationsCreateData,
  RestaurantNotificationsCreatePayload,
  RestaurantNotificationsDeleteData,
  RestaurantNotificationsDetailData,
  RestaurantNotificationsListData,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class RestaurantNotifications<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags restaurant-notifications
   * @name RestaurantNotificationsDelete
   * @request DELETE:/restaurant-notifications/{restaurant_notification_id}
   */
  restaurantNotificationsDelete = (restaurantNotificationId: number, params: RequestParams = {}) =>
    this.request<RestaurantNotificationsDeleteData, void>({
      path: `/restaurant-notifications/${restaurantNotificationId}`,
      method: "DELETE",
      format: "json",
      ...params,
    });

  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags restaurant-notifications
   * @name RestaurantNotificationsDetail
   * @request GET:/restaurant-notifications/{restaurant_notification_id}
   */
  restaurantNotificationsDetail = (restaurantNotificationId: number, params: RequestParams = {}) =>
    this.request<RestaurantNotificationsDetailData, void>({
      path: `/restaurant-notifications/${restaurantNotificationId}`,
      method: "GET",
      format: "json",
      ...params,
    });

  restaurantNotificationsDetailQueryArgs = (
    restaurantNotificationId: number,
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/restaurant-notifications/${restaurantNotificationId}`] : null;
    const fetcher = () => this.restaurantNotificationsDetail(restaurantNotificationId, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags restaurant-notifications
   * @name RestaurantNotificationsList
   * @request GET:/restaurant-notifications
   */
  restaurantNotificationsList = (params: RequestParams = {}) =>
    this.request<RestaurantNotificationsListData, void>({
      path: `/restaurant-notifications`,
      method: "GET",
      format: "json",
      ...params,
    });

  restaurantNotificationsListQueryArgs = (params: RequestParams = {}, enabled: boolean = true) => {
    const key = enabled ? [`/restaurant-notifications`] : null;
    const fetcher = () => this.restaurantNotificationsList(params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags restaurant-notifications
   * @name RestaurantNotificationsCreate
   * @request POST:/restaurant-notifications
   */
  restaurantNotificationsCreate = (data: RestaurantNotificationsCreatePayload, params: RequestParams = {}) =>
    this.request<RestaurantNotificationsCreateData, void>({
      path: `/restaurant-notifications`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
}
