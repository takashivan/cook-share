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
  ChefPayoutLogCreateData,
  ChefPayoutLogCreatePayload,
  ChefPayoutLogDeleteData,
  ChefPayoutLogDetailData,
  ChefPayoutLogListData,
  ChefPayoutLogPartialUpdateData,
  ChefPayoutLogPartialUpdatePayload,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class ChefPayoutLog<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * @description Delete chef_payout_log record. <br /><br /> <b>Authentication:</b> not required
   *
   * @tags chef_payout_log
   * @name ChefPayoutLogDelete
   * @summary Delete chef_payout_log record.
   * @request DELETE:/chef_payout_log/{chef_payout_log_id}
   */
  chefPayoutLogDelete = (chefPayoutLogId: string, params: RequestParams = {}) =>
    this.request<ChefPayoutLogDeleteData, void>({
      path: `/chef_payout_log/${chefPayoutLogId}`,
      method: "DELETE",
      format: "json",
      ...params,
    });

  chefPayoutLogDeleteQueryArgs = (chefPayoutLogId: string, params: RequestParams = {}, enabled: boolean = true) => {
    const key = enabled ? [`/chef_payout_log/${chefPayoutLogId}`] : null;
    const fetcher = () => this.chefPayoutLogDelete(chefPayoutLogId, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description Get chef_payout_log record <br /><br /> <b>Authentication:</b> not required
   *
   * @tags chef_payout_log
   * @name ChefPayoutLogDetail
   * @summary Get chef_payout_log record
   * @request GET:/chef_payout_log/{chef_payout_log_id}
   */
  chefPayoutLogDetail = (chefPayoutLogId: string, params: RequestParams = {}) =>
    this.request<ChefPayoutLogDetailData, void>({
      path: `/chef_payout_log/${chefPayoutLogId}`,
      method: "GET",
      format: "json",
      ...params,
    });

  chefPayoutLogDetailQueryArgs = (chefPayoutLogId: string, params: RequestParams = {}, enabled: boolean = true) => {
    const key = enabled ? [`/chef_payout_log/${chefPayoutLogId}`] : null;
    const fetcher = () => this.chefPayoutLogDetail(chefPayoutLogId, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description Edit chef_payout_log record <br /><br /> <b>Authentication:</b> not required
   *
   * @tags chef_payout_log
   * @name ChefPayoutLogPartialUpdate
   * @summary Edit chef_payout_log record
   * @request PATCH:/chef_payout_log/{chef_payout_log_id}
   */
  chefPayoutLogPartialUpdate = (
    chefPayoutLogId: string,
    data: ChefPayoutLogPartialUpdatePayload,
    params: RequestParams = {},
  ) =>
    this.request<ChefPayoutLogPartialUpdateData, void>({
      path: `/chef_payout_log/${chefPayoutLogId}`,
      method: "PATCH",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });

  chefPayoutLogPartialUpdateQueryArgs = (
    chefPayoutLogId: string,
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/chef_payout_log/${chefPayoutLogId}`] : null;
    const fetcher: (
      url: string[],
      { arg }: { arg: ChefPayoutLogPartialUpdatePayload },
    ) => Promise<ChefPayoutLogPartialUpdateData> = (_, { arg }) =>
      this.chefPayoutLogPartialUpdate(chefPayoutLogId, arg, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description Query all chef_payout_log records <br /><br /> <b>Authentication:</b> not required
   *
   * @tags chef_payout_log
   * @name ChefPayoutLogList
   * @summary Query all chef_payout_log records
   * @request GET:/chef_payout_log
   */
  chefPayoutLogList = (params: RequestParams = {}) =>
    this.request<ChefPayoutLogListData, void>({
      path: `/chef_payout_log`,
      method: "GET",
      format: "json",
      ...params,
    });

  chefPayoutLogListQueryArgs = (params: RequestParams = {}, enabled: boolean = true) => {
    const key = enabled ? [`/chef_payout_log`] : null;
    const fetcher = () => this.chefPayoutLogList(params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description Add chef_payout_log record <br /><br /> <b>Authentication:</b> not required
   *
   * @tags chef_payout_log
   * @name ChefPayoutLogCreate
   * @summary Add chef_payout_log record
   * @request POST:/chef_payout_log
   */
  chefPayoutLogCreate = (data: ChefPayoutLogCreatePayload, params: RequestParams = {}) =>
    this.request<ChefPayoutLogCreateData, void>({
      path: `/chef_payout_log`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });

  chefPayoutLogCreateQueryArgs = (params: RequestParams = {}, enabled: boolean = true) => {
    const key = enabled ? [`/chef_payout_log`] : null;
    const fetcher: (url: string[], { arg }: { arg: ChefPayoutLogCreatePayload }) => Promise<ChefPayoutLogCreateData> = (
      _,
      { arg },
    ) => this.chefPayoutLogCreate(arg, params).then((res) => res.data);
    return [key, fetcher] as const;
  };
}
