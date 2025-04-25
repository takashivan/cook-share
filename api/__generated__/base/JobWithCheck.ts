/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

import { JobWithCheckCreateData, JobWithCheckCreatePayload } from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class JobWithCheck<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * @description Add job record <br /><br /> <b>Authentication:</b> not required
   *
   * @tags job_with_check
   * @name JobWithCheckCreate
   * @summary Add job record
   * @request POST:/job_with_check
   */
  jobWithCheckCreate = (data: JobWithCheckCreatePayload, params: RequestParams = {}) =>
    this.request<JobWithCheckCreateData, void>({
      path: `/job_with_check`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });

  jobWithCheckCreateQueryArgs = (params: RequestParams = {}, enabled: boolean = true) => {
    const key = enabled ? [`/job_with_check`] : null;
    const fetcher: (url: string[], { arg }: { arg: JobWithCheckCreatePayload }) => Promise<JobWithCheckCreateData> = (
      _,
      { arg },
    ) => this.jobWithCheckCreate(arg, params).then((res) => res.data);
    return [key, fetcher] as const;
  };
}
