// src/api/axiosConfig.ts
import axios from 'axios';

// Create an Axios instance with a predefined base URL.
// This URL is read from the environment variables.
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
});

// We can also add an interceptor to automatically add the JWT token to every request.
apiClient.interceptors.request.use(
  (config) => {
    // Get the token from localStorage (or wherever you choose to store it)
    const token = localStorage.getItem('authToken');
    if (token) {
      // If the token exists, add it to the Authorization header
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

export default apiClient;