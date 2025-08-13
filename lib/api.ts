import axios from "axios";
import { handleJavaApiError } from "./javaIntegration";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080/api",
  timeout: parseInt(process.env.NEXT_PUBLIC_JAVA_TIMEOUT || "10000"),
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use((config) => {
  // Add auth token if available
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  // Log request in development
  if (process.env.NODE_ENV === 'development') {
    console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`, config.data);
  }
  
  return config;
}, (error) => {
  console.error('❌ Request Error:', error);
  return Promise.reject(error);
});

// Response interceptor
api.interceptors.response.use((response) => {
  // Log response in development
  if (process.env.NODE_ENV === 'development') {
    console.log(`✅ API Response: ${response.status} ${response.config.url}`, response.data);
  }
  return response;
}, (error) => {
  // Handle Java backend specific errors
  const errorMessage = handleJavaApiError(error);
  
  if (error.response?.status === 401) {
    // Unauthorized - redirect to login
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    if (typeof window !== 'undefined') {
      window.location.href = '/auth/login';
    }
  }
  
  if (error.response?.status === 403) {
    // Forbidden - user doesn't have permission
    console.error('🚫 Access forbidden:', errorMessage);
  }
  
  if (error.response?.status === 404) {
    // Not found
    console.error('🔍 Resource not found:', errorMessage);
  }
  
  if (error.response?.status >= 500) {
    // Server error
    console.error('💥 Server error:', errorMessage);
  }
  
  return Promise.reject(error);
});

export default api;
