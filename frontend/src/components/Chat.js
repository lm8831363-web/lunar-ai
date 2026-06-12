import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import '../styles/Chat.css';

function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentSession, setCurrentSession] = useState(null);
  const [subject, setSubject] = useState('General');
  const messagesEndRef = useRef(null);

  const API_URL = process.env.REACT_APP_API_URL;
  const token = localStorage.getItem('token');

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message to UI
    const userMessage = { content: input, role: 'user' };
    setMessages([...messages, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await axios.post(
        `${API_URL}/chat/message`,
        {
          sessionId: currentSession,
          message: input,
          subject,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setCurrentSession(response.data.sessionId);
      setMessages(prev => [...prev, {
        content: response.data.message,
        role: 'assistant',
      }]);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => [...prev, {
        content: '🐰 Oops! Luna seems to be having trouble. Please try again!',
        role: 'assistant',
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-wrapper">
      <div className="chat-header">
        <h1>🌙 Lunar AI Chat</h1>
        <select 
          value={subject} 
          onChange={(e) => setSubject(e.target.value)}
          className="subject-select"
        >
          <option>General</option>
          <option>Math</option>
          <option>Science</option>
          <option>History</option>
          <option>Literature</option>
          <option>Languages</option>
        </select>
      </div>

      <div className="messages-container">
        {messages.length === 0 && (
          <div className="welcome-message">
            <h2>🐰 Welcome to Lunar AI!</h2>
            <p>Luna is here to help you with your studies. Ask any question!</p>
          </div>
        )}
        
        {messages.map((msg, idx) => (
          <div key={idx} className={`message ${msg.role}`}>
            <div className="message-content">
              {msg.role === 'assistant' && <span className="luna-icon">🐰</span>}
              {msg.content}
              {msg.role === 'assistant' && <span className="moon-icon">🌙</span>}
            </div>
          </div>
        ))}
        
        {loading && (
          <div className="message assistant">
            <div className="message-content">
              <span className="luna-icon">🐰</span>
              Luna is thinking... ✨
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={sendMessage} className="chat-input-form">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask Luna anything... 🌙"
          disabled={loading}
          className="chat-input"
        />
        <button type="submit" disabled={loading} className="send-button">
          Send ✨
        </button>
      </form>
    </div>
  );
}

export default Chat;