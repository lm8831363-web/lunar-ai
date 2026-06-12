# 🐰 Lunar AI - Your Cosmic Study Buddy

Welcome to **Lunar AI**, where a friendly rabbit from the moon helps you navigate your academic journey! 🌙✨

Lunar AI is an interactive web application that connects students with an AI-powered lunar rabbit tutor. Whether you're struggling with homework, need concept explanations, or want to explore new ideas, your celestial study companion is here 24/7.

## ✨ Features

- 🐰 **Adorable Lunar Rabbit Mascot** - Meet Luna, your AI study buddy from the moon
- 💬 **Interactive Chat Interface** - Real-time conversations with your AI tutor
- 📚 **Multi-Subject Support** - Math, Science, Literature, History, Languages, and more
- 🎯 **Homework Help** - Get assistance with assignments and problem-solving
- 📖 **Concept Explanation** - Break down complex topics into digestible chunks
- 📝 **Document Upload** - Upload and get feedback on essays and assignments
- 🔍 **Research Assistance** - Ask questions and explore ideas
- 💾 **Chat History** - Save and revisit your learning sessions
- 🌙 **Lunar Theme** - Beautiful moon-inspired UI with cosmic vibes
- 📱 **Fully Responsive** - Works seamlessly on desktop, tablet, and mobile
- 🎨 **Dark Mode Ready** - Easy on the eyes during late-night study sessions

## 🚀 Tech Stack

### Frontend
- **React.js** - Modern UI library
- **Tailwind CSS** - Utility-first styling with lunar theme
- **Axios** - HTTP client for API communication
- **React Router** - Client-side routing
- **Framer Motion** - Smooth animations for lunar effects

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web server framework
- **MongoDB** - NoSQL database for storing conversations and user data
- **OpenAI API / Anthropic Claude** - AI engine
- **JWT Authentication** - Secure user authentication
- **Mongoose** - MongoDB object modeling

## 📁 Project Structure

```
lunar-ai/
├── frontend/
│   ├── public/
│   │   ├── assets/
│   │   │   ├── lunar-rabbit.svg
│   │   │   ├── moon.svg
│   │   │   └── stars.svg
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Chat/
│   │   │   ├── Navbar/
│   │   │   ├── LunarRabbit/
│   │   │   ├── DocumentUpload/
│   │   │   └── ChatHistory/
│   │   ├── pages/
│   │   │   ├── Home.js
│   │   │   ├── Dashboard.js
│   │   │   ├── Login.js
│   │   │   └── Signup.js
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   └── authService.js
│   │   ├── styles/
│   │   │   └── lunar-theme.css
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   └── .env.example
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   ├── ChatSession.js
│   │   └── Message.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── chat.js
│   │   └── user.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── chatController.js
│   │   └── userController.js
│   ├── middleware/
│   │   └── auth.js
│   ├── config/
│   │   └── db.js
│   ├── server.js
│   ├── package.json
│   └── .env.example
├── .gitignore
└── README.md
```

## 🌙 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- OpenAI API key or similar AI service
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/lunar-ai.git
   cd lunar-ai
   ```

2. **Set up the Backend**
   ```bash
   cd backend
   npm install
   ```
   
   Create a `.env` file:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/lunar-ai
   JWT_SECRET=your_jwt_secret_key
   OPENAI_API_KEY=your_openai_api_key
   NODE_ENV=development
   ```

3. **Set up the Frontend**
   ```bash
   cd ../frontend
   npm install
   ```
   
   Create a `.env` file:
   ```
   REACT_APP_API_URL=http://localhost:5000/api
   ```

4. **Start MongoDB**
   ```bash
   mongod
   ```

5. **Start the Backend Server** (from backend directory)
   ```bash
   npm start
   ```
   Server runs on `http://localhost:5000`

6. **Start the Frontend** (from frontend directory in a new terminal)
   ```bash
   npm start
   ```
   Frontend runs on `http://localhost:3000`

## 🎮 How to Use

1. **Create an Account** - Sign up with your email
2. **Meet Luna** - Your lunar rabbit AI guide appears on screen
3. **Start Chatting** - Ask Luna any homework or study-related question
4. **Upload Documents** - Share essays or assignments for feedback
5. **Save Sessions** - Bookmark important conversations
6. **Learn & Grow** - Track your progress over time

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new student account
- `POST /api/auth/login` - Login to account
- `POST /api/auth/logout` - Logout and end session

### Chat & Messages
- `POST /api/chat/message` - Send message to Luna
- `GET /api/chat/history` - Get all chat sessions
- `GET /api/chat/:sessionId` - Get specific session history
- `DELETE /api/chat/:sessionId` - Delete chat session
- `POST /api/chat/upload` - Upload document for review

### User Profile
- `GET /api/user/profile` - Get user information
- `PUT /api/user/profile` - Update profile
- `GET /api/user/stats` - Get learning statistics

## 🎨 Design Philosophy

Lunar AI features a calming, celestial theme:
- **Colors**: Deep blues, purples, silvers, and glowing accents
- **Typography**: Modern, clean fonts for easy reading
- **Mascot**: Adorable lunar rabbit character (Luna) that guides students
- **Atmosphere**: Peaceful space environment for focused studying
- **Animations**: Subtle lunar-themed transitions and micro-interactions

## 🤝 Contributing

We welcome contributions! Please feel free to:
- Report bugs
- Suggest new features
- Submit pull requests
- Improve documentation

## 📄 License

MIT License - feel free to use this project for educational and commercial purposes

## 🌟 Support

- 📧 Email: support@lunar-ai.edu
- 💬 Discord: Join our study community
- 📚 Documentation: Check our wiki for detailed guides
- 🐛 Report Issues: Use the GitHub issues tracker

## 🚀 Roadmap

- [ ] Mobile app version
- [ ] Real-time collaboration features
- [ ] Advanced math equation solver
- [ ] Multi-language support
- [ ] Peer review matching
- [ ] AI-powered study plans
- [ ] Integration with popular learning platforms

---

**Made with 🌙 and 🐰 for students everywhere**

*May your studies be as peaceful as a night under the moonlight!* ✨