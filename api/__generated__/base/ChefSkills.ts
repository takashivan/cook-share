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
  ChefSkillsCreateData,
  ChefSkillsCreatePayload,
  ChefSkillsDeleteData,
  ChefSkillsDetailData,
  ChefSkillsListData,
  ChefSkillsPartialUpdateData,
  ChefSkillsPartialUpdatePayload,
  ChefSkillsUpdateData,
  ChefSkillsUpdatePayload,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class ChefSkills<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags chef-skills
   * @name ChefSkillsDelete
   * @request DELETE:/chef-skills/{chef_skill_id}
   */
  chefSkillsDelete = (chefSkillId: number, params: RequestParams = {}) =>
    this.request<ChefSkillsDeleteData, void>({
      path: `/chef-skills/${chefSkillId}`,
      method: "DELETE",
      format: "json",
      ...params,
    });

  chefSkillsDeleteQueryArgs = (
    chefSkillId: number,
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/chef-skills/${chefSkillId}`] : null;
    const fetcher = () =>
      this.chefSkillsDelete(chefSkillId, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags chef-skills
   * @name ChefSkillsDetail
   * @request GET:/chef-skills/{chef_skill_id}
   */
  chefSkillsDetail = (chefSkillId: number, params: RequestParams = {}) =>
    this.request<ChefSkillsDetailData, void>({
      path: `/chef-skills/${chefSkillId}`,
      method: "GET",
      format: "json",
      ...params,
    });

  chefSkillsDetailQueryArgs = (
    chefSkillId: number,
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/chef-skills/${chefSkillId}`] : null;
    const fetcher = () =>
      this.chefSkillsDetail(chefSkillId, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags chef-skills
   * @name ChefSkillsPartialUpdate
   * @request PATCH:/chef-skills/{chef_skill_id}
   */
  chefSkillsPartialUpdate = (
    chefSkillId: number,
    data: ChefSkillsPartialUpdatePayload,
    params: RequestParams = {},
  ) =>
    this.request<ChefSkillsPartialUpdateData, void>({
      path: `/chef-skills/${chefSkillId}`,
      method: "PATCH",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });

  chefSkillsPartialUpdateQueryArgs = (
    chefSkillId: number,
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/chef-skills/${chefSkillId}`] : null;
    const fetcher: (
      url: string[],
      { arg }: { arg: ChefSkillsPartialUpdatePayload },
    ) => Promise<ChefSkillsPartialUpdateData> = (_, { arg }) =>
      this.chefSkillsPartialUpdate(chefSkillId, arg, params).then(
        (res) => res.data,
      );
    return [key, fetcher] as const;
  };

  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags chef-skills
   * @name ChefSkillsUpdate
   * @request PUT:/chef-skills/{chef_skill_id}
   */
  chefSkillsUpdate = (
    chefSkillId: number,
    data: ChefSkillsUpdatePayload,
    params: RequestParams = {},
  ) =>
    this.request<ChefSkillsUpdateData, void>({
      path: `/chef-skills/${chefSkillId}`,
      method: "PUT",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });

  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags chef-skills
   * @name ChefSkillsList
   * @request GET:/chef-skills
   */
  chefSkillsList = (params: RequestParams = {}) =>
    this.request<ChefSkillsListData, void>({
      path: `/chef-skills`,
      method: "GET",
      format: "json",
      ...params,
    });

  chefSkillsListQueryArgs = (
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/chef-skills`] : null;
    const fetcher = () => this.chefSkillsList(params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description <br /><br /> <b>Authentication:</b> required
   *
   * @tags chef-skills
   * @name ChefSkillsCreate
   * @request POST:/chef-skills
   * @secure
   */
  chefSkillsCreate = (
    data: ChefSkillsCreatePayload,
    params: RequestParams = {},
  ) =>
    this.request<ChefSkillsCreateData, void>({
      path: `/chef-skills`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });

  chefSkillsCreateQueryArgs = (
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/chef-skills`] : null;
    const fetcher: (
      url: string[],
      { arg }: { arg: ChefSkillsCreatePayload },
    ) => Promise<ChefSkillsCreateData> = (_, { arg }) =>
      this.chefSkillsCreate(arg, params).then((res) => res.data);
    return [key, fetcher] as const;
  };
}
