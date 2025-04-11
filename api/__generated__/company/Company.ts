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

import { SignupCreateBody, SignupCreateResult } from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Company<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
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
}
