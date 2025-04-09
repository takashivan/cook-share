export interface Job {
  id: number;
  created_at: number;
  title: string;
  description: string;
  work_date: string;
  start_time: number;
  end_time: number;
  hourly_rate: number;
  required_skills: string[];
  status: string;
  updated_at: number;
  restaurant_id: number;
  image: string;
  creator_id: number;
  task: string;
  skill: string;
  whattotake: string;
  note: string;
  point: string;
  transportation: string;
  is_approved: boolean;
}

export interface Application {
  id: number;
  created_at: string;
  application_date: string;
  status: string;
  notes?: string;
  updated_at: string;
  job_id: number;
  user_id: string;
  message?: string;
  user: User;
}

export interface User {
  id: string;
  created_at: number;
  name: string;
  email: string;
  password: string;
  user_type: string;
  status: string;
  last_login_at: number | null;
  updated_at: number | null;
  skills: string[];
  experience_level: string;
  bio: string;
  certifications: string[];
  dateofbirth: number | null;
  profile_image: string;
  is_approved: boolean;
}

export interface WorkSession {
  id: number;
  application_id: string;
  user_id: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface Message {
  id: string;
  content: string;
  created_at: string;
  chef_id: string;
  sender_type: string;
  restaurant_id: number;
  worksession_id: number;
  application_id: string;
}
