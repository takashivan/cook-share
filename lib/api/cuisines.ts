import { API_CONFIG, apiRequest } from "./config";

export interface Cuisine {
  id: string;
  category: string;
  is_primary: boolean;
  created_at: number;
}

// export interface CuisineResponse {
//   cuisines: Cuisine[];
// }

// const BASE_URL = API_CONFIG.baseURLs.cuisines;

export const getCuisines = async (): Promise<Cuisine[]> => {
  const response = await fetch(`${API_CONFIG.baseURLs.cuisines}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch jobs");
  }

  return response.json();
};

// export const getCuisine = async (id: string): Promise<Cuisine> => {
//   const response = await fetch(`${BASE_URL}/${id}`, {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });

//   if (!response.ok) {
//     throw new Error("Failed to fetch job");
//   }

//   return response.json();
// };

// export const createCuisine = async (params: Cuisine): Promise<Cuisine> => {
//   const response = await fetch(`${BASE_URL}`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(params),
//   });

//   if (!response.ok) {
//     throw new Error("Failed to create job");
//   }

//   return response.json();
// };

// export const updateCuisine = async (cuisine: Cuisine): Promise<Cuisine> => {
//   const response = await fetch(`${BASE_URL}/${cuisine.id}`, {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(cuisine),
//   });

//   if (!response.ok) {
//     throw new Error("Failed to update job");
//   }

//   return response.json();
// };

// export const deleteCuisine = async (cuisine: Cuisine): Promise<Cuisine> => {
//   const response = await fetch(`${BASE_URL}/${cuisine.id}`, {
//     method: "DELETE",
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });

//   if (!response.ok) {
//     throw new Error("Failed to delete job");
//   }

//   return response.json();
// };
