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
  image?: string;
  creator_id: number;
  number_of_spots: number;
  fee: number;
  task: string;
  skill: string;
  whattotake: string;
  note: string;
  point: string;
  transportation: string;
  is_approved: boolean;
  expiry_date: number;
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
  user: User;
  user_comment?: string;
  user_rating?: number;
  restaurant_comment?: string;
  restaurant_rating?: number;
}

export interface WorkSessionWithUser extends WorkSession {
  user: User;
  job: Job;
}

export interface CuisineCategory {
  id: number;
  category: string;
  created_at: string;
  updated_at: string;
  is_primary: boolean;
}

export interface ChefReview {
  id: number;
  created_at: string;
  updated_at: string;
  rating: number;
  comment: string;
  worksession_id: number;
  reviewer_id: string;
  reviewee_id: number;
  user: User;
  restaurant: Restaurant;
  worksession: WorkSession;
}

export interface RestaurantReview {
  id: number;
  created_at: string;
  updated_at: string;
  rating: number;
  comment: string;
  worksession_id: number;
  reviewer_id: number;
  reviewee_id: string;
  user: User;
  restaurant: Restaurant;
  worksession: WorkSession;
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
  id: string;
  name: string;
  email: string;
  image_url?: string;
  address?: string;
  companies_id: string;
  is_approved: boolean;
  restaurant_cuisine_id: CuisineCategory[];
  profile_image?: string;
}
