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
  ByRestaurantDetailData,
  BySessionDetailData,
  ByUserDetailData,
  ChefReviewCreateData,
  ChefReviewCreatePayload,
  ChefReviewDeleteData,
  ChefReviewDetailData,
  ChefReviewListData,
  ChefReviewPartialUpdateData,
  ChefReviewPartialUpdatePayload,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class ChefReview<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags chef_review
   * @name ByRestaurantDetail
   * @request GET:/chef_review/byRestaurant/{restaurant_id}
   */
  byRestaurantDetail = (restaurantId: number, params: RequestParams = {}) =>
    this.request<ByRestaurantDetailData, void>({
      path: `/chef_review/byRestaurant/${restaurantId}`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags chef_review
   * @name BySessionDetail
   * @request GET:/chef_review/bySession/{worksession_id}
   */
  bySessionDetail = (worksessionId: number, params: RequestParams = {}) =>
    this.request<BySessionDetailData, void>({
      path: `/chef_review/bySession/${worksessionId}`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags chef_review
   * @name ByUserDetail
   * @request GET:/chef_review/byUser/{user_id}
   */
  byUserDetail = (userId: string, params: RequestParams = {}) =>
    this.request<ByUserDetailData, void>({
      path: `/chef_review/byUser/${userId}`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags chef_review
   * @name ChefReviewDelete
   * @request DELETE:/chef_review/{chef_review_id}
   */
  chefReviewDelete = (chefReviewId: number, params: RequestParams = {}) =>
    this.request<ChefReviewDeleteData, void>({
      path: `/chef_review/${chefReviewId}`,
      method: "DELETE",
      format: "json",
      ...params,
    });
  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags chef_review
   * @name ChefReviewDetail
   * @request GET:/chef_review/{chef_review_id}
   */
  chefReviewDetail = (chefReviewId: number, params: RequestParams = {}) =>
    this.request<ChefReviewDetailData, void>({
      path: `/chef_review/${chefReviewId}`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags chef_review
   * @name ChefReviewPartialUpdate
   * @request PATCH:/chef_review/{chef_review_id}
   */
  chefReviewPartialUpdate = (chefReviewId: number, data: ChefReviewPartialUpdatePayload, params: RequestParams = {}) =>
    this.request<ChefReviewPartialUpdateData, void>({
      path: `/chef_review/${chefReviewId}`,
      method: "PATCH",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags chef_review
   * @name ChefReviewList
   * @request GET:/chef_review
   */
  chefReviewList = (params: RequestParams = {}) =>
    this.request<ChefReviewListData, void>({
      path: `/chef_review`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags chef_review
   * @name ChefReviewCreate
   * @request POST:/chef_review
   */
  chefReviewCreate = (data: ChefReviewCreatePayload, params: RequestParams = {}) =>
    this.request<ChefReviewCreateData, void>({
      path: `/chef_review`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
}
