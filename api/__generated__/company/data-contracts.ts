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
    /** @format uuid */
    companies_id?: string | null;
    name?: string;
    /** @format email */
    email?: string;
    phone?: string | null;
    /** @format password */
    password?: string;
    is_admin?: boolean;
    is_active?: boolean;
    is_verified?: boolean;
    /** @format timestamptz */
    updated_at?: number | null;
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
  /** @format uuid */
  companies_id?: string | null;
  name?: string;
  /** @format email */
  email?: string;
  phone?: string | null;
  is_admin?: boolean;
  is_active?: boolean;
  is_verified?: boolean;
  /** @format timestamptz */
  updated_at?: number | null;
}

export interface SignupCreatePayload {
  name?: string;
  /** @format email */
  email?: string;
  /** @format password */
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
    /** @format uuid */
    companies_id?: string | null;
    name?: string;
    /** @format email */
    email?: string;
    phone?: string | null;
    /** @format password */
    password?: string;
    is_admin?: boolean;
    is_active?: boolean;
    is_verified?: boolean;
    /** @format timestamptz */
    updated_at?: number | null;
  };
}

export type CompaniesDeleteData = object;

export interface CompaniesDetailData {
  /** @format uuid */
  id?: string;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at?: number;
  name?: string;
  address?: string;
  phone?: string;
  website?: string;
  description?: string;
  status?: "pending" | "approved" | "banned" | "rejected";
  /** @format date */
  updated_at?: string | null;
  business_registration_number?: string;
  logo_url?: string;
}

export interface CompaniesPartialUpdatePayload {
  name?: string;
  address?: string;
  phone?: string;
  website?: string;
  description?: string;
  status?: "pending" | "approved" | "banned" | "rejected";
  /** @format date */
  updated_at?: string | null;
  business_registration_number?: string;
  logo_url?: string;
}

export interface CompaniesPartialUpdateData {
  /** @format uuid */
  id?: string;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at?: number;
  name?: string;
  address?: string;
  phone?: string;
  website?: string;
  description?: string;
  status?: "pending" | "approved" | "banned" | "rejected";
  /** @format date */
  updated_at?: string | null;
  business_registration_number?: string;
  logo_url?: string;
}

export type CompaniesListData = {
  /** @format uuid */
  id?: string;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at?: number;
  name?: string;
  address?: string;
  phone?: string;
  website?: string;
  description?: string;
  status?: "pending" | "approved" | "banned" | "rejected";
  /** @format date */
  updated_at?: string | null;
  business_registration_number?: string;
  logo_url?: string;
}[];

export interface CompaniesCreatePayload {
  name?: string;
  address?: string;
  phone?: string;
  website?: string;
  description?: string;
  status?: "pending" | "approved" | "banned" | "rejected";
  /** @format date */
  updated_at?: string | null;
  business_registration_number?: string;
  logo_url?: string;
}

export interface CompaniesCreateData {
  /** @format uuid */
  id?: string;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at?: number;
  name?: string;
  address?: string;
  phone?: string;
  website?: string;
  description?: string;
  status?: "pending" | "approved" | "banned" | "rejected";
  /** @format date */
  updated_at?: string | null;
  business_registration_number?: string;
  logo_url?: string;
}

export interface SignupCreateBody {
  name?: string;
  /** @format email */
  email?: string;
  /** @format password */
  password?: string;
  company_name?: string;
  phone?: string;
}

export interface SignupCreateResult {
  authToken?: string;
  user?: {
    /** @format uuid */
    id?: string;
    /**
     * @format timestamptz
     * @default "now"
     */
    created_at?: number;
    /** @format uuid */
    companies_id?: string | null;
    name?: string;
    /** @format email */
    email?: string;
    phone?: string | null;
    /** @format password */
    password?: string;
    is_admin?: boolean;
    is_active?: boolean;
    is_verified?: boolean;
    /** @format timestamptz */
    updated_at?: number | null;
  };
  company?: {
    /** @format uuid */
    id?: string;
    /**
     * @format timestamptz
     * @default "now"
     */
    created_at?: number;
    name?: string;
    address?: string;
    phone?: string;
    website?: string;
    description?: string;
    status?: "pending" | "approved" | "banned" | "rejected";
    /** @format date */
    updated_at?: string | null;
    business_registration_number?: string;
    logo_url?: string;
  };
}

export type CompanystaffsDeleteData = object;

export type CompanystaffsDetailData = object;

export type CompanystaffsPartialUpdateData = object;

export type CompanystaffsListData = object;

export type CompanystaffsCreateData = object;

export type CompanyDetailData = {
  /** @format uuid */
  id?: string;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at?: number;
  /** @format uuid */
  companies_id?: string | null;
  name?: string;
  /** @format email */
  email?: string;
  phone?: string | null;
  /** @format password */
  password?: string;
  is_admin?: boolean;
  is_active?: boolean;
  is_verified?: boolean;
  /** @format timestamptz */
  updated_at?: number | null;
}[];

export interface MeRestaurantsListParams {
  companyuser_id?: string;
}

export interface MeRestaurantsListData {
  result1?: {
    /** @format uuid */
    id?: string;
    /**
     * @format timestamptz
     * @default "now"
     */
    created_at?: number;
    /** @format uuid */
    companies_id?: string | null;
    name?: string;
    /** @format email */
    email?: string;
    phone?: string | null;
    /** @format password */
    password?: string;
    is_admin?: boolean;
    is_active?: boolean;
    is_verified?: boolean;
    /** @format timestamptz */
    updated_at?: number | null;
  };
  rest?: string;
}

export type CompanyuserDeleteData = object;

