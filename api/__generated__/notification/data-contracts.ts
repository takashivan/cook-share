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

export type ByUserDetailData = {
  /** @format int64 */
  id?: number;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at?: number;
  type?: "new_job" | "application_status" | "new_message" | "review" | "operator" | "payment";
  content?: string;
  is_read?: boolean;
  /** @format timestamptz */
  updated_at?: number;
  /** @format uuid */
  user_id?: string;
  /** url */
  related_link?: string;
}[];

export type ChefNotificationDeleteData = object;

export interface ChefNotificationDetailData {
  /** @format int64 */
  id?: number;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at?: number;
  type?: "new_job" | "application_status" | "new_message" | "review" | "operator" | "payment";
  content?: string;
  is_read?: boolean;
  /** @format timestamptz */
  updated_at?: number;
  /** @format uuid */
  user_id?: string;
  /** url */
  related_link?: string;
}

export type ChefNotificationListData = {
  /** @format int64 */
  id?: number;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at?: number;
  type?: "new_job" | "application_status" | "new_message" | "review" | "operator" | "payment";
  content?: string;
  is_read?: boolean;
  /** @format timestamptz */
  updated_at?: number;
  /** @format uuid */
  user_id?: string;
  /** url */
  related_link?: string;
}[];

export interface ChefNotificationCreatePayload {
  type?: "new_job" | "application_status" | "new_message" | "review" | "operator" | "payment";
  content?: string;
  is_read?: boolean;
  /** @format timestamptz */
  updated_at?: number;
  /** @format uuid */
  user_id?: string;
  /** url */
  related_link?: string;
}

export interface ChefNotificationCreateData {
  /** @format int64 */
  id?: number;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at?: number;
  type?: "new_job" | "application_status" | "new_message" | "review" | "operator" | "payment";
  content?: string;
  is_read?: boolean;
  /** @format timestamptz */
  updated_at?: number;
  /** @format uuid */
  user_id?: string;
  /** url */
  related_link?: string;
}

export interface ByRestaurantCreatePayload {
  /** @format uuid */
  companyuser_id?: string | null;
  type?: "new_job" | "application_status" | "new_message" | "review" | "operator" | "payment";
  related_link?: string;
  is_read?: boolean;
  content?: string;
}

export type ByRestaurantCreateData = object;

export type ByUserDetailResult = {
  /** @format uuid */
  id?: string;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at?: number;
  /** @format uuid */
  companyuser_id?: string | null;
  type?: "new_job" | "application_status" | "new_message" | "review" | "operator" | "payment";
  related_link?: string;
  is_read?: boolean;
  content?: string;
}[];

export type CompanyuserNotificationDeleteData = object;

export interface CompanyuserNotificationDetailData {
  /** @format uuid */
  id?: string;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at?: number;
  /** @format uuid */
  companyuser_id?: string | null;
  type?: "new_job" | "application_status" | "new_message" | "review" | "operator" | "payment";
  related_link?: string;
  is_read?: boolean;
  content?: string;
}

export interface CompanyuserNotificationPartialUpdatePayload {
  /** @format uuid */
  companyuser_id?: string | null;
  type?: "new_job" | "application_status" | "new_message" | "review" | "operator" | "payment";
  related_link?: string;
  is_read?: boolean;
  content?: string;
}

export interface CompanyuserNotificationPartialUpdateData {
  /** @format uuid */
  id?: string;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at?: number;
  /** @format uuid */
  companyuser_id?: string | null;
  type?: "new_job" | "application_status" | "new_message" | "review" | "operator" | "payment";
  related_link?: string;
  is_read?: boolean;
  content?: string;
}

export type CompanyuserNotificationListData = {
  /** @format uuid */
  id?: string;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at?: number;
  /** @format uuid */
  companyuser_id?: string | null;
  type?: "new_job" | "application_status" | "new_message" | "review" | "operator" | "payment";
  related_link?: string;
  is_read?: boolean;
  content?: string;
}[];

export interface CompanyuserNotificationCreatePayload {
  /** @format uuid */
  companyuser_id?: string | null;
  type?: "new_job" | "application_status" | "new_message" | "review" | "operator" | "payment";
  related_link?: string;
  is_read?: boolean;
  content?: string;
}

export interface CompanyuserNotificationCreateData {
  /** @format uuid */
  id?: string;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at?: number;
  /** @format uuid */
  companyuser_id?: string | null;
  type?: "new_job" | "application_status" | "new_message" | "review" | "operator" | "payment";
  related_link?: string;
  is_read?: boolean;
  content?: string;
}

export type RestaurantNotificationDeleteData = object;

export interface RestaurantNotificationDetailData {
  /** @format int64 */
  id?: number;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at?: number;
  type?: "OPERATOR" | "APPLICATION" | "SESSION";
  content?: string;
  /** @format int64 */
  related_id?: number;
  is_read?: boolean;
  /** @format timestamptz */
  updated_at?: number;
  /** @format int64 */
  user_id?: number;
  /** url */
  related_link?: string;
}

export type RestaurantNotificationListData = {
  /** @format int64 */
  id?: number;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at?: number;
  type?: "OPERATOR" | "APPLICATION" | "SESSION";
  content?: string;
  /** @format int64 */
  related_id?: number;
  is_read?: boolean;
  /** @format timestamptz */
  updated_at?: number;
  /** @format int64 */
  user_id?: number;
  /** url */
  related_link?: string;
}[];

export interface RestaurantNotificationCreatePayload {
  type?: "OPERATOR" | "APPLICATION" | "SESSION";
  content?: string;
  /** @format int64 */
  related_id?: number;
  is_read?: boolean;
  /** @format timestamptz */
  updated_at?: number;
  /** @format int64 */
  user_id?: number;
  /** url */
  related_link?: string;
}

export interface RestaurantNotificationCreateData {
  /** @format int64 */
  id?: number;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at?: number;
  type?: "OPERATOR" | "APPLICATION" | "SESSION";
  content?: string;
  /** @format int64 */
  related_id?: number;
  is_read?: boolean;
  /** @format timestamptz */
  updated_at?: number;
  /** @format int64 */
  user_id?: number;
  /** url */
  related_link?: string;
}
