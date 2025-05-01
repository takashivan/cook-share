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
    /** @format timestamptz */
    start_time: number | null;
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
    /**
     * ルームごとのmessage number
     * @format int64
     */
    message_seq: number;
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

export type CancelBychefLogsListData = {
  /** @format uuid */
  id: string;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at: number;
  /** @format timestamptz */
  canceled_datetime: number | null;
  /** @format int64 */
  job_id: number;
  /** @format uuid */
  user_id: string | null;
  /** @format int64 */
  restaurant_id: number;
  category:
    | "cancelled_by_chef_late"
    | "cancelled_by_chef_same_day"
    | "no_show"
    | "cancelled_by_chef";
  /** @format int64 */
  cancel_fee: number;
  reason: string;
  /** @format int64 */
  worksession_id: number;
}[];

export type CancelByrestaurantLogsListData = {
  /** @format uuid */
  id: string;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at: number;
  /** @format timestamptz */
  canceled_datetime: number | null;
  /** @format int64 */
  job_id: number;
  /** @format uuid */
  user_id: string | null;
  /** @format int64 */
  restaurant_id: number;
  category: "cancelled_by_restaurant" | "cancelled_by_restaurant_late";
  /** @format int64 */
  cancel_fee: number;
  reason: string;
  /** @format int64 */
  worksession_id: number;
}[];

export type UnreadSummaryChefListData = object;

export type UnreadSummaryRestaurantDetailData = object;

export interface UpdateReadChefPartialUpdatePayload {
  /** @format int64 */
  worksession_id: number;
  /** @format int64 */
  last_read_message_seq: number;
}

export interface UpdateReadChefPartialUpdateData {
  /** @format uuid */
  id: string;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at: number;
  /** @format int64 */
  worksession_id: number;
  /** @format uuid */
  user_id: string | null;
  /** @format int64 */
  last_read_message_seq: number;
  /** @format timestamptz */
  updated_at: number | null;
}

export interface UpdateReadRestaurantPartialUpdatePayload {
  /** @format int64 */
  worksession_id: number;
  /** @format int64 */
  last_read_message_seq: number;
}

export interface UpdateReadRestaurantPartialUpdateData {
  /** @format uuid */
  id: string;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at: number;
  /** @format int64 */
  worksession_id: number;
  /** @format int64 */
  restaurant_id: number;
  /** @format int64 */
  last_read_message_seq: number;
  /** @format timestamptz */
  updated_at: number | null;
}

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

export type ChefPayoutLogDeleteData = object;

export interface ChefPayoutLogDetailData {
  /** @format uuid */
  id: string;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at: number;
  /** @format uuid */
  user_id: string | null;
  month: string;
  /** @format int64 */
  total_amount: number;
  transfer_id: string;
  status: "PAID" | "PENDING";
  /** @format timestamptz */
  paid_at: number | null;
}

export interface ChefPayoutLogPartialUpdatePayload {
  /** @format uuid */
  user_id: string | null;
  month: string;
  /** @format int64 */
  total_amount: number;
  transfer_id: string;
  status: "PAID" | "PENDING";
  /** @format timestamptz */
  paid_at: number | null;
}

export interface ChefPayoutLogPartialUpdateData {
  /** @format uuid */
  id: string;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at: number;
  /** @format uuid */
  user_id: string | null;
  month: string;
  /** @format int64 */
  total_amount: number;
  transfer_id: string;
  status: "PAID" | "PENDING";
  /** @format timestamptz */
  paid_at: number | null;
}

export type ChefPayoutLogListData = {
  /** @format uuid */
  id: string;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at: number;
  /** @format uuid */
  user_id: string | null;
  month: string;
  /** @format int64 */
  total_amount: number;
  transfer_id: string;
  status: "PAID" | "PENDING";
  /** @format timestamptz */
  paid_at: number | null;
}[];

