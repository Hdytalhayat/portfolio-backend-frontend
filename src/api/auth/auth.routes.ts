// src/api/auth/auth.routes.ts
import { Router } from 'express';
import { login } from './auth.controller';

const router = Router();

// Define the login route
router.post('/login', login);

export default router;