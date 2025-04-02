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

export interface Application {
  id: number;
  created_at: string;
  application_date: string;
  status: string;
  notes: string;
  updated_at: string;
  job_id: number;
  user_id: number;
  user: {
    id: number;
    created_at: string;
    name: string;
    email: string;
    password: string;
    user_type: string;
    status: string;
    last_login_at: string;
    updated_at: string;
    skills: string;
    experience_level: string;
    bio: string;
    certifications: string;
    dateofbirth: string;
    profile_image: string;
    is_approved: boolean;
  };
}
