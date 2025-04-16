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

export class Messages<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
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
  /**
   * @description Edit message record <br /><br /> <b>Authentication:</b> not required
   *
   * @tags messages
   * @name MessagesPartialUpdate
   * @summary Edit message record
   * @request PATCH:/messages/{message_id}
   */
  messagesPartialUpdate = (messageId: number, data: MessagesPartialUpdatePayload, params: RequestParams = {}) =>
    this.request<MessagesPartialUpdateData, void>({
      path: `/messages/${messageId}`,
      method: "PATCH",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
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
}
