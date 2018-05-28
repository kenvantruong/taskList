// name the variables
const form = document.querySelector('#task-form'); // <form id="task-form">
const clearBtn = document.querySelector('.clear-tasks'); // <a href="#" class="clear-tasks btn black">Clear Tasks</a>
const taskList = document.querySelector('.collection'); // <ul class="collection"></ul>
const filter = document.querySelector('#filter'); // Filter Input
const taskInput = document.querySelector('#task'); // User Input

// Load all event listeners "return()"
loadEventListeners();

// Load all event listeners
function loadEventListeners() {
  // Add Task Event
  form.addEventListener('submit', addTask);

  // Remove Task Event (Step 2)
  taskList.addEventListener('click', removeTask);

  // Clear Task Event (Step 3)
  clearBtn.addEventListener('click', clearTasks);

  // Filter Tasks Event (Step 4)
  filter.addEventListener('keyup', filterTasks);

  // DOM Load Event (Step 5)
  document.addEventListener('DOMContentLoaded', getTasks);

}

// Get Tasks from Local Storage (Step 5)
function getTasks() {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function (task) {
    const li = document.createElement('li');
    // Add class
    li.className = 'collection-item';
    // Create Text Node made by user and append to li
    li.appendChild(document.createTextNode(task));
    // Create new link element
    const link = document.createElement('a');
    // Add class
    link.className = 'delete-item secondary-content';
    // Add icon HTML
    link.innerHTML = '<i class="fa fa-remove"></li>"';
    // Append the link to li
    li.appendChild(link);

    // Append li to ul '<ul class="collection"></ul>'
    taskList.appendChild(li);
  });
}


// Add Task
function addTask(e) {
  if (taskInput.value === '') {
    alert('Add a task!');
  }
  /* So when a user input a task we will create a li element */
  const li = document.createElement('li');
  // Add class
  li.className = 'collection-item';
  // Create Text Node made by user and append to li
  li.appendChild(document.createTextNode(taskInput.value));
  // Create new link element
  const link = document.createElement('a');
  // Add class
  link.className = 'delete-item secondary-content';
  // Add icon HTML
  link.innerHTML = '<i class="fa fa-remove"></li>"';
  // Append the link to li
  li.appendChild(link);

  // Append li to ul '<ul class="collection"></ul>'
  taskList.appendChild(li);

  // Store in Local Storage (Step 4) -----
  storeTaskInLocalStorage(taskInput.value);

  // Clear Input
  taskInput.value = '';

  e.preventDefault();
}

// Store Task (Step 4) -----
function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

/****************************** 
// Remove Task (Step 2)
******************************/

function removeTask(e) {

  if (e.target.parentElement.classList.contains('delete-item')) {
    if (confirm('Delete Item: Are You Sure?')) {
      e.target.parentElement.parentElement.remove();

      // Remove from Local Storage (Step 5)
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }

  e.preventDefault();
}

// Remove from Local Storage (Step 5)
function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function (task, index) {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

/****************************** 
// Clear Tasks (Step 3)
******************************/
function clearTasks(e) {
  taskList.innerHTML = '';

  // Faster
  while (taskList.firstChild) {

    /* Method One */
    // taskList.innerHTML = '';

    /* Method Two: Faster */
    while (taskList.firstChild) {
      taskList.removeChild(taskList.firstChild);
    }
  }

  // Clear from Local Storage (Step 5)
  clearTasksFromLocalStorage();
  e.preventDefault();
}

// Clear Tasks From Local Storage
function clearTasksFromLocalStorage() {
  localStorage.clear();
}


/****************************** 
// Filter Tasks (Step 4)
******************************/
function filterTasks(e) {
  // set to lower case the user input
  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach(function (task) {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });
}