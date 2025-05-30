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

export type BillingSummaryDeleteData = object;

export interface BillingSummaryDetailData {
  /** @format uuid */
  id: string;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at: number;
  /** @format uuid */
  companies_id: string | null;
  month: string;
  /** @format int64 */
  amount: number;
  /** stripe invoice id */
  invoice_id: string;
  status: "PENDING" | "PAID" | "FAILED";
  fee_rate: number;
  /** @format int64 */
  session_count: number;
  start_date: string;
  end_date: string;
  hosted_invoice_url: string;
  invoice_pdf: string;
  invoice_number: string;
}

export interface BillingSummaryPartialUpdatePayload {
  /** @format uuid */
  companies_id: string | null;
  month: string;
  /** @format int64 */
  amount: number;
  /** stripe invoice id */
  invoice_id: string;
  status: "PENDING" | "PAID" | "FAILED";
  fee_rate: number;
  /** @format int64 */
  session_count: number;
  start_date: string;
  end_date: string;
  hosted_invoice_url: string;
  invoice_pdf: string;
  invoice_number: string;
}

export interface BillingSummaryPartialUpdateData {
  /** @format uuid */
  id: string;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at: number;
  /** @format uuid */
  companies_id: string | null;
  month: string;
  /** @format int64 */
  amount: number;
  /** stripe invoice id */
  invoice_id: string;
  status: "PENDING" | "PAID" | "FAILED";
  fee_rate: number;
  /** @format int64 */
  session_count: number;
  start_date: string;
  end_date: string;
  hosted_invoice_url: string;
  invoice_pdf: string;
  invoice_number: string;
}

export type BillingSummaryListData = {
  /** @format uuid */
  id: string;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at: number;
  /** @format uuid */
  companies_id: string | null;
  month: string;
  /** @format int64 */
  amount: number;
  /** stripe invoice id */
  invoice_id: string;
  status: "PENDING" | "PAID" | "FAILED";
  fee_rate: number;
  /** @format int64 */
  session_count: number;
  start_date: string;
  end_date: string;
  hosted_invoice_url: string;
  invoice_pdf: string;
  invoice_number: string;
}[];

export interface BillingSummaryCreatePayload {
  /** @format uuid */
  companies_id: string | null;
  month: string;
  /** @format int64 */
  amount: number;
  /** stripe invoice id */
  invoice_id: string;
  status: "PENDING" | "PAID" | "FAILED";
  fee_rate: number;
  /** @format int64 */
  session_count: number;
  start_date: string;
  end_date: string;
  hosted_invoice_url: string;
  invoice_pdf: string;
  invoice_number: string;
}

export interface BillingSummaryCreateData {
  /** @format uuid */
  id: string;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at: number;
  /** @format uuid */
  companies_id: string | null;
  month: string;
  /** @format int64 */
  amount: number;
  /** stripe invoice id */
  invoice_id: string;
  status: "PENDING" | "PAID" | "FAILED";
  fee_rate: number;
  /** @format int64 */
  session_count: number;
  start_date: string;
  end_date: string;
  hosted_invoice_url: string;
  invoice_pdf: string;
  invoice_number: string;
}

export type WebhookConnectCreateData = object;

export interface WebhookCreateData {
  stripe: string;
}
