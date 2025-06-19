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
  ChefNotificationsListData,
  ChefNotificationsListParams,
  ChefReviewsListResult,
  EmailChangeCreateInput,
  EmailChangeCreateOutput,
  EmailConfirmCreateInput,
  EmailConfirmCreateOutput,
  MessagesCreateInput,
  MessagesCreateOutput,
  NotifyCreateData,
  NotifyCreatePayload,
  PayoutLogsListData,
  RestaurantReviewsListOutput,
  ReviewsListResult,
  SessionHistoryCurrentListResult,
  StripeAccountCheckCreateBody,
  StripeAccountCheckCreateResult,
  StripeAccountCreateData,
  StripeAccountLinksCreateData,
  StripeCreateAccountCreateBody,
  StripeCreateAccountCreateResult,
  StripeCreateAccountLinkCreateBody,
  StripeCreateAccountLinkCreateResult,
  UsersCreateData,
  UsersCreatePayload,
  UsersDeleteData,
  UsersDetailData,
  UsersListData,
  UsersPartialUpdateData,
  UsersPartialUpdatePayload,
  WorksessionsListResult,
  WorksessionsMessagesListResult,
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
   * @name EmailChangeCreate
   * @request POST:/users/email/change
   */
  emailChangeCreate = (
    data: EmailChangeCreateInput,
    params: RequestParams = {},
  ) =>
    this.request<EmailChangeCreateOutput, void>({
      path: `/users/email/change`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });

  emailChangeCreateQueryArgs = (
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/users/email/change`] : null;
    const fetcher: (
      url: string[],
      { arg }: { arg: EmailChangeCreateInput },
    ) => Promise<EmailChangeCreateOutput> = (_, { arg }) =>
      this.emailChangeCreate(arg, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags users
   * @name EmailConfirmCreate
   * @request POST:/users/email/confirm
   */
  emailConfirmCreate = (
    data: EmailConfirmCreateInput,
    params: RequestParams = {},
  ) =>
    this.request<EmailConfirmCreateOutput, void>({
      path: `/users/email/confirm`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });

  emailConfirmCreateQueryArgs = (
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/users/email/confirm`] : null;
    const fetcher: (
      url: string[],
      { arg }: { arg: EmailConfirmCreateInput },
    ) => Promise<EmailConfirmCreateOutput> = (_, { arg }) =>
      this.emailConfirmCreate(arg, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags users
   * @name StripeAccountCheckCreate
   * @request POST:/users/stripe/account-check
   */
  stripeAccountCheckCreate = (
    data: StripeAccountCheckCreateBody,
    params: RequestParams = {},
  ) =>
    this.request<StripeAccountCheckCreateResult, void>({
      path: `/users/stripe/account-check`,
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
    const key = enabled ? [`/users/stripe/account-check`] : null;
    const fetcher: (
      url: string[],
      { arg }: { arg: StripeAccountCheckCreateBody },
    ) => Promise<StripeAccountCheckCreateResult> = (_, { arg }) =>
      this.stripeAccountCheckCreate(arg, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags users
   * @name StripeCreateAccountLinkCreate
   * @request POST:/users/stripe/create-account-link
   */
  stripeCreateAccountLinkCreate = (
    data: StripeCreateAccountLinkCreateBody,
    params: RequestParams = {},
  ) =>
    this.request<StripeCreateAccountLinkCreateResult, void>({
      path: `/users/stripe/create-account-link`,
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
    const key = enabled ? [`/users/stripe/create-account-link`] : null;
    const fetcher: (
      url: string[],
      { arg }: { arg: StripeCreateAccountLinkCreateBody },
    ) => Promise<StripeCreateAccountLinkCreateResult> = (_, { arg }) =>
      this.stripeCreateAccountLinkCreate(arg, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags users
   * @name StripeCreateAccountCreate
   * @request POST:/users/stripe/create-account
   */
  stripeCreateAccountCreate = (
    data: StripeCreateAccountCreateBody,
    params: RequestParams = {},
  ) =>
    this.request<StripeCreateAccountCreateResult, void>({
      path: `/users/stripe/create-account`,
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
    const key = enabled ? [`/users/stripe/create-account`] : null;
    const fetcher: (
      url: string[],
      { arg }: { arg: StripeCreateAccountCreateBody },
    ) => Promise<StripeCreateAccountCreateResult> = (_, { arg }) =>
      this.stripeCreateAccountCreate(arg, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags users
   * @name ChefNotificationsList
   * @request GET:/users/{userId}/chef-notifications
   */
  chefNotificationsList = (
    { userId, ...query }: ChefNotificationsListParams,
    params: RequestParams = {},
  ) =>
    this.request<ChefNotificationsListData, void>({
      path: `/users/${userId}/chef-notifications`,
      method: "GET",
      query: query,
      format: "json",
      ...params,
    });

  chefNotificationsListQueryArgs = (
    { userId, ...query }: ChefNotificationsListParams,
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
    this.request<ChefReviewsListResult, void>({
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
   * @description Add message record <br /><br /> <b>Authentication:</b> not required
   *
   * @tags users
   * @name MessagesCreate
   * @summary Add message record
   * @request POST:/users/{user_id}/messages
   */
  messagesCreate = (
    userId: string,
    data: MessagesCreateInput,
    params: RequestParams = {},
  ) =>
    this.request<MessagesCreateOutput, void>({
      path: `/users/${userId}/messages`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });

  messagesCreateQueryArgs = (
    userId: string,
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/users/${userId}/messages`] : null;
    const fetcher: (
      url: string[],
      { arg }: { arg: MessagesCreateInput },
    ) => Promise<MessagesCreateOutput> = (_, { arg }) =>
      this.messagesCreate(userId, arg, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description ユーザーへの通知を追加し、通知を送信する <br /><br /> <b>Authentication:</b> not required
   *
   * @tags users
   * @name NotifyCreate
   * @summary ユーザーへの通知を追加し、通知を送信する
   * @request POST:/users/{user_id}/notify
   */
  notifyCreate = (
    userId: string,
    data: NotifyCreatePayload,
    params: RequestParams = {},
  ) =>
    this.request<NotifyCreateData, void>({
      path: `/users/${userId}/notify`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });

  notifyCreateQueryArgs = (
    userId: string,
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/users/${userId}/notify`] : null;
    const fetcher: (
      url: string[],
      { arg }: { arg: NotifyCreatePayload },
    ) => Promise<NotifyCreateData> = (_, { arg }) =>
      this.notifyCreate(userId, arg, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description [AUTH]User <br /><br /> <b>Authentication:</b> not required
   *
   * @tags users
   * @name PayoutLogsList
   * @summary [AUTH]User
   * @request GET:/users/{user_id}/payout-logs
   */
  payoutLogsList = (userId: string, params: RequestParams = {}) =>
    this.request<PayoutLogsListData, void>({
      path: `/users/${userId}/payout-logs`,
      method: "GET",
      format: "json",
      ...params,
    });

  payoutLogsListQueryArgs = (
    userId: string,
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/users/${userId}/payout-logs`] : null;
    const fetcher = () =>
      this.payoutLogsList(userId, params).then((res) => res.data);
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
   * @description [AUTH]User <br /><br /> <b>Authentication:</b> not required
   *
   * @tags users
   * @name ReviewsList
   * @summary [AUTH]User
   * @request GET:/users/{user_id}/reviews
   */
  reviewsList = (userId: string, params: RequestParams = {}) =>
    this.request<ReviewsListResult, void>({
      path: `/users/${userId}/reviews`,
      method: "GET",
      format: "json",
      ...params,
    });

  reviewsListQueryArgs = (
    userId: string,
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/users/${userId}/reviews`] : null;
    const fetcher = () =>
      this.reviewsList(userId, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description [AUTH]User <br /><br /> <b>Authentication:</b> not required
   *
   * @tags users
   * @name SessionHistoryCurrentList
   * @summary [AUTH]User
   * @request GET:/users/{user_id}/sessionHistory/current
   */
  sessionHistoryCurrentList = (userId: string, params: RequestParams = {}) =>
    this.request<SessionHistoryCurrentListResult, void>({
      path: `/users/${userId}/sessionHistory/current`,
      method: "GET",
      format: "json",
      ...params,
    });

  sessionHistoryCurrentListQueryArgs = (
    userId: string,
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/users/${userId}/sessionHistory/current`] : null;
    const fetcher = () =>
      this.sessionHistoryCurrentList(userId, params).then((res) => res.data);
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
   * @description [AUTH-CHef]自分のデータだけ取れる <br /><br /> <b>Authentication:</b> not required
   *
   * @tags users
   * @name WorksessionsUserTodosList
   * @summary [AUTH-CHef]自分のデータだけ取れる
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
   * @description [AUTH-CHEF]働くシェフだけがメッセージを見られます。 <br /><br /> <b>Authentication:</b> not required
   *
   * @tags users
   * @name WorksessionsMessagesList
   * @summary [AUTH-CHEF]働くシェフだけがメッセージを見られます。
   * @request GET:/users/{user_id}/worksessions/{worksession_id}/messages
   */
  worksessionsMessagesList = (
    userId: string,
    worksessionId: number,
    params: RequestParams = {},
  ) =>
    this.request<WorksessionsMessagesListResult, void>({
      path: `/users/${userId}/worksessions/${worksessionId}/messages`,
      method: "GET",
      format: "json",
      ...params,
    });

  worksessionsMessagesListQueryArgs = (
    userId: string,
    worksessionId: number,
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled
      ? [`/users/${userId}/worksessions/${worksessionId}/messages`]
      : null;
    const fetcher = () =>
      this.worksessionsMessagesList(userId, worksessionId, params).then(
        (res) => res.data,
      );
    return [key, fetcher] as const;
  };

  /**
   * @description [AUTH]User <br /><br /> <b>Authentication:</b> not required
   *
   * @tags users
   * @name WorksessionsList
   * @summary [AUTH]User
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
