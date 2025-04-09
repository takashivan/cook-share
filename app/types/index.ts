export interface User {
  id: number;
  name: string;
  email: string;
  profile_image?: string;
  bio?: string;
  experience_level?: string;
  skills?: string[];
  certifications?: string[];
  created_at: string;
  updated_at: string;
  age?: number;
  gender?: string;
  phone?: string;
  address?: string;
}

export interface Chef extends User {
  age?: number;
  gender?: string;
  phone?: string;
  address?: string;
}

export interface Restaurant extends User {
  restaurant_name: string;
  business_hours?: string;
  cuisine_type?: string;
}
