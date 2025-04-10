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

export class Files<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
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
}
