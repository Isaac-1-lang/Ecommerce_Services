"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { authService } from "../../services/authService";

export type AuthUser = { id: string; name: string; email: string } | null;

type Credentials = { email: string; password: string };

type AuthState = {
  user: AuthUser;
  token: string | null;
  loading: boolean;
  login: (credentials: Credentials) => Promise<void>;
  logout: () => void;
  setUser: (user: AuthUser) => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      loading: false,
      login: async (credentials) => {
        set({ loading: true });
        const res = await authService.login(credentials);
        set({ user: res.user, token: res.token, loading: false });
      },
      logout: () => set({ user: null, token: null }),
      setUser: (user) => set({ user }),
    }),
    { name: "now_auth" }
  )
);
