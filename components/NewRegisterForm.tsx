"use client";

import { useState, useRef } from "react";
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff, FiUserPlus, FiCamera, FiX, FiCheckCircle, FiAlertCircle, FiShield } from "react-icons/fi";
import Link from "next/link";
import { useRouter } from "next/navigation";
import EmailVerificationModal from "./EmailVerificationModal";
import Image from "next/image";
import { authService } from "../services/authService";
import { UserRole, CustomerRegisterData } from "../types/auth";

export default function NewRegisterForm() {
  const router = useRouter();
  
  // Common form fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  
  // UI state
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setMessage({
          type: "error",
          text: "Profile picture must be less than 5MB"
        });
        return;
      }

      if (!file.type.startsWith('image/')) {
        setMessage({
          type: "error",
          text: "Please select a valid image file"
        });
        return;
      }

      setProfilePicture(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewUrl(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeProfilePicture = () => {
    setProfilePicture(null);
    setPreviewUrl("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleCloseVerificationModal = () => {
    setShowVerificationModal(false);
  };

  const clearForm = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setProfilePicture(null);
    setPreviewUrl("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const validateForm = (): boolean => {
    // Common validation
    if (firstName.trim().length < 2) {
      setMessage({ type: "error", text: "First name must be at least 2 characters long" });
      return false;
    }

    if (lastName.trim().length < 2) {
      setMessage({ type: "error", text: "Last name must be at least 2 characters long" });
      return false;
    }

    if (password.length < 8) {
      setMessage({ type: "error", text: "Password must be at least 8 characters long" });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setIsLoading(true);

    if (!validateForm()) {
      setIsLoading(false);
      return;
    }

    try {
      // Only customer registration is allowed
      const registerData: CustomerRegisterData = {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim().toLowerCase(),
        password,
        role: UserRole.CUSTOMER,
        profilePicture: profilePicture || undefined,
      };

      const response = await authService.register(registerData);

      setMessage({
        type: "success",
        text: "Registration successful! You've been registered as a customer. Redirecting to your dashboard..."
      });

      // Store user data and token
      if (response.user && response.token) {
        // Store in localStorage for authentication
        localStorage.setItem("authToken", response.token);
        localStorage.setItem("user", JSON.stringify(response.user));
      }

      // Redirect to customer dashboard immediately
      setTimeout(() => {
        router.push('/dashboard');
      }, 1000);

      clearForm();

    } catch (err: unknown) {
      console.error('Registration error:', err);
      setMessage({
        type: "error",
        text: err instanceof Error ? err.message : "Registration failed. Please try again."
      });
    } finally {
      setIsLoading(false);
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
              Create Customer Account
            </h2>
            <p className="text-neutral-600">
              Register as a customer to start shopping
            </p>
          </div>

          {/* Customer Registration Info */}
          <div className="mb-6 rounded-lg p-4 bg-blue-50 border border-blue-200">
            <div className="flex items-center">
              <FiUser className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-blue-600">
                  Customer Registration
                </p>
                <p className="text-xs text-neutral-600 mt-1">
                  Create a customer account to browse products and make purchases
                </p>
              </div>
            </div>
          </div>

          {/* Admin/Employee Notice */}
          <div className="mb-6 rounded-lg p-4 bg-yellow-50 border border-yellow-200">
            <div className="flex items-center">
              <FiShield className="w-5 h-5 text-yellow-600 mr-3 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-yellow-800">
                  Admin & Employee Access
                </p>
                <p className="text-xs text-yellow-700 mt-1">
                  Admins and employees use hardcoded credentials. Please contact your administrator for access.
                </p>
              </div>
            </div>
          </div>

          {/* Success/Error Message */}
          {message && (
            <div className={`mb-6 rounded-lg p-4 ${
              message.type === "success" 
                ? "bg-green-50 border border-green-200" 
                : "bg-red-50 border border-red-200"
            }`}>
              <div className="flex items-center">
                {message.type === "success" ? (
                  <FiCheckCircle className="w-5 h-5 text-green-600 mr-3 flex-shrink-0" />
                ) : (
                  <FiAlertCircle className="w-5 h-5 text-red-600 mr-3 flex-shrink-0" />
                )}
                <p className={`text-sm ${
                  message.type === "success" 
                    ? "text-green-800" 
                    : "text-red-800"
                }`}>
                  {message.text}
                </p>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
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
                    <FiUser className="w-8 h-8 text-neutral-400" />
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute bottom-0 right-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center hover:bg-primary-dark transition-colors"
                >
                  <FiCamera className="w-4 h-4" />
                </button>
                {previewUrl && (
                  <button
                    type="button"
                    onClick={removeProfilePicture}
                    className="absolute top-0 right-0 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
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
            </div>

            {/* First Name Field */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                First name *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiUser className="h-5 w-5 text-neutral-400" />
                </div>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  minLength={2}
                  className="block w-full pl-10 pr-3 py-3 border border-neutral-300 rounded-lg bg-white text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200"
                  placeholder="Enter your first name"
                />
              </div>
            </div>

            {/* Last Name Field */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Last name *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiUser className="h-5 w-5 text-neutral-400" />
                </div>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  minLength={2}
                  className="block w-full pl-10 pr-3 py-3 border border-neutral-300 rounded-lg bg-white text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200"
                  placeholder="Enter your last name"
                />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Email address *
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
                Password *
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
                  minLength={8}
                  className="block w-full pl-10 pr-12 py-3 border border-neutral-300 rounded-lg bg-white text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200"
                  placeholder="Create a strong password"
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

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary text-white py-3 px-4 rounded-lg font-medium hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Creating account..." : "Create account"}
            </button>

            {/* Login Link */}
            <div className="text-center">
              <p className="text-sm text-neutral-600">
                Already have an account?{" "}
                <Link href="/auth/login" className="text-primary hover:text-primary-dark font-medium transition-colors">
                  Sign in
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>

      {/* Email Verification Modal */}
      {showVerificationModal && (
        <EmailVerificationModal
          isOpen={showVerificationModal}
          email={email}
          onClose={handleCloseVerificationModal}
        />
      )}
    </>
  );
}
