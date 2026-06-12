const express = require('express');
const axios = require('axios');
const authMiddleware = require('../middleware/auth');
const ChatSession = require('../models/ChatSession');

const router = express.Router();

// Send message to Luna (AI)
router.post('/message', authMiddleware, async (req, res) => {
  try {
    const { sessionId, message, subject = 'General' } = req.body;

    let session;

    if (sessionId) {
      session = await ChatSession.findById(sessionId);
      if (!session || session.userId.toString() !== req.userId) {
        return res.status(404).json({ error: 'Chat session not found' });
      }
    } else {
      session = new ChatSession({
        userId: req.userId,
        subject,
        title: message.substring(0, 50) + '...',
      });
    }

    // Add user message
    session.messages.push({
      content: message,
      role: 'user',
    });

    // Get response from OpenAI
    const aiResponse = await getAIResponse(message, session.messages);

    // Add Luna's response
    session.messages.push({
      content: aiResponse,
      role: 'assistant',
    });

    session.updatedAt = new Date();
    await session.save();

    res.json({
      sessionId: session._id,
      message: aiResponse,
      lunaMessage: `🐰 Luna says: ${aiResponse}`,
    });
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get chat history
router.get('/history/:sessionId', authMiddleware, async (req, res) => {
  try {
    const session = await ChatSession.findById(req.params.sessionId);
    if (!session || session.userId.toString() !== req.userId) {
      return res.status(404).json({ error: 'Chat session not found' });
    }

    res.json({
      session,
      messageCount: session.messages.length,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all sessions
router.get('/sessions', authMiddleware, async (req, res) => {
  try {
    const sessions = await ChatSession.find({ userId: req.userId })
      .sort({ updatedAt: -1 })
      .select('_id title subject createdAt updatedAt messages');

    res.json({
      sessions: sessions.map(s => ({
        id: s._id,
        title: s.title,
        subject: s.subject,
        messageCount: s.messages.length,
        createdAt: s.createdAt,
        updatedAt: s.updatedAt,
      })),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete session
router.delete('/:sessionId', authMiddleware, async (req, res) => {
  try {
    const session = await ChatSession.findByIdAndDelete(req.params.sessionId);
    if (!session || session.userId.toString() !== req.userId) {
      return res.status(404).json({ error: 'Chat session not found' });
    }

    res.json({ message: '🐰 Chat session deleted successfully!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Helper function to get AI response
async function getAIResponse(userMessage, conversationHistory) {
  try {
    // Format conversation history for OpenAI
    const messages = conversationHistory.map(msg => ({
      role: msg.role,
      content: msg.content,
    }));

    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are Luna, a helpful and friendly AI tutor from the moon 🌙🐰. Your role is to help students understand their coursework and answer questions about any subject. Be encouraging, patient, and use simple explanations. Keep responses concise but informative.',
          },
          ...messages,
        ],
        temperature: 0.7,
        max_tokens: 500,
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('OpenAI API error:', error);
    return "🐰 Luna is having trouble connecting to the cosmic knowledge database. Please try again!";
  }
}

module.exports = router;