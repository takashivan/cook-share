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

export type AlertDeleteData = object;

export interface AlertDetailData {
  /** @format int64 */
  id?: number;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at?: number;
  message?: string;
  /** @format int64 */
  job_id?: number;
  messages?: string;
  json?: object;
  status?: "OK" | "NG";
}

export interface AlertPartialUpdatePayload {
  message?: string;
  /** @format int64 */
  job_id?: number;
  messages?: string;
  json?: object;
  status?: "OK" | "NG";
}

export interface AlertPartialUpdateData {
  /** @format int64 */
  id?: number;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at?: number;
  message?: string;
  /** @format int64 */
  job_id?: number;
  messages?: string;
  json?: object;
  status?: "OK" | "NG";
}

export type AlertListData = {
  /** @format int64 */
  id?: number;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at?: number;
  message?: string;
  /** @format int64 */
  job_id?: number;
  messages?: string;
  json?: object;
  status?: "OK" | "NG";
}[];

export interface AlertCreatePayload {
  message?: string;
  /** @format int64 */
  job_id?: number;
  messages?: string;
  json?: object;
  status?: "OK" | "NG";
}

export interface AlertCreateData {
  /** @format int64 */
  id?: number;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at?: number;
  message?: string;
  /** @format int64 */
  job_id?: number;
  messages?: string;
  json?: object;
  status?: "OK" | "NG";
}

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
    /** @format email */
    email?: string;
    /** @format password */
    password?: string;
    name?: string;
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
  /** @format email */
  email?: string;
  name?: string;
}

export interface SignupCreatePayload {
  /** @format email */
  email?: string;
  /** @format password */
  password?: string;
  name?: string;
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
    /** @format email */
    email?: string;
    /** @format password */
    password?: string;
    name?: string;
  };
}

export type ChefSkillDeleteData = object;

export interface ChefSkillDetailData {
  /** @format int64 */
  id?: number;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at?: number;
  skill?: string;
}

export interface ChefSkillPartialUpdatePayload {
  skill?: string;
}

export interface ChefSkillPartialUpdateData {
  /** @format int64 */
  id?: number;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at?: number;
  skill?: string;
}

export interface ChefSkillUpdatePayload {
  skill?: string;
}

export interface ChefSkillUpdateData {
  /** @format int64 */
  id?: number;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at?: number;
  skill?: string;
}

export type ChefSkillListData = {
  /** @format int64 */
  id?: number;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at?: number;
  skill?: string;
}[];

export interface ChefSkillCreatePayload {
  skill?: string;
}

export interface ChefSkillCreateData {
  /** @format int64 */
  id?: number;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at?: number;
  skill?: string;
}

export interface JobApprovePartialUpdatePayload {
  job_id?: string;
  reason?: string;
}

export interface JobApprovePartialUpdateData {
  job?: {
    /** @format int64 */
    id?: number;
    /**
     * @format timestamptz
     * @default "now"
     */
    created_at?: number;
    title?: string;
    description?: string;
    /** @format date */
    work_date?: string;
    /** @format timestamptz */
    start_time?: number;
    /** @format timestamptz */
    end_time?: number;
    hourly_rate?: number;
    required_skills?: string[];
    status?: string;
    /** @format timestamptz */
    updated_at?: number;
    /** @format int64 */
    restaurant_id?: number;
    image?: string;
    task?: string;
    skill?: string;
    whattotake?: string;
    note?: string;
    point?: string;
    transportation?: string;
    /** @default "1" */
    is_approved?: boolean;
  };
  adminlog?: {
    /** @format int64 */
    id?: number;
    /**
     * @format timestamptz
     * @default "now"
     */
    created_at?: number;
    /** @format int64 */
    target_id?: number;
    target_type?: string;
    action?: string;
    reason?: string;
    /** @format uuid */
    operator_id?: string | null;
  };
}

export interface JobBanPartialUpdatePayload {
  job_id?: string;
  reason?: string;
}

export interface JobBanPartialUpdateData {
  job?: {
    /** @format int64 */
    id?: number;
    /**
     * @format timestamptz
     * @default "now"
     */
    created_at?: number;
    title?: string;
    description?: string;
    /** @format date */
    work_date?: string;
    /** @format timestamptz */
    start_time?: number;
    /** @format timestamptz */
    end_time?: number;
    hourly_rate?: number;
    required_skills?: string[];
    status?: string;
    /** @format timestamptz */
    updated_at?: number;
    /** @format int64 */
    restaurant_id?: number;
    image?: string;
    task?: string;
    skill?: string;
    whattotake?: string;
    note?: string;
    point?: string;
    transportation?: string;
    /** @default "1" */
    is_approved?: boolean;
  };
  adminlog?: {
    /** @format int64 */
    id?: number;
    /**
     * @format timestamptz
     * @default "now"
     */
    created_at?: number;
    /** @format int64 */
    target_id?: number;
    target_type?: string;
    action?: string;
    reason?: string;
    /** @format uuid */
    operator_id?: string | null;
  };
}

export interface RestaurantApprovePartialUpdatePayload {
  restaurant_id?: string;
  reason?: string;
}

