// src/server.ts
import app from './app';
import { testDbConnection } from './config/database'; // Import the test function

// Define the port the server will run on.
const PORT: number = parseInt(process.env.PORT as string, 10) || 5000;

// Function to start the server
const startServer = async () => {
  // First, test the database connection
  await testDbConnection();

  // If the database connection is successful, start the Express server
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

// Execute the server start function
startServer();