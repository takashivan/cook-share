import { apiRequest } from "./config";
import { API_CONFIG } from "./config";
import { RESTAURANT_STATUS } from "../const/restaurant";

const BASE_URL = API_CONFIG.baseURLs.restaurant;

export interface Company {
  id: string;
  name: string;
  description?: string;
  address: string;
  website?: string;
  logo_url?: string;
  created_by: string;
  created_at?: string;
  updated_at?: string;
}

export interface Restaurant {
  id: string;
  companies_id: string;
  name: string;
  description?: string;
  address: string;
  contact_info?: string;
  cuisine_type: string;
  business_hours?: string;
  station?: string;
  access?: string;
  is_active: boolean;
  is_approved: boolean;
  email: string;
  created_at?: string;
  updated_at?: string;
  company?: Company;
  profile_image?: string;
  restaurant_cuisine_id?: number[] | number;
  status: typeof RESTAURANT_STATUS[number]['value'];
}

// export type CreateRestaurantData = {
//   companies_id: string;
//   name: string;
//   description?: string;
//   business_hours?: string;
//   station?: string;
//   access?: string;
//   address: string;
//   contact_info?: string;
//   cuisine_type: string;
//   is_active: boolean;
// };

// type UpdateRestaurantData = Partial<Omit<Restaurant, "company">>;

// 全レストラン情報を取得（会社情報付き）
export const getRestaurants = async (): Promise<Restaurant[]> => {
  return apiRequest(`${BASE_URL}`, "GET");
};

// 特定のレストラン情報を取得（会社情報付き）
// export const getRestaurant = async (id: string): Promise<Restaurant> => {
//   const restaurant = await apiRequest<Restaurant>(`${BASE_URL}/${id}`, "GET");
//   const company = await getCompany(restaurant.companies_id);
//   return { ...restaurant, company };
// };

// レストランを新規作成
// export const createRestaurant = async (
//   formData: FormData
// ): Promise<Restaurant> => {
//   const companies_id = formData.get("companies_id") as string;
//   // companies_idがUUID形式であることを確認
//   if (
//     !companies_id.match(
//       /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
//     )
//   ) {
//     throw new Error("Invalid UUID format for companies_id");
//   }

//   return apiRequest(`${BASE_URL}`, "POST", formData, "company");
// };

// export const restaurantStaffInvite = (
//   email: string,
//   restaurant_id: number,
//   companies_id: string,
//   can_edit: boolean,
//   can_manage_jobs: boolean,
//   restaurant_name: string
// ) => {
//   return apiRequest(`${BASE_URL}/staff/invite`, "POST", {
//     email,
//     restaurant_id,
//     companies_id,
//     can_edit,
//     can_manage_jobs,
//     restaurant_name,
//   });
// };
// export const deleteRestaurantStaff = async (
//   restaurant_id: number,
//   user_id: string
// ): Promise<void> => {
//   return apiRequest(
//     `${BASE_URL}/staff/delete`,
//     "DELETE",
//     {
//       restaurant_id,
//       user_id,
//     }
//   );
// };

// レストラン情報を更新
// export const updateRestaurant = async (
//   id: string,
//   restaurantData: UpdateRestaurantData | FormData
// ): Promise<Restaurant> => {
//   return apiRequest(`${BASE_URL}/${id}`, "PATCH", restaurantData, "company");
// };

// // レストランを削除
// export const deleteRestaurant = async (id: string): Promise<void> => {
//   return apiRequest(`${BASE_URL}/${id}`, "DELETE");
// };

// export const getRestaurantById = async (id: string): Promise<Restaurant> => {
//   return apiRequest(`${BASE_URL}/${id}`, "GET");
// };

// export const getRestaurantByCompanyId = async (
//   id: string
// ): Promise<Restaurant> => {
//   return apiRequest(`${BASE_URL}/company/${id}`, "GET");
// };

export const getRestaurantsByCompanyId = async (
  companyId: string
): Promise<Restaurant[]> => {
  return apiRequest(`${BASE_URL}/company/${companyId}`, "GET");
};

// export const getRestaurantStaff = async (restaurantId: string) => {
//   const response = await apiRequest(
//     `/restaurants/${restaurantId}/staff`,
//     "GET"
//   );
//   return response;
// };

// export const getRestaurantNotifications = async (
//   restaurantId: number
// ): Promise<CompanyUserNotification[]> => {
//   const response = await fetch(
//     `/api/restaurants/${restaurantId}/notifications`
//   );
//   if (!response.ok) {
//     throw new Error("Failed to fetch restaurant notifications");
//   }
//   return response.json();
// };


