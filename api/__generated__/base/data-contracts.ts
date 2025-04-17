/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export type StripeAccountLinksCreateData = object;

export type AdminlogDeleteData = object;

export interface AdminlogDetailData {
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
}

export interface AdminlogPartialUpdatePayload {
  /** @format int64 */
  target_id: number;
  target_type: string;
  action: string;
  reason: string;
  /** @format uuid */
  operator_id: string | null;
}

export interface AdminlogPartialUpdateData {
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
}

export type AdminlogsDeleteData = object;

export interface AdminlogsDetailData {
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
}

export interface AdminlogsPartialUpdatePayload {
  /** @format int64 */
  target_id: number;
  target_type: string;
  action: string;
  reason: string;
  /** @format uuid */
  operator_id: string | null;
}

export interface AdminlogsPartialUpdateData {
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
}

export type AdminlogsListData = {
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
}[];

export interface AdminlogsCreatePayload {
  /** @format int64 */
  target_id: number;
  target_type: string;
  action: string;
  reason: string;
  /** @format uuid */
  operator_id: string | null;
}

export interface AdminlogsCreateData {
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
}

export type AdminlogListData = {
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
}[];

export interface AdminlogCreatePayload {
  /** @format int64 */
  target_id: number;
  target_type: string;
  action: string;
  reason: string;
  /** @format uuid */
  operator_id: string | null;
}

export interface AdminlogCreateData {
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
}

export type GetApplicationData = {
  /** @format uuid */
  id: string;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at: number;
  /** @format timestamptz */
  application_date: number | null;
  /** @default "APPLIED" */
  status: "APPLIED" | "REJECTED" | "ACCEPTED" | "CANCELED" | "DONE";
  notes: string;
  /** @format timestamptz */
  updated_at: number | null;
  /** @format int64 */
  job_id: number;
  /** @format uuid */
  user_id: string | null;
  /** @format timestamptz */
  expiry_date: number | null;
  urgent: boolean;
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
}[];

export type MyComingDetailData = {
  /** @format uuid */
  id: string;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at: number;
  /** @format timestamptz */
  application_date: number | null;
  /** @default "APPLIED" */
  status: "APPLIED" | "REJECTED" | "ACCEPTED" | "CANCELED" | "DONE";
  notes: string;
  /** @format timestamptz */
  updated_at: number | null;
  /** @format int64 */
  job_id: number;
  /** @format uuid */
  user_id: string | null;
  /** @format timestamptz */
  expiry_date: number | null;
  urgent: boolean;
}[];

export type GetApplication2Data = {
  /** @format uuid */
  id: string;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at: number;
  /** @format timestamptz */
  application_date: number | null;
  /** @default "APPLIED" */
  status: "APPLIED" | "REJECTED" | "ACCEPTED" | "CANCELED" | "DONE";
  notes: string;
  /** @format timestamptz */
  updated_at: number | null;
  /** @format int64 */
  job_id: number;
  /** @format uuid */
  user_id: string | null;
  /** @format timestamptz */
  expiry_date: number | null;
  urgent: boolean;
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
    _restaurant: {
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
  };
}[];

export type AcceptPartialUpdateData = object;

export type RejectPartialUpdateData = object;

export type ApplicationDeleteData = object;

export interface ApplicationDetailData {
  /** @format uuid */
  id: string;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at: number;
  /** @format timestamptz */
  application_date: number | null;
  /** @default "APPLIED" */
  status: "APPLIED" | "REJECTED" | "ACCEPTED" | "CANCELED" | "DONE";
  notes: string;
  /** @format timestamptz */
  updated_at: number | null;
  /** @format int64 */
  job_id: number;
  /** @format uuid */
  user_id: string | null;
  /** @format timestamptz */
  expiry_date: number | null;
  urgent: boolean;
}

export interface ApplicationPartialUpdatePayload {
  /** @format timestamptz */
  application_date: number | null;
  /** @default "APPLIED" */
  status: "APPLIED" | "REJECTED" | "ACCEPTED" | "CANCELED" | "DONE";
  notes: string;
  /** @format timestamptz */
  updated_at: number | null;
  /** @format int64 */
  job_id: number;
  /** @format uuid */
  user_id: string | null;
  /** @format timestamptz */
  expiry_date: number | null;
  urgent: boolean;
}

export interface ApplicationPartialUpdateData {
  /** @format uuid */
  id: string;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at: number;
  /** @format timestamptz */
  application_date: number | null;
  /** @default "APPLIED" */
  status: "APPLIED" | "REJECTED" | "ACCEPTED" | "CANCELED" | "DONE";
  notes: string;
  /** @format timestamptz */
  updated_at: number | null;
  /** @format int64 */
  job_id: number;
  /** @format uuid */
  user_id: string | null;
  /** @format timestamptz */
  expiry_date: number | null;
  urgent: boolean;
}

export interface ApplicationUpdatePayload {
  /** @format timestamptz */
  application_date: number | null;
  /** @default "APPLIED" */
  status: "APPLIED" | "REJECTED" | "ACCEPTED" | "CANCELED" | "DONE";
  notes: string;
  /** @format timestamptz */
  updated_at: number | null;
  /** @format int64 */
  job_id: number;
  /** @format uuid */
  user_id: string | null;
  /** @format timestamptz */
  expiry_date: number | null;
  urgent: boolean;
}

export interface ApplicationUpdateData {
  /** @format uuid */
  id: string;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at: number;
  /** @format timestamptz */
  application_date: number | null;
  /** @default "APPLIED" */
  status: "APPLIED" | "REJECTED" | "ACCEPTED" | "CANCELED" | "DONE";
  notes: string;
  /** @format timestamptz */
  updated_at: number | null;
  /** @format int64 */
  job_id: number;
  /** @format uuid */
  user_id: string | null;
  /** @format timestamptz */
  expiry_date: number | null;
  urgent: boolean;
}

export interface MeComingListParams {
  user_id: string;
}

export type MeComingListData = {
  /** @format uuid */
  id: string;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at: number;
  /** @format timestamptz */
  application_date: number | null;
  /** @default "APPLIED" */
  status: "APPLIED" | "REJECTED" | "ACCEPTED" | "CANCELED" | "DONE";
  notes: string;
  /** @format timestamptz */
  updated_at: number | null;
  /** @format int64 */
  job_id: number;
  /** @format uuid */
  user_id: string | null;
  /** @format timestamptz */
  expiry_date: number | null;
  urgent: boolean;
}[];

export type AcceptPartialUpdateResult = object;

export interface WorksessionsListParams {
  user_id: string;
  applicationId: string;
}

export interface WorksessionsListData {
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
      | "CANCELED";
    /** @format timestamptz */
    updated_at: number;
    /** @format uuid */
    application_id: string;
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
  };
  messages: {
    /** @format int64 */
    id: number;
    /**
     * @format timestamptz
     * @default "now"
     */
    created_at: number;
    content: string;
    is_read: boolean;
    /** @format timestamptz */
    updated_at: number;
    /** @format uuid */
    application_id: string;
    /** @format uuid */
    chef_id: string;
    sender_type: "chef" | "restaurant";
    /** @format int64 */
    restaurant_id: number | null;
    /** @format int64 */
    worksession_id: number;
  }[];
}

export type ApplicationsDeleteData = object;

export interface ApplicationsDetailData {
  /** @format uuid */
  id: string;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at: number;
  /** @format timestamptz */
  application_date: number | null;
  /** @default "APPLIED" */
  status: "APPLIED" | "REJECTED" | "ACCEPTED" | "CANCELED" | "DONE";
  notes: string;
  /** @format timestamptz */
  updated_at: number | null;
  /** @format int64 */
  job_id: number;
  /** @format uuid */
  user_id: string | null;
  /** @format timestamptz */
  expiry_date: number | null;
  urgent: boolean;
}

export interface ApplicationsPartialUpdatePayload {
  /** @format timestamptz */
  application_date: number | null;
  /** @default "APPLIED" */
  status: "APPLIED" | "REJECTED" | "ACCEPTED" | "CANCELED" | "DONE";
  notes: string;
  /** @format timestamptz */
  updated_at: number | null;
  /** @format int64 */
  job_id: number;
  /** @format uuid */
  user_id: string | null;
  /** @format timestamptz */
  expiry_date: number | null;
  urgent: boolean;
}

export interface ApplicationsPartialUpdateData {
  /** @format uuid */
  id: string;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at: number;
  /** @format timestamptz */
  application_date: number | null;
  /** @default "APPLIED" */
  status: "APPLIED" | "REJECTED" | "ACCEPTED" | "CANCELED" | "DONE";
  notes: string;
  /** @format timestamptz */
  updated_at: number | null;
  /** @format int64 */
  job_id: number;
  /** @format uuid */
  user_id: string | null;
  /** @format timestamptz */
  expiry_date: number | null;
  urgent: boolean;
}

export type ApplicationsListData = {
  /** @format uuid */
  id: string;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at: number;
  /** @format timestamptz */
  application_date: number | null;
  /** @default "APPLIED" */
  status: "APPLIED" | "REJECTED" | "ACCEPTED" | "CANCELED" | "DONE";
  notes: string;
  /** @format timestamptz */
  updated_at: number | null;
  /** @format int64 */
  job_id: number;
  /** @format uuid */
  user_id: string | null;
  /** @format timestamptz */
  expiry_date: number | null;
  urgent: boolean;
}[];

