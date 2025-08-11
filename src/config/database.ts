// src/config/database.ts

import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Create a connection pool to the database
// Using a pool is more efficient than creating a new connection for every query
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true, // Wait for a connection to be available if all are in use
  connectionLimit: 10,      // Max number of connections in the pool
  queueLimit: 0             // No limit on the number of queued connection requests
});

// A function to test the database connection
export const testDbConnection = async (): Promise<void> => {
  try {
    // Get a connection from the pool
    const connection = await pool.getConnection();
    console.log('Successfully connected to the database.');
    // Release the connection back to the pool
    connection.release();
  } catch (error) {
    console.error('Failed to connect to the database:', error);
    // Exit the process with an error code if the database connection fails
    process.exit(1);
  }
};

// Export the pool to be used in other parts of the application
export default pool;