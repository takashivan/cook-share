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
  ChefReviewsListResult,
  CompanyuserNotificationsCreateBody,
  CompanyuserNotificationsCreateResult,
  CompanyusersCreateInput,
  CompanyusersCreateOutput,
  JobsListOutput,
  RestaurantReviewsListResult,
  RestaurantsCreateData,
  RestaurantsCreatePayload,
  RestaurantsDeleteData,
  RestaurantsDetailData,
  RestaurantsListResult,
  RestaurantsPartialUpdateData,
  RestaurantsPartialUpdatePayload,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Restaurants<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags restaurants
   * @name ChefReviewsList
   * @request GET:/restaurants/{restaurant_id}/chef-reviews
   */
  chefReviewsList = (restaurantId: number, params: RequestParams = {}) =>
    this.request<ChefReviewsListResult, void>({
      path: `/restaurants/${restaurantId}/chef-reviews`,
      method: "GET",
      format: "json",
      ...params,
    });

  chefReviewsListQueryArgs = (restaurantId: number, params: RequestParams = {}, enabled: boolean = true) => {
    const key = enabled ? [`/restaurants/${restaurantId}/chef-reviews`] : null;
    const fetcher = () => this.chefReviewsList(restaurantId, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags restaurants
   * @name CompanyuserNotificationsCreate
   * @request POST:/restaurants/{restaurant_id}/companyuser-notifications
   */
  companyuserNotificationsCreate = (
    restaurantId: number,
    data: CompanyuserNotificationsCreateBody,
    params: RequestParams = {},
  ) =>
    this.request<CompanyuserNotificationsCreateResult, void>({
      path: `/restaurants/${restaurantId}/companyuser-notifications`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });

  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags restaurants
   * @name CompanyusersCreate
   * @request POST:/restaurants/{restaurant_id}/companyusers
   */
  companyusersCreate = (restaurantId: number, data: CompanyusersCreateInput, params: RequestParams = {}) =>
    this.request<CompanyusersCreateOutput, void>({
      path: `/restaurants/${restaurantId}/companyusers`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });

  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags restaurants
   * @name JobsList
   * @request GET:/restaurants/{restaurant_id}/jobs
   */
  jobsList = (restaurantId: number, params: RequestParams = {}) =>
    this.request<JobsListOutput, void>({
      path: `/restaurants/${restaurantId}/jobs`,
      method: "GET",
      format: "json",
      ...params,
    });

  jobsListQueryArgs = (restaurantId: number, params: RequestParams = {}, enabled: boolean = true) => {
    const key = enabled ? [`/restaurants/${restaurantId}/jobs`] : null;
    const fetcher = () => this.jobsList(restaurantId, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags restaurants
   * @name RestaurantReviewsList
   * @request GET:/restaurants/{restaurant_id}/restaurant-reviews
   */
  restaurantReviewsList = (restaurantId: number, params: RequestParams = {}) =>
    this.request<RestaurantReviewsListResult, void>({
      path: `/restaurants/${restaurantId}/restaurant-reviews`,
      method: "GET",
      format: "json",
      ...params,
    });

  restaurantReviewsListQueryArgs = (restaurantId: number, params: RequestParams = {}, enabled: boolean = true) => {
    const key = enabled ? [`/restaurants/${restaurantId}/restaurant-reviews`] : null;
    const fetcher = () => this.restaurantReviewsList(restaurantId, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description Delete restaurant record. <br /><br /> <b>Authentication:</b> not required
   *
   * @tags restaurants
   * @name RestaurantsDelete
   * @summary Delete restaurant record.
   * @request DELETE:/restaurants/{restaurant_id}
   */
  restaurantsDelete = (restaurantId: number, params: RequestParams = {}) =>
    this.request<RestaurantsDeleteData, void>({
      path: `/restaurants/${restaurantId}`,
      method: "DELETE",
      format: "json",
      ...params,
    });

  /**
   * @description Get restaurant record <br /><br /> <b>Authentication:</b> not required
   *
   * @tags restaurants
   * @name RestaurantsDetail
   * @summary Get restaurant record
   * @request GET:/restaurants/{restaurant_id}
   */
  restaurantsDetail = (restaurantId: number, params: RequestParams = {}) =>
    this.request<RestaurantsDetailData, void>({
      path: `/restaurants/${restaurantId}`,
      method: "GET",
      format: "json",
      ...params,
    });

  restaurantsDetailQueryArgs = (restaurantId: number, params: RequestParams = {}, enabled: boolean = true) => {
    const key = enabled ? [`/restaurants/${restaurantId}`] : null;
    const fetcher = () => this.restaurantsDetail(restaurantId, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description Edit restaurant record <br /><br /> <b>Authentication:</b> not required
   *
   * @tags restaurants
   * @name RestaurantsPartialUpdate
   * @summary Edit restaurant record
   * @request PATCH:/restaurants/{restaurant_id}
   */
  restaurantsPartialUpdate = (
    restaurantId: number,
    data: RestaurantsPartialUpdatePayload,
    params: RequestParams = {},
  ) =>
    this.request<RestaurantsPartialUpdateData, void>({
      path: `/restaurants/${restaurantId}`,
      method: "PATCH",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });

  /**
   * @description Query all restaurant records <br /><br /> <b>Authentication:</b> not required
   *
   * @tags restaurants
   * @name RestaurantsList
   * @summary Query all restaurant records
   * @request GET:/restaurants
   */
  restaurantsList = (params: RequestParams = {}) =>
    this.request<RestaurantsListResult, void>({
      path: `/restaurants`,
      method: "GET",
      format: "json",
      ...params,
    });

  restaurantsListQueryArgs = (params: RequestParams = {}, enabled: boolean = true) => {
    const key = enabled ? [`/restaurants`] : null;
    const fetcher = () => this.restaurantsList(params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description Add restaurant record <br /><br /> <b>Authentication:</b> not required
   *
   * @tags restaurants
   * @name RestaurantsCreate
   * @summary Add restaurant record
   * @request POST:/restaurants
   */
  restaurantsCreate = (data: RestaurantsCreatePayload, params: RequestParams = {}) =>
    this.request<RestaurantsCreateData, void>({
      path: `/restaurants`,
      method: "POST",
      body: data,
      type: ContentType.FormData,
      format: "json",
      ...params,
    });
}
