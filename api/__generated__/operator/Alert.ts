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
  AlertCreateData,
  AlertCreatePayload,
  AlertDeleteData,
  AlertDetailData,
  AlertListData,
  AlertPartialUpdateData,
  AlertPartialUpdatePayload,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Alert<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description Delete alert record. <br /><br /> <b>Authentication:</b> not required
   *
   * @tags alert
   * @name AlertDelete
   * @summary Delete alert record.
   * @request DELETE:/alert/{alert_id}
   */
  alertDelete = (alertId: number, params: RequestParams = {}) =>
    this.request<AlertDeleteData, void>({
      path: `/alert/${alertId}`,
      method: "DELETE",
      format: "json",
      ...params,
    });

  alertDeleteQueryArgs = (
    alertId: number,
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/alert/${alertId}`] : null;
    const fetcher = () =>
      this.alertDelete(alertId, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description Get alert record <br /><br /> <b>Authentication:</b> not required
   *
   * @tags alert
   * @name AlertDetail
   * @summary Get alert record
   * @request GET:/alert/{alert_id}
   */
  alertDetail = (alertId: number, params: RequestParams = {}) =>
    this.request<AlertDetailData, void>({
      path: `/alert/${alertId}`,
      method: "GET",
      format: "json",
      ...params,
    });

  alertDetailQueryArgs = (
    alertId: number,
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/alert/${alertId}`] : null;
    const fetcher = () =>
      this.alertDetail(alertId, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description Edit alert record <br /><br /> <b>Authentication:</b> not required
   *
   * @tags alert
   * @name AlertPartialUpdate
   * @summary Edit alert record
   * @request PATCH:/alert/{alert_id}
   */
  alertPartialUpdate = (
    alertId: number,
    data: AlertPartialUpdatePayload,
    params: RequestParams = {},
  ) =>
    this.request<AlertPartialUpdateData, void>({
      path: `/alert/${alertId}`,
      method: "PATCH",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });

  alertPartialUpdateQueryArgs = (
    alertId: number,
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/alert/${alertId}`] : null;
    const fetcher: (
      url: string[],
      { arg }: { arg: AlertPartialUpdatePayload },
    ) => Promise<AlertPartialUpdateData> = (_, { arg }) =>
      this.alertPartialUpdate(alertId, arg, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description Query all alert records <br /><br /> <b>Authentication:</b> not required
   *
   * @tags alert
   * @name AlertList
   * @summary Query all alert records
   * @request GET:/alert
   */
  alertList = (params: RequestParams = {}) =>
    this.request<AlertListData, void>({
      path: `/alert`,
      method: "GET",
      format: "json",
      ...params,
    });

  alertListQueryArgs = (
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/alert`] : null;
    const fetcher = () => this.alertList(params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description Add alert record <br /><br /> <b>Authentication:</b> not required
   *
   * @tags alert
   * @name AlertCreate
   * @summary Add alert record
   * @request POST:/alert
   */
  alertCreate = (data: AlertCreatePayload, params: RequestParams = {}) =>
    this.request<AlertCreateData, void>({
      path: `/alert`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });

  alertCreateQueryArgs = (
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/alert`] : null;
    const fetcher: (
      url: string[],
      { arg }: { arg: AlertCreatePayload },
    ) => Promise<AlertCreateData> = (_, { arg }) =>
      this.alertCreate(arg, params).then((res) => res.data);
    return [key, fetcher] as const;
  };
}
