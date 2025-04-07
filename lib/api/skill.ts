import { API_CONFIG, apiRequest } from "./config";

export interface Skill {
  id: string;
  skill: string;
  created_at: number;
}

export interface SkillResponse {
  skills: Skill[];
}

const BASE_URL = API_CONFIG.baseURLs.skill;

export const getSkills = async (): Promise<Skill[]> => {
  const response = await fetch(`${API_CONFIG.baseURLs.skill}`, {
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

export const createSkill = async (params: Skill): Promise<Skill> => {
  const response = await fetch(`${BASE_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  });

  if (!response.ok) {
    throw new Error("Failed to create job");
  }

  return response.json();
};

export const deleteSkill = async (skill: Skill): Promise<Skill> => {
  const response = await fetch(`${BASE_URL}/${skill.id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to delete job");
  }

  return response.json();
};

export const updateSkill = async (skill: Skill): Promise<Skill> => {
  const response = await fetch(`${BASE_URL}/${skill.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(skill),
  });

  if (!response.ok) {
    throw new Error("Failed to update job");
  }

  return response.json();
};

export const getSkill = async (id: string): Promise<Skill> => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch job");
  }

  return response.json();
};
