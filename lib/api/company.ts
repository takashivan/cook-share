// lib/api/company.ts - 会社関連 API

import { API_CONFIG, apiRequest } from "./config";
import { CompanyUser } from "./companyUser";

const BASE_URL = API_CONFIG.baseURLs.company;

export interface Company {
  id: string;
  name: string;
  description?: string;
  address: string;
  phone?: string;
  website?: string;
  logo_url?: string;
  created_by: string;
  created_at?: string;
  updated_at?: string;
  status: string;
  business_registration_number: string;
}

export interface initializeCompanyResponse {
  company: Company;
  companyUser: CompanyUser;
}

export interface Location {
  id: string;
  company_id: string;
  name: string;
  address: string;
  phone?: string;
  created_at?: string;
  updated_at?: string;
}

export interface JobApplication {
  id: string;
  job_id: string;
  applicant_id: string;
  status: "pending" | "accepted" | "rejected";
  message?: string;
  created_at?: string;
  updated_at?: string;
}

export interface PaymentMethod {
  id: string;
  company_id: string;
  type: string;
  last4?: string;
  is_default: boolean;
  created_at?: string;
}

export interface BillingHistory {
  id: string;
  company_id: string;
  amount: number;
  status: string;
  date: string;
  description?: string;
}

export interface CompanyNotification {
  id: string;
  company_id: string;
  type: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

export interface CompanySettings {
  id: string;
  company_id: string;
  email_notifications: boolean;
  [key: string]: any;
}

export interface Job {
  id: number;
  created_at: number;
  title: string;
  description: string;
  work_date: string;
  start_time: number;
  end_time: number;
  hourly_rate: number;
  required_skills: string[];
  status: string;
  updated_at: number;
  restaurant_id: number;
  image: string;
  creator_id: number;
  task: string;
  skill: string;
  whattotake: string;
  note: string;
  point: string;
  transportation: string;
}

type QueryParams = Record<string, string>;

// 会社関連
export const getCompanies = async (): Promise<Company[]> => {
  return apiRequest(BASE_URL, "GET");
};

export const createCompany = (
  companyData: Omit<Company, "id" | "created_at" | "updated_at">
) => {
  return apiRequest<Company>(`${BASE_URL}`, "POST", companyData);
};

export const getCompany = async (companyId: string): Promise<Company> => {
  return apiRequest(`${BASE_URL}/${companyId}`, "GET");
};

export const updateCompany = (
  companyId: string,
  companyData: Partial<Omit<Company, "id" | "created_at" | "updated_at">>
) => {
  return apiRequest<Company>(`${BASE_URL}/${companyId}`, "PATCH", companyData);
};

export const deleteCompany = (companyId: string): Promise<void> => {
  return apiRequest(`${BASE_URL}/${companyId}`, "DELETE");
};

// 場所関連
export const getLocations = (): Promise<Location[]> => {
  return apiRequest(`${BASE_URL}/locations`, "GET");
};

export const addLocation = (
  locationData: Omit<Location, "id" | "created_at" | "updated_at">
) => {
  return apiRequest<Location>(`${BASE_URL}/locations`, "POST", locationData);
};

export const updateLocation = (
  locationId: string,
  locationData: Partial<Omit<Location, "id" | "created_at" | "updated_at">>
) => {
  return apiRequest<Location>(
    `${BASE_URL}/locations/${locationId}`,
    "PUT",
    locationData
  );
};

export const deleteLocation = (locationId: string): Promise<void> => {
  return apiRequest(`${BASE_URL}/locations/${locationId}`, "DELETE");
};

export const initializeCompany = (
  companyuser_id: string,
  photo: string,
  companyData: Partial<Company>
): Promise<initializeCompanyResponse> => {
  return apiRequest(`${BASE_URL}/initial`, "POST", {
    companyUser_id: companyuser_id,
    photo: photo,
    ...companyData,
  });
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
) => {
  return apiRequest<Job>(`${BASE_URL}/jobs`, "POST", jobData);
};

export const updateJob = (
  jobId: string,
  jobData: Partial<Omit<Job, "id" | "created_at" | "updated_at">>
) => {
  return apiRequest<Job>(`${BASE_URL}/jobs/${jobId}`, "PUT", jobData);
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

export const getApplicantProfile = (applicantId: string) => {
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
) => {
  return apiRequest<PaymentMethod>(
    `${BASE_URL}/payment-methods`,
    "POST",
    paymentData
  );
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
export const getBillingHistory = (
  params: QueryParams = {}
): Promise<BillingHistory[]> => {
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
