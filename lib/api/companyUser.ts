// lib/api/companyUser.ts - 会社ユーザー関連 API

import {
  API_CONFIG,
  apiRequest,
  setAuthToken,
  clearAuthToken,
  setCurrentUser,
} from "./config";
import {
  Company,
  Location,
  Job,
  JobApplication,
  PaymentMethod,
  CompanyNotification,
  CompanySettings,
} from "./company";

const BASE_URL = API_CONFIG.baseURLs.companyUser;
const AUTH_URL = API_CONFIG.baseURLs.companyAuth;

interface Credentials {
  email: string;
  password: string;
}

interface CompanyUserData {
  email: string;
  password: string;
  name: string;
  company_name: string;
  [key: string]: any;
}

export interface CompanyUser {
  id: string;
  companies_id: string;
  name: string;
  email: string;
  phone?: string;
  profile_image?: string;
  is_admin: boolean;
  is_active: boolean;
  is_verified: boolean;
  created_at?: string;
  updated_at?: string;
}

type QueryParams = Record<string, string>;

// 認証関連
export const login = async (
  credentials: Credentials
): Promise<{ authToken: string; user: CompanyUser }> => {
  try {
    const response = await apiRequest<{ authToken: string; user: CompanyUser }>(
      `${AUTH_URL}/login`,
      "POST",
      credentials
    );
    if (response.authToken) {
      setAuthToken(response.authToken, "company");
    }
    return response;
  } catch (error) {
    throw error;
  }
};

export const register = async (
  userData: CompanyUserData
): Promise<{ authToken: string; user: CompanyUser }> => {
  const response = await apiRequest<{
    authToken: string;
    user: {
      id: string;
      name: string;
      email: string;
      company_id: string;
      role: string;
    };
  }>(`${AUTH_URL}/signup`, "POST", userData);

  if (response.authToken) {
    setAuthToken(response.authToken, "company");
  }

  // Transform the response to match CompanyUser interface
  const transformedUser: CompanyUser = {
    id: response.user.id,
    name: response.user.name,
    email: response.user.email,
    companies_id: response.user.company_id,
    is_admin: response.user.role === "admin",
    is_active: true,
    is_verified: true,
  };

  setCurrentUser(transformedUser, "company");

  return {
    authToken: response.authToken,
    user: transformedUser,
  };
};

export const getCurrentUser = async (): Promise<CompanyUser> => {
  const response = await apiRequest<{
    id: string;
    name: string;
    email: string;
    company_id: string;
    role: string;
  }>(`${BASE_URL}/me`, "GET");

  return {
    ...response,
    companies_id: response.company_id,
    is_admin: response.role === "admin",
    is_active: true,
    is_verified: true,
  };
};

export const logout = (): Promise<{ success: boolean }> => {
  clearAuthToken("company");
  return Promise.resolve({ success: true });
};

export const forgotPassword = (
  email: string
): Promise<{ success: boolean }> => {
  return apiRequest(`${BASE_URL}/auth/forgot-password`, "POST", { email });
};

export const resetPassword = (
  token: string,
  newPassword: string
): Promise<{ success: boolean }> => {
  return apiRequest(`${BASE_URL}/auth/reset-password`, "POST", {
    token,
    newPassword,
  });
};

// 会社プロフィール関連
export const getCompanyProfile = (): Promise<Company> => {
  return apiRequest(`${BASE_URL}/profile`, "GET");
};

export const updateCompanyProfile = (
  profileData: Partial<Company>
): Promise<Company> => {
  return apiRequest(`${BASE_URL}/profile`, "PUT", profileData);
};

