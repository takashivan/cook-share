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
}
