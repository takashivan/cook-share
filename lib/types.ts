export interface Job {
  id: number;
  title: string;
  description: string;
  work_date: string;
  start_time: string;
  end_time: string;
  fee: number;
  number_of_spots: number;
  status: "open" | "closed" | "draft";
  restaurant_id: number;
  created_at: string;
  updated_at: string;
}
