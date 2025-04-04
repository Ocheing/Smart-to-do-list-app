const taskInput = document.getElementById('taskInput');
const taskNotepad = document.getElementById('taskNotepad');
const darkModeToggle = document.getElementById('darkModeToggle');

let tasks = []; 
let selectedTaskIndex = -1; 

// Toggle Dark Mode
darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    darkModeToggle.textContent = document.body.classList.contains('dark-mode') ? '🌞' : '🌙';
});

// Add Task Functionality
function addTask() {
    const taskText = taskInput.value.trim();
    const taskPriority = document.getElementById('prioritySelect').value;

    if (taskText === '') {
        alert('Please enter a task');
        return;
    }

    // Add task to the tasks array with priority
    const task = {
        text: taskText,
        priority: taskPriority,
    };

    if (selectedTaskIndex === -1) {
        tasks.push(task); 
    } else {
        tasks[selectedTaskIndex] = task; 
        selectedTaskIndex = -1; 
    }

    updateTaskList();
    taskInput.value = ''; 
}

// Delete Task Functionality
function deleteTask(index) {
    tasks.splice(index, 1); 
    updateTaskList(); 
}

// Edit Task Functionality
function editTask(index) {
    const task = tasks[index];
    taskInput.value = task.text; 
    selectedTaskIndex = index; 
}

// Update the Task List in the Notepad
function updateTaskList() {
    let taskListText = '';

    tasks.forEach((task, index) => {
        let priorityColor;
        switch (task.priority) {
            case 'high':
                priorityColor = 'red';
                break;
            case 'medium':
                priorityColor = 'orange';
                break;
            default:
                priorityColor = 'green';
        }

        taskListText += `<div style="color: ${priorityColor}" onclick="selectTaskForEdit(${index})">
                           ${task.text} (Priority: ${task.priority})
                         </div>
                         <button onclick="editTask(${index}); event.stopPropagation();">Edit</button>
                         <button onclick="deleteTask(${index}); event.stopPropagation();">Delete</button>`;
    });

    taskNotepad.innerHTML = taskListText;
}

// Select Task for Editing
function selectTaskForEdit(index) {
    const task = tasks[index];
    taskInput.value = task.text; 
    selectedTaskIndex = index; 
}
