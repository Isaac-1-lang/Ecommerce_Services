import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.example.com",
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  // place to attach auth tokens later
  return config;
});
