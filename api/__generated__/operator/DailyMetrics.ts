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
  DailyMetricsCreateData,
  DailyMetricsCreatePayload,
  DailyMetricsDeleteData,
  DailyMetricsDetailData,
  DailyMetricsListData,
  DailyMetricsPartialUpdateData,
  DailyMetricsPartialUpdatePayload,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class DailyMetrics<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description Delete daily_metrics record. <br /><br /> <b>Authentication:</b> not required
   *
   * @tags daily_metrics
   * @name DailyMetricsDelete
   * @summary Delete daily_metrics record.
   * @request DELETE:/daily_metrics/{daily_metrics_id}
   */
  dailyMetricsDelete = (dailyMetricsId: string, params: RequestParams = {}) =>
    this.request<DailyMetricsDeleteData, void>({
      path: `/daily_metrics/${dailyMetricsId}`,
      method: "DELETE",
      format: "json",
      ...params,
    });

  dailyMetricsDeleteQueryArgs = (
    dailyMetricsId: string,
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/daily_metrics/${dailyMetricsId}`] : null;
    const fetcher = () =>
      this.dailyMetricsDelete(dailyMetricsId, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description Get daily_metrics record <br /><br /> <b>Authentication:</b> not required
   *
   * @tags daily_metrics
   * @name DailyMetricsDetail
   * @summary Get daily_metrics record
   * @request GET:/daily_metrics/{daily_metrics_id}
   */
  dailyMetricsDetail = (dailyMetricsId: string, params: RequestParams = {}) =>
    this.request<DailyMetricsDetailData, void>({
      path: `/daily_metrics/${dailyMetricsId}`,
      method: "GET",
      format: "json",
      ...params,
    });

  dailyMetricsDetailQueryArgs = (
    dailyMetricsId: string,
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/daily_metrics/${dailyMetricsId}`] : null;
    const fetcher = () =>
      this.dailyMetricsDetail(dailyMetricsId, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description Edit daily_metrics record <br /><br /> <b>Authentication:</b> not required
   *
   * @tags daily_metrics
   * @name DailyMetricsPartialUpdate
   * @summary Edit daily_metrics record
   * @request PATCH:/daily_metrics/{daily_metrics_id}
   */
  dailyMetricsPartialUpdate = (
    dailyMetricsId: string,
    data: DailyMetricsPartialUpdatePayload,
    params: RequestParams = {},
  ) =>
    this.request<DailyMetricsPartialUpdateData, void>({
      path: `/daily_metrics/${dailyMetricsId}`,
      method: "PATCH",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });

  dailyMetricsPartialUpdateQueryArgs = (
    dailyMetricsId: string,
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/daily_metrics/${dailyMetricsId}`] : null;
    const fetcher: (
      url: string[],
      { arg }: { arg: DailyMetricsPartialUpdatePayload },
    ) => Promise<DailyMetricsPartialUpdateData> = (_, { arg }) =>
      this.dailyMetricsPartialUpdate(dailyMetricsId, arg, params).then(
        (res) => res.data,
      );
    return [key, fetcher] as const;
  };

  /**
   * @description Query all daily_metrics records <br /><br /> <b>Authentication:</b> not required
   *
   * @tags daily_metrics
   * @name DailyMetricsList
   * @summary Query all daily_metrics records
   * @request GET:/daily_metrics
   */
  dailyMetricsList = (params: RequestParams = {}) =>
    this.request<DailyMetricsListData, void>({
      path: `/daily_metrics`,
      method: "GET",
      format: "json",
      ...params,
    });

  dailyMetricsListQueryArgs = (
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/daily_metrics`] : null;
    const fetcher = () => this.dailyMetricsList(params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description Add daily_metrics record <br /><br /> <b>Authentication:</b> not required
   *
   * @tags daily_metrics
   * @name DailyMetricsCreate
   * @summary Add daily_metrics record
   * @request POST:/daily_metrics
   */
  dailyMetricsCreate = (
    data: DailyMetricsCreatePayload,
    params: RequestParams = {},
  ) =>
    this.request<DailyMetricsCreateData, void>({
      path: `/daily_metrics`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });

  dailyMetricsCreateQueryArgs = (
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/daily_metrics`] : null;
    const fetcher: (
      url: string[],
      { arg }: { arg: DailyMetricsCreatePayload },
    ) => Promise<DailyMetricsCreateData> = (_, { arg }) =>
      this.dailyMetricsCreate(arg, params).then((res) => res.data);
    return [key, fetcher] as const;
  };
}
