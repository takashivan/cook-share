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
  id: number;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at: number;
  /** @format int64 */
  job_id: number;
  messages: string;
  status: "OK" | "NG";
}

export interface AlertPartialUpdatePayload {
  /** @format int64 */
  job_id: number;
  messages: string;
  status: "OK" | "NG";
}

export interface AlertPartialUpdateData {
  /** @format int64 */
  id: number;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at: number;
  /** @format int64 */
  job_id: number;
  messages: string;
  status: "OK" | "NG";
}

export type AlertsDeleteData = object;

export interface AlertsDetailData {
  /** @format int64 */
  id: number;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at: number;
  /** @format int64 */
  job_id: number;
  messages: string;
  status: "OK" | "NG";
}

export interface AlertsPartialUpdatePayload {
  /** @format int64 */
  job_id: number;
  messages: string;
  status: "OK" | "NG";
}

export interface AlertsPartialUpdateData {
  /** @format int64 */
  id: number;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at: number;
  /** @format int64 */
  job_id: number;
  messages: string;
  status: "OK" | "NG";
}

export type AlertsListData = {
  /** @format int64 */
  id: number;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at: number;
  /** @format int64 */
  job_id: number;
  messages: string;
  status: "OK" | "NG";
}[];

export interface AlertsCreatePayload {
  /** @format int64 */
  job_id: number;
  messages: string;
  status: "OK" | "NG";
}

export interface AlertsCreateData {
  /** @format int64 */
  id: number;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at: number;
  /** @format int64 */
  job_id: number;
  messages: string;
  status: "OK" | "NG";
}

export type AlertListData = {
  /** @format int64 */
  id: number;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at: number;
  /** @format int64 */
  job_id: number;
  messages: string;
  status: "OK" | "NG";
}[];

export interface AlertCreatePayload {
  /** @format int64 */
  job_id: number;
  messages: string;
  status: "OK" | "NG";
}

export interface AlertCreateData {
  /** @format int64 */
  id: number;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at: number;
  /** @format int64 */
  job_id: number;
  messages: string;
  status: "OK" | "NG";
}

export interface LoginCreatePayload {
  /** @format email */
  email: string;
  password: string;
}

export interface LoginCreateData {
  authToken: string;
  user: {
    /** @format uuid */
    id: string;
    /**
     * @format timestamptz
     * @default "now"
     */
    created_at: number;
    /** @format email */
    email: string;
    /** @format password */
    password: string;
    name: string;
  };
}

export interface GetAuthData {
  /** @format uuid */
  id: string;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at: number;
  /** @format email */
  email: string;
  name: string;
}

export interface SignupCreatePayload {
  /** @format email */
  email: string;
  /** @format password */
  password: string;
  name: string;
}

export interface SignupCreateData {
  authToken: string;
  user: {
    /** @format uuid */
    id: string;
    /**
     * @format timestamptz
     * @default "now"
     */
    created_at: number;
    /** @format email */
    email: string;
    /** @format password */
    password: string;
    name: string;
  };
}

export interface JobApprovePartialUpdatePayload {
  job_id: string;
  reason: string;
}

export interface JobApprovePartialUpdateData {
  job: {
    /** @format int64 */
    id: number;
    /**
     * @format timestamptz
     * @default "now"
     */
    created_at: number;
    title: string;
    description: string;
    /** @format date */
    work_date: string;
    /** @format timestamptz */
    start_time: number;
    /** @format timestamptz */
    end_time: number;
    hourly_rate: number;
    required_skills: string[];
    status: "DRAFT" | "PUBLISHED" | "EXPIRED" | "PENDING" | "DELETED";
    /** @format timestamptz */
    updated_at: number;
    /** @format int64 */
    restaurant_id: number;
    image: string;
    task: string;
    skill: string;
    whattotake: string;
    note: string;
    point: string;
    transportation: string;
    /** @default "1" */
    is_approved: boolean;
    /** @format int64 */
    number_of_spots: number;
    /** @format int64 */
    fee: number;
    /** @format timestamptz */
    expiry_date: number | null;
  };
  adminlog: {
    /** @format int64 */
    id: number;
    /**
     * @format timestamptz
     * @default "now"
     */
    created_at: number;
    /** @format int64 */
    target_id: number;
    target_type: string;
    action: string;
    reason: string;
    /** @format uuid */
    operator_id: string | null;
  };
}

