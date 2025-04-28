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
  AddInvoiceItemsCreateData,
  AddInvoiceItemsCreatePayload,
  GenerateCompanySummaryCreateData,
  GenerateCompanySummaryCreatePayload,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Billing<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags billing
   * @name AddInvoiceItemsCreate
   * @request POST:/billing/add-invoice-items
   */
  addInvoiceItemsCreate = (
    data: AddInvoiceItemsCreatePayload,
    params: RequestParams = {},
  ) =>
    this.request<AddInvoiceItemsCreateData, void>({
      path: `/billing/add-invoice-items`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });

  addInvoiceItemsCreateQueryArgs = (
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/billing/add-invoice-items`] : null;
    const fetcher: (
      url: string[],
      { arg }: { arg: AddInvoiceItemsCreatePayload },
    ) => Promise<AddInvoiceItemsCreateData> = (_, { arg }) =>
      this.addInvoiceItemsCreate(arg, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags billing
   * @name GenerateCompanySummaryCreate
   * @request POST:/billing/generate-company-summary
   */
  generateCompanySummaryCreate = (
    data: GenerateCompanySummaryCreatePayload,
    params: RequestParams = {},
  ) =>
    this.request<GenerateCompanySummaryCreateData, void>({
      path: `/billing/generate-company-summary`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });

  generateCompanySummaryCreateQueryArgs = (
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/billing/generate-company-summary`] : null;
    const fetcher: (
      url: string[],
      { arg }: { arg: GenerateCompanySummaryCreatePayload },
    ) => Promise<GenerateCompanySummaryCreateData> = (_, { arg }) =>
      this.generateCompanySummaryCreate(arg, params).then((res) => res.data);
    return [key, fetcher] as const;
  };
}
