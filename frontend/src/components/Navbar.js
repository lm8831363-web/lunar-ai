import React from 'react';
import '../styles/Navbar.css';

function Navbar({ onLogout }) {
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  return (
    <nav className="navbar lunar-navbar">
      <div className="navbar-content">
        <div className="navbar-brand">
          <span className="brand-icon">🐰🌙</span>
          <span className="brand-name">Lunar AI</span>
        </div>
        
        <div className="navbar-user">
          <span className="user-greeting">Welcome, {user.name || 'Student'}! ✨</span>
          <button onClick={onLogout} className="logout-button">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;