import { apiRequest } from "./config";
import { API_CONFIG } from "./config";
import { getCompany } from "./company";
import { Restaurant as RestaurantType } from "@/types/restaurant";

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
  company_id: string;
  name: string;
  description?: string;
  address: string;
  phone?: string;
  cuisine_type: string;
  is_active: boolean;
  is_approved: boolean;
  email: string;
  created_at?: string;
  updated_at?: string;
  company?: Company;
}

export type CreateRestaurantData = {
  company_id: string;
  name: string;
  description?: string;
  address: string;
  phone?: string;
  cuisine_type: string;
  is_active: boolean;
};

type UpdateRestaurantData = Partial<Omit<Restaurant, "company">>;

// 全レストラン情報を取得（会社情報付き）
export const getRestaurants = async (): Promise<Restaurant[]> => {
  return apiRequest(`${BASE_URL}`, "GET");
};

// 特定のレストラン情報を取得（会社情報付き）
export const getRestaurant = async (id: string): Promise<Restaurant> => {
  const restaurant = await apiRequest<Restaurant>(`${BASE_URL}/${id}`, "GET");
  const company = await getCompany(restaurant.company_id);
  return { ...restaurant, company };
};

// レストランを新規作成
export const createRestaurant = async (
  restaurantData: CreateRestaurantData
): Promise<Restaurant> => {
  // companies_idがUUID形式であることを確認
  if (
    !restaurantData.company_id.match(
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
    )
  ) {
    throw new Error("Invalid UUID format for company_id");
  }

  return apiRequest(`${BASE_URL}`, "POST", {
    ...restaurantData,
    // 必須フィールドが空でないことを確認
    name: restaurantData.name.trim(),
    address: restaurantData.address.trim(),
    cuisine_type: restaurantData.cuisine_type.trim(),
  });
};

// レストラン情報を更新
export const updateRestaurant = async (
  id: string,
  restaurantData: UpdateRestaurantData
): Promise<Restaurant> => {
  return apiRequest(`${BASE_URL}/${id}`, "PATCH", restaurantData);
};

// レストランを削除
export const deleteRestaurant = async (id: string): Promise<void> => {
  return apiRequest(`${BASE_URL}/${id}`, "DELETE");
};

export const getRestaurantById = async (id: string): Promise<Restaurant> => {
  return apiRequest(`${BASE_URL}/${id}`, "GET");
};

export const getRestaurantByCompanyId = async (
  id: string
): Promise<Restaurant> => {
  return apiRequest(`${BASE_URL}/company/${id}`, "GET");
};

export const getRestaurantsByCompanyId = async (
  companyId: string
): Promise<Restaurant[]> => {
  return apiRequest(`${BASE_URL}/company/${companyId}`, "GET");
};
