// src/api/dashboard/dashboard.routes.ts
import { Router } from 'express';
import { getDashboardStats } from './dashboard.controller';
import { protect } from '../../middleware/auth.middleware'; // Import the protector!

const router = Router();

// This route is protected. The 'protect' middleware will run before the controller.
router.get('/stats', protect, getDashboardStats);

export default router;