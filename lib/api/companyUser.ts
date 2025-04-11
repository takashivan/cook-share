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

export const verifyEmail = async (token: string, user_id: string) => {
  return apiRequest(`${AUTH_URL}/verify-email`, "POST", { token, user_id });
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

export type CompanyUserResponse = CompanyUser[];

export const getCompanyUserByCompanyId = (
  id: string
): Promise<CompanyUserResponse> => {
  return apiRequest(`${BASE_URL}/company/${id}`, "GET");
};

export const updateCompanyUser = async (
  companyuser_id: string,
  userData: Partial<CompanyUser>
): Promise<CompanyUser> => {
  return apiRequest(`${BASE_URL}/${companyuser_id}`, "PATCH", userData);
};

export const getCompanyProfile = async (): Promise<Company> => {
  return apiRequest(`${BASE_URL}/profile`, "GET");
};
