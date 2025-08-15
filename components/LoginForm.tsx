"use client";

import { useState } from "react";
import { authService } from "@/services/authService";
import { useAuthStore } from "../features/auth/store";
import { FiMail, FiLock, FiEye, FiEyeOff, FiLogIn, FiUser, FiShield, FiTruck, FiUsers, FiCheckCircle } from "react-icons/fi";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Predefined role assignments based on email/username
const ROLE_ASSIGNMENTS = {
  // Admin credentials
  ADMIN: {
    emails: ['admin@company.com', 'superadmin@company.com'],
    usernames: ['admin', 'superadmin'],
    redirectPath: '/admin'
  },
  // Delivery credentials
  DELIVERY: {
    emails: ['delivery@company.com', 'driver@company.com'],
    usernames: ['delivery', 'driver', 'courier'],
    redirectPath: '/delivery'
  },
  // Employee credentials (default for others)
  EMPLOYEE: {
    emails: ['employee@company.com', 'staff@company.com'],
    usernames: ['employee', 'staff'],
    redirectPath: '/employee'
  }
};

// Function to determine user role and redirect path based on email or username
const determineUserRole = (emailOrUsername: string) => {
  const lowercaseInput = emailOrUsername.toLowerCase().trim();

  // Check for admin
  if (ROLE_ASSIGNMENTS.ADMIN.emails.includes(lowercaseInput) || 
      ROLE_ASSIGNMENTS.ADMIN.usernames.includes(lowercaseInput)) {
    return { role: 'ADMIN', redirectPath: ROLE_ASSIGNMENTS.ADMIN.redirectPath };
  }

  // Check for delivery
  if (ROLE_ASSIGNMENTS.DELIVERY.emails.includes(lowercaseInput) || 
      ROLE_ASSIGNMENTS.DELIVERY.usernames.includes(lowercaseInput)) {
    return { role: 'DELIVERY', redirectPath: ROLE_ASSIGNMENTS.DELIVERY.redirectPath };
  }

  // Check for specific employee credentials
  if (ROLE_ASSIGNMENTS.EMPLOYEE.emails.includes(lowercaseInput) || 
      ROLE_ASSIGNMENTS.EMPLOYEE.usernames.includes(lowercaseInput)) {
    return { role: 'EMPLOYEE', redirectPath: ROLE_ASSIGNMENTS.EMPLOYEE.redirectPath };
  }

  // Default to employee for all other users
  return { role: 'EMPLOYEE', redirectPath: ROLE_ASSIGNMENTS.EMPLOYEE.redirectPath };
};

// Function to get role icon and color
const getRoleInfo = (role: string) => {
  switch (role) {
    case 'ADMIN':
      return { icon: FiShield, color: 'text-red-600', bgColor: 'bg-red-50', borderColor: 'border-red-200' };
    case 'DELIVERY':
      return { icon: FiTruck, color: 'text-blue-600', bgColor: 'bg-blue-50', borderColor: 'border-blue-200' };
    case 'EMPLOYEE':
    default:
      return { icon: FiUsers, color: 'text-green-600', bgColor: 'bg-green-50', borderColor: 'border-green-200' };
  }
};

