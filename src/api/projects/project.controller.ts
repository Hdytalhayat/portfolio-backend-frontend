// src/api/projects/project.controller.ts
import { Request, Response } from 'express';
import pool from '../../config/database';

/**
 * @description Get all projects from the database
 * @route GET /api/projects
 */
export const getAllProjects = async (req: Request, res: Response) => {
  try {
    // --- PERBAIKAN ---
    // Ubah dari: const [rows] = await pool.query(...)
    // Menjadi: const { rows } = await pool.query(...)
    const { rows } = await pool.query('SELECT * FROM projects ORDER BY created_at DESC');
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
    const { id } = req.params;
    const query = 'INSERT INTO project_clicks (project_id) VALUES ($1)'; // Gunakan $1 untuk PostgreSQL
    // Query pg tidak mengembalikan hasil yang perlu kita gunakan, jadi ini sudah benar
    await pool.query(query, [id]);
    res.status(200).json({ message: 'Click tracked successfully.' });
  } catch (error) {
    console.error('Error tracking click:', error);
    res.status(500).json({ message: 'Error tracking click.' });
  }
};

/**
 * @description Create a new project
 * @route POST /api/projects
 * @access Private (Admin only)
 */
export const createProject = async (req: Request, res: Response) => {
  try {
    const { title, description, project_url, source_code_url, image_url, tech_stack } = req.body;
    if (!title || !description || !project_url || !image_url || !tech_stack) {
      return res.status(400).json({ message: 'Please provide all required fields.' });
    }

    const query = `
      INSERT INTO projects 
      (title, description, project_url, source_code_url, image_url, tech_stack) 
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *; -- Minta PostgreSQL mengembalikan baris yang baru dibuat
    `;
    const values = [title, description, project_url, source_code_url, image_url, tech_stack];

    // --- PERBAIKAN ---
    // Ambil baris yang baru dibuat dari hasil query
    const { rows } = await pool.query(query, values);

    res.status(201).json({ message: 'Project created successfully', project: rows[0] });

  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ message: 'Error creating project in the database.' });
  }
};