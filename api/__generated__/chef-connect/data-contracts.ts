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

export type AdminlogDeleteData = object;

export interface AdminlogDetailData {
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
}

export interface AdminlogPartialUpdatePayload {
  /** @format int64 */
  target_id?: number;
  target_type?: string;
  action?: string;
  reason?: string;
  /** @format uuid */
  operator_id?: string | null;
}

export interface AdminlogPartialUpdateData {
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
}

export type AdminlogListData = {
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
}[];

export interface AdminlogCreatePayload {
  /** @format int64 */
  target_id?: number;
  target_type?: string;
  action?: string;
  reason?: string;
  /** @format uuid */
  operator_id?: string | null;
}

export interface AdminlogCreateData {
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
}

export type ByRestaurantDetailData = {
  /** @format int64 */
  id?: number;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at?: number;
  /** @format int64 */
  rating?: number;
  comment?: string;
  /** @format timestamptz */
  updated_at?: number;
  /** @format int64 */
  session_id?: number;
  /** @format uuid */
  reviewer_id?: string;
  /** @format int64 */
  reviewee_id?: number;
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
}[];

export interface BySessionDetailData {
  /** @format int64 */
  id?: number;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at?: number;
  /** @format int64 */
  rating?: number;
  comment?: string;
  /** @format timestamptz */
  updated_at?: number;
  /** @format int64 */
  session_id?: number;
  /** @format uuid */
  reviewer_id?: string;
  /** @format int64 */
  reviewee_id?: number;
  worksession?: {
    /** @format int64 */
    id?: number;
    /**
     * @format timestamptz
     * @default "now"
     */
    created_at?: number;
    /** @format timestamptz */
    check_in_time?: number;
    /** @format timestamptz */
    check_out_time?: number;
    total_hours?: number;
    location_data?: string;
    status?:
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
    updated_at?: number;
    /** @format uuid */
    application_id?: string;
    /** @format uuid */
    user_id?: string | null;
    /** @format int64 */
    restaurant_id?: number;
    /** @format int64 */
    job_id?: number;
    /** @format int64 */
    paid_amount?: number;
    chef_feedback?: string;
    restaurant_feedback?: string;
    /** @format int64 */
    chef_rating?: number;
    /** @format int64 */
    restaurant_rating?: number;
  };
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

export type ByUserDetailData = {
  /** @format int64 */
  id?: number;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at?: number;
  /** @format int64 */
  rating?: number;
  comment?: string;
  /** @format timestamptz */
  updated_at?: number;
  /** @format int64 */
  session_id?: number;
  /** @format uuid */
  reviewer_id?: string;
  /** @format int64 */
  reviewee_id?: number;
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
}[];

export type ChefReviewDeleteData = object;

export interface ChefReviewDetailData {
  /** @format int64 */
  id?: number;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at?: number;
  /** @format int64 */
  rating?: number;
  comment?: string;
  /** @format timestamptz */
  updated_at?: number;
  /** @format int64 */
  session_id?: number;
  /** @format uuid */
  reviewer_id?: string;
  /** @format int64 */
  reviewee_id?: number;
}

export interface ChefReviewPartialUpdatePayload {
  /** @format int64 */
  rating?: number;
  comment?: string;
  /** @format timestamptz */
  updated_at?: number;
  /** @format int64 */
  session_id?: number;
  /** @format uuid */
  reviewer_id?: string;
  /** @format int64 */
  reviewee_id?: number;
}

export interface ChefReviewPartialUpdateData {
  /** @format int64 */
  id?: number;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at?: number;
  /** @format int64 */
  rating?: number;
  comment?: string;
  /** @format timestamptz */
  updated_at?: number;
  /** @format int64 */
  session_id?: number;
  /** @format uuid */
  reviewer_id?: string;
  /** @format int64 */
  reviewee_id?: number;
}

export type ChefReviewListData = {
  /** @format int64 */
  id?: number;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at?: number;
  /** @format int64 */
  rating?: number;
  comment?: string;
  /** @format timestamptz */
  updated_at?: number;
  /** @format int64 */
  session_id?: number;
  /** @format uuid */
  reviewer_id?: string;
  /** @format int64 */
  reviewee_id?: number;
}[];

export interface ChefReviewCreatePayload {
  /** @format int64 */
  rating?: number;
  comment?: string;
  /** @format timestamptz */
  updated_at?: number;
  /** @format int64 */
  session_id?: number;
  /** @format uuid */
  reviewer_id?: string;
  /** @format int64 */
  reviewee_id?: number;
}

export interface ChefReviewCreateData {
  /** @format int64 */
  id?: number;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at?: number;
  /** @format int64 */
  rating?: number;
  comment?: string;
  /** @format timestamptz */
  updated_at?: number;
  /** @format int64 */
  session_id?: number;
  /** @format uuid */
  reviewer_id?: string;
  /** @format int64 */
  reviewee_id?: number;
}

export type FilesDeleteData = object;

export interface FilesDetailData {
  /** @format uuid */
  id?: string;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at?: number;
}

export interface FilesPartialUpdateData {
  /** @format uuid */
  id?: string;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at?: number;
}

export type FilesListData = {
  /** @format uuid */
  id?: string;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at?: number;
}[];

export interface FilesCreateData {
  /** @format uuid */
  id?: string;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at?: number;
}

export interface CompanyDetailData {
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
  }[];
}

