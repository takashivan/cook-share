// 共通の型定義
export type Timestamp = string;
export type UUID = string;

// Job関連の型定義
export interface Job {
  created_at: Timestamp;
  title: string;
  description: string;
  work_date: string;
  start_time: Timestamp;
  end_time: Timestamp;
  hourly_rate: number;
  required_skills: string[];
  status: string;
  updated_at: Timestamp;
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

// Application関連の型定義
export interface Application {
  created_at: Timestamp;
  application_date: Timestamp;
  status: string;
  notes: string;
  updated_at: Timestamp;
  job_id: number;
  chef_id: UUID;
  user_id: UUID;
}
