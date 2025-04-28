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
  JobsApprovePartialUpdateData,
  JobsApprovePartialUpdatePayload,
  JobsBanPartialUpdateData,
  JobsBanPartialUpdatePayload,
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
  RestaurantsApprovePartialUpdateData,
  RestaurantsApprovePartialUpdatePayload,
  RestaurantsBanPartialUpdateData,
  RestaurantsBanPartialUpdatePayload,
  UserApprovePartialUpdateData,
  UserApprovePartialUpdatePayload,
  UserBanPartialUpdateData,
  UserBanPartialUpdatePayload,
  UsersApprovePartialUpdateData,
  UsersBanPartialUpdateData,
  UsersBanPartialUpdatePayload,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Operator<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description <br /><br /> <b>Authentication:</b> required
   *
   * @tags operator
   * @name JobApprovePartialUpdate
   * @request PATCH:/operator/job/approve
   * @secure
   */
  jobApprovePartialUpdate = (
    data: JobApprovePartialUpdatePayload,
    params: RequestParams = {},
  ) =>
    this.request<JobApprovePartialUpdateData, void>({
      path: `/operator/job/approve`,
      method: "PATCH",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });

  jobApprovePartialUpdateQueryArgs = (
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/operator/job/approve`] : null;
    const fetcher: (
      url: string[],
      { arg }: { arg: JobApprovePartialUpdatePayload },
    ) => Promise<JobApprovePartialUpdateData> = (_, { arg }) =>
      this.jobApprovePartialUpdate(arg, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description <br /><br /> <b>Authentication:</b> required
   *
   * @tags operator
   * @name JobBanPartialUpdate
   * @request PATCH:/operator/job/ban
   * @secure
   */
  jobBanPartialUpdate = (
    data: JobBanPartialUpdatePayload,
    params: RequestParams = {},
  ) =>
    this.request<JobBanPartialUpdateData, void>({
      path: `/operator/job/ban`,
      method: "PATCH",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });

  jobBanPartialUpdateQueryArgs = (
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/operator/job/ban`] : null;
    const fetcher: (
      url: string[],
      { arg }: { arg: JobBanPartialUpdatePayload },
    ) => Promise<JobBanPartialUpdateData> = (_, { arg }) =>
      this.jobBanPartialUpdate(arg, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description <br /><br /> <b>Authentication:</b> required
   *
   * @tags operator
   * @name JobsApprovePartialUpdate
   * @request PATCH:/operator/jobs/{job_id}/approve
   * @secure
   */
  jobsApprovePartialUpdate = (
    jobId: string,
    data: JobsApprovePartialUpdatePayload,
    params: RequestParams = {},
  ) =>
    this.request<JobsApprovePartialUpdateData, void>({
      path: `/operator/jobs/${jobId}/approve`,
      method: "PATCH",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });

  jobsApprovePartialUpdateQueryArgs = (
    jobId: string,
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/operator/jobs/${jobId}/approve`] : null;
    const fetcher: (
      url: string[],
      { arg }: { arg: JobsApprovePartialUpdatePayload },
    ) => Promise<JobsApprovePartialUpdateData> = (_, { arg }) =>
      this.jobsApprovePartialUpdate(jobId, arg, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description <br /><br /> <b>Authentication:</b> required
   *
   * @tags operator
   * @name JobsBanPartialUpdate
   * @request PATCH:/operator/jobs/{job_id}/ban
   * @secure
   */
  jobsBanPartialUpdate = (
    jobId: string,
    data: JobsBanPartialUpdatePayload,
    params: RequestParams = {},
  ) =>
    this.request<JobsBanPartialUpdateData, void>({
      path: `/operator/jobs/${jobId}/ban`,
      method: "PATCH",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });

  jobsBanPartialUpdateQueryArgs = (
    jobId: string,
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/operator/jobs/${jobId}/ban`] : null;
    const fetcher: (
      url: string[],
      { arg }: { arg: JobsBanPartialUpdatePayload },
    ) => Promise<JobsBanPartialUpdateData> = (_, { arg }) =>
      this.jobsBanPartialUpdate(jobId, arg, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description <br /><br /> <b>Authentication:</b> required
   *
   * @tags operator
   * @name RestaurantApprovePartialUpdate
   * @request PATCH:/operator/restaurant/approve
   * @secure
   */
  restaurantApprovePartialUpdate = (
    data: RestaurantApprovePartialUpdatePayload,
    params: RequestParams = {},
  ) =>
    this.request<RestaurantApprovePartialUpdateData, void>({
      path: `/operator/restaurant/approve`,
      method: "PATCH",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });

  restaurantApprovePartialUpdateQueryArgs = (
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/operator/restaurant/approve`] : null;
    const fetcher: (
      url: string[],
      { arg }: { arg: RestaurantApprovePartialUpdatePayload },
    ) => Promise<RestaurantApprovePartialUpdateData> = (_, { arg }) =>
      this.restaurantApprovePartialUpdate(arg, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description <br /><br /> <b>Authentication:</b> required
   *
   * @tags operator
   * @name RestaurantBanPartialUpdate
   * @request PATCH:/operator/restaurant/ban
   * @secure
   */
  restaurantBanPartialUpdate = (
    data: RestaurantBanPartialUpdatePayload,
    params: RequestParams = {},
  ) =>
    this.request<RestaurantBanPartialUpdateData, void>({
      path: `/operator/restaurant/ban`,
      method: "PATCH",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });

  restaurantBanPartialUpdateQueryArgs = (
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/operator/restaurant/ban`] : null;
    const fetcher: (
      url: string[],
      { arg }: { arg: RestaurantBanPartialUpdatePayload },
    ) => Promise<RestaurantBanPartialUpdateData> = (_, { arg }) =>
      this.restaurantBanPartialUpdate(arg, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description <br /><br /> <b>Authentication:</b> required
   *
   * @tags operator
   * @name RestaurantsApprovePartialUpdate
   * @request PATCH:/operator/restaurants/{restaurant_id}/approve
   * @secure
   */
  restaurantsApprovePartialUpdate = (
    restaurantId: string,
    data: RestaurantsApprovePartialUpdatePayload,
    params: RequestParams = {},
  ) =>
    this.request<RestaurantsApprovePartialUpdateData, void>({
      path: `/operator/restaurants/${restaurantId}/approve`,
      method: "PATCH",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });

  restaurantsApprovePartialUpdateQueryArgs = (
    restaurantId: string,
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled
      ? [`/operator/restaurants/${restaurantId}/approve`]
      : null;
    const fetcher: (
      url: string[],
      { arg }: { arg: RestaurantsApprovePartialUpdatePayload },
    ) => Promise<RestaurantsApprovePartialUpdateData> = (_, { arg }) =>
      this.restaurantsApprovePartialUpdate(restaurantId, arg, params).then(
        (res) => res.data,
      );
    return [key, fetcher] as const;
  };

  /**
   * @description <br /><br /> <b>Authentication:</b> required
   *
   * @tags operator
   * @name RestaurantsBanPartialUpdate
   * @request PATCH:/operator/restaurants/{restaurant_id}/ban
   * @secure
   */
  restaurantsBanPartialUpdate = (
    restaurantId: string,
    data: RestaurantsBanPartialUpdatePayload,
    params: RequestParams = {},
  ) =>
    this.request<RestaurantsBanPartialUpdateData, void>({
      path: `/operator/restaurants/${restaurantId}/ban`,
      method: "PATCH",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });

  restaurantsBanPartialUpdateQueryArgs = (
    restaurantId: string,
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/operator/restaurants/${restaurantId}/ban`] : null;
    const fetcher: (
      url: string[],
      { arg }: { arg: RestaurantsBanPartialUpdatePayload },
    ) => Promise<RestaurantsBanPartialUpdateData> = (_, { arg }) =>
      this.restaurantsBanPartialUpdate(restaurantId, arg, params).then(
        (res) => res.data,
      );
    return [key, fetcher] as const;
  };

  /**
   * @description <br /><br /> <b>Authentication:</b> required
   *
   * @tags operator
   * @name UserApprovePartialUpdate
   * @request PATCH:/operator/user/approve
   * @secure
   */
  userApprovePartialUpdate = (
    data: UserApprovePartialUpdatePayload,
    params: RequestParams = {},
  ) =>
    this.request<UserApprovePartialUpdateData, void>({
      path: `/operator/user/approve`,
      method: "PATCH",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });

  userApprovePartialUpdateQueryArgs = (
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/operator/user/approve`] : null;
    const fetcher: (
      url: string[],
      { arg }: { arg: UserApprovePartialUpdatePayload },
    ) => Promise<UserApprovePartialUpdateData> = (_, { arg }) =>
      this.userApprovePartialUpdate(arg, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description <br /><br /> <b>Authentication:</b> required
   *
   * @tags operator
   * @name UserBanPartialUpdate
   * @request PATCH:/operator/user/ban
   * @secure
   */
  userBanPartialUpdate = (
    data: UserBanPartialUpdatePayload,
    params: RequestParams = {},
  ) =>
    this.request<UserBanPartialUpdateData, void>({
      path: `/operator/user/ban`,
      method: "PATCH",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });

  userBanPartialUpdateQueryArgs = (
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/operator/user/ban`] : null;
    const fetcher: (
      url: string[],
      { arg }: { arg: UserBanPartialUpdatePayload },
    ) => Promise<UserBanPartialUpdateData> = (_, { arg }) =>
      this.userBanPartialUpdate(arg, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description <br /><br /> <b>Authentication:</b> required
   *
   * @tags operator
   * @name UsersApprovePartialUpdate
   * @request PATCH:/operator/users/{user_id}/approve
   * @secure
   */
  usersApprovePartialUpdate = (userId: string, params: RequestParams = {}) =>
    this.request<UsersApprovePartialUpdateData, void>({
      path: `/operator/users/${userId}/approve`,
      method: "PATCH",
      secure: true,
      format: "json",
      ...params,
    });

  usersApprovePartialUpdateQueryArgs = (
    userId: string,
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/operator/users/${userId}/approve`] : null;
    const fetcher: (url: string[]) => Promise<UsersApprovePartialUpdateData> = (
      _,
    ) => this.usersApprovePartialUpdate(userId, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description <br /><br /> <b>Authentication:</b> required
   *
   * @tags operator
   * @name UsersBanPartialUpdate
   * @request PATCH:/operator/users/{user_id}/ban
   * @secure
   */
  usersBanPartialUpdate = (
    userId: string,
    data: UsersBanPartialUpdatePayload,
    params: RequestParams = {},
  ) =>
    this.request<UsersBanPartialUpdateData, void>({
      path: `/operator/users/${userId}/ban`,
      method: "PATCH",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });

  usersBanPartialUpdateQueryArgs = (
    userId: string,
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/operator/users/${userId}/ban`] : null;
    const fetcher: (
      url: string[],
      { arg }: { arg: UsersBanPartialUpdatePayload },
    ) => Promise<UsersBanPartialUpdateData> = (_, { arg }) =>
      this.usersBanPartialUpdate(userId, arg, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

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

  operatorDeleteQueryArgs = (
    operatorId: string,
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/operator/${operatorId}`] : null;
    const fetcher = () =>
      this.operatorDelete(operatorId, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

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

  operatorDetailQueryArgs = (
    operatorId: string,
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/operator/${operatorId}`] : null;
    const fetcher = () =>
      this.operatorDetail(operatorId, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description Edit Operator record <br /><br /> <b>Authentication:</b> not required
   *
   * @tags operator
   * @name OperatorPartialUpdate
   * @summary Edit Operator record
   * @request PATCH:/operator/{operator_id}
   */
  operatorPartialUpdate = (
    operatorId: string,
    data: OperatorPartialUpdatePayload,
    params: RequestParams = {},
  ) =>
    this.request<OperatorPartialUpdateData, void>({
      path: `/operator/${operatorId}`,
      method: "PATCH",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });

  operatorPartialUpdateQueryArgs = (
    operatorId: string,
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/operator/${operatorId}`] : null;
    const fetcher: (
      url: string[],
      { arg }: { arg: OperatorPartialUpdatePayload },
    ) => Promise<OperatorPartialUpdateData> = (_, { arg }) =>
      this.operatorPartialUpdate(operatorId, arg, params).then(
        (res) => res.data,
      );
    return [key, fetcher] as const;
  };

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

  operatorListQueryArgs = (
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/operator`] : null;
    const fetcher = () => this.operatorList(params).then((res) => res.data);
    return [key, fetcher] as const;
  };

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

  operatorCreateQueryArgs = (
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/operator`] : null;
    const fetcher: (
      url: string[],
      { arg }: { arg: OperatorCreatePayload },
    ) => Promise<OperatorCreateData> = (_, { arg }) =>
      this.operatorCreate(arg, params).then((res) => res.data);
    return [key, fetcher] as const;
  };
}
