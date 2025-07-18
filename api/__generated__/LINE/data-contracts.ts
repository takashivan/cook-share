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

export type CheckLineFriendshipStatusDetailData = object;

export interface CheckLineUserDetailData {
  count: string;
}

export interface ConnectLineAccountCreatePayload {
  user_type: string;
  line_user_id: string;
  user_id: string;
  line_display_name: string;
}

export interface ConnectLineAccountCreateData {
  /** @format uuid */
  id: string;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at: number;
  name: string;
  /** @format email */
  email: string;
  /** @format password */
  password: string;
  user_type: string;
  status: string;
  /** @format date */
  last_login_at: string | null;
  /** @format date */
  updated_at: string | null;
  skills: string[];
  experience_level: string;
  bio: string;
  certifications: string[];
  /** @format date */
  dateofbirth: string | null;
  profile_image: string;
  /** @default "false" */
  is_approved: boolean;
  line_user_id: string;
  line_display_name: string;
  /** @default "false" */
  line_notification_enabled: boolean;
  /** @default "false" */
  is_verified: boolean;
  verify_token: string;
  stripe_account_id: string;
  /** @format email */
  pending_email: string;
  email_change_token: string;
  password_reset_token: string;
  /** @default "false" */
  stripe_verified: boolean;
  stripe_requirements: object;
  address: string;
  phone: string;
  last_name: string;
  given_name: string;
  last_name_kana: string;
  given_name_kana: string;
  categories: number[];
  postal_code: string;
  prefecture: string;
  address2: string;
  city: string;
  town: string;
  street: string;
  /** @default "false" */
  profile_completed: boolean;
  position_level: "1" | "2" | "3" | "4";
  invoice_number: string | null;
  magic_link: {
    token: string;
    /**
     * Time the token expires
     * @format timestamptz
     */
    expiration: number;
    /** @default "false" */
    used: boolean;
  } | null;
}

export interface LineDisconnectCreatePayload {
  user_id: string;
}

export interface LineDisconnectCreateData {
  /** @format uuid */
  id: string;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at: number;
  name: string;
  /** @format email */
  email: string;
  /** @format password */
  password: string;
  user_type: string;
  status: string;
  /** @format date */
  last_login_at: string | null;
  /** @format date */
  updated_at: string | null;
  skills: string[];
  experience_level: string;
  bio: string;
  certifications: string[];
  /** @format date */
  dateofbirth: string | null;
  profile_image: string;
  /** @default "false" */
  is_approved: boolean;
  line_user_id: string;
  line_display_name: string;
  /** @default "false" */
  line_notification_enabled: boolean;
  /** @default "false" */
  is_verified: boolean;
  verify_token: string;
  stripe_account_id: string;
  /** @format email */
  pending_email: string;
  email_change_token: string;
  password_reset_token: string;
  /** @default "false" */
  stripe_verified: boolean;
  stripe_requirements: object;
  address: string;
  phone: string;
  last_name: string;
  given_name: string;
  last_name_kana: string;
  given_name_kana: string;
  categories: number[];
  postal_code: string;
  prefecture: string;
  address2: string;
  city: string;
  town: string;
  street: string;
  /** @default "false" */
  profile_completed: boolean;
  position_level: "1" | "2" | "3" | "4";
  invoice_number: string | null;
  magic_link: {
    token: string;
    /**
     * Time the token expires
     * @format timestamptz
     */
    expiration: number;
    /** @default "false" */
    used: boolean;
  } | null;
}

export type LineNotifyCreateData = object;

export interface LineWebhookCreateData {
  input: string;
  replyToken: string;
  type: string;
  userId: string;
  api: string;
}

export interface LinkLineIdCreatePayload {
  line_user_id: string;
  name: string;
  picture: string;
  user_id: string;
}

export interface LinkLineIdCreateData {
  /** @format uuid */
  id: string;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at: number;
  name: string;
  /** @format email */
  email: string;
  /** @format password */
  password: string;
  user_type: string;
  status: string;
  /** @format date */
  last_login_at: string | null;
  /** @format date */
  updated_at: string | null;
  skills: string[];
  experience_level: string;
  bio: string;
  certifications: string[];
  /** @format date */
  dateofbirth: string | null;
  profile_image: string;
  /** @default "false" */
  is_approved: boolean;
  line_user_id: string;
  line_display_name: string;
  /** @default "false" */
  line_notification_enabled: boolean;
  /** @default "false" */
  is_verified: boolean;
  verify_token: string;
  stripe_account_id: string;
  /** @format email */
  pending_email: string;
  email_change_token: string;
  password_reset_token: string;
  /** @default "false" */
  stripe_verified: boolean;
  stripe_requirements: object;
  address: string;
  phone: string;
  last_name: string;
  given_name: string;
  last_name_kana: string;
  given_name_kana: string;
  categories: number[];
  postal_code: string;
  prefecture: string;
  address2: string;
  city: string;
  town: string;
  street: string;
  /** @default "false" */
  profile_completed: boolean;
  position_level: "1" | "2" | "3" | "4";
  invoice_number: string | null;
  magic_link: {
    token: string;
    /**
     * Time the token expires
     * @format timestamptz
     */
    expiration: number;
    /** @default "false" */
    used: boolean;
  } | null;
}