export type RestaurantDetailData = {
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
}[];

export type DeleteJobData = object;

export interface GetJobData {
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
}

export interface PatchJobPayload {
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
}

export interface PatchJobData {
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
}

export interface JobWithCheckCreatePayload {
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
}

export interface JobWithCheckCreateData {
  result1?: {
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
  al?: string;
}

export interface GetJob2Data {
  jobs?: {
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
      cuisine_category?:
        | {
            "0"?: {
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
            };
          }[]
        | null;
    };
  }[];
}

export interface PostJobPayload {
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
}

export interface PostJobData {
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
}

export type WorksessionDetailData = {
  /** @format int64 */
  id?: number;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at?: number;
  content?: string;
  is_read?: boolean;
  /** @format timestamptz */
  updated_at?: number;
  /** @format uuid */
  application_id?: string;
  /** @format uuid */
  chef_id?: string;
  sender_type?: "chef" | "restaurant";
  /** @format int64 */
  restaurant_id?: number | null;
  /** @format int64 */
  worksession_id?: number;
}[];

export type MessageDeleteData = object;

export interface MessageDetailData {
  /** @format int64 */
  id?: number;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at?: number;
  content?: string;
  is_read?: boolean;
  /** @format timestamptz */
  updated_at?: number;
  /** @format uuid */
  application_id?: string;
  /** @format uuid */
  chef_id?: string;
  sender_type?: "chef" | "restaurant";
  /** @format int64 */
  restaurant_id?: number | null;
  /** @format int64 */
  worksession_id?: number;
}

export interface MessagePartialUpdatePayload {
  content?: string;
  is_read?: boolean;
  /** @format timestamptz */
  updated_at?: number;
  /** @format uuid */
  application_id?: string;
  /** @format uuid */
  chef_id?: string;
  sender_type?: "chef" | "restaurant";
  /** @format int64 */
  restaurant_id?: number | null;
  /** @format int64 */
  worksession_id?: number;
}

export interface MessagePartialUpdateData {
  /** @format int64 */
  id?: number;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at?: number;
  content?: string;
  is_read?: boolean;
  /** @format timestamptz */
  updated_at?: number;
  /** @format uuid */
  application_id?: string;
  /** @format uuid */
  chef_id?: string;
  sender_type?: "chef" | "restaurant";
  /** @format int64 */
  restaurant_id?: number | null;
  /** @format int64 */
  worksession_id?: number;
}

export type MessageattachmentDeleteData = object;

export interface MessageattachmentDetailData {
  /** @format uuid */
  id?: string;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at?: number;
  /** @format int64 */
  message_id?: number;
  file_name?: string;
  file_path?: string;
  file_type?: string;
  /** @format int64 */
  file_size?: number;
}

export interface MessageattachmentPartialUpdatePayload {
  /** @format int64 */
  message_id?: number;
  file_name?: string;
  file_path?: string;
  file_type?: string;
  /** @format int64 */
  file_size?: number;
}

export interface MessageattachmentPartialUpdateData {
  /** @format uuid */
  id?: string;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at?: number;
  /** @format int64 */
  message_id?: number;
  file_name?: string;
  file_path?: string;
  file_type?: string;
  /** @format int64 */
  file_size?: number;
}

