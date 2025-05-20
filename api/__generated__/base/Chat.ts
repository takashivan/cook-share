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
  SummaryChefListData,
  SummaryChefListParams,
  SummaryRestaurantListData,
  SummaryRestaurantListParams,
  UnreadSummaryChefListData,
  UnreadSummaryRestaurantDetailData,
  UpdateReadChefPartialUpdateData,
  UpdateReadChefPartialUpdatePayload,
  UpdateReadRestaurantPartialUpdateData,
  UpdateReadRestaurantPartialUpdatePayload,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Chat<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags chat
   * @name SummaryChefList
   * @request GET:/chat/summary-chef
   */
  summaryChefList = (
    query: SummaryChefListParams,
    params: RequestParams = {},
  ) =>
    this.request<SummaryChefListData, void>({
      path: `/chat/summary-chef`,
      method: "GET",
      query: query,
      format: "json",
      ...params,
    });

  summaryChefListQueryArgs = (
    query: SummaryChefListParams,
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled
      ? [`/chat/summary-chef`, ...(query ? [query] : [])]
      : null;
    const fetcher = () =>
      this.summaryChefList(query, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags chat
   * @name SummaryRestaurantList
   * @request GET:/chat/summary-restaurant
   */
  summaryRestaurantList = (
    query: SummaryRestaurantListParams,
    params: RequestParams = {},
  ) =>
    this.request<SummaryRestaurantListData, void>({
      path: `/chat/summary-restaurant`,
      method: "GET",
      query: query,
      format: "json",
      ...params,
    });

  summaryRestaurantListQueryArgs = (
    query: SummaryRestaurantListParams,
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled
      ? [`/chat/summary-restaurant`, ...(query ? [query] : [])]
      : null;
    const fetcher = () =>
      this.summaryRestaurantList(query, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags chat
   * @name UnreadSummaryChefList
   * @request GET:/chat/unread-summary-chef
   */
  unreadSummaryChefList = (params: RequestParams = {}) =>
    this.request<UnreadSummaryChefListData, void>({
      path: `/chat/unread-summary-chef`,
      method: "GET",
      format: "json",
      ...params,
    });

  unreadSummaryChefListQueryArgs = (
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/chat/unread-summary-chef`] : null;
    const fetcher = () =>
      this.unreadSummaryChefList(params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags chat
   * @name UnreadSummaryRestaurantDetail
   * @request GET:/chat/unread-summary-restaurant/{restaurant_id}
   */
  unreadSummaryRestaurantDetail = (
    restaurantId: number,
    params: RequestParams = {},
  ) =>
    this.request<UnreadSummaryRestaurantDetailData, void>({
      path: `/chat/unread-summary-restaurant/${restaurantId}`,
      method: "GET",
      format: "json",
      ...params,
    });

  unreadSummaryRestaurantDetailQueryArgs = (
    restaurantId: number,
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled
      ? [`/chat/unread-summary-restaurant/${restaurantId}`]
      : null;
    const fetcher = () =>
      this.unreadSummaryRestaurantDetail(restaurantId, params).then(
        (res) => res.data,
      );
    return [key, fetcher] as const;
  };

  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags chat
   * @name UpdateReadChefPartialUpdate
   * @request PATCH:/chat/update-read-chef
   */
  updateReadChefPartialUpdate = (
    data: UpdateReadChefPartialUpdatePayload,
    params: RequestParams = {},
  ) =>
    this.request<UpdateReadChefPartialUpdateData, void>({
      path: `/chat/update-read-chef`,
      method: "PATCH",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });

  updateReadChefPartialUpdateQueryArgs = (
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/chat/update-read-chef`] : null;
    const fetcher: (
      url: string[],
      { arg }: { arg: UpdateReadChefPartialUpdatePayload },
    ) => Promise<UpdateReadChefPartialUpdateData> = (_, { arg }) =>
      this.updateReadChefPartialUpdate(arg, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags chat
   * @name UpdateReadRestaurantPartialUpdate
   * @request PATCH:/chat/update-read-restaurant
   */
  updateReadRestaurantPartialUpdate = (
    data: UpdateReadRestaurantPartialUpdatePayload,
    params: RequestParams = {},
  ) =>
    this.request<UpdateReadRestaurantPartialUpdateData, void>({
      path: `/chat/update-read-restaurant`,
      method: "PATCH",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });

  updateReadRestaurantPartialUpdateQueryArgs = (
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/chat/update-read-restaurant`] : null;
    const fetcher: (
      url: string[],
      { arg }: { arg: UpdateReadRestaurantPartialUpdatePayload },
    ) => Promise<UpdateReadRestaurantPartialUpdateData> = (_, { arg }) =>
      this.updateReadRestaurantPartialUpdate(arg, params).then(
        (res) => res.data,
      );
    return [key, fetcher] as const;
  };
}
