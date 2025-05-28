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

export interface ChangePasswordCreatePayload {
  new_password: string;
}

export interface ChangePasswordCreateData {
  user: {
    /** @format uuid */
    id: string;
    /**
     * @format timestamptz
     * @default "now"
     */
    created_at: number;
    /** @format uuid */
    companies_id: string | null;
    name: string;
    /** @format email */
    email: string;
    phone: string | null;
    /** @format password */
    password: string;
    is_admin: boolean;
    /** @default "1" */
    is_active: boolean;
    is_verified: boolean;
    /** @format timestamptz */
    updated_at: number | null;
    magic_link: object;
    verify_token: string;
    /** @format email */
    pending_email: string;
    email_change_token: string;
    password_reset_token: string;
  };
  status: string;
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
    /** @format uuid */
    companies_id: string | null;
    name: string;
    /** @format email */
    email: string;
    phone: string | null;
    /** @format password */
    password: string;
    is_admin: boolean;
    /** @default "1" */
    is_active: boolean;
    is_verified: boolean;
    /** @format timestamptz */
    updated_at: number | null;
  };
  sessionToken: string;
}

export interface GetAuthData {
  /** @format uuid */
  id: string;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at: number;
  /** @format uuid */
  companies_id: string | null;
  name: string;
  /** @format email */
  email: string;
  phone: string | null;
  is_admin: boolean;
  /** @default "1" */
  is_active: boolean;
  is_verified: boolean;
  /** @format timestamptz */
  updated_at: number | null;
}

export interface RequestPasswordResetCreatePayload {
  email: string;
}

export interface RequestPasswordResetCreateData {
  /** @format uuid */
  id: string;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at: number;
  /** @format uuid */
  companies_id: string | null;
  name: string;
  /** @format email */
  email: string;
  phone: string | null;
  /** @format password */
  password: string;
  is_admin: boolean;
  /** @default "1" */
  is_active: boolean;
  is_verified: boolean;
  /** @format timestamptz */
  updated_at: number | null;
  magic_link: object;
  verify_token: string;
  /** @format email */
  pending_email: string;
  email_change_token: string;
  password_reset_token: string;
}

export interface ResendVerificationCreatePayload {
  user_id: string;
}

export interface ResendVerificationCreateData {
  user: {
    /** @format uuid */
    id: string;
    /**
     * @format timestamptz
     * @default "now"
     */
    created_at: number;
    /** @format uuid */
    companies_id: string | null;
    name: string;
    /** @format email */
    email: string;
    phone: string | null;
    /** @format password */
    password: string;
    is_admin: boolean;
    /** @default "1" */
    is_active: boolean;
    is_verified: boolean;
    /** @format timestamptz */
    updated_at: number | null;
    magic_link: object;
    verify_token: string;
    /** @format email */
    pending_email: string;
    email_change_token: string;
    password_reset_token: string;
  };
}

export interface ResetPasswordCreatePayload {
  token: string;
  new_password: string;
}

export interface ResetPasswordCreateData {
  result1: {
    /** @format uuid */
    id: string;
    /**
     * @format timestamptz
     * @default "now"
     */
    created_at: number;
    /** @format uuid */
    companies_id: string | null;
    name: string;
    /** @format email */
    email: string;
    phone: string | null;
    /** @format password */
    password: string;
    is_admin: boolean;
    /** @default "1" */
    is_active: boolean;
    is_verified: boolean;
    /** @format timestamptz */
    updated_at: number | null;
    magic_link: object;
    verify_token: string;
    /** @format email */
    pending_email: string;
    email_change_token: string;
    password_reset_token: string;
  };
  data: string;
}

export interface SignupCreatePayload {
  name: string;
  /** @format email */
  email: string;
  /** @format password */
  password: string;
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
    /** @format uuid */
    companies_id: string | null;
    name: string;
    /** @format email */
    email: string;
    phone: string | null;
    /** @format password */
    password: string;
    is_admin: boolean;
    /** @default "1" */
    is_active: boolean;
    is_verified: boolean;
    /** @format timestamptz */
    updated_at: number | null;
    magic_link: object;
    verify_token: string;
    /** @format email */
    pending_email: string;
    email_change_token: string;
    password_reset_token: string;
  };
  sessionToken: string;
}

