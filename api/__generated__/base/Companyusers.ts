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
  CompanyuserNotificationsListResult,
  CompanyusersCreateBody,
  CompanyusersCreateResult,
  CompanyusersDeleteData,
  CompanyusersListResult,
  CompanyusersPartialUpdateData,
  CompanyusersPartialUpdatePayload,
  RestaurantsListResult,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Companyusers<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags companyusers
   * @name RestaurantsList
   * @request GET:/companyusers/{companyuser_id}/restaurants
   */
  restaurantsList = (companyuserId: string, params: RequestParams = {}) =>
    this.request<RestaurantsListResult, void>({
      path: `/companyusers/${companyuserId}/restaurants`,
      method: "GET",
      format: "json",
      ...params,
    });

  restaurantsListQueryArgs = (companyuserId: string, params: RequestParams = {}, enabled: boolean = true) => {
    const key = enabled ? [`/companyusers/${companyuserId}/restaurants`] : null;
    const fetcher = () => this.restaurantsList(companyuserId, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description Delete CompanyUser record. <br /><br /> <b>Authentication:</b> not required
   *
   * @tags companyusers
   * @name CompanyusersDelete
   * @summary Delete CompanyUser record.
   * @request DELETE:/companyusers/{companyuser_id}
   */
  companyusersDelete = (companyuserId: string, params: RequestParams = {}) =>
    this.request<CompanyusersDeleteData, void>({
      path: `/companyusers/${companyuserId}`,
      method: "DELETE",
      format: "json",
      ...params,
    });

  /**
   * @description Edit CompanyUser record <br /><br /> <b>Authentication:</b> not required
   *
   * @tags companyusers
   * @name CompanyusersPartialUpdate
   * @summary Edit CompanyUser record
   * @request PATCH:/companyusers/{companyuser_id}
   */
  companyusersPartialUpdate = (
    companyuserId: string,
    data: CompanyusersPartialUpdatePayload,
    params: RequestParams = {},
  ) =>
    this.request<CompanyusersPartialUpdateData, void>({
      path: `/companyusers/${companyuserId}`,
      method: "PATCH",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });

  companyusersPartialUpdateQueryArgs = (companyuserId: string, params: RequestParams = {}, enabled: boolean = true) => {
    const key = enabled ? [`/companyusers/${companyuserId}`] : null;
    const fetcher: (
      url: string[],
      { arg }: { arg: CompanyusersPartialUpdatePayload },
    ) => Promise<CompanyusersPartialUpdateData> = (_, { arg }) =>
      this.companyusersPartialUpdate(companyuserId, arg, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags companyusers
   * @name CompanyuserNotificationsList
   * @request GET:/companyusers/{user_id}/companyuser-notifications
   */
  companyuserNotificationsList = (userId: string, params: RequestParams = {}) =>
    this.request<CompanyuserNotificationsListResult, void>({
      path: `/companyusers/${userId}/companyuser-notifications`,
      method: "GET",
      format: "json",
      ...params,
    });

  companyuserNotificationsListQueryArgs = (userId: string, params: RequestParams = {}, enabled: boolean = true) => {
    const key = enabled ? [`/companyusers/${userId}/companyuser-notifications`] : null;
    const fetcher = () => this.companyuserNotificationsList(userId, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description Query all CompanyUser records <br /><br /> <b>Authentication:</b> not required
   *
   * @tags companyusers
   * @name CompanyusersList
   * @summary Query all CompanyUser records
   * @request GET:/companyusers
   */
  companyusersList = (params: RequestParams = {}) =>
    this.request<CompanyusersListResult, void>({
      path: `/companyusers`,
      method: "GET",
      format: "json",
      ...params,
    });

  companyusersListQueryArgs = (params: RequestParams = {}, enabled: boolean = true) => {
    const key = enabled ? [`/companyusers`] : null;
    const fetcher = () => this.companyusersList(params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description Add CompanyUser record <br /><br /> <b>Authentication:</b> not required
   *
   * @tags companyusers
   * @name CompanyusersCreate
   * @summary Add CompanyUser record
   * @request POST:/companyusers
   */
  companyusersCreate = (data: CompanyusersCreateBody, params: RequestParams = {}) =>
    this.request<CompanyusersCreateResult, void>({
      path: `/companyusers`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });

  companyusersCreateQueryArgs = (params: RequestParams = {}, enabled: boolean = true) => {
    const key = enabled ? [`/companyusers`] : null;
    const fetcher: (url: string[], { arg }: { arg: CompanyusersCreateBody }) => Promise<CompanyusersCreateResult> = (
      _,
      { arg },
    ) => this.companyusersCreate(arg, params).then((res) => res.data);
    return [key, fetcher] as const;
  };
}
