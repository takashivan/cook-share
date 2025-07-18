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

import { ChefReviewsListData } from "./data-contracts";
import { HttpClient, RequestParams } from "./http-client";

export class ChefReviews<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description [AUTHED-Operator]運営者だけが見られる、シェフからレストランへのレビュー一覧 <br /><br /> <b>Authentication:</b> required
   *
   * @tags chef-reviews
   * @name ChefReviewsList
   * @summary [AUTHED-Operator]運営者だけが見られる、シェフからレストランへのレビュー一覧
   * @request GET:/chef-reviews
   * @secure
   */
  chefReviewsList = (params: RequestParams = {}) =>
    this.request<ChefReviewsListData, void>({
      path: `/chef-reviews`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });

  chefReviewsListQueryArgs = (
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/chef-reviews`] : null;
    const fetcher = () => this.chefReviewsList(params).then((res) => res.data);
    return [key, fetcher] as const;
  };
}
