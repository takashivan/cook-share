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
  PaymentsCreateData,
  PaymentsCreatePayload,
  PaymentsDeleteData,
  PaymentsDetailData,
  PaymentsListData,
  PaymentsPartialUpdateData,
  PaymentsPartialUpdatePayload,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Payments<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * @description Delete payment record. <br /><br /> <b>Authentication:</b> not required
   *
   * @tags payments
   * @name PaymentsDelete
   * @summary Delete payment record.
   * @request DELETE:/payments/{payment_id}
   */
  paymentsDelete = (paymentId: number, params: RequestParams = {}) =>
    this.request<PaymentsDeleteData, void>({
      path: `/payments/${paymentId}`,
      method: "DELETE",
      format: "json",
      ...params,
    });
  /**
   * @description Get payment record <br /><br /> <b>Authentication:</b> not required
   *
   * @tags payments
   * @name PaymentsDetail
   * @summary Get payment record
   * @request GET:/payments/{payment_id}
   */
  paymentsDetail = (paymentId: number, params: RequestParams = {}) =>
    this.request<PaymentsDetailData, void>({
      path: `/payments/${paymentId}`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * @description Edit payment record <br /><br /> <b>Authentication:</b> not required
   *
   * @tags payments
   * @name PaymentsPartialUpdate
   * @summary Edit payment record
   * @request PATCH:/payments/{payment_id}
   */
  paymentsPartialUpdate = (paymentId: number, data: PaymentsPartialUpdatePayload, params: RequestParams = {}) =>
    this.request<PaymentsPartialUpdateData, void>({
      path: `/payments/${paymentId}`,
      method: "PATCH",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Query all payment records <br /><br /> <b>Authentication:</b> not required
   *
   * @tags payments
   * @name PaymentsList
   * @summary Query all payment records
   * @request GET:/payments
   */
  paymentsList = (params: RequestParams = {}) =>
    this.request<PaymentsListData, void>({
      path: `/payments`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * @description Add payment record <br /><br /> <b>Authentication:</b> not required
   *
   * @tags payments
   * @name PaymentsCreate
   * @summary Add payment record
   * @request POST:/payments
   */
  paymentsCreate = (data: PaymentsCreatePayload, params: RequestParams = {}) =>
    this.request<PaymentsCreateData, void>({
      path: `/payments`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
}
