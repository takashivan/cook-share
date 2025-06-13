import { API_CONFIG, apiRequest } from "./config";
import { getAuthToken } from "./config";

export const contactApi = {
  // getContact: async () => {
  //   const token = getAuthToken();
  //   const response = await apiRequest(API_CONFIG.baseURLs.contact, "GET", null);
  //   return response;
  // },
  createContact: async (data: any) => {
    const token = getAuthToken();
    const response = await apiRequest(
      API_CONFIG.baseURLs.contact,
      "POST",
      data
    );
    return response;
  },
};
