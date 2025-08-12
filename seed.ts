// seed.ts
import bcrypt from 'bcryptjs';
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


const createAdmin = async () => {
  const client = await pool.connect();

  try {
    console.log('Database connection successful.');

    // --- Admin Details ---
    const adminEmail = 'admin@example.com';
    const adminPassword = 'password123'; // Gunakan password kuat di real project

    // Cek apakah admin sudah ada
    const result = await client.query(
      'SELECT * FROM admins WHERE email = $1',
      [adminEmail]
    );

    if (result.rows.length > 0) {
      console.log(`Admin with email ${adminEmail} already exists.`);
      return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    // Insert admin baru
    await client.query(
      'INSERT INTO admins (email, password) VALUES ($1, $2)',
      [adminEmail, hashedPassword]
    );

    console.log('Admin user created successfully!');
    console.log(`Email: ${adminEmail}`);
    console.log(`Password: ${adminPassword}`);

  } catch (error) {
    console.error('Failed to seed admin user:', error);
  } finally {
    client.release();
    await pool.end();
    console.log('Database connection closed.');
  }
};

// Jalankan seeder
createAdmin();
