import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginAdmin } from '../services/authService';
import type { LoginCredentials } from '../services/authService';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: '',
    password: '',
  });
  
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await loginAdmin(credentials);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: 'var(--bg)' }}>
      <div 
        className="w-full max-w-sm p-8 space-y-6 rounded-xl shadow-lg" 
        style={{ backgroundColor: 'var(--card)' }}
      >
        <h2 className="text-3xl font-bold text-center" style={{ color: 'var(--text)' }}>
          Admin Portal
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="p-3 text-sm text-red-700 bg-red-100 rounded-lg border border-red-300">
              {error}
            </div>
          )}
          
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              required
              className="w-full p-3 text-base rounded-md focus:ring-2 focus:outline-none"
              style={{ 
                backgroundColor: 'var(--bg)', 
                color: 'var(--text)', 
                borderColor: 'var(--border-color)', 
                borderWidth: '1px',
                // @ts-ignore
                '--tw-ring-color': 'var(--primary)'
              }}
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block mb-2 text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              required
              className="w-full p-3 text-base rounded-md focus:ring-2 focus:outline-none"
              style={{ 
                backgroundColor: 'var(--bg)', 
                color: 'var(--text)', 
                borderColor: 'var(--border-color)',
                borderWidth: '1px',
                // @ts-ignore
                '--tw-ring-color': 'var(--primary)'
              }}
            />
          </div>
          
          <button 
            type="submit" 
            disabled={isLoading} 
            className="w-full px-4 py-3 font-semibold text-white rounded-lg shadow-md transition-opacity duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ backgroundColor: 'var(--primary)' }}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;