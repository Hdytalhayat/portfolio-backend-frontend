import { Request, Response } from 'express';
import pool from '../../config/database';

// Lightweight endpoint used by cron jobs to keep the Supabase database awake.
export const pingDatabase = async (req: Request, res: Response) => {
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret) {
    const authHeader = req.headers.authorization;
    if (authHeader !== `Bearer ${cronSecret}`) {
      return res.status(401).json({ message: 'Unauthorized.' });
    }
  }

  try {
    await pool.query('SELECT 1');
    return res.status(200).json({ ok: true, time: new Date().toISOString() });
  } catch (error) {
    console.error('Keepalive ping failed:', error);
    return res.status(500).json({ ok: false, message: 'Database ping failed.' });
  }
};