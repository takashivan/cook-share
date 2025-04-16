export interface Message {
  id: string;
  content: string;
  created_at: string;
  user_id: string;
  work_session_id: string;
  sender_type: "restaurant" | "user";
}

export interface WorkSession {
  id: string;
  application_id: string;
  user_id: string;
  status: string;
  created_at: string;
  updated_at: string;
}
