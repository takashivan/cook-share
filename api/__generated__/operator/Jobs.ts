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

import { JobsListData } from "./data-contracts";
import { HttpClient, RequestParams } from "./http-client";

export class Jobs<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description [AUTHED-Operator]運営者だけが見られる、求人一覧 <br /><br /> <b>Authentication:</b> required
   *
   * @tags jobs
   * @name JobsList
   * @summary [AUTHED-Operator]運営者だけが見られる、求人一覧
   * @request GET:/jobs
   * @secure
   */
  jobsList = (params: RequestParams = {}) =>
    this.request<JobsListData, void>({
      path: `/jobs`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });

  jobsListQueryArgs = (params: RequestParams = {}, enabled: boolean = true) => {
    const key = enabled ? [`/jobs`] : null;
    const fetcher = () => this.jobsList(params).then((res) => res.data);
    return [key, fetcher] as const;
  };
}
