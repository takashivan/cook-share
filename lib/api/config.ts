// lib/api/config.js - API 設定

// 基本設定
export const API_CONFIG = {
  // Xanoの各APIカテゴリのベースURL
  baseURLs: {
    user: "https://xcti-onox-8bdw.n7e.xano.io/api:Mv5jTolf/user",
    auth: "https://xcti-onox-8bdw.n7e.xano.io/api:xaJlLYDj/auth", // シェフユーザー用
    companyAuth: "https://xcti-onox-8bdw.n7e.xano.io/api:3LZoUG6X/auth", // 会社ユーザー用
    companyUser: "https://xcti-onox-8bdw.n7e.xano.io/api:3LZoUG6X/companyuser",
    company: "https://xcti-onox-8bdw.n7e.xano.io/api:3LZoUG6X/companies",
    workSession: "https://xcti-onox-8bdw.n7e.xano.io/api:Mv5jTolf/worksession",
    job: "https://xcti-onox-8bdw.n7e.xano.io/api:Mv5jTolf/job",
    application: "https://xcti-onox-8bdw.n7e.xano.io/api:MJ8mZ3fN/application",
    restaurant: "https://xcti-onox-8bdw.n7e.xano.io/api:Mv5jTolf/restaurant",
    restaurantReview:
      "https://xcti-onox-8bdw.n7e.xano.io/api:Mv5jTolf/restaurant_review",
    chefReview: "https://xcti-onox-8bdw.n7e.xano.io/api:Mv5jTolf/chef_review",
    message: "https://xcti-onox-8bdw.n7e.xano.io/api:Mv5jTolf/message",
    operator: "https://xcti-onox-8bdw.n7e.xano.io/api:grw3Vlqa/operator",
    cuisines:
      "https://xcti-onox-8bdw.n7e.xano.io/api:grw3Vlqa/restaurant_cuisine",
    skill: "https://xcti-onox-8bdw.n7e.xano.io/api:grw3Vlqa/chef_skill",
    operatorAuth: "https://xcti-onox-8bdw.n7e.xano.io/api:grw3Vlqa/auth",
  },
  // 共通ヘッダー
  headers: {
    "Content-Type": "application/json",
  } as Record<string, string>,
};

const STORAGE_KEYS = {
  chef: {
    token: "auth_token",
    user: "current_user",
  },
  company: {
    token: "company_auth_token",
    user: "company_current_user",
  },
  operator: {
    token: "operator_token",
    user: "operator_current_user",
  },
};

// localStorageが利用可能かどうかをチェック
const isLocalStorageAvailable = () => {
  if (typeof window === "undefined") return false;
  try {
    localStorage.setItem("test", "test");
    localStorage.removeItem("test");
    return true;
  } catch (e) {
    return false;
  }
};

// 認証トークン管理
export const getAuthToken = (
  userType: "chef" | "company" | "operator" = "chef"
): string | null => {
  if (typeof window === "undefined") return null;
  try {
    const token = localStorage.getItem(STORAGE_KEYS[userType].token);
    return token;
  } catch (error) {
    console.error("Error getting auth token:", error);
    return null;
  }
};

// 認証トークンを設定する関数
export const setAuthToken = (
  token: string,
  userType: "chef" | "company" | "operator" = "chef"
) => {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEYS[userType].token, token);
  } catch (error) {
    console.error("Error setting auth token:", error);
  }
};

// 認証トークンをクリアする関数
export const clearAuthToken = (
  userType: "chef" | "company" | "operator" = "chef"
) => {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(STORAGE_KEYS[userType].token);
  } catch (error) {
    console.error("Error clearing auth token:", error);
  }
};

// リクエストヘルパー関数
export async function apiRequest<T>(
  url: string,
  method: string = "GET",
  data?: any,
  userType: "chef" | "company" | "operator" = "chef"
): Promise<T> {
  const token = getAuthToken(userType);
  const headers: Record<string, string> = {
    ...(!(data instanceof FormData) && {
      "Content-Type": "application/json",
    }),
    Accept: "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const requestOptions: RequestInit = {
    method,
    headers,
    body: data instanceof FormData ? data : JSON.stringify(data),
  };

  console.log("API Request:", {
    url,
    method,
    headers,
    data:
      data instanceof FormData
        ? "FormData"
        : data
        ? JSON.stringify(data)
        : "No data",
  });

  try {
    const response = await fetch(url, requestOptions);
    console.log("API Response:", response);

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      console.error("API Error Response:", errorData);
      throw new Error(
        `API request failed: ${response.status} ${
          errorData?.message || response.statusText
        }`
      );
    }

    const responseData = await response.json();
    console.log("API Success Response:", responseData);
    return responseData;
  } catch (error) {
    console.error("API Request Error:", error);
    throw error;
  }
}

// インターセプターの設定
export const setupInterceptors = () => {
  // グローバルエラーハンドリング
  window.addEventListener("unhandledrejection", (event) => {
    const error = event.reason;

    // APIエラーを特定
    if (error && error.status) {
      // 認証エラー (401) の場合、ログアウト処理など
      if (error.status === 401) {
        clearAuthToken();
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

// 現在のユーザー情報を取得
export const getCurrentUser = (userType: "chef" | "company" = "chef") => {
  if (typeof window === "undefined") return null;
  try {
    const userData = localStorage.getItem(STORAGE_KEYS[userType].user);
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error("Error getting current user:", error);
    return null;
  }
};

// ユーザー情報を保存
export const setCurrentUser = (
  userData: any,
  userType: "chef" | "company" = "chef"
) => {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEYS[userType].user, JSON.stringify(userData));
  } catch (error) {
    console.error("Error setting current user:", error);
  }
};

export const clearCurrentUser = (userType: "chef" | "company" = "chef") => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(STORAGE_KEYS[userType].user);
  }
};
