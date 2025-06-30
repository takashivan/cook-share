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

import { CheckLineFriendshipStatusDetailData } from "./data-contracts";
import { HttpClient, RequestParams } from "./http-client";

export class CheckLineFriendshipStatus<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags check-line-friendship-status
   * @name CheckLineFriendshipStatusDetail
   * @request GET:/check-line-friendship-status/{line_user_id}
   */
  checkLineFriendshipStatusDetail = (
    lineUserId: string,
    params: RequestParams = {},
  ) =>
    this.request<CheckLineFriendshipStatusDetailData, void>({
      path: `/check-line-friendship-status/${lineUserId}`,
      method: "GET",
      format: "json",
      ...params,
    });

  checkLineFriendshipStatusDetailQueryArgs = (
    lineUserId: string,
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled
      ? [`/check-line-friendship-status/${lineUserId}`]
      : null;
    const fetcher = () =>
      this.checkLineFriendshipStatusDetail(lineUserId, params).then(
        (res) => res.data,
      );
    return [key, fetcher] as const;
  };
}
