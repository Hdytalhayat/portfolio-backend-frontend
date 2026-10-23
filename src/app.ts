// src/app.ts
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Import routes
import projectRoutes from './api/projects/project.routes';
import authRoutes from './api/auth/auth.routes';
import dashboardRoutes from './api/dashboard/dashboard.routes';
import healthRoutes from './api/health/health.routes';

// Load environment variables
dotenv.config();

// Create an instance of the Express application
const app: Application = express();

// Middlewares
const corsOrigin = process.env.CORS_ORIGIN;
app.use(cors(corsOrigin ? { origin: corsOrigin.split(',').map((o) => o.trim()) } : undefined)); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Parse incoming requests with JSON payloads

// A simple route for testing
app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the Portfolio API!');
});

// --- API Routes ---
app.use('/api/projects', projectRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api', healthRoutes);
app.use('/api/health', healthRoutes);


export default app;