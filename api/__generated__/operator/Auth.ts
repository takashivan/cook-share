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
  GetAuthData,
  LoginCreateData,
  LoginCreatePayload,
  SignupCreateData,
  SignupCreatePayload,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Auth<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * @description Login and retrieve an authentication token <br /><br /> <b>Authentication:</b> not required
   *
   * @tags auth
   * @name LoginCreate
   * @summary Login and retrieve an authentication token
   * @request POST:/auth/login
   */
  loginCreate = (data: LoginCreatePayload, params: RequestParams = {}) =>
    this.request<LoginCreateData, void>({
      path: `/auth/login`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Get the record belonging to the authentication token <br /><br /> <b>Authentication:</b> required
   *
   * @tags auth
   * @name GetAuth
   * @summary Get the record belonging to the authentication token
   * @request GET:/auth/me
   * @secure
   */
  getAuth = (params: RequestParams = {}) =>
    this.request<GetAuthData, void>({
      path: `/auth/me`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description Signup and retrieve an authentication token <br /><br /> <b>Authentication:</b> not required
   *
   * @tags auth
   * @name SignupCreate
   * @summary Signup and retrieve an authentication token
   * @request POST:/auth/signup
   */
  signupCreate = (data: SignupCreatePayload, params: RequestParams = {}) =>
    this.request<SignupCreateData, void>({
      path: `/auth/signup`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
}
