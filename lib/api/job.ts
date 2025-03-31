// lib/api/job.ts - ジョブ関連 API

import { API_CONFIG, apiRequest } from "./config";
import { Job } from "./company";
import { JobDetail } from "@/app/job/[id]/client";

const BASE_URL = API_CONFIG.baseURLs.job;

interface JobCategory {
  id: string;
  name: string;
  description?: string;
}

interface JobType {
  id: string;
  name: string;
  description?: string;
}

interface JobSkill {
  id: string;
  name: string;
  category?: string;
}

interface Location {
  id: string;
  name: string;
  city: string;
  prefecture: string;
  country: string;
}

interface SalaryRange {
  id: string;
  min: number;
  max: number;
  currency: string;
  type: "yearly" | "monthly" | "hourly";
}

interface JobSearchParams {
  query?: string;
  categories?: string[];
  types?: string[];
  skills?: string[];
  location?: string;
  salary_min?: number;
  salary_max?: number;
  [key: string]: any;
}

interface ShareData {
  platform: "email" | "twitter" | "facebook" | "line";
  recipient_email?: string;
  message?: string;
}

interface QuestionData {
  question: string;
  contact_email: string;
  name?: string;
}

interface JobAlert {
  id: string;
  user_id: string;
  search_params: JobSearchParams;
  frequency: "daily" | "weekly" | "monthly";
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

interface ReportData {
  reason: string;
  details?: string;
  reporter_email?: string;
}

type QueryParams = Record<string, string>;

// ジョブ一覧取得
export const getAllJobs = (params: JobSearchParams = {}): Promise<Job[]> => {
  // パラメータがある場合のみクエリ文字列を追加
  if (Object.keys(params).length > 0) {
    const queryParams = new URLSearchParams(params as QueryParams).toString();
    return apiRequest(`${BASE_URL}?${queryParams}`, "GET");
  }
  // パラメータがない場合はシンプルなGETリクエスト
  return apiRequest(`${BASE_URL}`, "GET");
};

// ジョブ検索・フィルタリング
export const searchJobs = (params: JobSearchParams = {}): Promise<Job[]> => {
  const queryParams = new URLSearchParams(params as QueryParams).toString();
  const url = queryParams
    ? `${BASE_URL}/search?${queryParams}`
    : `${BASE_URL}/search`;
  return apiRequest(url, "GET");
};

// ジョブの詳細情報取得
export const getJobDetails = (jobId: string): Promise<Job> => {
  return apiRequest(`${BASE_URL}/${jobId}`, "GET");
};

// ジョブカテゴリー取得
export const getJobCategories = (): Promise<JobCategory[]> => {
  return apiRequest(`${BASE_URL}/categories`, "GET");
};

// ジョブタイプ取得（正社員、契約社員、パートタイムなど）
export const getJobTypes = (): Promise<JobType[]> => {
  return apiRequest(`${BASE_URL}/types`, "GET");
};

// スキル一覧取得（ジョブに関連するスキル）
export const getJobSkills = (): Promise<JobSkill[]> => {
  return apiRequest(`${BASE_URL}/skills`, "GET");
};

// ロケーション検索（都市や地域）
export const searchLocations = (query: string): Promise<Location[]> => {
  return apiRequest(
    `${BASE_URL}/locations?q=${encodeURIComponent(query)}`,
    "GET"
  );
};

// 給与範囲オプション取得
export const getSalaryRanges = (): Promise<SalaryRange[]> => {
  return apiRequest(`${BASE_URL}/salary-ranges`, "GET");
};

// おすすめジョブ取得
export const getRecommendedJobs = (limit: number = 10): Promise<Job[]> => {
  return apiRequest(`${BASE_URL}/recommended?limit=${limit}`, "GET");
};

// 最近追加されたジョブ
export const getRecentJobs = (limit: number = 10): Promise<Job[]> => {
  return apiRequest(`${BASE_URL}/recent?limit=${limit}`, "GET");
};

// 人気のジョブ
export const getPopularJobs = (limit: number = 10): Promise<Job[]> => {
  return apiRequest(`${BASE_URL}/popular?limit=${limit}`, "GET");
};

// ジョブの閲覧履歴を保存
export const recordJobView = (jobId: string): Promise<void> => {
  return apiRequest(`${BASE_URL}/${jobId}/view`, "POST");
};

// ジョブをブックマーク/保存
export const bookmarkJob = (jobId: string): Promise<void> => {
  return apiRequest(`${BASE_URL}/${jobId}/bookmark`, "POST");
};

// ジョブのブックマークを解除
export const removeBookmark = (jobId: string): Promise<void> => {
  return apiRequest(`${BASE_URL}/${jobId}/bookmark`, "DELETE");
};

// 保存したジョブの一覧を取得
export const getSavedJobs = (params: QueryParams = {}): Promise<Job[]> => {
  const queryParams = new URLSearchParams(params).toString();
  const url = queryParams
    ? `${BASE_URL}/bookmarked?${queryParams}`
    : `${BASE_URL}/bookmarked`;
  return apiRequest(url, "GET");
};

// ジョブを共有（メールやSNSなど）
export const shareJob = (
  jobId: string,
  shareData: ShareData
): Promise<void> => {
  return apiRequest(`${BASE_URL}/${jobId}/share`, "POST", shareData);
};

// ジョブに関する質問を送信
export const sendJobQuestion = (
  jobId: string,
  questionData: QuestionData
): Promise<void> => {
  return apiRequest(`${BASE_URL}/${jobId}/question`, "POST", questionData);
};

// ジョブの応募要件を確認
export const checkJobRequirements = (
  jobId: string,
  profileData: Record<string, any>
): Promise<{ matches: boolean; missing: string[] }> => {
  return apiRequest(
    `${BASE_URL}/${jobId}/check-requirements`,
    "POST",
    profileData
  );
};

// ジョブの類似案件を取得
export const getSimilarJobs = (
  jobId: string,
  limit: number = 5
): Promise<Job[]> => {
  return apiRequest(`${BASE_URL}/${jobId}/similar?limit=${limit}`, "GET");
};

// ジョブ検索の保存
export const saveJobSearch = (
  searchParams: JobSearchParams
): Promise<{ id: string }> => {
  return apiRequest(`${BASE_URL}/saved-searches`, "POST", searchParams);
};

// 保存した検索条件の取得
export const getSavedSearches = (): Promise<
  { id: string; params: JobSearchParams }[]
> => {
  return apiRequest(`${BASE_URL}/saved-searches`, "GET");
};

// 保存した検索条件の削除
export const deleteSavedSearch = (searchId: string): Promise<void> => {
  return apiRequest(`${BASE_URL}/saved-searches/${searchId}`, "DELETE");
};

// ジョブアラート設定
export const setJobAlert = (
  alertData: Omit<JobAlert, "id" | "created_at" | "updated_at">
): Promise<JobAlert> => {
  return apiRequest(`${BASE_URL}/alerts`, "POST", alertData);
};

// ジョブアラート一覧取得
export const getJobAlerts = (): Promise<JobAlert[]> => {
  return apiRequest(`${BASE_URL}/alerts`, "GET");
};

// ジョブアラート更新
export const updateJobAlert = (
  alertId: string,
  alertData: Partial<Omit<JobAlert, "id" | "created_at" | "updated_at">>
): Promise<JobAlert> => {
  return apiRequest(`${BASE_URL}/alerts/${alertId}`, "PUT", alertData);
};

// ジョブアラート削除
export const deleteJobAlert = (alertId: string): Promise<void> => {
  return apiRequest(`${BASE_URL}/alerts/${alertId}`, "DELETE");
};

// ジョブの報告（不適切なコンテンツなど）
export const reportJob = (
  jobId: string,
  reportData: ReportData
): Promise<void> => {
  return apiRequest(`${BASE_URL}/${jobId}/report`, "POST", reportData);
};
