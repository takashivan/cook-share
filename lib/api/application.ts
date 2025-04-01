import { API_CONFIG, apiRequest } from "./config";
import { Application } from "../../types";

const API_URL = API_CONFIG.baseURLs.application;
export type CreateApplicationParams = {
  job_id: number;
  status?: string;
  notes?: string;
  user_id: string;
  application_date: string;
};

export type UpdateApplicationParams = Partial<CreateApplicationParams>;

export type GetApplicationResponse = Application;
export type GetApplicationsResponse = Application[];
export type CreateApplicationResponse = Application;
export type UpdateApplicationResponse = Application;
export type DeleteApplicationResponse = void;

export const applicationApi = {
  getApplications: async (): Promise<GetApplicationsResponse> => {
    const response = await fetch(`${API_URL}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch applications");
    }

    return response.json();
  },

  getApplication: async (id: string): Promise<GetApplicationResponse> => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch application");
    }

    return response.json();
  },

  getApplicationsByJob: async (
    jobId: string
  ): Promise<GetApplicationsResponse> => {
    const response = await fetch(`${API_URL}/job/${jobId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch applications by job");
    }

    return response.json();
  },

  createApplication: async (
    params: CreateApplicationParams
  ): Promise<CreateApplicationResponse> => {
    const response = await fetch(`${API_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      throw new Error("Failed to create application");
    }

    return response.json();
  },

  updateApplication: async (
    id: string,
    params: UpdateApplicationParams
  ): Promise<UpdateApplicationResponse> => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      throw new Error("Failed to update application");
    }

    return response.json();
  },

  deleteApplication: async (id: string): Promise<DeleteApplicationResponse> => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to delete application");
    }
  },
};
