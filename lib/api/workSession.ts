import { API_CONFIG, apiRequest } from "./config";

const WORK_SESSION_URL = API_CONFIG.baseURLs.workSession;

export const workSessionApi = {
  getWorkSessions: async () => {
    const response = await apiRequest(WORK_SESSION_URL, "GET");
    return response;
  },
};

export const createWorkSession = async (workSessionData: any) => {
  const response = await apiRequest(WORK_SESSION_URL, "POST", workSessionData);
  return response;
};

export const updateWorkSession = async (workSessionData: any) => {
  const response = await apiRequest(WORK_SESSION_URL, "PUT", workSessionData);
  return response;
};

export const deleteWorkSession = async (workSessionId: string) => {
  const response = await apiRequest(
    WORK_SESSION_URL,
    "DELETE",
    { id: workSessionId },
    "operator"
  );
  return response;
};

export const getWorkSessionById = async (workSessionId: string) => {
  const response = await apiRequest(
    `${WORK_SESSION_URL}/${workSessionId}`,
    "GET"
  );
  return response;
};

export const getWorkSessionsByUserId = async (userId: string) => {
  const response = await apiRequest(
    `${WORK_SESSION_URL}/user/${userId}`,
    "GET"
  );
  return response;
};

export const getWorkSessionsByCompanyId = async (companyId: string) => {
  const response = await apiRequest(
    `${WORK_SESSION_URL}/company/${companyId}`,
    "GET"
  );
  return response;
};

export const getWorkSessionByApplicationId = async (
  applicationId: string,
  userId: string
) => {
  const response = await apiRequest(
    `${WORK_SESSION_URL}/application/${applicationId}`,
    "GET",
    { application_id: applicationId, user_id: userId }
  );
  return response;
};
