// src/components/ProtectedRoute.tsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { isAuthenticated } from '../services/authService';

/**
 * A component that acts as a guard for routes.
 * It checks for user authentication before rendering the child components.
 * If the user is not authenticated, it redirects them to the login page.
 */
const ProtectedRoute: React.FC = () => {
  // Check if the user is authenticated.
  const auth = isAuthenticated(); 
  
  // If authenticated, render the nested routes/components using the <Outlet /> component.
  // If not, redirect the user to the /login page.
  // The 'replace' prop is used to replace the current entry in the history stack,
  // so the user won't go back to the protected page by pressing the back button.
  return auth ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;