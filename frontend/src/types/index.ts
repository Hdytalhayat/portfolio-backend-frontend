// src/types/index.ts

// Defines the structure of a single project object
// that we expect to receive from our backend API.
export interface Project {
  id: number;
  title: string;
  description: string;
  project_url: string;
  source_code_url?: string; // The '?' makes this property optional
  image_url: string;
  tech_stack: string; // e.g., "React,Node.js,TypeScript"
  created_at: string; // The date will come as a string
}

// Defines the structure of a single project statistic object
// received from the /dashboard/stats endpoint.
export interface ProjectStat {
  id: number;
  title: string;
  click_count: number;
}