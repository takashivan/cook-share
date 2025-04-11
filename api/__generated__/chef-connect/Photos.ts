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
  PhotosCreateData,
  PhotosCreatePayload,
  PhotosDeleteData,
  PhotosDetailData,
  PhotosListData,
  PhotosPartialUpdateData,
  PhotosPartialUpdatePayload,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Photos<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * @description Delete Photos record. <br /><br /> <b>Authentication:</b> not required
   *
   * @tags photos
   * @name PhotosDelete
   * @summary Delete Photos record.
   * @request DELETE:/photos/{photos_id}
   */
  photosDelete = (photosId: string, params: RequestParams = {}) =>
    this.request<PhotosDeleteData, void>({
      path: `/photos/${photosId}`,
      method: "DELETE",
      format: "json",
      ...params,
    });
  /**
   * @description Get Photos record <br /><br /> <b>Authentication:</b> not required
   *
   * @tags photos
   * @name PhotosDetail
   * @summary Get Photos record
   * @request GET:/photos/{photos_id}
   */
  photosDetail = (photosId: string, params: RequestParams = {}) =>
    this.request<PhotosDetailData, void>({
      path: `/photos/${photosId}`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * @description Edit Photos record <br /><br /> <b>Authentication:</b> not required
   *
   * @tags photos
   * @name PhotosPartialUpdate
   * @summary Edit Photos record
   * @request PATCH:/photos/{photos_id}
   */
  photosPartialUpdate = (photosId: string, data: PhotosPartialUpdatePayload, params: RequestParams = {}) =>
    this.request<PhotosPartialUpdateData, void>({
      path: `/photos/${photosId}`,
      method: "PATCH",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Query all Photos records <br /><br /> <b>Authentication:</b> not required
   *
   * @tags photos
   * @name PhotosList
   * @summary Query all Photos records
   * @request GET:/photos
   */
  photosList = (params: RequestParams = {}) =>
    this.request<PhotosListData, void>({
      path: `/photos`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * @description Add Photos record <br /><br /> <b>Authentication:</b> not required
   *
   * @tags photos
   * @name PhotosCreate
   * @summary Add Photos record
   * @request POST:/photos
   */
  photosCreate = (data: PhotosCreatePayload, params: RequestParams = {}) =>
    this.request<PhotosCreateData, void>({
      path: `/photos`,
      method: "POST",
      body: data,
      type: ContentType.FormData,
      format: "json",
      ...params,
    });
}
