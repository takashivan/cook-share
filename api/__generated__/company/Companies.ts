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
  BillingSummaryCurrentListData,
  CompaniesCreateData,
  CompaniesCreatePayload,
  CompaniesDeleteData,
  CompaniesDetailData,
  CompaniesListData,
  CompaniesPartialUpdateData,
  CompaniesPartialUpdatePayload,
  InitialCreateData,
  InitialCreatePayload,
  SessionHistoryCurrentListData,
  StaffDeleteCreateData,
  StaffDeleteCreatePayload,
  StaffInviteCreateData,
  StaffInviteCreatePayload,
  StripeCreateCustomerCreateData,
  StripeCreateCustomerCreatePayload,
  WorksessionsThismonthListData,
  WorksessionsThismonthListParams,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Companies<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description Add Companies record <br /><br /> <b>Authentication:</b> not required
   *
   * @tags companies
   * @name InitialCreate
   * @summary Add Companies record
   * @request POST:/companies/initial
   */
  initialCreate = (data: InitialCreatePayload, params: RequestParams = {}) =>
    this.request<InitialCreateData, void>({
      path: `/companies/initial`,
      method: "POST",
      body: data,
      type: ContentType.FormData,
      format: "json",
      ...params,
    });

  initialCreateQueryArgs = (
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/companies/initial`] : null;
    const fetcher: (
      url: string[],
      { arg }: { arg: InitialCreatePayload },
    ) => Promise<InitialCreateData> = (_, { arg }) =>
      this.initialCreate(arg, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags companies
   * @name StaffDeleteCreate
   * @request POST:/companies/staff/delete
   */
  staffDeleteCreate = (
    data: StaffDeleteCreatePayload,
    params: RequestParams = {},
  ) =>
    this.request<StaffDeleteCreateData, void>({
      path: `/companies/staff/delete`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });

  staffDeleteCreateQueryArgs = (
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/companies/staff/delete`] : null;
    const fetcher: (
      url: string[],
      { arg }: { arg: StaffDeleteCreatePayload },
    ) => Promise<StaffDeleteCreateData> = (_, { arg }) =>
      this.staffDeleteCreate(arg, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags companies
   * @name StaffInviteCreate
   * @request POST:/companies/staff/invite
   */
  staffInviteCreate = (
    data: StaffInviteCreatePayload,
    params: RequestParams = {},
  ) =>
    this.request<StaffInviteCreateData, void>({
      path: `/companies/staff/invite`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });

  staffInviteCreateQueryArgs = (
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/companies/staff/invite`] : null;
    const fetcher: (
      url: string[],
      { arg }: { arg: StaffInviteCreatePayload },
    ) => Promise<StaffInviteCreateData> = (_, { arg }) =>
      this.staffInviteCreate(arg, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags companies
   * @name StripeCreateCustomerCreate
   * @request POST:/companies/stripe/create-customer
   */
  stripeCreateCustomerCreate = (
    data: StripeCreateCustomerCreatePayload,
    params: RequestParams = {},
  ) =>
    this.request<StripeCreateCustomerCreateData, void>({
      path: `/companies/stripe/create-customer`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });

  stripeCreateCustomerCreateQueryArgs = (
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/companies/stripe/create-customer`] : null;
    const fetcher: (
      url: string[],
      { arg }: { arg: StripeCreateCustomerCreatePayload },
    ) => Promise<StripeCreateCustomerCreateData> = (_, { arg }) =>
      this.stripeCreateCustomerCreate(arg, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags companies
   * @name WorksessionsThismonthList
   * @request GET:/companies/worksessions/thismonth
   */
  worksessionsThismonthList = (
    query: WorksessionsThismonthListParams,
    params: RequestParams = {},
  ) =>
    this.request<WorksessionsThismonthListData, void>({
      path: `/companies/worksessions/thismonth`,
      method: "GET",
      query: query,
      format: "json",
      ...params,
    });

  worksessionsThismonthListQueryArgs = (
    query: WorksessionsThismonthListParams,
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled
      ? [`/companies/worksessions/thismonth`, ...(query ? [query] : [])]
      : null;
    const fetcher = () =>
      this.worksessionsThismonthList(query, params).then((res) => res.data);
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

  companiesDeleteQueryArgs = (
    companiesId: string,
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/companies/${companiesId}`] : null;
    const fetcher = () =>
      this.companiesDelete(companiesId, params).then((res) => res.data);
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

  companiesDetailQueryArgs = (
    companiesId: string,
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/companies/${companiesId}`] : null;
    const fetcher = () =>
      this.companiesDetail(companiesId, params).then((res) => res.data);
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
  companiesPartialUpdate = (
    companiesId: string,
    data: CompaniesPartialUpdatePayload,
    params: RequestParams = {},
  ) =>
    this.request<CompaniesPartialUpdateData, void>({
      path: `/companies/${companiesId}`,
      method: "PATCH",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });

  companiesPartialUpdateQueryArgs = (
    companiesId: string,
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/companies/${companiesId}`] : null;
    const fetcher: (
      url: string[],
      { arg }: { arg: CompaniesPartialUpdatePayload },
    ) => Promise<CompaniesPartialUpdateData> = (_, { arg }) =>
      this.companiesPartialUpdate(companiesId, arg, params).then(
        (res) => res.data,
      );
    return [key, fetcher] as const;
  };

  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags companies
   * @name BillingSummaryCurrentList
   * @request GET:/companies/{company_id}/billing-summary/current
   */
  billingSummaryCurrentList = (companyId: string, params: RequestParams = {}) =>
    this.request<BillingSummaryCurrentListData, void>({
      path: `/companies/${companyId}/billing-summary/current`,
      method: "GET",
      format: "json",
      ...params,
    });

  billingSummaryCurrentListQueryArgs = (
    companyId: string,
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled
      ? [`/companies/${companyId}/billing-summary/current`]
      : null;
    const fetcher = () =>
      this.billingSummaryCurrentList(companyId, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags companies
   * @name SessionHistoryCurrentList
   * @request GET:/companies/{company_id}/sessionHistory/current
   */
  sessionHistoryCurrentList = (companyId: string, params: RequestParams = {}) =>
    this.request<SessionHistoryCurrentListData, void>({
      path: `/companies/${companyId}/sessionHistory/current`,
      method: "GET",
      format: "json",
      ...params,
    });

  sessionHistoryCurrentListQueryArgs = (
    companyId: string,
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled
      ? [`/companies/${companyId}/sessionHistory/current`]
      : null;
    const fetcher = () =>
      this.sessionHistoryCurrentList(companyId, params).then((res) => res.data);
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

  companiesListQueryArgs = (
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
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
  companiesCreate = (
    data: CompaniesCreatePayload,
    params: RequestParams = {},
  ) =>
    this.request<CompaniesCreateData, void>({
      path: `/companies`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });

  companiesCreateQueryArgs = (
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/companies`] : null;
    const fetcher: (
      url: string[],
      { arg }: { arg: CompaniesCreatePayload },
    ) => Promise<CompaniesCreateData> = (_, { arg }) =>
      this.companiesCreate(arg, params).then((res) => res.data);
    return [key, fetcher] as const;
  };
}
