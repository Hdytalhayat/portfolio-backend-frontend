// src/server.ts
import app from './app';
import { testDbConnection } from './config/database';

const PORT = process.env.PORT || 5000;

const start = async () => {
  await testDbConnection();
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
};

start().catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});