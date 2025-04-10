// restaurant_review : シェフがレストランを評価する

import { apiRequest, API_CONFIG } from "./config";
import { ChefReview } from "@/types";

const baseUrl = API_CONFIG.baseURLs.chefReview;

export const chefReviewApi = {
  createChefReview: async (review: ChefReview) => {
    const response = await apiRequest(`${baseUrl}`, "POST", review);
    return response;
  },
  getChefReviews: async (params: {
    restaurant_id: string;
    page?: number;
    limit?: number;
  }) => {
    const response = await apiRequest(`${baseUrl}`, "GET", params);
    return response;
  },
  getChefReview: async (id: string) => {
    const response = await apiRequest(`${baseUrl}/${id}`, "GET");
    return response;
  },
  updateChefReview: async (id: string, review: ChefReview) => {
    const response = await apiRequest(`${baseUrl}/${id}`, "PUT", review);
    return response;
  },
  deleteChefReview: async (id: string) => {
    const response = await apiRequest(`${baseUrl}/${id}`, "DELETE");
    return response;
  },
  getChefReviewsByUserId: async (userId: string) => {
    const response = await apiRequest(`${baseUrl}/byChef/${userId}`, "GET");
    return response;
  },
  getChefReviewsByRestaurantId: async (restaurantId: string) => {
    const response = await apiRequest(
      `${baseUrl}/byRestaurant/${restaurantId}`,
      "GET"
    );
    return response;
  },
  getChefReviewsBySessionId: async (sessionId: number) => {
    const response = await apiRequest(
      `${baseUrl}/bySession/${sessionId}`,
      "GET"
    );
    return response;
  },
};
