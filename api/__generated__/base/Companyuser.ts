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
  CompanyDetailData,
  CompanyuserCreateData,
  CompanyuserCreatePayload,
  CompanyuserDetailData,
  CompanyuserListData,
  CompanyuserPartialUpdateData,
  CompanyuserPartialUpdatePayload,
  MeRestaurantsListData,
  MeRestaurantsListParams,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Companyuser<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags companyuser
   * @name CompanyDetail
   * @request GET:/companyuser/company/{company_id}
   */
  companyDetail = (companyId: string, params: RequestParams = {}) =>
    this.request<CompanyDetailData, void>({
      path: `/companyuser/company/${companyId}`,
      method: "GET",
      format: "json",
      ...params,
    });

  companyDetailQueryArgs = (companyId: string, params: RequestParams = {}, enabled: boolean = true) => {
    const key = enabled ? [`/companyuser/company/${companyId}`] : null;
    const fetcher = () => this.companyDetail(companyId, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags companyuser
   * @name MeRestaurantsList
   * @request GET:/companyuser/me/restaurants
   */
  meRestaurantsList = (query: MeRestaurantsListParams, params: RequestParams = {}) =>
    this.request<MeRestaurantsListData, void>({
      path: `/companyuser/me/restaurants`,
      method: "GET",
      query: query,
      format: "json",
      ...params,
    });

  meRestaurantsListQueryArgs = (
    query: MeRestaurantsListParams,
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/companyuser/me/restaurants`, ...(query ? [query] : [])] : null;
    const fetcher = () => this.meRestaurantsList(query, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description Get CompanyUser record <br /><br /> <b>Authentication:</b> not required
   *
   * @tags companyuser
   * @name CompanyuserDetail
   * @summary Get CompanyUser record
   * @request GET:/companyuser/{companyuser_id}
   */
  companyuserDetail = (companyuserId: string, params: RequestParams = {}) =>
    this.request<CompanyuserDetailData, void>({
      path: `/companyuser/${companyuserId}`,
      method: "GET",
      format: "json",
      ...params,
    });

  companyuserDetailQueryArgs = (companyuserId: string, params: RequestParams = {}, enabled: boolean = true) => {
    const key = enabled ? [`/companyuser/${companyuserId}`] : null;
    const fetcher = () => this.companyuserDetail(companyuserId, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description Edit CompanyUser record <br /><br /> <b>Authentication:</b> not required
   *
   * @tags companyuser
   * @name CompanyuserPartialUpdate
   * @summary Edit CompanyUser record
   * @request PATCH:/companyuser/{companyuser_id}
   */
  companyuserPartialUpdate = (
    companyuserId: string,
    data: CompanyuserPartialUpdatePayload,
    params: RequestParams = {},
  ) =>
    this.request<CompanyuserPartialUpdateData, void>({
      path: `/companyuser/${companyuserId}`,
      method: "PATCH",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });

  companyuserPartialUpdateQueryArgs = (companyuserId: string, params: RequestParams = {}, enabled: boolean = true) => {
    const key = enabled ? [`/companyuser/${companyuserId}`] : null;
    const fetcher: (
      url: string[],
      { arg }: { arg: CompanyuserPartialUpdatePayload },
    ) => Promise<CompanyuserPartialUpdateData> = (_, { arg }) =>
      this.companyuserPartialUpdate(companyuserId, arg, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description Query all CompanyUser records <br /><br /> <b>Authentication:</b> not required
   *
   * @tags companyuser
   * @name CompanyuserList
   * @summary Query all CompanyUser records
   * @request GET:/companyuser
   */
  companyuserList = (params: RequestParams = {}) =>
    this.request<CompanyuserListData, void>({
      path: `/companyuser`,
      method: "GET",
      format: "json",
      ...params,
    });

  companyuserListQueryArgs = (params: RequestParams = {}, enabled: boolean = true) => {
    const key = enabled ? [`/companyuser`] : null;
    const fetcher = () => this.companyuserList(params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description Add CompanyUser record <br /><br /> <b>Authentication:</b> not required
   *
   * @tags companyuser
   * @name CompanyuserCreate
   * @summary Add CompanyUser record
   * @request POST:/companyuser
   */
  companyuserCreate = (data: CompanyuserCreatePayload, params: RequestParams = {}) =>
    this.request<CompanyuserCreateData, void>({
      path: `/companyuser`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });

  companyuserCreateQueryArgs = (params: RequestParams = {}, enabled: boolean = true) => {
    const key = enabled ? [`/companyuser`] : null;
    const fetcher: (url: string[], { arg }: { arg: CompanyuserCreatePayload }) => Promise<CompanyuserCreateData> = (
      _,
      { arg },
    ) => this.companyuserCreate(arg, params).then((res) => res.data);
    return [key, fetcher] as const;
  };
}
