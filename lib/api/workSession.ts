import { API_CONFIG, apiRequest } from "./config";
import { WorkSessionWithUser, WorkSessionWithJob } from "@/types";
import { getAuthToken } from "./config";
const WORK_SESSION_URL = API_CONFIG.baseURLs.workSession;

export const workSessionApi = {
  getWorkSessions: async () => {
    const response = await apiRequest(WORK_SESSION_URL, "GET");
    return response;
  },
  getWorkSessionsToDoByUserId: async (userId: string) => {
    const token = getAuthToken();
    if (!token) {
      throw new Error("認証トークンが見つかりません");
    }
    const response = await apiRequest(
      `${WORK_SESSION_URL}/user_todo/${userId}`,
      "GET",
      undefined,
      "chef"
    );
    return response;
  },
  getWorkSessionsToDoByJobId: async (
    jobId: number
  ): Promise<WorkSessionWithUser[]> => {
    return apiRequest(`${WORK_SESSION_URL}/restaurant_todo/${jobId}`, "GET");
  },

  updateWorkSessionToVerify: async (
    workSessionId: number,
    rating: number,
    feedback: string
  ) => {
    const response = await apiRequest(
      `${WORK_SESSION_URL}/${workSessionId}/verify`,
      "PATCH",
      {
        worksession_id: workSessionId,
        feedback: feedback,
        rating: rating,
      }
    );
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

export const updateWorkSessionToCheckIn = async (workSessionId: number) => {
  const response = await apiRequest(
    `${WORK_SESSION_URL}/${workSessionId}/start`,
    "PATCH",
    {
      worksession_id: workSessionId,
      check_in_time: Date.now(), // Unix timestamp in seconds
    }
  );
  return response;
};

export const updateWorkSessionToCheckOut = async (
  workSessionId: string,
  feedback: string,
  rating: number
) => {
  const response = await apiRequest(
    `${WORK_SESSION_URL}/${workSessionId}/finish`,
    "PATCH",
    {
      worksession_id: workSessionId,
      check_out_time: Date.now(), // Unix timestamp in seconds
      feedback: feedback,
      rating: rating,
    }
  );
  return response;
};
