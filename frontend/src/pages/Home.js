import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Auth.css';

function Home({ onLoginSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    grade: 'High School',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const API_URL = process.env.REACT_APP_API_URL;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const endpoint = isLogin ? '/auth/login' : '/auth/signup';
      const response = await axios.post(
        `${API_URL}${endpoint}`,
        formData
      );

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      onLoginSuccess();
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container lunar-bg">
      <div className="auth-card">
        <div className="auth-header">
          <h1 className="app-title">🐰 Lunar AI 🌙</h1>
          <p className="app-subtitle">Your Cosmic Study Buddy</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {!isLogin && (
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {!isLogin && (
            <div className="form-group">
              <label htmlFor="grade">Grade Level</label>
              <select
                id="grade"
                name="grade"
                value={formData.grade}
                onChange={handleChange}
              >
                <option>High School</option>
                <option>Undergraduate</option>
                <option>Graduate</option>
              </select>
            </div>
          )}

          {error && <div className="error-message">❌ {error}</div>}

          <button type="submit" disabled={loading} className="auth-button">
            {loading ? 'Loading...' : isLogin ? 'Login' : 'Create Account'}
          </button>
        </form>

        <div className="auth-toggle">
          <p>
            {isLogin ? "Don't have an account?" : 'Already have an account?'}
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="toggle-button"
            >
              {isLogin ? 'Sign Up' : 'Login'}
            </button>
          </p>
        </div>

        <div className="auth-features">
          <h3>✨ What Luna Can Help With:</h3>
          <ul>
            <li>🎓 Homework help and problem solving</li>
            <li>📚 Concept explanations</li>
            <li>🔍 Research and essay writing</li>
            <li>💬 24/7 study buddy support</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Home;