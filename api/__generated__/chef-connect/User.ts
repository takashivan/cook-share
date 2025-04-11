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
  UserCreateData,
  UserCreatePayload,
  UserDeleteData,
  UserDetailData,
  UserListData,
  UserPartialUpdateData,
  UserPartialUpdatePayload,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class User<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * @description Delete user record. <br /><br /> <b>Authentication:</b> not required
   *
   * @tags user
   * @name UserDelete
   * @summary Delete user record.
   * @request DELETE:/user/{user_id}
   */
  userDelete = (userId: string, params: RequestParams = {}) =>
    this.request<UserDeleteData, void>({
      path: `/user/${userId}`,
      method: "DELETE",
      format: "json",
      ...params,
    });
  /**
   * @description Get user record <br /><br /> <b>Authentication:</b> not required
   *
   * @tags user
   * @name UserDetail
   * @summary Get user record
   * @request GET:/user/{user_id}
   */
  userDetail = (userId: string, params: RequestParams = {}) =>
    this.request<UserDetailData, void>({
      path: `/user/${userId}`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * @description Edit user record <br /><br /> <b>Authentication:</b> not required
   *
   * @tags user
   * @name UserPartialUpdate
   * @summary Edit user record
   * @request PATCH:/user/{user_id}
   */
  userPartialUpdate = (userId: string, data: UserPartialUpdatePayload, params: RequestParams = {}) =>
    this.request<UserPartialUpdateData, void>({
      path: `/user/${userId}`,
      method: "PATCH",
      body: data,
      type: ContentType.FormData,
      format: "json",
      ...params,
    });
  /**
   * @description Query all user records <br /><br /> <b>Authentication:</b> not required
   *
   * @tags user
   * @name UserList
   * @summary Query all user records
   * @request GET:/user
   */
  userList = (params: RequestParams = {}) =>
    this.request<UserListData, void>({
      path: `/user`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * @description Add user record <br /><br /> <b>Authentication:</b> not required
   *
   * @tags user
   * @name UserCreate
   * @summary Add user record
   * @request POST:/user
   */
  userCreate = (data: UserCreatePayload, params: RequestParams = {}) =>
    this.request<UserCreateData, void>({
      path: `/user`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
}
