// lib/api/user.ts - シェフユーザー関連 API

import {
  API_CONFIG,
  apiRequest,
  setAuthToken,
  clearAuthToken,
  clearCurrentUser,
  setCurrentUser,
} from "./config";
import { User } from "@/types";

const AUTH_URL = API_CONFIG.baseURLs.auth;
const USER_URL = API_CONFIG.baseURLs.user;

interface Credentials {
  email: string;
  password: string;
}

export interface UserData {
  email: string;
  password: string;
  name: string;
  [key: string]: any;
}

interface RegisterResponse {
  sessionToken: string;
  authToken: string;
  user: UserProfile;
}

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  avatar_url?: string;
  bio?: string;
  skills?: string[];
  experience_level?: string;
  certifications?: string[];
  dateofbirth?: string;
  status?: string;
  is_approved?: boolean;
  created_at?: Date;
  updated_at?: Date;
  profile_image?: string;
  age?: number;
  gender?: string;
  phone?: string;
  address?: string;
  is_active?: boolean;
  is_verified?: boolean;
  experience?: string;
  profileImage?: string;
  stripe_verified?: boolean;
  stripe_requirements?: {
    currentlyDue?: string[];
    eventuallyDue?: string[];
  };
  last_name?: string;
  given_name?: string;
  last_name_kana?: string;
  given_name_kana?: string;
  postal_code?: string;
  prefecture?: string;
  address1?: string;
  city?: string;
  town?: string;
  street?: string;
  address2?: string;
  categories?: number[];
  profile_completed?: boolean;
}

// 共通の型定義
type UserId = string;
type QueryParams = Record<string, string>;

interface ProfileData {
  name?: string;
  email?: string;
  bio?: string;
  avatar_url?: string;
  [key: string]: any;
}

interface ApplicationData {
  jobId: string;
  message?: string;
  [key: string]: any;
}

interface SettingsData {
  notifications?: boolean;
  email_notifications?: boolean;
  [key: string]: any;
}

// 認証関連
export const login = async (
  credentials: Credentials
): Promise<{ sessionToken: string; authToken: string; user: UserProfile }> => {
  try {
    const response = await apiRequest<{
      sessionToken: string;
      authToken: string;
      user: {
        id: string;
        email: string;
        name: string;
        avatar_url?: string;
        bio?: string;
        skills?: string[];
        experience_level?: string;
        certifications?: string[];
        dateofbirth?: string;
        status?: string;
      };
    }>(`${AUTH_URL}/login`, "POST", credentials);

    if (response.sessionToken) {
      setAuthToken(response.sessionToken, "chef");
      setCurrentUser(response.user, "chef");
    }

    return {
      sessionToken: response.sessionToken,
      authToken: response.authToken,
      user: {
        ...response.user,
        created_at: undefined,
        updated_at: undefined,
      },
    };
  } catch (error) {
    throw error;
  }
};

export const register = async (
  userData: UserData
): Promise<RegisterResponse> => {
  const response = await apiRequest<{
    sessionToken: string;
    authToken: string;
    user: {
      id: string;
      email: string;
      name: string;
      avatar_url?: string;
      bio?: string;
      skills?: string[];
      experience_level?: string;
      certifications?: string[];
      dateofbirth?: string;
      status?: string;
      last_name?: string;
      given_name?: string;
      last_name_kana?: string;
      given_name_kana?: string;
      postal_code?: string;
      prefecture?: string;
      address?: string;
      address2?: string;
      categories?: number[];
    };
  }>(`${AUTH_URL}/signup`, "POST", userData);

  if (response.sessionToken) {
    setAuthToken(response.sessionToken, "chef");
  }

  return {
    authToken: response.authToken,
    sessionToken: response.sessionToken,
    user: {
      ...response.user,
      created_at: undefined,
      updated_at: undefined,
    },
  };
};

export const getCurrentUser = async (): Promise<UserProfile> => {
  return apiRequest<UserProfile>(`${AUTH_URL}/me`, "GET");
};

