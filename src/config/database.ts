import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

// The connection pool will read the DATABASE_URL environment variable
// which we will set in Vercel to our Supabase connection string.
const pool = new Pool({
  connectionString: process.env.DB_HOST,
});

export const testDbConnection = async (): Promise<void> => {
    try {
      const client = await pool.connect();
      console.log('Successfully connected to the PostgreSQL database.');
      client.release();
    } catch (error) {
      console.error('Failed to connect to the PostgreSQL database:', error);
      process.exit(1);
    }
};
  
export default pool;