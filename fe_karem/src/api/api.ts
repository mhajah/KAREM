/**
 * Base API configuration for the KAREM frontend.
 * Sets up Axios instance with base configuration and interceptors.
 * 
 * Features:
 * - Base URL configuration for API requests
 * - Automatic token injection for authenticated requests
 * - Axios instance for consistent API calls
 * 
 * Configuration:
 * - Development server URL: http://localhost:5175
 * - JWT token management via localStorage
 * - Automatic Authorization header injection
 * 
 * Note: Consider moving the base URL to environment variables
 * for different deployment environments
 */

import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5175",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
