import { API_CONFIG, apiRequest } from "./config";

// const API_URL = API_CONFIG.baseURLs.companyUserNotification;

export type CompanyUserNotification = {
  id: number;
  company_user_id: number;
  type: string;
  content: string;
  is_read: boolean;
  created_at: number;
  updated_at: number;
  job_id: number;
  restaurant_id: number;
};

// export type CompanyUserNotificationType =
//   | "new_job"
//   | "application_status"
//   | "new_message"
//   | "review"
//   | "operator"
//   | "payment";

// export type CreateCompanyUserNotificationParams = {
//   company_user_id: number;
//   notification_type: CompanyUserNotificationType;
//   message: string;
// };

// export type UpdateCompanyUserNotificationParams =
//   Partial<CreateCompanyUserNotificationParams>;

// export type GetCompanyUserNotificationResponse = CompanyUserNotification;
// export type GetCompanyUserNotificationsResponse = CompanyUserNotification[];
// export type CreateCompanyUserNotificationResponse = CompanyUserNotification;
// export type UpdateCompanyUserNotificationResponse = CompanyUserNotification;
// export type DeleteCompanyUserNotificationResponse = void;
// export type MarkCompanyUserNotificationAsReadResponse = void;
// export type MarkAllCompanyUserNotificationsAsReadResponse = void;
// export type MarkCompanyUserNotificationsAsReadResponse = void;
// export const createCompanyUserNotification = async (
//   params: CreateCompanyUserNotificationParams
// ) => {
//   const response = await apiRequest<CreateCompanyUserNotificationResponse>(
//     `${API_URL}`,
//     "POST",
//     params
//   );
//   return response;
// };

// export const getCompanyUserNotification = async (id: string) => {
//   const response = await apiRequest<GetCompanyUserNotificationResponse>(
//     `${API_URL}/${id}`,
//     "GET"
//   );
//   return response;
// };

// export const getCompanyUserNotifications = async () => {
//   const response = await apiRequest<GetCompanyUserNotificationsResponse>(
//     `${API_URL}`,
//     "GET"
//   );
//   return response;
// };

// export const updateCompanyUserNotification = async (
//   id: number,
//   params: UpdateCompanyUserNotificationParams
// ) => {
//   const response = await apiRequest<UpdateCompanyUserNotificationResponse>(
//     `${API_URL}/${id}`,
//     "PUT",
//     params
//   );
//   return response;
// };

// export const deleteCompanyUserNotification = async (id: number) => {
//   const response = await apiRequest<DeleteCompanyUserNotificationResponse>(
//     `${API_URL}/${id}`,
//     "DELETE"
//   );
//   return response;
// };

// export const markCompanyUserNotificationAsRead = async (id: string) => {
//   const response = await apiRequest<MarkCompanyUserNotificationAsReadResponse>(
//     `${API_URL}/${id}/mark-read`,
//     "PATCH"
//   );
//   return response;
// };

// export const markCompanyUserNotificationsAsRead = async (ids: string[]) => {
//   const response = await apiRequest<MarkCompanyUserNotificationsAsReadResponse>(
//     `${API_URL}/mark-read/all`,
//     "PATCH",
//     ids
//   );
//   return response;
// };

// export const markAllCompanyUserNotificationsAsRead = async (user_id: string) => {
//   const response =
//     await apiRequest<MarkAllCompanyUserNotificationsAsReadResponse>(
//       `${API_URL}/mark-read/all`,
//       "PATCH",
//       { user_id }
//     );
//   return response;
// };

// export const getCompanyUserNotificationsByCompanyUserId = async (
//   companyUserId: string
// ) => {
//   const response = await apiRequest<GetCompanyUserNotificationsResponse>(
//     `${API_URL}/byUser/${companyUserId}`,
//     "GET"
//   );
//   return response;
// };