export interface ApplicationsCreatePayload {
  /** @format timestamptz */
  application_date: number | null;
  /** @default "APPLIED" */
  status: "APPLIED" | "REJECTED" | "ACCEPTED" | "CANCELED" | "DONE";
  notes: string;
  /** @format timestamptz */
  updated_at: number | null;
  /** @format int64 */
  job_id: number;
  /** @format uuid */
  user_id: string | null;
  /** @format timestamptz */
  expiry_date: number | null;
  urgent: boolean;
}

export interface ApplicationsCreateData {
  /** @format uuid */
  id: string;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at: number;
  /** @format timestamptz */
  application_date: number | null;
  /** @default "APPLIED" */
  status: "APPLIED" | "REJECTED" | "ACCEPTED" | "CANCELED" | "DONE";
  notes: string;
  /** @format timestamptz */
  updated_at: number | null;
  /** @format int64 */
  job_id: number;
  /** @format uuid */
  user_id: string | null;
  /** @format timestamptz */
  expiry_date: number | null;
  urgent: boolean;
}

export type ApplicationListData = {
  /** @format uuid */
  id: string;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at: number;
  /** @format timestamptz */
  application_date: number | null;
  /** @default "APPLIED" */
  status: "APPLIED" | "REJECTED" | "ACCEPTED" | "CANCELED" | "DONE";
  notes: string;
  /** @format timestamptz */
  updated_at: number | null;
  /** @format int64 */
  job_id: number;
  /** @format uuid */
  user_id: string | null;
  /** @format timestamptz */
  expiry_date: number | null;
  urgent: boolean;
}[];

export interface ApplicationCreatePayload {
  /** @format timestamptz */
  application_date: number | null;
  /** @default "APPLIED" */
  status: "APPLIED" | "REJECTED" | "ACCEPTED" | "CANCELED" | "DONE";
  notes: string;
  /** @format timestamptz */
  updated_at: number | null;
  /** @format int64 */
  job_id: number;
  /** @format uuid */
  user_id: string | null;
  /** @format timestamptz */
  expiry_date: number | null;
  urgent: boolean;
}

export interface ApplicationCreateData {
  /** @format uuid */
  id: string;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at: number;
  /** @format timestamptz */
  application_date: number | null;
  /** @default "APPLIED" */
  status: "APPLIED" | "REJECTED" | "ACCEPTED" | "CANCELED" | "DONE";
  notes: string;
  /** @format timestamptz */
  updated_at: number | null;
  /** @format int64 */
  job_id: number;
  /** @format uuid */
  user_id: string | null;
  /** @format timestamptz */
  expiry_date: number | null;
  urgent: boolean;
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
    is_active: boolean;
    is_verified: boolean;
    /** @format timestamptz */
    updated_at: number | null;
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
  /** @format uuid */
  companies_id: string | null;
  name: string;
  /** @format email */
  email: string;
  phone: string | null;
  is_admin: boolean;
  is_active: boolean;
  is_verified: boolean;
  /** @format timestamptz */
  updated_at: number | null;
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
    is_active: boolean;
    is_verified: boolean;
    /** @format timestamptz */
    updated_at: number | null;
    magic_link: object;
    verify_token: string;
  };
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
    is_active: boolean;
    is_verified: boolean;
    /** @format timestamptz */
    updated_at: number | null;
    magic_link: object;
    verify_token: string;
  };
  auth: string;
}

export interface AddInvoiceItemsCreatePayload {
  company_id: string;
  /** @format int64 */
  fee_rate: number;
  /** @format timestamptz */
  start: number | null;
  /** @format timestamptz */
  end: number | null;
}

export type AddInvoiceItemsCreateData = object;

export interface GenerateCompanySummaryCreatePayload {
  month: string;
  /** @format int64 */
  fee_rate: number;
}

export type GenerateCompanySummaryCreateData = object;

export type BillingSummaryDeleteData = object;

export interface BillingSummaryDetailData {
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
  /** @format int64 */
  fee_rate: number;
  /** @format int64 */
  session_count: number;
  start_date: string;
  end_date: string;
}

export interface BillingSummaryPartialUpdatePayload {
  /** @format uuid */
  companies_id: string | null;
  month: string;
  /** @format int64 */
  amount: number;
  /** stripe invoice id */
  invoice_id: string;
  status: "PENDING" | "PAID" | "FAILED";
  /** @format int64 */
  fee_rate: number;
  /** @format int64 */
  session_count: number;
  start_date: string;
  end_date: string;
}

export interface BillingSummaryPartialUpdateData {
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
  /** @format int64 */
  fee_rate: number;
  /** @format int64 */
  session_count: number;
  start_date: string;
  end_date: string;
}

export interface BillingSummaryUpdatePayload {
  /** @format uuid */
  companies_id: string | null;
  month: string;
  /** @format int64 */
  amount: number;
  /** stripe invoice id */
  invoice_id: string;
  status: "PENDING" | "PAID" | "FAILED";
  /** @format int64 */
  fee_rate: number;
  /** @format int64 */
  session_count: number;
  start_date: string;
  end_date: string;
}

export interface BillingSummaryUpdateData {
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
  /** @format int64 */
  fee_rate: number;
  /** @format int64 */
  session_count: number;
  start_date: string;
  end_date: string;
}

export type BillingSummaryListData = {
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
  /** @format int64 */
  fee_rate: number;
  /** @format int64 */
  session_count: number;
  start_date: string;
  end_date: string;
}[];

export interface BillingSummaryCreatePayload {
  /** @format uuid */
  companies_id: string | null;
  month: string;
  /** @format int64 */
  amount: number;
  /** stripe invoice id */
  invoice_id: string;
  status: "PENDING" | "PAID" | "FAILED";
  /** @format int64 */
  fee_rate: number;
  /** @format int64 */
  session_count: number;
  start_date: string;
  end_date: string;
}

export interface BillingSummaryCreateData {
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
  /** @format int64 */
  fee_rate: number;
  /** @format int64 */
  session_count: number;
  start_date: string;
  end_date: string;
}

export type Clone0DeleteData = object;

export interface ChefNotificationsDetailData {
  /** @format int64 */
  id: number;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at: number;
  type: "new_job" | "application_status" | "new_message" | "review" | "operator" | "payment";
  content: string;
  is_read: boolean;
  /** @format timestamptz */
  updated_at: number;
  /** @format uuid */
  user_id: string;
  /** url */
  related_link: string;
}

export type ChefNotificationsListData = {
  /** @format int64 */
  id: number;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at: number;
  type: "new_job" | "application_status" | "new_message" | "review" | "operator" | "payment";
  content: string;
  is_read: boolean;
  /** @format timestamptz */
  updated_at: number;
  /** @format uuid */
  user_id: string;
  /** url */
  related_link: string;
}[];

export interface ChefNotificationsCreatePayload {
  type: "new_job" | "application_status" | "new_message" | "review" | "operator" | "payment";
  content: string;
  is_read: boolean;
  /** @format timestamptz */
  updated_at: number;
  /** @format uuid */
  user_id: string;
  /** url */
  related_link: string;
}

export interface ChefNotificationsCreateData {
  /** @format int64 */
  id: number;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at: number;
  type: "new_job" | "application_status" | "new_message" | "review" | "operator" | "payment";
  content: string;
  is_read: boolean;
  /** @format timestamptz */
  updated_at: number;
  /** @format uuid */
  user_id: string;
  /** url */
  related_link: string;
}

export type ChefReviewsDeleteData = object;

export interface ChefReviewsDetailData {
  /** @format int64 */
  id: number;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at: number;
  /** @format int64 */
  rating: number;
  comment: string;
  /** @format timestamptz */
  updated_at: number;
  /** @format int64 */
  session_id: number;
  /** @format uuid */
  reviewer_id: string;
  /** @format int64 */
  reviewee_id: number;
}

export interface ChefReviewsPartialUpdatePayload {
  /** @format int64 */
  rating: number;
  comment: string;
  /** @format timestamptz */
  updated_at: number;
  /** @format int64 */
  session_id: number;
  /** @format uuid */
  reviewer_id: string;
  /** @format int64 */
  reviewee_id: number;
}

export interface ChefReviewsPartialUpdateData {
  /** @format int64 */
  id: number;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at: number;
  /** @format int64 */
  rating: number;
  comment: string;
  /** @format timestamptz */
  updated_at: number;
  /** @format int64 */
  session_id: number;
  /** @format uuid */
  reviewer_id: string;
  /** @format int64 */
  reviewee_id: number;
}

export type ChefReviewsListData = {
  /** @format int64 */
  id: number;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at: number;
  /** @format int64 */
  rating: number;
  comment: string;
  /** @format timestamptz */
  updated_at: number;
  /** @format int64 */
  session_id: number;
  /** @format uuid */
  reviewer_id: string;
  /** @format int64 */
  reviewee_id: number;
}[];

