import { AuthUser } from "../features/auth/store";

async function wait(ms = 300) { return new Promise((res) => setTimeout(res, ms)); }

export const authService = {
  async login({ email, password }: { email: string; password: string }): Promise<{ user: AuthUser; token: string }> {
    await wait();
    // Mock validation
    if (!email || !password) {
      throw new Error("Email and password are required");
    }
    return {
      user: { id: "1", name: email.split("@")[0] || "User", email },
      token: "mock-jwt-token-" + Date.now(),
    };
  },

  async register({ name, email, password }: { name: string; email: string; password: string }): Promise<{ id: string; message: string }> {
    await wait();
    // Mock validation
    if (!name || !email || !password) {
      throw new Error("All fields are required");
    }
    if (password.length < 6) {
      throw new Error("Password must be at least 6 characters");
    }
    return { 
      id: "new-user-id-" + Date.now(),
      message: "Registration successful! Please check your email to verify your account."
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

  async me(token: string): Promise<AuthUser> {
    await wait();
    if (!token) return null;
    // Mock token validation
    if (token.includes("mock-jwt-token")) {
      return { id: "1", name: "User", email: "user@example.com" };
    }
    return null;
  },

  async validateToken(token: string): Promise<boolean> {
    await wait();
    return Boolean(token && token.includes("mock-jwt-token"));
  },
};
