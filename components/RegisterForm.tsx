"use client";

import { useState, useRef } from "react";
import { useAuthStore } from "../features/auth/store";
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff, FiUserPlus, FiCamera, FiX } from "react-icons/fi";
import Link from "next/link";
import EmailVerificationModal from "./EmailVerificationModal";
import Image from "next/image";

export default function RegisterForm() {
  const register = useAuthStore((s) => s.register);
  const socialLogin = useAuthStore((s) => s.socialLogin);
  const loading = useAuthStore((s) => s.loading);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<"success" | "error">("success");
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfilePicture(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const removeProfilePicture = () => {
    setProfilePicture(null);
    setPreviewUrl("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);
    try {
      await register({ name, username, email, password, profilePicture: profilePicture || undefined });
      setMessageType("success");
      setMessage("Account created successfully! Please check your email to verify your account before signing in.");
      setShowVerificationModal(true);
      // Don't clear the form yet, let user see the modal first
    } catch (err: unknown) {
      setMessageType("error");
      setMessage(err instanceof Error ? err.message : "Registration failed");
    }
  }

  const handleCloseVerificationModal = () => {
    setShowVerificationModal(false);
    // Clear the form after modal is closed
    setName("");
    setUsername("");
    setEmail("");
    setPassword("");
    setProfilePicture(null);
    setPreviewUrl("");
    setMessage(null);
  };

  const handleSocialLogin = async (provider: 'google' | 'github') => {
    setMessage(null);
    try {
      await socialLogin(provider);
    } catch (err: unknown) {
      setMessageType("error");
      setMessage(err instanceof Error ? err.message : `${provider} login failed`);
    }
  };

  return (
    <>
      <div className="w-full max-w-md mx-auto">
        <div className="bg-white rounded-2xl shadow-soft-lg border border-neutral-200 p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 bg-highlight rounded-full flex items-center justify-center mb-4">
              <FiUserPlus className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-neutral-800 mb-2">
              Create account
            </h2>
            <p className="text-neutral-600">
              Join us and start shopping today
            </p>
          </div>

          {/* Form */}
          <form onSubmit={onSubmit} className="space-y-6">
            {/* Profile Picture Upload */}
            <div className="text-center">
              <label className="block text-sm font-medium text-neutral-700 mb-3">
                Profile Picture (Optional)
              </label>
              <div className="relative inline-block">
                <div className="w-24 h-24 rounded-full border-2 border-neutral-200 overflow-hidden bg-neutral-100 flex items-center justify-center">
                  {previewUrl ? (
                    <Image
                      src={previewUrl} 
                      alt="Profile preview" 
                      width={96}
                      height={96}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <FiUser className="w-12 h-12 text-neutral-400" />
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute bottom-0 right-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors shadow-soft"
                >
                  <FiCamera className="w-4 h-4" />
                </button>
                {previewUrl && (
                  <button
                    type="button"
                    onClick={removeProfilePicture}
                    className="absolute top-0 right-0 w-6 h-6 bg-error text-white rounded-full flex items-center justify-center hover:bg-error-600 transition-colors text-xs"
                  >
                    <FiX className="w-3 h-3" />
                  </button>
                )}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleProfilePictureChange}
                className="hidden"
              />
              <p className="mt-2 text-xs text-neutral-500">
                Click the camera icon to upload a photo
              </p>
            </div>

            {/* Name Field */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Full name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiUser className="h-5 w-5 text-neutral-400" />
                </div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="block w-full pl-10 pr-3 py-3 border border-neutral-300 rounded-lg bg-white text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200"
                  placeholder="Enter your full name"
                />
              </div>
            </div>

            {/* Username Field */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiUser className="h-5 w-5 text-neutral-400" />
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="block w-full pl-10 pr-3 py-3 border border-neutral-300 rounded-lg bg-white text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200"
                  placeholder="Choose a unique username"
                />
              </div>
              <p className="mt-1 text-xs text-neutral-500">
                Username must be at least 3 characters long
              </p>
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMail className="h-5 w-5 text-neutral-400" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="block w-full pl-10 pr-3 py-3 border border-neutral-300 rounded-lg bg-white text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200"
                  placeholder="Enter your email"
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
                  className="block w-full pl-10 pr-12 py-3 border border-neutral-300 rounded-lg bg-white text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200"
                  placeholder="Create a password"
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
              <p className="mt-1 text-xs text-neutral-500">
                Password must be at least 8 characters long
              </p>
            </div>

            {/* Message */}
            {message && (
              <div className={`rounded-lg p-3 ${
                messageType === "success" 
                  ? "bg-success-50 border border-success-200" 
                  : "bg-error-50 border border-error-200"
              }`}>
                <p className={`text-sm ${
                  messageType === "success" 
                    ? "text-success-600" 
                    : "text-error-600"
                }`}>
                  {message}
                </p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-primary-600 disabled:bg-neutral-300 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 disabled:cursor-not-allowed shadow-soft"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Creating account...
                </>
              ) : (
                <>
                  <FiUserPlus className="w-5 h-5" />
                  Create account
                </>
              )}
            </button>
          </form>

          {/* Social Registration */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-neutral-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-neutral-500">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleSocialLogin('google')}
                disabled={loading}
                className="w-full inline-flex justify-center py-2 px-4 border border-neutral-200 rounded-lg shadow-sm bg-white text-sm font-medium text-neutral-500 hover:bg-neutral-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span className="ml-2">Google</span>
              </button>

              <button
                type="button"
                onClick={() => handleSocialLogin('github')}
                disabled={loading}
                className="w-full inline-flex justify-center py-2 px-4 border border-neutral-200 rounded-lg shadow-sm bg-white text-sm font-medium text-neutral-500 hover:bg-neutral-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                <span className="ml-2">GitHub</span>
              </button>
            </div>
          </div>

          {/* Footer Links */}
          <div className="mt-6 text-center">
            <p className="text-sm text-neutral-600">
              Already have an account?{" "}
              <Link
                href="/auth/login"
                className="font-medium text-primary hover:text-primary-600 transition-colors"
              >
                Sign in
              </Link>
            </p>
            <p className="mt-2 text-xs text-neutral-500">
              By creating an account, you agree to our{" "}
              <Link href="/terms" className="text-primary hover:text-primary-600">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-primary hover:text-primary-600">
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Email Verification Modal */}
      <EmailVerificationModal
        isOpen={showVerificationModal}
        onClose={handleCloseVerificationModal}
        email={email}
      />
    </>
  );
}
