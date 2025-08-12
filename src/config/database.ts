import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();
const isProduction = process.env.NODE_ENV === 'production';
// The connection pool will read the DATABASE_URL environment variable
// which we will set in Vercel to our Supabase connection string.
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // Hanya aktifkan SSL di lingkungan produksi.
  // Di lokal (localhost), Anda mungkin tidak memerlukan SSL.
  ssl: isProduction ? { rejectUnauthorized: false } : false,
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