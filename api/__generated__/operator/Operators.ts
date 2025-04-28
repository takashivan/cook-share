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
  OperatorsCreateData,
  OperatorsCreatePayload,
  OperatorsDeleteData,
  OperatorsDetailData,
  OperatorsListData,
  OperatorsPartialUpdateData,
  OperatorsPartialUpdatePayload,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Operators<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description Delete Operator record. <br /><br /> <b>Authentication:</b> not required
   *
   * @tags operators
   * @name OperatorsDelete
   * @summary Delete Operator record.
   * @request DELETE:/operators/{operator_id}
   */
  operatorsDelete = (operatorId: string, params: RequestParams = {}) =>
    this.request<OperatorsDeleteData, void>({
      path: `/operators/${operatorId}`,
      method: "DELETE",
      format: "json",
      ...params,
    });

  operatorsDeleteQueryArgs = (
    operatorId: string,
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/operators/${operatorId}`] : null;
    const fetcher = () =>
      this.operatorsDelete(operatorId, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description Get Operator record <br /><br /> <b>Authentication:</b> not required
   *
   * @tags operators
   * @name OperatorsDetail
   * @summary Get Operator record
   * @request GET:/operators/{operator_id}
   */
  operatorsDetail = (operatorId: string, params: RequestParams = {}) =>
    this.request<OperatorsDetailData, void>({
      path: `/operators/${operatorId}`,
      method: "GET",
      format: "json",
      ...params,
    });

  operatorsDetailQueryArgs = (
    operatorId: string,
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/operators/${operatorId}`] : null;
    const fetcher = () =>
      this.operatorsDetail(operatorId, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description Edit Operator record <br /><br /> <b>Authentication:</b> not required
   *
   * @tags operators
   * @name OperatorsPartialUpdate
   * @summary Edit Operator record
   * @request PATCH:/operators/{operator_id}
   */
  operatorsPartialUpdate = (
    operatorId: string,
    data: OperatorsPartialUpdatePayload,
    params: RequestParams = {},
  ) =>
    this.request<OperatorsPartialUpdateData, void>({
      path: `/operators/${operatorId}`,
      method: "PATCH",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });

  operatorsPartialUpdateQueryArgs = (
    operatorId: string,
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/operators/${operatorId}`] : null;
    const fetcher: (
      url: string[],
      { arg }: { arg: OperatorsPartialUpdatePayload },
    ) => Promise<OperatorsPartialUpdateData> = (_, { arg }) =>
      this.operatorsPartialUpdate(operatorId, arg, params).then(
        (res) => res.data,
      );
    return [key, fetcher] as const;
  };

  /**
   * @description Query all Operator records <br /><br /> <b>Authentication:</b> not required
   *
   * @tags operators
   * @name OperatorsList
   * @summary Query all Operator records
   * @request GET:/operators
   */
  operatorsList = (params: RequestParams = {}) =>
    this.request<OperatorsListData, void>({
      path: `/operators`,
      method: "GET",
      format: "json",
      ...params,
    });

  operatorsListQueryArgs = (
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/operators`] : null;
    const fetcher = () => this.operatorsList(params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description Add Operator record <br /><br /> <b>Authentication:</b> not required
   *
   * @tags operators
   * @name OperatorsCreate
   * @summary Add Operator record
   * @request POST:/operators
   */
  operatorsCreate = (
    data: OperatorsCreatePayload,
    params: RequestParams = {},
  ) =>
    this.request<OperatorsCreateData, void>({
      path: `/operators`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });

  operatorsCreateQueryArgs = (
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/operators`] : null;
    const fetcher: (
      url: string[],
      { arg }: { arg: OperatorsCreatePayload },
    ) => Promise<OperatorsCreateData> = (_, { arg }) =>
      this.operatorsCreate(arg, params).then((res) => res.data);
    return [key, fetcher] as const;
  };
}
