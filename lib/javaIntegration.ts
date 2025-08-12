// Java Backend Integration Helper
// This file contains utilities and configurations specific to Java backend integration

export interface JavaApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  timestamp?: string;
  status: number;
}

export interface JavaPaginationResponse<T = any> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
  numberOfElements: number;
}

// Java date format helper (Java uses ISO format by default)
export const formatJavaDate = (dateString: string): Date => {
  return new Date(dateString);
};

// Java number format helper (Java uses different number formats)
export const parseJavaNumber = (value: string | number): number => {
  if (typeof value === 'number') return value;
  // Handle Java's number formatting
  return parseFloat(value.replace(/[^\d.-]/g, ''));
};

// Java boolean helper (Java uses true/false, not 1/0)
export const parseJavaBoolean = (value: any): boolean => {
  if (typeof value === 'boolean') return value;
  if (typeof value === 'string') {
    return value.toLowerCase() === 'true';
  }
  return Boolean(value);
};

// Java enum helper
export const parseJavaEnum = <T extends string>(value: string, enumValues: T[]): T => {
  if (enumValues.includes(value as T)) {
    return value as T;
  }
  // Return first enum value as default
  return enumValues[0];
};

// Java API error handler
export const handleJavaApiError = (error: any): string => {
  if (error.response?.data?.message) {
    return error.response.data.message;
  }
  if (error.response?.data?.error) {
    return error.response.data.error;
  }
  if (error.message) {
    return error.message;
  }
  return 'An unexpected error occurred';
};

// Java authentication helper
export const getJavaAuthHeaders = (): Record<string, string> => {
  const token = localStorage.getItem('authToken');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Java file upload helper
export const createJavaFormData = (data: Record<string, any>): FormData => {
  const formData = new FormData();
  
  Object.entries(data).forEach(([key, value]) => {
    if (value instanceof File) {
      formData.append(key, value);
    } else if (value !== null && value !== undefined) {
      formData.append(key, String(value));
    }
  });
  
  return formData;
};

// Java validation helper
export const validateJavaInput = (value: any, type: 'string' | 'number' | 'boolean' | 'email'): boolean => {
  switch (type) {
    case 'string':
      return typeof value === 'string' && value.trim().length > 0;
    case 'number':
      return typeof value === 'number' && !isNaN(value);
    case 'boolean':
      return typeof value === 'boolean';
    case 'email':
      return typeof value === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    default:
      return false;
  }
};
