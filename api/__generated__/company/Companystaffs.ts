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
  CompanystaffsCreateData,
  CompanystaffsDeleteData,
  CompanystaffsDetailData,
  CompanystaffsListData,
  CompanystaffsPartialUpdateData,
} from "./data-contracts";
import { HttpClient, RequestParams } from "./http-client";

export class Companystaffs<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description Delete CompanyStaffs record. <br /><br /> <b>Authentication:</b> not required
   *
   * @tags companystaffs
   * @name CompanystaffsDelete
   * @summary Delete CompanyStaffs record.
   * @request DELETE:/companystaffs/{companystaffs_id}
   */
  companystaffsDelete = (companystaffsId: string, params: RequestParams = {}) =>
    this.request<CompanystaffsDeleteData, void>({
      path: `/companystaffs/${companystaffsId}`,
      method: "DELETE",
      format: "json",
      ...params,
    });

  companystaffsDeleteQueryArgs = (
    companystaffsId: string,
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/companystaffs/${companystaffsId}`] : null;
    const fetcher = () =>
      this.companystaffsDelete(companystaffsId, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description Get CompanyStaffs record <br /><br /> <b>Authentication:</b> not required
   *
   * @tags companystaffs
   * @name CompanystaffsDetail
   * @summary Get CompanyStaffs record
   * @request GET:/companystaffs/{companystaffs_id}
   */
  companystaffsDetail = (companystaffsId: string, params: RequestParams = {}) =>
    this.request<CompanystaffsDetailData, void>({
      path: `/companystaffs/${companystaffsId}`,
      method: "GET",
      format: "json",
      ...params,
    });

  companystaffsDetailQueryArgs = (
    companystaffsId: string,
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/companystaffs/${companystaffsId}`] : null;
    const fetcher = () =>
      this.companystaffsDetail(companystaffsId, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description Edit CompanyStaffs record <br /><br /> <b>Authentication:</b> not required
   *
   * @tags companystaffs
   * @name CompanystaffsPartialUpdate
   * @summary Edit CompanyStaffs record
   * @request PATCH:/companystaffs/{companystaffs_id}
   */
  companystaffsPartialUpdate = (
    companystaffsId: string,
    params: RequestParams = {},
  ) =>
    this.request<CompanystaffsPartialUpdateData, void>({
      path: `/companystaffs/${companystaffsId}`,
      method: "PATCH",
      format: "json",
      ...params,
    });

  companystaffsPartialUpdateQueryArgs = (
    companystaffsId: string,
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/companystaffs/${companystaffsId}`] : null;
    const fetcher: (url: string[]) => Promise<CompanystaffsPartialUpdateData> =
      (_) =>
        this.companystaffsPartialUpdate(companystaffsId, params).then(
          (res) => res.data,
        );
    return [key, fetcher] as const;
  };

  /**
   * @description Query all CompanyStaffs records <br /><br /> <b>Authentication:</b> not required
   *
   * @tags companystaffs
   * @name CompanystaffsList
   * @summary Query all CompanyStaffs records
   * @request GET:/companystaffs
   */
  companystaffsList = (params: RequestParams = {}) =>
    this.request<CompanystaffsListData, void>({
      path: `/companystaffs`,
      method: "GET",
      format: "json",
      ...params,
    });

  companystaffsListQueryArgs = (
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/companystaffs`] : null;
    const fetcher = () =>
      this.companystaffsList(params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description Add CompanyStaffs record <br /><br /> <b>Authentication:</b> not required
   *
   * @tags companystaffs
   * @name CompanystaffsCreate
   * @summary Add CompanyStaffs record
   * @request POST:/companystaffs
   */
  companystaffsCreate = (params: RequestParams = {}) =>
    this.request<CompanystaffsCreateData, void>({
      path: `/companystaffs`,
      method: "POST",
      format: "json",
      ...params,
    });

  companystaffsCreateQueryArgs = (
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/companystaffs`] : null;
    const fetcher: (url: string[]) => Promise<CompanystaffsCreateData> = (_) =>
      this.companystaffsCreate(params).then((res) => res.data);
    return [key, fetcher] as const;
  };
}