export interface UpdateEmailCreatePayload {
  /** @format email */
  email: string;
  user_id: string;
}

export interface UpdateEmailCreateData {
  /** @format uuid */
  id: string;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at: number;
  /** @format uuid */
  companies_id: string | null;
  name: string;
  /** @format email */
  email: string;
  phone: string | null;
  /** @format password */
  password: string;
  is_admin: boolean;
  /** @default "1" */
  is_active: boolean;
  is_verified: boolean;
  /** @format timestamptz */
  updated_at: number | null;
  magic_link: object;
  verify_token: string;
  /** @format email */
  pending_email: string;
  email_change_token: string;
  password_reset_token: string;
}

export interface VerifyEmailCreatePayload {
  user_id: string;
  token: string;
}

export interface VerifyEmailCreateData {
  result1: {
    /** @format uuid */
    id: string;
    /**
     * @format timestamptz
     * @default "now"
     */
    created_at: number;
    /** @format uuid */
    companies_id: string | null;
    name: string;
    /** @format email */
    email: string;
    phone: string | null;
    /** @format password */
    password: string;
    is_admin: boolean;
    /** @default "1" */
    is_active: boolean;
    is_verified: boolean;
    /** @format timestamptz */
    updated_at: number | null;
    magic_link: object;
    verify_token: string;
    /** @format email */
    pending_email: string;
    email_change_token: string;
    password_reset_token: string;
  };
  auth: string;
}

export interface InitialCreatePayload {
  name: string;
  address: string;
  phone: string;
  website: string;
  description: string;
  status: "pending" | "approved" | "banned" | "rejected";
  /** @format date */
  updated_at: string | null;
  business_registration_number: string;
  logo_url: string;
  stripe_customer_id: string;
  /** @format email */
  company_email: string;
  companyUser_id: string;
  /** @format binary */
  photo: File | null;
}

export interface InitialCreateData {
  company: {
    /** @format uuid */
    id: string;
    /**
     * @format timestamptz
     * @default "now"
     */
    created_at: number;
    name: string;
    address: string;
    phone: string;
    website: string;
    description: string;
    status: "pending" | "approved" | "banned" | "rejected";
    /** @format date */
    updated_at: string | null;
    business_registration_number: string;
    logo_url: string;
    stripe_customer_id: string;
    /** @format email */
    company_email: string;
  };
  companyUser: {
    /** @format uuid */
    id: string;
    /**
     * @format timestamptz
     * @default "now"
     */
    created_at: number;
    /** @format uuid */
    companies_id: string | null;
    name: string;
    /** @format email */
    email: string;
    phone: string | null;
    /** @format password */
    password: string;
    is_admin: boolean;
    /** @default "1" */
    is_active: boolean;
    is_verified: boolean;
    /** @format timestamptz */
    updated_at: number | null;
    magic_link: object;
    verify_token: string;
    /** @format email */
    pending_email: string;
    email_change_token: string;
    password_reset_token: string;
  };
}

export interface StaffDeleteCreatePayload {
  companies_id: string;
  companyUser_id: string;
}

export interface StaffDeleteCreateData {
  companyUser: {
    /** @format uuid */
    id: string;
    /**
     * @format timestamptz
     * @default "now"
     */
    created_at: number;
    /** @format uuid */
    companies_id: string | null;
    name: string;
    /** @format email */
    email: string;
    phone: string | null;
    /** @format password */
    password: string;
    is_admin: boolean;
    /** @default "1" */
    is_active: boolean;
    is_verified: boolean;
    /** @format timestamptz */
    updated_at: number | null;
    magic_link: object;
    verify_token: string;
    /** @format email */
    pending_email: string;
    email_change_token: string;
    password_reset_token: string;
  };
}

export interface StaffInviteCreatePayload {
  /** @format email */
  email: string;
  companies_id: string;
}

export type StaffInviteCreateData = object;

export interface StripeCreateCustomerCreatePayload {
  company_id: string;
  company_name: string;
  company_email: string;
}

export type StripeCreateCustomerCreateData = object;

export interface WorksessionsThismonthListParams {
  company_id: string;
  /** @format timestamptz */
  start: number;
  /** @format timestamptz */
  end: number;
}

