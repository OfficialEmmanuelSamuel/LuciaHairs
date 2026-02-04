// utils/api.js
import axios from "axios";
import { getToken } from "./auth.js"; // ✅ Import AFTER axios, before using token

// ✅ Create the axios instance first
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api",
});

// ✅ Add token automatically before each request
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


export default api;
