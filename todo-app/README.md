# 🌙 Lunar To-Do List Application

A beautiful, fully-functional to-do list application with local storage functionality, categories, and filtering options.

## ✨ Features

### Core Features
- ✅ **Add Tasks** - Create new tasks with a simple input
- 📝 **Task Categories** - Organize tasks by Work, Personal, Shopping, or Health
- ✔️ **Mark Complete** - Check off completed tasks
- 🗑️ **Delete Tasks** - Remove individual tasks
- 💾 **Local Storage** - All tasks are automatically saved to your browser

### Advanced Features
- 🔍 **Filter Tasks** - View All, Active, or Completed tasks
- 📊 **Statistics** - See total and completed task counts
- 🧹 **Clear Completed** - Bulk delete all completed tasks
- 📥 **Export Tasks** - Download tasks as JSON file
- 🌙 **Lunar Theme** - Beautiful dark theme with cosmic vibes
- 📱 **Responsive Design** - Works on desktop, tablet, and mobile
- 🔔 **Notifications** - Visual feedback for all actions

## 🚀 How to Use

### Getting Started
1. Open `index.html` in your web browser
2. Start adding tasks!

### Adding Tasks
```
1. Type your task in the input field
2. Press Enter or click "Add Task" button
3. (Optional) Use quick category buttons to set a category
```

### Managing Tasks
- **Complete a Task**: Click the checkbox next to the task
- **Delete a Task**: Click the "Delete" button
- **Filter Tasks**: Use filter buttons (All, Active, Completed)
- **Set Category**: Click a category button before adding a task

### Bulk Actions
- **Clear Completed**: Removes all completed tasks
- **Clear All**: Removes all tasks (with confirmation)
- **Export**: Downloads tasks as JSON file

## 📁 File Structure

```
todo-app/
├── index.html    # Main HTML structure
├── styles.css    # Complete styling with animations
├── app.js        # Application logic and local storage
└── README.md     # This file
```

## 💾 Local Storage

All tasks are automatically saved to your browser's local storage under the key `lunar_todos`.

**How it works:**
- Tasks are saved every time you add, delete, or toggle a task
- When you refresh or reopen the page, all your tasks are restored
- Data is stored locally on your device (not on any server)
- Clearing browser data will delete stored tasks

**Storage Format:**
```json
{
  "id": 1234567890,
  "text": "Task description",
  "completed": false,
  "category": "work",
  "createdAt": "12/6/2026"
}
```

## 🎨 Design Features

### Theme
- Dark cosmic background with lunar gradient
- Glowing effects and smooth animations
- Color-coded categories
- Responsive grid layout

### Animations
- Slide-down header animation
- Slide-in task animations
- Smooth hover effects
- Notification animations

### Accessibility
- Semantic HTML structure
- Clear visual feedback
- Keyboard navigation support
- High contrast colors

## 🔧 Technical Details

### Local Storage API
```javascript
// Saving
localStorage.setItem('key', JSON.stringify(data));

// Loading
const data = JSON.parse(localStorage.getItem('key'));
```

### Class-Based Architecture
The app uses a `TodoApp` class to manage:
- DOM manipulation
- Event handling
- State management
- Local storage operations

### Data Validation
- Input length validation (max 100 characters)
- Empty input checking
- XSS protection with HTML escaping
- Error handling for storage operations

## 📊 Statistics Tracking

- **Total Tasks**: Count of all tasks
- **Completed Tasks**: Count of finished tasks
- **Active Tasks**: Count of pending tasks
- **Completion Rate**: Derived from stats

## 🛠️ Browser Compatibility

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers
- ⚠️ Requires JavaScript enabled
- ⚠️ Requires LocalStorage support

## 📱 Responsive Design

- Desktop (1200px+): Full layout with all features
- Tablet (768px-1199px): Optimized grid layout
- Mobile (< 768px): Single column layout

## 🚀 Future Enhancements

- [ ] Drag and drop to reorder tasks
- [ ] Due dates and reminders
- [ ] Task priority levels
- [ ] Search functionality
- [ ] Cloud sync across devices
- [ ] Dark/Light theme toggle
- [ ] Task notes and descriptions
- [ ] Recurring tasks
- [ ] Category custom colors
- [ ] Keyboard shortcuts

## 🐛 Troubleshooting

### Tasks not saving?
- Check if LocalStorage is enabled in browser settings
- Ensure you're not in private/incognito mode
- Clear browser cache and try again

### Tasks disappeared?
- Clearing browser data deletes local storage
- Export your tasks regularly as backup

### Performance issues?
- Works smoothly with 1000+ tasks
- If slow, try clearing old completed tasks

## 📄 License

MIT License - Free to use and modify

## 🌟 Credits

Made with 🌙 and ❤️ by Luna

---

**Enjoy organizing your tasks with Luna's cosmic to-do list! 🐰✨**
