import { LoginApiResponse, RegisterApiRequest, RegisterApiResponse } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

const getAuthToken = (): string | null => {
  return localStorage.getItem('authToken');
};

const createAuthHeaders = (): HeadersInit => {
  const token = getAuthToken();
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  return headers;
};

const createPublicHeaders = (): HeadersInit => {
  return {
    'Content-Type': 'application/json',
  };
};

class AuthService {
  private async fetchFromAPI(endpoint: string, options: RequestInit = {}, requireAuth: boolean = true): Promise<any> {
    try {
      const headers = requireAuth ? createAuthHeaders() : createPublicHeaders();
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers: {
          ...headers,
          ...options.headers,
        },
      });
      
      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem('authToken');
          throw new Error('Sesión expirada. Por favor, inicia sesión nuevamente.');
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching from API:', error);
      throw error;
    }
  }

  async login(email: string, password: string): Promise<LoginApiResponse> {
    console.log('🚀 Authenticating with API in production mode (public endpoint)');
    const response = await this.fetchFromAPI('/auth/login', {
      method: 'POST',  
      body: JSON.stringify({ email, password }),
    }, false);
    
    if (response.status == 200) {
      localStorage.setItem('authToken', response.token);
    }
    return response;
  }

  async register(userData: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    phone: string;
  }): Promise<LoginApiResponse | RegisterApiResponse> {
    console.log('🚀 Registering user with API in production mode (public endpoint)');
    const apiRequestData: RegisterApiRequest = {
      name: userData.name.split(' ')[0],
      last_name: userData.name.split(' ').slice(1).join(' '),
      email: userData.email,
      password: userData.password,
      confirm_password: userData.confirmPassword,
      phone: userData.phone
    };
    console.log(apiRequestData);
    const response = await this.fetchFromAPI('/users/', {
      method: 'POST',
      body: JSON.stringify(apiRequestData),
    }, false);

    if (response.status == 200) localStorage.setItem('authToken', response.auth_token);
    
    return response;
  }
  
  decodeToken(token: string): {
    id: string;
    name: string;
    email: string;
    phone: string;
  } {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      
      return {
        id: payload.user_id.toString(),
        name: payload.name || 'Usuario',
        email: payload.email,
        phone: payload.phone || ''
      };
    } catch (error) {
      console.error('Error decoding token:', error);
      // Fallback en caso de error al decodificar
      return {
        id: '1',
        name: 'Usuario',
        email: '',
        phone: ''
      };
    }
  }

  createUserFromRegistration(registerResponse: RegisterApiResponse): {
    id: string;
    name: string;
    email: string;
    phone: string;
  } {
    const fullName = `${registerResponse.user.name}`.trim();
    
    return {
      id: registerResponse.user.id.toString(),
      name: fullName,
      email: registerResponse.user.email,
      phone: registerResponse.user.phone
    };
  }
}

export const authService = new AuthService(); 