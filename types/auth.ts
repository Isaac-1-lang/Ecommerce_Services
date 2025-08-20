// types/auth.ts
export enum UserRole {
  ADMIN = 'ADMIN',
  CUSTOMER = 'CUSTOMER',
  EMPLOYEE = 'EMPLOYEE',
  DELIVERY_PARTNER = 'DELIVERY_PARTNER'
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  isActive: boolean;
  createdAt: string;
  lastLoginAt?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

// Base registration data
export interface BaseRegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  username?: string;
  profilePicture?: File;
}

// Customer registration (simplest)
export interface CustomerRegisterData extends BaseRegisterData {
  role: UserRole.CUSTOMER;
}

// Admin registration (includes payment info)
export interface AdminRegisterData extends BaseRegisterData {
  role: UserRole.ADMIN;
  paymentMethod?: {
    cardNumber?: string;
    expiryDate?: string;
    cvv?: string;
    cardholderName?: string;
  };
  businessName?: string;
  businessAddress?: string;
}

// Employee registration (requires admin token)
export interface EmployeeRegisterData extends BaseRegisterData {
  role: UserRole.EMPLOYEE;
  adminToken: string; // Required token from admin
  employeeId?: string;
  department?: string;
  position?: string;
}

// Union type for all registration data
export type RegisterData = CustomerRegisterData | AdminRegisterData | EmployeeRegisterData;

export interface AuthResponse {
  user: User;
  token: string;
  message: string;
}

export interface Permission {
  resource: string;
  action: string;
}

export const RolePermissions: Record<UserRole, Permission[]> = {
  [UserRole.ADMIN]: [
    { resource: 'users', action: 'all' },
    { resource: 'products', action: 'all' },
    { resource: 'orders', action: 'all' },
    { resource: 'inventory', action: 'all' },
    { resource: 'analytics', action: 'all' },
    { resource: 'settings', action: 'all' }
  ],
  [UserRole.EMPLOYEE]: [
    { resource: 'announcements', action: 'read' },
    { resource: 'tasks', action: 'read' },
    { resource: 'tasks', action: 'create' },
    { resource: 'requests', action: 'create' },
    { resource: 'requests', action: 'read' },
    { resource: 'products', action: 'read' },
  ],
  [UserRole.DELIVERY_PARTNER]: [
    { resource: 'orders', action: 'read' },
    { resource: 'orders', action: 'update' },
    { resource: 'delivery', action: 'all' }
  ],
  [UserRole.CUSTOMER]: [
    { resource: 'products', action: 'read' },
    { resource: 'orders', action: 'read' },
    { resource: 'orders', action: 'create' },
    { resource: 'profile', action: 'all' },
    { resource: 'cart', action: 'all' }
  ]
};

// Registration flow types
export type RegistrationFlow = 'customer' | 'admin' | 'employee';

// Role-specific redirect paths
export const RoleRedirectPaths: Record<UserRole, string> = {
  [UserRole.CUSTOMER]: '/dashboard',
  [UserRole.ADMIN]: '/admin',
  [UserRole.EMPLOYEE]: '/employee',
  [UserRole.DELIVERY_PARTNER]: '/delivery'
};