export interface JobBanPartialUpdatePayload {
  job_id: string;
  reason: string;
}

export interface JobBanPartialUpdateData {
  job: {
    /** @format int64 */
    id: number;
    /**
     * @format timestamptz
     * @default "now"
     */
    created_at: number;
    title: string;
    description: string;
    /** @format date */
    work_date: string;
    /** @format timestamptz */
    start_time: number;
    /** @format timestamptz */
    end_time: number;
    hourly_rate: number;
    required_skills: string[];
    status: "DRAFT" | "PUBLISHED" | "EXPIRED" | "PENDING" | "DELETED";
    /** @format timestamptz */
    updated_at: number;
    /** @format int64 */
    restaurant_id: number;
    image: string;
    task: string;
    skill: string;
    whattotake: string;
    note: string;
    point: string;
    transportation: string;
    /** @default "1" */
    is_approved: boolean;
    /** @format int64 */
    number_of_spots: number;
    /** @format int64 */
    fee: number;
    /** @format timestamptz */
    expiry_date: number | null;
  };
  adminlog: {
    /** @format int64 */
    id: number;
    /**
     * @format timestamptz
     * @default "now"
     */
    created_at: number;
    /** @format int64 */
    target_id: number;
    target_type: string;
    action: string;
    reason: string;
    /** @format uuid */
    operator_id: string | null;
  };
}

export interface JobsApprovePartialUpdatePayload {
  reason: string;
}

export interface JobsApprovePartialUpdateData {
  job: {
    /** @format int64 */
    id: number;
    /**
     * @format timestamptz
     * @default "now"
     */
    created_at: number;
    title: string;
    description: string;
    /** @format date */
    work_date: string;
    /** @format timestamptz */
    start_time: number;
    /** @format timestamptz */
    end_time: number;
    hourly_rate: number;
    required_skills: string[];
    status: "DRAFT" | "PUBLISHED" | "EXPIRED" | "PENDING" | "DELETED";
    /** @format timestamptz */
    updated_at: number;
    /** @format int64 */
    restaurant_id: number;
    image: string;
    task: string;
    skill: string;
    whattotake: string;
    note: string;
    point: string;
    transportation: string;
    /** @default "1" */
    is_approved: boolean;
    /** @format int64 */
    number_of_spots: number;
    /** @format int64 */
    fee: number;
    /** @format timestamptz */
    expiry_date: number | null;
  };
  adminlog: {
    /** @format int64 */
    id: number;
    /**
     * @format timestamptz
     * @default "now"
     */
    created_at: number;
    /** @format int64 */
    target_id: number;
    target_type: string;
    action: string;
    reason: string;
    /** @format uuid */
    operator_id: string | null;
  };
}

export interface JobsBanPartialUpdatePayload {
  reason: string;
}

export interface JobsBanPartialUpdateData {
  job: {
    /** @format int64 */
    id: number;
    /**
     * @format timestamptz
     * @default "now"
     */
    created_at: number;
    title: string;
    description: string;
    /** @format date */
    work_date: string;
    /** @format timestamptz */
    start_time: number;
    /** @format timestamptz */
    end_time: number;
    hourly_rate: number;
    required_skills: string[];
    status: "DRAFT" | "PUBLISHED" | "EXPIRED" | "PENDING" | "DELETED";
    /** @format timestamptz */
    updated_at: number;
    /** @format int64 */
    restaurant_id: number;
    image: string;
    task: string;
    skill: string;
    whattotake: string;
    note: string;
    point: string;
    transportation: string;
    /** @default "1" */
    is_approved: boolean;
    /** @format int64 */
    number_of_spots: number;
    /** @format int64 */
    fee: number;
    /** @format timestamptz */
    expiry_date: number | null;
  };
  adminlog: {
    /** @format int64 */
    id: number;
    /**
     * @format timestamptz
     * @default "now"
     */
    created_at: number;
    /** @format int64 */
    target_id: number;
    target_type: string;
    action: string;
    reason: string;
    /** @format uuid */
    operator_id: string | null;
  };
}

