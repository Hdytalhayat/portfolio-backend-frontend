// src/api/auth/auth.controller.ts
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../../config/database';

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    // --- PERBAIKAN ---
    const { rows } = await pool.query('SELECT * FROM admins WHERE email = $1', [email]);
    if (rows.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }
    const admin = rows[0];

    const isPasswordMatch = await bcrypt.compare(password, admin.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    const payload = { id: admin.id, email: admin.email };
    const secret = process.env.JWT_SECRET || 'your-default-secret-key';
    const token = jwt.sign(payload, secret, { expiresIn: '1d' });

    res.status(200).json({ message: 'Login successful', token });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'An internal server error occurred.' });
  }
};