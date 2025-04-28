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
  ChefReviewListResult,
  FinishPartialUpdateBody,
  FinishPartialUpdateResult,
  MessagesListResult,
  RestaurantReviewListResult,
  StartPartialUpdateBody,
  StartPartialUpdateResult,
  VerifyPartialUpdateBody,
  VerifyPartialUpdateResult,
  WorksessionsCreateData,
  WorksessionsCreatePayload,
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
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags worksessions
   * @name FinishPartialUpdate
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
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags worksessions
   * @name StartPartialUpdate
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
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags worksessions
   * @name VerifyPartialUpdate
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
   * @description Query all worksession records <br /><br /> <b>Authentication:</b> not required
   *
   * @tags worksessions
   * @name WorksessionsList
   * @summary Query all worksession records
   * @request GET:/worksessions
   */
  worksessionsList = (params: RequestParams = {}) =>
    this.request<WorksessionsListOutput, void>({
      path: `/worksessions`,
      method: "GET",
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

  /**
   * @description Add worksession record <br /><br /> <b>Authentication:</b> not required
   *
   * @tags worksessions
   * @name WorksessionsCreate
   * @summary Add worksession record
   * @request POST:/worksessions
   */
  worksessionsCreate = (
    data: WorksessionsCreatePayload,
    params: RequestParams = {},
  ) =>
    this.request<WorksessionsCreateData, void>({
      path: `/worksessions`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });

  worksessionsCreateQueryArgs = (
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/worksessions`] : null;
    const fetcher: (
      url: string[],
      { arg }: { arg: WorksessionsCreatePayload },
    ) => Promise<WorksessionsCreateData> = (_, { arg }) =>
      this.worksessionsCreate(arg, params).then((res) => res.data);
    return [key, fetcher] as const;
  };
}
