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

export interface CreateJobParams {
  title: string;
  description: string;
  work_date: string;
  start_time: string;
  end_time: string;
  hourly_rate: number;
  required_skills: string[];
  status: "DRAFT" | "PUBLISHED" | "PENDING";
  restaurant_id: number;
  image?: File;
  task?: string;
  skill?: string;
  whattotake?: string;
  note?: string;
  point?: string;
  transportation?: string;
  is_approved?: boolean;
  number_of_spots?: number;
  fee?: number;
  expiry_date?: number;
}
