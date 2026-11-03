import axios from 'axios';
import { CONFIG } from '../config';

const apiClient = axios.create({
  baseURL: CONFIG.API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
});

// Request interceptor: attach Admin JWT Token if available
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(CONFIG.STORAGE_KEYS.ADMIN_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: standardize data extraction and error response
apiClient.interceptors.response.use(
  (response) => {
    // If backend returns standard { success, data, message }
    return response.data;
  },
  (error) => {
    const errorResponse = {
      success: false,
      message: error.response?.data?.message || error.message || 'Something went wrong',
      status: error.response?.status || 500,
      errors: error.response?.data?.errors || {}
    };

    if (error.response?.status === 401) {
      // Admin session expired
      localStorage.removeItem(CONFIG.STORAGE_KEYS.ADMIN_TOKEN);
      localStorage.removeItem(CONFIG.STORAGE_KEYS.ADMIN_USER);
    }

    return Promise.reject(errorResponse);
  }
);

export default apiClient;

