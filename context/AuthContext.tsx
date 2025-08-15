// context/AuthContext.tsx
'use client';

import { createContext, useContext, useEffect, ReactNode } from 'react';
import { useAuthStore } from '../features/auth/store';

const AuthContext = createContext({});

export const useAuth = () => {
  return useAuthStore();
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const initialize = useAuthStore((state) => state.initialize);
  const isInitialized = useAuthStore((state) => state.isInitialized);

  useEffect(() => {
    if (!isInitialized) {
      initialize();
    }
  }, [initialize, isInitialized]);

  return (
    <AuthContext.Provider value={{}}>
      {children}
    </AuthContext.Provider>
  );
};