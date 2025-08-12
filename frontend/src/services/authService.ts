// src/services/authService.ts
import apiClient from '../api/axiosConfig';

// Defines the shape of the credentials object required for login.
export interface LoginCredentials {
  email: string;
  password: string;
}

// Defines the shape of the successful login response from the API.
interface LoginResponse {
  token: string;
  message: string;
}

/**
 * @description Attempts to log in the admin using the provided credentials.
 * @param credentials - An object containing the admin's email and password.
 * @returns A promise that resolves with the JWT if login is successful.
 */
export const loginAdmin = async (credentials: LoginCredentials): Promise<string> => {
  try {
    // Make a POST request to the '/auth/login' endpoint.
    const response = await apiClient.post<LoginResponse>('/auth/login', credentials);
    
    // Extract the token from the response data.
    const { token } = response.data;

    if (token) {
      // If a token is received, store it in the browser's localStorage.
      // localStorage is a simple way to persist data across browser sessions.
      localStorage.setItem('authToken', token);
    }
    
    return token;
  } catch (error: any) {
    // Log the detailed error and throw a new, more user-friendly error message.
    console.error('Login failed:', error.response?.data?.message || error.message);
    throw new Error(error.response?.data?.message || 'An unknown error occurred during login.');
  }
};

/**
 * @description Logs out the admin by removing the token from localStorage.
 */
export const logoutAdmin = (): void => {
  localStorage.removeItem('authToken');
};

/**
 * @description Checks if there is a token in localStorage to determine if the user is logged in.
 * @returns True if a token exists, false otherwise.
 */
export const isAuthenticated = (): boolean => {
  return localStorage.getItem('authToken') !== null;
};