// To-Do List Application with Local Storage

class TodoApp {
    constructor() {
        // DOM Elements
        this.todoInput = document.getElementById('todoInput');
        this.addBtn = document.getElementById('addBtn');
        this.todoList = document.getElementById('todoList');
        this.emptyState = document.getElementById('emptyState');
        this.clearCompletedBtn = document.getElementById('clearCompletedBtn');
        this.clearAllBtn = document.getElementById('clearAllBtn');
        this.exportBtn = document.getElementById('exportBtn');
        this.filterBtns = document.querySelectorAll('.filter-btn');
        this.quickBtns = document.querySelectorAll('.quick-btn');
        this.totalCount = document.getElementById('totalCount');
        this.completedCount = document.getElementById('completedCount');
        this.notification = document.getElementById('notification');

        // App State
        this.todos = [];
        this.currentFilter = 'all';
        this.currentCategory = '';
        this.STORAGE_KEY = 'lunar_todos';

        // Initialize
        this.loadTodos();
        this.attachEventListeners();
        this.render();
    }

    /**
     * Attach all event listeners
     */
    attachEventListeners() {
        // Add button and Enter key
        this.addBtn.addEventListener('click', () => this.addTodo());
        this.todoInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addTodo();
        });

        // Filter buttons
        this.filterBtns.forEach(btn => {
            btn.addEventListener('click', () => this.setFilter(btn.dataset.filter, btn));
        });

        // Quick add buttons
        this.quickBtns.forEach(btn => {
            btn.addEventListener('click', () => this.setQuickCategory(btn.dataset.category));
        });

        // Action buttons
        this.clearCompletedBtn.addEventListener('click', () => this.clearCompleted());
        this.clearAllBtn.addEventListener('click', () => this.clearAll());
        this.exportBtn.addEventListener('click', () => this.exportTasks());
    }

    /**
     * Add a new todo
     */
    addTodo() {
        const text = this.todoInput.value.trim();

        if (!text) {
            this.showNotification('Please enter a task!', 'error');
            return;
        }

        if (text.length > 100) {
            this.showNotification('Task is too long! (Max 100 characters)', 'error');
            return;
        }

        const todo = {
            id: Date.now(),
            text: text,
            completed: false,
            category: this.currentCategory,
            createdAt: new Date().toLocaleDateString()
        };

        this.todos.unshift(todo);
        this.saveTodos();
        this.render();
        this.todoInput.value = '';
        this.showNotification('Task added successfully! 🎉', 'success');
    }

    /**
     * Toggle todo completion status
     */
    toggleTodo(id) {
        const todo = this.todos.find(t => t.id === id);
        if (todo) {
            todo.completed = !todo.completed;
            this.saveTodos();
            this.render();
        }
    }

    /**
     * Delete a todo
     */
    deleteTodo(id) {
        this.todos = this.todos.filter(t => t.id !== id);
        this.saveTodos();
        this.render();
        this.showNotification('Task deleted! 🗑️', 'success');
    }

    /**
     * Set active filter
     */
    setFilter(filter, btn) {
        this.currentFilter = filter;
        this.filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.render();
    }

    /**
     * Set quick category for next task
     */
    setQuickCategory(category) {
        this.currentCategory = category;
        this.todoInput.focus();
        this.showNotification(`Category set to: ${category}`, 'success');
    }

    /**
     * Clear all completed todos
     */
    clearCompleted() {
        const completedCount = this.todos.filter(t => t.completed).length;
        
        if (completedCount === 0) {
            this.showNotification('No completed tasks to clear!', 'warning');
            return;
        }

        if (confirm(`Delete ${completedCount} completed task(s)?`)) {
            this.todos = this.todos.filter(t => !t.completed);
            this.saveTodos();
            this.render();
            this.showNotification(`Cleared ${completedCount} completed task(s)! ✨`, 'success');
        }
    }

    /**
     * Clear all todos
     */
    clearAll() {
        if (this.todos.length === 0) {
            this.showNotification('No tasks to clear!', 'warning');
            return;
        }

        if (confirm(`Delete all ${this.todos.length} task(s)? This cannot be undone!`)) {
            this.todos = [];
            this.saveTodos();
            this.render();
            this.showNotification('All tasks cleared! 🌟', 'success');
        }
    }

    /**
     * Export tasks as JSON
     */
    exportTasks() {
        if (this.todos.length === 0) {
            this.showNotification('No tasks to export!', 'warning');
            return;
        }

        const dataStr = JSON.stringify(this.todos, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `lunar-todos-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        URL.revokeObjectURL(url);

        this.showNotification('Tasks exported! 📥', 'success');
    }

    /**
     * Get filtered todos based on current filter
     */
    getFilteredTodos() {
        switch (this.currentFilter) {
            case 'active':
                return this.todos.filter(t => !t.completed);
            case 'completed':
                return this.todos.filter(t => t.completed);
            case 'all':
            default:
                return this.todos;
        }
    }

    /**
     * Update statistics
     */
    updateStats() {
        const total = this.todos.length;
        const completed = this.todos.filter(t => t.completed).length;

        this.totalCount.textContent = total;
        this.completedCount.textContent = completed;
    }

    /**
     * Render the todo list
     */
    render() {
        this.todoList.innerHTML = '';
        const filteredTodos = this.getFilteredTodos();

        if (filteredTodos.length === 0) {
            this.emptyState.classList.add('show');
            this.todoList.style.display = 'none';
        } else {
            this.emptyState.classList.remove('show');
            this.todoList.style.display = 'block';

            filteredTodos.forEach(todo => {
                const li = document.createElement('li');
                li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
                li.innerHTML = `
                    <input 
                        type="checkbox" 
                        class="checkbox" 
                        ${todo.completed ? 'checked' : ''}
                        data-id="${todo.id}"
                    >
                    <div class="todo-content">
                        <span class="todo-text">${this.escapeHtml(todo.text)}</span>
                        <div style="display: flex; gap: 10px; align-items: center;">
                            ${todo.category ? `<span class="todo-category">${this.getCategoryEmoji(todo.category)} ${todo.category}</span>` : ''}
                            <span class="todo-date">${todo.createdAt}</span>
                        </div>
                    </div>
                    <button class="delete-btn-todo" data-id="${todo.id}">Delete</button>
                `;

                // Event listeners
                const checkbox = li.querySelector('.checkbox');
                checkbox.addEventListener('change', () => this.toggleTodo(todo.id));

                const deleteBtn = li.querySelector('.delete-btn-todo');
                deleteBtn.addEventListener('click', () => this.deleteTodo(todo.id));

                this.todoList.appendChild(li);
            });
        }

        this.updateStats();
    }

    /**
     * Get emoji for category
     */
    getCategoryEmoji(category) {
        const emojis = {
            'work': '💼',
            'personal': '👤',
            'shopping': '🛍️',
            'health': '💪'
        };
        return emojis[category] || '📌';
    }

    /**
     * Escape HTML to prevent XSS
     */
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    /**
     * Show notification message
     */
    showNotification(message, type = 'success') {
        this.notification.textContent = message;
        this.notification.className = `notification show ${type}`;

        setTimeout(() => {
            this.notification.classList.remove('show');
        }, 3000);
    }

    /**
     * Save todos to local storage
     */
    saveTodos() {
        try {
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.todos));
        } catch (e) {
            console.error('Failed to save todos:', e);
            this.showNotification('Failed to save tasks!', 'error');
        }
    }

    /**
     * Load todos from local storage
     */
    loadTodos() {
        try {
            const stored = localStorage.getItem(this.STORAGE_KEY);
            this.todos = stored ? JSON.parse(stored) : [];
        } catch (e) {
            console.error('Failed to load todos:', e);
            this.todos = [];
            this.showNotification('Failed to load tasks!', 'error');
        }
    }
}

// Initialize the app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new TodoApp();
});
