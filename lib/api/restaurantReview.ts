// restaurant_review : レストランがシェフを評価する

// import { apiRequest, API_CONFIG } from "./config";
// import { RestaurantReview } from "@/types";

// // レストランがシェフを評価する
// const baseUrl = API_CONFIG.baseURLs.restaurantReview;

// export const restaurantReviewApi = {
//   createRestaurantReview: async (review: RestaurantReview) => {
//     const response = await apiRequest(`${baseUrl}`, "POST", review);
//     return response;
//   },
//   getRestaurantReviews: async (params: {
//     restaurant_id: string;
//     page?: number;
//     limit?: number;
//   }) => {
//     const response = await apiRequest(`${baseUrl}`, "GET", params);
//     return response;
//   },
//   getRestaurantReview: async (id: string) => {
//     const response = await apiRequest(`${baseUrl}/${id}`, "GET");
//     return response;
//   },
//   updateRestaurantReview: async (id: string, review: RestaurantReview) => {
//     const response = await apiRequest(`${baseUrl}/${id}`, "PUT", review);
//     return response;
//   },
//   deleteRestaurantReview: async (id: string) => {
//     const response = await apiRequest(`${baseUrl}/${id}`, "DELETE");
//     return response;
//   },
//   getRestaurantReviewsByUserId: async (userId: string) => {
//     const response = await apiRequest(`${baseUrl}/byChef/${userId}`, "GET");
//     return response;
//   },
//   getRestaurantReviewsByRestaurantId: async (restaurantId: string) => {
//     const response = await apiRequest(
//       `${baseUrl}/byRestaurant/${restaurantId}`,
//       "GET"
//     );
//     return response;
//   },
//   getRestaurantReviewsBySessionId: async (sessionId: string) => {
//     const response = await apiRequest(
//       `${baseUrl}/bySession/${sessionId}`,
//       "GET"
//     );
//     return response;
//   },
// };
