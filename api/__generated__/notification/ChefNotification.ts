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
  ByUserDetailResult,
  MarkReadAllPartialUpdateBody,
  MarkReadAllPartialUpdateResult,
  ReadPartialUpdateResult,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class ChefNotification<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description [AUTH-CHEF]自分の通知だけが見られます。 <br /><br /> <b>Authentication:</b> not required
   *
   * @tags chef_notification
   * @name ByUserDetail
   * @summary [AUTH-CHEF]自分の通知だけが見られます。
   * @request GET:/chef_notification/byUser/{user_id}
   */
  byUserDetail = (userId: string, params: RequestParams = {}) =>
    this.request<ByUserDetailResult, void>({
      path: `/chef_notification/byUser/${userId}`,
      method: "GET",
      format: "json",
      ...params,
    });

  byUserDetailQueryArgs = (
    userId: string,
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/chef_notification/byUser/${userId}`] : null;
    const fetcher = () =>
      this.byUserDetail(userId, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description [AUTH-CHEF]自分の通知だけを全て既読にできます。 <br /><br /> <b>Authentication:</b> not required
   *
   * @tags chef_notification
   * @name MarkReadAllPartialUpdate
   * @summary [AUTH-CHEF]自分の通知だけを全て既読にできます。
   * @request PATCH:/chef_notification/mark-read/all
   */
  markReadAllPartialUpdate = (
    data: MarkReadAllPartialUpdateBody,
    params: RequestParams = {},
  ) =>
    this.request<MarkReadAllPartialUpdateResult, void>({
      path: `/chef_notification/mark-read/all`,
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
    const key = enabled ? [`/chef_notification/mark-read/all`] : null;
    const fetcher: (
      url: string[],
      { arg }: { arg: MarkReadAllPartialUpdateBody },
    ) => Promise<MarkReadAllPartialUpdateResult> = (_, { arg }) =>
      this.markReadAllPartialUpdate(arg, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description [AUTH-CHEF]自分の通知だけを既読にできます。 <br /><br /> <b>Authentication:</b> not required
   *
   * @tags chef_notification
   * @name ReadPartialUpdate
   * @summary [AUTH-CHEF]自分の通知だけを既読にできます。
   * @request PATCH:/chef_notification/{chef_notification_id}/read
   */
  readPartialUpdate = (
    chefNotificationId: number,
    params: RequestParams = {},
  ) =>
    this.request<ReadPartialUpdateResult, void>({
      path: `/chef_notification/${chefNotificationId}/read`,
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
      ? [`/chef_notification/${chefNotificationId}/read`]
      : null;
    const fetcher: (url: string[]) => Promise<ReadPartialUpdateResult> = (_) =>
      this.readPartialUpdate(chefNotificationId, params).then(
        (res) => res.data,
      );
    return [key, fetcher] as const;
  };
}
