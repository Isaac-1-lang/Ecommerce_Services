"use client";

import { useState } from "react";
import { authService } from "@/services/authService";
import { useAuthStore } from "../features/auth/store";
import { FiMail, FiLock, FiEye, FiEyeOff, FiLogIn, FiUser, FiShield, FiTruck, FiUsers, FiCheckCircle } from "react-icons/fi";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { RoleRedirectPaths, UserRole } from "@/types/auth";

// Hardcoded credentials for admin, employee, and delivery
const HARDCODED_CREDENTIALS = {
  ADMIN: {
    email: 'xyz@gmail.com',
    password: '12345678',
    redirectPath: '/admin'
  },
  EMPLOYEE: {
    email: 'zxy@gmail.com', 
    password: '12345678',
    redirectPath: '/employee'
  },
  DELIVERY: {
    email: 'yzx@gmail.com',
    password: '12345678', 
    redirectPath: '/delivery'
  }
};

// Function to determine user role and redirect path based on hardcoded credentials
const determineUserRole = (email: string) => {
  const lowercaseEmail = email.toLowerCase().trim();

  // Check for hardcoded credentials
  if (lowercaseEmail === HARDCODED_CREDENTIALS.ADMIN.email) {
    return { role: 'admin', redirectPath: HARDCODED_CREDENTIALS.ADMIN.redirectPath };
  }
  
  if (lowercaseEmail === HARDCODED_CREDENTIALS.EMPLOYEE.email) {
    return { role: 'employee', redirectPath: HARDCODED_CREDENTIALS.EMPLOYEE.redirectPath };
  }
  
  if (lowercaseEmail === HARDCODED_CREDENTIALS.DELIVERY.email) {
    return { role: 'delivery', redirectPath: HARDCODED_CREDENTIALS.DELIVERY.redirectPath };
  }

  // Default to CUSTOMER for all other emails
  return { role: 'customer', redirectPath: '/dashboard' };
};

// Function to get role icon and color
const getRoleInfo = (role: string) => {
  switch (role) {
    case 'admin':
      return { icon: FiShield, color: 'text-red-600', bgColor: 'bg-red-50', borderColor: 'border-red-200' };
    case 'delivery':
      return { icon: FiTruck, color: 'text-blue-600', bgColor: 'bg-blue-50', borderColor: 'border-blue-200' };
    case 'employee':
    default:
      return { icon: FiUsers, color: 'text-green-600', bgColor: 'bg-green-50', borderColor: 'border-green-200' };
  }
};