export type MessageattachmentListData = {
  /** @format uuid */
  id?: string;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at?: number;
  /** @format int64 */
  message_id?: number;
  file_name?: string;
  file_path?: string;
  file_type?: string;
  /** @format int64 */
  file_size?: number;
}[];

export interface MessageattachmentCreatePayload {
  /** @format int64 */
  message_id?: number;
  file_name?: string;
  file_path?: string;
  file_type?: string;
  /** @format int64 */
  file_size?: number;
}

export interface MessageattachmentCreateData {
  /** @format uuid */
  id?: string;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at?: number;
  /** @format int64 */
  message_id?: number;
  file_name?: string;
  file_path?: string;
  file_type?: string;
  /** @format int64 */
  file_size?: number;
}

export type MessageListData = {
  /** @format int64 */
  id?: number;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at?: number;
  content?: string;
  is_read?: boolean;
  /** @format timestamptz */
  updated_at?: number;
  /** @format uuid */
  application_id?: string;
  /** @format uuid */
  chef_id?: string;
  sender_type?: "chef" | "restaurant";
  /** @format int64 */
  restaurant_id?: number | null;
  /** @format int64 */
  worksession_id?: number;
}[];

export interface MessageCreatePayload {
  content?: string;
  is_read?: boolean;
  /** @format timestamptz */
  updated_at?: number;
  /** @format uuid */
  application_id?: string;
  sender_type?: "chef" | "restaurant";
  /** @format int64 */
  restaurant_id?: number | null;
  /** @format int64 */
  worksession_id?: number;
}

export interface MessageCreateData {
  /** @format int64 */
  id?: number;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at?: number;
  content?: string;
  is_read?: boolean;
  /** @format timestamptz */
  updated_at?: number;
  /** @format uuid */
  application_id?: string;
  /** @format uuid */
  chef_id?: string;
  sender_type?: "chef" | "restaurant";
  /** @format int64 */
  restaurant_id?: number | null;
  /** @format int64 */
  worksession_id?: number;
}

export type NotificationDeleteData = object;

