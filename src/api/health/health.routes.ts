import { Router } from 'express';
import { pingDatabase } from './health.controller';

const router = Router();

// GET /api/ping
router.get('/ping', pingDatabase);

export default router;