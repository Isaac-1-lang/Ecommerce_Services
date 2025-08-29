// features/auth/store.ts
import { create } from 'zustand';
import { authService } from '../../services/authService';
import { User } from '@/types/auth';

interface AuthState {
  user: User | null;
  token: string | null;
  isInitialized: boolean;
  loading: boolean;
  error: string | null;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  logout: () => void;
  initialize: () => void;
  forgotPassword: (email: string) => Promise<{ message: string }>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isInitialized: false,
  loading: false,
  error: null,
  
  setUser: (user) => set({ user }),
  setToken: (token) => set({ token }),
  
  logout: () => {
    set({ user: null, token: null });
    authService.logout();
  },
  
  initialize: () => {
    // Only initialize on client side
    if (typeof window !== 'undefined') {
      const storedUser = authService.getStoredUser();
      const storedToken = authService.getStoredToken();
      
      console.log('Auth Store Initializing:', {
        storedUser: !!storedUser,
        storedToken: !!storedToken,
        tokenLength: storedToken ? storedToken.length : 0
      });
      
      set({ 
        user: storedUser, 
        token: storedToken,
        isInitialized: true 
      });
    } else {
      set({ isInitialized: true });
    }
  },
  
  forgotPassword: async (email: string) => {
    set({ loading: true, error: null });
    try {
      const result = await authService.forgotPassword({ email });
      set({ loading: false });
      return result;
    } catch (error: any) {
      set({ 
        loading: false, 
        error: error.message || 'Failed to send password reset email' 
      });
      throw error;
    }
  },
  
  clearError: () => set({ error: null }),
}));