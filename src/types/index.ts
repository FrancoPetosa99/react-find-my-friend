export interface Pet {
  id: string;
  name: string;
  description: string;
  type: string
  breed: string;
  location: string;
  ownerName: string;
  ownerPhone: string;
  createdAt: Date;
  imageUrl: string;
  found: boolean;
  last_seen_time: string;
}

export interface PetDetail extends Pet {
  can_edit: boolean;
  can_delete: boolean;
}

export interface PetApiResponse {
  pet_id: number;
  owner_id: number;
  owner_name: string;
  owner_last_name: string;
  owner_email: string;
  owner_phone: string;
  name: string;
  type: string;
  breed: string;
  last_seen_time: string;
  last_seen_place: string;
  picture_url: string;
  is_found: boolean;
  description: string;
  can_edit: boolean;
  can_delete: boolean;
}

export interface PetListApiResponse {
  id: number;
  name: string;
  description: string;
  type: string;
  breed: string;
  user_id: number;
  last_seen_time: string;
  last_seen_place: string;
  is_found: boolean;
  picture_url: string;
  created_at: string;
  updated_at: string;
}

export interface PaginatedApiResponse {
  data: PetListApiResponse[];
  total: number;
  page: number;
  size: number;
  total_pages: number;
  has_next: boolean;
  has_prev: boolean;
}

export interface CreatePetApiRequest {
  name: string;
  description: string;
  type: string;
  breed: string;
  last_seen_time: string;
  last_seen_province: string;
  last_seen_city: string;
  picture_url?: string;
}

export interface LoginApiResponse {
  token: string;
}

export interface RegisterApiResponse {
  auth_token: string;
  message: string;
  user: User;
}

export interface RegisterApiRequest {
  name: string;
  last_name: string;
  email: string;
  password: string;
  confirm_password: string;
  phone: string;
}

export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  phone: string;
}

export interface LoginForm {
  email: string;
  password: string;
}

export interface RegisterForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
}

export interface PetForm {
  name: string;
  description: string;
  type: 'perro' | 'gato' | 'otro';
  breed: string;
  last_seen_time: string;
  last_seen_province: string;
  last_seen_city: string;
  imageUrl?: string;
  found?: boolean;
}

export interface FilterOptions {
  type?: string;
  breed?: string;
  city?: string;
} 