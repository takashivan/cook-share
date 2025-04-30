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
  UnreadSummaryChefListData,
  UnreadSummaryRestaurantDetailData,
  UpdateReadChefCreateData,
  UpdateReadChefCreatePayload,
  UpdateReadRestaurantCreateData,
  UpdateReadRestaurantCreatePayload,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Chat<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
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
   * @name UpdateReadChefCreate
   * @request POST:/chat/update-read-chef
   */
  updateReadChefCreate = (
    data: UpdateReadChefCreatePayload,
    params: RequestParams = {},
  ) =>
    this.request<UpdateReadChefCreateData, void>({
      path: `/chat/update-read-chef`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });

  updateReadChefCreateQueryArgs = (
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/chat/update-read-chef`] : null;
    const fetcher: (
      url: string[],
      { arg }: { arg: UpdateReadChefCreatePayload },
    ) => Promise<UpdateReadChefCreateData> = (_, { arg }) =>
      this.updateReadChefCreate(arg, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags chat
   * @name UpdateReadRestaurantCreate
   * @request POST:/chat/update-read-restaurant
   */
  updateReadRestaurantCreate = (
    data: UpdateReadRestaurantCreatePayload,
    params: RequestParams = {},
  ) =>
    this.request<UpdateReadRestaurantCreateData, void>({
      path: `/chat/update-read-restaurant`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });

  updateReadRestaurantCreateQueryArgs = (
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/chat/update-read-restaurant`] : null;
    const fetcher: (
      url: string[],
      { arg }: { arg: UpdateReadRestaurantCreatePayload },
    ) => Promise<UpdateReadRestaurantCreateData> = (_, { arg }) =>
      this.updateReadRestaurantCreate(arg, params).then((res) => res.data);
    return [key, fetcher] as const;
  };
}
