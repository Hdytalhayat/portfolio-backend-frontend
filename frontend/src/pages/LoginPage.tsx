// src/pages/LoginPage.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginAdmin } from '../services/authService';
import type { LoginCredentials } from '../services/authService';

const LoginPage: React.FC = () => {
  // Hook for programmatic navigation (e.g., redirecting after login)
  const navigate = useNavigate();

  // State to hold the form data (email and password)
  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: '',
    password: '',
  });
  
  // State for loading and error messages
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Handles changes in the input fields
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handles the form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the default form submission (page reload)
    setIsLoading(true);
    setError(null);

    try {
      await loginAdmin(credentials);
      // If login is successful, navigate to the dashboard
      navigate('/dashboard');
    } catch (err: any) {
      // If login fails, set the error message to display to the user
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Admin Login</h2>
        {error && <p className="error-message">{error}</p>}
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;