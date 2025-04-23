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

import {
  ChefSkillCreateData,
  ChefSkillCreatePayload,
  ChefSkillDeleteData,
  ChefSkillDetailData,
  ChefSkillListData,
  ChefSkillPartialUpdateData,
  ChefSkillPartialUpdatePayload,
  ChefSkillUpdateData,
  ChefSkillUpdatePayload,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class ChefSkill<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags chef_skill
   * @name ChefSkillDelete
   * @request DELETE:/chef_skill/{chef_skill_id}
   */
  chefSkillDelete = (chefSkillId: number, params: RequestParams = {}) =>
    this.request<ChefSkillDeleteData, void>({
      path: `/chef_skill/${chefSkillId}`,
      method: "DELETE",
      format: "json",
      ...params,
    });

  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags chef_skill
   * @name ChefSkillDetail
   * @request GET:/chef_skill/{chef_skill_id}
   */
  chefSkillDetail = (chefSkillId: number, params: RequestParams = {}) =>
    this.request<ChefSkillDetailData, void>({
      path: `/chef_skill/${chefSkillId}`,
      method: "GET",
      format: "json",
      ...params,
    });

  chefSkillDetailQueryArgs = (chefSkillId: number, params: RequestParams = {}, enabled: boolean = true) => {
    const key = enabled ? [`/chef_skill/${chefSkillId}`] : null;
    const fetcher = () => this.chefSkillDetail(chefSkillId, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags chef_skill
   * @name ChefSkillPartialUpdate
   * @request PATCH:/chef_skill/{chef_skill_id}
   */
  chefSkillPartialUpdate = (chefSkillId: number, data: ChefSkillPartialUpdatePayload, params: RequestParams = {}) =>
    this.request<ChefSkillPartialUpdateData, void>({
      path: `/chef_skill/${chefSkillId}`,
      method: "PATCH",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });

  chefSkillPartialUpdateQueryArgs = (chefSkillId: number, params: RequestParams = {}, enabled: boolean = true) => {
    const key = enabled ? [`/chef_skill/${chefSkillId}`] : null;
    const fetcher: (
      url: string[],
      { arg }: { arg: ChefSkillPartialUpdatePayload },
    ) => Promise<ChefSkillPartialUpdateData> = (_, { arg }) =>
      this.chefSkillPartialUpdate(chefSkillId, arg, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags chef_skill
   * @name ChefSkillUpdate
   * @request PUT:/chef_skill/{chef_skill_id}
   */
  chefSkillUpdate = (chefSkillId: number, data: ChefSkillUpdatePayload, params: RequestParams = {}) =>
    this.request<ChefSkillUpdateData, void>({
      path: `/chef_skill/${chefSkillId}`,
      method: "PUT",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });

  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags chef_skill
   * @name ChefSkillList
   * @request GET:/chef_skill
   */
  chefSkillList = (params: RequestParams = {}) =>
    this.request<ChefSkillListData, void>({
      path: `/chef_skill`,
      method: "GET",
      format: "json",
      ...params,
    });

  chefSkillListQueryArgs = (params: RequestParams = {}, enabled: boolean = true) => {
    const key = enabled ? [`/chef_skill`] : null;
    const fetcher = () => this.chefSkillList(params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description <br /><br /> <b>Authentication:</b> required
   *
   * @tags chef_skill
   * @name ChefSkillCreate
   * @request POST:/chef_skill
   * @secure
   */
  chefSkillCreate = (data: ChefSkillCreatePayload, params: RequestParams = {}) =>
    this.request<ChefSkillCreateData, void>({
      path: `/chef_skill`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });

  chefSkillCreateQueryArgs = (params: RequestParams = {}, enabled: boolean = true) => {
    const key = enabled ? [`/chef_skill`] : null;
    const fetcher: (url: string[], { arg }: { arg: ChefSkillCreatePayload }) => Promise<ChefSkillCreateData> = (
      _,
      { arg },
    ) => this.chefSkillCreate(arg, params).then((res) => res.data);
    return [key, fetcher] as const;
  };
}
