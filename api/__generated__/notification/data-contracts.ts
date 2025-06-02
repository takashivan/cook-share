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
  id: number;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at: number;
  type:
    | "new_job"
    | "application_status"
    | "new_message"
    | "review"
    | "operator"
    | "payment";
  content: string;
  /** @default "false" */
  is_read: boolean;
  /** @format timestamptz */
  updated_at: number;
  /** @format uuid */
  user_id: string;
  /** url */
  related_link: string;
}[];

export interface MarkReadAllPartialUpdatePayload {
  user_id: string;
}

export type MarkReadAllPartialUpdateData = {
  /** @format int64 */
  id: number;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at: number;
  type:
    | "new_job"
    | "application_status"
    | "new_message"
    | "review"
    | "operator"
    | "payment";
  content: string;
  /** @default "false" */
  is_read: boolean;
  /** @format timestamptz */
  updated_at: number;
  /** @format uuid */
  user_id: string;
  /** url */
  related_link: string;
}[];

export interface ReadPartialUpdateData {
  /** @format int64 */
  id: number;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at: number;
  type:
    | "new_job"
    | "application_status"
    | "new_message"
    | "review"
    | "operator"
    | "payment";
  content: string;
  /** @default "false" */
  is_read: boolean;
  /** @format timestamptz */
  updated_at: number;
  /** @format uuid */
  user_id: string;
  /** url */
  related_link: string;
}

export type ByUserDetailResult = {
  /** @format int64 */
  id: number;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at: number;
  type:
    | "new_job"
    | "application_status"
    | "new_message"
    | "review"
    | "operator"
    | "payment";
  content: string;
  /** @default "false" */
  is_read: boolean;
  /** @format timestamptz */
  updated_at: number;
  /** @format uuid */
  user_id: string;
  /** url */
  related_link: string;
}[];

export interface MarkReadAllPartialUpdateBody {
  user_id: string;
}

export type MarkReadAllPartialUpdateResult = {
  /** @format int64 */
  id: number;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at: number;
  type:
    | "new_job"
    | "application_status"
    | "new_message"
    | "review"
    | "operator"
    | "payment";
  content: string;
  /** @default "false" */
  is_read: boolean;
  /** @format timestamptz */
  updated_at: number;
  /** @format uuid */
  user_id: string;
  /** url */
  related_link: string;
}[];

export interface ReadPartialUpdateResult {
  /** @format int64 */
  id: number;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at: number;
  type:
    | "new_job"
    | "application_status"
    | "new_message"
    | "review"
    | "operator"
    | "payment";
  content: string;
  /** @default "false" */
  is_read: boolean;
  /** @format timestamptz */
  updated_at: number;
  /** @format uuid */
  user_id: string;
  /** url */
  related_link: string;
}

export type ByUserDetailOutput = {
  /** @format uuid */
  id: string;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at: number;
  /** @format uuid */
  companyuser_id: string | null;
  type:
    | "new_job"
    | "application_status"
    | "new_message"
    | "review"
    | "operator"
    | "payment";
  related_link: string;
  /** @default "false" */
  is_read: boolean;
  content: string;
  /** @format int64 */
  job_id: number | null;
  /** @format int64 */
  restaurant_id: number | null;
}[];

export interface MarkReadAllPartialUpdateInput {
  user_id: string;
}

export type MarkReadAllPartialUpdateOutput = {
  /** @format uuid */
  id: string;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at: number;
  /** @format uuid */
  companyuser_id: string | null;
  type:
    | "new_job"
    | "application_status"
    | "new_message"
    | "review"
    | "operator"
    | "payment";
  related_link: string;
  /** @default "false" */
  is_read: boolean;
  content: string;
  /** @format int64 */
  job_id: number | null;
  /** @format int64 */
  restaurant_id: number | null;
}[];

export interface MarkReadPartialUpdateData {
  /** @format uuid */
  id: string;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at: number;
  /** @format uuid */
  companyuser_id: string | null;
  type:
    | "new_job"
    | "application_status"
    | "new_message"
    | "review"
    | "operator"
    | "payment";
  related_link: string;
  /** @default "false" */
  is_read: boolean;
  content: string;
  /** @format int64 */
  job_id: number | null;
  /** @format int64 */
  restaurant_id: number | null;
}

export type ByUserDetailOutput1 = {
  /** @format uuid */
  id: string;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at: number;
  /** @format uuid */
  companyuser_id: string | null;
  type:
    | "new_job"
    | "application_status"
    | "new_message"
    | "review"
    | "operator"
    | "payment";
  related_link: string;
  /** @default "false" */
  is_read: boolean;
  content: string;
  /** @format int64 */
  job_id: number | null;
  /** @format int64 */
  restaurant_id: number | null;
}[];

export interface MarkReadAllPartialUpdateBody1 {
  user_id: string;
}

export type MarkReadAllPartialUpdateResult1 = {
  /** @format uuid */
  id: string;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at: number;
  /** @format uuid */
  companyuser_id: string | null;
  type:
    | "new_job"
    | "application_status"
    | "new_message"
    | "review"
    | "operator"
    | "payment";
  related_link: string;
  /** @default "false" */
  is_read: boolean;
  content: string;
  /** @format int64 */
  job_id: number | null;
  /** @format int64 */
  restaurant_id: number | null;
}[];

export interface MarkReadPartialUpdateResult {
  /** @format uuid */
  id: string;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at: number;
  /** @format uuid */
  companyuser_id: string | null;
  type:
    | "new_job"
    | "application_status"
    | "new_message"
    | "review"
    | "operator"
    | "payment";
  related_link: string;
  /** @default "false" */
  is_read: boolean;
  content: string;
  /** @format int64 */
  job_id: number | null;
  /** @format int64 */
  restaurant_id: number | null;
}
