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

  // Clear Input
  taskInput.value = '';

  e.preventDefault();
}

/****************************** 
// Remove Task (Step 2)
******************************/

function removeTask(e) {

  if (e.target.parentElement.classList.contains('delete-item')) {
    if (confirm('Delete Item: Are You Sure?')) {
      e.target.parentElement.parentElement.remove();
    }
  }

  e.preventDefault();
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


  e.preventDefault();
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