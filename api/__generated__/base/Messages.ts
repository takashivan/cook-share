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
  MessagesCreateData,
  MessagesCreatePayload,
  MessagesDeleteData,
  MessagesDetailData,
  MessagesListData,
  MessagesPartialUpdateData,
  MessagesPartialUpdatePayload,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Messages<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description Delete message record. <br /><br /> <b>Authentication:</b> not required
   *
   * @tags messages
   * @name MessagesDelete
   * @summary Delete message record.
   * @request DELETE:/messages/{message_id}
   */
  messagesDelete = (messageId: number, params: RequestParams = {}) =>
    this.request<MessagesDeleteData, void>({
      path: `/messages/${messageId}`,
      method: "DELETE",
      format: "json",
      ...params,
    });

  messagesDeleteQueryArgs = (
    messageId: number,
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/messages/${messageId}`] : null;
    const fetcher = () =>
      this.messagesDelete(messageId, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description Get message record <br /><br /> <b>Authentication:</b> not required
   *
   * @tags messages
   * @name MessagesDetail
   * @summary Get message record
   * @request GET:/messages/{message_id}
   */
  messagesDetail = (messageId: number, params: RequestParams = {}) =>
    this.request<MessagesDetailData, void>({
      path: `/messages/${messageId}`,
      method: "GET",
      format: "json",
      ...params,
    });

  messagesDetailQueryArgs = (
    messageId: number,
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/messages/${messageId}`] : null;
    const fetcher = () =>
      this.messagesDetail(messageId, params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description Edit message record <br /><br /> <b>Authentication:</b> not required
   *
   * @tags messages
   * @name MessagesPartialUpdate
   * @summary Edit message record
   * @request PATCH:/messages/{message_id}
   */
  messagesPartialUpdate = (
    messageId: number,
    data: MessagesPartialUpdatePayload,
    params: RequestParams = {},
  ) =>
    this.request<MessagesPartialUpdateData, void>({
      path: `/messages/${messageId}`,
      method: "PATCH",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });

  messagesPartialUpdateQueryArgs = (
    messageId: number,
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/messages/${messageId}`] : null;
    const fetcher: (
      url: string[],
      { arg }: { arg: MessagesPartialUpdatePayload },
    ) => Promise<MessagesPartialUpdateData> = (_, { arg }) =>
      this.messagesPartialUpdate(messageId, arg, params).then(
        (res) => res.data,
      );
    return [key, fetcher] as const;
  };

  /**
   * @description Query all message records <br /><br /> <b>Authentication:</b> not required
   *
   * @tags messages
   * @name MessagesList
   * @summary Query all message records
   * @request GET:/messages
   */
  messagesList = (params: RequestParams = {}) =>
    this.request<MessagesListData, void>({
      path: `/messages`,
      method: "GET",
      format: "json",
      ...params,
    });

  messagesListQueryArgs = (
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/messages`] : null;
    const fetcher = () => this.messagesList(params).then((res) => res.data);
    return [key, fetcher] as const;
  };

  /**
   * @description Add message record <br /><br /> <b>Authentication:</b> not required
   *
   * @tags messages
   * @name MessagesCreate
   * @summary Add message record
   * @request POST:/messages
   */
  messagesCreate = (data: MessagesCreatePayload, params: RequestParams = {}) =>
    this.request<MessagesCreateData, void>({
      path: `/messages`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });

  messagesCreateQueryArgs = (
    params: RequestParams = {},
    enabled: boolean = true,
  ) => {
    const key = enabled ? [`/messages`] : null;
    const fetcher: (
      url: string[],
      { arg }: { arg: MessagesCreatePayload },
    ) => Promise<MessagesCreateData> = (_, { arg }) =>
      this.messagesCreate(arg, params).then((res) => res.data);
    return [key, fetcher] as const;
  };
}
