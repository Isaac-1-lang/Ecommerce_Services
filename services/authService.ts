import { AuthUser } from "../features/auth/store";
import api from "../lib/api";
import { parseJavaBoolean, formatJavaDate } from "../lib/javaIntegration";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  username: string;
  email: string;
  password: string;
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

export interface JavaAuthResponse {
  success: boolean;
  data?: {
    user: {
      id: string;
      name: string;
      username: string;
      email: string;
      profilePicture?: string;
      role: string;
      createdAt: string;
      updatedAt: string;
    };
    token: string;
  };
  message?: string;
  error?: string;
}

export const authService = {
  async login({ email, password }: LoginRequest): Promise<{ user: AuthUser; token: string }> {
    try {
      const response = await api.post<JavaAuthResponse>('/v1/auth/users/login', {
        email,
        password
      });

      if (response.data.success && response.data.data) {
        const { user, token } = response.data.data;
        
        const authUser: AuthUser = {
          id: user.id,
          name: user.name,
          username: user.username,
          email: user.email,
          profilePicture: user.profilePicture || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
          role: user.role as any
        };

        // Store token and user data
        localStorage.setItem('authToken', token);
        localStorage.setItem('user', JSON.stringify(authUser));

        return { user: authUser, token };
      } else {
        throw new Error(response.data.message || 'Login failed');
      }
    } catch (error: any) {
      throw new Error(error.response?.data?.message || error.message || 'Login failed');
    }
  },

  async register({ name, username, email, password, profilePicture }: RegisterRequest): Promise<{ id: string; message: string }> {
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('username', username);
      formData.append('email', email);
      formData.append('password', password);
      
      if (profilePicture) {
        formData.append('profilePicture', profilePicture);
      }

      const response = await api.post<JavaAuthResponse>('/v1/auth/users/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        return { 
          id: response.data.data?.user?.id || 'new-user',
          message: response.data.message || "Registration successful! Please check your email to verify your account before signing in."
        };
      } else {
        throw new Error(response.data.message || 'Registration failed');
      }
    } catch (error: any) {
      throw new Error(error.response?.data?.message || error.message || 'Registration failed');
    }
  },

  async forgotPassword({ email }: PasswordResetRequest): Promise<{ message: string }> {
    try {
      const response = await api.post<JavaAuthResponse>('/v1/auth/users/request-password-reset', { email });
      
      if (response.data.success) {
        return { message: response.data.message || "If an account with that email exists, we've sent a password reset link." };
      } else {
        throw new Error(response.data.message || 'Password reset request failed');
      }
    } catch (error: any) {
      throw new Error(error.response?.data?.message || error.message || 'Password reset request failed');
    }
  },

  async verifyResetCode({ email, code }: VerifyCodeRequest): Promise<{ message: string }> {
    try {
      const response = await api.post<JavaAuthResponse>('/v1/auth/users/verify-reset-code', { email, code });
      
      if (response.data.success) {
        return { message: response.data.message || "Code verified successfully." };
      } else {
        throw new Error(response.data.message || 'Invalid verification code');
      }
    } catch (error: any) {
      throw new Error(error.response?.data?.message || error.message || 'Invalid verification code');
    }
  },

  async resetPassword({ email, newPassword }: ResetPasswordRequest): Promise<{ message: string }> {
    try {
      const response = await api.post<JavaAuthResponse>('/v1/auth/users/reset-password', { 
        email, 
        newPassword 
      });
      
      if (response.data.success) {
        return { message: response.data.message || "Password has been reset successfully. You can now sign in with your new password." };
      } else {
        throw new Error(response.data.message || 'Password reset failed');
      }
    } catch (error: any) {
      throw new Error(error.response?.data?.message || error.message || 'Password reset failed');
    }
  },

  async logout(): Promise<{ message: string }> {
    try {
      const token = localStorage.getItem('authToken');
      if (token) {
        await api.post('/v1/auth/users/logout', {}, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      
      // Clear local storage
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      
      return { message: "Logged out successfully" };
    } catch (error: any) {
      // Even if the API call fails, clear local storage
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      
      return { message: "Logged out successfully" };
    }
  },

  async me(): Promise<AuthUser | null> {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) return null;

      const response = await api.get<JavaAuthResponse>('/v1/auth/users/me', {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data.success && response.data.data?.user) {
        const user = response.data.data.user;
        const authUser: AuthUser = {
          id: user.id,
          name: user.name,
          username: user.username,
          email: user.email,
          profilePicture: user.profilePicture || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
          role: user.role as any
        };

        // Update stored user data
        localStorage.setItem('user', JSON.stringify(authUser));
        return authUser;
      }
      return null;
    } catch (error: any) {
      // If token is invalid, clear it
      if (error.response?.status === 401) {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
      }
      return null;
    }
  },

  async validateToken(token: string): Promise<boolean> {
    try {
      if (!token) return false;

      const response = await api.get<JavaAuthResponse>('/v1/auth/users/me', {
        headers: { Authorization: `Bearer ${token}` }
      });

      return response.data.success;
    } catch (error: any) {
      return false;
    }
  },

  // Helper method to get stored user
  getStoredUser(): AuthUser | null {
    try {
      const userStr = localStorage.getItem('user');
      return userStr ? JSON.parse(userStr) : null;
    } catch {
      return null;
    }
  },

  // Helper method to get stored token
  getStoredToken(): string | null {
    return localStorage.getItem('authToken');
  }
};
