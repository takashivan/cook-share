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

export type GetApplicationData = {
  /** @format uuid */
  id?: string;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at?: number;
  /** @format timestamptz */
  application_date?: number | null;
  /** @default "APPLIED" */
  status?: "APPLIED" | "REJECTED" | "ACCEPTED" | "CANCELED" | "DONE";
  notes?: string;
  /** @format timestamptz */
  updated_at?: number | null;
  /** @format int64 */
  job_id?: number;
  /** @format uuid */
  user_id?: string | null;
  /** @format timestamptz */
  expiry_date?: number | null;
  urgent?: boolean;
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

export type MyComingDetailData = object;

export type GetApplication2Data = {
  /** @format uuid */
  id?: string;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at?: number;
  /** @format timestamptz */
  application_date?: number | null;
  /** @default "APPLIED" */
  status?: "APPLIED" | "REJECTED" | "ACCEPTED" | "CANCELED" | "DONE";
  notes?: string;
  /** @format timestamptz */
  updated_at?: number | null;
  /** @format int64 */
  job_id?: number;
  /** @format uuid */
  user_id?: string | null;
  /** @format timestamptz */
  expiry_date?: number | null;
  urgent?: boolean;
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
    _restaurant?: {
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

export interface AcceptPartialUpdatePayload {
  message?: string;
}

export interface AcceptPartialUpdateData {
  application?: {
    /** @format uuid */
    id?: string;
    /**
     * @format timestamptz
     * @default "now"
     */
    created_at?: number;
    /** @format timestamptz */
    application_date?: number | null;
    /** @default "APPLIED" */
    status?: "APPLIED" | "REJECTED" | "ACCEPTED" | "CANCELED" | "DONE";
    notes?: string;
    /** @format timestamptz */
    updated_at?: number | null;
    /** @format int64 */
    job_id?: number;
    /** @format uuid */
    user_id?: string | null;
    /** @format timestamptz */
    expiry_date?: number | null;
    urgent?: boolean;
    job?: {
      /** @format int64 */
      restaurant_id?: number;
      restaurant?: {
        /** @format int64 */
        id?: number;
      } | null;
    };
  };
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
  message?: {
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
  };
}

export type RejectPartialUpdateData = object;

export type ApplicationDeleteData = object;

export interface ApplicationDetailData {
  /** @format uuid */
  id?: string;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at?: number;
  /** @format timestamptz */
  application_date?: number | null;
  /** @default "APPLIED" */
  status?: "APPLIED" | "REJECTED" | "ACCEPTED" | "CANCELED" | "DONE";
  notes?: string;
  /** @format timestamptz */
  updated_at?: number | null;
  /** @format int64 */
  job_id?: number;
  /** @format uuid */
  user_id?: string | null;
  /** @format timestamptz */
  expiry_date?: number | null;
  urgent?: boolean;
}

export interface ApplicationPartialUpdatePayload {
  /** @format timestamptz */
  application_date?: number | null;
  /** @default "APPLIED" */
  status?: "APPLIED" | "REJECTED" | "ACCEPTED" | "CANCELED" | "DONE";
  notes?: string;
  /** @format timestamptz */
  updated_at?: number | null;
  /** @format int64 */
  job_id?: number;
  /** @format uuid */
  user_id?: string | null;
  /** @format timestamptz */
  expiry_date?: number | null;
  urgent?: boolean;
}

export interface ApplicationPartialUpdateData {
  /** @format uuid */
  id?: string;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at?: number;
  /** @format timestamptz */
  application_date?: number | null;
  /** @default "APPLIED" */
  status?: "APPLIED" | "REJECTED" | "ACCEPTED" | "CANCELED" | "DONE";
  notes?: string;
  /** @format timestamptz */
  updated_at?: number | null;
  /** @format int64 */
  job_id?: number;
  /** @format uuid */
  user_id?: string | null;
  /** @format timestamptz */
  expiry_date?: number | null;
  urgent?: boolean;
}

export interface ApplicationUpdatePayload {
  /** @format timestamptz */
  application_date?: number | null;
  /** @default "APPLIED" */
  status?: "APPLIED" | "REJECTED" | "ACCEPTED" | "CANCELED" | "DONE";
  notes?: string;
  /** @format timestamptz */
  updated_at?: number | null;
  /** @format int64 */
  job_id?: number;
  /** @format uuid */
  user_id?: string | null;
  /** @format timestamptz */
  expiry_date?: number | null;
  urgent?: boolean;
}

export interface ApplicationUpdateData {
  /** @format uuid */
  id?: string;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at?: number;
  /** @format timestamptz */
  application_date?: number | null;
  /** @default "APPLIED" */
  status?: "APPLIED" | "REJECTED" | "ACCEPTED" | "CANCELED" | "DONE";
  notes?: string;
  /** @format timestamptz */
  updated_at?: number | null;
  /** @format int64 */
  job_id?: number;
  /** @format uuid */
  user_id?: string | null;
  /** @format timestamptz */
  expiry_date?: number | null;
  urgent?: boolean;
}

export type ApplicationListData = {
  /** @format uuid */
  id?: string;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at?: number;
  /** @format timestamptz */
  application_date?: number | null;
  /** @default "APPLIED" */
  status?: "APPLIED" | "REJECTED" | "ACCEPTED" | "CANCELED" | "DONE";
  notes?: string;
  /** @format timestamptz */
  updated_at?: number | null;
  /** @format int64 */
  job_id?: number;
  /** @format uuid */
  user_id?: string | null;
  /** @format timestamptz */
  expiry_date?: number | null;
  urgent?: boolean;
}[];

export interface ApplicationCreatePayload {
  /** @format timestamptz */
  application_date?: number | null;
  /** @default "APPLIED" */
  status?: "APPLIED" | "REJECTED" | "ACCEPTED" | "CANCELED" | "DONE";
  notes?: string;
  /** @format timestamptz */
  updated_at?: number | null;
  /** @format int64 */
  job_id?: number;
  /** @format uuid */
  user_id?: string | null;
  /** @format timestamptz */
  expiry_date?: number | null;
  urgent?: boolean;
}

export interface ApplicationCreateData {
  /** @format uuid */
  id?: string;
  /**
   * @format timestamptz
   * @default "now"
   */
  created_at?: number;
  /** @format timestamptz */
  application_date?: number | null;
  /** @default "APPLIED" */
  status?: "APPLIED" | "REJECTED" | "ACCEPTED" | "CANCELED" | "DONE";
  notes?: string;
  /** @format timestamptz */
  updated_at?: number | null;
  /** @format int64 */
  job_id?: number;
  /** @format uuid */
  user_id?: string | null;
  /** @format timestamptz */
  expiry_date?: number | null;
  urgent?: boolean;
}
