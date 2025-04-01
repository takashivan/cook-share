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
}

export interface Application {
  id: number;
  created_at: string;
  application_date: string;
  status: string;
  notes?: string;
  updated_at: string;
  job_id: number;
  chef_id: string;
  user_id: string;
  message?: string;
  chef?: {
    id: string;
    name: string;
    profile_image?: string;
  };
}
