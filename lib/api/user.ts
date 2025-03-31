// lib/api/user.ts - シェフユーザー関連 API

import { API_CONFIG, apiRequest, setAuthToken, clearAuthToken } from "./config";

const AUTH_URL = API_CONFIG.baseURLs.auth;
const USER_URL = API_CONFIG.baseURLs.user;

interface Credentials {
  email: string;
  password: string;
}

interface UserData {
  email: string;
  password: string;
  name: string;
  [key: string]: any;
}

interface RegisterResponse {
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
  created_at?: string;
  updated_at?: string;
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
): Promise<{ token: string; user: UserProfile }> => {
  try {
    const response = await apiRequest<{
      token: string;
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

    if (response.token) {
      setAuthToken(response.token, "chef");
    }

    return {
      token: response.token,
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
  }>(`${AUTH_URL}/signup`, "POST", userData);

  if (response.authToken) {
    setAuthToken(response.authToken, "chef");
  }

  return {
    authToken: response.authToken,
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

export const logout = () => {
  clearAuthToken("chef");
  return Promise.resolve({ success: true });
};

export const forgotPassword = (email: string) => {
  return apiRequest(`${AUTH_URL}/forgot-password`, "POST", { email });
};

export const resetPassword = (token: string, newPassword: string) => {
  return apiRequest(`${AUTH_URL}/reset-password`, "POST", {
    token,
    newPassword,
  });
};

// ユーザープロフィール関連
export const getUserProfile = (userId: UserId): Promise<UserProfile> => {
  return apiRequest<UserProfile>(`${USER_URL}/${userId}`, "GET");
};

export const updateUserProfile = (
  userId: UserId,
  profileData: ProfileData
): Promise<UserProfile> => {
  return apiRequest<UserProfile>(`${USER_URL}/${userId}`, "PATCH", profileData);
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
