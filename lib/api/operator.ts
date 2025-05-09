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
      `${API_CONFIG.baseURLs.user}`,
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

  // シェフのBAN
  banChef: async (id: string, reason: string): Promise<any> => {
    return apiRequest(
      `${API_CONFIG.baseURLs.operator}/user/ban`,
      "PATCH",
      {
        user_id: id,
        reason: reason,
      },
      "operator"
    );
  },

  // シェフの承認
  approveChef: async (id: string): Promise<any> => {
    return apiRequest(
      `${API_CONFIG.baseURLs.operator}/user/approve`,
      "PATCH",
      {
        user_id: id,
      },
      "operator"
    );
  },

  //求人のBAN
  banJob: async (id: number, reason: string): Promise<any> => {
    return apiRequest(
      `${API_CONFIG.baseURLs.operator}/job/ban`,
      "PATCH",
      { job_id: id, reason: reason },
      "operator"
    );
  },

  // 求人の承認
  approveJob: async (id: number, reason: string): Promise<any> => {
    return apiRequest(
      `${API_CONFIG.baseURLs.operator}/job/approve`,
      "PATCH",
      { job_id: id, reason: reason },
      "operator"
    );
  },

  //レストランのBAN
  banRestaurant: async (id: string, reason: string): Promise<any> => {
    return apiRequest(
      `${API_CONFIG.baseURLs.operator}/restaurant/ban`,
      "PATCH",
      { restaurant_id: id, reason: reason },
      "operator"
    );
  },

  // レストランの承認
  approveRestaurant: async (id: string, reason: string): Promise<any> => {
    return apiRequest(
      `${API_CONFIG.baseURLs.operator}/restaurant/approve`,
      "PATCH",
      { restaurant_id: id, reason: reason },
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

  getDashboardQuery: async (): Promise<any> => {
    return apiRequest(
      `${API_CONFIG.baseURLs.operatorGetUser}/dashboard-query`,
      "GET",
      undefined,
      "operator"
    );
  },

  getChefsToBeReviewed: async (): Promise<any> => {
    return apiRequest(
      `${API_CONFIG.baseURLs.operatorGetUser}/to-be-reviewed`,
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

  getAlert: async (): Promise<any[]> => {
    return apiRequest(
      `${API_CONFIG.baseURLs.alert}`,
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
