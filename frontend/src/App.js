import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import Navbar from './components/Navbar';
import Chat from './components/Chat';
import LunarRabbit from './components/LunarRabbit';
import Home from './pages/Home';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const [currentPage, setCurrentPage] = useState('home');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setCurrentPage('home');
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setCurrentPage('chat');
  };

  return (
    <div className="app lunar-theme">
      {isLoggedIn && <Navbar onLogout={handleLogout} />}
      
      <div className="app-container">
        {!isLoggedIn ? (
          <Home onLoginSuccess={handleLoginSuccess} />
        ) : (
          <>
            <div className="chat-container">
              <Chat />
            </div>
            <div className="lunar-rabbit-container">
              <LunarRabbit />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;