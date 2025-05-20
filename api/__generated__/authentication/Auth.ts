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
  ChangePasswordCreateData,
  ChangePasswordCreatePayload,
  GetAuthData,
  LoginCreateData,
  LoginCreatePayload,
  RequestPasswordResetCreateData,
  RequestPasswordResetCreatePayload,
  ResendVerificationCreateData,
  ResendVerificationCreatePayload,
  ResetPasswordCreateData,
  ResetPasswordCreatePayload,
  SignupCreateData,
  SignupCreatePayload,
  UpdateEmailCreateData,
  UpdateEmailCreatePayload,
  VerifyEmailCreateData,
  VerifyEmailCreatePayload,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Auth<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags auth
   * @name ChangePasswordCreate
   * @request POST:/auth/change-password
   */
  changePasswordCreate = (
    data: ChangePasswordCreatePayload,
    params: RequestParams = {},
  ) =>
    this.request<ChangePasswordCreateData, void>({
      path: `/auth/change-password`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });

  changePasswordCreateQueryArgs = (
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/auth/change-password`] : null;
    const fetcher: (
      url: string[],
      { arg }: { arg: ChangePasswordCreatePayload },
    ) => Promise<ChangePasswordCreateData> = (_, { arg }) =>
      this.changePasswordCreate(arg, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

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

  loginCreateQueryArgs = (
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/auth/login`] : null;
    const fetcher: (
      url: string[],
      { arg }: { arg: LoginCreatePayload },
    ) => Promise<LoginCreateData> = (_, { arg }) =>
      this.loginCreate(arg, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description Get the user record belonging to the authentication token <br /><br /> <b>Authentication:</b> not required
   *
   * @tags auth
   * @name GetAuth
   * @summary Get the user record belonging to the authentication token
   * @request GET:/auth/me
   */
  getAuth = (params: RequestParams = {}) =>
    this.request<GetAuthData, void>({
      path: `/auth/me`,
      method: "GET",
      format: "json",
      ...params,
    });

  getAuthQueryArgs = (params: RequestParams = {}, enabled: boolean = true) => {
    const key = enabled ? [`/auth/me`] : null;
    const fetcher = () => this.getAuth(params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags auth
   * @name RequestPasswordResetCreate
   * @request POST:/auth/request-password-reset
   */
  requestPasswordResetCreate = (
    data: RequestPasswordResetCreatePayload,
    params: RequestParams = {},
  ) =>
    this.request<RequestPasswordResetCreateData, void>({
      path: `/auth/request-password-reset`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });

  requestPasswordResetCreateQueryArgs = (
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/auth/request-password-reset`] : null;
    const fetcher: (
      url: string[],
      { arg }: { arg: RequestPasswordResetCreatePayload },
    ) => Promise<RequestPasswordResetCreateData> = (_, { arg }) =>
      this.requestPasswordResetCreate(arg, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description Signup and retrieve an authentication token <br /><br /> <b>Authentication:</b> not required
   *
   * @tags auth
   * @name ResendVerificationCreate
   * @summary Signup and retrieve an authentication token
   * @request POST:/auth/resend-verification
   */
  resendVerificationCreate = (
    data: ResendVerificationCreatePayload,
    params: RequestParams = {},
  ) =>
    this.request<ResendVerificationCreateData, void>({
      path: `/auth/resend-verification`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });

  resendVerificationCreateQueryArgs = (
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/auth/resend-verification`] : null;
    const fetcher: (
      url: string[],
      { arg }: { arg: ResendVerificationCreatePayload },
    ) => Promise<ResendVerificationCreateData> = (_, { arg }) =>
      this.resendVerificationCreate(arg, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags auth
   * @name ResetPasswordCreate
   * @request POST:/auth/reset-password
   */
  resetPasswordCreate = (
    data: ResetPasswordCreatePayload,
    params: RequestParams = {},
  ) =>
    this.request<ResetPasswordCreateData, void>({
      path: `/auth/reset-password`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });

  resetPasswordCreateQueryArgs = (
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/auth/reset-password`] : null;
    const fetcher: (
      url: string[],
      { arg }: { arg: ResetPasswordCreatePayload },
    ) => Promise<ResetPasswordCreateData> = (_, { arg }) =>
      this.resetPasswordCreate(arg, params).then((res) => res.data);
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

  signupCreateQueryArgs = (
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/auth/signup`] : null;
    const fetcher: (
      url: string[],
      { arg }: { arg: SignupCreatePayload },
    ) => Promise<SignupCreateData> = (_, { arg }) =>
      this.signupCreate(arg, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags auth
   * @name UpdateEmailCreate
   * @request POST:/auth/update-email
   */
  updateEmailCreate = (
    data: UpdateEmailCreatePayload,
    params: RequestParams = {},
  ) =>
    this.request<UpdateEmailCreateData, void>({
      path: `/auth/update-email`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });

  updateEmailCreateQueryArgs = (
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/auth/update-email`] : null;
    const fetcher: (
      url: string[],
      { arg }: { arg: UpdateEmailCreatePayload },
    ) => Promise<UpdateEmailCreateData> = (_, { arg }) =>
      this.updateEmailCreate(arg, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags auth
   * @name VerifyEmailCreate
   * @request POST:/auth/verify-email
   */
  verifyEmailCreate = (
    data: VerifyEmailCreatePayload,
    params: RequestParams = {},
  ) =>
    this.request<VerifyEmailCreateData, void>({
      path: `/auth/verify-email`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });

  verifyEmailCreateQueryArgs = (
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/auth/verify-email`] : null;
    const fetcher: (
      url: string[],
      { arg }: { arg: VerifyEmailCreatePayload },
    ) => Promise<VerifyEmailCreateData> = (_, { arg }) =>
      this.verifyEmailCreate(arg, params).then((res) => res.data);
    return [key, fetcher] as const;
  };
}
