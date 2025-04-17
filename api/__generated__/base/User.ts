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
  StripeCreateAccountCreateData,
  StripeCreateAccountCreatePayload,
  StripeCreateAccountLinkCreateData,
  StripeCreateAccountLinkCreatePayload,
  UserCreateData,
  UserCreatePayload,
  UserDeleteData,
  UserDetailData,
  UserListData,
  UserPartialUpdateData,
  UserPartialUpdatePayload,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class User<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags user
   * @name StripeCreateAccountLinkCreate
   * @request POST:/user/stripe/create-account-link
   */
  stripeCreateAccountLinkCreate = (data: StripeCreateAccountLinkCreatePayload, params: RequestParams = {}) =>
    this.request<StripeCreateAccountLinkCreateData, void>({
      path: `/user/stripe/create-account-link`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });

  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags user
   * @name StripeCreateAccountCreate
   * @request POST:/user/stripe/create-account
   */
  stripeCreateAccountCreate = (data: StripeCreateAccountCreatePayload, params: RequestParams = {}) =>
    this.request<StripeCreateAccountCreateData, void>({
      path: `/user/stripe/create-account`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });

  /**
   * @description Delete user record. <br /><br /> <b>Authentication:</b> not required
   *
   * @tags user
   * @name UserDelete
   * @summary Delete user record.
   * @request DELETE:/user/{user_id}
   */
  userDelete = (userId: string, params: RequestParams = {}) =>
    this.request<UserDeleteData, void>({
      path: `/user/${userId}`,
      method: "DELETE",
      format: "json",
      ...params,
    });

  /**
   * @description Get user record <br /><br /> <b>Authentication:</b> not required
   *
   * @tags user
   * @name UserDetail
   * @summary Get user record
   * @request GET:/user/{user_id}
   */
  userDetail = (userId: string, params: RequestParams = {}) =>
    this.request<UserDetailData, void>({
      path: `/user/${userId}`,
      method: "GET",
      format: "json",
      ...params,
    });

  userDetailQueryArgs = (userId: string, params: RequestParams = {}, enabled: boolean = true) => {
    const key = enabled ? [`/user/${userId}`] : null;
    const fetcher = () => this.userDetail(userId, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description Edit user record <br /><br /> <b>Authentication:</b> not required
   *
   * @tags user
   * @name UserPartialUpdate
   * @summary Edit user record
   * @request PATCH:/user/{user_id}
   */
  userPartialUpdate = (userId: string, data: UserPartialUpdatePayload, params: RequestParams = {}) =>
    this.request<UserPartialUpdateData, void>({
      path: `/user/${userId}`,
      method: "PATCH",
      body: data,
      type: ContentType.FormData,
      format: "json",
      ...params,
    });

  /**
   * @description Query all user records <br /><br /> <b>Authentication:</b> not required
   *
   * @tags user
   * @name UserList
   * @summary Query all user records
   * @request GET:/user
   */
  userList = (params: RequestParams = {}) =>
    this.request<UserListData, void>({
      path: `/user`,
      method: "GET",
      format: "json",
      ...params,
    });

  userListQueryArgs = (params: RequestParams = {}, enabled: boolean = true) => {
    const key = enabled ? [`/user`] : null;
    const fetcher = () => this.userList(params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description Add user record <br /><br /> <b>Authentication:</b> not required
   *
   * @tags user
   * @name UserCreate
   * @summary Add user record
   * @request POST:/user
   */
  userCreate = (data: UserCreatePayload, params: RequestParams = {}) =>
    this.request<UserCreateData, void>({
      path: `/user`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
}
