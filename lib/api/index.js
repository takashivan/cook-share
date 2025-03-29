// lib/api/index.js - メインAPIエクスポート

import { setAuthToken, clearAuthToken, getAuthToken } from "./config";
import * as chefUserAPI from "./chefUser";
import * as companyUserAPI from "./companyUser";
import * as jobAPI from "./job";

// ユーザー認証状態のチェック
export const isAuthenticated = () => {
  return !!getAuthToken();
};

// ユーザータイプのチェック（シェフまたは会社）
export const getUserType = () => {
  if (localStorage.getItem("chef_auth_token")) {
    return "chefUser";
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
  chefUser: chefUserAPI,
  companyUser: companyUserAPI,
  job: jobAPI,
};

// デフォルトエクスポート
export default API;

// 名前付きエクスポート（各APIを個別にインポートできるように）
export { chefUserAPI, companyUserAPI, jobAPI };
