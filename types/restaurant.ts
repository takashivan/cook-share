import { RESTAURANT_STATUS } from "@/lib/const/restaurant";

export interface Restaurant {
  id: string;
  name: string;
  email: string;
  image_url?: string;
  address?: string;
  companies_id: string;
  is_approved: boolean;
  status: typeof RESTAURANT_STATUS[number]['value'];
}
