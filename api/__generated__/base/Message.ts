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
  MessageCreateData,
  MessageCreatePayload,
  MessageDeleteData,
  MessageDetailData,
  MessageListData,
  MessagePartialUpdateData,
  MessagePartialUpdatePayload,
  WorksessionDetailData,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Message<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description <br /><br /> <b>Authentication:</b> not required
   *
   * @tags message
   * @name WorksessionDetail
   * @request GET:/message/worksession/{worksession_id}
   */
  worksessionDetail = (worksessionId: number, params: RequestParams = {}) =>
    this.request<WorksessionDetailData, void>({
      path: `/message/worksession/${worksessionId}`,
      method: "GET",
      format: "json",
      ...params,
    });

  worksessionDetailQueryArgs = (
    worksessionId: number,
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/message/worksession/${worksessionId}`] : null;
    const fetcher = () =>
      this.worksessionDetail(worksessionId, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description Delete message record. <br /><br /> <b>Authentication:</b> not required
   *
   * @tags message
   * @name MessageDelete
   * @summary Delete message record.
   * @request DELETE:/message/{message_id}
   */
  messageDelete = (messageId: number, params: RequestParams = {}) =>
    this.request<MessageDeleteData, void>({
      path: `/message/${messageId}`,
      method: "DELETE",
      format: "json",
      ...params,
    });

  messageDeleteQueryArgs = (
    messageId: number,
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/message/${messageId}`] : null;
    const fetcher = () =>
      this.messageDelete(messageId, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description Get message record <br /><br /> <b>Authentication:</b> not required
   *
   * @tags message
   * @name MessageDetail
   * @summary Get message record
   * @request GET:/message/{message_id}
   */
  messageDetail = (messageId: number, params: RequestParams = {}) =>
    this.request<MessageDetailData, void>({
      path: `/message/${messageId}`,
      method: "GET",
      format: "json",
      ...params,
    });

  messageDetailQueryArgs = (
    messageId: number,
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/message/${messageId}`] : null;
    const fetcher = () =>
      this.messageDetail(messageId, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description Edit message record <br /><br /> <b>Authentication:</b> not required
   *
   * @tags message
   * @name MessagePartialUpdate
   * @summary Edit message record
   * @request PATCH:/message/{message_id}
   */
  messagePartialUpdate = (
    messageId: number,
    data: MessagePartialUpdatePayload,
    params: RequestParams = {},
  ) =>
    this.request<MessagePartialUpdateData, void>({
      path: `/message/${messageId}`,
      method: "PATCH",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });

  messagePartialUpdateQueryArgs = (
    messageId: number,
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/message/${messageId}`] : null;
    const fetcher: (
      url: string[],
      { arg }: { arg: MessagePartialUpdatePayload },
    ) => Promise<MessagePartialUpdateData> = (_, { arg }) =>
      this.messagePartialUpdate(messageId, arg, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description Query all message records <br /><br /> <b>Authentication:</b> not required
   *
   * @tags message
   * @name MessageList
   * @summary Query all message records
   * @request GET:/message
   */
  messageList = (params: RequestParams = {}) =>
    this.request<MessageListData, void>({
      path: `/message`,
      method: "GET",
      format: "json",
      ...params,
    });

  messageListQueryArgs = (
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/message`] : null;
    const fetcher = () => this.messageList(params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description Add message record <br /><br /> <b>Authentication:</b> not required
   *
   * @tags message
   * @name MessageCreate
   * @summary Add message record
   * @request POST:/message
   */
  messageCreate = (data: MessageCreatePayload, params: RequestParams = {}) =>
    this.request<MessageCreateData, void>({
      path: `/message`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });

  messageCreateQueryArgs = (
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/message`] : null;
    const fetcher: (
      url: string[],
      { arg }: { arg: MessageCreatePayload },
    ) => Promise<MessageCreateData> = (_, { arg }) =>
      this.messageCreate(arg, params).then((res) => res.data);
    return [key, fetcher] as const;
  };
}
