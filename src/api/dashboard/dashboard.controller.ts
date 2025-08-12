// src/api/dashboard/dashboard.controller.ts
import { Request, Response } from 'express';
import pool from '../../config/database';

/**
 * @description Get project click statistics for the dashboard
 * @route GET /api/dashboard/stats
 * @access Private (Admin only)
 */
export const getDashboardStats = async (req: Request, res: Response) => {
  try {
    // SQL query to count clicks for each project
    // It joins projects and project_clicks, groups by project, and counts the clicks
    const query = `
      SELECT 
        p.id, 
        p.title, 
        COUNT(pc.id) AS click_count
      FROM 
        projects p
      LEFT JOIN 
        project_clicks pc ON p.id = pc.project_id
      GROUP BY 
        p.id, p.title
      ORDER BY 
        click_count DESC;
    `;
    const [stats] = await pool.query(query);
    res.status(200).json(stats);
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({ message: 'Error fetching dashboard statistics.' });
  }
};