export const verifyEmail = async (token: string, user_id: string) => {
  return apiRequest(`${AUTH_URL}/verify-email`, "POST", { token, user_id });
};

export const logout = () => {
  clearAuthToken("chef");
  clearCurrentUser("chef");
  return Promise.resolve({ success: true });
};

export const forgotPassword = (email: string) => {
  return apiRequest(`${AUTH_URL}/forgot-password`, "POST", { email });
};

// ユーザープロフィール関連
export const getUserProfile = (userId: UserId): Promise<UserProfile> => {
  return apiRequest<UserProfile>(`${USER_URL}/${userId}`, "GET");
};

//ストライプ関連
export const createStripeAccount = async (userId: UserId): Promise<void> => {
  return apiRequest(`${USER_URL}/${userId}/stripe/create-account`, "POST");
};

export const createStripeAccountLink = async (
  user_id: string
): Promise<{ response: { result: { url: string } } }> => {
  const response = await apiRequest<{
    response: { result: { url: string } };
  }>(`${USER_URL}/stripe/create-account-link`, "POST", { user_id });
  return response;
};

export const checkStripeAccount = async (
  user_id: string
): Promise<{
  user: UserProfile;
}> => {
  return apiRequest<{
    user: UserProfile;
  }>(`${USER_URL}/stripe/account-check`, "POST", { user_id });
};

export const updateUserProfile = (
  userId: UserId,
  profileData: ProfileData
): Promise<UserProfile> => {
  return apiRequest<UserProfile>(`${USER_URL}/${userId}`, "PATCH", profileData);
};

export const createUserProfile = (
  userId: UserId,
  profileData: ProfileData
): Promise<UserProfile> => {
  return apiRequest<UserProfile>(
    `${USER_URL}/${userId}/profile`,
    "PATCH",
    profileData
  );
};

