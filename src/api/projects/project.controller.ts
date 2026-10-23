// src/api/projects/project.controller.ts
import { Request, Response } from 'express';
import pool from '../../config/database';

/**
 * @description Get all projects from the database
 * @route GET /api/projects
 */
/**
 * @description Get a single project by id
 * @route GET /api/projects/:id
 */
export const getProjectById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { rows } = await pool.query('SELECT * FROM projects WHERE id = $1', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Project not found.' });
    }
    res.status(200).json(rows[0]);
  } catch (error) {
    console.error('Error fetching project:', error);
    res.status(500).json({ message: 'Error fetching project from the database.' });
  }
};

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
/**
 * @description Update an existing project
 * @route PUT /api/projects/:id
 * @access Private (Admin only)
 */
export const updateProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description, project_url, source_code_url, image_url, tech_stack } = req.body;

    if (!title || !description || !project_url || !image_url || !tech_stack) {
      return res.status(400).json({ message: 'Please provide all required fields.' });
    }

    const query = `
      UPDATE projects
      SET title = $1, description = $2, project_url = $3, source_code_url = $4, image_url = $5, tech_stack = $6
      WHERE id = $7
      RETURNING *;
    `;
    const values = [title, description, project_url, source_code_url || null, image_url, tech_stack, id];

    const { rows } = await pool.query(query, values);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Project not found.' });
    }

    res.status(200).json({ message: 'Project updated successfully', project: rows[0] });
  } catch (error) {
    console.error('Error updating project:', error);
    res.status(500).json({ message: 'Error updating project in the database.' });
  }
};

/**
 * @description Delete a project
 * @route DELETE /api/projects/:id
 * @access Private (Admin only)
 */
export const deleteProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Remove related clicks first to avoid FK constraint issues
    await pool.query('DELETE FROM project_clicks WHERE project_id = $1', [id]);

    const result = await pool.query('DELETE FROM projects WHERE id = $1', [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Project not found.' });
    }

    res.status(200).json({ message: 'Project deleted successfully.' });
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({ message: 'Error deleting project from the database.' });
  }
};

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