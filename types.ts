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

export interface JobWithRestaurant extends Job {
  restaurant: Restaurant;
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
  age?: number;
  gender?: string;
  phone?: string;
  address?: string;
}

export interface WorkSession {
  id: number;
  application_id: string;
  user_id: string;
  status: string;
  created_at: string;
  updated_at: string;
  check_in_time: number;
  check_out_time: number;
  restaurant_name: string;
}

export interface WorkSessionWithJob extends WorkSession {
  id: number;
  application_id: string;
  user_id: string;
  status: string;
  created_at: string;
  updated_at: string;
  check_in_time: number;
  check_out_time: number;
  restaurant_name: string;
  job: JobWithRestaurant;
}

export interface CuisineCategory {
  id: number;
  category: string;
  created_at: string;
  updated_at: string;
  is_primary: boolean;
}

export interface Message {
  id: string;
  content: string;
  created_at: string;
  chef_id: string;
  is_read: boolean;
  sender_type: string;
  restaurant_id: number;
  worksession_id: number;
  application_id: string;
}

export interface Restaurant {
  id: number;
  name: string;
  address: string;
  access: string;
  business_hours: string;
  companies_id: string;
  contact_info: string;
  created_at: number;
  cuisine_category: CuisineCategory[][];
  cuisine_type: string;
  is_active: boolean;
  is_approved: boolean;
  profile_image: string;
  rating: number;
  station: string;
  updated_at: number;
}
