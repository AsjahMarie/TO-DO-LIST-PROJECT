const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('register')

// Register button event listener
registerBtn.addEventListener('click', () => {

    container.classList.add("active");
});
    
loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});

document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');
    
    var calendar = new FullCalendar.Calendar(calendarEl, {
        // Configure FullCalendar options here
        // For instance, initialView, header, events, etc.
        // You can find FullCalendar options in the documentation: https://fullcalendar.io/docs

        // Example: Displaying events
        events: [
            {
                title: 'Meeting',
                start: '2023-10-30T10:00:00',
                end: '2023-10-30T12:00:00'
            },
            // Add more events as needed
        ],

        // Handle date click event to show tasks for the selected date
        dateClick: function(info) {
            var date = info.dateStr;
            displayTasksForDate(date);
        }
    });

    calendar.render();

    // Function to display tasks for the selected date
    function displayTasksForDate(date) {
        // Clear existing tasks
        document.getElementById('task-list').innerHTML = '';

        // Fetch tasks for the selected date from your data or database
        // Replace this with your logic to fetch tasks based on the selected date
        // Example: Fetch tasks for the selected date from an array
        var tasksForDate = [
            { task: 'Task 1', time: '10:00 AM' },
            { task: 'Task 2', time: '11:00 AM' }
            // Add more tasks as needed
        ];

        tasksForDate.forEach(function(task) {
            // Create elements to display tasks
            var taskElement = document.createElement('div');
            taskElement.textContent = task.task + ' at ' + task.time;

            // Append tasks to the task list container
            document.getElementById('task-list').appendChild(taskElement);
        });
    }
    // Previous code remains the same

// Function to add tasks to the calendar
function addTask() {
    var task = document.getElementById('task-input').value;
    var date = document.getElementById('date-input').value;

    if (task && date) {
        // Push the new task to the events array for FullCalendar
        calendar.addEvent({
            title: task,
            start: date
        });

        // Optional: You might want to update the task list for the selected date
        displayTasksForDate(date);
    } else {
        alert("Please enter both task and date.");
    }
}

});

//task-list.html js code
const input = document.querySelector("input");
const addButton = document.querySelector(".add-button");
const todosHtml = document.querySelector(".todos");
const emptyImage = document.querySelector(".empty-image");
let todosJson = JSON.parse(localStorage.getItem("todos")) || [];
const deleteAllButton = document.querySelector(".delete-all");
const filters = document.querySelectorAll(".filter");
let filter = '';

showTodos();

function getTodoHtml(todo, index) {
  if (filter && filter != todo.status) {
    return '';
  }
  let checked = todo.status == "completed" ? "checked" : "";
  return /* html */ `
    <li class="todo">
      <label for="${index}">
        <input id="${index}" onclick="updateStatus(this)" type="checkbox" ${checked}>
        <span class="${checked}">${todo.name}</span>
      </label>
      <button class="delete-btn" data-index="${index}" onclick="remove(this)"><i class="fa fa-times"></i></button>
    </li>
  `; 
}

function showTodos() {
  if (todosJson.length == 0) {
    todosHtml.innerHTML = '';
    emptyImage.style.display = 'block';
  } else {
    todosHtml.innerHTML = todosJson.map(getTodoHtml).join('');
    emptyImage.style.display = 'none';
  }
}

function addTodo(todo)  {
  input.value = "";
  todosJson.unshift({ name: todo, status: "pending" });
  localStorage.setItem("todos", JSON.stringify(todosJson));
  showTodos();
}

input.addEventListener("keyup", e => {
  let todo = input.value.trim();
  if (!todo || e.key != "Enter") {
    return;
  }
  addTodo(todo);
});

addButton.addEventListener("click", () => {
  let todo = input.value.trim();
  if (!todo) {
    return;
  }
  addTodo(todo);
});

function updateStatus(todo) {
  let todoName = todo.parentElement.lastElementChild;
  if (todo.checked) {
    todoName.classList.add("checked");
    todosJson[todo.id].status = "completed";
  } else {
    todoName.classList.remove("checked");
    todosJson[todo.id].status = "pending";
  }
  localStorage.setItem("todos", JSON.stringify(todosJson));
}

function remove(todo) {
  const index = todo.dataset.index;
  todosJson.splice(index, 1);
  showTodos();
  localStorage.setItem("todos", JSON.stringify(todosJson));
}

filters.forEach(function (el) {
  el.addEventListener("click", (e) => {
    if (el.classList.contains('active')) {
      el.classList.remove('active');
      filter = '';
    } else {
      filters.forEach(tag => tag.classList.remove('active'));
      el.classList.add('active');
      filter = e.target.dataset.filter;
    }
    showTodos();
  });
});

deleteAllButton.addEventListener("click", () => {
  todosJson = [];
  localStorage.setItem("todos", JSON.stringify(todosJson));
  showTodos();
});

