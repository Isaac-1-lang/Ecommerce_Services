// features/auth/store.ts
import { create } from 'zustand';
import { authService } from '../../services/authService';
import { User } from '@/types/auth';

interface AuthState {
  user: User | null;
  token: string | null;
  isInitialized: boolean;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  logout: () => void;
  initialize: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isInitialized: false,
  
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
}));