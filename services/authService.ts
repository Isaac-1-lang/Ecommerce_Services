import { AuthUser } from "../features/auth/store";

async function wait(ms = 300) { return new Promise((res) => setTimeout(res, ms)); }

export const authService = {
  async login({ emailOrUsername, password }: { emailOrUsername: string; password: string }): Promise<{ user: AuthUser; token: string }> {
    await wait();
    // Mock validation
    if (!emailOrUsername || !password) {
      throw new Error("Email/Username and password are required");
    }
    
    // Mock user data - in real app, this would check against database
    const isEmail = emailOrUsername.includes('@');
    const mockUser: AuthUser = {
      id: "1", 
      name: isEmail ? emailOrUsername.split("@")[0] || "User" : emailOrUsername,
      username: isEmail ? emailOrUsername.split("@")[0] || "user" : emailOrUsername,
      email: isEmail ? emailOrUsername : `${emailOrUsername}@example.com`,
      profilePicture: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    };
    
    return {
      user: mockUser,
      token: "mock-jwt-token-" + Date.now(),
    };
  },

  async register({ name, username, email, password, profilePicture }: { 
    name: string; 
    username: string;
    email: string; 
    password: string;
    profilePicture?: File;
  }): Promise<{ id: string; message: string }> {
    await wait();
    // Mock validation
    if (!name || !username || !email || !password) {
      throw new Error("All fields are required");
    }
    if (password.length < 6) {
      throw new Error("Password must be at least 6 characters");
    }
    if (username.length < 3) {
      throw new Error("Username must be at least 3 characters");
    }
    
    // Mock profile picture upload
    let profilePictureUrl = undefined;
    if (profilePicture) {
      // In real app, this would upload to cloud storage
      profilePictureUrl = `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face&t=${Date.now()}`;
    }
    
    return { 
      id: "new-user-id-" + Date.now(),
      message: "Registration successful! Please check your email to verify your account before signing in."
    };
  },

  async forgotPassword({ email }: { email: string }): Promise<{ message: string }> {
    await wait();
    if (!email) {
      throw new Error("Email is required");
    }
    return { 
      message: "If an account with that email exists, we've sent a password reset link."
    };
  },

  async resetPassword({ token, password }: { token: string; password: string }): Promise<{ message: string }> {
    await wait();
    if (!token || !password) {
      throw new Error("Token and new password are required");
    }
    if (password.length < 6) {
      throw new Error("Password must be at least 6 characters");
    }
    return { 
      message: "Password has been reset successfully. You can now sign in with your new password."
    };
  },

  async verifyEmail({ token }: { token: string }): Promise<{ message: string }> {
    await wait();
    if (!token) {
      throw new Error("Verification token is required");
    }
    return { 
      message: "Email verified successfully! You can now sign in to your account."
    };
  },

  async resendVerification({ email }: { email: string }): Promise<{ message: string }> {
    await wait();
    if (!email) {
      throw new Error("Email is required");
    }
    return { 
      message: "Verification email has been sent. Please check your inbox."
    };
  },

  async socialLogin(provider: 'google' | 'github'): Promise<{ user: AuthUser; token: string }> {
    await wait();
    
    // Mock social login - in real app, this would integrate with OAuth providers
    const mockUser: AuthUser = {
      id: "social-user-" + Date.now(),
      name: provider === 'google' ? "Google User" : "GitHub User",
      username: provider === 'google' ? "googleuser" : "githubuser",
      email: `${provider}user@example.com`,
      profilePicture: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    };
    
    return {
      user: mockUser,
      token: `mock-${provider}-token-` + Date.now(),
    };
  },

  async me(token: string): Promise<AuthUser> {
    await wait();
    if (!token) return null;
    // Mock token validation
    if (token.includes("mock-jwt-token") || token.includes("mock-google-token") || token.includes("mock-github-token")) {
      return { 
        id: "1", 
        name: "User", 
        username: "user",
        email: "user@example.com",
        profilePicture: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
      };
    }
    return null;
  },

  async validateToken(token: string): Promise<boolean> {
    await wait();
    return Boolean(token && (token.includes("mock-jwt-token") || token.includes("mock-google-token") || token.includes("mock-github-token")));
  },
};
