// src/app.ts
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Import routes
import projectRoutes from './api/projects/project.routes';
import authRoutes from './api/auth/auth.routes';
import dashboardRoutes from './api/dashboard/dashboard.routes';

// Load environment variables
dotenv.config();

// Create an instance of the Express application
const app: Application = express();

// Middlewares
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Parse incoming requests with JSON payloads

// A simple route for testing
app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the Portfolio API!');
});

// --- API Routes ---
app.use('/api/projects', projectRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/dashboard', dashboardRoutes);


export default app;