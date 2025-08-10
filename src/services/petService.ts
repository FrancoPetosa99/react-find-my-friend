import { Pet, PetApiResponse, PetListApiResponse, PaginatedApiResponse, CreatePetApiRequest, PetForm, PetDetail  } from '../types';

//const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';
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

class PetService {
  // Función para mapear la respuesta de la API al tipo Pet interno
  private mapApiResponseToPet(apiResponse: PetApiResponse): PetDetail {
    return {
      id: apiResponse.pet_id.toString(),
      name: apiResponse.name,
      description: apiResponse.description || 'Sin descripción disponible',
      type: apiResponse.type,
      breed: apiResponse.breed,
      location: apiResponse.last_seen_place,
      ownerName: `${apiResponse.owner_name} ${apiResponse.owner_last_name}`,
      ownerPhone: apiResponse.owner_phone,
      createdAt: new Date(apiResponse.last_seen_time),
      imageUrl: apiResponse.picture_url,
      found: apiResponse.is_found,
      last_seen_time: apiResponse.last_seen_time,
      can_edit: apiResponse.can_edit,
      can_delete: apiResponse.can_delete
    };
  }

  // Función para mapear la respuesta paginada de la API al tipo Pet interno
  private mapPetListApiResponseToPet(apiResponse: PetListApiResponse): Pet {
    return {
      id: apiResponse.id.toString(),
      name: apiResponse.name,
      description: apiResponse.description || 'Sin descripción disponible',
      type: apiResponse.type,
      breed: apiResponse.breed,
      location: apiResponse.last_seen_place,
      ownerName: 'Información no disponible', // No disponible en la respuesta de lista
      ownerPhone: 'Información no disponible', // No disponible en la respuesta de lista
      createdAt: new Date(apiResponse.created_at),
      imageUrl: apiResponse.picture_url,
      found: apiResponse.is_found,
      last_seen_time: apiResponse.last_seen_time
    };
  }

  // Función para mapear los datos internos al formato esperado por la API
  private mapPetToApiRequest(petData: PetForm): CreatePetApiRequest {
    // Formatear la fecha al formato esperado por la API (DD-MM-YYYY)
    const date = new Date(petData.last_seen_time);
    const formattedDate = `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear()}`;

    return {
      name: petData.name,
      description: petData.description,
      type: petData.type,
      breed: petData.breed,
      last_seen_time: formattedDate,
      last_seen_province: petData.last_seen_province,
      last_seen_city: petData.last_seen_city,
      picture_url: petData.imageUrl
    };
  }

  private async fetchFromAPI(endpoint: string, options: RequestInit = {}): Promise<any> {
    try {
      const headers = createAuthHeaders();
      
      // Verificar que hay un token disponible para endpoints protegidos
      if (!getAuthToken()) {
        throw new Error('Token de autenticación no encontrado. Por favor, inicia sesión nuevamente.');
      }
      
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
          localStorage.removeItem('authUser');
          throw new Error('Sesión expirada. Por favor, inicia sesión nuevamente.');
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      if (response.status !== 204) {
        return await response.json();
      }
      return null;
    } catch (error) {
      console.error('Error fetching from API:', error);
      throw error;
    }
  }

  async getAllPets(): Promise<Pet[]> {
    console.log('🚀 Fetching data from API in production mode (protected endpoint)');
    const apiResponse: PaginatedApiResponse = await this.fetchFromAPI('/pets/');
    return apiResponse.data.map(pet => this.mapPetListApiResponseToPet(pet));
  }

  async getPetById(id: string): Promise<PetDetail | null> {
    try {
      console.log('🚀 Fetching pet by ID from API in production mode (protected endpoint)');
      const apiResponse: PetApiResponse = await this.fetchFromAPI(`/pets/${id}`);
      return this.mapApiResponseToPet(apiResponse);
    } catch (error) {
      console.error('Error fetching pet by ID:', error);
      return null;
    }
  }

  async createPet(petData: PetForm): Promise<Pet> {
    const apiRequestData = this.mapPetToApiRequest(petData);
    console.log('🚀 Creating pet with API in production mode (protected endpoint)');
    return this.fetchFromAPI('/pets/', {
      method: 'POST',
      body: JSON.stringify(apiRequestData),
    });
  }

  async createPetWithImage(formData: FormData): Promise<Pet> {
    console.log('🚀 Creating pet with image using API in production mode (protected endpoint)');
      
    const token = getAuthToken();
    if (!token) {
      throw new Error('Token de autenticación no encontrado. Por favor, inicia sesión nuevamente.');
    }
      
    const response = await fetch(`${API_BASE_URL}/pets/`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData
    });
      
    if (!response.ok) {
      if (response.status === 401) {
        localStorage.removeItem('authToken');
        localStorage.removeItem('authUser');
        throw new Error('Sesión expirada. Por favor, inicia sesión nuevamente.');
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  }

  async searchPets(filters: {
    type?: string;
    breed?: string;
    city?: string;
    searchTerm?: string;
  }): Promise<Pet[]> {
    // En producción, usar API real con query parameters
    const params = new URLSearchParams();
    if (filters.type) params.append('type', filters.type);
    if (filters.breed) params.append('breed', filters.breed);
    if (filters.city) params.append('city', filters.city);
    if (filters.searchTerm) params.append('search', filters.searchTerm);

    console.log('🚀 Searching pets with API in production mode (protected endpoint)');
    const apiResponse: PaginatedApiResponse = await this.fetchFromAPI(`/pets/search?${params.toString()}`);
    return apiResponse.data.map(pet => this.mapPetListApiResponseToPet(pet));
  }

  async deletePet(id: string): Promise<void> {
    console.log('🚀 Deleting pet with API in production mode (protected endpoint)');
    return this.fetchFromAPI(`/pets/${id}`, {
      method: 'DELETE',
    });
  }

  async updatePet(id: string, petData: Partial<PetForm>): Promise<Pet> {
      const apiRequestData = this.mapPetToApiRequest(petData as PetForm);
      console.log('🚀 Updating pet with API in production mode (protected endpoint)');
      return this.fetchFromAPI(`/pets/${id}`, {
        method: 'PUT',
        body: JSON.stringify(apiRequestData),
      });
  }

  async markPetAsFound(id: string): Promise<void> {
    console.log('🚀 Marking pet as found with API in production mode (protected endpoint)');
    return this.fetchFromAPI(`/pets/${id}/mark-found`, {
      method: 'PATCH',
    });
  }
}

export const petService = new PetService(); 