export interface RestaurantApprovePartialUpdateData {
  restaurant?: {
    /** @format int64 */
    id?: number;
    /**
     * @format timestamptz
     * @default "now"
     */
    created_at?: number;
    name?: string;
    address?: string;
    cuisine_type?: string;
    business_hours?: string;
    contact_info?: string;
    profile_image?: string;
    /** @format timestamptz */
    updated_at?: number;
    /** Whether the restaurant is active. */
    is_active?: boolean;
    /** @format uuid */
    companies_id?: string | null;
    station?: string;
    access?: string;
    rating?: number;
    /** @default "1" */
    is_approved?: boolean;
    cuisine_category?: number[] | null;
  };
  adminlog?: {
    /** @format int64 */
    id?: number;
    /**
     * @format timestamptz
     * @default "now"
     */
    created_at?: number;
    /** @format int64 */
    target_id?: number;
    target_type?: string;
    action?: string;
    reason?: string;
    /** @format uuid */
    operator_id?: string | null;
  };
}

export interface RestaurantBanPartialUpdatePayload {
  restaurant_id?: string;
  reason?: string;
}

export interface RestaurantBanPartialUpdateData {
  restaurant?: {
    /** @format int64 */
    id?: number;
    /**
     * @format timestamptz
     * @default "now"
     */
    created_at?: number;
    name?: string;
    address?: string;
    cuisine_type?: string;
    business_hours?: string;
    contact_info?: string;
    profile_image?: string;
    /** @format timestamptz */
    updated_at?: number;
    /** Whether the restaurant is active. */
    is_active?: boolean;
    /** @format uuid */
    companies_id?: string | null;
    station?: string;
    access?: string;
    rating?: number;
    /** @default "1" */
    is_approved?: boolean;
    cuisine_category?: number[] | null;
  };
  adminlog?: {
    /** @format int64 */
    id?: number;
    /**
     * @format timestamptz
     * @default "now"
     */
    created_at?: number;
    /** @format int64 */
    target_id?: number;
    target_type?: string;
    action?: string;
    reason?: string;
    /** @format uuid */
    operator_id?: string | null;
  };
}

export interface UserApprovePartialUpdatePayload {
  user_id?: string;
}

export interface UserApprovePartialUpdateData {
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
}

export interface UserBanPartialUpdatePayload {
  user_id?: string;
  reason?: string;
}

export interface UserBanPartialUpdateData {
  result1?: {
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
  };
  adminlog?: {
    /** @format int64 */
    id?: number;
    /**
     * @format timestamptz
     * @default "now"
     */
    created_at?: number;
    /** @format int64 */
    target_id?: number;
    target_type?: string;
    action?: string;
    reason?: string;
    /** @format uuid */
    operator_id?: string | null;
  };
}

export type OperatorDeleteData = object;

export interface OperatorDetailData {
  /** @format uuid */
  id?: string;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at?: number;
  /** @format email */
  email?: string;
  /** @format password */
  password?: string;
  name?: string;
}

export interface OperatorPartialUpdatePayload {
  /** @format email */
  email?: string;
  name?: string;
}

export interface OperatorPartialUpdateData {
  /** @format uuid */
  id?: string;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at?: number;
  /** @format email */
  email?: string;
  /** @format password */
  password?: string;
  name?: string;
}

export type OperatorListData = {
  /** @format uuid */
  id?: string;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at?: number;
  /** @format email */
  email?: string;
  /** @format password */
  password?: string;
  name?: string;
}[];

export interface OperatorCreatePayload {
  /** @format email */
  email?: string;
  name?: string;
}

export interface OperatorCreateData {
  /** @format uuid */
  id?: string;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at?: number;
  /** @format email */
  email?: string;
  /** @format password */
  password?: string;
  name?: string;
}

export type RestaurantCuisineDeleteData = object;

export interface RestaurantCuisineDetailData {
  /** @format int64 */
  id?: number;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at?: number;
  /** Whether this cuisine is the primary cuisine for the restaurant. */
  is_primary?: boolean;
  category?: string;
}

export interface RestaurantCuisinePartialUpdatePayload {
  /** Whether this cuisine is the primary cuisine for the restaurant. */
  is_primary?: boolean;
  category?: string;
}

export interface RestaurantCuisinePartialUpdateData {
  /** @format int64 */
  id?: number;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at?: number;
  /** Whether this cuisine is the primary cuisine for the restaurant. */
  is_primary?: boolean;
  category?: string;
}

export interface RestaurantCuisineUpdatePayload {
  /** Whether this cuisine is the primary cuisine for the restaurant. */
  is_primary?: boolean;
  category?: string;
}

export interface RestaurantCuisineUpdateData {
  /** @format int64 */
  id?: number;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at?: number;
  /** Whether this cuisine is the primary cuisine for the restaurant. */
  is_primary?: boolean;
  category?: string;
}

export type RestaurantCuisineListData = {
  /** @format int64 */
  id?: number;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at?: number;
  /** Whether this cuisine is the primary cuisine for the restaurant. */
  is_primary?: boolean;
  category?: string;
}[];

export interface RestaurantCuisineCreatePayload {
  /** Whether this cuisine is the primary cuisine for the restaurant. */
  is_primary?: boolean;
  category?: string;
}

export interface RestaurantCuisineCreateData {
  /** @format int64 */
  id?: number;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at?: number;
  /** Whether this cuisine is the primary cuisine for the restaurant. */
  is_primary?: boolean;
  category?: string;
}
