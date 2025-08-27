"use client";

import { useState, useEffect } from "react";
import { ShippingInfo } from "../features/checkout/store";

interface AddressFormProps {
  data: ShippingInfo;
  onChange: (info: ShippingInfo) => void;
  onSubmit: () => void;
}

export default function AddressForm({ data, onChange, onSubmit }: AddressFormProps) {
  const [formData, setFormData] = useState<ShippingInfo>(data);
  const [errors, setErrors] = useState<Partial<ShippingInfo>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setFormData(data);
  }, [data]);

  const handleInputChange = (field: keyof ShippingInfo, value: string) => {
    const newData = { ...formData, [field]: value };
    setFormData(newData);
    onChange(newData);
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  // Format phone number as user types
  const handlePhoneChange = (value: string) => {
    // Remove all non-digit characters except +
    let cleaned = value.replace(/[^\d+]/g, '');
    
    // Ensure only one + at the beginning
    if (cleaned.startsWith('+')) {
      cleaned = '+' + cleaned.substring(1).replace(/\+/g, '');
    }
    
    // Limit to 15 characters (international standard)
    if (cleaned.length > 15) {
      cleaned = cleaned.substring(0, 15);
    }
    
    handleInputChange('phone', cleaned);
  };

  // Format ZIP code as user types
  const handleZipCodeChange = (value: string) => {
    // Remove all non-alphanumeric characters
    let cleaned = value.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
    
    // Limit to 10 characters (for ZIP+4 format)
    if (cleaned.length > 10) {
      cleaned = cleaned.substring(0, 10);
    }
    
    handleInputChange('zipCode', cleaned);
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<ShippingInfo> = {};

    // First Name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    } else if (formData.firstName.trim().length < 2) {
      newErrors.firstName = "First name must be at least 2 characters";
    } else if (!/^[a-zA-Z\s'-]+$/.test(formData.firstName.trim())) {
      newErrors.firstName = "First name can only contain letters, spaces, hyphens, and apostrophes";
    }

    // Last Name validation
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    } else if (formData.lastName.trim().length < 2) {
      newErrors.lastName = "Last name must be at least 2 characters";
    } else if (!/^[a-zA-Z\s'-]+$/.test(formData.lastName.trim())) {
      newErrors.lastName = "Last name can only contain letters, spaces, hyphens, and apostrophes";
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address";
    }

    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\+?[1-9]\d{1,14}$/.test(formData.phone.trim())) {
      newErrors.phone = "Please enter a valid phone number (e.g., +1234567890 or 1234567890)";
    }

    // Address validation
    if (!formData.address.trim()) {
      newErrors.address = "Street address is required";
    } else if (formData.address.trim().length < 5) {
      newErrors.address = "Please enter a complete street address";
    }

    // City validation
    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    } else if (formData.city.trim().length < 2) {
      newErrors.city = "City name must be at least 2 characters";
    } else if (!/^[a-zA-Z\s'-]+$/.test(formData.city.trim())) {
      newErrors.city = "City name can only contain letters, spaces, hyphens, and apostrophes";
    }

    // State validation
    if (!formData.state.trim()) {
      newErrors.state = "State is required";
    } else if (formData.state.trim().length < 2) {
      newErrors.state = "State name must be at least 2 characters";
    } else if (!/^[a-zA-Z\s'-]+$/.test(formData.state.trim())) {
      newErrors.state = "State name can only contain letters, spaces, hyphens, and apostrophes";
    }

    // ZIP Code validation
    if (!formData.zipCode.trim()) {
      newErrors.zipCode = "ZIP code is required";
    } else if (!/^\d{5}(-\d{4})?$/.test(formData.zipCode.trim())) {
      newErrors.zipCode = "Please enter a valid ZIP code (e.g., 12345 or 12345-6789)";
    }

    // Country validation
    if (!formData.country.trim()) {
      newErrors.country = "Country is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        await onSubmit();
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {/* First Name */}
        <div>
          <label htmlFor="firstName" className="block text-base font-semibold text-gray-700 dark:text-gray-300 mb-3">
            First Name *
          </label>
          <input
            type="text"
            id="firstName"
            value={formData.firstName}
            onChange={(e) => handleInputChange('firstName', e.target.value)}
            placeholder="John"
            className={`mt-1 block w-full rounded-xl border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base px-4 py-3 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-blue-400 dark:focus:ring-blue-400 transition-all duration-200 ${
              errors.firstName ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : ''
            }`}
            maxLength={50}
          />
          {errors.firstName && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center">
              <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2"></span>
              {errors.firstName}
            </p>
          )}
        </div>

        {/* Last Name */}
        <div>
          <label htmlFor="lastName" className="block text-base font-semibold text-gray-700 dark:text-gray-300 mb-3">
            Last Name *
          </label>
          <input
            type="text"
            id="lastName"
            value={formData.lastName}
            onChange={(e) => handleInputChange('lastName', e.target.value)}
            placeholder="Doe"
            className={`mt-1 block w-full rounded-xl border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base px-4 py-3 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-blue-400 dark:focus:ring-blue-400 transition-all duration-200 ${
              errors.lastName ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : ''
            }`}
            maxLength={50}
          />
          {errors.lastName && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center">
              <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2"></span>
              {errors.lastName}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-base font-semibold text-gray-700 dark:text-gray-300 mb-3">
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            placeholder="john.doe@example.com"
            className={`mt-1 block w-full rounded-xl border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base px-4 py-3 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-blue-400 dark:focus:ring-blue-400 transition-all duration-200 ${
              errors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : ''
            }`}
            maxLength={100}
          />
          {errors.email && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center">
              <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2"></span>
              {errors.email}
            </p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block text-base font-semibold text-gray-700 dark:text-gray-300 mb-3">
            Phone Number *
          </label>
          <input
            type="tel"
            id="phone"
            value={formData.phone}
            onChange={(e) => handlePhoneChange(e.target.value)}
            placeholder="+1234567890"
            className={`mt-1 block w-full rounded-xl border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base px-4 py-3 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-blue-400 dark:focus:ring-blue-400 transition-all duration-200 ${
              errors.phone ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : ''
            }`}
            maxLength={15}
          />
          <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
            Format: +1234567890 or 1234567890 (no spaces, dashes, or parentheses)
          </p>
          {errors.phone && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center">
              <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2"></span>
              {errors.phone}
            </p>
          )}
        </div>

        {/* Address */}
        <div className="sm:col-span-2">
          <label htmlFor="address" className="block text-base font-semibold text-gray-700 dark:text-gray-300 mb-3">
            Street Address *
          </label>
          <input
            type="text"
            id="address"
            value={formData.address}
            onChange={(e) => handleInputChange('address', e.target.value)}
            placeholder="123 Main Street, Apt 4B"
            className={`mt-1 block w-full rounded-xl border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base px-4 py-3 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-blue-400 dark:focus:ring-blue-400 transition-all duration-200 ${
              errors.address ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : ''
            }`}
            maxLength={100}
          />
          {errors.address && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center">
              <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2"></span>
              {errors.address}
            </p>
          )}
        </div>

        {/* City */}
        <div>
          <label htmlFor="city" className="block text-base font-semibold text-gray-700 dark:text-gray-300 mb-3">
            City *
          </label>
          <input
            type="text"
            id="city"
            value={formData.city}
            onChange={(e) => handleInputChange('city', e.target.value)}
            placeholder="New York"
            className={`mt-1 block w-full rounded-xl border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base px-4 py-3 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-blue-400 dark:focus:ring-blue-400 transition-all duration-200 ${
              errors.city ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : ''
            }`}
            maxLength={50}
          />
          {errors.city && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center">
              <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2"></span>
              {errors.city}
            </p>
          )}
        </div>

        {/* State */}
        <div>
          <label htmlFor="state" className="block text-base font-semibold text-gray-700 dark:text-gray-300 mb-3">
            State/Province *
          </label>
          <input
            type="text"
            id="state"
            value={formData.state}
            onChange={(e) => handleInputChange('state', e.target.value)}
            placeholder="NY"
            className={`mt-1 block w-full rounded-xl border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base px-4 py-3 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-blue-400 dark:focus:ring-blue-400 transition-all duration-200 ${
              errors.state ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : ''
            }`}
            maxLength={50}
          />
          {errors.state && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center">
              <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2"></span>
              {errors.state}
            </p>
          )}
        </div>

        {/* ZIP Code */}
        <div>
          <label htmlFor="zipCode" className="block text-base font-semibold text-gray-700 dark:text-gray-300 mb-3">
            ZIP/Postal Code *
          </label>
          <input
            type="text"
            id="zipCode"
            value={formData.zipCode}
            onChange={(e) => handleZipCodeChange(e.target.value)}
            placeholder="12345"
            className={`mt-1 block w-full rounded-xl border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base px-4 py-3 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-blue-400 dark:focus:ring-blue-400 transition-all duration-200 ${
              errors.zipCode ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : ''
            }`}
            maxLength={10}
          />
          <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
            Format: 12345 or 12345-6789
          </p>
          {errors.zipCode && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center">
              <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2"></span>
              {errors.zipCode}
            </p>
          )}
        </div>

        {/* Country */}
        <div>
          <label htmlFor="country" className="block text-base font-semibold text-gray-700 dark:text-gray-300 mb-3">
            Country *
          </label>
          <select
            id="country"
            value={formData.country}
            onChange={(e) => handleInputChange('country', e.target.value)}
            className={`mt-1 block w-full rounded-xl border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base px-4 py-3 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-blue-400 dark:focus:ring-blue-400 transition-all duration-200 ${
              errors.country ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : ''
            }`}
          >
            <option value="">Select a country</option>
            <option value="United States">United States</option>
            <option value="Canada">Canada</option>
            <option value="United Kingdom">United Kingdom</option>
            <option value="Germany">Germany</option>
            <option value="France">France</option>
            <option value="Australia">Australia</option>
            <option value="Japan">Japan</option>
            <option value="South Korea">South Korea</option>
            <option value="Singapore">Singapore</option>
            <option value="India">India</option>
            <option value="Brazil">Brazil</option>
            <option value="Mexico">Mexico</option>
            <option value="Other">Other</option>
          </select>
          {errors.country && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center">
              <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2"></span>
              {errors.country}
            </p>
          )}
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-semibold rounded-xl shadow-lg text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02]"
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin -ml-1 mr-3 h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
              Saving...
            </>
          ) : (
            'Save Address & Continue'
          )}
        </button>
      </div>
    </form>
  );
}
