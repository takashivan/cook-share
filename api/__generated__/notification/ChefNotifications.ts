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
  MarkReadAllPartialUpdateData,
  MarkReadAllPartialUpdatePayload,
  ReadPartialUpdateData,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class ChefNotifications<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description [AUTH-CHEF]自分の通知だけが見られます。 <br /><br /> <b>Authentication:</b> not required
   *
   * @tags chef-notifications
   * @name ByUserDetail
   * @summary [AUTH-CHEF]自分の通知だけが見られます。
   * @request GET:/chef-notifications/byUser/{user_id}
   */
  byUserDetail = (userId: string, params: RequestParams = {}) =>
    this.request<ByUserDetailData, void>({
      path: `/chef-notifications/byUser/${userId}`,
      method: "GET",
      format: "json",
      ...params,
    });

  byUserDetailQueryArgs = (
    userId: string,
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/chef-notifications/byUser/${userId}`] : null;
    const fetcher = () =>
      this.byUserDetail(userId, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description [AUTH-CHEF]自分の通知だけを全て既読にできます。 <br /><br /> <b>Authentication:</b> not required
   *
   * @tags chef-notifications
   * @name MarkReadAllPartialUpdate
   * @summary [AUTH-CHEF]自分の通知だけを全て既読にできます。
   * @request PATCH:/chef-notifications/mark-read/all
   */
  markReadAllPartialUpdate = (
    data: MarkReadAllPartialUpdatePayload,
    params: RequestParams = {},
  ) =>
    this.request<MarkReadAllPartialUpdateData, void>({
      path: `/chef-notifications/mark-read/all`,
      method: "PATCH",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });

  markReadAllPartialUpdateQueryArgs = (
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/chef-notifications/mark-read/all`] : null;
    const fetcher: (
      url: string[],
      { arg }: { arg: MarkReadAllPartialUpdatePayload },
    ) => Promise<MarkReadAllPartialUpdateData> = (_, { arg }) =>
      this.markReadAllPartialUpdate(arg, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description [AUTH-CHEF]自分の通知だけを既読にできます。 <br /><br /> <b>Authentication:</b> not required
   *
   * @tags chef-notifications
   * @name ReadPartialUpdate
   * @summary [AUTH-CHEF]自分の通知だけを既読にできます。
   * @request PATCH:/chef-notifications/{chef_notification_id}/read
   */
  readPartialUpdate = (
    chefNotificationId: number,
    params: RequestParams = {},
  ) =>
    this.request<ReadPartialUpdateData, void>({
      path: `/chef-notifications/${chefNotificationId}/read`,
      method: "PATCH",
      format: "json",
      ...params,
    });

  readPartialUpdateQueryArgs = (
    chefNotificationId: number,
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled
      ? [`/chef-notifications/${chefNotificationId}/read`]
      : null;
    const fetcher: (url: string[]) => Promise<ReadPartialUpdateData> = (_) =>
      this.readPartialUpdate(chefNotificationId, params).then(
        (res) => res.data,
      );
    return [key, fetcher] as const;
  };
}
