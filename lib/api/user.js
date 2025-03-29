// lib/api/user.js - シェフユーザー関連 API

import { API_CONFIG, apiRequest, setAuthToken, clearAuthToken } from "./config";

const AUTH_URL = API_CONFIG.baseURLs.auth;
const USER_URL = API_CONFIG.baseURLs.user;

// 認証関連
export const login = async (credentials) => {
  try {
    const response = await apiRequest(`${AUTH_URL}/login`, "POST", credentials);
    if (response.token) {
      setAuthToken("user", response.token);
    }
    return response;
  } catch (error) {
    throw error;
  }
};

export const register = async (userData) => {
  return apiRequest(`${AUTH_URL}/signup`, "POST", userData);
};

export const getCurrentUser = async () => {
  return apiRequest(`${AUTH_URL}/me`, "GET");
};

export const logout = () => {
  clearAuthToken("user");
  return Promise.resolve({ success: true });
};

export const forgotPassword = (email) => {
  return apiRequest(`${AUTH_URL}/forgot-password`, "POST", { email });
};

export const resetPassword = (token, newPassword) => {
  return apiRequest(`${AUTH_URL}/reset-password`, "POST", {
    token,
    newPassword,
  });
};

// ユーザープロフィール関連
export const getUserProfile = (userId) => {
  return apiRequest(`${USER_URL}/${userId}`, "GET");
};

export const updateUserProfile = (userId, profileData) => {
  return apiRequest(`${USER_URL}/${userId}`, "PATCH", profileData);
};

export const updateAvatar = async (userId, imageFile) => {
  const formData = new FormData();
  formData.append("avatar", imageFile);

  // FormDataを送信する場合はContent-Typeヘッダーを手動で設定しない（ブラウザが自動設定）
  const headers = {};
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
export const updateSkills = (userId, skillsData) => {
  return apiRequest(`${USER_URL}/${userId}`, "PATCH", {
    skills: skillsData,
  });
};

// 経験関連
export const updateExperience = (userId, experienceData) => {
  return apiRequest(`${USER_URL}/${userId}`, "PATCH", {
    experience_level: experienceData,
  });
};

// 資格関連
export const updateCertifications = (userId, certificationsData) => {
  return apiRequest(`${USER_URL}/${userId}`, "PATCH", {
    certifications: certificationsData,
  });
};

// プロフィール情報更新
export const updateBio = (userId, bioData) => {
  return apiRequest(`${USER_URL}/${userId}`, "PATCH", {
    bio: bioData,
  });
};

// 生年月日更新
export const updateDateOfBirth = (userId, dateOfBirth) => {
  return apiRequest(`${USER_URL}/${userId}`, "PATCH", {
    dateofbirth: dateOfBirth,
  });
};

// ステータス更新
export const updateStatus = (userId, status) => {
  return apiRequest(`${USER_URL}/${userId}`, "PATCH", {
    status: status,
  });
};

// ジョブ応募関連
export const getJobApplications = (userId, params = {}) => {
  const queryParams = new URLSearchParams(params).toString();
  const url = queryParams
    ? `${USER_URL}/${userId}/applications?${queryParams}`
    : `${USER_URL}/${userId}/applications`;
  return apiRequest(url, "GET");
};

export const applyToJob = (userId, jobId, applicationData) => {
  return apiRequest(`${USER_URL}/${userId}/applications`, "POST", {
    jobId,
    ...applicationData,
  });
};

export const withdrawApplication = (userId, applicationId) => {
  return apiRequest(
    `${USER_URL}/${userId}/applications/${applicationId}`,
    "DELETE"
  );
};

// 通知関連
export const getNotifications = (userId, params = {}) => {
  const queryParams = new URLSearchParams(params).toString();
  const url = queryParams
    ? `${USER_URL}/${userId}/notifications?${queryParams}`
    : `${USER_URL}/${userId}/notifications`;
  return apiRequest(url, "GET");
};

export const markNotificationAsRead = (userId, notificationId) => {
  return apiRequest(
    `${USER_URL}/${userId}/notifications/${notificationId}/read`,
    "PUT"
  );
};

export const markAllNotificationsAsRead = (userId) => {
  return apiRequest(`${USER_URL}/${userId}/notifications/read-all`, "PUT");
};

// 設定関連
export const getSettings = (userId) => {
  return apiRequest(`${USER_URL}/${userId}/settings`, "GET");
};

export const updateSettings = (userId, settingsData) => {
  return apiRequest(`${USER_URL}/${userId}/settings`, "PUT", settingsData);
};