export interface RestaurantApprovePartialUpdatePayload {
  restaurant_id: string;
  reason: string;
}

export interface RestaurantApprovePartialUpdateData {
  restaurant: {
    /** @format int64 */
    id: number;
    /**
     * @format timestamptz
     * @default "now"
     */
    created_at: number;
    name: string;
    address: string;
    cuisine_type: string;
    business_hours: string;
    contact_info: string;
    profile_image: string;
    /** @format timestamptz */
    updated_at: number;
    /** Whether the restaurant is active. */
    is_active: boolean;
    /** @format uuid */
    companies_id: string | null;
    station: string;
    access: string;
    rating: number;
    /** @default "1" */
    is_approved: boolean;
    restaurant_cuisine_id: number[];
    description: string;
    phone: string;
  };
  adminlog: {
    /** @format int64 */
    id: number;
    /**
     * @format timestamptz
     * @default "now"
     */
    created_at: number;
    /** @format int64 */
    target_id: number;
    target_type: string;
    action: string;
    reason: string;
    /** @format uuid */
    operator_id: string | null;
  };
}

export interface RestaurantBanPartialUpdatePayload {
  restaurant_id: string;
  reason: string;
}

export interface RestaurantBanPartialUpdateData {
  restaurant: {
    /** @format int64 */
    id: number;
    /**
     * @format timestamptz
     * @default "now"
     */
    created_at: number;
    name: string;
    address: string;
    cuisine_type: string;
    business_hours: string;
    contact_info: string;
    profile_image: string;
    /** @format timestamptz */
    updated_at: number;
    /** Whether the restaurant is active. */
    is_active: boolean;
    /** @format uuid */
    companies_id: string | null;
    station: string;
    access: string;
    rating: number;
    /** @default "1" */
    is_approved: boolean;
    restaurant_cuisine_id: number[];
    description: string;
    phone: string;
  };
  adminlog: {
    /** @format int64 */
    id: number;
    /**
     * @format timestamptz
     * @default "now"
     */
    created_at: number;
    /** @format int64 */
    target_id: number;
    target_type: string;
    action: string;
    reason: string;
    /** @format uuid */
    operator_id: string | null;
  };
}

export interface RestaurantsApprovePartialUpdatePayload {
  job_id: string;
  reason: string;
}

export interface RestaurantsApprovePartialUpdateData {
  job: {
    /** @format int64 */
    id: number;
    /**
     * @format timestamptz
     * @default "now"
     */
    created_at: number;
    title: string;
    description: string;
    /** @format date */
    work_date: string;
    /** @format timestamptz */
    start_time: number;
    /** @format timestamptz */
    end_time: number;
    hourly_rate: number;
    required_skills: string[];
    status: "DRAFT" | "PUBLISHED" | "EXPIRED" | "PENDING" | "DELETED";
    /** @format timestamptz */
    updated_at: number;
    /** @format int64 */
    restaurant_id: number;
    image: string;
    task: string;
    skill: string;
    whattotake: string;
    note: string;
    point: string;
    transportation: string;
    /** @default "1" */
    is_approved: boolean;
    /** @format int64 */
    number_of_spots: number;
    /** @format int64 */
    fee: number;
    /** @format timestamptz */
    expiry_date: number | null;
  };
  adminlog: {
    /** @format int64 */
    id: number;
    /**
     * @format timestamptz
     * @default "now"
     */
    created_at: number;
    /** @format int64 */
    target_id: number;
    target_type: string;
    action: string;
    reason: string;
    /** @format uuid */
    operator_id: string | null;
  };
}

