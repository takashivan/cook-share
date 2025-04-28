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

import { SessionHistoryCurrentListResult } from "./data-contracts";
import { HttpClient, RequestParams } from "./http-client";

export class User<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags user
   * @name SessionHistoryCurrentList
   * @request GET:/user/{user_id}/sessionHistory/current
   */
  sessionHistoryCurrentList = (userId: string, params: RequestParams = {}) =>
    this.request<SessionHistoryCurrentListResult, void>({
      path: `/user/${userId}/sessionHistory/current`,
      method: "GET",
      format: "json",
      ...params,
    });

  sessionHistoryCurrentListQueryArgs = (
    userId: string,
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/user/${userId}/sessionHistory/current`] : null;
    const fetcher = () =>
      this.sessionHistoryCurrentList(userId, params).then((res) => res.data);
    return [key, fetcher] as const;
  };
}