export interface ChefReviewsCreatePayload {
  /** @format int64 */
  rating: number;
  comment: string;
  /** @format timestamptz */
  updated_at: number;
  /** @format int64 */
  session_id: number;
  /** @format uuid */
  reviewer_id: string;
  /** @format int64 */
  reviewee_id: number;
}

export interface ChefReviewsCreateData {
  /** @format int64 */
  id: number;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at: number;
  /** @format int64 */
  rating: number;
  comment: string;
  /** @format timestamptz */
  updated_at: number;
  /** @format int64 */
  session_id: number;
  /** @format uuid */
  reviewer_id: string;
  /** @format int64 */
  reviewee_id: number;
}

export type ChefSkillsDeleteData = object;

export interface ChefSkillsDetailData {
  /** @format int64 */
  id: number;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at: number;
  skill: string;
}

export interface ChefSkillsPartialUpdatePayload {
  skill: string;
}

export interface ChefSkillsPartialUpdateData {
  /** @format int64 */
  id: number;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at: number;
  skill: string;
}

export interface ChefSkillsUpdatePayload {
  skill: string;
}

export interface ChefSkillsUpdateData {
  /** @format int64 */
  id: number;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at: number;
  skill: string;
}

export type ChefSkillsListData = {
  /** @format int64 */
  id: number;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at: number;
  skill: string;
}[];

export interface ChefSkillsCreatePayload {
  skill: string;
}

export interface ChefSkillsCreateData {
  /** @format int64 */
  id: number;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at: number;
  skill: string;
}

export type ByUserDetailData = {
  /** @format int64 */
  id: number;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at: number;
  type: "new_job" | "application_status" | "new_message" | "review" | "operator" | "payment";
  content: string;
  is_read: boolean;
  /** @format timestamptz */
  updated_at: number;
  /** @format uuid */
  user_id: string;
  /** url */
  related_link: string;
}[];

export type ChefNotificationDeleteData = object;

export interface ChefNotificationDetailData {
  /** @format int64 */
  id: number;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at: number;
  type: "new_job" | "application_status" | "new_message" | "review" | "operator" | "payment";
  content: string;
  is_read: boolean;
  /** @format timestamptz */
  updated_at: number;
  /** @format uuid */
  user_id: string;
  /** url */
  related_link: string;
}

export type ChefNotificationListData = {
  /** @format int64 */
  id: number;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at: number;
  type: "new_job" | "application_status" | "new_message" | "review" | "operator" | "payment";
  content: string;
  is_read: boolean;
  /** @format timestamptz */
  updated_at: number;
  /** @format uuid */
  user_id: string;
  /** url */
  related_link: string;
}[];

export interface ChefNotificationCreatePayload {
  type: "new_job" | "application_status" | "new_message" | "review" | "operator" | "payment";
  content: string;
  is_read: boolean;
  /** @format timestamptz */
  updated_at: number;
  /** @format uuid */
  user_id: string;
  /** url */
  related_link: string;
}

export interface ChefNotificationCreateData {
  /** @format int64 */
  id: number;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at: number;
  type: "new_job" | "application_status" | "new_message" | "review" | "operator" | "payment";
  content: string;
  is_read: boolean;
  /** @format timestamptz */
  updated_at: number;
  /** @format uuid */
  user_id: string;
  /** url */
  related_link: string;
}

export type ByRestaurantDetailData = {
  /** @format int64 */
  id: number;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at: number;
  /** @format int64 */
  rating: number;
  comment: string;
  /** @format timestamptz */
  updated_at: number;
  /** @format int64 */
  session_id: number;
  /** @format uuid */
  reviewer_id: string;
  /** @format int64 */
  reviewee_id: number;
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
}[];

export interface BySessionDetailData {
  /** @format int64 */
  id: number;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at: number;
  /** @format int64 */
  rating: number;
  comment: string;
  /** @format timestamptz */
  updated_at: number;
  /** @format int64 */
  session_id: number;
  /** @format uuid */
  reviewer_id: string;
  /** @format int64 */
  reviewee_id: number;
  worksession: {
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
      | "CANCELED";
    /** @format timestamptz */
    updated_at: number;
    /** @format uuid */
    application_id: string;
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
  };
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
}

export type ByUserDetailResult = {
  /** @format int64 */
  id: number;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at: number;
  /** @format int64 */
  rating: number;
  comment: string;
  /** @format timestamptz */
  updated_at: number;
  /** @format int64 */
  session_id: number;
  /** @format uuid */
  reviewer_id: string;
  /** @format int64 */
  reviewee_id: number;
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
}[];

export type ChefReviewDeleteData = object;

export interface ChefReviewDetailData {
  /** @format int64 */
  id: number;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at: number;
  /** @format int64 */
  rating: number;
  comment: string;
  /** @format timestamptz */
  updated_at: number;
  /** @format int64 */
  session_id: number;
  /** @format uuid */
  reviewer_id: string;
  /** @format int64 */
  reviewee_id: number;
}

export interface ChefReviewPartialUpdatePayload {
  /** @format int64 */
  rating: number;
  comment: string;
  /** @format timestamptz */
  updated_at: number;
  /** @format int64 */
  session_id: number;
  /** @format uuid */
  reviewer_id: string;
  /** @format int64 */
  reviewee_id: number;
}

export interface ChefReviewPartialUpdateData {
  /** @format int64 */
  id: number;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at: number;
  /** @format int64 */
  rating: number;
  comment: string;
  /** @format timestamptz */
  updated_at: number;
  /** @format int64 */
  session_id: number;
  /** @format uuid */
  reviewer_id: string;
  /** @format int64 */
  reviewee_id: number;
}

export type ChefReviewListData = {
  /** @format int64 */
  id: number;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at: number;
  /** @format int64 */
  rating: number;
  comment: string;
  /** @format timestamptz */
  updated_at: number;
  /** @format int64 */
  session_id: number;
  /** @format uuid */
  reviewer_id: string;
  /** @format int64 */
  reviewee_id: number;
}[];

export interface ChefReviewCreatePayload {
  /** @format int64 */
  rating: number;
  comment: string;
  /** @format timestamptz */
  updated_at: number;
  /** @format int64 */
  session_id: number;
  /** @format uuid */
  reviewer_id: string;
  /** @format int64 */
  reviewee_id: number;
}

export interface ChefReviewCreateData {
  /** @format int64 */
  id: number;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at: number;
  /** @format int64 */
  rating: number;
  comment: string;
  /** @format timestamptz */
  updated_at: number;
  /** @format int64 */
  session_id: number;
  /** @format uuid */
  reviewer_id: string;
  /** @format int64 */
  reviewee_id: number;
}

export type ChefSkillDeleteData = object;

export interface ChefSkillDetailData {
  /** @format int64 */
  id: number;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at: number;
  skill: string;
}

export interface ChefSkillPartialUpdatePayload {
  skill: string;
}

export interface ChefSkillPartialUpdateData {
  /** @format int64 */
  id: number;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at: number;
  skill: string;
}

export interface ChefSkillUpdatePayload {
  skill: string;
}

export interface ChefSkillUpdateData {
  /** @format int64 */
  id: number;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at: number;
  skill: string;
}

export type ChefSkillListData = {
  /** @format int64 */
  id: number;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at: number;
  skill: string;
}[];

export interface ChefSkillCreatePayload {
  skill: string;
}

export interface ChefSkillCreateData {
  /** @format int64 */
  id: number;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at: number;
  skill: string;
}

export interface StaffInviteCreatePayload {
  /** @format email */
  email: string;
  companies_id: string;
}

export interface StaffInviteCreateData {
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
    is_active: boolean;
    is_verified: boolean;
    /** @format timestamptz */
    updated_at: number | null;
    magic_link: object;
    verify_token: string;
  };
}

export interface CompanyusersCreatePayload {
  /** @format email */
  email: string;
}

export interface CompanyusersCreateData {
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
    is_active: boolean;
    is_verified: boolean;
    /** @format timestamptz */
    updated_at: number | null;
    magic_link: object;
    verify_token: string;
  };
}

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

export type CompanyusersListData = {
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
  is_active: boolean;
  is_verified: boolean;
  /** @format timestamptz */
  updated_at: number | null;
  magic_link: object;
  verify_token: string;
}[];

export interface JobsListParams {
  companyId: string;
}

export interface JobsListData {
  result1: {
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
  }[];
}

export type RestaurantsListData = {
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
}[];

export interface StripeCustomersCreatePayload {
  company_name: string;
  company_email: string;
}

export type StripeCustomersCreateData = object;

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
  companyUser_id: string;
  /** @format binary */
  photo: File | null;
}

export interface CompaniesCreateData {
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
    is_active: boolean;
    is_verified: boolean;
    /** @format timestamptz */
    updated_at: number | null;
    magic_link: object;
    verify_token: string;
  };
}

export type CompanyuserNotificationsDeleteData = object;

export interface CompanyuserNotificationsDetailData {
  /** @format uuid */
  id: string;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at: number;
  /** @format uuid */
  companyuser_id: string | null;
  type: "new_job" | "application_status" | "new_message" | "review" | "operator" | "payment";
  related_link: string;
  is_read: boolean;
  content: string;
}

export interface CompanyuserNotificationsPartialUpdatePayload {
  /** @format uuid */
  companyuser_id: string | null;
  type: "new_job" | "application_status" | "new_message" | "review" | "operator" | "payment";
  related_link: string;
  is_read: boolean;
  content: string;
}

