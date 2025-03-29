// lib/api/job.js - ジョブ関連 API

import { API_CONFIG, apiRequest } from "./config";

const BASE_URL = API_CONFIG.baseURLs.job;

// ジョブ一覧取得
export const getAllJobs = (params = {}) => {
  // パラメータがある場合のみクエリ文字列を追加
  if (Object.keys(params).length > 0) {
    const queryParams = new URLSearchParams(params).toString();
    return apiRequest(`${BASE_URL}?${queryParams}`, "GET");
  }
  // パラメータがない場合はシンプルなGETリクエスト
  return apiRequest(`${BASE_URL}`, "GET");
};

// ジョブ検索・フィルタリング
export const searchJobs = (params = {}) => {
  const queryParams = new URLSearchParams(params).toString();
  const url = queryParams
    ? `${BASE_URL}/search?${queryParams}`
    : `${BASE_URL}/search`;
  return apiRequest(url, "GET");
};

// ジョブの詳細情報取得
export const getJobDetails = (jobId) => {
  return apiRequest(`${BASE_URL}/${jobId}`, "GET");
};

// ジョブカテゴリー取得
export const getJobCategories = () => {
  return apiRequest(`${BASE_URL}/categories`, "GET");
};

// ジョブタイプ取得（正社員、契約社員、パートタイムなど）
export const getJobTypes = () => {
  return apiRequest(`${BASE_URL}/types`, "GET");
};

// スキル一覧取得（ジョブに関連するスキル）
export const getJobSkills = () => {
  return apiRequest(`${BASE_URL}/skills`, "GET");
};

// ロケーション検索（都市や地域）
export const searchLocations = (query) => {
  return apiRequest(
    `${BASE_URL}/locations?q=${encodeURIComponent(query)}`,
    "GET"
  );
};

// 給与範囲オプション取得
export const getSalaryRanges = () => {
  return apiRequest(`${BASE_URL}/salary-ranges`, "GET");
};

// おすすめジョブ取得
export const getRecommendedJobs = (limit = 10) => {
  return apiRequest(`${BASE_URL}/recommended?limit=${limit}`, "GET");
};

// 最近追加されたジョブ
export const getRecentJobs = (limit = 10) => {
  return apiRequest(`${BASE_URL}/recent?limit=${limit}`, "GET");
};

// 人気のジョブ
export const getPopularJobs = (limit = 10) => {
  return apiRequest(`${BASE_URL}/popular?limit=${limit}`, "GET");
};

// ジョブの閲覧履歴を保存
export const recordJobView = (jobId) => {
  return apiRequest(`${BASE_URL}/${jobId}/view`, "POST");
};

// ジョブをブックマーク/保存
export const bookmarkJob = (jobId) => {
  return apiRequest(`${BASE_URL}/${jobId}/bookmark`, "POST");
};

// ジョブのブックマークを解除
export const removeBookmark = (jobId) => {
  return apiRequest(`${BASE_URL}/${jobId}/bookmark`, "DELETE");
};

// 保存したジョブの一覧を取得
export const getSavedJobs = (params = {}) => {
  const queryParams = new URLSearchParams(params).toString();
  const url = queryParams
    ? `${BASE_URL}/bookmarked?${queryParams}`
    : `${BASE_URL}/bookmarked`;
  return apiRequest(url, "GET");
};

// ジョブを共有（メールやSNSなど）
export const shareJob = (jobId, shareData) => {
  return apiRequest(`${BASE_URL}/${jobId}/share`, "POST", shareData);
};

// ジョブに関する質問を送信
export const sendJobQuestion = (jobId, questionData) => {
  return apiRequest(`${BASE_URL}/${jobId}/question`, "POST", questionData);
};

// ジョブの応募要件を確認
export const checkJobRequirements = (jobId, profileData) => {
  return apiRequest(
    `${BASE_URL}/${jobId}/check-requirements`,
    "POST",
    profileData
  );
};

// ジョブの類似案件を取得
export const getSimilarJobs = (jobId, limit = 5) => {
  return apiRequest(`${BASE_URL}/${jobId}/similar?limit=${limit}`, "GET");
};

// ジョブ検索の保存
export const saveJobSearch = (searchParams) => {
  return apiRequest(`${BASE_URL}/saved-searches`, "POST", searchParams);
};

// 保存した検索条件の取得
export const getSavedSearches = () => {
  return apiRequest(`${BASE_URL}/saved-searches`, "GET");
};

// 保存した検索条件の削除
export const deleteSavedSearch = (searchId) => {
  return apiRequest(`${BASE_URL}/saved-searches/${searchId}`, "DELETE");
};

// ジョブアラート設定
export const setJobAlert = (alertData) => {
  return apiRequest(`${BASE_URL}/alerts`, "POST", alertData);
};

// ジョブアラート一覧取得
export const getJobAlerts = () => {
  return apiRequest(`${BASE_URL}/alerts`, "GET");
};

// ジョブアラート更新
export const updateJobAlert = (alertId, alertData) => {
  return apiRequest(`${BASE_URL}/alerts/${alertId}`, "PUT", alertData);
};

// ジョブアラート削除
export const deleteJobAlert = (alertId) => {
  return apiRequest(`${BASE_URL}/alerts/${alertId}`, "DELETE");
};

// ジョブの報告（不適切なコンテンツなど）
export const reportJob = (jobId, reportData) => {
  return apiRequest(`${BASE_URL}/${jobId}/report`, "POST", reportData);
};
