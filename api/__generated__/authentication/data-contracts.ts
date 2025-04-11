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

export interface LoginCreatePayload {
  /** @format email */
  email?: string;
  password?: string;
}

export interface LoginCreateData {
  authToken?: string;
  user?: {
    /** @format uuid */
    id?: string;
    /**
     * @format timestamptz
     * @default "now"
     */
    created_at?: number;
    name?: string;
    /** @format email */
    email?: string;
    /** @format password */
    password?: string;
  };
}

export interface GetAuthData {
  /** @format uuid */
  id?: string;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at?: number;
  name?: string;
  /** @format email */
  email?: string;
  /** @format password */
  password?: string;
  user_type?: string;
  status?: string;
  /** @format date */
  last_login_at?: string | null;
  /** @format date */
  updated_at?: string | null;
  skills?: string[];
  experience_level?: string;
  bio?: string;
  certifications?: string[];
  /** @format date */
  dateofbirth?: string | null;
  profile_image?: string;
  is_approved?: boolean;
  line_user_id?: string;
  line_display_name?: string;
  line_notification_enabled?: boolean;
}

export interface SignupCreatePayload {
  name?: string;
  /** @format email */
  email?: string;
  password?: string;
}

export interface SignupCreateData {
  authToken?: string;
  user?: {
    /** @format uuid */
    id?: string;
    /**
     * @format timestamptz
     * @default "now"
     */
    created_at?: number;
    name?: string;
    /** @format email */
    email?: string;
    /** @format password */
    password?: string;
    user_type?: string;
    status?: string;
    /** @format date */
    last_login_at?: string | null;
    /** @format date */
    updated_at?: string | null;
    skills?: string[];
    experience_level?: string;
    bio?: string;
    certifications?: string[];
    /** @format date */
    dateofbirth?: string | null;
    profile_image?: string;
    is_approved?: boolean;
    line_user_id?: string;
    line_display_name?: string;
    line_notification_enabled?: boolean;
  };
}