export type WorksessionsThismonthListData = {
  /** @format int64 */
  id: number;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at: number;
  /** @format timestamptz */
  check_in_time: number;
  /** @format timestamptz */
  check_out_time: number;
  total_hours: number;
  location_data: string;
  status:
    | "SCHEDULED"
    | "IN_PROGRESS"
    | "CANCELED_BY_CHEF"
    | "CANCELED_BY_RESTAURANT"
    | "COMPLETED"
    | "VERIFIED"
    | "DISPUTE"
    | "ESCALATED"
    | "PAID"
    | "CANCELED"
    | "VERIFY_REJECTED";
  /** @format timestamptz */
  updated_at: number;
  /** @format uuid */
  application_id: string | null;
  /** @format uuid */
  user_id: string | null;
  /** @format int64 */
  restaurant_id: number;
  /** @format int64 */
  job_id: number;
  /** @format int64 */
  paid_amount: number;
  chef_feedback: string;
  restaurant_feedback: string;
  /** @format int64 */
  chef_rating: number;
  /** @format int64 */
  restaurant_rating: number;
  /** @format timestamptz */
  start_time: number | null;
  /** @format int64 */
  check_in_code: number | null;
  /** @format int64 */
  transportation_expenses: number | null;
  /** @format int64 */
  actual_fee: number;
  transportation_type: "FIXED" | "NONE" | "MAX";
  user: {
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
    profile_completed: boolean;
    position_level: "1" | "2" | "3" | "4";
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
    status:
      | "DRAFT"
      | "PUBLISHED"
      | "EXPIRED"
      | "PENDING"
      | "DELETED"
      | "FILLED"
      | "COMPLETED";
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
    transportation_type: "NONE" | "MAX" | "FIXED";
    /** @format int64 */
    transportation_amount: number;
  };
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
    status: "BANNED" | "PENDING" | "DELETED" | "APPROVED";
  };
}[];

export type CompaniesDeleteData = object;

export interface CompaniesDetailData {
  /** @format uuid */
  id: string;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at: number;
  name: string;
  address: string;
  phone: string;
  website: string;
  description: string;
  status: "pending" | "approved" | "banned" | "rejected";
  /** @format date */
  updated_at: string | null;
  business_registration_number: string;
  logo_url: string;
  stripe_customer_id: string;
  /** @format email */
  company_email: string;
}

export interface CompaniesPartialUpdatePayload {
  name: string;
  address: string;
  phone: string;
  website: string;
  description: string;
  status: "pending" | "approved" | "banned" | "rejected";
  /** @format date */
  updated_at: string | null;
  business_registration_number: string;
  logo_url: string;
  stripe_customer_id: string;
  /** @format email */
  company_email: string;
}

export interface CompaniesPartialUpdateData {
  /** @format uuid */
  id: string;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at: number;
  name: string;
  address: string;
  phone: string;
  website: string;
  description: string;
  status: "pending" | "approved" | "banned" | "rejected";
  /** @format date */
  updated_at: string | null;
  business_registration_number: string;
  logo_url: string;
  stripe_customer_id: string;
  /** @format email */
  company_email: string;
}

export type BillingSummaryCurrentListData = {
  /** @format uuid */
  id: string;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at: number;
  /** @format uuid */
  companies_id: string | null;
  month: string;
  /** @format int64 */
  amount: number;
  /** stripe invoice id */
  invoice_id: string;
  status: "PENDING" | "PAID" | "FAILED";
  fee_rate: number;
  /** @format int64 */
  session_count: number;
  start_date: string;
  end_date: string;
  hosted_invoice_url: string;
  invoice_pdf: string;
  invoice_number: string;
}[];

export interface SessionHistoryCurrentListData {
  result1: {
    /** @format int64 */
    id: number;
    /**
     * @format timestamptz
     * @default "now"
     */
    created_at: number;
    /** @format timestamptz */
    check_in_time: number;
    /** @format timestamptz */
    check_out_time: number;
    total_hours: number;
    location_data: string;
    status:
      | "SCHEDULED"
      | "IN_PROGRESS"
      | "CANCELED_BY_CHEF"
      | "CANCELED_BY_RESTAURANT"
      | "COMPLETED"
      | "VERIFIED"
      | "DISPUTE"
      | "ESCALATED"
      | "PAID"
      | "CANCELED"
      | "VERIFY_REJECTED";
    /** @format timestamptz */
    updated_at: number;
    /** @format uuid */
    application_id: string | null;
    /** @format uuid */
    user_id: string | null;
    /** @format int64 */
    restaurant_id: number;
    /** @format int64 */
    job_id: number;
    /** @format int64 */
    paid_amount: number;
    chef_feedback: string;
    restaurant_feedback: string;
    /** @format int64 */
    chef_rating: number;
    /** @format int64 */
    restaurant_rating: number;
    /** @format timestamptz */
    start_time: number | null;
    /** @format int64 */
    check_in_code: number | null;
    /** @format int64 */
    transportation_expenses: number | null;
    /** @format int64 */
    actual_fee: number;
    transportation_type: "FIXED" | "NONE" | "MAX";
  }[];
  star: string;
  end: string;
}