export const updateAvatar = async (
  userId: UserId,
  imageFile: File
): Promise<UserProfile> => {
  const formData = new FormData();
  formData.append("avatar", imageFile);

  const headers: Record<string, string> = {};
  const authToken = localStorage.getItem("user_auth_token");
  if (authToken) {
    headers["Authorization"] = `Bearer ${authToken}`;
  }

  try {
    const response = await fetch(`${USER_URL}/${userId}/avatar`, {
      method: "POST",
      headers,
      body: formData,
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw {
        status: response.status,
        message: response.statusText,
        data: errorData,
      };
    }

    return await response.json();
  } catch (error) {
    console.error("Avatar upload failed:", error);
    throw error;
  }
};

// スキル関連
export const updateSkills = (
  userId: UserId,
  skillsData: string[]
): Promise<UserProfile> => {
  return apiRequest<UserProfile>(`${USER_URL}/${userId}`, "PATCH", {
    skills: skillsData,
  });
};

// 経験関連
export const updateExperience = (
  userId: UserId,
  experienceData: string
): Promise<UserProfile> => {
  return apiRequest<UserProfile>(`${USER_URL}/${userId}`, "PATCH", {
    experience_level: experienceData,
  });
};

// 資格関連
export const updateCertifications = (
  userId: UserId,
  certificationsData: string[]
): Promise<UserProfile> => {
  return apiRequest<UserProfile>(`${USER_URL}/${userId}`, "PATCH", {
    certifications: certificationsData,
  });
};

// プロフィール情報更新
export const updateBio = (
  userId: UserId,
  bioData: string
): Promise<UserProfile> => {
  return apiRequest<UserProfile>(`${USER_URL}/${userId}`, "PATCH", {
    bio: bioData,
  });
};

// 生年月日更新
export const updateDateOfBirth = (
  userId: UserId,
  dateOfBirth: string
): Promise<UserProfile> => {
  return apiRequest<UserProfile>(`${USER_URL}/${userId}`, "PATCH", {
    dateofbirth: dateOfBirth,
  });
};

// ステータス更新
export const updateStatus = (
  userId: UserId,
  status: string
): Promise<UserProfile> => {
  return apiRequest<UserProfile>(`${USER_URL}/${userId}`, "PATCH", {
    status: status,
  });
};

// ジョブ応募関連
export const getJobApplications = (
  userId: UserId,
  params: QueryParams = {}
): Promise<any> => {
  const queryParams = new URLSearchParams(params).toString();
  const url = queryParams
    ? `${USER_URL}/${userId}/applications?${queryParams}`
    : `${USER_URL}/${userId}/applications`;
  return apiRequest(url, "GET");
};

export const applyToJob = (
  userId: UserId,
  jobId: string,
  applicationData: ApplicationData
): Promise<any> => {
  return apiRequest(`${USER_URL}/${userId}/applications`, "POST", {
    ...applicationData,
  });
};

export const withdrawApplication = (
  userId: UserId,
  applicationId: string
): Promise<void> => {
  return apiRequest(
    `${USER_URL}/${userId}/applications/${applicationId}`,
    "DELETE"
  );
};

// 通知関連
export const getNotifications = (
  userId: UserId,
  params: QueryParams = {}
): Promise<any> => {
  const queryParams = new URLSearchParams(params).toString();
  const url = queryParams
    ? `${USER_URL}/${userId}/notifications?${queryParams}`
    : `${USER_URL}/${userId}/notifications`;
  return apiRequest(url, "GET");
};

export const markNotificationAsRead = (
  userId: UserId,
  notificationId: string
): Promise<void> => {
  return apiRequest(
    `${USER_URL}/${userId}/notifications/${notificationId}/read`,
    "PUT"
  );
};

export const markAllNotificationsAsRead = (userId: UserId): Promise<void> => {
  return apiRequest(`${USER_URL}/${userId}/notifications/read-all`, "PUT");
};

// 設定関連
export const getSettings = (userId: UserId): Promise<SettingsData> => {
  return apiRequest<SettingsData>(`${USER_URL}/${userId}/settings`, "GET");
};

export const updateSettings = (
  userId: UserId,
  settingsData: SettingsData
): Promise<SettingsData> => {
  return apiRequest<SettingsData>(
    `${USER_URL}/${userId}/settings`,
    "PUT",
    settingsData
  );
};

// 全シェフユーザー取得
export const getAllChefs = async (): Promise<UserProfile[]> => {
  return apiRequest<UserProfile[]>(`${USER_URL}`, "GET");
};

// パスワード変更
export const changeEmail = (newEmail: string): Promise<void> => {
  return apiRequest(`${USER_URL}/email/change`, "POST", { newEmail });
};

export const confirmEmail = (token: string): Promise<void> => {
  return apiRequest(`${USER_URL}/email/confirm`, "POST", { token });
};

export const changePassword = (
  current_password: string,
  new_password: string
): Promise<void> => {
  return apiRequest(`${AUTH_URL}/change-password`, "POST", {
    current_password,
    new_password,
  });
};

export const requestPasswordReset = (email: string): Promise<void> => {
  return apiRequest(`${AUTH_URL}/request-password-reset`, "POST", { email });
};

export const resetPassword = (
  token: string,
  newPassword: string
): Promise<void> => {
  return apiRequest(
    `${AUTH_URL}/reset-password`,
    "POST",
    {
      token,
      new_password: newPassword,
    },
    "chef"
  );
};

export const getWorksessionHistories = (user_id: UserId): Promise<any> => {
  return apiRequest(`${USER_URL}/${user_id}/sessionHistory/current`, "GET");
};

export const getMe = async (): Promise<UserProfile> => {
  return apiRequest<UserProfile>(`${AUTH_URL}/me`, "GET");
};

export const resendVerificationEmail = async (
  user_id: string
): Promise<void> => {
  return apiRequest(`${AUTH_URL}/resend-verification`, "POST", { user_id });
};

export const updateEmail = async (
  user_id: string,
  newEmail: string
): Promise<void> => {
  return apiRequest(`${AUTH_URL}/update-email`, "POST", {
    user_id,
    email: newEmail,
  });
};