export interface CompanyuserDetailData {
  /** @format uuid */
  id?: string;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at?: number;
  /** @format uuid */
  companies_id?: string | null;
  name?: string;
  /** @format email */
  email?: string;
  phone?: string | null;
  /** @format password */
  password?: string;
  is_admin?: boolean;
  is_active?: boolean;
  is_verified?: boolean;
  /** @format timestamptz */
  updated_at?: number | null;
}

export interface CompanyuserPartialUpdatePayload {
  /** @format uuid */
  companies_id?: string | null;
  name?: string;
  /** @format email */
  email?: string;
  phone?: string | null;
  is_admin?: boolean;
  is_active?: boolean;
  is_verified?: boolean;
  /** @format timestamptz */
  updated_at?: number | null;
}

export interface CompanyuserPartialUpdateData {
  /** @format uuid */
  id?: string;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at?: number;
  /** @format uuid */
  companies_id?: string | null;
  name?: string;
  /** @format email */
  email?: string;
  phone?: string | null;
  /** @format password */
  password?: string;
  is_admin?: boolean;
  is_active?: boolean;
  is_verified?: boolean;
  /** @format timestamptz */
  updated_at?: number | null;
}

export type CompanyuserListData = {
  /** @format uuid */
  id?: string;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at?: number;
  /** @format uuid */
  companies_id?: string | null;
  name?: string;
  /** @format email */
  email?: string;
  phone?: string | null;
  /** @format password */
  password?: string;
  is_admin?: boolean;
  is_active?: boolean;
  is_verified?: boolean;
  /** @format timestamptz */
  updated_at?: number | null;
}[];

export interface CompanyuserCreatePayload {
  /** @format uuid */
  companies_id?: string | null;
  name?: string;
  /** @format email */
  email?: string;
  phone?: string | null;
  is_admin?: boolean;
  is_active?: boolean;
  is_verified?: boolean;
  /** @format timestamptz */
  updated_at?: number | null;
}

export interface CompanyuserCreateData {
  /** @format uuid */
  id?: string;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at?: number;
  /** @format uuid */
  companies_id?: string | null;
  name?: string;
  /** @format email */
  email?: string;
  phone?: string | null;
  /** @format password */
  password?: string;
  is_admin?: boolean;
  is_active?: boolean;
  is_verified?: boolean;
  /** @format timestamptz */
  updated_at?: number | null;
}

export interface CheckAccessListParams {
  /** @format uuid */
  companyUserId?: string;
  /** @format int64 */
  restaurantId?: number;
}

export interface CheckAccessListData {
  check_result?: string;
}

export interface CompanyusersListParams {
  /** @format int64 */
  restaurant_id?: number;
}

export interface CompanyusersListData {
  result1?: {
    /** @format uuid */
    id?: string;
    /**
     * @format timestamptz
     * @default "now"
     */
    created_at?: number;
    name?: string;
    address?: string;
    phone?: string;
    website?: string;
    description?: string;
    status?: "pending" | "approved" | "banned" | "rejected";
    /** @format date */
    updated_at?: string | null;
    business_registration_number?: string;
    logo_url?: string;
  };
  admin?: string;
}

export interface StaffsListParams {
  /** @format int64 */
  restaurant_id?: number;
}

export type StaffsListData = {
  /** @format uuid */
  id?: string;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at?: number;
  /** @format uuid */
  companyuser_id?: string | null;
  /** @format int64 */
  restaurant_id?: number;
  can_edit?: boolean;
  can_manage_jobs?: boolean;
  companyuser?: {
    /** @format uuid */
    id?: string;
    /**
     * @format timestamptz
     * @default "now"
     */
    created_at?: number;
    /** @format uuid */
    companies_id?: string | null;
    name?: string;
    /** @format email */
    email?: string;
    phone?: string | null;
    is_admin?: boolean;
    is_active?: boolean;
    is_verified?: boolean;
    /** @format timestamptz */
    updated_at?: number | null;
  };
}[];

export type RestaurantaccessDeleteData = object;

export interface RestaurantaccessDetailData {
  /** @format uuid */
  id?: string;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at?: number;
  /** @format uuid */
  companyuser_id?: string | null;
  /** @format int64 */
  restaurant_id?: number;
  can_edit?: boolean;
  can_manage_jobs?: boolean;
}

export interface RestaurantaccessPartialUpdatePayload {
  /** @format uuid */
  companyuser_id?: string | null;
  /** @format int64 */
  restaurant_id?: number;
  can_edit?: boolean;
  can_manage_jobs?: boolean;
}

export interface RestaurantaccessPartialUpdateData {
  /** @format uuid */
  id?: string;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at?: number;
  /** @format uuid */
  companyuser_id?: string | null;
  /** @format int64 */
  restaurant_id?: number;
  can_edit?: boolean;
  can_manage_jobs?: boolean;
}

export type RestaurantaccessListData = {
  /** @format uuid */
  id?: string;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at?: number;
  /** @format uuid */
  companyuser_id?: string | null;
  /** @format int64 */
  restaurant_id?: number;
  can_edit?: boolean;
  can_manage_jobs?: boolean;
}[];

export interface RestaurantaccessCreatePayload {
  /** @format uuid */
  companyuser_id?: string | null;
  /** @format int64 */
  restaurant_id?: number;
  can_edit?: boolean;
  can_manage_jobs?: boolean;
  /** @format email */
  staff_email?: string;
}

export type RestaurantaccessCreateData = object;

export type StaffrestaurantaccessDeleteData = object;

export type StaffrestaurantaccessDetailData = object;

export type StaffrestaurantaccessPartialUpdateData = object;

export type StaffrestaurantaccessListData = object;

export type StaffrestaurantaccessCreateData = object;
