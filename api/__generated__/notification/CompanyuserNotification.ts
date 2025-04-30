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
  ByUserDetailOutput1,
  MarkReadAllPartialUpdateBody1,
  MarkReadAllPartialUpdateOutput1,
  MarkReadPartialUpdateResult,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class CompanyuserNotification<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description [AUTH-CompanyUser] 自分の通知だけ見られます。 <br /><br /> <b>Authentication:</b> not required
   *
   * @tags companyuser_notification
   * @name ByUserDetail
   * @summary [AUTH-CompanyUser] 自分の通知だけ見られます。
   * @request GET:/companyuser_notification/byUser/{user_id}
   */
  byUserDetail = (userId: string, params: RequestParams = {}) =>
    this.request<ByUserDetailOutput1, void>({
      path: `/companyuser_notification/byUser/${userId}`,
      method: "GET",
      format: "json",
      ...params,
    });

  byUserDetailQueryArgs = (
    userId: string,
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/companyuser_notification/byUser/${userId}`] : null;
    const fetcher = () =>
      this.byUserDetail(userId, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description [AUTH-CompanyUser]自分の通知だけを全て既読にできます。 <br /><br /> <b>Authentication:</b> not required
   *
   * @tags companyuser_notification
   * @name MarkReadAllPartialUpdate
   * @summary [AUTH-CompanyUser]自分の通知だけを全て既読にできます。
   * @request PATCH:/companyuser_notification/mark-read/all
   */
  markReadAllPartialUpdate = (
    data: MarkReadAllPartialUpdateBody1,
    params: RequestParams = {},
  ) =>
    this.request<MarkReadAllPartialUpdateOutput1, void>({
      path: `/companyuser_notification/mark-read/all`,
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
    const key = enabled ? [`/companyuser_notification/mark-read/all`] : null;
    const fetcher: (
      url: string[],
      { arg }: { arg: MarkReadAllPartialUpdateBody1 },
    ) => Promise<MarkReadAllPartialUpdateOutput1> = (_, { arg }) =>
      this.markReadAllPartialUpdate(arg, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description [AUTH-CompanyUser]自分の通知だけを既読にできます。 <br /><br /> <b>Authentication:</b> not required
   *
   * @tags companyuser_notification
   * @name MarkReadPartialUpdate
   * @summary [AUTH-CompanyUser]自分の通知だけを既読にできます。
   * @request PATCH:/companyuser_notification/{id}/mark-read
   */
  markReadPartialUpdate = (id: string, params: RequestParams = {}) =>
    this.request<MarkReadPartialUpdateResult, void>({
      path: `/companyuser_notification/${id}/mark-read`,
      method: "PATCH",
      format: "json",
      ...params,
    });

  markReadPartialUpdateQueryArgs = (
    id: string,
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/companyuser_notification/${id}/mark-read`] : null;
    const fetcher: (url: string[]) => Promise<MarkReadPartialUpdateResult> = (
      _,
    ) => this.markReadPartialUpdate(id, params).then((res) => res.data);
    return [key, fetcher] as const;
  };
}