export interface CompanyuserNotificationsPartialUpdateData {
  /** @format uuid */
  id: string;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at: number;
  /** @format uuid */
  companyuser_id: string | null;
  type: "new_job" | "application_status" | "new_message" | "review" | "operator" | "payment";
  related_link: string;
  is_read: boolean;
  content: string;
}

export type CompanyuserNotificationsListData = {
  /** @format uuid */
  id: string;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at: number;
  /** @format uuid */
  companyuser_id: string | null;
  type: "new_job" | "application_status" | "new_message" | "review" | "operator" | "payment";
  related_link: string;
  is_read: boolean;
  content: string;
}[];

export interface CompanyuserNotificationsCreatePayload {
  /** @format uuid */
  companyuser_id: string | null;
  type: "new_job" | "application_status" | "new_message" | "review" | "operator" | "payment";
  related_link: string;
  is_read: boolean;
  content: string;
}

export interface CompanyuserNotificationsCreateData {
  /** @format uuid */
  id: string;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at: number;
  /** @format uuid */
  companyuser_id: string | null;
  type: "new_job" | "application_status" | "new_message" | "review" | "operator" | "payment";
  related_link: string;
  is_read: boolean;
  content: string;
}

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
  is_active: boolean;
  is_verified: boolean;
  /** @format timestamptz */
  updated_at: number | null;
  magic_link: object;
  verify_token: string;
}[];

export interface MeRestaurantsListParams {
  companyuser_id: string;
}

export interface MeRestaurantsListData {
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
    is_active: boolean;
    is_verified: boolean;
    /** @format timestamptz */
    updated_at: number | null;
    magic_link: object;
    verify_token: string;
  };
  rest: string;
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
  is_active: boolean;
  is_verified: boolean;
  /** @format timestamptz */
  updated_at: number | null;
  magic_link: object;
  verify_token: string;
}

export interface CompanyuserPartialUpdatePayload {
  /** @format uuid */
  companies_id: string | null;
  name: string;
  /** @format email */
  email: string;
  phone: string | null;
  is_admin: boolean;
  is_active: boolean;
  is_verified: boolean;
  /** @format timestamptz */
  updated_at: number | null;
  magic_link: object;
  verify_token: string;
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
  is_active: boolean;
  is_verified: boolean;
  /** @format timestamptz */
  updated_at: number | null;
  magic_link: object;
  verify_token: string;
}

export interface ByRestaurantCreatePayload {
  /** @format uuid */
  companyuser_id: string | null;
  type: "new_job" | "application_status" | "new_message" | "review" | "operator" | "payment";
  related_link: string;
  is_read: boolean;
  content: string;
}

export type ByRestaurantCreateData = object;

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
  type: "new_job" | "application_status" | "new_message" | "review" | "operator" | "payment";
  related_link: string;
  is_read: boolean;
  content: string;
}[];

export type CompanyuserNotificationDeleteData = object;

export interface CompanyuserNotificationDetailData {
  /** @format uuid */
  id: string;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at: number;
  /** @format uuid */
  companyuser_id: string | null;
  type: "new_job" | "application_status" | "new_message" | "review" | "operator" | "payment";
  related_link: string;
  is_read: boolean;
  content: string;
}

export interface CompanyuserNotificationPartialUpdatePayload {
  /** @format uuid */
  companyuser_id: string | null;
  type: "new_job" | "application_status" | "new_message" | "review" | "operator" | "payment";
  related_link: string;
  is_read: boolean;
  content: string;
}

export interface CompanyuserNotificationPartialUpdateData {
  /** @format uuid */
  id: string;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at: number;
  /** @format uuid */
  companyuser_id: string | null;
  type: "new_job" | "application_status" | "new_message" | "review" | "operator" | "payment";
  related_link: string;
  is_read: boolean;
  content: string;
}

export type CompanyuserNotificationListData = {
  /** @format uuid */
  id: string;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at: number;
  /** @format uuid */
  companyuser_id: string | null;
  type: "new_job" | "application_status" | "new_message" | "review" | "operator" | "payment";
  related_link: string;
  is_read: boolean;
  content: string;
}[];

export interface CompanyuserNotificationCreatePayload {
  /** @format uuid */
  companyuser_id: string | null;
  type: "new_job" | "application_status" | "new_message" | "review" | "operator" | "payment";
  related_link: string;
  is_read: boolean;
  content: string;
}

export interface CompanyuserNotificationCreateData {
  /** @format uuid */
  id: string;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at: number;
  /** @format uuid */
  companyuser_id: string | null;
  type: "new_job" | "application_status" | "new_message" | "review" | "operator" | "payment";
  related_link: string;
  is_read: boolean;
  content: string;
}

export type CompanyusersDeleteData = object;

export interface CompanyusersPartialUpdatePayload {
  /** @format uuid */
  companies_id: string | null;
  name: string;
  /** @format email */
  email: string;
  phone: string | null;
  is_admin: boolean;
  is_active: boolean;
  is_verified: boolean;
  /** @format timestamptz */
  updated_at: number | null;
  magic_link: object;
  verify_token: string;
}

export interface CompanyusersPartialUpdateData {
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
  is_active: boolean;
  is_verified: boolean;
  /** @format timestamptz */
  updated_at: number | null;
  magic_link: object;
  verify_token: string;
}

export type CompanyuserNotificationsListResult = {
  /** @format uuid */
  id: string;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at: number;
  /** @format uuid */
  companyuser_id: string | null;
  type: "new_job" | "application_status" | "new_message" | "review" | "operator" | "payment";
  related_link: string;
  is_read: boolean;
  content: string;
}[];

export type CompanyusersListResult = {
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
  is_active: boolean;
  is_verified: boolean;
  /** @format timestamptz */
  updated_at: number | null;
  magic_link: object;
  verify_token: string;
}[];

export interface CompanyusersCreateBody {
  /** @format uuid */
  companies_id: string | null;
  name: string;
  /** @format email */
  email: string;
  phone: string | null;
  is_admin: boolean;
  is_active: boolean;
  is_verified: boolean;
  /** @format timestamptz */
  updated_at: number | null;
  magic_link: object;
  verify_token: string;
}

export interface CompanyusersCreateResult {
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
  is_active: boolean;
  is_verified: boolean;
  /** @format timestamptz */
  updated_at: number | null;
  magic_link: object;
  verify_token: string;
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
  is_active: boolean;
  is_verified: boolean;
  /** @format timestamptz */
  updated_at: number | null;
  magic_link: object;
  verify_token: string;
}[];

export interface CompanyuserCreatePayload {
  /** @format uuid */
  companies_id: string | null;
  name: string;
  /** @format email */
  email: string;
  phone: string | null;
  is_admin: boolean;
  is_active: boolean;
  is_verified: boolean;
  /** @format timestamptz */
  updated_at: number | null;
  magic_link: object;
  verify_token: string;
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
  is_active: boolean;
  is_verified: boolean;
  /** @format timestamptz */
  updated_at: number | null;
  magic_link: object;
  verify_token: string;
}

export type FilesDeleteData = object;

export interface FilesDetailData {
  /** @format uuid */
  id: string;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at: number;
}

export interface FilesPartialUpdateData {
  /** @format uuid */
  id: string;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at: number;
}

export type FilesListData = {
  /** @format uuid */
  id: string;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at: number;
}[];

export interface FilesCreateData {
  /** @format uuid */
  id: string;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at: number;
}

export interface CompanyDetailResult {
  result1: {
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
  }[];
}

export type RestaurantDetailData = {
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
}[];

export type DeleteJobData = object;

export interface GetJobData {
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
}

export interface PatchJobPayload {
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
}

export interface PatchJobData {
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
}

export interface JobWithCheckCreatePayload {
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
}

export interface JobWithCheckCreateData {
  result1: {
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
  al: string;
}

export type ApplicationsListResult = {
  /** @format uuid */
  id: string;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at: number;
  /** @format timestamptz */
  application_date: number | null;
  /** @default "APPLIED" */
  status: "APPLIED" | "REJECTED" | "ACCEPTED" | "CANCELED" | "DONE";
  notes: string;
  /** @format timestamptz */
  updated_at: number | null;
  /** @format int64 */
  job_id: number;
  /** @format uuid */
  user_id: string | null;
  /** @format timestamptz */
  expiry_date: number | null;
  urgent: boolean;
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
}[];

export type WorksessionsRestaurantTodosListData = {
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
    | "CANCELED";
  /** @format timestamptz */
  updated_at: number;
  /** @format uuid */
  application_id: string;
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
}[];

export type JobsDeleteData = object;

export interface JobsDetailData {
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
}

export interface JobsPartialUpdatePayload {
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
}

export interface JobsPartialUpdateData {
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
}

export interface JobsListResult {
  jobs: {
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
      cuisine_category: {
        "0": {
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
        };
      };
    };
  }[];
}

export interface JobsCreatePayload {
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
}

export interface JobsCreateData {
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
}

export interface GetJob2Data {
  jobs: {
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
      cuisine_category: {
        "0": {
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
        };
      };
    };
  }[];
}

export interface PostJobPayload {
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
}

