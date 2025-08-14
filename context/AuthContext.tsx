"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useAuthStore } from '../features/auth/store';

interface AuthUser {
  id: string;
  name: string;
  username: string;
  email: string;
  profilePicture?: string;
  role?: 'user' | 'admin' | 'employee' | 'delivery';
}

interface AuthContextType {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (userData: any) => Promise<void>;
  clearError: () => void;
  validateToken: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const {
    user,
    token,
    loading,
    error,
    login: storeLogin,
    logout: storeLogout,
    register: storeRegister,
    clearError: storeClearError,
    validateToken: storeValidateToken,
  } = useAuthStore();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      if (token) {
        try {
          const isValid = await storeValidateToken();
          if (!isValid) {
            storeLogout();
          }
        } catch (error) {
          console.error('Token validation failed:', error);
          storeLogout();
        }
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, [token, storeValidateToken, storeLogout]);

  const login = async (email: string, password: string) => {
    try {
      await storeLogin({ emailOrUsername: email, password });
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    storeLogout();
  };

  const register = async (userData: any) => {
    try {
      await storeRegister(userData);
    } catch (error) {
      throw error;
    }
  };

  const clearError = () => {
    storeClearError();
  };

  const validateToken = async () => {
    return await storeValidateToken();
  };

  const value: AuthContextType = {
    user,
    token,
    isAuthenticated: !!user && !!token,
    isLoading: loading || isLoading,
    error,
    login,
    logout,
    register,
    clearError,
    validateToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Protected Route Component
interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: 'admin' | 'employee' | 'delivery' | 'user';
  fallback?: ReactNode;
}

export function ProtectedRoute({ children, requiredRole, fallback }: ProtectedRouteProps) {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return fallback || (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-neutral-800 dark:text-neutral-200 mb-4">
            Access Denied
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400 mb-6">
            You must be logged in to access this page.
          </p>
          <a
            href="/auth/login"
            className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
          >
            Sign In
          </a>
        </div>
      </div>
    );
  }

  if (requiredRole && user?.role !== requiredRole) {
    return fallback || (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-neutral-800 dark:text-neutral-200 mb-4">
            Access Denied
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400 mb-6">
            You don't have permission to access this page.
          </p>
          <a
            href="/"
            className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
          >
            Go Home
          </a>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
