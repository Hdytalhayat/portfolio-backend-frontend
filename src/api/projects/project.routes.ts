// src/api/projects/project.routes.ts
import { Router } from 'express';
import { getAllProjects, trackProjectClick, createProject  } from './project.controller';
import { protect } from '../../middleware/auth.middleware';

const router = Router();

// Define the public routes for projects
router.get('/', getAllProjects);
router.post('/:id/track-click', trackProjectClick);

// --- Protected Routes ---
// This route is now protected by the 'protect' middleware.
// Only requests with a valid JWT will be allowed.
router.post('/', protect, createProject);

export default router;