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
  ChangePasswordCreateData,
  ChangePasswordCreatePayload,
  GetAuthData,
  LoginCreateData,
  LoginCreatePayload,
  SignupCreateData,
  SignupCreatePayload,
  VerifyEmailCreateData,
  VerifyEmailCreatePayload,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Auth<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * @description <br /><br /> <b>Authentication:</b> required
   *
   * @tags auth
   * @name ChangePasswordCreate
   * @request POST:/auth/change-password
   * @secure
   */
  changePasswordCreate = (data: ChangePasswordCreatePayload, params: RequestParams = {}) =>
    this.request<ChangePasswordCreateData, void>({
      path: `/auth/change-password`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });

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

  getAuthQueryArgs = (params: RequestParams = {}, enabled: boolean = true) => {
    const key = enabled ? [`/auth/me`] : null;
    const fetcher = () => this.getAuth(params).then((res) => res.data);
    return [key, fetcher] as const;
  };

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

  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags auth
   * @name VerifyEmailCreate
   * @request POST:/auth/verify-email
   */
  verifyEmailCreate = (data: VerifyEmailCreatePayload, params: RequestParams = {}) =>
    this.request<VerifyEmailCreateData, void>({
      path: `/auth/verify-email`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
}
