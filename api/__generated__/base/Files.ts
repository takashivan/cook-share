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
  FilesCreateData,
  FilesDeleteData,
  FilesDetailData,
  FilesListData,
  FilesPartialUpdateData,
} from "./data-contracts";
import { HttpClient, RequestParams } from "./http-client";

export class Files<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description Delete Files record. <br /><br /> <b>Authentication:</b> not required
   *
   * @tags files
   * @name FilesDelete
   * @summary Delete Files record.
   * @request DELETE:/files/{files_id}
   */
  filesDelete = (filesId: string, params: RequestParams = {}) =>
    this.request<FilesDeleteData, void>({
      path: `/files/${filesId}`,
      method: "DELETE",
      format: "json",
      ...params,
    });

  filesDeleteQueryArgs = (
    filesId: string,
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/files/${filesId}`] : null;
    const fetcher = () =>
      this.filesDelete(filesId, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description Get Files record <br /><br /> <b>Authentication:</b> not required
   *
   * @tags files
   * @name FilesDetail
   * @summary Get Files record
   * @request GET:/files/{files_id}
   */
  filesDetail = (filesId: string, params: RequestParams = {}) =>
    this.request<FilesDetailData, void>({
      path: `/files/${filesId}`,
      method: "GET",
      format: "json",
      ...params,
    });

  filesDetailQueryArgs = (
    filesId: string,
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/files/${filesId}`] : null;
    const fetcher = () =>
      this.filesDetail(filesId, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description Edit Files record <br /><br /> <b>Authentication:</b> not required
   *
   * @tags files
   * @name FilesPartialUpdate
   * @summary Edit Files record
   * @request PATCH:/files/{files_id}
   */
  filesPartialUpdate = (filesId: string, params: RequestParams = {}) =>
    this.request<FilesPartialUpdateData, void>({
      path: `/files/${filesId}`,
      method: "PATCH",
      format: "json",
      ...params,
    });

  filesPartialUpdateQueryArgs = (
    filesId: string,
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/files/${filesId}`] : null;
    const fetcher: (url: string[]) => Promise<FilesPartialUpdateData> = (_) =>
      this.filesPartialUpdate(filesId, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description Query all Files records <br /><br /> <b>Authentication:</b> not required
   *
   * @tags files
   * @name FilesList
   * @summary Query all Files records
   * @request GET:/files
   */
  filesList = (params: RequestParams = {}) =>
    this.request<FilesListData, void>({
      path: `/files`,
      method: "GET",
      format: "json",
      ...params,
    });

  filesListQueryArgs = (
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/files`] : null;
    const fetcher = () => this.filesList(params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description Add Files record <br /><br /> <b>Authentication:</b> not required
   *
   * @tags files
   * @name FilesCreate
   * @summary Add Files record
   * @request POST:/files
   */
  filesCreate = (params: RequestParams = {}) =>
    this.request<FilesCreateData, void>({
      path: `/files`,
      method: "POST",
      format: "json",
      ...params,
    });

  filesCreateQueryArgs = (
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/files`] : null;
    const fetcher: (url: string[]) => Promise<FilesCreateData> = (_) =>
      this.filesCreate(params).then((res) => res.data);
    return [key, fetcher] as const;
  };
}
