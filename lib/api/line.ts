import { API_CONFIG } from "./config";

const baseURL = API_CONFIG.baseURLs.line;

export const CheckLineUser = async (line_user_id: string) => {
  const res = await fetch(`${baseURL}/check-line-user/${line_user_id}`);
  return res.json();
};

export const LinkLineId = async (
  line_user_id: string,
  name: string,
  picture: string,
  token: string
) => {
  const res = await fetch(`${baseURL}/link-line-id`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ line_user_id, name, picture }),
  });
  return res.json();
};


export const LinkLineUser = async (data: {
  line_user_id: string;
  email: string;
  password: string;
}) => {
  const res = await fetch(`${baseURL}/link-line-user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const RegisterWithLine = async (data: {
  line_user_id: string;
  email: string;
  password: string;
  name: string;
  picture: string;
}) => {
  const res = await fetch(`${baseURL}/register-with-line`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return res.json();
};