export const updateCompanyLogo = async (
  imageFile: File
): Promise<{ logo_url: string }> => {
  const formData = new FormData();
  formData.append("logo", imageFile);

  // FormDataを送信する場合はContent-Typeヘッダーを手動で設定しない
  const headers: Record<string, string> = {};
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
export const getLocations = (): Promise<Location[]> => {
  return apiRequest(`${BASE_URL}/locations`, "GET");
};

export const addLocation = (
  locationData: Omit<Location, "id" | "created_at" | "updated_at">
): Promise<Location> => {
  return apiRequest(`${BASE_URL}/locations`, "POST", locationData);
};

export const updateLocation = (
  locationId: string,
  locationData: Partial<Omit<Location, "id" | "created_at" | "updated_at">>
): Promise<Location> => {
  return apiRequest(`${BASE_URL}/locations/${locationId}`, "PUT", locationData);
};

export const deleteLocation = (locationId: string): Promise<void> => {
  return apiRequest(`${BASE_URL}/locations/${locationId}`, "DELETE");
};

// ジョブ関連
export const getCompanyJobs = (params: QueryParams = {}): Promise<Job[]> => {
  const queryParams = new URLSearchParams(params).toString();
  const url = queryParams
    ? `${BASE_URL}/jobs?${queryParams}`
    : `${BASE_URL}/jobs`;
  return apiRequest(url, "GET");
};

export const getCompanyJob = (jobId: string): Promise<Job> => {
  return apiRequest(`${BASE_URL}/jobs/${jobId}`, "GET");
};

export const createJob = (
  jobData: Omit<Job, "id" | "created_at" | "updated_at">
): Promise<Job> => {
  return apiRequest(`${BASE_URL}/jobs`, "POST", jobData);
};

export const updateJob = (
  jobId: string,
  jobData: Partial<Omit<Job, "id" | "created_at" | "updated_at">>
): Promise<Job> => {
  return apiRequest(`${BASE_URL}/jobs/${jobId}`, "PUT", jobData);
};

export const deleteJob = (jobId: string): Promise<void> => {
  return apiRequest(`${BASE_URL}/jobs/${jobId}`, "DELETE");
};

export const publishJob = (jobId: string): Promise<Job> => {
  return apiRequest(`${BASE_URL}/jobs/${jobId}/publish`, "PUT");
};

export const unpublishJob = (jobId: string): Promise<Job> => {
  return apiRequest(`${BASE_URL}/jobs/${jobId}/unpublish`, "PUT");
};

// 応募者関連
export const getJobApplicants = (
  jobId: string,
  params: QueryParams = {}
): Promise<JobApplication[]> => {
  const queryParams = new URLSearchParams(params).toString();
  const url = queryParams
    ? `${BASE_URL}/jobs/${jobId}/applicants?${queryParams}`
    : `${BASE_URL}/jobs/${jobId}/applicants`;
  return apiRequest(url, "GET");
};

export const getApplicantProfile = (applicantId: string): Promise<any> => {
  return apiRequest(`${BASE_URL}/applicants/${applicantId}`, "GET");
};

export const updateApplicationStatus = (
  applicationId: string,
  status: JobApplication["status"],
  message: string = ""
): Promise<JobApplication> => {
  return apiRequest(`${BASE_URL}/applications/${applicationId}/status`, "PUT", {
    status,
    message,
  });
};

// 支払い関連
export const getPaymentMethods = (): Promise<PaymentMethod[]> => {
  return apiRequest(`${BASE_URL}/payment-methods`, "GET");
};

export const addPaymentMethod = (
  paymentData: Omit<PaymentMethod, "id" | "created_at">
): Promise<PaymentMethod> => {
  return apiRequest(`${BASE_URL}/payment-methods`, "POST", paymentData);
};

export const deletePaymentMethod = (paymentMethodId: string): Promise<void> => {
  return apiRequest(`${BASE_URL}/payment-methods/${paymentMethodId}`, "DELETE");
};

export const setDefaultPaymentMethod = (
  paymentMethodId: string
): Promise<PaymentMethod> => {
  return apiRequest(
    `${BASE_URL}/payment-methods/${paymentMethodId}/default`,
    "PUT"
  );
};

// 請求履歴
export const getBillingHistory = (params: QueryParams = {}): Promise<any[]> => {
  const queryParams = new URLSearchParams(params).toString();
  const url = queryParams
    ? `${BASE_URL}/billing?${queryParams}`
    : `${BASE_URL}/billing`;
  return apiRequest(url, "GET");
};

// 通知関連
export const getNotifications = (
  params: QueryParams = {}
): Promise<CompanyNotification[]> => {
  const queryParams = new URLSearchParams(params).toString();
  const url = queryParams
    ? `${BASE_URL}/notifications?${queryParams}`
    : `${BASE_URL}/notifications`;
  return apiRequest(url, "GET");
};

export const markNotificationAsRead = (
  notificationId: string
): Promise<CompanyNotification> => {
  return apiRequest(`${BASE_URL}/notifications/${notificationId}/read`, "PUT");
};

export const markAllNotificationsAsRead = (): Promise<void> => {
  return apiRequest(`${BASE_URL}/notifications/read-all`, "PUT");
};

// 設定関連
export const getSettings = (): Promise<CompanySettings> => {
  return apiRequest(`${BASE_URL}/settings`, "GET");
};

export const updateSettings = (
  settingsData: Partial<CompanySettings>
): Promise<CompanySettings> => {
  return apiRequest(`${BASE_URL}/settings`, "PUT", settingsData);
};

export const updateCompanyUser = (
  userId: string,
  userData: Partial<CompanyUser>
): Promise<CompanyUser> => {
  return apiRequest<CompanyUser>(`${BASE_URL}/${userId}`, "PATCH", userData);
};