export type CompaniesListData = {
  /** @format uuid */
  id: string;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at: number;
  name: string;
  address: string;
  phone: string;
  website: string;
  description: string;
  status: "pending" | "approved" | "banned" | "rejected";
  /** @format date */
  updated_at: string | null;
  business_registration_number: string;
  logo_url: string;
  stripe_customer_id: string;
  /** @format email */
  company_email: string;
}[];

export interface CompaniesCreatePayload {
  name: string;
  address: string;
  phone: string;
  website: string;
  description: string;
  status: "pending" | "approved" | "banned" | "rejected";
  /** @format date */
  updated_at: string | null;
  business_registration_number: string;
  logo_url: string;
  stripe_customer_id: string;
  /** @format email */
  company_email: string;
}

export interface CompaniesCreateData {
  /** @format uuid */
  id: string;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at: number;
  name: string;
  address: string;
  phone: string;
  website: string;
  description: string;
  status: "pending" | "approved" | "banned" | "rejected";
  /** @format date */
  updated_at: string | null;
  business_registration_number: string;
  logo_url: string;
  stripe_customer_id: string;
  /** @format email */
  company_email: string;
}

export type BillingCreateData = object;

export type InitialSetListData = object;

export interface SignupCreateBody {
  name: string;
  /** @format email */
  email: string;
  /** @format password */
  password: string;
  company_name: string;
  phone: string;
}

export interface SignupCreateResult {
  authToken: string;
  user: {
    /** @format uuid */
    id: string;
    /**
     * @format timestamptz
     * @default "now"
     */
    created_at: number;
    /** @format uuid */
    companies_id: string | null;
    name: string;
    /** @format email */
    email: string;
    phone: string | null;
    /** @format password */
    password: string;
    is_admin: boolean;
    /** @default "1" */
    is_active: boolean;
    is_verified: boolean;
    /** @format timestamptz */
    updated_at: number | null;
    magic_link: object;
    verify_token: string;
    /** @format email */
    pending_email: string;
    email_change_token: string;
    password_reset_token: string;
  };
  company: {
    /** @format uuid */
    id: string;
    /**
     * @format timestamptz
     * @default "now"
     */
    created_at: number;
    name: string;
    address: string;
    phone: string;
    website: string;
    description: string;
    status: "pending" | "approved" | "banned" | "rejected";
    /** @format date */
    updated_at: string | null;
    business_registration_number: string;
    logo_url: string;
    stripe_customer_id: string;
    /** @format email */
    company_email: string;
  };
}

export type CompanystaffsDeleteData = object;

export type CompanystaffsDetailData = object;

export type CompanystaffsPartialUpdateData = object;

export type CompanystaffsListData = object;

export type CompanystaffsCreateData = object;

export type CompanyDetailData = {
  /** @format uuid */
  id: string;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at: number;
  /** @format uuid */
  companies_id: string | null;
  name: string;
  /** @format email */
  email: string;
  phone: string | null;
  /** @format password */
  password: string;
  is_admin: boolean;
  /** @default "1" */
  is_active: boolean;
  is_verified: boolean;
  /** @format timestamptz */
  updated_at: number | null;
  magic_link: object;
  verify_token: string;
  /** @format email */
  pending_email: string;
  email_change_token: string;
  password_reset_token: string;
}[];

export interface EmailChangeCreatePayload {
  /** @format email */
  email: string;
}