export interface ChefPayoutLogCreatePayload {
  /** @format uuid */
  user_id: string | null;
  month: string;
  /** @format int64 */
  total_amount: number;
  transfer_id: string;
  status: "PAID" | "PENDING";
  /** @format timestamptz */
  paid_at: number | null;
}

export interface ChefPayoutLogCreateData {
  /** @format uuid */
  id: string;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at: number;
  /** @format uuid */
  user_id: string | null;
  month: string;
  /** @format int64 */
  total_amount: number;
  transfer_id: string;
  status: "PAID" | "PENDING";
  /** @format timestamptz */
  paid_at: number | null;
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
    /** @format timestamptz */
    start_time: number | null;
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

export interface CompanyusersDeletePayload {
  companies_id: string;
  companyUser_id: string;
}

export interface CompanyusersDeleteData {
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

export interface JobsListData {
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
  is_read: boolean;
  content: string;
  /** @format int64 */
  job_id: number | null;
  /** @format int64 */
  restaurant_id: number | null;
}[];

export interface MarkReadAllPartialUpdateBody {
  user_id: string;
}

export type MarkReadAllPartialUpdateResult = {
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
  is_read: boolean;
  content: string;
  /** @format int64 */
  job_id: number | null;
  /** @format int64 */
  restaurant_id: number | null;
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

export type RestaurantsListResult = {
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

export interface WorksessionsMessagesListData {
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
    /**
     * ルームごとのmessage number
     * @format int64
     */
    message_seq: number;
  }[];
  chef_last_read: {
    /** @format int64 */
    last_read_message_seq: number;
  };
  restaurant_last_read: {
    /** @format int64 */
    last_read_message_seq: number;
  };
}

export type CompanyusersDeleteResult = object;

export interface CompanyusersPartialUpdatePayload {
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
  type:
    | "new_job"
    | "application_status"
    | "new_message"
    | "review"
    | "operator"
    | "payment";
  related_link: string;
  is_read: boolean;
  content: string;
  /** @format int64 */
  job_id: number | null;
  /** @format int64 */
  restaurant_id: number | null;
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

export interface CompanyusersCreateBody {
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

export interface ContactCreatePayload {
  name: string;
  email: string;
  message: string;
  title: string;
  type: string;
}

export type ContactCreateData = object;

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

export interface QueryUpcomingjobsListData {
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
      restaurant_cuisine_id: {
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
      }[];
      description: string;
      phone: string;
    };
  }[];
}

export interface QueryUpcomingListData {
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
      restaurant_cuisine_id: {
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
      }[];
      description: string;
      phone: string;
    };
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

export interface QueryUpcomingListResult {
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
      restaurant_cuisine_id: {
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
      }[];
      description: string;
      phone: string;
    };
  }[];
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
  /** @format timestamptz */
  start_time: number | null;
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
  task: string;
  skill: string;
  whattotake: string;
  note: string;
  point: string;
  transportation: string;
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
  /** @format int64 */
  restaurant_id: number;
  task: string;
  skill: string;
  whattotake: string;
  note: string;
  point: string;
  transportation: string;
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

export interface WorksessionDetailData {
  result1: {
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
    /**
     * ルームごとのmessage number
     * @format int64
     */
    message_seq: number;
  }[];
  chef_last_read: {
    /** @format int64 */
    last_read_message_seq: number;
  };
  restaurant_last_read: {
    /** @format int64 */
    last_read_message_seq: number;
  };
}

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
  /**
   * ルームごとのmessage number
   * @format int64
   */
  message_seq: number;
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
  /**
   * ルームごとのmessage number
   * @format int64
   */
  message_seq: number;
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
  /**
   * ルームごとのmessage number
   * @format int64
   */
  message_seq: number;
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
  /**
   * ルームごとのmessage number
   * @format int64
   */
  message_seq: number;
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
  /**
   * ルームごとのmessage number
   * @format int64
   */
  message_seq: number;
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
  /**
   * ルームごとのmessage number
   * @format int64
   */
  message_seq: number;
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
  /**
   * ルームごとのmessage number
   * @format int64
   */
  message_seq: number;
}[];

export interface MessagesCreatePayload {
  content: string;
  /** @format uuid */
  application_id: string;
  sender_type: "chef" | "restaurant";
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
  /**
   * ルームごとのmessage number
   * @format int64
   */
  message_seq: number;
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
  /**
   * ルームごとのmessage number
   * @format int64
   */
  message_seq: number;
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
  /**
   * ルームごとのmessage number
   * @format int64
   */
  message_seq: number;
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
  /**
   * ルームごとのmessage number
   * @format int64
   */
  message_seq: number;
}

export interface RestaurantCuisinesDeleteData {
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

export interface StaffDeleteDeletePayload {
  /** @format int64 */
  restaurant_id: number;
  user_id: string;
}

export interface StaffDeleteDeleteData {
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
    /** @format timestamptz */
    start_time: number | null;
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

export type RestaurantaccessesDeleteData = object;

export interface RestaurantaccessesPartialUpdatePayload {
  /** @format uuid */
  companyuser_id: string | null;
  /** @format int64 */
  restaurant_id: number;
  /** @default "1" */
  can_edit: boolean;
  /** @default "1" */
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
  /** @default "1" */
  can_edit: boolean;
  /** @default "1" */
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
  /** @default "1" */
  can_edit: boolean;
  /** @default "1" */
  can_manage_jobs: boolean;
}[];

export interface RestaurantaccessesCreatePayload {
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

export interface StaffInviteCreateInput {
  companies_id: string;
  /** @format email */
  email: string;
  /** @format int64 */
  restaurant_id: number;
  can_edit: boolean;
  can_manage_jobs: boolean;
  restaurant_name: string;
}

export type StaffInviteCreateOutput = object;

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

export type CompanyuserNotificationsCreateData = object;

export interface CompanyusersListOutput {
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
  admin: {
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
}

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

export type RestaurantsListOutput = {
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

export interface StripeAccountCheckCreatePayload {
  user_id: string;
}

export type StripeAccountCheckCreateData = object;

export interface StripeCreateAccountLinkCreatePayload {
  user_id: string;
}

export type StripeCreateAccountLinkCreateData = object;

export interface StripeCreateAccountCreatePayload {
  user_id: string;
}

export type StripeCreateAccountCreateData = object;

export type SessionHistoryCurrentListData = {
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
  /** @format timestamptz */
  start_time: number | null;
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
  /** @format email */
  pending_email: string;
  email_change_token: string;
  password_reset_token: string;
  stripe_verified: boolean;
  stripe_requirements: object;
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

export interface ChefNotificationsListParams {
  user_id: string;
  userId: string;
}

export type ChefNotificationsListData = {
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

export type StripeAccountLinksCreateData = object;

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
  /** @format timestamptz */
  start_time: number | null;
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

export interface WorksessionsMessagesListResult {
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
    /**
     * ルームごとのmessage number
     * @format int64
     */
    message_seq: number;
  }[];
  chef_last_read: {
    /** @format int64 */
    last_read_message_seq: number;
  };
  restaurant_last_read: {
    /** @format int64 */
    last_read_message_seq: number;
  };
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
  /** @format timestamptz */
  start_time: number | null;
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
  /** @format email */
  pending_email: string;
  email_change_token: string;
  password_reset_token: string;
  stripe_verified: boolean;
  stripe_requirements: object;
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
    /** @format timestamptz */
    start_time: number | null;
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
    /**
     * ルームごとのmessage number
     * @format int64
     */
    message_seq: number;
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
  /** @format timestamptz */
  start_time: number | null;
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
  /** @format timestamptz */
  start_time: number | null;
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
  /** @format timestamptz */
  start_time: number | null;
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
    /** @format timestamptz */
    start_time: number | null;
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
  /** @format timestamptz */
  start_time: number | null;
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
    /** @format timestamptz */
    start_time: number | null;
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
  /** @format timestamptz */
  start_time: number | null;
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
  /** @format timestamptz */
  start_time: number | null;
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
  /** @format timestamptz */
  start_time: number | null;
}

export interface CancelByChefPartialUpdatePayload {
  reason: string;
}

export interface CancelByChefPartialUpdateData {
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
    /** @format timestamptz */
    start_time: number | null;
  };
  cancel_log: {
    /** @format uuid */
    id: string;
    /**
     * @format timestamptz
     * @default "now"
     */
    created_at: number;
    /** @format timestamptz */
    canceled_datetime: number | null;
    /** @format int64 */
    job_id: number;
    /** @format uuid */
    user_id: string | null;
    /** @format int64 */
    restaurant_id: number;
    category:
      | "cancelled_by_chef_late"
      | "cancelled_by_chef_same_day"
      | "no_show"
      | "cancelled_by_chef";
    /** @format int64 */
    cancel_fee: number;
    reason: string;
    /** @format int64 */
    worksession_id: number;
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
  x1: string;
}

export interface CancelByRestaurantPartialUpdatePayload {
  reason: string;
}

export interface CancelByRestaurantPartialUpdateData {
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
    /** @format timestamptz */
    start_time: number | null;
  };
  cancel_log: {
    /** @format uuid */
    id: string;
    /**
     * @format timestamptz
     * @default "now"
     */
    created_at: number;
    /** @format timestamptz */
    canceled_datetime: number | null;
    /** @format int64 */
    job_id: number;
    /** @format uuid */
    user_id: string | null;
    /** @format int64 */
    restaurant_id: number;
    category: "cancelled_by_restaurant" | "cancelled_by_restaurant_late";
    /** @format int64 */
    cancel_fee: number;
    reason: string;
    /** @format int64 */
    worksession_id: number;
  };
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
    /** @format timestamptz */
    start_time: number | null;
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
}

export interface FinishPartialUpdateBody {
  /** @format int64 */
  rating: number;
  feedback: string;
  /** @format timestamptz */
  check_out_time: number | null;
}

export interface FinishPartialUpdateResult {
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
    /** @format timestamptz */
    start_time: number | null;
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
  /**
   * ルームごとのmessage number
   * @format int64
   */
  message_seq: number;
}[];

export interface NoShowPartialUpdateData {
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
    /** @format timestamptz */
    start_time: number | null;
  };
  cancel_log: {
    /** @format uuid */
    id: string;
    /**
     * @format timestamptz
     * @default "now"
     */
    created_at: number;
    /** @format timestamptz */
    canceled_datetime: number | null;
    /** @format int64 */
    job_id: number;
    /** @format uuid */
    user_id: string | null;
    /** @format int64 */
    restaurant_id: number;
    category:
      | "cancelled_by_chef_late"
      | "cancelled_by_chef_same_day"
      | "no_show"
      | "cancelled_by_chef";
    /** @format int64 */
    cancel_fee: number;
    reason: string;
    /** @format int64 */
    worksession_id: number;
  };
}

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
    /** @format timestamptz */
    start_time: number | null;
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

export interface StartPartialUpdateBody {
  /** @format timestamptz */
  check_in_time: number | null;
}

export interface StartPartialUpdateResult {
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
  /** @format timestamptz */
  start_time: number | null;
}

export interface VerifyPartialUpdateBody {
  /** @format int64 */
  rating: number;
  feedback: string;
}

export interface VerifyPartialUpdateResult {
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
    /** @format timestamptz */
    start_time: number | null;
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
  /** @format timestamptz */
  start_time: number | null;
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
  /** @format timestamptz */
  start_time: number | null;
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
  /** @format timestamptz */
  start_time: number | null;
}

export type WorksessionsListOutput = {
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
  /** @format timestamptz */
  start_time: number | null;
}[];

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
  /** @format timestamptz */
  start_time: number | null;
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
  /** @format timestamptz */
  start_time: number | null;
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
  /** @format timestamptz */
  start_time: number | null;
}
