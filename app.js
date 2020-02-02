// Defines UI Variables
// grab the form
const form = document.querySelector('#task-form');

// grab the ui element
const taskList = document.querySelector('.collection');

// grab the clear btn tag
const clearBtn = document.querySelector('.clear-tasks');

// grab the filter input field tag
const filter = document.querySelector('#filter');

// grab the task input field tag
const taskInput = document.querySelector('#task');

// Load all avent listeners
loadEventListener();

function loadEventListener(){
    //DOM Load Event
    document.addEventListener('DOMContentLoaded', getTasks);
    // Add task event
    form.addEventListener('submit', addTask);

    // remove Task event
    taskList.addEventListener('click', removeTask);

    // clear task event
    clearBtn.addEventListener('click', clearTasks);

    //Filter Events
    filter.addEventListener('keyup', filterTasks);
    
}

//get Tasks From Local Storage
function getTasks(){
    let tasks;
    // check if there is anything in Local Storage
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task){
        // Create li element
    const li = document.createElement('li');
    // add a class
    li.className = 'collection-item';
    li.appendChild(document.createTextNode(task));

    //create Link and class name
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    //Add icon
    link.innerHTML = '<i class="fa fa-remove"></i>';
    //Append the link to the li
    li.appendChild(link);

    // Append to the UI
    taskList.appendChild(li);
    });
}

// Add Task
function addTask(e){
    if(taskInput.value === ''){
        alert('Add a task');
    }

    // Create li element
    const li = document.createElement('li');
    // add a class
    li.className = 'collection-item';
    li.appendChild(document.createTextNode(taskInput.value));

    //create Link and class name
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    //Add icon
    link.innerHTML = '<i class="fa fa-remove"></i>';
    //Append the link to the li
    li.appendChild(link);

    // Append to the UI
    taskList.appendChild(li); 

    //Store in Local Storage
    storeTaskInLocalStorage(taskInput.value);
    //Clear tasks
    taskInput.value = '';
    e.preventDefault();
}

//Store task
function storeTaskInLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

// removeTask
function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
       if(confirm("Are You Sure?")){
        e.target.parentElement.parentElement.remove(); 

        //Remove from Local Storage
        removeTaskFromLocalStorage(e.target.parentElement.parentElement);
       }
    }
}

//Romove from Local Storage
function removeTaskFromLocalStorage(taskItem){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index){
        if(taskItem.textContent === task){
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//clear tasks
function clearTasks(){
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }

    //clear From Local Storage
    clearTasksFromLocalStaorage();
}

// Clear Tasks from  Local Storage
function clearTasksFromLocalStaorage(){
    localStorage.clear();
}

function filterTasks(e){
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(function(task){
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1){
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    });
}