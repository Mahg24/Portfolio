/**
 * Tipos específicos para las respuestas de la API
 */

// Tipos para el formulario de contacto
export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface ContactResponse {
  success: boolean;
  messageId: string;
  message: string;
}

// Tipos para posts (futuro)
export interface Post {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  publishedAt: string;
  slug: string;
  tags: string[];
  author: {
    name: string;
    email: string;
  };
}

export interface PostsResponse {
  posts: Post[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Tipos para proyectos (futuro)
export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
  featured: boolean;
  createdAt: string;
}

export interface ProjectsResponse {
  projects: Project[];
  total: number;
}

// Tipos genéricos para paginación
export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