export interface PostJobData {
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
}

export type WorksessionDetailData = {
  /** @format int64 */
  id: number;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at: number;
  content: string;
  is_read: boolean;
  /** @format timestamptz */
  updated_at: number;
  /** @format uuid */
  application_id: string;
  /** @format uuid */
  chef_id: string;
  sender_type: "chef" | "restaurant";
  /** @format int64 */
  restaurant_id: number | null;
  /** @format int64 */
  worksession_id: number;
}[];

export type MessageDeleteData = object;

export interface MessageDetailData {
  /** @format int64 */
  id: number;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at: number;
  content: string;
  is_read: boolean;
  /** @format timestamptz */
  updated_at: number;
  /** @format uuid */
  application_id: string;
  /** @format uuid */
  chef_id: string;
  sender_type: "chef" | "restaurant";
  /** @format int64 */
  restaurant_id: number | null;
  /** @format int64 */
  worksession_id: number;
}

export interface MessagePartialUpdatePayload {
  content: string;
  is_read: boolean;
  /** @format timestamptz */
  updated_at: number;
  /** @format uuid */
  application_id: string;
  /** @format uuid */
  chef_id: string;
  sender_type: "chef" | "restaurant";
  /** @format int64 */
  restaurant_id: number | null;
  /** @format int64 */
  worksession_id: number;
}

export interface MessagePartialUpdateData {
  /** @format int64 */
  id: number;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at: number;
  content: string;
  is_read: boolean;
  /** @format timestamptz */
  updated_at: number;
  /** @format uuid */
  application_id: string;
  /** @format uuid */
  chef_id: string;
  sender_type: "chef" | "restaurant";
  /** @format int64 */
  restaurant_id: number | null;
  /** @format int64 */
  worksession_id: number;
}

export type MessageattachmentDeleteData = object;

export interface MessageattachmentDetailData {
  /** @format uuid */
  id: string;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at: number;
  /** @format int64 */
  message_id: number;
  file_name: string;
  file_path: string;
  file_type: string;
  /** @format int64 */
  file_size: number;
}

export interface MessageattachmentPartialUpdatePayload {
  /** @format int64 */
  message_id: number;
  file_name: string;
  file_path: string;
  file_type: string;
  /** @format int64 */
  file_size: number;
}

export interface MessageattachmentPartialUpdateData {
  /** @format uuid */
  id: string;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at: number;
  /** @format int64 */
  message_id: number;
  file_name: string;
  file_path: string;
  file_type: string;
  /** @format int64 */
  file_size: number;
}

export type MessageattachmentsDeleteData = object;

export interface MessageattachmentsDetailData {
  /** @format uuid */
  id: string;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at: number;
  /** @format int64 */
  message_id: number;
  file_name: string;
  file_path: string;
  file_type: string;
  /** @format int64 */
  file_size: number;
}

export interface MessageattachmentsPartialUpdatePayload {
  /** @format int64 */
  message_id: number;
  file_name: string;
  file_path: string;
  file_type: string;
  /** @format int64 */
  file_size: number;
}

export interface MessageattachmentsPartialUpdateData {
  /** @format uuid */
  id: string;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at: number;
  /** @format int64 */
  message_id: number;
  file_name: string;
  file_path: string;
  file_type: string;
  /** @format int64 */
  file_size: number;
}

export type MessageattachmentsListData = {
  /** @format uuid */
  id: string;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at: number;
  /** @format int64 */
  message_id: number;
  file_name: string;
  file_path: string;
  file_type: string;
  /** @format int64 */
  file_size: number;
}[];

export interface MessageattachmentsCreatePayload {
  /** @format int64 */
  message_id: number;
  file_name: string;
  file_path: string;
  file_type: string;
  /** @format int64 */
  file_size: number;
}

export interface MessageattachmentsCreateData {
  /** @format uuid */
  id: string;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at: number;
  /** @format int64 */
  message_id: number;
  file_name: string;
  file_path: string;
  file_type: string;
  /** @format int64 */
  file_size: number;
}

export type MessageattachmentListData = {
  /** @format uuid */
  id: string;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at: number;
  /** @format int64 */
  message_id: number;
  file_name: string;
  file_path: string;
  file_type: string;
  /** @format int64 */
  file_size: number;
}[];

export interface MessageattachmentCreatePayload {
  /** @format int64 */
  message_id: number;
  file_name: string;
  file_path: string;
  file_type: string;
  /** @format int64 */
  file_size: number;
}

export interface MessageattachmentCreateData {
  /** @format uuid */
  id: string;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at: number;
  /** @format int64 */
  message_id: number;
  file_name: string;
  file_path: string;
  file_type: string;
  /** @format int64 */
  file_size: number;
}

export type MessagesDeleteData = object;

export interface MessagesDetailData {
  /** @format int64 */
  id: number;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at: number;
  content: string;
  is_read: boolean;
  /** @format timestamptz */
  updated_at: number;
  /** @format uuid */
  application_id: string;
  /** @format uuid */
  chef_id: string;
  sender_type: "chef" | "restaurant";
  /** @format int64 */
  restaurant_id: number | null;
  /** @format int64 */
  worksession_id: number;
}

export interface MessagesPartialUpdatePayload {
  content: string;
  is_read: boolean;
  /** @format timestamptz */
  updated_at: number;
  /** @format uuid */
  application_id: string;
  /** @format uuid */
  chef_id: string;
  sender_type: "chef" | "restaurant";
  /** @format int64 */
  restaurant_id: number | null;
  /** @format int64 */
  worksession_id: number;
}

export interface MessagesPartialUpdateData {
  /** @format int64 */
  id: number;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at: number;
  content: string;
  is_read: boolean;
  /** @format timestamptz */
  updated_at: number;
  /** @format uuid */
  application_id: string;
  /** @format uuid */
  chef_id: string;
  sender_type: "chef" | "restaurant";
  /** @format int64 */
  restaurant_id: number | null;
  /** @format int64 */
  worksession_id: number;
}

export type MessagesListData = {
  /** @format int64 */
  id: number;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at: number;
  content: string;
  is_read: boolean;
  /** @format timestamptz */
  updated_at: number;
  /** @format uuid */
  application_id: string;
  /** @format uuid */
  chef_id: string;
  sender_type: "chef" | "restaurant";
  /** @format int64 */
  restaurant_id: number | null;
  /** @format int64 */
  worksession_id: number;
}[];

export interface MessagesCreatePayload {
  content: string;
  is_read: boolean;
  /** @format timestamptz */
  updated_at: number;
  /** @format uuid */
  application_id: string;
  sender_type: "chef" | "restaurant";
  /** @format int64 */
  restaurant_id: number | null;
  /** @format int64 */
  worksession_id: number;
}

export interface MessagesCreateData {
  /** @format int64 */
  id: number;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at: number;
  content: string;
  is_read: boolean;
  /** @format timestamptz */
  updated_at: number;
  /** @format uuid */
  application_id: string;
  /** @format uuid */
  chef_id: string;
  sender_type: "chef" | "restaurant";
  /** @format int64 */
  restaurant_id: number | null;
  /** @format int64 */
  worksession_id: number;
}

export type MessageListData = {
  /** @format int64 */
  id: number;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at: number;
  content: string;
  is_read: boolean;
  /** @format timestamptz */
  updated_at: number;
  /** @format uuid */
  application_id: string;
  /** @format uuid */
  chef_id: string;
  sender_type: "chef" | "restaurant";
  /** @format int64 */
  restaurant_id: number | null;
  /** @format int64 */
  worksession_id: number;
}[];

export interface MessageCreatePayload {
  content: string;
  is_read: boolean;
  /** @format timestamptz */
  updated_at: number;
  /** @format uuid */
  application_id: string;
  sender_type: "chef" | "restaurant";
  /** @format int64 */
  restaurant_id: number | null;
  /** @format int64 */
  worksession_id: number;
}

export interface MessageCreateData {
  /** @format int64 */
  id: number;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at: number;
  content: string;
  is_read: boolean;
  /** @format timestamptz */
  updated_at: number;
  /** @format uuid */
  application_id: string;
  /** @format uuid */
  chef_id: string;
  sender_type: "chef" | "restaurant";
  /** @format int64 */
  restaurant_id: number | null;
  /** @format int64 */
  worksession_id: number;
}

export type PaymentDeleteData = object;

export interface PaymentDetailData {
  /** @format int64 */
  id: number;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at: number;
  amount: number;
  status: string;
  /** @format date */
  transaction_date: string;
  invoice_number: string;
  /** @format timestamptz */
  updated_at: number;
  /** @format int64 */
  session_id: number;
}

export interface PaymentPartialUpdatePayload {
  amount: number;
  status: string;
  /** @format date */
  transaction_date: string;
  invoice_number: string;
  /** @format timestamptz */
  updated_at: number;
  /** @format int64 */
  session_id: number;
}

export interface PaymentPartialUpdateData {
  /** @format int64 */
  id: number;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at: number;
  amount: number;
  status: string;
  /** @format date */
  transaction_date: string;
  invoice_number: string;
  /** @format timestamptz */
  updated_at: number;
  /** @format int64 */
  session_id: number;
}

export type PaymentsDeleteData = object;

