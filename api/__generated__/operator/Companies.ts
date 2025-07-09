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

import { CompaniesDetailData, CompaniesListData } from "./data-contracts";
import { HttpClient, RequestParams } from "./http-client";

export class Companies<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags companies
   * @name CompaniesDetail
   * @request GET:/companies/{company_id}
   */
  companiesDetail = (companyId: string, params: RequestParams = {}) =>
    this.request<CompaniesDetailData, void>({
      path: `/companies/${companyId}`,
      method: "GET",
      format: "json",
      ...params,
    });

  companiesDetailQueryArgs = (
    companyId: string,
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/companies/${companyId}`] : null;
    const fetcher = () =>
      this.companiesDetail(companyId, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description [AUTHED-Operator]運営者だけが見られる、企業情報一覧 <br /><br /> <b>Authentication:</b> required
   *
   * @tags companies
   * @name CompaniesList
   * @summary [AUTHED-Operator]運営者だけが見られる、企業情報一覧
   * @request GET:/companies
   * @secure
   */
  companiesList = (params: RequestParams = {}) =>
    this.request<CompaniesListData, void>({
      path: `/companies`,
      method: "GET",
      secure: true,
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
}
