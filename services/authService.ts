import { AuthUser } from "../features/auth/store";

async function wait(ms = 300) { return new Promise((res) => setTimeout(res, ms)); }

export const authService = {
  async login({ email }: { email: string; password: string }): Promise<{ user: AuthUser; token: string }> {
    await wait();
    return {
      user: { id: "1", name: email.split("@")[0] || "User", email },
      token: "mock-token",
    };
  },
  async register({ name, email }: { name: string; email: string; password: string }): Promise<{ id: string }> {
    await wait();
    return { id: "new-user-id" };
  },
  async me(token: string): Promise<AuthUser> {
    await wait();
    if (!token) return null;
    return { id: "1", name: "User", email: "user@example.com" };
  },
};
