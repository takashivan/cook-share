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
  MessageattachmentCreateData,
  MessageattachmentCreatePayload,
  MessageattachmentDeleteData,
  MessageattachmentDetailData,
  MessageattachmentListData,
  MessageattachmentPartialUpdateData,
  MessageattachmentPartialUpdatePayload,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Messageattachment<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description Delete messageAttachment record. <br /><br /> <b>Authentication:</b> not required
   *
   * @tags messageattachment
   * @name MessageattachmentDelete
   * @summary Delete messageAttachment record.
   * @request DELETE:/messageattachment/{messageattachment_id}
   */
  messageattachmentDelete = (
    messageattachmentId: string,
    params: RequestParams = {},
  ) =>
    this.request<MessageattachmentDeleteData, void>({
      path: `/messageattachment/${messageattachmentId}`,
      method: "DELETE",
      format: "json",
      ...params,
    });

  messageattachmentDeleteQueryArgs = (
    messageattachmentId: string,
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/messageattachment/${messageattachmentId}`] : null;
    const fetcher = () =>
      this.messageattachmentDelete(messageattachmentId, params).then(
        (res) => res.data,
      );
    return [key, fetcher] as const;
  };

  /**
   * @description Get messageAttachment record <br /><br /> <b>Authentication:</b> not required
   *
   * @tags messageattachment
   * @name MessageattachmentDetail
   * @summary Get messageAttachment record
   * @request GET:/messageattachment/{messageattachment_id}
   */
  messageattachmentDetail = (
    messageattachmentId: string,
    params: RequestParams = {},
  ) =>
    this.request<MessageattachmentDetailData, void>({
      path: `/messageattachment/${messageattachmentId}`,
      method: "GET",
      format: "json",
      ...params,
    });

  messageattachmentDetailQueryArgs = (
    messageattachmentId: string,
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/messageattachment/${messageattachmentId}`] : null;
    const fetcher = () =>
      this.messageattachmentDetail(messageattachmentId, params).then(
        (res) => res.data,
      );
    return [key, fetcher] as const;
  };

  /**
   * @description Edit messageAttachment record <br /><br /> <b>Authentication:</b> not required
   *
   * @tags messageattachment
   * @name MessageattachmentPartialUpdate
   * @summary Edit messageAttachment record
   * @request PATCH:/messageattachment/{messageattachment_id}
   */
  messageattachmentPartialUpdate = (
    messageattachmentId: string,
    data: MessageattachmentPartialUpdatePayload,
    params: RequestParams = {},
  ) =>
    this.request<MessageattachmentPartialUpdateData, void>({
      path: `/messageattachment/${messageattachmentId}`,
      method: "PATCH",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });

  messageattachmentPartialUpdateQueryArgs = (
    messageattachmentId: string,
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/messageattachment/${messageattachmentId}`] : null;
    const fetcher: (
      url: string[],
      { arg }: { arg: MessageattachmentPartialUpdatePayload },
    ) => Promise<MessageattachmentPartialUpdateData> = (_, { arg }) =>
      this.messageattachmentPartialUpdate(
        messageattachmentId,
        arg,
        params,
      ).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description Query all messageAttachment records <br /><br /> <b>Authentication:</b> not required
   *
   * @tags messageattachment
   * @name MessageattachmentList
   * @summary Query all messageAttachment records
   * @request GET:/messageattachment
   */
  messageattachmentList = (params: RequestParams = {}) =>
    this.request<MessageattachmentListData, void>({
      path: `/messageattachment`,
      method: "GET",
      format: "json",
      ...params,
    });

  messageattachmentListQueryArgs = (
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/messageattachment`] : null;
    const fetcher = () =>
      this.messageattachmentList(params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description Add messageAttachment record <br /><br /> <b>Authentication:</b> not required
   *
   * @tags messageattachment
   * @name MessageattachmentCreate
   * @summary Add messageAttachment record
   * @request POST:/messageattachment
   */
  messageattachmentCreate = (
    data: MessageattachmentCreatePayload,
    params: RequestParams = {},
  ) =>
    this.request<MessageattachmentCreateData, void>({
      path: `/messageattachment`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });

  messageattachmentCreateQueryArgs = (
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/messageattachment`] : null;
    const fetcher: (
      url: string[],
      { arg }: { arg: MessageattachmentCreatePayload },
    ) => Promise<MessageattachmentCreateData> = (_, { arg }) =>
      this.messageattachmentCreate(arg, params).then((res) => res.data);
    return [key, fetcher] as const;
  };
}
