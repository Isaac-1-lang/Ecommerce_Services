'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, UserRole, AuthState, LoginCredentials, RegisterData, AuthResponse, RolePermissions, Permission } from '../types/auth';
import { authService } from '../services/authService';
import { useAuthStore } from '../features/auth/store';

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  hasPermission: (resource: string, action: string) => boolean;
  hasRole: (role: UserRole) => boolean;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    initializeAuth();
  }, []);

  const initializeAuth = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const userStr = localStorage.getItem('user');
      
      console.log('AuthContext Initializing:', { 
        hasToken: !!token, 
        hasUser: !!userStr,
        tokenLength: token ? token.length : 0
      });
      
      if (token && userStr) {
        try {
          const user = JSON.parse(userStr);
          
          // Update both AuthContext and Zustand store
          const { setUser, setToken } = useAuthStore.getState();
          setUser(user);
          setToken(token);
          
          setAuthState({
            user,
            token,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
          
          console.log('AuthContext initialized successfully with stored data');
        } catch (parseError) {
          console.error('Failed to parse stored user:', parseError);
          // Don't remove token on parse error, just mark as not authenticated
          setAuthState(prev => ({ ...prev, isLoading: false }));
        }
      } else {
        console.log('No stored auth data found');
        setAuthState(prev => ({ ...prev, isLoading: false }));
      }
    } catch (error) {
      console.error('AuthContext initialization error:', error);
      // Don't remove token on initialization error, just mark as not authenticated
      setAuthState(prev => ({ ...prev, isLoading: false }));
    }
  };

  const login = async (credentials: LoginCredentials) => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
      const response = await authService.login(credentials);
      
      localStorage.setItem('authToken', response.token);
      
      // Update both AuthContext and Zustand store
      const { setUser, setToken } = useAuthStore.getState();
      setUser(response.user);
      setToken(response.token);
      
      setAuthState({
        user: response.user,
        token: response.token,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Login failed',
      }));
      throw error;
    }
  };

  const register = async (data: RegisterData) => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
      const response = await authService.register(data);
      
      localStorage.setItem('authToken', response.token);
      
      // Update both AuthContext and Zustand store
      const { setUser, setToken } = useAuthStore.getState();
      setUser(response.user);
      setToken(response.token);
      
      setAuthState({
        user: response.user,
        token: response.token,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Registration failed',
      }));
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    
    // Update both AuthContext and Zustand store
    const { setUser, setToken } = useAuthStore.getState();
    setUser(null);
    setToken(null);
    
    setAuthState({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    });
  };

  const hasPermission = (resource: string, action: string): boolean => {
    if (!authState.user) return false;
    
    const userPermissions = RolePermissions[authState.user.role];
    return userPermissions.some(
      permission => 
        (permission.resource === resource && permission.action === action) ||
        (permission.resource === resource && permission.action === 'all')
    );
  };

  const hasRole = (role: UserRole): boolean => {
    return authState.user?.role === role;
  };

  const refreshUser = async () => {
    if (!authState.token) return;
    
    try {
      const user = await authService.getCurrentUser(authState.token);
      setAuthState(prev => ({ ...prev, user }));
    } catch (error) {
      logout();
    }
  };

  const value: AuthContextType = {
    ...authState,
    login,
    register,
    logout,
    hasPermission,
    hasRole,
    refreshUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};