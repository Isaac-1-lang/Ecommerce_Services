// types/auth.ts
export interface AuthUser {
  id: string;
  name: string;
  username: string;
  email: string;
  profilePicture?: string;
  role: 'user' | 'admin';
}
