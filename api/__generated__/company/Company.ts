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
  BillingCreateData,
  InitialSetListData,
  SignupCreateBody,
  SignupCreateResult,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Company<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags company
   * @name BillingCreate
   * @request POST:/company/billing
   */
  billingCreate = (params: RequestParams = {}) =>
    this.request<BillingCreateData, void>({
      path: `/company/billing`,
      method: "POST",
      format: "json",
      ...params,
    });

  billingCreateQueryArgs = (
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/company/billing`] : null;
    const fetcher: (url: string[]) => Promise<BillingCreateData> = (_) =>
      this.billingCreate(params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags company
   * @name InitialSetList
   * @request GET:/company/initial/set
   */
  initialSetList = (params: RequestParams = {}) =>
    this.request<InitialSetListData, void>({
      path: `/company/initial/set`,
      method: "GET",
      format: "json",
      ...params,
    });

  initialSetListQueryArgs = (
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/company/initial/set`] : null;
    const fetcher = () => this.initialSetList(params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description Signup and retrieve an authentication token <br /><br /> <b>Authentication:</b> not required
   *
   * @tags company
   * @name SignupCreate
   * @summary Signup and retrieve an authentication token
   * @request POST:/company/signup
   */
  signupCreate = (data: SignupCreateBody, params: RequestParams = {}) =>
    this.request<SignupCreateResult, void>({
      path: `/company/signup`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });

  signupCreateQueryArgs = (
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/company/signup`] : null;
    const fetcher: (
      url: string[],
      { arg }: { arg: SignupCreateBody },
    ) => Promise<SignupCreateResult> = (_, { arg }) =>
      this.signupCreate(arg, params).then((res) => res.data);
    return [key, fetcher] as const;
  };
}
