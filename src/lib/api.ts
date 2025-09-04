import axios from "axios";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 600000,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    console.log("[v0] API Request:", config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error("[v0] API Request Error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    console.log("[v0] API Response:", response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error(
      "[v0] API Response Error:",
      error.response?.status,
      error.message
    );
    return Promise.reject(error);
  }
);
