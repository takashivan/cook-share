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
  EmailChangeCreateData,
  EmailChangeCreatePayload,
  EmailConfirmCreateData,
  EmailConfirmCreatePayload,
  ProfilePartialUpdateData,
  ProfilePartialUpdatePayload,
  SessionHistoryCurrentListData,
  StripeAccountCheckCreateData,
  StripeAccountCheckCreatePayload,
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

export class User<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description <br /><br /> <b>Authentication:</b> required
   *
   * @tags user
   * @name EmailChangeCreate
   * @request POST:/user/email/change
   * @secure
   */
  emailChangeCreate = (
    data: EmailChangeCreatePayload,
    params: RequestParams = {},
  ) =>
    this.request<EmailChangeCreateData, void>({
      path: `/user/email/change`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });

  emailChangeCreateQueryArgs = (
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/user/email/change`] : null;
    const fetcher: (
      url: string[],
      { arg }: { arg: EmailChangeCreatePayload },
    ) => Promise<EmailChangeCreateData> = (_, { arg }) =>
      this.emailChangeCreate(arg, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description <br /><br /> <b>Authentication:</b> required
   *
   * @tags user
   * @name EmailConfirmCreate
   * @request POST:/user/email/confirm
   * @secure
   */
  emailConfirmCreate = (
    data: EmailConfirmCreatePayload,
    params: RequestParams = {},
  ) =>
    this.request<EmailConfirmCreateData, void>({
      path: `/user/email/confirm`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });

  emailConfirmCreateQueryArgs = (
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/user/email/confirm`] : null;
    const fetcher: (
      url: string[],
      { arg }: { arg: EmailConfirmCreatePayload },
    ) => Promise<EmailConfirmCreateData> = (_, { arg }) =>
      this.emailConfirmCreate(arg, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags user
   * @name StripeAccountCheckCreate
   * @request POST:/user/stripe/account-check
   */
  stripeAccountCheckCreate = (
    data: StripeAccountCheckCreatePayload,
    params: RequestParams = {},
  ) =>
    this.request<StripeAccountCheckCreateData, void>({
      path: `/user/stripe/account-check`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });

  stripeAccountCheckCreateQueryArgs = (
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/user/stripe/account-check`] : null;
    const fetcher: (
      url: string[],
      { arg }: { arg: StripeAccountCheckCreatePayload },
    ) => Promise<StripeAccountCheckCreateData> = (_, { arg }) =>
      this.stripeAccountCheckCreate(arg, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags user
   * @name StripeCreateAccountLinkCreate
   * @request POST:/user/stripe/create-account-link
   */
  stripeCreateAccountLinkCreate = (
    data: StripeCreateAccountLinkCreatePayload,
    params: RequestParams = {},
  ) =>
    this.request<StripeCreateAccountLinkCreateData, void>({
      path: `/user/stripe/create-account-link`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });

  stripeCreateAccountLinkCreateQueryArgs = (
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/user/stripe/create-account-link`] : null;
    const fetcher: (
      url: string[],
      { arg }: { arg: StripeCreateAccountLinkCreatePayload },
    ) => Promise<StripeCreateAccountLinkCreateData> = (_, { arg }) =>
      this.stripeCreateAccountLinkCreate(arg, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags user
   * @name StripeCreateAccountCreate
   * @request POST:/user/stripe/create-account
   */
  stripeCreateAccountCreate = (
    data: StripeCreateAccountCreatePayload,
    params: RequestParams = {},
  ) =>
    this.request<StripeCreateAccountCreateData, void>({
      path: `/user/stripe/create-account`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });

  stripeCreateAccountCreateQueryArgs = (
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/user/stripe/create-account`] : null;
    const fetcher: (
      url: string[],
      { arg }: { arg: StripeCreateAccountCreatePayload },
    ) => Promise<StripeCreateAccountCreateData> = (_, { arg }) =>
      this.stripeCreateAccountCreate(arg, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description Edit user record <br /><br /> <b>Authentication:</b> not required
   *
   * @tags user
   * @name ProfilePartialUpdate
   * @summary Edit user record
   * @request PATCH:/user/{user_id}/profile
   */
  profilePartialUpdate = (
    userId: string,
    data: ProfilePartialUpdatePayload,
    params: RequestParams = {},
  ) =>
    this.request<ProfilePartialUpdateData, void>({
      path: `/user/${userId}/profile`,
      method: "PATCH",
      body: data,
      type: ContentType.FormData,
      format: "json",
      ...params,
    });

  profilePartialUpdateQueryArgs = (
    userId: string,
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/user/${userId}/profile`] : null;
    const fetcher: (
      url: string[],
      { arg }: { arg: ProfilePartialUpdatePayload },
    ) => Promise<ProfilePartialUpdateData> = (_, { arg }) =>
      this.profilePartialUpdate(userId, arg, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags user
   * @name SessionHistoryCurrentList
   * @request GET:/user/{user_id}/sessionHistory/current
   */
  sessionHistoryCurrentList = (userId: string, params: RequestParams = {}) =>
    this.request<SessionHistoryCurrentListData, void>({
      path: `/user/${userId}/sessionHistory/current`,
      method: "GET",
      format: "json",
      ...params,
    });

  sessionHistoryCurrentListQueryArgs = (
    userId: string,
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/user/${userId}/sessionHistory/current`] : null;
    const fetcher = () =>
      this.sessionHistoryCurrentList(userId, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

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

  userDeleteQueryArgs = (
    userId: string,
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/user/${userId}`] : null;
    const fetcher = () =>
      this.userDelete(userId, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

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

  userDetailQueryArgs = (
    userId: string,
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/user/${userId}`] : null;
    const fetcher = () =>
      this.userDetail(userId, params).then((res) => res.data);
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
  userPartialUpdate = (
    userId: string,
    data: UserPartialUpdatePayload,
    params: RequestParams = {},
  ) =>
    this.request<UserPartialUpdateData, void>({
      path: `/user/${userId}`,
      method: "PATCH",
      body: data,
      type: ContentType.FormData,
      format: "json",
      ...params,
    });

  userPartialUpdateQueryArgs = (
    userId: string,
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/user/${userId}`] : null;
    const fetcher: (
      url: string[],
      { arg }: { arg: UserPartialUpdatePayload },
    ) => Promise<UserPartialUpdateData> = (_, { arg }) =>
      this.userPartialUpdate(userId, arg, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

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

  userCreateQueryArgs = (
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/user`] : null;
    const fetcher: (
      url: string[],
      { arg }: { arg: UserCreatePayload },
    ) => Promise<UserCreateData> = (_, { arg }) =>
      this.userCreate(arg, params).then((res) => res.data);
    return [key, fetcher] as const;
  };
}
