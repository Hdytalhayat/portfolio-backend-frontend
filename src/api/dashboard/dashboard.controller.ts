// src/api/dashboard/dashboard.controller.ts
import { Request, Response } from 'express';
import pool from '../../config/database';

export const getDashboardStats = async (req: Request, res: Response) => {
  try {
    const query = `
      SELECT 
        p.id, 
        p.title, 
        COUNT(pc.id)::int AS click_count -- Konversi ke integer
      FROM 
        projects p
      LEFT JOIN 
        project_clicks pc ON p.id = pc.project_id
      GROUP BY 
        p.id, p.title
      ORDER BY 
        click_count DESC;
    `;
    
    // --- PERBAIKAN ---
    const { rows } = await pool.query(query);
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({ message: 'Error fetching dashboard statistics.' });
  }
};