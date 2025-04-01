import { API_CONFIG, apiRequest } from "./config";

interface LoginCredentials {
  email: string;
  password: string;
}

interface Operator {
  id: string;
  name: string;
  email: string;
  created_at: number;
  role: string;
  is_active: boolean;
}

interface LoginResponse {
  authToken: string;
  user: Operator;
}

interface OperatorResponse {
  user: Operator;
}

export const operatorApi = {
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    return apiRequest(
      `${API_CONFIG.baseURLs.operatorAuth}/login`,
      "POST",
      credentials,
      "operator"
    );
  },

  logout: async (): Promise<void> => {
    return apiRequest(
      `${API_CONFIG.baseURLs.operatorAuth}/logout`,
      "POST",
      undefined,
      "operator"
    );
  },

  getCurrentOperator: async (): Promise<Operator> => {
    return apiRequest<Operator>(
      `${API_CONFIG.baseURLs.operatorAuth}/me`,
      "GET",
      undefined,
      "operator"
    );
  },

  // 会社管理
  getCompanies: async (): Promise<any[]> => {
    return apiRequest(
      `${API_CONFIG.baseURLs.operator}/companies`,
      "GET",
      undefined,
      "operator"
    );
  },

  getCompany: async (id: string): Promise<any> => {
    return apiRequest(
      `${API_CONFIG.baseURLs.operator}/companies/${id}`,
      "GET",
      undefined,
      "operator"
    );
  },

  // シェフ管理
  getChefs: async (): Promise<any[]> => {
    return apiRequest(
      `${API_CONFIG.baseURLs.operator}/chefs`,
      "GET",
      undefined,
      "operator"
    );
  },

  getChef: async (id: string): Promise<any> => {
    return apiRequest(
      `${API_CONFIG.baseURLs.operator}/chefs/${id}`,
      "GET",
      undefined,
      "operator"
    );
  },

  // 求人管理
  getJobs: async (): Promise<any[]> => {
    return apiRequest(
      `${API_CONFIG.baseURLs.operator}/jobs`,
      "GET",
      undefined,
      "operator"
    );
  },

  getJob: async (id: string): Promise<any> => {
    return apiRequest(
      `${API_CONFIG.baseURLs.operator}/jobs/${id}`,
      "GET",
      undefined,
      "operator"
    );
  },

  // 請求管理
  getBilling: async (): Promise<any> => {
    return apiRequest(
      `${API_CONFIG.baseURLs.operator}/billing`,
      "GET",
      undefined,
      "operator"
    );
  },

  // スタッフ管理
  getStaff: async (): Promise<any[]> => {
    return apiRequest(
      `${API_CONFIG.baseURLs.operator}/staff`,
      "GET",
      undefined,
      "operator"
    );
  },

  getStaffMember: async (id: string): Promise<any> => {
    return apiRequest(
      `${API_CONFIG.baseURLs.operator}/staff/${id}`,
      "GET",
      undefined,
      "operator"
    );
  },
};
