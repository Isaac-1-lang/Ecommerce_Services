"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { authService } from "../../services/authService";

export type AuthUser = { 
  id: string; 
  name: string; 
  username: string;
  email: string; 
  profilePicture?: string;
  role?: 'user' | 'admin' | 'employee' | 'delivery';
} | null;

type Credentials = { emailOrUsername: string; password: string };
type RegisterData = { 
  name: string; 
  username: string;
  email: string; 
  password: string;
  profilePicture?: File;
};

type AuthState = {
  user: AuthUser;
  token: string | null;
  loading: boolean;
  error: string | null;
  isEmailVerified: boolean;
  login: (credentials: Credentials) => Promise<void>;
  register: (data: RegisterData) => Promise<{ id: string; message: string }>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<{ message: string }>;
  resetPassword: (token: string, password: string) => Promise<{ message: string }>;
  verifyEmail: (token: string) => Promise<{ message: string }>;
  resendVerification: (email: string) => Promise<{ message: string }>;
  socialLogin: (provider: 'google' | 'github') => Promise<void>;
  setUser: (user: AuthUser) => void;
  clearError: () => void;
  validateToken: () => Promise<boolean>;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      loading: false,
      error: null,
      isEmailVerified: false,
      
      login: async (credentials) => {
        set({ loading: true, error: null });
        try {
          const res = await authService.login(credentials);
          set({ user: res.user, token: res.token, loading: false, isEmailVerified: true });
        } catch (error) {
          set({ error: error instanceof Error ? error.message : "Login failed", loading: false });
        }
      },

      register: async (data) => {
        set({ loading: true, error: null });
        try {
          const res = await authService.register(data);
          set({ loading: false });
          // Note: User needs to verify email before they can login
          return res;
        } catch (error) {
          set({ error: error instanceof Error ? error.message : "Registration failed", loading: false });
          throw error;
        }
      },

      logout: () => set({ user: null, token: null, isEmailVerified: false }),

      forgotPassword: async (email) => {
        set({ loading: true, error: null });
        try {
          const res = await authService.forgotPassword({ email });
          set({ loading: false });
          return res;
        } catch (error) {
          set({ error: error instanceof Error ? error.message : "Failed to send reset email", loading: false });
          throw error;
        }
      },

      resetPassword: async (token, password) => {
        set({ loading: true, error: null });
        try {
          const res = await authService.resetPassword({ token, password });
          set({ loading: false });
          return res;
        } catch (error) {
          set({ error: error instanceof Error ? error.message : "Failed to reset password", loading: false });
          throw error;
        }
      },

      verifyEmail: async (token) => {
        set({ loading: true, error: null });
        try {
          const res = await authService.verifyEmail({ token });
          set({ loading: false, isEmailVerified: true });
          return res;
        } catch (error) {
          set({ error: error instanceof Error ? error.message : "Failed to verify email", loading: false });
          throw error;
        }
      },

      resendVerification: async (email) => {
        set({ loading: true, error: null });
        try {
          const res = await authService.resendVerification({ email });
          set({ loading: false });
          return res;
        } catch (error) {
          set({ error: error instanceof Error ? error.message : "Failed to resend verification", loading: false });
          throw error;
        }
      },

      socialLogin: async (provider) => {
        set({ loading: true, error: null });
        try {
          const res = await authService.socialLogin(provider);
          set({ user: res.user, token: res.token, loading: false, isEmailVerified: true });
        } catch (error) {
          set({ error: error instanceof Error ? error.message : `${provider} login failed`, loading: false });
        }
      },

      setUser: (user) => set({ user }),
      
      clearError: () => set({ error: null }),
      
      validateToken: async () => {
        const { token } = get();
        if (!token) return false;
        try {
          const isValid = await authService.validateToken(token);
          if (!isValid) {
            set({ user: null, token: null });
          }
          return isValid;
        } catch (error) {
          set({ user: null, token: null });
          return false;
        }
      },
    }),
    { 
      name: "now_auth",
      partialize: (state) => ({ user: state.user, token: state.token, isEmailVerified: state.isEmailVerified })
    }
  )
);
