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
  CompaniesCreateData,
  CompaniesCreatePayload,
  CompaniesDeleteData,
  CompaniesDetailData,
  CompaniesListData,
  CompaniesPartialUpdateData,
  CompaniesPartialUpdatePayload,
  CompanyusersCreateData,
  CompanyusersCreatePayload,
  CompanyusersDeleteData,
  CompanyusersDeletePayload,
  CompanyusersListData,
  JobsListData,
  RestaurantsListData,
  StaffInviteCreateData,
  StaffInviteCreatePayload,
  StripeCustomersCreateData,
  StripeCustomersCreatePayload,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Companies<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * @description <br /><br /> <b>Authentication:</b> required
   *
   * @tags companies
   * @name StaffInviteCreate
   * @request POST:/companies/staff/invite
   * @secure
   */
  staffInviteCreate = (data: StaffInviteCreatePayload, params: RequestParams = {}) =>
    this.request<StaffInviteCreateData, void>({
      path: `/companies/staff/invite`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });

  staffInviteCreateQueryArgs = (params: RequestParams = {}, enabled: boolean = true) => {
    const key = enabled ? [`/companies/staff/invite`] : null;
    const fetcher: (url: string[], { arg }: { arg: StaffInviteCreatePayload }) => Promise<StaffInviteCreateData> = (
      _,
      { arg },
    ) => this.staffInviteCreate(arg, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags companies
   * @name CompanyusersCreate
   * @request POST:/companies/{companies_id}/companyusers
   */
  companyusersCreate = (companiesId: string, data: CompanyusersCreatePayload, params: RequestParams = {}) =>
    this.request<CompanyusersCreateData, void>({
      path: `/companies/${companiesId}/companyusers`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });

  companyusersCreateQueryArgs = (companiesId: string, params: RequestParams = {}, enabled: boolean = true) => {
    const key = enabled ? [`/companies/${companiesId}/companyusers`] : null;
    const fetcher: (url: string[], { arg }: { arg: CompanyusersCreatePayload }) => Promise<CompanyusersCreateData> = (
      _,
      { arg },
    ) => this.companyusersCreate(companiesId, arg, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description Delete Companies record. <br /><br /> <b>Authentication:</b> not required
   *
   * @tags companies
   * @name CompaniesDelete
   * @summary Delete Companies record.
   * @request DELETE:/companies/{companies_id}
   */
  companiesDelete = (companiesId: string, params: RequestParams = {}) =>
    this.request<CompaniesDeleteData, void>({
      path: `/companies/${companiesId}`,
      method: "DELETE",
      format: "json",
      ...params,
    });

  companiesDeleteQueryArgs = (companiesId: string, params: RequestParams = {}, enabled: boolean = true) => {
    const key = enabled ? [`/companies/${companiesId}`] : null;
    const fetcher = () => this.companiesDelete(companiesId, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description Get Companies record <br /><br /> <b>Authentication:</b> not required
   *
   * @tags companies
   * @name CompaniesDetail
   * @summary Get Companies record
   * @request GET:/companies/{companies_id}
   */
  companiesDetail = (companiesId: string, params: RequestParams = {}) =>
    this.request<CompaniesDetailData, void>({
      path: `/companies/${companiesId}`,
      method: "GET",
      format: "json",
      ...params,
    });

  companiesDetailQueryArgs = (companiesId: string, params: RequestParams = {}, enabled: boolean = true) => {
    const key = enabled ? [`/companies/${companiesId}`] : null;
    const fetcher = () => this.companiesDetail(companiesId, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description Edit Companies record <br /><br /> <b>Authentication:</b> not required
   *
   * @tags companies
   * @name CompaniesPartialUpdate
   * @summary Edit Companies record
   * @request PATCH:/companies/{companies_id}
   */
  companiesPartialUpdate = (companiesId: string, data: CompaniesPartialUpdatePayload, params: RequestParams = {}) =>
    this.request<CompaniesPartialUpdateData, void>({
      path: `/companies/${companiesId}`,
      method: "PATCH",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });

  companiesPartialUpdateQueryArgs = (companiesId: string, params: RequestParams = {}, enabled: boolean = true) => {
    const key = enabled ? [`/companies/${companiesId}`] : null;
    const fetcher: (
      url: string[],
      { arg }: { arg: CompaniesPartialUpdatePayload },
    ) => Promise<CompaniesPartialUpdateData> = (_, { arg }) =>
      this.companiesPartialUpdate(companiesId, arg, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags companies
   * @name CompanyusersDelete
   * @request DELETE:/companies/{company_id}/companyusers/{companyuser_id}
   */
  companyusersDelete = (
    companyId: string,
    companyuserId: string,
    data: CompanyusersDeletePayload,
    params: RequestParams = {},
  ) =>
    this.request<CompanyusersDeleteData, void>({
      path: `/companies/${companyId}/companyusers/${companyuserId}`,
      method: "DELETE",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });

  companyusersDeleteQueryArgs = (
    companyId: string,
    companyuserId: string,
    data: CompanyusersDeletePayload,
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/companies/${companyId}/companyusers/${companyuserId}`] : null;
    const fetcher = () => this.companyusersDelete(companyId, companyuserId, data, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags companies
   * @name CompanyusersList
   * @request GET:/companies/{company_id}/companyusers
   */
  companyusersList = (companyId: string, params: RequestParams = {}) =>
    this.request<CompanyusersListData, void>({
      path: `/companies/${companyId}/companyusers`,
      method: "GET",
      format: "json",
      ...params,
    });

  companyusersListQueryArgs = (companyId: string, params: RequestParams = {}, enabled: boolean = true) => {
    const key = enabled ? [`/companies/${companyId}/companyusers`] : null;
    const fetcher = () => this.companyusersList(companyId, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags companies
   * @name JobsList
   * @request GET:/companies/{company_id}/jobs
   */
  jobsList = (companyId: string, params: RequestParams = {}) =>
    this.request<JobsListData, void>({
      path: `/companies/${companyId}/jobs`,
      method: "GET",
      format: "json",
      ...params,
    });

  jobsListQueryArgs = (companyId: string, params: RequestParams = {}, enabled: boolean = true) => {
    const key = enabled ? [`/companies/${companyId}/jobs`] : null;
    const fetcher = () => this.jobsList(companyId, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags companies
   * @name RestaurantsList
   * @request GET:/companies/{company_id}/restaurants
   */
  restaurantsList = (companyId: string, params: RequestParams = {}) =>
    this.request<RestaurantsListData, void>({
      path: `/companies/${companyId}/restaurants`,
      method: "GET",
      format: "json",
      ...params,
    });

  restaurantsListQueryArgs = (companyId: string, params: RequestParams = {}, enabled: boolean = true) => {
    const key = enabled ? [`/companies/${companyId}/restaurants`] : null;
    const fetcher = () => this.restaurantsList(companyId, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags companies
   * @name StripeCustomersCreate
   * @request POST:/companies/{company_id}/stripe/customers
   */
  stripeCustomersCreate = (companyId: string, data: StripeCustomersCreatePayload, params: RequestParams = {}) =>
    this.request<StripeCustomersCreateData, void>({
      path: `/companies/${companyId}/stripe/customers`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });

  stripeCustomersCreateQueryArgs = (companyId: string, params: RequestParams = {}, enabled: boolean = true) => {
    const key = enabled ? [`/companies/${companyId}/stripe/customers`] : null;
    const fetcher: (
      url: string[],
      { arg }: { arg: StripeCustomersCreatePayload },
    ) => Promise<StripeCustomersCreateData> = (_, { arg }) =>
      this.stripeCustomersCreate(companyId, arg, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description Query all Companies records <br /><br /> <b>Authentication:</b> not required
   *
   * @tags companies
   * @name CompaniesList
   * @summary Query all Companies records
   * @request GET:/companies
   */
  companiesList = (params: RequestParams = {}) =>
    this.request<CompaniesListData, void>({
      path: `/companies`,
      method: "GET",
      format: "json",
      ...params,
    });

  companiesListQueryArgs = (params: RequestParams = {}, enabled: boolean = true) => {
    const key = enabled ? [`/companies`] : null;
    const fetcher = () => this.companiesList(params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description Add Companies record <br /><br /> <b>Authentication:</b> not required
   *
   * @tags companies
   * @name CompaniesCreate
   * @summary Add Companies record
   * @request POST:/companies
   */
  companiesCreate = (data: CompaniesCreatePayload, params: RequestParams = {}) =>
    this.request<CompaniesCreateData, void>({
      path: `/companies`,
      method: "POST",
      body: data,
      type: ContentType.FormData,
      format: "json",
      ...params,
    });

  companiesCreateQueryArgs = (params: RequestParams = {}, enabled: boolean = true) => {
    const key = enabled ? [`/companies`] : null;
    const fetcher: (url: string[], { arg }: { arg: CompaniesCreatePayload }) => Promise<CompaniesCreateData> = (
      _,
      { arg },
    ) => this.companiesCreate(arg, params).then((res) => res.data);
    return [key, fetcher] as const;
  };
}
