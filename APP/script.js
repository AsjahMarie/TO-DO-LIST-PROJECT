const addTaskBtn = document.getElementById('add-task-btn');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const username = document.getElementById('username').value;
const password = document.getElementById('password').value;

// Task model
class Task {
    constructor(taskText) {
        this.taskText = taskText;
    }
}

// Task view
function displayTask(task) {
    const taskDiv = document.createElement('div');
    taskDiv.classList.add('task');

    const taskText = document.createElement('p');
    taskText.textContent = task.taskText;

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete-btn');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => {
        taskList.removeChild(taskDiv);
    });

    taskDiv.appendChild(taskText);
    taskDiv.appendChild(deleteBtn);

    taskList.appendChild(taskDiv);
}

// Task controller
function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText) {
        const task = new Task(taskText);
        displayTask(task);
        taskInput.value = '';
    }
}

addTaskBtn.addEventListener('click', addTask);

document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();

    // Replace the below condition with your actual login condition
    if (username === 'test' && password === 'test') {
        window.location.href = 'home.html';
    } else {
        alert('Invalid credentials');
    }
});


