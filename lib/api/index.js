// lib/api/index.js - メインAPIエクスポート

import { setAuthToken, clearAuthToken, getAuthToken } from "./config";
import * as userAPI from "./user";
import * as companyUserAPI from "./companyUser";
import * as jobAPI from "./job";

// ユーザー認証状態のチェック
export const isAuthenticated = () => {
  return !!getAuthToken();
};

// ユーザータイプのチェック（シェフまたは会社）
export const getUserType = () => {
  if (localStorage.getItem("user_auth_token")) {
    return "user";
  } else if (localStorage.getItem("company_auth_token")) {
    return "companyUser";
  }
  return null;
};

// API全体をオブジェクトとしてエクスポート
const API = {
  // 認証ヘルパー
  auth: {
    setToken: setAuthToken,
    clearToken: clearAuthToken,
    getToken: getAuthToken,
    isAuthenticated,
    getUserType,
  },

  // 各APIカテゴリ
  user: userAPI,
  companyUser: companyUserAPI,
  job: jobAPI,
};

// デフォルトエクスポート
export default API;

// 名前付きエクスポート（各APIを個別にインポートできるように）
export { userAPI, companyUserAPI, jobAPI };
