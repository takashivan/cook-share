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
  AcceptPartialUpdateResult,
  ApplicationsCreateData,
  ApplicationsCreatePayload,
  ApplicationsDeleteData,
  ApplicationsDetailData,
  ApplicationsListData,
  ApplicationsPartialUpdateData,
  ApplicationsPartialUpdatePayload,
  MeComingListData,
  MeComingListParams,
  WorksessionsListData,
  WorksessionsListParams,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Applications<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags applications
   * @name MeComingList
   * @request GET:/applications/me/coming
   */
  meComingList = (query: MeComingListParams, params: RequestParams = {}) =>
    this.request<MeComingListData, void>({
      path: `/applications/me/coming`,
      method: "GET",
      query: query,
      format: "json",
      ...params,
    });

  meComingListQueryArgs = (
    query: MeComingListParams,
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled
      ? [`/applications/me/coming`, ...(query ? [query] : [])]
      : null;
    const fetcher = () =>
      this.meComingList(query, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags applications
   * @name AcceptPartialUpdate
   * @request PATCH:/applications/{application_id}/accept
   */
  acceptPartialUpdate = (applicationId: string, params: RequestParams = {}) =>
    this.request<AcceptPartialUpdateResult, void>({
      path: `/applications/${applicationId}/accept`,
      method: "PATCH",
      format: "json",
      ...params,
    });

  acceptPartialUpdateQueryArgs = (
    applicationId: string,
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/applications/${applicationId}/accept`] : null;
    const fetcher: (url: string[]) => Promise<AcceptPartialUpdateResult> = (
      _,
    ) =>
      this.acceptPartialUpdate(applicationId, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags applications
   * @name WorksessionsList
   * @request GET:/applications/{application_id}/worksessions
   */
  worksessionsList = (
    { applicationId, ...query }: WorksessionsListParams,
    params: RequestParams = {},
  ) =>
    this.request<WorksessionsListData, void>({
      path: `/applications/${applicationId}/worksessions`,
      method: "GET",
      query: query,
      format: "json",
      ...params,
    });

  worksessionsListQueryArgs = (
    { applicationId, ...query }: WorksessionsListParams,
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled
      ? [
          `/applications/${applicationId}/worksessions`,
          ...(query ? [query] : []),
        ]
      : null;
    const fetcher = () =>
      this.worksessionsList({ applicationId, ...query }, params).then(
        (res) => res.data,
      );
    return [key, fetcher] as const;
  };

  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags applications
   * @name ApplicationsDelete
   * @request DELETE:/applications/{application_id}
   */
  applicationsDelete = (applicationId: string, params: RequestParams = {}) =>
    this.request<ApplicationsDeleteData, void>({
      path: `/applications/${applicationId}`,
      method: "DELETE",
      format: "json",
      ...params,
    });

  applicationsDeleteQueryArgs = (
    applicationId: string,
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/applications/${applicationId}`] : null;
    const fetcher = () =>
      this.applicationsDelete(applicationId, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags applications
   * @name ApplicationsDetail
   * @request GET:/applications/{application_id}
   */
  applicationsDetail = (applicationId: string, params: RequestParams = {}) =>
    this.request<ApplicationsDetailData, void>({
      path: `/applications/${applicationId}`,
      method: "GET",
      format: "json",
      ...params,
    });

  applicationsDetailQueryArgs = (
    applicationId: string,
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/applications/${applicationId}`] : null;
    const fetcher = () =>
      this.applicationsDetail(applicationId, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags applications
   * @name ApplicationsPartialUpdate
   * @request PATCH:/applications/{application_id}
   */
  applicationsPartialUpdate = (
    applicationId: string,
    data: ApplicationsPartialUpdatePayload,
    params: RequestParams = {},
  ) =>
    this.request<ApplicationsPartialUpdateData, void>({
      path: `/applications/${applicationId}`,
      method: "PATCH",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });

  applicationsPartialUpdateQueryArgs = (
    applicationId: string,
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/applications/${applicationId}`] : null;
    const fetcher: (
      url: string[],
      { arg }: { arg: ApplicationsPartialUpdatePayload },
    ) => Promise<ApplicationsPartialUpdateData> = (_, { arg }) =>
      this.applicationsPartialUpdate(applicationId, arg, params).then(
        (res) => res.data,
      );
    return [key, fetcher] as const;
  };

  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags applications
   * @name ApplicationsList
   * @request GET:/applications
   */
  applicationsList = (params: RequestParams = {}) =>
    this.request<ApplicationsListData, void>({
      path: `/applications`,
      method: "GET",
      format: "json",
      ...params,
    });

  applicationsListQueryArgs = (
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/applications`] : null;
    const fetcher = () => this.applicationsList(params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags applications
   * @name ApplicationsCreate
   * @request POST:/applications
   */
  applicationsCreate = (
    data: ApplicationsCreatePayload,
    params: RequestParams = {},
  ) =>
    this.request<ApplicationsCreateData, void>({
      path: `/applications`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });

  applicationsCreateQueryArgs = (
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/applications`] : null;
    const fetcher: (
      url: string[],
      { arg }: { arg: ApplicationsCreatePayload },
    ) => Promise<ApplicationsCreateData> = (_, { arg }) =>
      this.applicationsCreate(arg, params).then((res) => res.data);
    return [key, fetcher] as const;
  };
}