export interface PaymentsDetailData {
  /** @format int64 */
  id: number;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at: number;
  amount: number;
  status: string;
  /** @format date */
  transaction_date: string;
  invoice_number: string;
  /** @format timestamptz */
  updated_at: number;
  /** @format int64 */
  session_id: number;
}

export interface PaymentsPartialUpdatePayload {
  amount: number;
  status: string;
  /** @format date */
  transaction_date: string;
  invoice_number: string;
  /** @format timestamptz */
  updated_at: number;
  /** @format int64 */
  session_id: number;
}

export interface PaymentsPartialUpdateData {
  /** @format int64 */
  id: number;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at: number;
  amount: number;
  status: string;
  /** @format date */
  transaction_date: string;
  invoice_number: string;
  /** @format timestamptz */
  updated_at: number;
  /** @format int64 */
  session_id: number;
}

export type PaymentsListData = {
  /** @format int64 */
  id: number;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at: number;
  amount: number;
  status: string;
  /** @format date */
  transaction_date: string;
  invoice_number: string;
  /** @format timestamptz */
  updated_at: number;
  /** @format int64 */
  session_id: number;
}[];

export interface PaymentsCreatePayload {
  amount: number;
  status: string;
  /** @format date */
  transaction_date: string;
  invoice_number: string;
  /** @format timestamptz */
  updated_at: number;
  /** @format int64 */
  session_id: number;
}

export interface PaymentsCreateData {
  /** @format int64 */
  id: number;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at: number;
  amount: number;
  status: string;
  /** @format date */
  transaction_date: string;
  invoice_number: string;
  /** @format timestamptz */
  updated_at: number;
  /** @format int64 */
  session_id: number;
}

export type PaymentListData = {
  /** @format int64 */
  id: number;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at: number;
  amount: number;
  status: string;
  /** @format date */
  transaction_date: string;
  invoice_number: string;
  /** @format timestamptz */
  updated_at: number;
  /** @format int64 */
  session_id: number;
}[];

export interface PaymentCreatePayload {
  amount: number;
  status: string;
  /** @format date */
  transaction_date: string;
  invoice_number: string;
  /** @format timestamptz */
  updated_at: number;
  /** @format int64 */
  session_id: number;
}

export interface PaymentCreateData {
  /** @format int64 */
  id: number;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at: number;
  amount: number;
  status: string;
  /** @format date */
  transaction_date: string;
  invoice_number: string;
  /** @format timestamptz */
  updated_at: number;
  /** @format int64 */
  session_id: number;
}

export type PhotosDeleteData = object;

export interface PhotosDetailData {
  /** @format uuid */
  id: string;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at: number;
  photo: {
    /** @default "public" */
    access: "public" | "private";
    path: string;
    name: string;
    type: string;
    /** @format int64 */
    size: number;
    mime: string;
    meta: object;
    url: string | null;
  };
}

export interface PhotosPartialUpdatePayload {
  photo: {
    /** @default "public" */
    access: "public" | "private";
    path: string;
    name: string;
    type: string;
    /** @format int64 */
    size: number;
    mime: string;
    meta: object;
  } | null;
}

export interface PhotosPartialUpdateData {
  /** @format uuid */
  id: string;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at: number;
  photo: {
    /** @default "public" */
    access: "public" | "private";
    path: string;
    name: string;
    type: string;
    /** @format int64 */
    size: number;
    mime: string;
    meta: object;
    url: string | null;
  };
}

export type PhotosListData = {
  /** @format uuid */
  id: string;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at: number;
  photo: {
    /** @default "public" */
    access: "public" | "private";
    path: string;
    name: string;
    type: string;
    /** @format int64 */
    size: number;
    mime: string;
    meta: object;
    url: string | null;
  };
}[];

export interface PhotosCreatePayload {
  /** @format binary */
  image: File | null;
}

export type PhotosCreateData = object;

export type RestaurantCuisinesDeleteData = object;

