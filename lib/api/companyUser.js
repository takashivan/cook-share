// lib/api/companyUser.js - 会社ユーザー関連 API

import { API_CONFIG, apiRequest, setAuthToken, clearAuthToken } from "./config";

const BASE_URL = API_CONFIG.baseURLs.companyUser;

// 認証関連
export const login = async (credentials) => {
  try {
    const response = await apiRequest(
      `${BASE_URL}/auth/login`,
      "POST",
      credentials
    );
    if (response.token) {
      setAuthToken("companyUser", response.token);
    }
    return response;
  } catch (error) {
    throw error;
  }
};

export const register = async (companyData) => {
  return apiRequest(`${BASE_URL}/auth/register`, "POST", companyData);
};

export const logout = () => {
  clearAuthToken("companyUser");
  return Promise.resolve({ success: true });
};

export const forgotPassword = (email) => {
  return apiRequest(`${BASE_URL}/auth/forgot-password`, "POST", { email });
};

export const resetPassword = (token, newPassword) => {
  return apiRequest(`${BASE_URL}/auth/reset-password`, "POST", {
    token,
    newPassword,
  });
};

// 会社プロフィール関連
export const getCompanyProfile = () => {
  return apiRequest(`${BASE_URL}/profile`, "GET");
};

export const updateCompanyProfile = (profileData) => {
  return apiRequest(`${BASE_URL}/profile`, "PUT", profileData);
};

export const updateCompanyLogo = async (imageFile) => {
  const formData = new FormData();
  formData.append("logo", imageFile);

  // FormDataを送信する場合はContent-Typeヘッダーを手動で設定しない
  const headers = {};
  const authToken = localStorage.getItem("company_auth_token");
  if (authToken) {
    headers["Authorization"] = `Bearer ${authToken}`;
  }

  try {
    const response = await fetch(`${BASE_URL}/profile/logo`, {
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
    console.error("Logo upload failed:", error);
    throw error;
  }
};

// 場所関連
export const getLocations = () => {
  return apiRequest(`${BASE_URL}/locations`, "GET");
};

export const addLocation = (locationData) => {
  return apiRequest(`${BASE_URL}/locations`, "POST", locationData);
};

export const updateLocation = (locationId, locationData) => {
  return apiRequest(`${BASE_URL}/locations/${locationId}`, "PUT", locationData);
};

export const deleteLocation = (locationId) => {
  return apiRequest(`${BASE_URL}/locations/${locationId}`, "DELETE");
};

// ジョブ関連
export const getCompanyJobs = (params = {}) => {
  const queryParams = new URLSearchParams(params).toString();
  const url = queryParams
    ? `${BASE_URL}/jobs?${queryParams}`
    : `${BASE_URL}/jobs`;
  return apiRequest(url, "GET");
};

export const getCompanyJob = (jobId) => {
  return apiRequest(`${BASE_URL}/jobs/${jobId}`, "GET");
};

export const createJob = (jobData) => {
  return apiRequest(`${BASE_URL}/jobs`, "POST", jobData);
};

export const updateJob = (jobId, jobData) => {
  return apiRequest(`${BASE_URL}/jobs/${jobId}`, "PUT", jobData);
};

export const deleteJob = (jobId) => {
  return apiRequest(`${BASE_URL}/jobs/${jobId}`, "DELETE");
};

export const publishJob = (jobId) => {
  return apiRequest(`${BASE_URL}/jobs/${jobId}/publish`, "PUT");
};

export const unpublishJob = (jobId) => {
  return apiRequest(`${BASE_URL}/jobs/${jobId}/unpublish`, "PUT");
};

// 応募者関連
export const getJobApplicants = (jobId, params = {}) => {
  const queryParams = new URLSearchParams(params).toString();
  const url = queryParams
    ? `${BASE_URL}/jobs/${jobId}/applicants?${queryParams}`
    : `${BASE_URL}/jobs/${jobId}/applicants`;
  return apiRequest(url, "GET");
};

export const getApplicantProfile = (applicantId) => {
  return apiRequest(`${BASE_URL}/applicants/${applicantId}`, "GET");
};

export const updateApplicationStatus = (
  applicationId,
  status,
  message = ""
) => {
  return apiRequest(`${BASE_URL}/applications/${applicationId}/status`, "PUT", {
    status,
    message,
  });
};

// 支払い関連
export const getPaymentMethods = () => {
  return apiRequest(`${BASE_URL}/payment-methods`, "GET");
};

export const addPaymentMethod = (paymentData) => {
  return apiRequest(`${BASE_URL}/payment-methods`, "POST", paymentData);
};

export const deletePaymentMethod = (paymentMethodId) => {
  return apiRequest(`${BASE_URL}/payment-methods/${paymentMethodId}`, "DELETE");
};

export const setDefaultPaymentMethod = (paymentMethodId) => {
  return apiRequest(
    `${BASE_URL}/payment-methods/${paymentMethodId}/default`,
    "PUT"
  );
};

// 請求履歴
export const getBillingHistory = (params = {}) => {
  const queryParams = new URLSearchParams(params).toString();
  const url = queryParams
    ? `${BASE_URL}/billing?${queryParams}`
    : `${BASE_URL}/billing`;
  return apiRequest(url, "GET");
};

// 通知関連
export const getNotifications = (params = {}) => {
  const queryParams = new URLSearchParams(params).toString();
  const url = queryParams
    ? `${BASE_URL}/notifications?${queryParams}`
    : `${BASE_URL}/notifications`;
  return apiRequest(url, "GET");
};

export const markNotificationAsRead = (notificationId) => {
  return apiRequest(`${BASE_URL}/notifications/${notificationId}/read`, "PUT");
};

export const markAllNotificationsAsRead = () => {
  return apiRequest(`${BASE_URL}/notifications/read-all`, "PUT");
};

// 設定関連
export const getSettings = () => {
  return apiRequest(`${BASE_URL}/settings`, "GET");
};

export const updateSettings = (settingsData) => {
  return apiRequest(`${BASE_URL}/settings`, "PUT", settingsData);
};
