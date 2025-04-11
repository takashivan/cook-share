export interface Staff {
  id: string;
  created_at: number;
  companyuser_id: string | null;
  restaurant_id: number;
  can_edit: boolean;
  can_manage_jobs: boolean;
  companyuser: {
    id: string;
    created_at: number;
    companies_id: string | null;
    name: string;
    email: string;
    phone: string | null;
    is_admin: boolean;
    is_active: boolean;
    is_verified: boolean;
    updated_at: number | null;
  };
}
