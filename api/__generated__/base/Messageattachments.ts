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
  MessageattachmentsCreateData,
  MessageattachmentsCreatePayload,
  MessageattachmentsDeleteData,
  MessageattachmentsDetailData,
  MessageattachmentsListData,
  MessageattachmentsPartialUpdateData,
  MessageattachmentsPartialUpdatePayload,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Messageattachments<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * @description Delete messageAttachment record. <br /><br /> <b>Authentication:</b> not required
   *
   * @tags messageattachments
   * @name MessageattachmentsDelete
   * @summary Delete messageAttachment record.
   * @request DELETE:/messageattachments/{messageattachment_id}
   */
  messageattachmentsDelete = (messageattachmentId: string, params: RequestParams = {}) =>
    this.request<MessageattachmentsDeleteData, void>({
      path: `/messageattachments/${messageattachmentId}`,
      method: "DELETE",
      format: "json",
      ...params,
    });

  /**
   * @description Get messageAttachment record <br /><br /> <b>Authentication:</b> not required
   *
   * @tags messageattachments
   * @name MessageattachmentsDetail
   * @summary Get messageAttachment record
   * @request GET:/messageattachments/{messageattachment_id}
   */
  messageattachmentsDetail = (messageattachmentId: string, params: RequestParams = {}) =>
    this.request<MessageattachmentsDetailData, void>({
      path: `/messageattachments/${messageattachmentId}`,
      method: "GET",
      format: "json",
      ...params,
    });

  messageattachmentsDetailQueryArgs = (
    messageattachmentId: string,
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/messageattachments/${messageattachmentId}`] : null;
    const fetcher = () => this.messageattachmentsDetail(messageattachmentId, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description Edit messageAttachment record <br /><br /> <b>Authentication:</b> not required
   *
   * @tags messageattachments
   * @name MessageattachmentsPartialUpdate
   * @summary Edit messageAttachment record
   * @request PATCH:/messageattachments/{messageattachment_id}
   */
  messageattachmentsPartialUpdate = (
    messageattachmentId: string,
    data: MessageattachmentsPartialUpdatePayload,
    params: RequestParams = {},
  ) =>
    this.request<MessageattachmentsPartialUpdateData, void>({
      path: `/messageattachments/${messageattachmentId}`,
      method: "PATCH",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });

  messageattachmentsPartialUpdateQueryArgs = (
    messageattachmentId: string,
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/messageattachments/${messageattachmentId}`] : null;
    const fetcher: (
      url: string[],
      { arg }: { arg: MessageattachmentsPartialUpdatePayload },
    ) => Promise<MessageattachmentsPartialUpdateData> = (_, { arg }) =>
      this.messageattachmentsPartialUpdate(messageattachmentId, arg, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description Query all messageAttachment records <br /><br /> <b>Authentication:</b> not required
   *
   * @tags messageattachments
   * @name MessageattachmentsList
   * @summary Query all messageAttachment records
   * @request GET:/messageattachments
   */
  messageattachmentsList = (params: RequestParams = {}) =>
    this.request<MessageattachmentsListData, void>({
      path: `/messageattachments`,
      method: "GET",
      format: "json",
      ...params,
    });

  messageattachmentsListQueryArgs = (params: RequestParams = {}, enabled: boolean = true) => {
    const key = enabled ? [`/messageattachments`] : null;
    const fetcher = () => this.messageattachmentsList(params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description Add messageAttachment record <br /><br /> <b>Authentication:</b> not required
   *
   * @tags messageattachments
   * @name MessageattachmentsCreate
   * @summary Add messageAttachment record
   * @request POST:/messageattachments
   */
  messageattachmentsCreate = (data: MessageattachmentsCreatePayload, params: RequestParams = {}) =>
    this.request<MessageattachmentsCreateData, void>({
      path: `/messageattachments`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });

  messageattachmentsCreateQueryArgs = (params: RequestParams = {}, enabled: boolean = true) => {
    const key = enabled ? [`/messageattachments`] : null;
    const fetcher: (
      url: string[],
      { arg }: { arg: MessageattachmentsCreatePayload },
    ) => Promise<MessageattachmentsCreateData> = (_, { arg }) =>
      this.messageattachmentsCreate(arg, params).then((res) => res.data);
    return [key, fetcher] as const;
  };
}