export interface NotificationDetailData {
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

export interface NotificationPartialUpdatePayload {
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

export interface NotificationPartialUpdateData {
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

export type NotificationListData = {
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

export interface NotificationCreatePayload {
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

export interface NotificationCreateData {
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

export type PaymentDeleteData = object;

export interface PaymentDetailData {
  /** @format int64 */
  id?: number;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at?: number;
  amount?: number;
  status?: string;
  /** @format date */
  transaction_date?: string;
  invoice_number?: string;
  /** @format timestamptz */
  updated_at?: number;
  /** @format int64 */
  session_id?: number;
}

export interface PaymentPartialUpdatePayload {
  amount?: number;
  status?: string;
  /** @format date */
  transaction_date?: string;
  invoice_number?: string;
  /** @format timestamptz */
  updated_at?: number;
  /** @format int64 */
  session_id?: number;
}

export interface PaymentPartialUpdateData {
  /** @format int64 */
  id?: number;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at?: number;
  amount?: number;
  status?: string;
  /** @format date */
  transaction_date?: string;
  invoice_number?: string;
  /** @format timestamptz */
  updated_at?: number;
  /** @format int64 */
  session_id?: number;
}

export type PaymentListData = {
  /** @format int64 */
  id?: number;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at?: number;
  amount?: number;
  status?: string;
  /** @format date */
  transaction_date?: string;
  invoice_number?: string;
  /** @format timestamptz */
  updated_at?: number;
  /** @format int64 */
  session_id?: number;
}[];

export interface PaymentCreatePayload {
  amount?: number;
  status?: string;
  /** @format date */
  transaction_date?: string;
  invoice_number?: string;
  /** @format timestamptz */
  updated_at?: number;
  /** @format int64 */
  session_id?: number;
}

export interface PaymentCreateData {
  /** @format int64 */
  id?: number;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at?: number;
  amount?: number;
  status?: string;
  /** @format date */
  transaction_date?: string;
  invoice_number?: string;
  /** @format timestamptz */
  updated_at?: number;
  /** @format int64 */
  session_id?: number;
}

export type PhotosDeleteData = object;

export interface PhotosDetailData {
  /** @format uuid */
  id?: string;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at?: number;
  photo?: {
    /** @default "public" */
    access?: "public" | "private";
    path?: string;
    name?: string;
    type?: string;
    /** @format int64 */
    size?: number;
    mime?: string;
    meta?: object;
    url?: string | null;
  };
}

export interface PhotosPartialUpdatePayload {
  photo?: {
    /** @default "public" */
    access?: "public" | "private";
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
  id?: string;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at?: number;
  photo?: {
    /** @default "public" */
    access?: "public" | "private";
    path?: string;
    name?: string;
    type?: string;
    /** @format int64 */
    size?: number;
    mime?: string;
    meta?: object;
    url?: string | null;
  };
}

export type PhotosListData = {
  /** @format uuid */
  id?: string;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at?: number;
  photo?: {
    /** @default "public" */
    access?: "public" | "private";
    path?: string;
    name?: string;
    type?: string;
    /** @format int64 */
    size?: number;
    mime?: string;
    meta?: object;
    url?: string | null;
  };
}[];

export interface PhotosCreatePayload {
  /** @format binary */
  image?: File | null;
}

export type PhotosCreateData = object;

export type CompanyDetailResult = {
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
}[];

export type RestaurantDeleteData = object;

export interface RestaurantDetailResult {
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
}

export interface RestaurantPartialUpdatePayload {
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
}

export interface RestaurantPartialUpdateData {
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
}

export type RestaurantCompanyDetailData = {
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
}[];

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

export type RestaurantJobDetailData = {
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
}[];

export type ByChefDetailData = {
  /** @format int64 */
  id?: number;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at?: number;
  /** @format int64 */
  rating?: number;
  comment?: string;
  /** @format timestamptz */
  updated_at?: number;
  /** @format int64 */
  session_id?: number;
  /** @format int64 */
  reviewer_id?: number;
  /** @format uuid */
  reviewee_id?: string;
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
}[];

export type ByRestaurantDetailResult = {
  /** @format int64 */
  id?: number;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at?: number;
  /** @format int64 */
  rating?: number;
  comment?: string;
  /** @format timestamptz */
  updated_at?: number;
  /** @format int64 */
  session_id?: number;
  /** @format int64 */
  reviewer_id?: number;
  /** @format uuid */
  reviewee_id?: string;
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
}[];

export interface BySessionDetailResult {
  /** @format int64 */
  id?: number;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at?: number;
  /** @format int64 */
  rating?: number;
  comment?: string;
  /** @format timestamptz */
  updated_at?: number;
  /** @format int64 */
  session_id?: number;
  /** @format int64 */
  reviewer_id?: number;
  /** @format uuid */
  reviewee_id?: string;
  worksession?: {
    /** @format int64 */
    id?: number;
    /**
     * @format timestamptz
     * @default "now"
     */
    created_at?: number;
    /** @format timestamptz */
    check_in_time?: number;
    /** @format timestamptz */
    check_out_time?: number;
    total_hours?: number;
    location_data?: string;
    status?:
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
    updated_at?: number;
    /** @format uuid */
    application_id?: string;
    /** @format uuid */
    user_id?: string | null;
    /** @format int64 */
    restaurant_id?: number;
    /** @format int64 */
    job_id?: number;
    /** @format int64 */
    paid_amount?: number;
    chef_feedback?: string;
    restaurant_feedback?: string;
    /** @format int64 */
    chef_rating?: number;
    /** @format int64 */
    restaurant_rating?: number;
  };
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
}

export type RestaurantReviewDeleteData = object;

export interface RestaurantReviewDetailData {
  /** @format int64 */
  id?: number;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at?: number;
  /** @format int64 */
  rating?: number;
  comment?: string;
  /** @format timestamptz */
  updated_at?: number;
  /** @format int64 */
  session_id?: number;
  /** @format int64 */
  reviewer_id?: number;
  /** @format uuid */
  reviewee_id?: string;
}

export interface RestaurantReviewPartialUpdatePayload {
  /** @format int64 */
  rating?: number;
  comment?: string;
  /** @format timestamptz */
  updated_at?: number;
  /** @format int64 */
  session_id?: number;
  /** @format int64 */
  reviewer_id?: number;
  /** @format uuid */
  reviewee_id?: string;
}

export interface RestaurantReviewPartialUpdateData {
  /** @format int64 */
  id?: number;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at?: number;
  /** @format int64 */
  rating?: number;
  comment?: string;
  /** @format timestamptz */
  updated_at?: number;
  /** @format int64 */
  session_id?: number;
  /** @format int64 */
  reviewer_id?: number;
  /** @format uuid */
  reviewee_id?: string;
}

export type RestaurantReviewListData = {
  /** @format int64 */
  id?: number;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at?: number;
  /** @format int64 */
  rating?: number;
  comment?: string;
  /** @format timestamptz */
  updated_at?: number;
  /** @format int64 */
  session_id?: number;
  /** @format int64 */
  reviewer_id?: number;
  /** @format uuid */
  reviewee_id?: string;
}[];

export interface RestaurantReviewCreatePayload {
  /** @format int64 */
  rating?: number;
  comment?: string;
  /** @format timestamptz */
  updated_at?: number;
  /** @format int64 */
  session_id?: number;
  /** @format int64 */
  reviewer_id?: number;
  /** @format uuid */
  reviewee_id?: string;
}

export interface RestaurantReviewCreateData {
  /** @format int64 */
  id?: number;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at?: number;
  /** @format int64 */
  rating?: number;
  comment?: string;
  /** @format timestamptz */
  updated_at?: number;
  /** @format int64 */
  session_id?: number;
  /** @format int64 */
  reviewer_id?: number;
  /** @format uuid */
  reviewee_id?: string;
}

export type RestaurantListData = {
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
  cuisine_category?:
    | {
        "0"?: {
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
        };
      }[]
    | null;
}[];

export interface RestaurantCreatePayload {
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
  /** @format binary */
  photo?: File | null;
}

export type RestaurantCreateData = object;

export type UserDeleteData = object;

export interface UserDetailData {
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

export interface UserPartialUpdatePayload {
  name?: string;
  /** @format email */
  email?: string;
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
  /** @format binary */
  photo?: File | null;
}

export type UserPartialUpdateData = object;

export type UserListData = {
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
}[];

export interface UserCreatePayload {
  name?: string;
  /** @format email */
  email?: string;
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

export interface UserCreateData {
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

export interface ApplicationDetailParams {
  user_id?: string;
  applicationId: string;
}

export interface ApplicationDetailData {
  result1?: {
    /** @format int64 */
    id?: number;
    /**
     * @format timestamptz
     * @default "now"
     */
    created_at?: number;
    /** @format timestamptz */
    check_in_time?: number;
    /** @format timestamptz */
    check_out_time?: number;
    total_hours?: number;
    location_data?: string;
    status?:
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
    updated_at?: number;
    /** @format uuid */
    application_id?: string;
    /** @format uuid */
    user_id?: string | null;
    /** @format int64 */
    restaurant_id?: number;
    /** @format int64 */
    job_id?: number;
    /** @format int64 */
    paid_amount?: number;
    chef_feedback?: string;
    restaurant_feedback?: string;
    /** @format int64 */
    chef_rating?: number;
    /** @format int64 */
    restaurant_rating?: number;
  };
  messages?: {
    /** @format int64 */
    id?: number;
    /**
     * @format timestamptz
     * @default "now"
     */
    created_at?: number;
    content?: string;
    is_read?: boolean;
    /** @format timestamptz */
    updated_at?: number;
    /** @format uuid */
    application_id?: string;
    /** @format uuid */
    chef_id?: string;
    sender_type?: "chef" | "restaurant";
    /** @format int64 */
    restaurant_id?: number | null;
    /** @format int64 */
    worksession_id?: number;
  }[];
}

export type RestaurantTodoDetailData = {
  /** @format int64 */
  id?: number;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at?: number;
  /** @format timestamptz */
  check_in_time?: number;
  /** @format timestamptz */
  check_out_time?: number;
  total_hours?: number;
  location_data?: string;
  status?:
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
  updated_at?: number;
  /** @format uuid */
  application_id?: string;
  /** @format uuid */
  user_id?: string | null;
  /** @format int64 */
  restaurant_id?: number;
  /** @format int64 */
  job_id?: number;
  /** @format int64 */
  paid_amount?: number;
  chef_feedback?: string;
  restaurant_feedback?: string;
  /** @format int64 */
  chef_rating?: number;
  /** @format int64 */
  restaurant_rating?: number;
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
  } | null;
}[];

export type UserTodoDetailData = {
  /** @format int64 */
  id?: number;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at?: number;
  /** @format timestamptz */
  check_in_time?: number;
  /** @format timestamptz */
  check_out_time?: number;
  total_hours?: number;
  location_data?: string;
  status?:
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
  updated_at?: number;
  /** @format uuid */
  application_id?: string;
  /** @format uuid */
  user_id?: string | null;
  /** @format int64 */
  restaurant_id?: number;
  /** @format int64 */
  job_id?: number;
  /** @format int64 */
  paid_amount?: number;
  chef_feedback?: string;
  restaurant_feedback?: string;
  /** @format int64 */
  chef_rating?: number;
  /** @format int64 */
  restaurant_rating?: number;
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
  };
}[];

export interface FinishPartialUpdatePayload {
  /** @format int64 */
  rating?: number;
  feedback?: string;
  /** @format timestamptz */
  check_out_time?: number | null;
}

export interface FinishPartialUpdateData {
  result1?: {
    /** @format int64 */
    id?: number;
    /**
     * @format timestamptz
     * @default "now"
     */
    created_at?: number;
    /** @format timestamptz */
    check_in_time?: number;
    /** @format timestamptz */
    check_out_time?: number;
    total_hours?: number;
    location_data?: string;
    status?:
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
    updated_at?: number;
    /** @format uuid */
    application_id?: string;
    /** @format uuid */
    user_id?: string | null;
    /** @format int64 */
    restaurant_id?: number;
    /** @format int64 */
    job_id?: number;
    /** @format int64 */
    paid_amount?: number;
    chef_feedback?: string;
    restaurant_feedback?: string;
    /** @format int64 */
    chef_rating?: number;
    /** @format int64 */
    restaurant_rating?: number;
  };
  review?: {
    /** @format int64 */
    id?: number;
    /**
     * @format timestamptz
     * @default "now"
     */
    created_at?: number;
    /** @format int64 */
    rating?: number;
    comment?: string;
    /** @format timestamptz */
    updated_at?: number;
    /** @format int64 */
    session_id?: number;
    /** @format uuid */
    reviewer_id?: string;
    /** @format int64 */
    reviewee_id?: number;
  };
}

export interface StartPartialUpdatePayload {
  /** @format timestamptz */
  check_in_time?: number | null;
}

export interface StartPartialUpdateData {
  /** @format int64 */
  id?: number;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at?: number;
  /** @format timestamptz */
  check_in_time?: number;
  /** @format timestamptz */
  check_out_time?: number;
  total_hours?: number;
  location_data?: string;
  status?:
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
  updated_at?: number;
  /** @format uuid */
  application_id?: string;
  /** @format uuid */
  user_id?: string | null;
  /** @format int64 */
  restaurant_id?: number;
  /** @format int64 */
  job_id?: number;
  /** @format int64 */
  paid_amount?: number;
  chef_feedback?: string;
  restaurant_feedback?: string;
  /** @format int64 */
  chef_rating?: number;
  /** @format int64 */
  restaurant_rating?: number;
}

export interface VerifyPartialUpdatePayload {
  /** @format int64 */
  rating?: number;
  feedback?: string;
}

export interface VerifyPartialUpdateData {
  result1?: {
    /** @format int64 */
    id?: number;
    /**
     * @format timestamptz
     * @default "now"
     */
    created_at?: number;
    /** @format timestamptz */
    check_in_time?: number;
    /** @format timestamptz */
    check_out_time?: number;
    total_hours?: number;
    location_data?: string;
    status?:
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
    updated_at?: number;
    /** @format uuid */
    application_id?: string;
    /** @format uuid */
    user_id?: string | null;
    /** @format int64 */
    restaurant_id?: number;
    /** @format int64 */
    job_id?: number;
    /** @format int64 */
    paid_amount?: number;
    chef_feedback?: string;
    restaurant_feedback?: string;
    /** @format int64 */
    chef_rating?: number;
    /** @format int64 */
    restaurant_rating?: number;
  };
  review?: {
    /** @format int64 */
    id?: number;
    /**
     * @format timestamptz
     * @default "now"
     */
    created_at?: number;
    /** @format int64 */
    rating?: number;
    comment?: string;
    /** @format timestamptz */
    updated_at?: number;
    /** @format int64 */
    session_id?: number;
    /** @format int64 */
    reviewer_id?: number;
    /** @format uuid */
    reviewee_id?: string;
  };
}

export type WorksessionDeleteData = object;

export interface WorksessionDetailResult {
  /** @format int64 */
  id?: number;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at?: number;
  /** @format timestamptz */
  check_in_time?: number;
  /** @format timestamptz */
  check_out_time?: number;
  total_hours?: number;
  location_data?: string;
  status?:
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
  updated_at?: number;
  /** @format uuid */
  application_id?: string;
  /** @format uuid */
  user_id?: string | null;
  /** @format int64 */
  restaurant_id?: number;
  /** @format int64 */
  job_id?: number;
  /** @format int64 */
  paid_amount?: number;
  chef_feedback?: string;
  restaurant_feedback?: string;
  /** @format int64 */
  chef_rating?: number;
  /** @format int64 */
  restaurant_rating?: number;
}

export interface WorksessionPartialUpdatePayload {
  /** @format timestamptz */
  check_in_time?: number;
  /** @format timestamptz */
  check_out_time?: number;
  total_hours?: number;
  location_data?: string;
  status?:
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
  updated_at?: number;
  /** @format uuid */
  application_id?: string;
  /** @format uuid */
  user_id?: string | null;
  /** @format int64 */
  restaurant_id?: number;
  /** @format int64 */
  job_id?: number;
  /** @format int64 */
  paid_amount?: number;
  chef_feedback?: string;
  restaurant_feedback?: string;
  /** @format int64 */
  chef_rating?: number;
  /** @format int64 */
  restaurant_rating?: number;
}

export interface WorksessionPartialUpdateData {
  /** @format int64 */
  id?: number;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at?: number;
  /** @format timestamptz */
  check_in_time?: number;
  /** @format timestamptz */
  check_out_time?: number;
  total_hours?: number;
  location_data?: string;
  status?:
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
  updated_at?: number;
  /** @format uuid */
  application_id?: string;
  /** @format uuid */
  user_id?: string | null;
  /** @format int64 */
  restaurant_id?: number;
  /** @format int64 */
  job_id?: number;
  /** @format int64 */
  paid_amount?: number;
  chef_feedback?: string;
  restaurant_feedback?: string;
  /** @format int64 */
  chef_rating?: number;
  /** @format int64 */
  restaurant_rating?: number;
}

export type WorksessionListData = {
  /** @format int64 */
  id?: number;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at?: number;
  /** @format timestamptz */
  check_in_time?: number;
  /** @format timestamptz */
  check_out_time?: number;
  total_hours?: number;
  location_data?: string;
  status?:
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
  updated_at?: number;
  /** @format uuid */
  application_id?: string;
  /** @format uuid */
  user_id?: string | null;
  /** @format int64 */
  restaurant_id?: number;
  /** @format int64 */
  job_id?: number;
  /** @format int64 */
  paid_amount?: number;
  chef_feedback?: string;
  restaurant_feedback?: string;
  /** @format int64 */
  chef_rating?: number;
  /** @format int64 */
  restaurant_rating?: number;
}[];

export interface WorksessionCreatePayload {
  /** @format timestamptz */
  check_in_time?: number;
  /** @format timestamptz */
  check_out_time?: number;
  total_hours?: number;
  location_data?: string;
  status?:
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
  updated_at?: number;
  /** @format uuid */
  application_id?: string;
  /** @format uuid */
  user_id?: string | null;
  /** @format int64 */
  restaurant_id?: number;
  /** @format int64 */
  job_id?: number;
  /** @format int64 */
  paid_amount?: number;
  chef_feedback?: string;
  restaurant_feedback?: string;
  /** @format int64 */
  chef_rating?: number;
  /** @format int64 */
  restaurant_rating?: number;
}

export interface WorksessionCreateData {
  /** @format int64 */
  id?: number;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at?: number;
  /** @format timestamptz */
  check_in_time?: number;
  /** @format timestamptz */
  check_out_time?: number;
  total_hours?: number;
  location_data?: string;
  status?:
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
  updated_at?: number;
  /** @format uuid */
  application_id?: string;
  /** @format uuid */
  user_id?: string | null;
  /** @format int64 */
  restaurant_id?: number;
  /** @format int64 */
  job_id?: number;
  /** @format int64 */
  paid_amount?: number;
  chef_feedback?: string;
  restaurant_feedback?: string;
  /** @format int64 */
  chef_rating?: number;
  /** @format int64 */
  restaurant_rating?: number;
}
