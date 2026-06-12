const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('🌙 Connected to MongoDB - Lunar AI is online!');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/chat', require('./routes/chat'));
app.use('/api/user', require('./routes/user'));

// Welcome Route
app.get('/api', (req, res) => {
  res.json({ 
    message: '🐰 Welcome to Lunar AI Backend!',
    version: '1.0.0',
    status: 'The lunar rabbit is awake and ready to help students! 🌙'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: err.message 
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🌙 Lunar AI server is running on port ${PORT}`);
  console.log(`🐰 Luna is ready to help students!`);
});