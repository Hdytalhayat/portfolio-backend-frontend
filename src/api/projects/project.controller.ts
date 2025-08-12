// src/api/projects/project.controller.ts
import { Request, Response } from 'express';
import pool from '../../config/database'; // Import our database connection pool

/**
 * @description Get all projects from the database
 * @route GET /api/projects
 */
export const getAllProjects = async (req: Request, res: Response) => {
  try {
    // Execute the query to get all projects, ordered by creation date
    const [rows] = await pool.query('SELECT * FROM projects ORDER BY created_at DESC');
    // Send the list of projects as a JSON response
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ message: 'Error fetching projects from the database.' });
  }
};

/**
 * @description Track a click for a specific project
 * @route POST /api/projects/:id/track-click
 */
export const trackProjectClick = async (req: Request, res: Response) => {
  try {
    const { id } = req.params; // Get the project ID from the URL parameters
    // Prepare the SQL query to insert a new click record
    const query = 'INSERT INTO project_clicks (project_id) VALUES (?)';
    // Execute the query with the project ID
    await pool.query(query, [id]);
    // Send a success response
    res.status(200).json({ message: 'Click tracked successfully.' });
  } catch (error) {
    console.error('Error tracking click:', error);
    res.status(500).json({ message: 'Error tracking click.' });
  }
};