import { API_CONFIG, apiRequest } from "./config";

const MESSAGE_URL = API_CONFIG.baseURLs.message;

export type CreateMessageParams = {
  content: string;
  worksession_id: number;
  application_id: string;
  sender_type: "restaurant" | "chef";
};

export const messageApi = {
  getMessages: async () => {
    const response = await apiRequest(MESSAGE_URL, "GET");
    return response;
  },

  createMessage: async (params: CreateMessageParams) => {
    const response = await apiRequest(MESSAGE_URL, "POST", params);
    return response;
  },

  getMessagesByWorkSessionId: async (workSessionId: number) => {
    const response = await apiRequest(
      `${MESSAGE_URL}/worksession/${workSessionId}`,
      "GET"
    );
    return response;
  },
};

export const updateMessage = async (messageData: any) => {
  const response = await apiRequest(MESSAGE_URL, "PUT", messageData);
  return response;
};

export const deleteMessage = async (messageId: string) => {
  const response = await apiRequest(MESSAGE_URL, "DELETE", { id: messageId });
  return response;
};

export const getMessageById = async (messageId: string) => {
  const response = await apiRequest(`${MESSAGE_URL}/${messageId}`, "GET");
  return response;
};

export const getMessagesByUserId = async (userId: string) => {
  const response = await apiRequest(`${MESSAGE_URL}/user/${userId}`, "GET");
  return response;
};
