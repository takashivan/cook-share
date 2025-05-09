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
  stat: string;
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
    stripe_account_id: string;
    /** @format email */
    pending_email: string;
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
  data: string;
}

export interface SignupCreatePayload {
  name: string;
  /** @format email */
  email: string;
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
  authToken: string;
}
