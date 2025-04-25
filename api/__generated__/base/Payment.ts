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
  PaymentCreateData,
  PaymentCreatePayload,
  PaymentDeleteData,
  PaymentDetailData,
  PaymentListData,
  PaymentPartialUpdateData,
  PaymentPartialUpdatePayload,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Payment<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * @description Delete payment record. <br /><br /> <b>Authentication:</b> not required
   *
   * @tags payment
   * @name PaymentDelete
   * @summary Delete payment record.
   * @request DELETE:/payment/{payment_id}
   */
  paymentDelete = (paymentId: number, params: RequestParams = {}) =>
    this.request<PaymentDeleteData, void>({
      path: `/payment/${paymentId}`,
      method: "DELETE",
      format: "json",
      ...params,
    });

  paymentDeleteQueryArgs = (paymentId: number, params: RequestParams = {}, enabled: boolean = true) => {
    const key = enabled ? [`/payment/${paymentId}`] : null;
    const fetcher = () => this.paymentDelete(paymentId, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description Get payment record <br /><br /> <b>Authentication:</b> not required
   *
   * @tags payment
   * @name PaymentDetail
   * @summary Get payment record
   * @request GET:/payment/{payment_id}
   */
  paymentDetail = (paymentId: number, params: RequestParams = {}) =>
    this.request<PaymentDetailData, void>({
      path: `/payment/${paymentId}`,
      method: "GET",
      format: "json",
      ...params,
    });

  paymentDetailQueryArgs = (paymentId: number, params: RequestParams = {}, enabled: boolean = true) => {
    const key = enabled ? [`/payment/${paymentId}`] : null;
    const fetcher = () => this.paymentDetail(paymentId, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description Edit payment record <br /><br /> <b>Authentication:</b> not required
   *
   * @tags payment
   * @name PaymentPartialUpdate
   * @summary Edit payment record
   * @request PATCH:/payment/{payment_id}
   */
  paymentPartialUpdate = (paymentId: number, data: PaymentPartialUpdatePayload, params: RequestParams = {}) =>
    this.request<PaymentPartialUpdateData, void>({
      path: `/payment/${paymentId}`,
      method: "PATCH",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });

  paymentPartialUpdateQueryArgs = (paymentId: number, params: RequestParams = {}, enabled: boolean = true) => {
    const key = enabled ? [`/payment/${paymentId}`] : null;
    const fetcher: (
      url: string[],
      { arg }: { arg: PaymentPartialUpdatePayload },
    ) => Promise<PaymentPartialUpdateData> = (_, { arg }) =>
      this.paymentPartialUpdate(paymentId, arg, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description Query all payment records <br /><br /> <b>Authentication:</b> not required
   *
   * @tags payment
   * @name PaymentList
   * @summary Query all payment records
   * @request GET:/payment
   */
  paymentList = (params: RequestParams = {}) =>
    this.request<PaymentListData, void>({
      path: `/payment`,
      method: "GET",
      format: "json",
      ...params,
    });

  paymentListQueryArgs = (params: RequestParams = {}, enabled: boolean = true) => {
    const key = enabled ? [`/payment`] : null;
    const fetcher = () => this.paymentList(params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description Add payment record <br /><br /> <b>Authentication:</b> not required
   *
   * @tags payment
   * @name PaymentCreate
   * @summary Add payment record
   * @request POST:/payment
   */
  paymentCreate = (data: PaymentCreatePayload, params: RequestParams = {}) =>
    this.request<PaymentCreateData, void>({
      path: `/payment`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });

  paymentCreateQueryArgs = (params: RequestParams = {}, enabled: boolean = true) => {
    const key = enabled ? [`/payment`] : null;
    const fetcher: (url: string[], { arg }: { arg: PaymentCreatePayload }) => Promise<PaymentCreateData> = (
      _,
      { arg },
    ) => this.paymentCreate(arg, params).then((res) => res.data);
    return [key, fetcher] as const;
  };
}
