// Store tasks in localStorage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Function to add a new task
function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskDateTime = document.getElementById('taskDateTime');
    
    if (taskInput.value.trim() === '') {
        alert('Please enter a task!');
        return;
    }

    const task = {
        id: Date.now(),
        text: taskInput.value,
        datetime: taskDateTime.value,
        completed: false
    };

    tasks.push(task);
    saveTasks();
    renderTasks();
    
    taskInput.value = '';
    taskDateTime.value = '';
}

// Function to edit a task
function editTask(id) {
    const task = tasks.find(t => t.id === id);
    const newText = prompt('Edit task:', task.text);
    
    if (newText !== null) {
        task.text = newText.trim();
        saveTasks();
        renderTasks();
    }
}

// Function to delete a task
function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveTasks();
    renderTasks();
}

// Function to toggle task completion
function toggleComplete(id) {
    const task = tasks.find(t => t.id === id);
    task.completed = !task.completed;
    saveTasks();
    renderTasks();
}

// Function to save tasks to localStorage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to render tasks
function renderTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    tasks.forEach(task => {
        const taskElement = document.createElement('div');
        taskElement.className = `task-item ${task.completed ? 'completed' : ''}`;
        
        taskElement.innerHTML = `
            <div class="task-content">
                <div>${task.text}</div>
                <div class="task-datetime">${task.datetime}</div>
            </div>
            <div class="task-actions">
                <button class="complete-btn" onclick="toggleComplete(${task.id})">
                    ${task.completed ? 'Undo' : 'Complete'}
                </button>
                <button class="edit-btn" onclick="editTask(${task.id})">Edit</button>
                <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
            </div>
        `;
        
        taskList.appendChild(taskElement);
    });
}

// Initial render
renderTasks();