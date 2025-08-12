// src/api/auth/auth.controller.ts
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../../config/database';

/**
 * @description Authenticate an admin and return a JWT
 * @route POST /api/auth/login
 */
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // --- Basic Validation ---
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    // --- Find Admin in Database ---
    const [rows]: any = await pool.query('SELECT * FROM admins WHERE email = ?', [email]);
    if (rows.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials.' }); // Use a generic message
    }
    const admin = rows[0];

    // --- Compare Passwords ---
    const isPasswordMatch = await bcrypt.compare(password, admin.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ message: 'Invalid credentials.' }); // Use a generic message
    }

    // --- Create JWT ---
    const payload = { id: admin.id, email: admin.email };
    const secret = process.env.JWT_SECRET || 'your-default-secret-key'; // IMPORTANT: Use env var
    const token = jwt.sign(payload, secret, { expiresIn: '1d' }); // Token expires in 1 day

    // Send the token back to the client
    res.status(200).json({ message: 'Login successful', token });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'An internal server error occurred.' });
  }
};