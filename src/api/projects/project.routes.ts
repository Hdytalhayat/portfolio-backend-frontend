// src/api/projects/project.routes.ts
import { Router } from 'express';
import { getAllProjects, trackProjectClick } from './project.controller';

const router = Router();

// Define the public routes for projects
router.get('/', getAllProjects);
router.post('/:id/track-click', trackProjectClick);

export default router;