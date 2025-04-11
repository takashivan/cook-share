import { API_CONFIG, apiRequest } from "./config";

const API_URL = API_CONFIG.baseURLs.chefNotification;

export type ChefNotification = {
  id: number;
  chef_id: number;
  notification_type: string;
  message: string;
  read: boolean;
  created_at: string;
  updated_at: string;
};

export type ChefNotificationType =
  | "new_job"
  | "application_status"
  | "new_message"
  | "review"
  | "operator"
  | "payment";

export type CreateChefNotificationParams = {
  chef_id: number;
  notification_type: ChefNotificationType;
  message: string;
};

export type UpdateChefNotificationParams =
  Partial<CreateChefNotificationParams>;

export type GetChefNotificationResponse = ChefNotification;
export type GetChefNotificationsResponse = ChefNotification[];
export type CreateChefNotificationResponse = ChefNotification;
export type UpdateChefNotificationResponse = ChefNotification;
export type DeleteChefNotificationResponse = void;
export type MarkChefNotificationAsReadResponse = void;
export type MarkAllChefNotificationsAsReadResponse = void;

export const createChefNotification = async (
  params: CreateChefNotificationParams
) => {
  const response = await apiRequest<CreateChefNotificationResponse>(
    `${API_URL}/create`,
    "POST",
    params
  );
  return response;
};

export const getChefNotification = async (id: number) => {
  const response = await apiRequest<GetChefNotificationResponse>(
    `${API_URL}/${id}`,
    "GET"
  );
  return response;
};

export const getChefNotifications = async () => {
  const response = await apiRequest<GetChefNotificationsResponse>(
    `${API_URL}/list`,
    "GET"
  );
  return response;
};

export const updateChefNotification = async (
  id: number,
  params: UpdateChefNotificationParams
) => {
  const response = await apiRequest<UpdateChefNotificationResponse>(
    `${API_URL}/${id}`,
    "PUT",
    params
  );
  return response;
};

export const deleteChefNotification = async (id: number) => {
  const response = await apiRequest<DeleteChefNotificationResponse>(
    `${API_URL}/${id}`,
    "DELETE"
  );
  return response;
};

export const markChefNotificationAsRead = async (id: number) => {
  const response = await apiRequest<MarkChefNotificationAsReadResponse>(
    `${API_URL}/${id}/read`,
    "POST"
  );
  return response;
};

export const markAllChefNotificationsAsRead = async () => {
  const response = await apiRequest<MarkAllChefNotificationsAsReadResponse>(
    `${API_URL}/read_all`,
    "POST"
  );
  return response;
};

export const getChefNotificationsByChefId = async (chefId: number) => {
  const response = await apiRequest<GetChefNotificationsResponse>(
    `${API_URL}/list/${chefId}`,
    "GET"
  );
  return response;
};
