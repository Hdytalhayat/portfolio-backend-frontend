// src/services/projectService.ts
import apiClient from '../api/axiosConfig';
import type { Project } from "../types"; // Import the Project interface

/**
 * @description Fetches all projects from the backend API.
 * @returns A promise that resolves to an array of Project objects.
 */
export const getAllProjects = async (): Promise<Project[]> => {
  try {
    // Make a GET request to the '/projects' endpoint.
    const response = await apiClient.get<Project[]>('/projects');
    // The actual data is in response.data
    return response.data;
  } catch (error) {
    console.error('Failed to fetch projects:', error);
    // In a real app, you might want to handle this error more gracefully.
    throw error;
  }
};

/**
 * @description Sends a request to the backend to track a click for a specific project.
 * @param projectId - The ID of the project that was clicked.
 * @returns A promise that resolves when the request is complete.
 */
export const trackClick = async (projectId: number): Promise<void> => {
  try {
    // Make a POST request to track the click. We don't need the response data.
    await apiClient.post(`/projects/${projectId}/track-click`);
    console.log(`Click tracked for project ${projectId}`);
  } catch (error) {
    console.error(`Failed to track click for project ${projectId}:`, error);
    // We don't throw an error here because the user should still be redirected
    // even if tracking fails.
  }
};

// Define a type for the data needed to create a new project.
// It's like the Project type but without id and created_at.
export interface NewProjectData {
  title: string;
  description: string;
  project_url: string;
  source_code_url?: string;
  image_url: string;
  tech_stack: string;
}

/**
 * @description Sends a request to create a new project.
 * @param projectData - The data for the new project.
 * @returns A promise that resolves to the newly created project object.
 */
export const addProject = async (projectData: NewProjectData): Promise<Project> => {
  try {
    // Make a POST request to the '/projects' endpoint with the new data.
    const response = await apiClient.post<{ message: string; project: Project }>('/projects', projectData);
    return response.data.project;
  } catch (error: any) {
    console.error('Failed to add project:', error);
    throw new Error(error.response?.data?.message || 'Could not add the project.');
  }
};