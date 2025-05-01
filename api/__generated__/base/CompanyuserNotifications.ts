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
  ByUserDetailOutput,
  MarkReadAllPartialUpdateBody,
  MarkReadAllPartialUpdateResult,
  MarkReadPartialUpdateData,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class CompanyuserNotifications<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description [AUTH-CompanyUser] 自分の通知だけ見られます。 <br /><br /> <b>Authentication:</b> not required
   *
   * @tags companyuser-notifications
   * @name ByUserDetail
   * @summary [AUTH-CompanyUser] 自分の通知だけ見られます。
   * @request GET:/companyuser-notifications/byUser/{user_id}
   */
  byUserDetail = (userId: string, params: RequestParams = {}) =>
    this.request<ByUserDetailOutput, void>({
      path: `/companyuser-notifications/byUser/${userId}`,
      method: "GET",
      format: "json",
      ...params,
    });

  byUserDetailQueryArgs = (
    userId: string,
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled
      ? [`/companyuser-notifications/byUser/${userId}`]
      : null;
    const fetcher = () =>
      this.byUserDetail(userId, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description [AUTH-CompanyUser]自分の通知だけを全て既読にできます。 <br /><br /> <b>Authentication:</b> not required
   *
   * @tags companyuser-notifications
   * @name MarkReadAllPartialUpdate
   * @summary [AUTH-CompanyUser]自分の通知だけを全て既読にできます。
   * @request PATCH:/companyuser-notifications/mark-read/all
   */
  markReadAllPartialUpdate = (
    data: MarkReadAllPartialUpdateBody,
    params: RequestParams = {},
  ) =>
    this.request<MarkReadAllPartialUpdateResult, void>({
      path: `/companyuser-notifications/mark-read/all`,
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
    const key = enabled ? [`/companyuser-notifications/mark-read/all`] : null;
    const fetcher: (
      url: string[],
      { arg }: { arg: MarkReadAllPartialUpdateBody },
    ) => Promise<MarkReadAllPartialUpdateResult> = (_, { arg }) =>
      this.markReadAllPartialUpdate(arg, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description [AUTH-CompanyUser]自分の通知だけを既読にできます。 <br /><br /> <b>Authentication:</b> not required
   *
   * @tags companyuser-notifications
   * @name MarkReadPartialUpdate
   * @summary [AUTH-CompanyUser]自分の通知だけを既読にできます。
   * @request PATCH:/companyuser-notifications/{id}/mark-read
   */
  markReadPartialUpdate = (id: string, params: RequestParams = {}) =>
    this.request<MarkReadPartialUpdateData, void>({
      path: `/companyuser-notifications/${id}/mark-read`,
      method: "PATCH",
      format: "json",
      ...params,
    });

  markReadPartialUpdateQueryArgs = (
    id: string,
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/companyuser-notifications/${id}/mark-read`] : null;
    const fetcher: (url: string[]) => Promise<MarkReadPartialUpdateData> = (
      _,
    ) => this.markReadPartialUpdate(id, params).then((res) => res.data);
    return [key, fetcher] as const;
  };
}
