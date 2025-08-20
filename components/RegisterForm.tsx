"use client";

import { useState, useRef } from "react";
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff, FiUserPlus, FiCamera, FiX, FiCheckCircle, FiAlertCircle, FiShield, FiTruck, FiUsers, FiCreditCard, FiBuilding, FiKey, FiBriefcase } from "react-icons/fi";
import Link from "next/link";
import { useRouter } from "next/navigation";
import EmailVerificationModal from "./EmailVerificationModal";
import Image from "next/image";
import { authService } from "@/services/authService";
import { UserRole, RegistrationFlow, RoleRedirectPaths, CustomerRegisterData, AdminRegisterData, EmployeeRegisterData } from "@/types/auth";

export default function RegisterForm() {
  const router = useRouter();
  
  // Registration flow state
  const [registrationFlow, setRegistrationFlow] = useState<RegistrationFlow>('customer');
  
  // Common form fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  
  // Admin-specific fields
  const [businessName, setBusinessName] = useState("");
  const [businessAddress, setBusinessAddress] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardholderName, setCardholderName] = useState("");
  
  // Employee-specific fields
  const [adminToken, setAdminToken] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [department, setDepartment] = useState("");
  const [position, setPosition] = useState("");
  
  // UI state
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Role info function
  const getRoleInfo = (flow: RegistrationFlow) => {
    switch (flow) {
      case 'admin':
        return {
          icon: FiShield,
          color: 'text-purple-600',
          bgColor: 'bg-purple-50',
          borderColor: 'border-purple-200',
          title: 'Admin Registration',
          description: 'Register as an administrator with business management capabilities'
        };
      case 'employee':
        return {
          icon: FiUsers,
          color: 'text-green-600',
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200',
          title: 'Employee Registration',
          description: 'Register as an employee with admin-provided token'
        };
      default:
        return {
          icon: FiUser,
          color: 'text-blue-600',
          bgColor: 'bg-blue-50',
          borderColor: 'border-blue-200',
          title: 'Customer Registration',
          description: 'Create a customer account to start shopping'
        };
    }
  };

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
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setMessage(null);
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
    const redirectPath = RoleRedirectPaths[getRoleFromFlow(registrationFlow)];
    router.push(redirectPath);
  };

  const getRoleFromFlow = (flow: RegistrationFlow): UserRole => {
    switch (flow) {
      case 'admin':
        return UserRole.ADMIN;
      case 'employee':
        return UserRole.EMPLOYEE;
      default:
        return UserRole.CUSTOMER;
    }
  };

  const clearForm = () => {
    setFirstName("");
    setLastName("");
    setUsername("");
    setEmail("");
    setPassword("");
    setProfilePicture(null);
    setPreviewUrl("");
    setBusinessName("");
    setBusinessAddress("");
    setCardNumber("");
    setExpiryDate("");
    setCvv("");
    setCardholderName("");
    setAdminToken("");
    setEmployeeId("");
    setDepartment("");
    setPosition("");
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

    if (username.trim().length < 3) {
      setMessage({ type: "error", text: "Username must be at least 3 characters long" });
      return false;
    }

    if (password.length < 8) {
      setMessage({ type: "error", text: "Password must be at least 8 characters long" });
      return false;
    }

    // Role-specific validation
    if (registrationFlow === 'employee' && !adminToken.trim()) {
      setMessage({ type: "error", text: "Admin token is required for employee registration" });
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
      const role = getRoleFromFlow(registrationFlow);
      let registerData: CustomerRegisterData | AdminRegisterData | EmployeeRegisterData;

      // Create role-specific registration data
      switch (registrationFlow) {
        case 'admin':
          registerData = {
            firstName: firstName.trim(),
            lastName: lastName.trim(),
            username: username.trim(),
            email: email.trim().toLowerCase(),
            password,
            role: UserRole.ADMIN,
            profilePicture: profilePicture || undefined,
            businessName: businessName.trim() || undefined,
            businessAddress: businessAddress.trim() || undefined,
            paymentMethod: {
              cardNumber: cardNumber.trim() || undefined,
              expiryDate: expiryDate.trim() || undefined,
              cvv: cvv.trim() || undefined,
              cardholderName: cardholderName.trim() || undefined,
            }
          } as AdminRegisterData;
          break;

        case 'employee':
          registerData = {
            firstName: firstName.trim(),
            lastName: lastName.trim(),
            username: username.trim(),
            email: email.trim().toLowerCase(),
            password,
            role: UserRole.EMPLOYEE,
            profilePicture: profilePicture || undefined,
            adminToken: adminToken.trim(),
            employeeId: employeeId.trim() || undefined,
            department: department.trim() || undefined,
            position: position.trim() || undefined,
          } as EmployeeRegisterData;
          break;

        default:
          registerData = {
            firstName: firstName.trim(),
            lastName: lastName.trim(),
            username: username.trim(),
            email: email.trim().toLowerCase(),
            password,
            role: UserRole.CUSTOMER,
            profilePicture: profilePicture || undefined,
          } as CustomerRegisterData;
      }

      const response = await authService.register(registerData);

      setMessage({
        type: "success",
        text: `Registration successful! You've been registered as a ${registrationFlow}. Redirecting to your dashboard...`
      });

      // Redirect to appropriate dashboard
      setTimeout(() => {
        const redirectPath = RoleRedirectPaths[role];
        router.push(redirectPath);
      }, 2000);

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

  const roleInfo = getRoleInfo(registrationFlow);
  const RoleIcon = roleInfo.icon;

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
              Choose your registration type
            </p>
          </div>

          {/* Registration Flow Selector */}
          <div className="mb-6">
            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setRegistrationFlow('customer')}
                className={`p-3 rounded-lg border-2 transition-all ${
                  registrationFlow === 'customer'
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-neutral-200 bg-white text-neutral-600 hover:border-neutral-300'
                }`}
              >
                <FiUser className="w-6 h-6 mx-auto mb-2" />
                <span className="text-xs font-medium">Customer</span>
              </button>
              <button
                type="button"
                onClick={() => setRegistrationFlow('admin')}
                className={`p-3 rounded-lg border-2 transition-all ${
                  registrationFlow === 'admin'
                    ? 'border-purple-500 bg-purple-50 text-purple-700'
                    : 'border-neutral-200 bg-white text-neutral-600 hover:border-neutral-300'
                }`}
              >
                <FiShield className="w-6 h-6 mx-auto mb-2" />
                <span className="text-xs font-medium">Admin</span>
              </button>
              <button
                type="button"
                onClick={() => setRegistrationFlow('employee')}
                className={`p-3 rounded-lg border-2 transition-all ${
                  registrationFlow === 'employee'
                    ? 'border-green-500 bg-green-50 text-green-700'
                    : 'border-neutral-200 bg-white text-neutral-600 hover:border-neutral-300'
                }`}
              >
                <FiUsers className="w-6 h-6 mx-auto mb-2" />
                <span className="text-xs font-medium">Employee</span>
              </button>
            </div>
          </div>

          {/* Role Info Display */}
          <div className={`mb-6 rounded-lg p-4 ${roleInfo.bgColor} ${roleInfo.borderColor} border`}>
            <div className="flex items-center">
              <RoleIcon className={`w-5 h-5 ${roleInfo.color} mr-3 flex-shrink-0`} />
              <div>
                <p className={`text-sm font-medium ${roleInfo.color}`}>
                  {roleInfo.title}
                </p>
                <p className="text-xs text-neutral-600 mt-1">
                  {roleInfo.description}
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
                Click the camera icon to upload a photo (Max 5MB)
              </p>
            </div>

            {/* Common Fields */}
            <div className="grid grid-cols-2 gap-4">
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
                    maxLength={50}
                    className="block w-full pl-10 pr-3 py-3 border border-neutral-300 rounded-lg bg-white text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200"
                    placeholder="First name"
                  />
                </div>
              </div>

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
                    maxLength={50}
                    className="block w-full pl-10 pr-3 py-3 border border-neutral-300 rounded-lg bg-white text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200"
                    placeholder="Last name"
                  />
                </div>
              </div>
            </div>

            {/* Username Field */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Username *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiUser className="h-5 w-5 text-neutral-400" />
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9._-]/g, ''))}
                  required
                  minLength={3}
                  maxLength={30}
                  pattern="^[a-zA-Z0-9._-]+$"
                  className="block w-full pl-10 pr-3 py-3 border border-neutral-300 rounded-lg bg-white text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200"
                  placeholder="Choose a unique username"
                />
              </div>
              <p className="mt-1 text-xs text-neutral-500">
                Letters, numbers, dots, underscores, hyphens only
              </p>
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

            {/* Admin-specific fields */}
            {registrationFlow === 'admin' && (
              <div className="space-y-4 border-t pt-4">
                <h4 className="text-sm font-medium text-purple-700 flex items-center">
                  <FiBuilding className="w-4 h-4 mr-2" />
                  Business Information (Optional)
                </h4>
                
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Business Name
                  </label>
                  <input
                    type="text"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    className="block w-full px-3 py-3 border border-neutral-300 rounded-lg bg-white text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
                    placeholder="Enter business name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Business Address
                  </label>
                  <textarea
                    value={businessAddress}
                    onChange={(e) => setBusinessAddress(e.target.value)}
                    rows={2}
                    className="block w-full px-3 py-3 border border-neutral-300 rounded-lg bg-white text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
                    placeholder="Enter business address"
                  />
                </div>

                <h4 className="text-sm font-medium text-purple-700 flex items-center mt-6">
                  <FiCreditCard className="w-4 h-4 mr-2" />
                  Payment Information (Optional)
                </h4>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Cardholder Name
                  </label>
                  <input
                    type="text"
                    value={cardholderName}
                    onChange={(e) => setCardholderName(e.target.value)}
                    className="block w-full px-3 py-3 border border-neutral-300 rounded-lg bg-white text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
                    placeholder="Name on card"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Card Number
                  </label>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, '').slice(0, 16))}
                    className="block w-full px-3 py-3 border border-neutral-300 rounded-lg bg-white text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
                    placeholder="1234 5678 9012 3456"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      value={expiryDate}
                      onChange={(e) => setExpiryDate(e.target.value.replace(/\D/g, '').slice(0, 4))}
                      className="block w-full px-3 py-3 border border-neutral-300 rounded-lg bg-white text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
                      placeholder="MMYY"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      CVV
                    </label>
                    <input
                      type="text"
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 4))}
                      className="block w-full px-3 py-3 border border-neutral-300 rounded-lg bg-white text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
                      placeholder="123"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Employee-specific fields */}
            {registrationFlow === 'employee' && (
              <div className="space-y-4 border-t pt-4">
                <h4 className="text-sm font-medium text-green-700 flex items-center">
                  <FiKey className="w-4 h-4 mr-2" />
                  Employee Information
                </h4>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Admin Token *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiKey className="h-5 w-5 text-neutral-400" />
                    </div>
                    <input
                      type="text"
                      value={adminToken}
                      onChange={(e) => setAdminToken(e.target.value)}
                      required
                      className="block w-full pl-10 pr-3 py-3 border border-neutral-300 rounded-lg bg-white text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                      placeholder="Enter admin-provided token"
                    />
                  </div>
                  <p className="mt-1 text-xs text-neutral-500">
                    This token must be provided by an administrator
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Employee ID
                  </label>
                  <input
                    type="text"
                    value={employeeId}
                    onChange={(e) => setEmployeeId(e.target.value)}
                    className="block w-full px-3 py-3 border border-neutral-300 rounded-lg bg-white text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                    placeholder="Enter employee ID"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Department
                    </label>
                    <input
                      type="text"
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      className="block w-full px-3 py-3 border border-neutral-300 rounded-lg bg-white text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                      placeholder="e.g., Sales, IT"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Position
                    </label>
                    <input
                      type="text"
                      value={position}
                      onChange={(e) => setPosition(e.target.value)}
                      className="block w-full px-3 py-3 border border-neutral-300 rounded-lg bg-white text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                      placeholder="e.g., Manager, Associate"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary hover:bg-primary-600 disabled:bg-neutral-300 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 disabled:cursor-not-allowed shadow-soft"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Creating account...
                </>
              ) : (
                <>
                  <RoleIcon className="w-5 h-5" />
                  Create {registrationFlow} account
                </>
              )}
            </button>
          </form>

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