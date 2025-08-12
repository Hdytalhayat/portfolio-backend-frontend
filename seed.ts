// seed.ts
import bcrypt from 'bcryptjs';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const createAdmin = async () => {
  let connection;
  try {
    // Establish connection to the database
    connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    console.log('Database connection successful.');

    // --- Admin Details ---
    const adminEmail = 'admin@example.com';
    const adminPassword = 'password123'; // Use a strong password in a real project!

    // Check if the admin already exists
    const [rows]: any = await connection.execute('SELECT * FROM admins WHERE email = ?', [adminEmail]);
    if (rows.length > 0) {
      console.log(`Admin with email ${adminEmail} already exists.`);
      return;
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(adminPassword, 10); // 10 is the salt rounds

    // Insert the new admin into the database
    await connection.execute(
      'INSERT INTO admins (email, password) VALUES (?, ?)',
      [adminEmail, hashedPassword]
    );

    console.log('Admin user created successfully!');
    console.log(`Email: ${adminEmail}`);
    console.log(`Password: ${adminPassword}`);

  } catch (error) {
    console.error('Failed to seed admin user:', error);
  } finally {
    // Always close the connection
    if (connection) {
      await connection.end();
      console.log('Database connection closed.');
    }
  }
};

// Run the seeder function
createAdmin();