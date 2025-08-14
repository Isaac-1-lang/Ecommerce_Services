"use client";

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthStore } from '../features/auth/store';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: ('admin' | 'employee' | 'delivery')[];
  redirectTo?: string;
}

export default function ProtectedRoute({ 
  children, 
  allowedRoles = [], 
  redirectTo = '/auth/login' 
}: ProtectedRouteProps) {
  const { user, token } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuthorization = () => {
      // If no token, redirect to login
      if (!token) {
        router.push(`${redirectTo}?redirect=${encodeURIComponent(pathname)}`);
        return;
      }

      // If no user data, redirect to login
      if (!user) {
        router.push(`${redirectTo}?redirect=${encodeURIComponent(pathname)}`);
        return;
      }

      // If specific roles are required, check if user has the required role
      if (allowedRoles.length > 0) {
        if (!allowedRoles.includes(user.role as any)) {
          // Redirect to appropriate portal or home page based on user role
          let redirectPath = '/';
          
          if (user.role === 'admin') {
            redirectPath = '/admin';
          } else if (user.role === 'employee') {
            redirectPath = '/employee';
          } else if (user.role === 'delivery') {
            redirectPath = '/delivery';
          }
          
          router.push(redirectPath);
          return;
        }
      }

      // User is authorized
      setIsAuthorized(true);
      setIsLoading(false);
    };

    checkAuthorization();
  }, [user, token, allowedRoles, redirectTo, pathname, router]);

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-neutral-600 dark:text-neutral-400">Checking authorization...</p>
        </div>
      </div>
    );
  }

  // If not authorized, don't render children (redirect will happen)
  if (!isAuthorized) {
    return null;
  }

  // User is authorized, render children
  return <>{children}</>;
}

// Specific protection components for different portals
export function AdminProtected({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute allowedRoles={['admin']} redirectTo="/auth/login">
      {children}
    </ProtectedRoute>
  );
}

export function EmployeeProtected({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute allowedRoles={['employee']} redirectTo="/auth/login">
      {children}
    </ProtectedRoute>
  );
}

export function DeliveryProtected({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute allowedRoles={['delivery']} redirectTo="/auth/login">
      {children}
    </ProtectedRoute>
  );
}

export function PortalProtected({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute allowedRoles={['admin', 'employee', 'delivery']} redirectTo="/auth/login">
      {children}
    </ProtectedRoute>
  );
}
