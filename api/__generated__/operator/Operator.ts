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
  JobApprovePartialUpdateData,
  JobApprovePartialUpdatePayload,
  JobBanPartialUpdateData,
  JobBanPartialUpdatePayload,
  OperatorCreateData,
  OperatorCreatePayload,
  OperatorDeleteData,
  OperatorDetailData,
  OperatorListData,
  OperatorPartialUpdateData,
  OperatorPartialUpdatePayload,
  RestaurantApprovePartialUpdateData,
  RestaurantApprovePartialUpdatePayload,
  RestaurantBanPartialUpdateData,
  RestaurantBanPartialUpdatePayload,
  UserApprovePartialUpdateData,
  UserApprovePartialUpdatePayload,
  UserBanPartialUpdateData,
  UserBanPartialUpdatePayload,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Operator<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * @description <br /><br /> <b>Authentication:</b> required
   *
   * @tags operator
   * @name JobApprovePartialUpdate
   * @request PATCH:/operator/job/approve
   * @secure
   */
  jobApprovePartialUpdate = (data: JobApprovePartialUpdatePayload, params: RequestParams = {}) =>
    this.request<JobApprovePartialUpdateData, void>({
      path: `/operator/job/approve`,
      method: "PATCH",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description <br /><br /> <b>Authentication:</b> required
   *
   * @tags operator
   * @name JobBanPartialUpdate
   * @request PATCH:/operator/job/ban
   * @secure
   */
  jobBanPartialUpdate = (data: JobBanPartialUpdatePayload, params: RequestParams = {}) =>
    this.request<JobBanPartialUpdateData, void>({
      path: `/operator/job/ban`,
      method: "PATCH",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description <br /><br /> <b>Authentication:</b> required
   *
   * @tags operator
   * @name RestaurantApprovePartialUpdate
   * @request PATCH:/operator/restaurant/approve
   * @secure
   */
  restaurantApprovePartialUpdate = (data: RestaurantApprovePartialUpdatePayload, params: RequestParams = {}) =>
    this.request<RestaurantApprovePartialUpdateData, void>({
      path: `/operator/restaurant/approve`,
      method: "PATCH",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description <br /><br /> <b>Authentication:</b> required
   *
   * @tags operator
   * @name RestaurantBanPartialUpdate
   * @request PATCH:/operator/restaurant/ban
   * @secure
   */
  restaurantBanPartialUpdate = (data: RestaurantBanPartialUpdatePayload, params: RequestParams = {}) =>
    this.request<RestaurantBanPartialUpdateData, void>({
      path: `/operator/restaurant/ban`,
      method: "PATCH",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description <br /><br /> <b>Authentication:</b> required
   *
   * @tags operator
   * @name UserApprovePartialUpdate
   * @request PATCH:/operator/user/approve
   * @secure
   */
  userApprovePartialUpdate = (data: UserApprovePartialUpdatePayload, params: RequestParams = {}) =>
    this.request<UserApprovePartialUpdateData, void>({
      path: `/operator/user/approve`,
      method: "PATCH",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description <br /><br /> <b>Authentication:</b> required
   *
   * @tags operator
   * @name UserBanPartialUpdate
   * @request PATCH:/operator/user/ban
   * @secure
   */
  userBanPartialUpdate = (data: UserBanPartialUpdatePayload, params: RequestParams = {}) =>
    this.request<UserBanPartialUpdateData, void>({
      path: `/operator/user/ban`,
      method: "PATCH",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Delete Operator record. <br /><br /> <b>Authentication:</b> not required
   *
   * @tags operator
   * @name OperatorDelete
   * @summary Delete Operator record.
   * @request DELETE:/operator/{operator_id}
   */
  operatorDelete = (operatorId: string, params: RequestParams = {}) =>
    this.request<OperatorDeleteData, void>({
      path: `/operator/${operatorId}`,
      method: "DELETE",
      format: "json",
      ...params,
    });
  /**
   * @description Get Operator record <br /><br /> <b>Authentication:</b> not required
   *
   * @tags operator
   * @name OperatorDetail
   * @summary Get Operator record
   * @request GET:/operator/{operator_id}
   */
  operatorDetail = (operatorId: string, params: RequestParams = {}) =>
    this.request<OperatorDetailData, void>({
      path: `/operator/${operatorId}`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * @description Edit Operator record <br /><br /> <b>Authentication:</b> not required
   *
   * @tags operator
   * @name OperatorPartialUpdate
   * @summary Edit Operator record
   * @request PATCH:/operator/{operator_id}
   */
  operatorPartialUpdate = (operatorId: string, data: OperatorPartialUpdatePayload, params: RequestParams = {}) =>
    this.request<OperatorPartialUpdateData, void>({
      path: `/operator/${operatorId}`,
      method: "PATCH",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Query all Operator records <br /><br /> <b>Authentication:</b> not required
   *
   * @tags operator
   * @name OperatorList
   * @summary Query all Operator records
   * @request GET:/operator
   */
  operatorList = (params: RequestParams = {}) =>
    this.request<OperatorListData, void>({
      path: `/operator`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * @description Add Operator record <br /><br /> <b>Authentication:</b> not required
   *
   * @tags operator
   * @name OperatorCreate
   * @summary Add Operator record
   * @request POST:/operator
   */
  operatorCreate = (data: OperatorCreatePayload, params: RequestParams = {}) =>
    this.request<OperatorCreateData, void>({
      path: `/operator`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
}
