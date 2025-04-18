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
  ChefReviewListResult,
  MessagesListResult,
  RestaurantReviewListResult,
  WorksessionsCreateData,
  WorksessionsCreatePayload,
  WorksessionsDeleteData,
  WorksessionsDetailData,
  WorksessionsListOutput,
  WorksessionsPartialUpdateData,
  WorksessionsPartialUpdatePayload,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Worksessions<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
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

  chefReviewListQueryArgs = (worksessionId: number, params: RequestParams = {}, enabled: boolean = true) => {
    const key = enabled ? [`/worksessions/${worksessionId}/chef-review`] : null;
    const fetcher = () => this.chefReviewList(worksessionId, params).then((res) => res.data);
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

  messagesListQueryArgs = (worksessionId: number, params: RequestParams = {}, enabled: boolean = true) => {
    const key = enabled ? [`/worksessions/${worksessionId}/messages`] : null;
    const fetcher = () => this.messagesList(worksessionId, params).then((res) => res.data);
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

  restaurantReviewListQueryArgs = (worksessionId: number, params: RequestParams = {}, enabled: boolean = true) => {
    const key = enabled ? [`/worksessions/${worksessionId}/restaurant-review`] : null;
    const fetcher = () => this.restaurantReviewList(worksessionId, params).then((res) => res.data);
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

  worksessionsDetailQueryArgs = (worksessionId: number, params: RequestParams = {}, enabled: boolean = true) => {
    const key = enabled ? [`/worksessions/${worksessionId}`] : null;
    const fetcher = () => this.worksessionsDetail(worksessionId, params).then((res) => res.data);
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

  worksessionsListQueryArgs = (params: RequestParams = {}, enabled: boolean = true) => {
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
  worksessionsCreate = (data: WorksessionsCreatePayload, params: RequestParams = {}) =>
    this.request<WorksessionsCreateData, void>({
      path: `/worksessions`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
}
