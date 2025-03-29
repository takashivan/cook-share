// lib/api/config.js - API 設定

// 基本設定
export const API_CONFIG = {
  // Xanoの各APIカテゴリのベースURL
  baseURLs: {
    chefUser: "https://x8ki-letl-twmt.n7.xano.io/api:Mv5jTolf/chef",
    companyUser: "https://x8ki-letl-twmt.n7.xano.io/api:Mv5jTolf/company",
    job: "https://x8ki-letl-twmt.n7.xano.io/api:Mv5jTolf/job",
  },
  // 共通ヘッダー
  headers: {
    "Content-Type": "application/json",
    // 認証トークンなどは認証後に動的に追加
  },
};

// トークンストレージキー
export const TOKEN_STORAGE_KEYS = {
  chefUser: "chef_auth_token",
  companyUser: "company_auth_token",
};

// 現在のユーザータイプ（シェフまたは会社）
export let currentUserType = null;

// 認証トークン管理
export const getAuthToken = () => {
  if (!currentUserType) return null;
  return localStorage.getItem(TOKEN_STORAGE_KEYS[currentUserType]);
};

// 認証トークンを設定する関数
export const setAuthToken = (userType, token) => {
  if (!TOKEN_STORAGE_KEYS[userType]) {
    throw new Error(`Unknown user type: ${userType}`);
  }

  currentUserType = userType;
  localStorage.setItem(TOKEN_STORAGE_KEYS[userType], token);
};

// 認証トークンをクリアする関数
export const clearAuthToken = (userType = null) => {
  // 特定のユーザータイプを指定した場合
  if (userType) {
    localStorage.removeItem(TOKEN_STORAGE_KEYS[userType]);
    if (currentUserType === userType) {
      currentUserType = null;
    }
    return;
  }

  // すべてクリアする場合
  Object.values(TOKEN_STORAGE_KEYS).forEach((key) => {
    localStorage.removeItem(key);
  });
  currentUserType = null;
};

// リクエストヘルパー関数
export const apiRequest = async (url, method, data = null) => {
  const headers = { ...API_CONFIG.headers };

  // 認証トークンがあれば追加
  const authToken = getAuthToken();
  if (authToken) {
    headers["Authorization"] = `Bearer ${authToken}`;
  }

  const options = {
    method,
    headers,
    credentials: "include", // クロスサイトCookieを含める場合
  };

  if (data && (method === "POST" || method === "PUT" || method === "PATCH")) {
    options.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(url, options);

    // レスポンスのステータスコードをチェック
    if (!response.ok) {
      // エラーレスポンスをJSONとして解析
      const errorData = await response.json().catch(() => null);
      throw {
        status: response.status,
        message: response.statusText,
        data: errorData,
      };
    }

    // 204 No Content の場合は空のオブジェクトを返す
    if (response.status === 204) {
      return {};
    }

    // 成功レスポンスをJSONとして解析
    return await response.json();
  } catch (error) {
    console.error("API request failed:", error);
    throw error;
  }
};

// インターセプターの設定
export const setupInterceptors = () => {
  // グローバルエラーハンドリング
  window.addEventListener("unhandledrejection", (event) => {
    const error = event.reason;

    // APIエラーを特定
    if (error && error.status) {
      // 認証エラー (401) の場合、ログアウト処理など
      if (error.status === 401) {
        clearAuthToken(currentUserType);
        // リダイレクトやエラー表示など
        console.log("Authentication error, redirecting to login...");
        // 認証エラー処理をここに追加（例：ログインページへリダイレクト）
      }
    }
  });
};

// 初期化時にインターセプターをセットアップ
if (typeof window !== "undefined") {
  setupInterceptors();
}