export interface EmailChangeCreateData {
  /** @format uuid */
  id: string;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at: number;
  /** @format uuid */
  companies_id: string | null;
  name: string;
  /** @format email */
  email: string;
  phone: string | null;
  /** @format password */
  password: string;
  is_admin: boolean;
  /** @default "1" */
  is_active: boolean;
  is_verified: boolean;
  /** @format timestamptz */
  updated_at: number | null;
  magic_link: object;
  verify_token: string;
  /** @format email */
  pending_email: string;
  email_change_token: string;
  password_reset_token: string;
}

export interface EmailConfirmCreatePayload {
  token: string;
}

export interface EmailConfirmCreateData {
  /** @format uuid */
  id: string;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at: number;
  /** @format uuid */
  companies_id: string | null;
  name: string;
  /** @format email */
  email: string;
  phone: string | null;
  /** @format password */
  password: string;
  is_admin: boolean;
  /** @default "1" */
  is_active: boolean;
  is_verified: boolean;
  /** @format timestamptz */
  updated_at: number | null;
  magic_link: object;
  verify_token: string;
  /** @format email */
  pending_email: string;
  email_change_token: string;
  password_reset_token: string;
}

export type RestaurantsDetailData = object;

export interface CompanyuserDeleteData {
  /** @format uuid */
  id: string;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at: number;
  /** @format uuid */
  companies_id: string | null;
  name: string;
  /** @format email */
  email: string;
  phone: string | null;
  /** @format password */
  password: string;
  is_admin: boolean;
  /** @default "1" */
  is_active: boolean;
  is_verified: boolean;
  /** @format timestamptz */
  updated_at: number | null;
  magic_link: object;
  verify_token: string;
  /** @format email */
  pending_email: string;
  email_change_token: string;
  password_reset_token: string;
}

export interface CompanyuserDetailData {
  /** @format uuid */
  id: string;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at: number;
  /** @format uuid */
  companies_id: string | null;
  name: string;
  /** @format email */
  email: string;
  phone: string | null;
  /** @format password */
  password: string;
  is_admin: boolean;
  /** @default "1" */
  is_active: boolean;
  is_verified: boolean;
  /** @format timestamptz */
  updated_at: number | null;
  magic_link: object;
  verify_token: string;
  /** @format email */
  pending_email: string;
  email_change_token: string;
  password_reset_token: string;
}

export interface CompanyuserPartialUpdatePayload {
  /** @format uuid */
  companies_id: string | null;
  name: string;
  /** @format email */
  email: string;
  phone: string | null;
  is_admin: boolean;
  /** @default "1" */
  is_active: boolean;
  is_verified: boolean;
  /** @format timestamptz */
  updated_at: number | null;
  magic_link: object;
  verify_token: string;
  /** @format email */
  pending_email: string;
  email_change_token: string;
  password_reset_token: string;
}

export interface CompanyuserPartialUpdateData {
  /** @format uuid */
  id: string;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at: number;
  /** @format uuid */
  companies_id: string | null;
  name: string;
  /** @format email */
  email: string;
  phone: string | null;
  /** @format password */
  password: string;
  is_admin: boolean;
  /** @default "1" */
  is_active: boolean;
  is_verified: boolean;
  /** @format timestamptz */
  updated_at: number | null;
  magic_link: object;
  verify_token: string;
  /** @format email */
  pending_email: string;
  email_change_token: string;
  password_reset_token: string;
}

export type CompanyuserListData = {
  /** @format uuid */
  id: string;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at: number;
  /** @format uuid */
  companies_id: string | null;
  name: string;
  /** @format email */
  email: string;
  phone: string | null;
  /** @format password */
  password: string;
  is_admin: boolean;
  /** @default "1" */
  is_active: boolean;
  is_verified: boolean;
  /** @format timestamptz */
  updated_at: number | null;
  magic_link: object;
  verify_token: string;
  /** @format email */
  pending_email: string;
  email_change_token: string;
  password_reset_token: string;
}[];

export interface CompanyuserCreatePayload {
  /** @format uuid */
  companies_id: string | null;
  name: string;
  /** @format email */
  email: string;
  phone: string | null;
  is_admin: boolean;
  /** @default "1" */
  is_active: boolean;
  is_verified: boolean;
  /** @format timestamptz */
  updated_at: number | null;
  magic_link: object;
  verify_token: string;
  /** @format email */
  pending_email: string;
  email_change_token: string;
  password_reset_token: string;
}

