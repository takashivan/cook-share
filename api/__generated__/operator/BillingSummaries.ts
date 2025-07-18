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

import { BillingSummariesListData } from "./data-contracts";
import { HttpClient, RequestParams } from "./http-client";

export class BillingSummaries<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description [AUTHED-Operator]運営者だけが見られる、請求一覧 <br /><br /> <b>Authentication:</b> required
   *
   * @tags billing-summaries
   * @name BillingSummariesList
   * @summary [AUTHED-Operator]運営者だけが見られる、請求一覧
   * @request GET:/billing-summaries
   * @secure
   */
  billingSummariesList = (params: RequestParams = {}) =>
    this.request<BillingSummariesListData, void>({
      path: `/billing-summaries`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });

  billingSummariesListQueryArgs = (
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/billing-summaries`] : null;
    const fetcher = () =>
      this.billingSummariesList(params).then((res) => res.data);
    return [key, fetcher] as const;
  };
}
