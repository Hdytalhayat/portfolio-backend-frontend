// src/api/health/health.routes.ts
import { Router } from 'express';
import { ping } from './health.controller';

const router = Router();

// Public route: dipanggil oleh cron Vercel (dan siapa saja, tidak ada data sensitif).
router.get('/', ping);

export default router;
