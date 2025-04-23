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
  BillingSummaryCreateData,
  BillingSummaryCreatePayload,
  BillingSummaryDeleteData,
  BillingSummaryDetailData,
  BillingSummaryListData,
  BillingSummaryPartialUpdateData,
  BillingSummaryPartialUpdatePayload,
  BillingSummaryUpdateData,
  BillingSummaryUpdatePayload,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class BillingSummary<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags billing_summary
   * @name BillingSummaryDelete
   * @request DELETE:/billing_summary/{billing_summary_id}
   */
  billingSummaryDelete = (billingSummaryId: string, params: RequestParams = {}) =>
    this.request<BillingSummaryDeleteData, void>({
      path: `/billing_summary/${billingSummaryId}`,
      method: "DELETE",
      format: "json",
      ...params,
    });

  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags billing_summary
   * @name BillingSummaryDetail
   * @request GET:/billing_summary/{billing_summary_id}
   */
  billingSummaryDetail = (billingSummaryId: string, params: RequestParams = {}) =>
    this.request<BillingSummaryDetailData, void>({
      path: `/billing_summary/${billingSummaryId}`,
      method: "GET",
      format: "json",
      ...params,
    });

  billingSummaryDetailQueryArgs = (billingSummaryId: string, params: RequestParams = {}, enabled: boolean = true) => {
    const key = enabled ? [`/billing_summary/${billingSummaryId}`] : null;
    const fetcher = () => this.billingSummaryDetail(billingSummaryId, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags billing_summary
   * @name BillingSummaryPartialUpdate
   * @request PATCH:/billing_summary/{billing_summary_id}
   */
  billingSummaryPartialUpdate = (
    billingSummaryId: string,
    data: BillingSummaryPartialUpdatePayload,
    params: RequestParams = {},
  ) =>
    this.request<BillingSummaryPartialUpdateData, void>({
      path: `/billing_summary/${billingSummaryId}`,
      method: "PATCH",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });

  billingSummaryPartialUpdateQueryArgs = (
    billingSummaryId: string,
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/billing_summary/${billingSummaryId}`] : null;
    const fetcher: (
      url: string[],
      { arg }: { arg: BillingSummaryPartialUpdatePayload },
    ) => Promise<BillingSummaryPartialUpdateData> = (_, { arg }) =>
      this.billingSummaryPartialUpdate(billingSummaryId, arg, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags billing_summary
   * @name BillingSummaryUpdate
   * @request PUT:/billing_summary/{billing_summary_id}
   */
  billingSummaryUpdate = (billingSummaryId: string, data: BillingSummaryUpdatePayload, params: RequestParams = {}) =>
    this.request<BillingSummaryUpdateData, void>({
      path: `/billing_summary/${billingSummaryId}`,
      method: "PUT",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });

  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags billing_summary
   * @name BillingSummaryList
   * @request GET:/billing_summary
   */
  billingSummaryList = (params: RequestParams = {}) =>
    this.request<BillingSummaryListData, void>({
      path: `/billing_summary`,
      method: "GET",
      format: "json",
      ...params,
    });

  billingSummaryListQueryArgs = (params: RequestParams = {}, enabled: boolean = true) => {
    const key = enabled ? [`/billing_summary`] : null;
    const fetcher = () => this.billingSummaryList(params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags billing_summary
   * @name BillingSummaryCreate
   * @request POST:/billing_summary
   */
  billingSummaryCreate = (data: BillingSummaryCreatePayload, params: RequestParams = {}) =>
    this.request<BillingSummaryCreateData, void>({
      path: `/billing_summary`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });

  billingSummaryCreateQueryArgs = (params: RequestParams = {}, enabled: boolean = true) => {
    const key = enabled ? [`/billing_summary`] : null;
    const fetcher: (
      url: string[],
      { arg }: { arg: BillingSummaryCreatePayload },
    ) => Promise<BillingSummaryCreateData> = (_, { arg }) =>
      this.billingSummaryCreate(arg, params).then((res) => res.data);
    return [key, fetcher] as const;
  };
}
