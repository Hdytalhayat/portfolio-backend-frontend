// src/app.ts
import express, { Application, Request, Response } from 'express';
import cors from 'cors';

// Create an instance of the Express application
const app: Application = express();

// Middlewares
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Parse incoming requests with JSON payloads

// A simple route for testing
app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the Portfolio API!');
});

export default app;