export interface CompanyuserCreateData {
  /** @format uuid */
  id: string;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at: number;
  /** @format uuid */
  companies_id: string | null;
  name: string;
  /** @format email */
  email: string;
  phone: string | null;
  /** @format password */
  password: string;
  is_admin: boolean;
  /** @default "1" */
  is_active: boolean;
  is_verified: boolean;
  /** @format timestamptz */
  updated_at: number | null;
  magic_link: object;
  verify_token: string;
  /** @format email */
  pending_email: string;
  email_change_token: string;
  password_reset_token: string;
}

export interface CheckAccessListParams {
  /** @format uuid */
  companyUserId: string;
  /** @format int64 */
  restaurantId: number;
}

export interface CheckAccessListData {
  check_result: string;
}

export type CompanyusersClone0ListData = object;

export interface CompanyusersDetailData {
  company: {
    /** @format uuid */
    id: string;
    /**
     * @format timestamptz
     * @default "now"
     */
    created_at: number;
    name: string;
    address: string;
    phone: string;
    website: string;
    description: string;
    status: "pending" | "approved" | "banned" | "rejected";
    /** @format date */
    updated_at: string | null;
    business_registration_number: string;
    logo_url: string;
    stripe_customer_id: string;
    /** @format email */
    company_email: string;
  };
  admin: string;
}

export interface StaffsListParams {
  /** @format int64 */
  restaurant_id: number;
}

export type StaffsListData = {
  /** @format uuid */
  id: string;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at: number;
  /** @format uuid */
  companyuser_id: string | null;
  /** @format int64 */
  restaurant_id: number;
  /** @default "1" */
  can_edit: boolean;
  /** @default "1" */
  can_manage_jobs: boolean;
  companyuser: {
    /** @format uuid */
    id: string;
    /**
     * @format timestamptz
     * @default "now"
     */
    created_at: number;
    /** @format uuid */
    companies_id: string | null;
    name: string;
    /** @format email */
    email: string;
    phone: string | null;
    /** @format password */
    password: string;
    is_admin: boolean;
    /** @default "1" */
    is_active: boolean;
    is_verified: boolean;
    /** @format timestamptz */
    updated_at: number | null;
    magic_link: object;
    verify_token: string;
    /** @format email */
    pending_email: string;
    email_change_token: string;
    password_reset_token: string;
  };
}[];

export type RestaurantaccessDeleteData = object;

export interface RestaurantaccessDetailData {
  /** @format uuid */
  id: string;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at: number;
  /** @format uuid */
  companyuser_id: string | null;
  /** @format int64 */
  restaurant_id: number;
  /** @default "1" */
  can_edit: boolean;
  /** @default "1" */
  can_manage_jobs: boolean;
}

export interface RestaurantaccessPartialUpdatePayload {
  /** @format uuid */
  companyuser_id: string | null;
  /** @format int64 */
  restaurant_id: number;
  /** @default "1" */
  can_edit: boolean;
  /** @default "1" */
  can_manage_jobs: boolean;
}

export interface RestaurantaccessPartialUpdateData {
  /** @format uuid */
  id: string;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at: number;
  /** @format uuid */
  companyuser_id: string | null;
  /** @format int64 */
  restaurant_id: number;
  /** @default "1" */
  can_edit: boolean;
  /** @default "1" */
  can_manage_jobs: boolean;
}

export type RestaurantaccessListData = {
  /** @format uuid */
  id: string;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at: number;
  /** @format uuid */
  companyuser_id: string | null;
  /** @format int64 */
  restaurant_id: number;
  /** @default "1" */
  can_edit: boolean;
  /** @default "1" */
  can_manage_jobs: boolean;
}[];

export interface RestaurantaccessCreatePayload {
  /** @format uuid */
  companyuser_id: string | null;
  /** @format int64 */
  restaurant_id: number;
  /** @default "1" */
  can_edit: boolean;
  /** @default "1" */
  can_manage_jobs: boolean;
  /** @format email */
  staff_email: string;
}

export type RestaurantaccessCreateData = object;

export type StaffrestaurantaccessDeleteData = object;

export type StaffrestaurantaccessDetailData = object;

export type StaffrestaurantaccessPartialUpdateData = object;

export type StaffrestaurantaccessListData = object;

export type StaffrestaurantaccessCreateData = object;

export type SessionHistoryCurrentListResult = object;
