// src/api/health/health.controller.ts
import { Request, Response } from 'express';
import pool from '../../config/database';

/**
 * @description Health check / keep-alive ping.
 * Menjalankan query sederhana ke Supabase supaya project tetap "aktif"
 * dan tidak di-pause oleh Supabase karena inaktivitas.
 * @route GET /api/health
 */
export const ping = async (req: Request, res: Response) => {
  // Validasi CRON_SECRET: jika env var CRON_SECRET di-set di Vercel,
  // maka request WAJIB menyertakan header `Authorization: Bearer <secret>`.
  // Jika CRON_SECRET tidak di-set, endpoint tetap terbuka (untuk health check manual).
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret && req.headers.authorization !== `Bearer ${cronSecret}`) {
    return res.status(401).json({
      status: 'unauthorized',
      timestamp: new Date().toISOString(),
    });
  }

  try {
    const start = Date.now();
    const { rows } = await pool.query('SELECT 1 AS ok');
    const latencyMs = Date.now() - start;

    res.status(200).json({
      status: 'ok',
      database: rows[0]?.ok === 1 ? 'connected' : 'unknown',
      latencyMs,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Health check failed:', error);
    res.status(500).json({
      status: 'error',
      database: 'disconnected',
      timestamp: new Date().toISOString(),
    });
  }
};
