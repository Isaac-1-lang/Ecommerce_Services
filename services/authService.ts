// services/authService.ts
import { User, UserRole, LoginCredentials, RegisterData, CustomerRegisterData, AdminRegisterData, EmployeeRegisterData } from "../types/auth";
import api from "../lib/api";
import { googleAuthService } from "../lib/googleAuth";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  phoneNumber?: string;
  profilePicture?: File;
}

export interface PasswordResetRequest {
  email: string;
}

export interface VerifyCodeRequest {
  email: string;
  code: string;
}

export interface ResetPasswordRequest {
  email: string;
  newPassword: string;
}

export interface AuthResponse {
  success: boolean;
  data?: any;
  message?: string;
  error?: string;
}

export interface LoginResponse {
  success: boolean;
  data?: {
    token: string;
    userName: string;
    userEmail: string;
    userId: string;
    role: string;
  };
  message?: string;
  error?: string;
}

// Helper function to safely check if we're in browser environment
const isBrowser = typeof window !== "undefined";

// Safe localStorage wrapper
const safeLocalStorage = {
  getItem: (key: string): string | null => {
    if (!isBrowser) return null;
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  setItem: (key: string, value: string): void => {
    if (!isBrowser) return;
    try {
      localStorage.setItem(key, value);
    } catch {
      // Handle localStorage errors (e.g., quota exceeded)
    }
  },
  removeItem: (key: string): void => {
    if (!isBrowser) return;
    try {
      localStorage.removeItem(key);
    } catch {
      // Handle localStorage errors
    }
  }
};

export const authService = {
  async login(credentials: LoginCredentials): Promise<{ user: User; token: string }> {
    try {
      const payload = {
        email: (credentials.email || '').trim(),
        password: (credentials.password || '').trim(),
      };
      const response = await api.post<any>("/api/v1/auth/users/login", payload);

      const raw = response.data as any;

      // Handle both possible backend shapes
      // 1) Wrapped: { success: true, data: { token, userName, userEmail, userId, role } }
      // 2) Direct DTO: { token, userName, userEmail, userId, role, ... }
      const loginData = (raw && raw.success && raw.data) ? raw.data
                      : (raw && raw.token && raw.userEmail) ? raw
                      : null;

      if (!loginData) {
        throw new Error(raw?.message || "Login failed");
      }

      const fullName: string = String(loginData.userName || '').trim();
      const firstName = fullName.split(" ")[0] || '';
      const lastName = fullName.split(" ").slice(1).join(" ") || '';

      const backendRole = String(loginData.role || '').toUpperCase();
      const roleMap: Record<string, UserRole> = {
        'ADMIN': UserRole.ADMIN,
        'EMPLOYEE': UserRole.EMPLOYEE,
        'CUSTOMER': UserRole.CUSTOMER,
        'DELIVERY_PARTNER': UserRole.DELIVERY_PARTNER,
        'DELIVERY_AGENT': UserRole.DELIVERY_PARTNER,
      };

      const user: User = {
        id: String(loginData.userId),
        email: String(loginData.userEmail),
        firstName,
        lastName,
        role: roleMap[backendRole] ?? UserRole.CUSTOMER,
        isActive: true,
        createdAt: new Date().toISOString(),
        lastLoginAt: new Date().toISOString(),
      };

      safeLocalStorage.setItem("authToken", String(loginData.token));
      safeLocalStorage.setItem("user", JSON.stringify(user));

      return { user, token: String(loginData.token) };
    } catch (error: any) {
      const backendMessage = error?.response?.data?.message || error?.response?.data?.error;
      throw new Error(backendMessage || error.message || "Login failed");
    }
  },

  async register(data: RegisterData): Promise<{ user: User; token: string }> {
    try {
      // Only send the fields that the backend expects
      const requestData: any = {
        firstName: (data.firstName || '').trim(),
        lastName: (data.lastName || '').trim(),
        email: (data.email || '').trim(),
        password: (data.password || '').trim(),
      };

      if (data && (data as any).phoneNumber) {
        requestData.phoneNumber = String((data as any).phoneNumber).trim();
      }

      if (!requestData.firstName || requestData.firstName.length < 2) {
        throw new Error('First name must be at least 2 characters');
      }
      if (!requestData.lastName || requestData.lastName.length < 2) {
        throw new Error('Last name must be at least 2 characters');
      }
      if (!requestData.email) {
        throw new Error('Email is required');
      }
      if (!requestData.password || requestData.password.length < 8) {
        throw new Error('Password must be at least 8 characters');
      }

      // Note: The backend currently only supports basic registration
      // Additional fields like username, payment info, business info, etc.
      // will need to be handled in a separate update endpoint or
      // the backend registration endpoint needs to be extended

      const response = await api.post<AuthResponse>("/api/v1/auth/users/register", requestData);

      if (!response.data.success) {
        throw new Error(response.data.message || "Registration failed");
      }

      // Create user object from registration response
      const userData = response.data.data;
      const user: User = {
        id: userData.id,
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        role: userData.role as UserRole,
        isActive: true,
        createdAt: userData.createdAt || new Date().toISOString(),
        lastLoginAt: new Date().toISOString(),
      };

      // Backend now returns token directly, no need for separate login
      return { user, token: userData.token };
    } catch (error: any) {
      const backendMessage = error?.response?.data?.message || error?.response?.data?.error;
      throw new Error(backendMessage || error.message || "Registration failed");
    }
  },

  async getCurrentUser(_token: string): Promise<User> {
    // Backend does not expose /auth/me; return stored profile
    const stored = safeLocalStorage.getItem("user");
    if (!stored) throw new Error("No user session");
    return JSON.parse(stored) as User;
  },

  async forgotPassword({ email }: PasswordResetRequest): Promise<{ message: string }> {
    try {
      const response = await api.post<AuthResponse>("/api/v1/auth/users/request-password-reset", { email });
      if (!response.data.success) throw new Error(response.data.message || "Request failed");
      return { message: response.data.message || "Password reset email sent" };
    } catch (error: any) {
      throw new Error(error.response?.data?.message || error.message || "Request failed");
    }
  },

  async verifyResetCode({ email, code }: VerifyCodeRequest): Promise<{ message: string }> {
    try {
      const response = await api.post<AuthResponse>("/api/v1/auth/users/verify-reset-code", { email, code });
      if (!response.data.success) throw new Error(response.data.message || "Invalid verification code");
      return { message: response.data.message || "Code verified successfully" };
    } catch (error: any) {
      throw new Error(error.response?.data?.message || error.message || "Invalid verification code");
    }
  },

  async resetPassword({ email, newPassword }: ResetPasswordRequest): Promise<{ message: string }> {
    try {
      const response = await api.post<AuthResponse>("/api/v1/auth/users/reset-password", { email, newPassword });
      if (!response.data.success) throw new Error(response.data.message || "Password reset failed");
      return { message: response.data.message || "Password reset successfully" };
    } catch (error: any) {
      throw new Error(error.response?.data?.message || error.message || "Password reset failed");
    }
  },

  async logout(): Promise<{ message: string }> {
    try {
      const token = safeLocalStorage.getItem("authToken");
      if (token) {
        await api.post("/api/v1/auth/users/logout", {}, { headers: { Authorization: `Bearer ${token}` } });
      }
      safeLocalStorage.removeItem("authToken");
      safeLocalStorage.removeItem("user");
      return { message: "Logged out successfully" };
    } catch {
      safeLocalStorage.removeItem("authToken");
      safeLocalStorage.removeItem("user");
      return { message: "Logged out successfully" };
    }
  },

  async me(): Promise<User | null> {
    try {
      const token = safeLocalStorage.getItem("authToken");
      if (!token) return null;
      try {
        return await this.getCurrentUser(token);
      } catch {
        return this.getStoredUser();
      }
    } catch {
      safeLocalStorage.removeItem("authToken");
      safeLocalStorage.removeItem("user");
      return null;
    }
  },

  async validateToken(token: string): Promise<boolean> {
    return !!token; // no /me endpoint to validate server-side
  },

  getStoredUser(): User | null {
    try {
      const userStr = safeLocalStorage.getItem("user");
      return userStr ? JSON.parse(userStr) : null;
    } catch {
      return null;
    }
  },

  getStoredToken(): string | null {
    return safeLocalStorage.getItem("authToken");
  },

  async googleLogin(): Promise<{ user: User; token: string }> {
    try {
      await googleAuthService.initialize();
      const googleUser = await googleAuthService.signIn();
      const idToken = googleUser.getAuthResponse().id_token;

      const response = await api.post<LoginResponse>("/api/v1/auth/google/login", { idToken });
      if (!response.data.success || !response.data.data) throw new Error("Google login failed");

      const loginData = response.data.data;
      const profile = googleUser.getBasicProfile();

      const user: User = {
        id: loginData.userId,
        email: loginData.userEmail,
        firstName: profile.getName()?.split(" ")[0] || "",
        lastName: profile.getName()?.split(" ").slice(1).join(" ") || "",
        role: loginData.role as UserRole,
        isActive: true,
        createdAt: new Date().toISOString(),
        lastLoginAt: new Date().toISOString(),
      };

      safeLocalStorage.setItem("authToken", loginData.token);
      safeLocalStorage.setItem("user", JSON.stringify(user));

      return { user, token: loginData.token };
    } catch (error: any) {
      throw new Error(error.response?.data?.message || error.message || "Google login failed");
    }
  },
};