import { apiRequest } from "./config";
import { API_CONFIG } from "./config";
import { getCompany } from "./company";

const BASE_URL = API_CONFIG.baseURLs.user;

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
  phone?: string;
  cuisine_type: string;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
  company?: Company;
}

type CreateRestaurantData = Omit<
  Restaurant,
  "id" | "created_at" | "updated_at" | "company"
>;
type UpdateRestaurantData = Partial<Omit<Restaurant, "company">>;

// 全レストラン情報を取得（会社情報付き）
export const getRestaurants = async (): Promise<Restaurant[]> => {
  return apiRequest(`${BASE_URL}/restaurants`, "GET");
};

// 特定のレストラン情報を取得（会社情報付き）
export const getRestaurant = async (id: string): Promise<Restaurant> => {
  const restaurant = await apiRequest<Restaurant>(
    `${BASE_URL}/restaurants/${id}`,
    "GET"
  );
  const company = await getCompany(restaurant.companies_id);
  return { ...restaurant, company };
};

// レストランを新規作成
export const createRestaurant = async (
  restaurantData: CreateRestaurantData
): Promise<Restaurant> => {
  return apiRequest(`${BASE_URL}/restaurants`, "POST", restaurantData);
};

// レストラン情報を更新
export const updateRestaurant = async (
  id: string,
  restaurantData: UpdateRestaurantData
): Promise<Restaurant> => {
  return apiRequest(`${BASE_URL}/restaurants/${id}`, "PATCH", restaurantData);
};

// レストランを削除
export const deleteRestaurant = async (id: string): Promise<void> => {
  return apiRequest(`${BASE_URL}/restaurants/${id}`, "DELETE");
};

export const getRestaurantById = async (id: string): Promise<Restaurant> => {
  return apiRequest(`${BASE_URL}/restaurants/${id}`, "GET");
};
