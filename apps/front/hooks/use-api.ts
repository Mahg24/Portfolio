/**
 * Hooks personalizados para diferentes servicios de API
 */

import { useState, useEffect } from 'react';
import { 
  postsService, 
  projectsService, 
  authService, 
  notificationsService 
} from '@/lib/services/api-endpoints';
import type { 
  Post, 
  PostsResponse, 
  Project, 
  ProjectsResponse,
  PaginationParams 
} from '@/lib/types/api';

// Hook para obtener posts
export function usePosts(params?: PaginationParams) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<PostsResponse['pagination'] | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await postsService.getPosts(params);
        setPosts(response.posts);
        setPagination(response.pagination);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al cargar posts');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [params?.page, params?.limit, params?.sortBy, params?.sortOrder]);

  return { posts, loading, error, pagination };
}

// Hook para obtener un post específico
export function usePost(slug: string) {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;

    const fetchPost = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await postsService.getPost(slug);
        setPost(response);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al cargar el post');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  return { post, loading, error };
}

// Hook para obtener proyectos
export function useProjects(params?: PaginationParams) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await projectsService.getProjects(params);
        setProjects(response.projects);
        setTotal(response.total);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al cargar proyectos');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [params?.page, params?.limit, params?.sortBy, params?.sortOrder]);

  return { projects, loading, error, total };
}

// Hook para obtener proyectos destacados
export function useFeaturedProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeaturedProjects = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await projectsService.getFeaturedProjects();
        setProjects(response);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al cargar proyectos destacados');
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProjects();
  }, []);

  return { projects, loading, error };
}

// Hook para obtener un proyecto específico
export function useProject(id: string) {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchProject = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await projectsService.getProject(id);
        setProject(response);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al cargar el proyecto');
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  return { project, loading, error };
}

// Hook para autenticación
export function useAuth() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await authService.login(email, password);
      setUser(response.user);
      // Guardar token en localStorage o cookies
      localStorage.setItem('token', response.token);
      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al iniciar sesión';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: { name: string; email: string; password: string }) => {
    try {
      setLoading(true);
      setError(null);
      const response = await authService.register(userData);
      setUser(response.user);
      localStorage.setItem('token', response.token);
      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al registrarse';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      setUser(null);
      localStorage.removeItem('token');
    } catch (err) {
      console.error('Error al cerrar sesión:', err);
    }
  };

  return {
    user,
    loading,
    error,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };
}

// Hook para notificaciones
export function useNotifications(params?: PaginationParams) {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await notificationsService.getNotifications(params);
        setNotifications(response);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al cargar notificaciones');
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [params?.page, params?.limit]);

  const markAsRead = async (id: string) => {
    try {
      await notificationsService.markAsRead(id);
      setNotifications(prev => 
        prev.map(notification => 
          notification.id === id 
            ? { ...notification, read: true }
            : notification
        )
      );
    } catch (err) {
      console.error('Error al marcar notificación como leída:', err);
    }
  };

  const markAllAsRead = async () => {
    try {
      await notificationsService.markAllAsRead();
      setNotifications(prev => 
        prev.map(notification => ({ ...notification, read: true }))
      );
    } catch (err) {
      console.error('Error al marcar todas las notificaciones como leídas:', err);
    }
  };

  const deleteNotification = async (id: string) => {
    try {
      await notificationsService.deleteNotification(id);
      setNotifications(prev => prev.filter(notification => notification.id !== id));
    } catch (err) {
      console.error('Error al eliminar notificación:', err);
    }
  };

  return {
    notifications,
    loading,
    error,
    markAsRead,
    markAllAsRead,
    deleteNotification,
  };
}
