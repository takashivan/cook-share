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
  ApplicationsListOutput,
  ChefNotificationsListParams1,
  ChefNotificationsListResult,
  ChefReviewsListOutput,
  RestaurantReviewsListOutput,
  StripeAccountCreateData,
  StripeAccountLinksCreateData,
  UsersCreateData,
  UsersCreatePayload,
  UsersDeleteData,
  UsersDetailData,
  UsersListData,
  UsersPartialUpdateData,
  UsersPartialUpdatePayload,
  WorksessionsListResult,
  WorksessionsUserTodosListData,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Users<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags users
   * @name ChefNotificationsList
   * @request GET:/users/{userId}/chef-notifications
   */
  chefNotificationsList = (
    { userId, ...query }: ChefNotificationsListParams1,
    params: RequestParams = {},
  ) =>
    this.request<ChefNotificationsListResult, void>({
      path: `/users/${userId}/chef-notifications`,
      method: "GET",
      query: query,
      format: "json",
      ...params,
    });

  chefNotificationsListQueryArgs = (
    { userId, ...query }: ChefNotificationsListParams1,
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled
      ? [`/users/${userId}/chef-notifications`, ...(query ? [query] : [])]
      : null;
    const fetcher = () =>
      this.chefNotificationsList({ userId, ...query }, params).then(
        (res) => res.data,
      );
    return [key, fetcher] as const;
  };

  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags users
   * @name ApplicationsList
   * @request GET:/users/{user_id}/applications
   */
  applicationsList = (userId: string, params: RequestParams = {}) =>
    this.request<ApplicationsListOutput, void>({
      path: `/users/${userId}/applications`,
      method: "GET",
      format: "json",
      ...params,
    });

  applicationsListQueryArgs = (
    userId: string,
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/users/${userId}/applications`] : null;
    const fetcher = () =>
      this.applicationsList(userId, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags users
   * @name ChefReviewsList
   * @request GET:/users/{user_id}/chef-reviews
   */
  chefReviewsList = (userId: string, params: RequestParams = {}) =>
    this.request<ChefReviewsListOutput, void>({
      path: `/users/${userId}/chef-reviews`,
      method: "GET",
      format: "json",
      ...params,
    });

  chefReviewsListQueryArgs = (
    userId: string,
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/users/${userId}/chef-reviews`] : null;
    const fetcher = () =>
      this.chefReviewsList(userId, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags users
   * @name RestaurantReviewsList
   * @request GET:/users/{user_id}/restaurant-reviews
   */
  restaurantReviewsList = (userId: string, params: RequestParams = {}) =>
    this.request<RestaurantReviewsListOutput, void>({
      path: `/users/${userId}/restaurant-reviews`,
      method: "GET",
      format: "json",
      ...params,
    });

  restaurantReviewsListQueryArgs = (
    userId: string,
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/users/${userId}/restaurant-reviews`] : null;
    const fetcher = () =>
      this.restaurantReviewsList(userId, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags users
   * @name StripeAccountLinksCreate
   * @request POST:/users/{user_id}/stripe/account-links
   */
  stripeAccountLinksCreate = (userId: string, params: RequestParams = {}) =>
    this.request<StripeAccountLinksCreateData, void>({
      path: `/users/${userId}/stripe/account-links`,
      method: "POST",
      format: "json",
      ...params,
    });

  stripeAccountLinksCreateQueryArgs = (
    userId: string,
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/users/${userId}/stripe/account-links`] : null;
    const fetcher: (url: string[]) => Promise<StripeAccountLinksCreateData> = (
      _,
    ) => this.stripeAccountLinksCreate(userId, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags users
   * @name StripeAccountCreate
   * @request POST:/users/{user_id}/stripe/account
   */
  stripeAccountCreate = (userId: string, params: RequestParams = {}) =>
    this.request<StripeAccountCreateData, void>({
      path: `/users/${userId}/stripe/account`,
      method: "POST",
      format: "json",
      ...params,
    });

  stripeAccountCreateQueryArgs = (
    userId: string,
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/users/${userId}/stripe/account`] : null;
    const fetcher: (url: string[]) => Promise<StripeAccountCreateData> = (_) =>
      this.stripeAccountCreate(userId, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags users
   * @name WorksessionsUserTodosList
   * @request GET:/users/{user_id}/worksessions/user_todos
   */
  worksessionsUserTodosList = (userId: string, params: RequestParams = {}) =>
    this.request<WorksessionsUserTodosListData, void>({
      path: `/users/${userId}/worksessions/user_todos`,
      method: "GET",
      format: "json",
      ...params,
    });

  worksessionsUserTodosListQueryArgs = (
    userId: string,
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/users/${userId}/worksessions/user_todos`] : null;
    const fetcher = () =>
      this.worksessionsUserTodosList(userId, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags users
   * @name WorksessionsList
   * @request GET:/users/{user_id}/worksessions
   */
  worksessionsList = (userId: string, params: RequestParams = {}) =>
    this.request<WorksessionsListResult, void>({
      path: `/users/${userId}/worksessions`,
      method: "GET",
      format: "json",
      ...params,
    });

  worksessionsListQueryArgs = (
    userId: string,
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/users/${userId}/worksessions`] : null;
    const fetcher = () =>
      this.worksessionsList(userId, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description Delete user record. <br /><br /> <b>Authentication:</b> not required
   *
   * @tags users
   * @name UsersDelete
   * @summary Delete user record.
   * @request DELETE:/users/{user_id}
   */
  usersDelete = (userId: string, params: RequestParams = {}) =>
    this.request<UsersDeleteData, void>({
      path: `/users/${userId}`,
      method: "DELETE",
      format: "json",
      ...params,
    });

  usersDeleteQueryArgs = (
    userId: string,
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/users/${userId}`] : null;
    const fetcher = () =>
      this.usersDelete(userId, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description Get user record <br /><br /> <b>Authentication:</b> not required
   *
   * @tags users
   * @name UsersDetail
   * @summary Get user record
   * @request GET:/users/{user_id}
   */
  usersDetail = (userId: string, params: RequestParams = {}) =>
    this.request<UsersDetailData, void>({
      path: `/users/${userId}`,
      method: "GET",
      format: "json",
      ...params,
    });

  usersDetailQueryArgs = (
    userId: string,
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/users/${userId}`] : null;
    const fetcher = () =>
      this.usersDetail(userId, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description Edit user record <br /><br /> <b>Authentication:</b> not required
   *
   * @tags users
   * @name UsersPartialUpdate
   * @summary Edit user record
   * @request PATCH:/users/{user_id}
   */
  usersPartialUpdate = (
    userId: string,
    data: UsersPartialUpdatePayload,
    params: RequestParams = {},
  ) =>
    this.request<UsersPartialUpdateData, void>({
      path: `/users/${userId}`,
      method: "PATCH",
      body: data,
      type: ContentType.FormData,
      format: "json",
      ...params,
    });

  usersPartialUpdateQueryArgs = (
    userId: string,
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/users/${userId}`] : null;
    const fetcher: (
      url: string[],
      { arg }: { arg: UsersPartialUpdatePayload },
    ) => Promise<UsersPartialUpdateData> = (_, { arg }) =>
      this.usersPartialUpdate(userId, arg, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description Query all user records <br /><br /> <b>Authentication:</b> not required
   *
   * @tags users
   * @name UsersList
   * @summary Query all user records
   * @request GET:/users
   */
  usersList = (params: RequestParams = {}) =>
    this.request<UsersListData, void>({
      path: `/users`,
      method: "GET",
      format: "json",
      ...params,
    });

  usersListQueryArgs = (
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/users`] : null;
    const fetcher = () => this.usersList(params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description Add user record <br /><br /> <b>Authentication:</b> not required
   *
   * @tags users
   * @name UsersCreate
   * @summary Add user record
   * @request POST:/users
   */
  usersCreate = (data: UsersCreatePayload, params: RequestParams = {}) =>
    this.request<UsersCreateData, void>({
      path: `/users`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });

  usersCreateQueryArgs = (
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/users`] : null;
    const fetcher: (
      url: string[],
      { arg }: { arg: UsersCreatePayload },
    ) => Promise<UsersCreateData> = (_, { arg }) =>
      this.usersCreate(arg, params).then((res) => res.data);
    return [key, fetcher] as const;
  };
}
