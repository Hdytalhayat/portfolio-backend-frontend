// src/middleware/auth.middleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Extend the existing Express Request type to include our 'admin' property
interface AuthenticatedRequest extends Request {
  admin?: any; // You can define a more specific type for the decoded admin payload
}

export const protect = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  // Check if the token is sent in the headers and starts with 'Bearer'
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header (e.g., "Bearer <token>")
      const token = req.headers.authorization.split(' ')[1];

      const secret = process.env.JWT_SECRET || (process.env.NODE_ENV !== 'production' ? 'your-default-secret-key' : undefined);
      if (!secret) {
        console.error('JWT_SECRET is not configured.');
        return res.status(500).json({ message: 'Server misconfiguration.' });
      }

      // Verify the token
      const decoded = jwt.verify(token, secret);

      // Attach the decoded payload (user info) to the request object
      req.admin = decoded;

      // Proceed to the next middleware or route handler
      return next();
    } catch (error) {
      console.error('Token verification failed:', error);
      return res.status(401).json({ message: 'Not authorized, token failed.' });
    }
  }

  return res.status(401).json({ message: 'Not authorized, no token.' });
};