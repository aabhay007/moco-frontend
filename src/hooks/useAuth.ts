// src/hooks/useAuth.ts

import { useState, useEffect } from 'react';
import { User, LoginFormData, RegisterFormData, AuthResponse } from '@/types/auth';

// Mock API service (replace with real API calls)
class AuthService {
  private static TOKEN_KEY = 'auth_token';
  private static USER_KEY = 'auth_user';

  static async login(data: LoginFormData): Promise<AuthResponse> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock validation
    if (data.email === 'test@example.com' && data.password === 'Password123') {
      const user: User = {
        id: '1',
        name: 'Test User',
        email: data.email,
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
        createdAt: new Date(),
      };
      
      const token = 'mock_jwt_token_' + Date.now();
      
      // Store in memory (in real app, you might use cookies or localStorage)
      return {
        success: true,
        user,
        token,
        message: 'Login successful!',
      };
    } else {
      return {
        success: false,
        message: 'Invalid email or password',
      };
    }
  }

  static async register(data: RegisterFormData): Promise<AuthResponse> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock validation
    if (data.email === 'existing@example.com') {
      return {
        success: false,
        message: 'Email already exists',
      };
    }
    
    const user: User = {
      id: Date.now().toString(),
      name: data.name,
      email: data.email,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(data.name)}&background=3b82f6&color=ffffff`,
      createdAt: new Date(),
    };
    
    const token = 'mock_jwt_token_' + Date.now();
    
    return {
      success: true,
      user,
      token,
      message: 'Account created successfully!',
    };
  }

  static logout(): void {
    // Clear stored auth data
    // In real app: localStorage.removeItem(this.TOKEN_KEY);
    // In real app: localStorage.removeItem(this.USER_KEY);
  }

  static getCurrentUser(): User | null {
    // In real app: return stored user from localStorage
    return null;
  }

  static getToken(): string | null {
    // In real app: return stored token from localStorage
    return null;
  }
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check for existing auth on mount
    const existingUser = AuthService.getCurrentUser();
    const existingToken = AuthService.getToken();
    
    if (existingUser && existingToken) {
      setUser(existingUser);
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (data: LoginFormData): Promise<AuthResponse> => {
    setIsLoading(true);
    
    try {
      const response = await AuthService.login(data);
      
      if (response.success && response.user) {
        setUser(response.user);
        setIsAuthenticated(true);
      }
      
      return response;
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Login failed',
      };
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: RegisterFormData): Promise<AuthResponse> => {
    setIsLoading(true);
    
    try {
      const response = await AuthService.register(data);
      
      if (response.success && response.user) {
        setUser(response.user);
        setIsAuthenticated(true);
      }
      
      return response;
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Registration failed',
      };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    AuthService.logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  return {
    user,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout,
  };
};