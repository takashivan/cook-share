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
  CancelByChefPartialUpdateData,
  CancelByChefPartialUpdatePayload,
  CancelByRestaurantPartialUpdateData,
  CancelByRestaurantPartialUpdatePayload,
  ChefReviewListResult,
  FinishPartialUpdateBody,
  FinishPartialUpdateResult,
  JobChangeRequestChefListData,
  JobChangeRequestListData,
  JobChangeRequestRestaurantListData,
  MessagesListResult,
  NoShowPartialUpdateData,
  RejectPartialUpdateInput,
  RejectPartialUpdateOutput,
  RestaurantReviewListResult,
  StartPartialUpdateBody,
  StartPartialUpdateResult,
  VerifyPartialUpdateBody,
  VerifyPartialUpdateResult,
  WorksessionsDeleteData,
  WorksessionsDetailData,
  WorksessionsListOutput,
  WorksessionsPartialUpdateData,
  WorksessionsPartialUpdatePayload,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Worksessions<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description [AUTH-Chef]自分のものしかキャンセルできない <br /><br /> <b>Authentication:</b> not required
   *
   * @tags worksessions
   * @name CancelByChefPartialUpdate
   * @summary [AUTH-Chef]自分のものしかキャンセルできない
   * @request PATCH:/worksessions/{worksession_id}/cancel-by-chef
   */
  cancelByChefPartialUpdate = (
    worksessionId: number,
    data: CancelByChefPartialUpdatePayload,
    params: RequestParams = {},
  ) =>
    this.request<CancelByChefPartialUpdateData, void>({
      path: `/worksessions/${worksessionId}/cancel-by-chef`,
      method: "PATCH",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });

  cancelByChefPartialUpdateQueryArgs = (
    worksessionId: number,
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled
      ? [`/worksessions/${worksessionId}/cancel-by-chef`]
      : null;
    const fetcher: (
      url: string[],
      { arg }: { arg: CancelByChefPartialUpdatePayload },
    ) => Promise<CancelByChefPartialUpdateData> = (_, { arg }) =>
      this.cancelByChefPartialUpdate(worksessionId, arg, params).then(
        (res) => res.data,
      );
    return [key, fetcher] as const;
  };

  /**
   * @description [AUTH-CompanyUser]レストランのスタッフしかキャンセルできない <br /><br /> <b>Authentication:</b> not required
   *
   * @tags worksessions
   * @name CancelByRestaurantPartialUpdate
   * @summary [AUTH-CompanyUser]レストランのスタッフしかキャンセルできない
   * @request PATCH:/worksessions/{worksession_id}/cancel-by-restaurant
   */
  cancelByRestaurantPartialUpdate = (
    worksessionId: number,
    data: CancelByRestaurantPartialUpdatePayload,
    params: RequestParams = {},
  ) =>
    this.request<CancelByRestaurantPartialUpdateData, void>({
      path: `/worksessions/${worksessionId}/cancel-by-restaurant`,
      method: "PATCH",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });

  cancelByRestaurantPartialUpdateQueryArgs = (
    worksessionId: number,
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled
      ? [`/worksessions/${worksessionId}/cancel-by-restaurant`]
      : null;
    const fetcher: (
      url: string[],
      { arg }: { arg: CancelByRestaurantPartialUpdatePayload },
    ) => Promise<CancelByRestaurantPartialUpdateData> = (_, { arg }) =>
      this.cancelByRestaurantPartialUpdate(worksessionId, arg, params).then(
        (res) => res.data,
      );
    return [key, fetcher] as const;
  };

  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags worksessions
   * @name ChefReviewList
   * @request GET:/worksessions/{worksession_id}/chef-review
   */
  chefReviewList = (worksessionId: number, params: RequestParams = {}) =>
    this.request<ChefReviewListResult, void>({
      path: `/worksessions/${worksessionId}/chef-review`,
      method: "GET",
      format: "json",
      ...params,
    });

  chefReviewListQueryArgs = (
    worksessionId: number,
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/worksessions/${worksessionId}/chef-review`] : null;
    const fetcher = () =>
      this.chefReviewList(worksessionId, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description [AUTH]User <br /><br /> <b>Authentication:</b> not required
   *
   * @tags worksessions
   * @name FinishPartialUpdate
   * @summary [AUTH]User
   * @request PATCH:/worksessions/{worksession_id}/finish
   */
  finishPartialUpdate = (
    worksessionId: number,
    data: FinishPartialUpdateBody,
    params: RequestParams = {},
  ) =>
    this.request<FinishPartialUpdateResult, void>({
      path: `/worksessions/${worksessionId}/finish`,
      method: "PATCH",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });

  finishPartialUpdateQueryArgs = (
    worksessionId: number,
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/worksessions/${worksessionId}/finish`] : null;
    const fetcher: (
      url: string[],
      { arg }: { arg: FinishPartialUpdateBody },
    ) => Promise<FinishPartialUpdateResult> = (_, { arg }) =>
      this.finishPartialUpdate(worksessionId, arg, params).then(
        (res) => res.data,
      );
    return [key, fetcher] as const;
  };

  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags worksessions
   * @name JobChangeRequestChefList
   * @request GET:/worksessions/{worksession_id}/job-change-request/chef
   */
  jobChangeRequestChefList = (
    worksessionId: number,
    params: RequestParams = {},
  ) =>
    this.request<JobChangeRequestChefListData, void>({
      path: `/worksessions/${worksessionId}/job-change-request/chef`,
      method: "GET",
      format: "json",
      ...params,
    });

  jobChangeRequestChefListQueryArgs = (
    worksessionId: number,
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled
      ? [`/worksessions/${worksessionId}/job-change-request/chef`]
      : null;
    const fetcher = () =>
      this.jobChangeRequestChefList(worksessionId, params).then(
        (res) => res.data,
      );
    return [key, fetcher] as const;
  };

  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags worksessions
   * @name JobChangeRequestRestaurantList
   * @request GET:/worksessions/{worksession_id}/job-change-request/restaurant
   */
  jobChangeRequestRestaurantList = (
    worksessionId: number,
    params: RequestParams = {},
  ) =>
    this.request<JobChangeRequestRestaurantListData, void>({
      path: `/worksessions/${worksessionId}/job-change-request/restaurant`,
      method: "GET",
      format: "json",
      ...params,
    });

  jobChangeRequestRestaurantListQueryArgs = (
    worksessionId: number,
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled
      ? [`/worksessions/${worksessionId}/job-change-request/restaurant`]
      : null;
    const fetcher = () =>
      this.jobChangeRequestRestaurantList(worksessionId, params).then(
        (res) => res.data,
      );
    return [key, fetcher] as const;
  };

  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags worksessions
   * @name JobChangeRequestList
   * @request GET:/worksessions/{worksession_id}/job-change-request
   */
  jobChangeRequestList = (worksessionId: number, params: RequestParams = {}) =>
    this.request<JobChangeRequestListData, void>({
      path: `/worksessions/${worksessionId}/job-change-request`,
      method: "GET",
      format: "json",
      ...params,
    });

  jobChangeRequestListQueryArgs = (
    worksessionId: number,
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled
      ? [`/worksessions/${worksessionId}/job-change-request`]
      : null;
    const fetcher = () =>
      this.jobChangeRequestList(worksessionId, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags worksessions
   * @name MessagesList
   * @request GET:/worksessions/{worksession_id}/messages
   */
  messagesList = (worksessionId: number, params: RequestParams = {}) =>
    this.request<MessagesListResult, void>({
      path: `/worksessions/${worksessionId}/messages`,
      method: "GET",
      format: "json",
      ...params,
    });

  messagesListQueryArgs = (
    worksessionId: number,
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/worksessions/${worksessionId}/messages`] : null;
    const fetcher = () =>
      this.messagesList(worksessionId, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description [AUTH-CompanyUser]レストランのスタッフしかキャンセルできない <br /><br /> <b>Authentication:</b> not required
   *
   * @tags worksessions
   * @name NoShowPartialUpdate
   * @summary [AUTH-CompanyUser]レストランのスタッフしかキャンセルできない
   * @request PATCH:/worksessions/{worksession_id}/no-show
   */
  noShowPartialUpdate = (worksessionId: number, params: RequestParams = {}) =>
    this.request<NoShowPartialUpdateData, void>({
      path: `/worksessions/${worksessionId}/no-show`,
      method: "PATCH",
      format: "json",
      ...params,
    });

  noShowPartialUpdateQueryArgs = (
    worksessionId: number,
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/worksessions/${worksessionId}/no-show`] : null;
    const fetcher: (url: string[]) => Promise<NoShowPartialUpdateData> = (_) =>
      this.noShowPartialUpdate(worksessionId, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description [AUTH]restaurantの権限 <br /><br /> <b>Authentication:</b> not required
   *
   * @tags worksessions
   * @name RejectPartialUpdate
   * @summary [AUTH]restaurantの権限
   * @request PATCH:/worksessions/{worksession_id}/reject
   */
  rejectPartialUpdate = (
    worksessionId: number,
    data: RejectPartialUpdateInput,
    params: RequestParams = {},
  ) =>
    this.request<RejectPartialUpdateOutput, void>({
      path: `/worksessions/${worksessionId}/reject`,
      method: "PATCH",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });

  rejectPartialUpdateQueryArgs = (
    worksessionId: number,
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/worksessions/${worksessionId}/reject`] : null;
    const fetcher: (
      url: string[],
      { arg }: { arg: RejectPartialUpdateInput },
    ) => Promise<RejectPartialUpdateOutput> = (_, { arg }) =>
      this.rejectPartialUpdate(worksessionId, arg, params).then(
        (res) => res.data,
      );
    return [key, fetcher] as const;
  };

  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags worksessions
   * @name RestaurantReviewList
   * @request GET:/worksessions/{worksession_id}/restaurant-review
   */
  restaurantReviewList = (worksessionId: number, params: RequestParams = {}) =>
    this.request<RestaurantReviewListResult, void>({
      path: `/worksessions/${worksessionId}/restaurant-review`,
      method: "GET",
      format: "json",
      ...params,
    });

  restaurantReviewListQueryArgs = (
    worksessionId: number,
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled
      ? [`/worksessions/${worksessionId}/restaurant-review`]
      : null;
    const fetcher = () =>
      this.restaurantReviewList(worksessionId, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description [AUTH-CHEF]ユーザーだけがチェックインできます。 <br /><br /> <b>Authentication:</b> not required
   *
   * @tags worksessions
   * @name StartPartialUpdate
   * @summary [AUTH-CHEF]ユーザーだけがチェックインできます。
   * @request PATCH:/worksessions/{worksession_id}/start
   */
  startPartialUpdate = (
    worksessionId: number,
    data: StartPartialUpdateBody,
    params: RequestParams = {},
  ) =>
    this.request<StartPartialUpdateResult, void>({
      path: `/worksessions/${worksessionId}/start`,
      method: "PATCH",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });

  startPartialUpdateQueryArgs = (
    worksessionId: number,
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/worksessions/${worksessionId}/start`] : null;
    const fetcher: (
      url: string[],
      { arg }: { arg: StartPartialUpdateBody },
    ) => Promise<StartPartialUpdateResult> = (_, { arg }) =>
      this.startPartialUpdate(worksessionId, arg, params).then(
        (res) => res.data,
      );
    return [key, fetcher] as const;
  };

  /**
   * @description [AUTH]restaurantの権限 <br /><br /> <b>Authentication:</b> not required
   *
   * @tags worksessions
   * @name VerifyPartialUpdate
   * @summary [AUTH]restaurantの権限
   * @request PATCH:/worksessions/{worksession_id}/verify
   */
  verifyPartialUpdate = (
    worksessionId: number,
    data: VerifyPartialUpdateBody,
    params: RequestParams = {},
  ) =>
    this.request<VerifyPartialUpdateResult, void>({
      path: `/worksessions/${worksessionId}/verify`,
      method: "PATCH",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });

  verifyPartialUpdateQueryArgs = (
    worksessionId: number,
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/worksessions/${worksessionId}/verify`] : null;
    const fetcher: (
      url: string[],
      { arg }: { arg: VerifyPartialUpdateBody },
    ) => Promise<VerifyPartialUpdateResult> = (_, { arg }) =>
      this.verifyPartialUpdate(worksessionId, arg, params).then(
        (res) => res.data,
      );
    return [key, fetcher] as const;
  };

  /**
   * @description Delete worksession record. <br /><br /> <b>Authentication:</b> not required
   *
   * @tags worksessions
   * @name WorksessionsDelete
   * @summary Delete worksession record.
   * @request DELETE:/worksessions/{worksession_id}
   */
  worksessionsDelete = (worksessionId: number, params: RequestParams = {}) =>
    this.request<WorksessionsDeleteData, void>({
      path: `/worksessions/${worksessionId}`,
      method: "DELETE",
      format: "json",
      ...params,
    });

  worksessionsDeleteQueryArgs = (
    worksessionId: number,
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/worksessions/${worksessionId}`] : null;
    const fetcher = () =>
      this.worksessionsDelete(worksessionId, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description Get worksession record <br /><br /> <b>Authentication:</b> not required
   *
   * @tags worksessions
   * @name WorksessionsDetail
   * @summary Get worksession record
   * @request GET:/worksessions/{worksession_id}
   */
  worksessionsDetail = (worksessionId: number, params: RequestParams = {}) =>
    this.request<WorksessionsDetailData, void>({
      path: `/worksessions/${worksessionId}`,
      method: "GET",
      format: "json",
      ...params,
    });

  worksessionsDetailQueryArgs = (
    worksessionId: number,
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/worksessions/${worksessionId}`] : null;
    const fetcher = () =>
      this.worksessionsDetail(worksessionId, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description Edit worksession record <br /><br /> <b>Authentication:</b> not required
   *
   * @tags worksessions
   * @name WorksessionsPartialUpdate
   * @summary Edit worksession record
   * @request PATCH:/worksessions/{worksession_id}
   */
  worksessionsPartialUpdate = (
    worksessionId: number,
    data: WorksessionsPartialUpdatePayload,
    params: RequestParams = {},
  ) =>
    this.request<WorksessionsPartialUpdateData, void>({
      path: `/worksessions/${worksessionId}`,
      method: "PATCH",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });

  worksessionsPartialUpdateQueryArgs = (
    worksessionId: number,
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/worksessions/${worksessionId}`] : null;
    const fetcher: (
      url: string[],
      { arg }: { arg: WorksessionsPartialUpdatePayload },
    ) => Promise<WorksessionsPartialUpdateData> = (_, { arg }) =>
      this.worksessionsPartialUpdate(worksessionId, arg, params).then(
        (res) => res.data,
      );
    return [key, fetcher] as const;
  };

  /**
   * @description [AUTH-Operator]運営だけが全てのWorksessionを見られます。 <br /><br /> <b>Authentication:</b> required
   *
   * @tags worksessions
   * @name WorksessionsList
   * @summary [AUTH-Operator]運営だけが全てのWorksessionを見られます。
   * @request GET:/worksessions
   * @secure
   */
  worksessionsList = (params: RequestParams = {}) =>
    this.request<WorksessionsListOutput, void>({
      path: `/worksessions`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });

  worksessionsListQueryArgs = (
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/worksessions`] : null;
    const fetcher = () => this.worksessionsList(params).then((res) => res.data);
    return [key, fetcher] as const;
  };
}