export interface RestaurantsBanPartialUpdatePayload {
  reason: string;
}

export interface RestaurantsBanPartialUpdateData {
  restaurant: {
    /** @format int64 */
    id: number;
    /**
     * @format timestamptz
     * @default "now"
     */
    created_at: number;
    name: string;
    address: string;
    cuisine_type: string;
    business_hours: string;
    contact_info: string;
    profile_image: string;
    /** @format timestamptz */
    updated_at: number;
    /** Whether the restaurant is active. */
    is_active: boolean;
    /** @format uuid */
    companies_id: string | null;
    station: string;
    access: string;
    rating: number;
    /** @default "1" */
    is_approved: boolean;
    restaurant_cuisine_id: number[];
    description: string;
    phone: string;
  };
  adminlog: {
    /** @format int64 */
    id: number;
    /**
     * @format timestamptz
     * @default "now"
     */
    created_at: number;
    /** @format int64 */
    target_id: number;
    target_type: string;
    action: string;
    reason: string;
    /** @format uuid */
    operator_id: string | null;
  };
}

export interface UserApprovePartialUpdatePayload {
  user_id: string;
}

export interface UserApprovePartialUpdateData {
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
  is_approved: boolean;
  line_user_id: string;
  line_display_name: string;
  line_notification_enabled: boolean;
  is_verified: boolean;
  verify_token: string;
  stripe_account_id: string;
  /** @format email */
  pending_email: string;
  email_change_token: string;
  password_reset_token: string;
  stripe_verified: boolean;
  stripe_requirements: object;
  magic_link: {
    token: string;
    /**
     * Time the token expires
     * @format timestamptz
     */
    expiration: number;
    used: boolean;
  } | null;
}

export interface UserBanPartialUpdatePayload {
  user_id: string;
  reason: string;
}

export interface UserBanPartialUpdateData {
  result1: {
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
    is_approved: boolean;
    line_user_id: string;
    line_display_name: string;
    line_notification_enabled: boolean;
    is_verified: boolean;
    verify_token: string;
    stripe_account_id: string;
    /** @format email */
    pending_email: string;
    email_change_token: string;
    password_reset_token: string;
    stripe_verified: boolean;
    stripe_requirements: object;
    magic_link: {
      token: string;
      /**
       * Time the token expires
       * @format timestamptz
       */
      expiration: number;
      used: boolean;
    } | null;
  };
  adminlog: {
    /** @format int64 */
    id: number;
    /**
     * @format timestamptz
     * @default "now"
     */
    created_at: number;
    /** @format int64 */
    target_id: number;
    target_type: string;
    action: string;
    reason: string;
    /** @format uuid */
    operator_id: string | null;
  };
}

export interface UsersApprovePartialUpdateData {
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
  is_approved: boolean;
  line_user_id: string;
  line_display_name: string;
  line_notification_enabled: boolean;
  is_verified: boolean;
  verify_token: string;
  stripe_account_id: string;
  /** @format email */
  pending_email: string;
  email_change_token: string;
  password_reset_token: string;
  stripe_verified: boolean;
  stripe_requirements: object;
  magic_link: {
    token: string;
    /**
     * Time the token expires
     * @format timestamptz
     */
    expiration: number;
    used: boolean;
  } | null;
}

export interface UsersBanPartialUpdatePayload {
  reason: string;
}

export interface UsersBanPartialUpdateData {
  result1: {
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
    is_approved: boolean;
    line_user_id: string;
    line_display_name: string;
    line_notification_enabled: boolean;
    is_verified: boolean;
    verify_token: string;
    stripe_account_id: string;
    /** @format email */
    pending_email: string;
    email_change_token: string;
    password_reset_token: string;
    stripe_verified: boolean;
    stripe_requirements: object;
    magic_link: {
      token: string;
      /**
       * Time the token expires
       * @format timestamptz
       */
      expiration: number;
      used: boolean;
    } | null;
  };
  adminlog: {
    /** @format int64 */
    id: number;
    /**
     * @format timestamptz
     * @default "now"
     */
    created_at: number;
    /** @format int64 */
    target_id: number;
    target_type: string;
    action: string;
    reason: string;
    /** @format uuid */
    operator_id: string | null;
  };
}

