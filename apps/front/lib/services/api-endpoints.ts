/**
 * Servicios específicos para diferentes endpoints de la API
 */

import { apiService } from '../api';
import type { 
  ContactFormData, 
  ContactResponse,
  Post,
  PostsResponse,
  Project,
  ProjectsResponse,
  PaginationParams
} from '../types/api';

// Servicio para el formulario de contacto
export const contactService = {
  async sendMessage(data: ContactFormData): Promise<ContactResponse> {
    const response = await apiService.post<ContactResponse>('/contact', data);
    return response.data || response;
  },
};

// Servicio para posts (futuro)
export const postsService = {
  async getPosts(params?: PaginationParams): Promise<PostsResponse> {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.sortBy) queryParams.append('sortBy', params.sortBy);
    if (params?.sortOrder) queryParams.append('sortOrder', params.sortOrder);
    
    const endpoint = `/posts${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    const response = await apiService.get<PostsResponse>(endpoint);
    return response.data || response;
  },

  async getPost(slug: string): Promise<Post> {
    const response = await apiService.get<Post>(`/posts/${slug}`);
    return response.data || response;
  },

  async createPost(data: Omit<Post, 'id' | 'createdAt'>): Promise<Post> {
    const response = await apiService.post<Post>('/posts', data);
    return response.data || response;
  },

  async updatePost(id: string, data: Partial<Post>): Promise<Post> {
    const response = await apiService.put<Post>(`/posts/${id}`, data);
    return response.data || response;
  },

  async deletePost(id: string): Promise<void> {
    await apiService.delete(`/posts/${id}`);
  },
};

// Servicio para proyectos (futuro)
export const projectsService = {
  async getProjects(params?: PaginationParams): Promise<ProjectsResponse> {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.sortBy) queryParams.append('sortBy', params.sortBy);
    if (params?.sortOrder) queryParams.append('sortOrder', params.sortOrder);
    
    const endpoint = `/projects${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    const response = await apiService.get<ProjectsResponse>(endpoint);
    return response.data || response;
  },

  async getProject(id: string): Promise<Project> {
    const response = await apiService.get<Project>(`/projects/${id}`);
    return response.data || response;
  },

  async getFeaturedProjects(): Promise<Project[]> {
    const response = await apiService.get<Project[]>('/projects/featured');
    return response.data || response;
  },

  async createProject(data: Omit<Project, 'id' | 'createdAt'>): Promise<Project> {
    const response = await apiService.post<Project>('/projects', data);
    return response.data || response;
  },

  async updateProject(id: string, data: Partial<Project>): Promise<Project> {
    const response = await apiService.put<Project>(`/projects/${id}`, data);
    return response.data || response;
  },

  async deleteProject(id: string): Promise<void> {
    await apiService.delete(`/projects/${id}`);
  },
};

// Servicio para autenticación (futuro)
export const authService = {
  async login(email: string, password: string): Promise<{ token: string; user: any }> {
    const response = await apiService.post<{ token: string; user: any }>('/auth/login', {
      email,
      password,
    });
    return response.data || response;
  },

  async register(userData: {
    name: string;
    email: string;
    password: string;
  }): Promise<{ token: string; user: any }> {
    const response = await apiService.post<{ token: string; user: any }>('/auth/register', userData);
    return response.data || response;
  },

  async refreshToken(refreshToken: string): Promise<{ token: string }> {
    const response = await apiService.post<{ token: string }>('/auth/refresh', {
      refreshToken,
    });
    return response.data || response;
  },

  async logout(): Promise<void> {
    await apiService.post('/auth/logout');
  },
};

// Servicio para notificaciones (futuro)
export const notificationsService = {
  async getNotifications(params?: PaginationParams): Promise<any[]> {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    
    const endpoint = `/notifications${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    const response = await apiService.get<any[]>(endpoint);
    return response.data || response;
  },

  async markAsRead(id: string): Promise<void> {
    await apiService.patch(`/notifications/${id}/read`);
  },

  async markAllAsRead(): Promise<void> {
    await apiService.patch('/notifications/read-all');
  },

  async deleteNotification(id: string): Promise<void> {
    await apiService.delete(`/notifications/${id}`);
  },
};
