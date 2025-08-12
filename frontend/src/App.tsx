// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ProtectedRoute from './components/ProtectedRoute'; 
import Layout from './components/layout/Layout';
import { ThemeProvider } from './context/ThemeContext'; 

const App: React.FC = () => {
  return (
    <ThemeProvider>

    <Router>
      <Routes>
        {/* Routes with Navbar and Footer */}
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
        </Route>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Protected Routes */}
        {/* The ProtectedRoute component wraps the routes that require authentication. */}
        <Route element={<ProtectedRoute />}>
          {/* Any route nested inside will first be checked by ProtectedRoute */}
          <Route path="/dashboard" element={<DashboardPage />} />
          {/* You can add more protected routes here in the future */}
        </Route>
      </Routes>
    </Router>
    </ThemeProvider>
  );
};

export default App;