export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar_url?: string;
  experience_level?: string;
  status?: string;
  skills?: string[];
  is_approved?: boolean;
}
