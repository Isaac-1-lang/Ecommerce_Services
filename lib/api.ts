import axios from "axios";
import { handleJavaApiError } from "./javaIntegration";

export const api = axios.create({
  baseURL: "http://44.201.144.244:8081",
  timeout: parseInt(process.env.NEXT_PUBLIC_JAVA_TIMEOUT || "10000"),
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Create a separate instance for product creation with longer timeout
export const productApi = axios.create({
  baseURL: "http://44.201.144.244:8081",
  timeout: 60000, // 60 seconds for product operations (increased from 30s)
  headers: {
    'Accept': 'application/json',
  },
});

// Request interceptor for main API
api.interceptors.request.use((config) => {
 // Add auth token if available (support both keys)
  const token = localStorage.getItem('authToken') || localStorage.getItem('now_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    console.log('Token added to request:', token.substring(0, 20) + '...');
  } else {
    console.log('No token found in localStorage');
  }
  
  // Log request in development
  if (process.env.NODE_ENV === 'development') {
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`, config.data);
    console.log('Request headers:', config.headers);
  }
  
  return config;
}, (error) => {
  console.error('Request Error:', error);
  return Promise.reject(error);
});

// Request interceptor for product API
productApi.interceptors.request.use((config) => {
  // Add auth token if available (support both keys)
  const token = localStorage.getItem('authToken') || localStorage.getItem('now_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    console.log('Product API - Token added to request:', token.substring(0, 20) + '...');
  } else {
    console.log('Product API - No token found in localStorage');
  }
  
  // Log request in development
  if (process.env.NODE_ENV === 'development') {
    console.log(`Product API Request: ${config.method?.toUpperCase()} ${config.url}`, config.data);
    console.log('Product API Request headers:', config.headers);
  }
  
  return config;
}, (error) => {
  console.error('Product API Request Error:', error);
  return Promise.reject(error);
});

// Response interceptor
api.interceptors.response.use((response) => {
  // Log response in development
  if (process.env.NODE_ENV === 'development') {
    console.log(`API Response: ${response.status} ${response.config.url}`, response.data);
  }
  return response;
}, (error) => {
  // Handle Java backend specific errors
  const errorMessage = handleJavaApiError(error);
  
  if (error.response?.status === 401) {
    // Unauthorized - let the calling code handle it to avoid redirect loops
    console.warn('API 401 Unauthorized:', errorMessage);
  }
  
  if (error.response?.status === 403) {
    // Forbidden - user doesn't have permission
    console.error('Access forbidden:', errorMessage);
  }
  
  if (error.response?.status === 404) {
    // Not found
    console.error('Resource not found:', errorMessage);
  }
  
  if (error.response?.status >= 500) {
    // Server error
    console.error('Server error:', errorMessage);
  }
  
  return Promise.reject(error);
});

export default api;
