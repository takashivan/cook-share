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
  AcceptPartialUpdateData,
  ApplicationCreateData,
  ApplicationCreatePayload,
  ApplicationDeleteData,
  ApplicationDetailData,
  ApplicationListData,
  ApplicationPartialUpdateData,
  ApplicationPartialUpdatePayload,
  ApplicationUpdateData,
  ApplicationUpdatePayload,
  GetApplication2Data,
  GetApplicationData,
  MyComingDetailData,
  RejectPartialUpdateData,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Application<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags application
   * @name GetApplication
   * @request GET:/application/job/{job_id}
   */
  getApplication = (jobId: number, params: RequestParams = {}) =>
    this.request<GetApplicationData, void>({
      path: `/application/job/${jobId}`,
      method: "GET",
      format: "json",
      ...params,
    });

  getApplicationQueryArgs = (
    jobId: number,
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/application/job/${jobId}`] : null;
    const fetcher = () =>
      this.getApplication(jobId, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags application
   * @name MyComingDetail
   * @request GET:/application/my/coming/{user_id}
   */
  myComingDetail = (userId: string, params: RequestParams = {}) =>
    this.request<MyComingDetailData, void>({
      path: `/application/my/coming/${userId}`,
      method: "GET",
      format: "json",
      ...params,
    });

  myComingDetailQueryArgs = (
    userId: string,
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/application/my/coming/${userId}`] : null;
    const fetcher = () =>
      this.myComingDetail(userId, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags application
   * @name GetApplication2
   * @request GET:/application/my/{user_id}
   * @originalName getApplication
   * @duplicate
   */
  getApplication2 = (userId: string, params: RequestParams = {}) =>
    this.request<GetApplication2Data, void>({
      path: `/application/my/${userId}`,
      method: "GET",
      format: "json",
      ...params,
    });

  getApplication2QueryArgs = (
    userId: string,
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/application/my/${userId}`] : null;
    const fetcher = () =>
      this.getApplication2(userId, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags application
   * @name AcceptPartialUpdate
   * @request PATCH:/application/{application_id}/accept
   */
  acceptPartialUpdate = (applicationId: string, params: RequestParams = {}) =>
    this.request<AcceptPartialUpdateData, void>({
      path: `/application/${applicationId}/accept`,
      method: "PATCH",
      format: "json",
      ...params,
    });

  acceptPartialUpdateQueryArgs = (
    applicationId: string,
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/application/${applicationId}/accept`] : null;
    const fetcher: (url: string[]) => Promise<AcceptPartialUpdateData> = (_) =>
      this.acceptPartialUpdate(applicationId, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags application
   * @name RejectPartialUpdate
   * @request PATCH:/application/{application_id}/reject
   */
  rejectPartialUpdate = (applicationId: string, params: RequestParams = {}) =>
    this.request<RejectPartialUpdateData, void>({
      path: `/application/${applicationId}/reject`,
      method: "PATCH",
      format: "json",
      ...params,
    });

  rejectPartialUpdateQueryArgs = (
    applicationId: string,
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/application/${applicationId}/reject`] : null;
    const fetcher: (url: string[]) => Promise<RejectPartialUpdateData> = (_) =>
      this.rejectPartialUpdate(applicationId, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags application
   * @name ApplicationDelete
   * @request DELETE:/application/{application_id}
   */
  applicationDelete = (applicationId: string, params: RequestParams = {}) =>
    this.request<ApplicationDeleteData, void>({
      path: `/application/${applicationId}`,
      method: "DELETE",
      format: "json",
      ...params,
    });

  applicationDeleteQueryArgs = (
    applicationId: string,
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/application/${applicationId}`] : null;
    const fetcher = () =>
      this.applicationDelete(applicationId, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags application
   * @name ApplicationDetail
   * @request GET:/application/{application_id}
   */
  applicationDetail = (applicationId: string, params: RequestParams = {}) =>
    this.request<ApplicationDetailData, void>({
      path: `/application/${applicationId}`,
      method: "GET",
      format: "json",
      ...params,
    });

  applicationDetailQueryArgs = (
    applicationId: string,
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/application/${applicationId}`] : null;
    const fetcher = () =>
      this.applicationDetail(applicationId, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags application
   * @name ApplicationPartialUpdate
   * @request PATCH:/application/{application_id}
   */
  applicationPartialUpdate = (
    applicationId: string,
    data: ApplicationPartialUpdatePayload,
    params: RequestParams = {},
  ) =>
    this.request<ApplicationPartialUpdateData, void>({
      path: `/application/${applicationId}`,
      method: "PATCH",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });

  applicationPartialUpdateQueryArgs = (
    applicationId: string,
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/application/${applicationId}`] : null;
    const fetcher: (
      url: string[],
      { arg }: { arg: ApplicationPartialUpdatePayload },
    ) => Promise<ApplicationPartialUpdateData> = (_, { arg }) =>
      this.applicationPartialUpdate(applicationId, arg, params).then(
        (res) => res.data,
      );
    return [key, fetcher] as const;
  };

  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags application
   * @name ApplicationUpdate
   * @request PUT:/application/{application_id}
   */
  applicationUpdate = (
    applicationId: string,
    data: ApplicationUpdatePayload,
    params: RequestParams = {},
  ) =>
    this.request<ApplicationUpdateData, void>({
      path: `/application/${applicationId}`,
      method: "PUT",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });

  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags application
   * @name ApplicationList
   * @request GET:/application
   */
  applicationList = (params: RequestParams = {}) =>
    this.request<ApplicationListData, void>({
      path: `/application`,
      method: "GET",
      format: "json",
      ...params,
    });

  applicationListQueryArgs = (
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/application`] : null;
    const fetcher = () => this.applicationList(params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags application
   * @name ApplicationCreate
   * @request POST:/application
   */
  applicationCreate = (
    data: ApplicationCreatePayload,
    params: RequestParams = {},
  ) =>
    this.request<ApplicationCreateData, void>({
      path: `/application`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });

  applicationCreateQueryArgs = (
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/application`] : null;
    const fetcher: (
      url: string[],
      { arg }: { arg: ApplicationCreatePayload },
    ) => Promise<ApplicationCreateData> = (_, { arg }) =>
      this.applicationCreate(arg, params).then((res) => res.data);
    return [key, fetcher] as const;
  };
}
