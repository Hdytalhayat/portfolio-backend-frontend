// src/services/dashboardService.ts
import apiClient from '../api/axiosConfig';
import type { ProjectStat } from '../types';

/**
 * @description Fetches project click statistics from the protected dashboard endpoint.
 * The JWT token is automatically added to the request by the Axios interceptor.
 * @returns A promise that resolves to an array of ProjectStat objects.
 */
export const getStats = async (): Promise<ProjectStat[]> => {
  try {
    // Make a GET request to the '/dashboard/stats' endpoint.
    const response = await apiClient.get<ProjectStat[]>('/dashboard/stats');
    return response.data;
  } catch (error: any) {
    console.error('Failed to fetch dashboard stats:', error);
    // Throw an error to be handled by the component.
    throw new Error(error.response?.data?.message || 'Could not load dashboard data.');
  }
};