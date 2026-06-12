const express = require('express');
const authMiddleware = require('../middleware/auth');
const User = require('../models/User');

const router = express.Router();

// Get user profile
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      user,
      message: '🐰 Here\'s your profile! Luna thinks you\'re doing great!',
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update user profile
router.put('/profile', authMiddleware, async (req, res) => {
  try {
    const { name, grade, subjects, bio } = req.body;
    const user = await User.findByIdAndUpdate(
      req.userId,
      { name, grade, subjects, bio, lastActive: new Date() },
      { new: true }
    ).select('-password');

    res.json({
      user,
      message: '🌙 Your profile has been updated! Luna is impressed with your dedication!',
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;