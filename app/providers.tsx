"use client";

import { ThemeProvider } from "next-themes";
import { ReactNode, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "../context/AuthContext";
import { CartProvider } from "../context/CartContext";
import { NotificationProvider } from "../components/ui/Notifications";

export default function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <QueryClientProvider client={queryClient}>
        <NotificationProvider>
          <AuthProvider>
            <CartProvider>
              {children}
            </CartProvider>
          </AuthProvider>
        </NotificationProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