export type OperatorDeleteData = object;

export interface OperatorDetailData {
  /** @format uuid */
  id: string;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at: number;
  /** @format email */
  email: string;
  /** @format password */
  password: string;
  name: string;
}

export interface OperatorPartialUpdatePayload {
  /** @format email */
  email: string;
  name: string;
}

export interface OperatorPartialUpdateData {
  /** @format uuid */
  id: string;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at: number;
  /** @format email */
  email: string;
  /** @format password */
  password: string;
  name: string;
}

export type OperatorsDeleteData = object;

export interface OperatorsDetailData {
  /** @format uuid */
  id: string;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at: number;
  /** @format email */
  email: string;
  /** @format password */
  password: string;
  name: string;
}

export interface OperatorsPartialUpdatePayload {
  /** @format email */
  email: string;
  name: string;
}

export interface OperatorsPartialUpdateData {
  /** @format uuid */
  id: string;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at: number;
  /** @format email */
  email: string;
  /** @format password */
  password: string;
  name: string;
}

export type OperatorsListData = {
  /** @format uuid */
  id: string;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at: number;
  /** @format email */
  email: string;
  /** @format password */
  password: string;
  name: string;
}[];

export interface OperatorsCreatePayload {
  /** @format email */
  email: string;
  name: string;
}

export interface OperatorsCreateData {
  /** @format uuid */
  id: string;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at: number;
  /** @format email */
  email: string;
  /** @format password */
  password: string;
  name: string;
}

export type OperatorListData = {
  /** @format uuid */
  id: string;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at: number;
  /** @format email */
  email: string;
  /** @format password */
  password: string;
  name: string;
}[];

export interface OperatorCreatePayload {
  /** @format email */
  email: string;
  name: string;
}

export interface OperatorCreateData {
  /** @format uuid */
  id: string;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at: number;
  /** @format email */
  email: string;
  /** @format password */
  password: string;
  name: string;
}

export type RestaurantCuisineDeleteData = object;

export interface RestaurantCuisineDetailData {
  /** @format int64 */
  id: number;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at: number;
  /** Whether this cuisine is the primary cuisine for the restaurant. */
  is_primary: boolean;
  category: string;
}

export interface RestaurantCuisinePartialUpdatePayload {
  /** Whether this cuisine is the primary cuisine for the restaurant. */
  is_primary: boolean;
  category: string;
}

export interface RestaurantCuisinePartialUpdateData {
  /** @format int64 */
  id: number;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at: number;
  /** Whether this cuisine is the primary cuisine for the restaurant. */
  is_primary: boolean;
  category: string;
}

export interface RestaurantCuisineUpdatePayload {
  /** Whether this cuisine is the primary cuisine for the restaurant. */
  is_primary: boolean;
  category: string;
}

export interface RestaurantCuisineUpdateData {
  /** @format int64 */
  id: number;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at: number;
  /** Whether this cuisine is the primary cuisine for the restaurant. */
  is_primary: boolean;
  category: string;
}

export type RestaurantCuisineListData = {
  /** @format int64 */
  id: number;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at: number;
  /** Whether this cuisine is the primary cuisine for the restaurant. */
  is_primary: boolean;
  category: string;
}[];

export interface RestaurantCuisineCreatePayload {
  /** Whether this cuisine is the primary cuisine for the restaurant. */
  is_primary: boolean;
  category: string;
}

export interface RestaurantCuisineCreateData {
  /** @format int64 */
  id: number;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at: number;
  /** Whether this cuisine is the primary cuisine for the restaurant. */
  is_primary: boolean;
  category: string;
}