export interface RestaurantCuisinesDetailData {
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

export interface RestaurantCuisinesPartialUpdatePayload {
  /** Whether this cuisine is the primary cuisine for the restaurant. */
  is_primary: boolean;
  category: string;
}

export interface RestaurantCuisinesPartialUpdateData {
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

export interface RestaurantCuisinesUpdatePayload {
  /** Whether this cuisine is the primary cuisine for the restaurant. */
  is_primary: boolean;
  category: string;
}

export interface RestaurantCuisinesUpdateData {
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

export type RestaurantCuisinesListData = {
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

export interface RestaurantCuisinesCreatePayload {
  /** Whether this cuisine is the primary cuisine for the restaurant. */
  is_primary: boolean;
  category: string;
}

export interface RestaurantCuisinesCreateData {
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

export type RestaurantNotificationsDeleteData = object;

export interface RestaurantNotificationsDetailData {
  /** @format int64 */
  id: number;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at: number;
  type: "OPERATOR" | "APPLICATION" | "SESSION";
  content: string;
  /** @format int64 */
  related_id: number;
  is_read: boolean;
  /** @format timestamptz */
  updated_at: number;
  /** @format int64 */
  user_id: number;
  /** url */
  related_link: string;
}

export type RestaurantNotificationsListData = {
  /** @format int64 */
  id: number;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at: number;
  type: "OPERATOR" | "APPLICATION" | "SESSION";
  content: string;
  /** @format int64 */
  related_id: number;
  is_read: boolean;
  /** @format timestamptz */
  updated_at: number;
  /** @format int64 */
  user_id: number;
  /** url */
  related_link: string;
}[];

export interface RestaurantNotificationsCreatePayload {
  type: "OPERATOR" | "APPLICATION" | "SESSION";
  content: string;
  /** @format int64 */
  related_id: number;
  is_read: boolean;
  /** @format timestamptz */
  updated_at: number;
  /** @format int64 */
  user_id: number;
  /** url */
  related_link: string;
}

export interface RestaurantNotificationsCreateData {
  /** @format int64 */
  id: number;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at: number;
  type: "OPERATOR" | "APPLICATION" | "SESSION";
  content: string;
  /** @format int64 */
  related_id: number;
  is_read: boolean;
  /** @format timestamptz */
  updated_at: number;
  /** @format int64 */
  user_id: number;
  /** url */
  related_link: string;
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

export type CompanyDetailOutput = {
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
}[];

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

export interface StaffInviteCreateBody {
  companies_id: string;
  /** @format email */
  email: string;
  /** @format int64 */
  restaurant_id: number;
  can_edit: boolean;
  can_manage_jobs: boolean;
  restaurant_name: string;
}

export type StaffInviteCreateResult = object;

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
  can_edit: boolean;
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
    is_admin: boolean;
    is_active: boolean;
    is_verified: boolean;
    /** @format timestamptz */
    updated_at: number | null;
    magic_link: object;
    verify_token: string;
  };
}[];

export type RestaurantDeleteData = object;

export interface RestaurantDetailResult {
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
}

export interface RestaurantPartialUpdatePayload {
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
  /** @format binary */
  photo: File | null;
}

export type RestaurantPartialUpdateData = object;

export type RestaurantCuisineList2Data = {
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

export type RestaurantNotificationDeleteData = object;

export interface RestaurantNotificationDetailData {
  /** @format int64 */
  id: number;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at: number;
  type: "OPERATOR" | "APPLICATION" | "SESSION";
  content: string;
  /** @format int64 */
  related_id: number;
  is_read: boolean;
  /** @format timestamptz */
  updated_at: number;
  /** @format int64 */
  user_id: number;
  /** url */
  related_link: string;
}

export type RestaurantNotificationListData = {
  /** @format int64 */
  id: number;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at: number;
  type: "OPERATOR" | "APPLICATION" | "SESSION";
  content: string;
  /** @format int64 */
  related_id: number;
  is_read: boolean;
  /** @format timestamptz */
  updated_at: number;
  /** @format int64 */
  user_id: number;
  /** url */
  related_link: string;
}[];

export interface RestaurantNotificationCreatePayload {
  type: "OPERATOR" | "APPLICATION" | "SESSION";
  content: string;
  /** @format int64 */
  related_id: number;
  is_read: boolean;
  /** @format timestamptz */
  updated_at: number;
  /** @format int64 */
  user_id: number;
  /** url */
  related_link: string;
}

export interface RestaurantNotificationCreateData {
  /** @format int64 */
  id: number;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at: number;
  type: "OPERATOR" | "APPLICATION" | "SESSION";
  content: string;
  /** @format int64 */
  related_id: number;
  is_read: boolean;
  /** @format timestamptz */
  updated_at: number;
  /** @format int64 */
  user_id: number;
  /** url */
  related_link: string;
}

export type ByChefDetailData = {
  /** @format int64 */
  id: number;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at: number;
  /** @format int64 */
  rating: number;
  comment: string;
  /** @format timestamptz */
  updated_at: number;
  /** @format int64 */
  session_id: number;
  /** @format int64 */
  reviewer_id: number;
  /** @format uuid */
  reviewee_id: string;
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
}[];

export type ByRestaurantDetailResult = {
  /** @format int64 */
  id: number;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at: number;
  /** @format int64 */
  rating: number;
  comment: string;
  /** @format timestamptz */
  updated_at: number;
  /** @format int64 */
  session_id: number;
  /** @format int64 */
  reviewer_id: number;
  /** @format uuid */
  reviewee_id: string;
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
}[];

export interface BySessionDetailResult {
  /** @format int64 */
  id: number;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at: number;
  /** @format int64 */
  rating: number;
  comment: string;
  /** @format timestamptz */
  updated_at: number;
  /** @format int64 */
  session_id: number;
  /** @format int64 */
  reviewer_id: number;
  /** @format uuid */
  reviewee_id: string;
  worksession: {
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
      | "CANCELED";
    /** @format timestamptz */
    updated_at: number;
    /** @format uuid */
    application_id: string;
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
  };
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
}

export type RestaurantReviewDeleteData = object;

export interface RestaurantReviewDetailData {
  /** @format int64 */
  id: number;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at: number;
  /** @format int64 */
  rating: number;
  comment: string;
  /** @format timestamptz */
  updated_at: number;
  /** @format int64 */
  session_id: number;
  /** @format int64 */
  reviewer_id: number;
  /** @format uuid */
  reviewee_id: string;
}

export interface RestaurantReviewPartialUpdatePayload {
  /** @format int64 */
  rating: number;
  comment: string;
  /** @format timestamptz */
  updated_at: number;
  /** @format int64 */
  session_id: number;
  /** @format int64 */
  reviewer_id: number;
  /** @format uuid */
  reviewee_id: string;
}

export interface RestaurantReviewPartialUpdateData {
  /** @format int64 */
  id: number;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at: number;
  /** @format int64 */
  rating: number;
  comment: string;
  /** @format timestamptz */
  updated_at: number;
  /** @format int64 */
  session_id: number;
  /** @format int64 */
  reviewer_id: number;
  /** @format uuid */
  reviewee_id: string;
}

export type RestaurantReviewsDeleteData = object;

export interface RestaurantReviewsDetailData {
  /** @format int64 */
  id: number;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at: number;
  /** @format int64 */
  rating: number;
  comment: string;
  /** @format timestamptz */
  updated_at: number;
  /** @format int64 */
  session_id: number;
  /** @format int64 */
  reviewer_id: number;
  /** @format uuid */
  reviewee_id: string;
}

export interface RestaurantReviewsPartialUpdatePayload {
  /** @format int64 */
  rating: number;
  comment: string;
  /** @format timestamptz */
  updated_at: number;
  /** @format int64 */
  session_id: number;
  /** @format int64 */
  reviewer_id: number;
  /** @format uuid */
  reviewee_id: string;
}

export interface RestaurantReviewsPartialUpdateData {
  /** @format int64 */
  id: number;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at: number;
  /** @format int64 */
  rating: number;
  comment: string;
  /** @format timestamptz */
  updated_at: number;
  /** @format int64 */
  session_id: number;
  /** @format int64 */
  reviewer_id: number;
  /** @format uuid */
  reviewee_id: string;
}

export type RestaurantReviewsListData = {
  /** @format int64 */
  id: number;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at: number;
  /** @format int64 */
  rating: number;
  comment: string;
  /** @format timestamptz */
  updated_at: number;
  /** @format int64 */
  session_id: number;
  /** @format int64 */
  reviewer_id: number;
  /** @format uuid */
  reviewee_id: string;
}[];

export interface RestaurantReviewsCreatePayload {
  /** @format int64 */
  rating: number;
  comment: string;
  /** @format timestamptz */
  updated_at: number;
  /** @format int64 */
  session_id: number;
  /** @format int64 */
  reviewer_id: number;
  /** @format uuid */
  reviewee_id: string;
}

export interface RestaurantReviewsCreateData {
  /** @format int64 */
  id: number;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at: number;
  /** @format int64 */
  rating: number;
  comment: string;
  /** @format timestamptz */
  updated_at: number;
  /** @format int64 */
  session_id: number;
  /** @format int64 */
  reviewer_id: number;
  /** @format uuid */
  reviewee_id: string;
}

export type RestaurantReviewListData = {
  /** @format int64 */
  id: number;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at: number;
  /** @format int64 */
  rating: number;
  comment: string;
  /** @format timestamptz */
  updated_at: number;
  /** @format int64 */
  session_id: number;
  /** @format int64 */
  reviewer_id: number;
  /** @format uuid */
  reviewee_id: string;
}[];

export interface RestaurantReviewCreatePayload {
  /** @format int64 */
  rating: number;
  comment: string;
  /** @format timestamptz */
  updated_at: number;
  /** @format int64 */
  session_id: number;
  /** @format int64 */
  reviewer_id: number;
  /** @format uuid */
  reviewee_id: string;
}

export interface RestaurantReviewCreateData {
  /** @format int64 */
  id: number;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at: number;
  /** @format int64 */
  rating: number;
  comment: string;
  /** @format timestamptz */
  updated_at: number;
  /** @format int64 */
  session_id: number;
  /** @format int64 */
  reviewer_id: number;
  /** @format uuid */
  reviewee_id: string;
}

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
  can_edit: boolean;
  can_manage_jobs: boolean;
}

export interface RestaurantaccessPartialUpdatePayload {
  /** @format uuid */
  companyuser_id: string | null;
  /** @format int64 */
  restaurant_id: number;
  can_edit: boolean;
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
  can_edit: boolean;
  can_manage_jobs: boolean;
}

export type RestaurantaccessesDeleteData = object;

export interface RestaurantaccessesPartialUpdatePayload {
  /** @format uuid */
  companyuser_id: string | null;
  /** @format int64 */
  restaurant_id: number;
  can_edit: boolean;
  can_manage_jobs: boolean;
}

export interface RestaurantaccessesPartialUpdateData {
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
  can_edit: boolean;
  can_manage_jobs: boolean;
}

export type RestaurantaccessesListData = {
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
  can_edit: boolean;
  can_manage_jobs: boolean;
}[];

export interface RestaurantaccessesCreatePayload {
  /** @format uuid */
  companyuser_id: string | null;
  /** @format int64 */
  restaurant_id: number;
  can_edit: boolean;
  can_manage_jobs: boolean;
  /** @format email */
  staff_email: string;
}

export type RestaurantaccessesCreateData = object;

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
  can_edit: boolean;
  can_manage_jobs: boolean;
}[];

export interface RestaurantaccessCreatePayload {
  /** @format uuid */
  companyuser_id: string | null;
  /** @format int64 */
  restaurant_id: number;
  can_edit: boolean;
  can_manage_jobs: boolean;
  /** @format email */
  staff_email: string;
}

export type RestaurantaccessCreateData = object;

export type ChefReviewsListResult = {
  /** @format int64 */
  id: number;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at: number;
  /** @format int64 */
  rating: number;
  comment: string;
  /** @format timestamptz */
  updated_at: number;
  /** @format int64 */
  session_id: number;
  /** @format uuid */
  reviewer_id: string;
  /** @format int64 */
  reviewee_id: number;
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
}[];

export interface CompanyuserNotificationsCreateBody {
  /** @format uuid */
  companyuser_id: string | null;
  type: "new_job" | "application_status" | "new_message" | "review" | "operator" | "payment";
  related_link: string;
  is_read: boolean;
  content: string;
}

export type CompanyuserNotificationsCreateResult = object;

export interface CompanyusersCreateInput {
  companies_id: string;
  /** @format email */
  email: string;
  can_edit: boolean;
  can_manage_jobs: boolean;
  restaurant_name: string;
}

export type CompanyusersCreateOutput = object;

export type JobsListOutput = {
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
}[];

export type RestaurantReviewsListResult = {
  /** @format int64 */
  id: number;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at: number;
  /** @format int64 */
  rating: number;
  comment: string;
  /** @format timestamptz */
  updated_at: number;
  /** @format int64 */
  session_id: number;
  /** @format int64 */
  reviewer_id: number;
  /** @format uuid */
  reviewee_id: string;
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
}[];

export type RestaurantsDeleteData = object;

export interface RestaurantsDetailData {
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
}

export interface RestaurantsPartialUpdatePayload {
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
}

export interface RestaurantsPartialUpdateData {
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
}

export type RestaurantsListResult = {
  "0": {
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
  };
}[];

export interface RestaurantsCreatePayload {
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
  /** @format binary */
  photo: File | null;
}

export type RestaurantsCreateData = object;

export type RestaurantListData = {
  "0": {
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
  };
}[];

export interface RestaurantCreatePayload {
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
  /** @format binary */
  photo: File | null;
}

export type RestaurantCreateData = object;

export interface StripeCreateAccountLinkCreatePayload {
  user_id: string;
}

export type StripeCreateAccountLinkCreateData = object;

export interface StripeCreateAccountCreatePayload {
  user_id: string;
}

export type StripeCreateAccountCreateData = object;

export type UserDeleteData = object;

export interface UserDetailData {
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

export interface UserPartialUpdatePayload {
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
  is_verified: boolean;
  /** @format binary */
  photo: File | null;
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

export type UserPartialUpdateData = object;

export interface ChefNotificationsListParams1 {
  user_id: string;
  userId: string;
}

export type ChefNotificationsListResult = {
  /** @format int64 */
  id: number;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at: number;
  type: "new_job" | "application_status" | "new_message" | "review" | "operator" | "payment";
  content: string;
  is_read: boolean;
  /** @format timestamptz */
  updated_at: number;
  /** @format uuid */
  user_id: string;
  /** url */
  related_link: string;
}[];

export type ApplicationsListOutput = {
  /** @format uuid */
  id: string;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at: number;
  /** @format timestamptz */
  application_date: number | null;
  /** @default "APPLIED" */
  status: "APPLIED" | "REJECTED" | "ACCEPTED" | "CANCELED" | "DONE";
  notes: string;
  /** @format timestamptz */
  updated_at: number | null;
  /** @format int64 */
  job_id: number;
  /** @format uuid */
  user_id: string | null;
  /** @format timestamptz */
  expiry_date: number | null;
  urgent: boolean;
}[];

export type ChefReviewsListOutput = {
  /** @format int64 */
  id: number;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at: number;
  /** @format int64 */
  rating: number;
  comment: string;
  /** @format timestamptz */
  updated_at: number;
  /** @format int64 */
  session_id: number;
  /** @format uuid */
  reviewer_id: string;
  /** @format int64 */
  reviewee_id: number;
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
}[];

export type RestaurantReviewsListOutput = {
  /** @format int64 */
  id: number;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at: number;
  /** @format int64 */
  rating: number;
  comment: string;
  /** @format timestamptz */
  updated_at: number;
  /** @format int64 */
  session_id: number;
  /** @format int64 */
  reviewer_id: number;
  /** @format uuid */
  reviewee_id: string;
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
}[];

export type StripeAccountCreateData = object;

export type WorksessionsUserTodosListData = {
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
    | "CANCELED";
  /** @format timestamptz */
  updated_at: number;
  /** @format uuid */
  application_id: string;
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
  };
}[];

export type UsersDeleteData = object;

export interface UsersDetailData {
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

export interface UsersPartialUpdatePayload {
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
  is_verified: boolean;
  /** @format binary */
  photo: File | null;
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

export type UsersPartialUpdateData = object;

export type UsersListData = {
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
  magic_link: {
    token: string;
    /**
     * Time the token expires
     * @format timestamptz
     */
    expiration: number;
    used: boolean;
  } | null;
}[];

export interface UsersCreatePayload {
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

export interface UsersCreateData {
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

export type UserListData = {
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
  magic_link: {
    token: string;
    /**
     * Time the token expires
     * @format timestamptz
     */
    expiration: number;
    used: boolean;
  } | null;
}[];

export interface UserCreatePayload {
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

export interface UserCreateData {
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

export interface ApplicationDetailParams1 {
  user_id: string;
  applicationId: string;
}

export interface ApplicationDetailResult {
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
      | "CANCELED";
    /** @format timestamptz */
    updated_at: number;
    /** @format uuid */
    application_id: string;
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
  };
  messages: {
    /** @format int64 */
    id: number;
    /**
     * @format timestamptz
     * @default "now"
     */
    created_at: number;
    content: string;
    is_read: boolean;
    /** @format timestamptz */
    updated_at: number;
    /** @format uuid */
    application_id: string;
    /** @format uuid */
    chef_id: string;
    sender_type: "chef" | "restaurant";
    /** @format int64 */
    restaurant_id: number | null;
    /** @format int64 */
    worksession_id: number;
  }[];
}

export type RestaurantTodoDetailData = {
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
    | "CANCELED";
  /** @format timestamptz */
  updated_at: number;
  /** @format uuid */
  application_id: string;
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
}[];

export type UserDetailResult = {
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
    | "CANCELED";
  /** @format timestamptz */
  updated_at: number;
  /** @format uuid */
  application_id: string;
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
  };
}[];

export type UserTodoDetailData = {
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
    | "CANCELED";
  /** @format timestamptz */
  updated_at: number;
  /** @format uuid */
  application_id: string;
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
  };
}[];

export interface FinishPartialUpdatePayload {
  /** @format int64 */
  rating: number;
  feedback: string;
  /** @format timestamptz */
  check_out_time: number | null;
}

export interface FinishPartialUpdateData {
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
      | "CANCELED";
    /** @format timestamptz */
    updated_at: number;
    /** @format uuid */
    application_id: string;
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
  };
  review: {
    /** @format int64 */
    id: number;
    /**
     * @format timestamptz
     * @default "now"
     */
    created_at: number;
    /** @format int64 */
    rating: number;
    comment: string;
    /** @format timestamptz */
    updated_at: number;
    /** @format int64 */
    session_id: number;
    /** @format uuid */
    reviewer_id: string;
    /** @format int64 */
    reviewee_id: number;
  };
}

export interface StartPartialUpdatePayload {
  /** @format timestamptz */
  check_in_time: number | null;
}

export interface StartPartialUpdateData {
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
    | "CANCELED";
  /** @format timestamptz */
  updated_at: number;
  /** @format uuid */
  application_id: string;
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
}

export interface VerifyPartialUpdatePayload {
  /** @format int64 */
  rating: number;
  feedback: string;
}

export interface VerifyPartialUpdateData {
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
      | "CANCELED";
    /** @format timestamptz */
    updated_at: number;
    /** @format uuid */
    application_id: string;
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
  };
  review: {
    /** @format int64 */
    id: number;
    /**
     * @format timestamptz
     * @default "now"
     */
    created_at: number;
    /** @format int64 */
    rating: number;
    comment: string;
    /** @format timestamptz */
    updated_at: number;
    /** @format int64 */
    session_id: number;
    /** @format int64 */
    reviewer_id: number;
    /** @format uuid */
    reviewee_id: string;
  };
}

export type WorksessionDeleteData = object;

export interface WorksessionDetailResult {
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
    | "CANCELED";
  /** @format timestamptz */
  updated_at: number;
  /** @format uuid */
  application_id: string;
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
}

export interface WorksessionPartialUpdatePayload {
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
    | "CANCELED";
  /** @format timestamptz */
  updated_at: number;
  /** @format uuid */
  application_id: string;
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
}

export interface WorksessionPartialUpdateData {
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
    | "CANCELED";
  /** @format timestamptz */
  updated_at: number;
  /** @format uuid */
  application_id: string;
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
}

export interface ChefReviewListResult {
  /** @format int64 */
  id: number;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at: number;
  /** @format int64 */
  rating: number;
  comment: string;
  /** @format timestamptz */
  updated_at: number;
  /** @format int64 */
  session_id: number;
  /** @format uuid */
  reviewer_id: string;
  /** @format int64 */
  reviewee_id: number;
  worksession: {
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
      | "CANCELED";
    /** @format timestamptz */
    updated_at: number;
    /** @format uuid */
    application_id: string;
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
  };
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
}

export type MessagesListResult = {
  /** @format int64 */
  id: number;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at: number;
  content: string;
  is_read: boolean;
  /** @format timestamptz */
  updated_at: number;
  /** @format uuid */
  application_id: string;
  /** @format uuid */
  chef_id: string;
  sender_type: "chef" | "restaurant";
  /** @format int64 */
  restaurant_id: number | null;
  /** @format int64 */
  worksession_id: number;
}[];

export interface RestaurantReviewListResult {
  /** @format int64 */
  id: number;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at: number;
  /** @format int64 */
  rating: number;
  comment: string;
  /** @format timestamptz */
  updated_at: number;
  /** @format int64 */
  session_id: number;
  /** @format int64 */
  reviewer_id: number;
  /** @format uuid */
  reviewee_id: string;
  worksession: {
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
      | "CANCELED";
    /** @format timestamptz */
    updated_at: number;
    /** @format uuid */
    application_id: string;
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
  };
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
}

export type WorksessionsDeleteData = object;

export interface WorksessionsDetailData {
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
    | "CANCELED";
  /** @format timestamptz */
  updated_at: number;
  /** @format uuid */
  application_id: string;
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
}

export interface WorksessionsPartialUpdatePayload {
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
    | "CANCELED";
  /** @format timestamptz */
  updated_at: number;
  /** @format uuid */
  application_id: string;
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
}

export interface WorksessionsPartialUpdateData {
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
    | "CANCELED";
  /** @format timestamptz */
  updated_at: number;
  /** @format uuid */
  application_id: string;
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
}

export type WorksessionsListResult = {
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
    | "CANCELED";
  /** @format timestamptz */
  updated_at: number;
  /** @format uuid */
  application_id: string;
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
}[];

export interface WorksessionsCreatePayload {
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
    | "CANCELED";
  /** @format timestamptz */
  updated_at: number;
  /** @format uuid */
  application_id: string;
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
}

export interface WorksessionsCreateData {
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
    | "CANCELED";
  /** @format timestamptz */
  updated_at: number;
  /** @format uuid */
  application_id: string;
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
}

export type WorksessionListData = {
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
    | "CANCELED";
  /** @format timestamptz */
  updated_at: number;
  /** @format uuid */
  application_id: string;
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
}[];

export interface WorksessionCreatePayload {
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
    | "CANCELED";
  /** @format timestamptz */
  updated_at: number;
  /** @format uuid */
  application_id: string;
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
}

export interface WorksessionCreateData {
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
    | "CANCELED";
  /** @format timestamptz */
  updated_at: number;
  /** @format uuid */
  application_id: string;
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
}
