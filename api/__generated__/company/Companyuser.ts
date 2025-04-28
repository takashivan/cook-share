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
  CompanyDetailData,
  CompanyuserCreateData,
  CompanyuserCreatePayload,
  CompanyuserDeleteData,
  CompanyuserDetailData,
  CompanyuserListData,
  CompanyuserPartialUpdateData,
  CompanyuserPartialUpdatePayload,
  EmailChangeCreateData,
  EmailChangeCreatePayload,
  EmailConfirmCreateData,
  EmailConfirmCreatePayload,
  RestaurantsDetailData,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Companyuser<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags companyuser
   * @name CompanyDetail
   * @request GET:/companyuser/company/{companies_id}
   */
  companyDetail = (companiesId: string, params: RequestParams = {}) =>
    this.request<CompanyDetailData, void>({
      path: `/companyuser/company/${companiesId}`,
      method: "GET",
      format: "json",
      ...params,
    });

  companyDetailQueryArgs = (
    companiesId: string,
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/companyuser/company/${companiesId}`] : null;
    const fetcher = () =>
      this.companyDetail(companiesId, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description <br /><br /> <b>Authentication:</b> required
   *
   * @tags companyuser
   * @name EmailChangeCreate
   * @request POST:/companyuser/email/change
   * @secure
   */
  emailChangeCreate = (
    data: EmailChangeCreatePayload,
    params: RequestParams = {},
  ) =>
    this.request<EmailChangeCreateData, void>({
      path: `/companyuser/email/change`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });

  emailChangeCreateQueryArgs = (
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/companyuser/email/change`] : null;
    const fetcher: (
      url: string[],
      { arg }: { arg: EmailChangeCreatePayload },
    ) => Promise<EmailChangeCreateData> = (_, { arg }) =>
      this.emailChangeCreate(arg, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description <br /><br /> <b>Authentication:</b> required
   *
   * @tags companyuser
   * @name EmailConfirmCreate
   * @request POST:/companyuser/email/confirm
   * @secure
   */
  emailConfirmCreate = (
    data: EmailConfirmCreatePayload,
    params: RequestParams = {},
  ) =>
    this.request<EmailConfirmCreateData, void>({
      path: `/companyuser/email/confirm`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });

  emailConfirmCreateQueryArgs = (
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/companyuser/email/confirm`] : null;
    const fetcher: (
      url: string[],
      { arg }: { arg: EmailConfirmCreatePayload },
    ) => Promise<EmailConfirmCreateData> = (_, { arg }) =>
      this.emailConfirmCreate(arg, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags companyuser
   * @name RestaurantsDetail
   * @request GET:/companyuser/restaurants/{companyuser_id}
   */
  restaurantsDetail = (companyuserId: string, params: RequestParams = {}) =>
    this.request<RestaurantsDetailData, void>({
      path: `/companyuser/restaurants/${companyuserId}`,
      method: "GET",
      format: "json",
      ...params,
    });

  restaurantsDetailQueryArgs = (
    companyuserId: string,
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/companyuser/restaurants/${companyuserId}`] : null;
    const fetcher = () =>
      this.restaurantsDetail(companyuserId, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description Delete CompanyUser record. <br /><br /> <b>Authentication:</b> not required
   *
   * @tags companyuser
   * @name CompanyuserDelete
   * @summary Delete CompanyUser record.
   * @request DELETE:/companyuser/{companyuser_id}
   */
  companyuserDelete = (companyuserId: string, params: RequestParams = {}) =>
    this.request<CompanyuserDeleteData, void>({
      path: `/companyuser/${companyuserId}`,
      method: "DELETE",
      format: "json",
      ...params,
    });

  companyuserDeleteQueryArgs = (
    companyuserId: string,
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/companyuser/${companyuserId}`] : null;
    const fetcher = () =>
      this.companyuserDelete(companyuserId, params).then((res) => res.data);
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

  companyuserDetailQueryArgs = (
    companyuserId: string,
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/companyuser/${companyuserId}`] : null;
    const fetcher = () =>
      this.companyuserDetail(companyuserId, params).then((res) => res.data);
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

  companyuserPartialUpdateQueryArgs = (
    companyuserId: string,
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/companyuser/${companyuserId}`] : null;
    const fetcher: (
      url: string[],
      { arg }: { arg: CompanyuserPartialUpdatePayload },
    ) => Promise<CompanyuserPartialUpdateData> = (_, { arg }) =>
      this.companyuserPartialUpdate(companyuserId, arg, params).then(
        (res) => res.data,
      );
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

  companyuserListQueryArgs = (
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
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
  companyuserCreate = (
    data: CompanyuserCreatePayload,
    params: RequestParams = {},
  ) =>
    this.request<CompanyuserCreateData, void>({
      path: `/companyuser`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });

  companyuserCreateQueryArgs = (
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/companyuser`] : null;
    const fetcher: (
      url: string[],
      { arg }: { arg: CompanyuserCreatePayload },
    ) => Promise<CompanyuserCreateData> = (_, { arg }) =>
      this.companyuserCreate(arg, params).then((res) => res.data);
    return [key, fetcher] as const;
  };
}
