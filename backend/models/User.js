const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  grade: {
    type: String,
    enum: ['High School', 'Undergraduate', 'Graduate'],
  },
  subjects: {
    type: [String],
    default: [],
  },
  profilePicture: {
    type: String,
    default: null,
  },
  bio: {
    type: String,
    default: '',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  lastActive: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('User', UserSchema);