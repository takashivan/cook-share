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
  CheckAccessListData,
  CheckAccessListParams,
  CompanyusersClone0ListData,
  CompanyusersDetailData,
  StaffsListData,
  StaffsListParams,
} from "./data-contracts";
import { HttpClient, RequestParams } from "./http-client";

export class Restaurant<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags restaurant
   * @name CheckAccessList
   * @request GET:/restaurant/check-access
   */
  checkAccessList = (
    query: CheckAccessListParams,
    params: RequestParams = {},
  ) =>
    this.request<CheckAccessListData, void>({
      path: `/restaurant/check-access`,
      method: "GET",
      query: query,
      format: "json",
      ...params,
    });

  checkAccessListQueryArgs = (
    query: CheckAccessListParams,
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled
      ? [`/restaurant/check-access`, ...(query ? [query] : [])]
      : null;
    const fetcher = () =>
      this.checkAccessList(query, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags restaurant
   * @name CompanyusersClone0List
   * @request GET:/restaurant/companyusers/{restaurant_id}/clone_0
   */
  companyusersClone0List = (restaurantId: number, params: RequestParams = {}) =>
    this.request<CompanyusersClone0ListData, void>({
      path: `/restaurant/companyusers/${restaurantId}/clone_0`,
      method: "GET",
      format: "json",
      ...params,
    });

  companyusersClone0ListQueryArgs = (
    restaurantId: number,
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled
      ? [`/restaurant/companyusers/${restaurantId}/clone_0`]
      : null;
    const fetcher = () =>
      this.companyusersClone0List(restaurantId, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags restaurant
   * @name CompanyusersDetail
   * @request GET:/restaurant/companyusers/{restaurant_id}
   */
  companyusersDetail = (restaurantId: number, params: RequestParams = {}) =>
    this.request<CompanyusersDetailData, void>({
      path: `/restaurant/companyusers/${restaurantId}`,
      method: "GET",
      format: "json",
      ...params,
    });

  companyusersDetailQueryArgs = (
    restaurantId: number,
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/restaurant/companyusers/${restaurantId}`] : null;
    const fetcher = () =>
      this.companyusersDetail(restaurantId, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags restaurant
   * @name StaffsList
   * @request GET:/restaurant/staffs
   */
  staffsList = (query: StaffsListParams, params: RequestParams = {}) =>
    this.request<StaffsListData, void>({
      path: `/restaurant/staffs`,
      method: "GET",
      query: query,
      format: "json",
      ...params,
    });

  staffsListQueryArgs = (
    query: StaffsListParams,
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled
      ? [`/restaurant/staffs`, ...(query ? [query] : [])]
      : null;
    const fetcher = () =>
      this.staffsList(query, params).then((res) => res.data);
    return [key, fetcher] as const;
  };
}