export default function LoginForm() {
  const { setUser, setToken } = useAuthStore();
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [detectedRole, setDetectedRole] = useState<string>('employee');
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const router = useRouter();

  // Update detected role when email/username changes
  const handleEmailOrUsernameChange = (input: string) => {
    setEmailOrUsername(input);
    if (input.trim()) {
      const { role } = determineUserRole(input);
      setDetectedRole(role);
    } else {
      setDetectedRole('employee');
    }
  };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);
    setIsLoading(true);

    try {
      const email = emailOrUsername.toLowerCase().trim();
      // Always authenticate via backend to obtain a valid JWT
      try {
        const { user, token } = await authService.login({
          email: emailOrUsername,
          password
        });

        setUser(user);
        setToken(token);
        localStorage.setItem('authToken', token);
        localStorage.setItem('user', JSON.stringify(user));

        setSuccessMessage('Welcome! Redirecting...');
        const redirect = (RoleRedirectPaths as any)[(user as any).role] || '/dashboard';
        router.replace(redirect);
        setTimeout(() => {
          if (typeof window !== 'undefined' && window.location.pathname !== redirect) {
            window.location.href = redirect;
          }
        }, 300);
        return;
      } catch (loginError) {
        // Fall through to legacy logic below (kept for reference), but backend should handle all
      }
      const { role, redirectPath } = determineUserRole(email);

             // Check for hardcoded credentials first
       if (email === HARDCODED_CREDENTIALS.ADMIN.email && password === HARDCODED_CREDENTIALS.ADMIN.password) {
         // Hardcoded admin login
         const adminUser = {
           id: 'admin-001',
           email: HARDCODED_CREDENTIALS.ADMIN.email,
           firstName: 'Admin',
           lastName: 'User',
           role: UserRole.ADMIN,
           isActive: true,
           createdAt: new Date().toISOString(),
           lastLoginAt: new Date().toISOString(),
         };
        
        setUser(adminUser);
        setToken('admin-token-123');
        localStorage.setItem('authToken', 'admin-token-123');
        localStorage.setItem('user', JSON.stringify(adminUser));
        
        setSuccessMessage('Welcome Admin! Redirecting to admin dashboard...');
        setTimeout(() => router.push('/admin'), 1000);
        return;
      }

             if (email === HARDCODED_CREDENTIALS.EMPLOYEE.email && password === HARDCODED_CREDENTIALS.EMPLOYEE.password) {
         // Hardcoded employee login
         const employeeUser = {
           id: 'employee-001',
           email: HARDCODED_CREDENTIALS.EMPLOYEE.email,
           firstName: 'Employee',
           lastName: 'User',
           role: UserRole.EMPLOYEE,
           isActive: true,
           createdAt: new Date().toISOString(),
           lastLoginAt: new Date().toISOString(),
         };
        
        setUser(employeeUser);
        setToken('employee-token-123');
        localStorage.setItem('authToken', 'employee-token-123');
        localStorage.setItem('user', JSON.stringify(employeeUser));
        
        setSuccessMessage('Welcome Employee! Redirecting to employee dashboard...');
        setTimeout(() => router.push('/employee'), 1000);
        return;
      }

             if (email === HARDCODED_CREDENTIALS.DELIVERY.email && password === HARDCODED_CREDENTIALS.DELIVERY.password) {
         // Hardcoded delivery login
         const deliveryUser = {
           id: 'delivery-001',
           email: HARDCODED_CREDENTIALS.DELIVERY.email,
           firstName: 'Delivery',
           lastName: 'Agent',
           role: UserRole.DELIVERY_AGENT,
           isActive: true,
           createdAt: new Date().toISOString(),
           lastLoginAt: new Date().toISOString(),
         };
        
        setUser(deliveryUser);
        setToken('delivery-token-123');
        localStorage.setItem('authToken', 'delivery-token-123');
        localStorage.setItem('user', JSON.stringify(deliveryUser));
        
        setSuccessMessage('Welcome Delivery Agent! Redirecting to delivery dashboard...');
        setTimeout(() => router.push('/delivery'), 1000);
        return;
      }
      if (role === 'customer') {
        try {
          const { user, token } = await authService.login({ 
            email: emailOrUsername, 
            password 
          });

          setUser(user);
          setToken(token);

          localStorage.setItem('authToken', token);
          localStorage.setItem('user', JSON.stringify(user));

          setSuccessMessage('Welcome! Redirecting to dashboard...');
          // Primary navigation
          router.replace('/dashboard');
          // Hard fallback in case router is blocked in dev
          setTimeout(() => {
            if (typeof window !== 'undefined' && window.location.pathname !== '/dashboard') {
              window.location.href = '/dashboard';
            }
          }, 300);
        } catch (loginError) {
          setError(loginError instanceof Error ? loginError.message : 'Customer login failed. Please check your credentials.');
        }
      } else {
        setError('Invalid credentials for this role. Please use the correct hardcoded credentials.');
      }

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
      // Social login not implemented yet
      setError(`${provider} login is not available yet. Please use email/password login.`);
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
            disabled={isLoading}
            className="w-full bg-primary hover:bg-primary-600 disabled:bg-neutral-300 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 disabled:cursor-not-allowed"
          >
            {isLoading ? (
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