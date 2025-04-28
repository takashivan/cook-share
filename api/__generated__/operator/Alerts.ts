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
  AlertsCreateData,
  AlertsCreatePayload,
  AlertsDeleteData,
  AlertsDetailData,
  AlertsListData,
  AlertsPartialUpdateData,
  AlertsPartialUpdatePayload,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Alerts<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description Delete alert record. <br /><br /> <b>Authentication:</b> not required
   *
   * @tags alerts
   * @name AlertsDelete
   * @summary Delete alert record.
   * @request DELETE:/alerts/{alert_id}
   */
  alertsDelete = (alertId: number, params: RequestParams = {}) =>
    this.request<AlertsDeleteData, void>({
      path: `/alerts/${alertId}`,
      method: "DELETE",
      format: "json",
      ...params,
    });

  alertsDeleteQueryArgs = (
    alertId: number,
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/alerts/${alertId}`] : null;
    const fetcher = () =>
      this.alertsDelete(alertId, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description Get alert record <br /><br /> <b>Authentication:</b> not required
   *
   * @tags alerts
   * @name AlertsDetail
   * @summary Get alert record
   * @request GET:/alerts/{alert_id}
   */
  alertsDetail = (alertId: number, params: RequestParams = {}) =>
    this.request<AlertsDetailData, void>({
      path: `/alerts/${alertId}`,
      method: "GET",
      format: "json",
      ...params,
    });

  alertsDetailQueryArgs = (
    alertId: number,
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/alerts/${alertId}`] : null;
    const fetcher = () =>
      this.alertsDetail(alertId, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description Edit alert record <br /><br /> <b>Authentication:</b> not required
   *
   * @tags alerts
   * @name AlertsPartialUpdate
   * @summary Edit alert record
   * @request PATCH:/alerts/{alert_id}
   */
  alertsPartialUpdate = (
    alertId: number,
    data: AlertsPartialUpdatePayload,
    params: RequestParams = {},
  ) =>
    this.request<AlertsPartialUpdateData, void>({
      path: `/alerts/${alertId}`,
      method: "PATCH",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });

  alertsPartialUpdateQueryArgs = (
    alertId: number,
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/alerts/${alertId}`] : null;
    const fetcher: (
      url: string[],
      { arg }: { arg: AlertsPartialUpdatePayload },
    ) => Promise<AlertsPartialUpdateData> = (_, { arg }) =>
      this.alertsPartialUpdate(alertId, arg, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description Query all alert records <br /><br /> <b>Authentication:</b> not required
   *
   * @tags alerts
   * @name AlertsList
   * @summary Query all alert records
   * @request GET:/alerts
   */
  alertsList = (params: RequestParams = {}) =>
    this.request<AlertsListData, void>({
      path: `/alerts`,
      method: "GET",
      format: "json",
      ...params,
    });

  alertsListQueryArgs = (
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/alerts`] : null;
    const fetcher = () => this.alertsList(params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description Add alert record <br /><br /> <b>Authentication:</b> not required
   *
   * @tags alerts
   * @name AlertsCreate
   * @summary Add alert record
   * @request POST:/alerts
   */
  alertsCreate = (data: AlertsCreatePayload, params: RequestParams = {}) =>
    this.request<AlertsCreateData, void>({
      path: `/alerts`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });

  alertsCreateQueryArgs = (
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/alerts`] : null;
    const fetcher: (
      url: string[],
      { arg }: { arg: AlertsCreatePayload },
    ) => Promise<AlertsCreateData> = (_, { arg }) =>
      this.alertsCreate(arg, params).then((res) => res.data);
    return [key, fetcher] as const;
  };
}
