// services/authService.ts
import { AuthUser } from "../types/auth";
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
  async login({ email, password }: LoginRequest): Promise<{ user: AuthUser; token: string }> {
    try {
      const response = await api.post<LoginResponse>("/v1/auth/users/login", { email, password });

      if (!response.data.success || !response.data.data) {
        throw new Error(response.data.message || "Login failed");
      }

      const loginData = response.data.data;

      const authUser: AuthUser = {
        id: loginData.userId,
        name: loginData.userName,
        username: loginData.userName.split(" ")[0],
        email: loginData.userEmail,
        profilePicture:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        role: loginData.role as any,
      };

      safeLocalStorage.setItem("authToken", loginData.token);
      safeLocalStorage.setItem("user", JSON.stringify(authUser));

      return { user: authUser, token: loginData.token };
    } catch (error: any) {
      throw new Error(error.response?.data?.message || error.message || "Login failed");
    }
  },

  async register({
    firstName,
    lastName,
    username,
    email,
    password,
    phoneNumber,
    profilePicture,
  }: RegisterRequest): Promise<{ id: string; message: string }> {
    try {
      const formData = new FormData();
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("username", username);
      formData.append("email", email);
      formData.append("password", password);
      if (phoneNumber) formData.append("phoneNumber", phoneNumber);
      if (profilePicture) formData.append("profilePicture", profilePicture);

      const response = await api.post<AuthResponse>("/v1/auth/users/register", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (!response.data.success) {
        throw new Error(response.data.message || "Registration failed");
      }

      return {
        id: response.data.data?.user?.id || "new-user",
        message:
          response.data.message ||
          "Registration successful! Please check your email to verify your account before signing in.",
      };
    } catch (error: any) {
      throw new Error(error.response?.data?.message || error.message || "Registration failed");
    }
  },

  async forgotPassword({ email }: PasswordResetRequest): Promise<{ message: string }> {
    try {
      const response = await api.post<AuthResponse>("/v1/auth/users/request-password-reset", { email });
      if (!response.data.success) throw new Error(response.data.message || "Request failed");
      return { message: response.data.message || "Password reset email sent" };
    } catch (error: any) {
      throw new Error(error.response?.data?.message || error.message || "Request failed");
    }
  },

  async verifyResetCode({ email, code }: VerifyCodeRequest): Promise<{ message: string }> {
    try {
      const response = await api.post<AuthResponse>("/v1/auth/users/verify-reset-code", { email, code });
      if (!response.data.success) throw new Error(response.data.message || "Invalid verification code");
      return { message: response.data.message || "Code verified successfully" };
    } catch (error: any) {
      throw new Error(error.response?.data?.message || error.message || "Invalid verification code");
    }
  },

  async resetPassword({ email, newPassword }: ResetPasswordRequest): Promise<{ message: string }> {
    try {
      const response = await api.post<AuthResponse>("/v1/auth/users/reset-password", { email, newPassword });
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
        await api.post("/v1/auth/users/logout", {}, { headers: { Authorization: `Bearer ${token}` } });
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

  async me(): Promise<AuthUser | null> {
    try {
      const token = safeLocalStorage.getItem("authToken");
      if (!token) return null;

      const response = await api.get<AuthResponse>("/v1/auth/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.data.success || !response.data.data) return null;

      const user = response.data.data;
      const authUser: AuthUser = {
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
        profilePicture:
          user.profilePicture ||
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        role: user.role as any,
      };

      safeLocalStorage.setItem("user", JSON.stringify(authUser));
      return authUser;
    } catch {
      safeLocalStorage.removeItem("authToken");
      safeLocalStorage.removeItem("user");
      return null;
    }
  },

  async validateToken(token: string): Promise<boolean> {
    if (!token) return false;
    try {
      const response = await api.get<AuthResponse>("/v1/auth/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data.success;
    } catch {
      return false;
    }
  },

  getStoredUser(): AuthUser | null {
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

  async googleLogin(): Promise<{ user: AuthUser; token: string }> {
    try {
      await googleAuthService.initialize();
      const googleUser = await googleAuthService.signIn();
      const idToken = googleUser.getAuthResponse().id_token;

      const response = await api.post<LoginResponse>("/v1/auth/google/login", { idToken });
      if (!response.data.success || !response.data.data) throw new Error("Google login failed");

      const loginData = response.data.data;
      const profile = googleUser.getBasicProfile();

      const authUser: AuthUser = {
        id: loginData.userId,
        name: loginData.userName,
        username: loginData.userName.split(" ")[0],
        email: loginData.userEmail,
        profilePicture: profile.getImageUrl() || undefined,
        role: loginData.role as any,
      };

      safeLocalStorage.setItem("authToken", loginData.token);
      safeLocalStorage.setItem("user", JSON.stringify(authUser));

      return { user: authUser, token: loginData.token };
    } catch (error: any) {
      throw new Error(error.response?.data?.message || error.message || "Google login failed");
    }
  },
};