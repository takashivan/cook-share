// lib/api/companyUser.ts - 会社ユーザー関連 API

import {
  API_CONFIG,
  apiRequest,
} from "./config";
import { Restaurant } from "./restaurant";

const BASE_URL = API_CONFIG.baseURLs.companyUser;
const AUTH_URL = API_CONFIG.baseURLs.companyAuth;

// interface Credentials {
//   email: string;
//   password: string;
// }

export interface CompanyUserData {
  email: string;
  password: string;
  name: string;
  company_name: string;
  [key: string]: any;
}

// export interface CompanyUser {
//   id: string;
//   companies_id: string | null;
//   name: string;
//   email: string;
//   phone?: string;
//   profile_image?: string;
//   is_admin: boolean;
//   is_active: boolean;
//   is_verified: boolean;
//   created_at?: string;
//   updated_at?: string;
//   pending_email?: string;
//   email_change_token?: string;
// }

// type QueryParams = Record<string, string>;

// 認証関連
// export const login = async (
//   credentials: Credentials
// ): Promise<{ sessionToken: string; authToken: string; user: CompanyUser }> => {
//   try {
//     const response = await apiRequest<{
//       sessionToken: string;
//       authToken: string;
//       user: CompanyUser;
//     }>(`${AUTH_URL}/login`, "POST", credentials);
//     if (response.sessionToken) {
//       setAuthToken(response.sessionToken, "company");
//     }
//     return response;
//   } catch (error) {
//     throw error;
//   }
// };

export const getMyRestaurants = async (
  companyuser_id: string
): Promise<Restaurant[]> => {
  return apiRequest(`${BASE_URL}/restaurants/${companyuser_id}`, "GET");
};

// export const register = async (
//   userData: CompanyUserData
// ): Promise<{ sessionToken: string; authToken: string; user: CompanyUser }> => {
//   const response = await apiRequest<SignupCreateData>(`${AUTH_URL}/signup`, "POST", userData);

//   if (response.sessionToken) {
//     setAuthToken(response.sessionToken, "company");
//   }

//   return {
//     sessionToken: response.sessionToken,
//     authToken: response.authToken,
//     user: {
//       ...response.user,
//       phone: response.user.phone || undefined,
//       created_at: undefined,
//       updated_at: undefined,
//     },
//   };
// };

export const verifyEmail = async (token: string, user_id: string) => {
  return apiRequest(`${AUTH_URL}/verify-email`, "POST", { token, user_id });
};

// export const changePassword = (new_password: string): Promise<void> => {
//   return apiRequest(
//     `${AUTH_URL}/change-password`,
//     "POST",
//     {
//       new_password,
//     },
//     "company"
//   );
// };

// export const getCurrentUser = async (): Promise<CompanyUser> => {
//   const response = await apiRequest<{
//     id: string;
//     name: string;
//     email: string;
//     company_id: string;
//     role: string;
//   }>(`${BASE_URL}/me`, "GET");

//   return {
//     ...response,
//     companies_id: response.company_id,
//     is_admin: response.role === "admin",
//     is_active: true,
//     is_verified: true,
//   };
// };

// export const getUserProfile = async (): Promise<CompanyUser> => {
//   return apiRequest(`${BASE_URL}/me`, "GET");
// };

export const updateEmail = async (
  user_id: string,
  email: string
): Promise<void> => {
  return apiRequest(`${AUTH_URL}/update-email`, "POST", {
    user_id,
    email,
  });
};
export const resendVerificationEmail = async (
  user_id: string
): Promise<void> => {
  return apiRequest(`${AUTH_URL}/resend-verification`, "POST", {
    user_id,
  });
};

// export const logout = (): Promise<{ success: boolean }> => {
//   clearAuthToken("company");
//   return Promise.resolve({ success: true });
// };

// export const forgotPassword = (
//   email: string
// ): Promise<{ success: boolean }> => {
//   return apiRequest(`${BASE_URL}/auth/forgot-password`, "POST", { email });
// };

// export type CompanyUserResponse = CompanyUser[];

// export const getCompanyUserByCompanyId = (
//   companies_id: string
// ): Promise<CompanyUserResponse> => {
//   return apiRequest(`${BASE_URL}/company/${companies_id}`, "GET");
// };

// export const updateCompanyUser = async (
//   companyuser_id: string,
//   userData: Partial<CompanyUser>
// ): Promise<CompanyUser> => {
//   return apiRequest(`${BASE_URL}/${companyuser_id}`, "PATCH", userData);
// };

// export const getCompanyProfile = async (): Promise<Company> => {
//   return apiRequest(`${BASE_URL}/profile`, "GET");
// };

// export const changeEmail = (newEmail: string): Promise<void> => {
//   return apiRequest(`${BASE_URL}/email/change`, "POST", { newEmail });
// };

export const confirmEmail = (token: string): Promise<void> => {
  return apiRequest(`${BASE_URL}/email/confirm`, "POST", { token });
};

export const requestPasswordReset = (email: string): Promise<void> => {
  return apiRequest(`${AUTH_URL}/request-password-reset`, "POST", {
    email,
  });
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
    "company"
  );
};