export default function LoginForm() {
  const login = useAuthStore((s) => s.login);
  const socialLogin = useAuthStore((s) => s.socialLogin);
  const loading = useAuthStore((s) => s.loading);
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [detectedRole, setDetectedRole] = useState<string>('EMPLOYEE');
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const { setUser, setToken } = useAuthStore();
  const router = useRouter();

  // Update detected role when email/username changes
  const handleEmailOrUsernameChange = (input: string) => {
    setEmailOrUsername(input);
    if (input.trim()) {
      const { role } = determineUserRole(input);
      setDetectedRole(role);
    } else {
      setDetectedRole('EMPLOYEE');
    }
  };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);
    setIsLoading(true);

    try {
      // Determine redirect path based on credentials
      const { role, redirectPath } = determineUserRole(emailOrUsername);
      
      const { user, token } = await authService.login({ 
        email: emailOrUsername, 
        password 
      });

      // Set user data with role information
      const userWithRole = { ...user, role };
      setUser(userWithRole);
      setToken(token);

      // Show success message
      setSuccessMessage(`Welcome back! Redirecting to ${role.toLowerCase()} dashboard...`);

      // Redirect to appropriate dashboard after a brief delay
      setTimeout(() => {
        router.push(redirectPath);
      }, 1500);

    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setIsLoading(false);
    }
  }

  const handleSocialLogin = async (provider: 'google' | 'github') => {
    setError(null);
    setSuccessMessage(null);
    try {
      await socialLogin(provider);
      // For social login, default to employee dashboard
      router.push('/employee');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : `${provider} login failed`);
    }
  };

  // Get role display info
  const roleInfo = getRoleInfo(detectedRole);
  const RoleIcon = roleInfo.icon;

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white rounded-2xl shadow-soft-lg border border-neutral-200 p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-highlight border border-neutral-200 rounded-full flex items-center justify-center mb-4">
            <FiLogIn className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-neutral-800 mb-2">
            Welcome back
          </h2>
          <p className="text-neutral-600">
            Sign in to your account to continue
          </p>
        </div>

        {/* Role Detection Display */}
        {emailOrUsername && (
          <div className={`mb-6 rounded-lg p-4 ${roleInfo.bgColor} ${roleInfo.borderColor} border`}>
            <div className="flex items-center">
              <RoleIcon className={`w-5 h-5 ${roleInfo.color} mr-3 flex-shrink-0`} />
              <div>
                <p className={`text-sm font-medium ${roleInfo.color}`}>
                  Login as: {detectedRole}
                </p>
                <p className="text-xs text-neutral-600 mt-1">
                  You'll be redirected to the {detectedRole.toLowerCase()} dashboard
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Success Message */}
        {successMessage && (
          <div className="mb-6 rounded-lg p-4 bg-green-50 border border-green-200">
            <div className="flex items-center">
              <FiCheckCircle className="w-5 h-5 text-green-600 mr-3 flex-shrink-0" />
              <p className="text-sm text-green-800">{successMessage}</p>
            </div>
          </div>
        )}

        {/* Login Credentials Guide */}
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h4 className="text-sm font-medium text-blue-800 mb-2">Quick Login Guide:</h4>
          <div className="text-xs text-blue-700 space-y-1">
            <div className="flex items-center">
              <FiShield className="w-3 h-3 mr-2" />
              <span><strong>Admin:</strong> admin@company.com or 'admin'</span>
            </div>
            <div className="flex items-center">
              <FiTruck className="w-3 h-3 mr-2" />
              <span><strong>Delivery:</strong> delivery@company.com or 'delivery'</span>
            </div>
            <div className="flex items-center">
              <FiUsers className="w-3 h-3 mr-2" />
              <span><strong>Employee:</strong> employee@company.com or 'employee'</span>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={onSubmit} className="space-y-6">
          {/* Email/Username Field */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Email or Username
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiUser className="h-5 w-5 text-neutral-400" />
              </div>
              <input
                type="text"
                value={emailOrUsername}
                onChange={(e) => handleEmailOrUsernameChange(e.target.value)}
                required
                className="block w-full pl-10 pr-3 py-3 border border-neutral-200 rounded-lg bg-white text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200"
                placeholder="Enter your email or username"
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiLock className="h-5 w-5 text-neutral-400" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="block w-full pl-10 pr-12 py-3 border border-neutral-200 rounded-lg bg-white text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-neutral-400 hover:text-neutral-600 transition-colors"
              >
                {showPassword ? (
                  <FiEyeOff className="h-5 w-5" />
                ) : (
                  <FiEye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || isLoading}
            className="w-full bg-primary hover:bg-primary-600 disabled:bg-neutral-300 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 disabled:cursor-not-allowed"
          >
            {(loading || isLoading) ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Signing in...
              </>
            ) : (
              <>
                <RoleIcon className="w-5 h-5" />
                Sign in as {detectedRole.toLowerCase()}
              </>
            )}
          </button>
        </form>

        {/* Social Login */}
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-neutral-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-neutral-500">Or continue with</span>
            </div>
          </div>

          <div className="mt-6">
            <button
              type="button"
              onClick={() => handleSocialLogin('google')}
              disabled={loading || isLoading}
              className="w-full inline-flex justify-center py-3 px-4 border border-neutral-200 rounded-lg shadow-sm bg-white text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span className="ml-3 font-medium">Continue with Google</span>
            </button>
          </div>
        </div>

        {/* Demo Credentials */}
        <div className="mt-6 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h4 className="text-xs font-medium text-yellow-800 mb-2">Demo Credentials:</h4>
          <div className="text-xs text-yellow-700 space-y-1">
            <div>Admin: admin@company.com / password123</div>
            <div>Delivery: delivery@company.com / password123</div>
            <div>Employee: employee@company.com / password123</div>
          </div>
        </div>

        {/* Footer Links */}
        <div className="mt-6 text-center">
          <p className="text-sm text-neutral-600">
            Don&apos;t have an account?{" "}
            <Link
              href="/auth/register"
              className="font-medium text-primary hover:text-primary-600 transition-colors underline decoration-primary-200 hover:decoration-primary-300"
            >
              Sign up
            </Link>
          </p>
          <div className="mt-4">
            <Link
              href="/auth/forgot-password"
              className="text-sm text-neutral-500 hover:text-neutral-700 transition-colors underline decoration-neutral-200 hover:decoration-neutral-300"
            >
              Forgot your password?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}