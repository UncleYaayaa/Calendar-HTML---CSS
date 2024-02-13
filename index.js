// Define global variables
let currentMonth = 1; // February is 1-based
let currentYear = 2024;
let selectedDate;
const modal = document.getElementById("taskModal");
const closeBtn = document.getElementsByClassName("close")[0];

// Function to open the modal
function openModal(date) {
    const modalDate = document.getElementById("modalDate");
    modalDate.textContent = date.toDateString(); // Display the selected date in the modal

    const taskListContainer = document.getElementById("taskListContainer");
    const selectedDateSpan = document.getElementById("selectedDate");
    selectedDateSpan.textContent = date.toDateString(); // Update selected date in task list header

    taskListContainer.innerHTML = ''; // Clear previous tasks

    // Retrieve tasks for the selected date from localStorage
    const tasks = getTasksForDate(date);
    if (tasks.length === 0) {
        taskListContainer.innerHTML = '<p>No tasks for this date.</p>';
    } else {
        const taskList = document.createElement('ul');
        taskList.id = "taskList";
        tasks.forEach(task => {
            const taskItem = document.createElement('li');
            taskItem.textContent = task;
            taskList.appendChild(taskItem);
        });
        taskListContainer.appendChild(taskList);
    }

    // Display the task list card
    const taskListCard = document.querySelector('.task-list');
    taskListCard.style.display = "block"; // Display the task list card

    // Hide the modal
    modal.style.display = "none";
}


// Close the modal when the user clicks outside of it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Function to save task for a specific date
function saveTask(date, task) {
    const tasks = getTasksForDate(date);
    tasks.push(task);
    localStorage.setItem(`task_${date.getFullYear()}_${date.getMonth() + 1}_${date.getDate()}`, JSON.stringify(tasks));
}

// Function to get tasks for a specific date from localStorage
function getTasksForDate(date) {
    const key = `task_${date.getFullYear()}_${date.getMonth() + 1}_${date.getDate()}`;
    return JSON.parse(localStorage.getItem(key)) || [];
}

// Function to render the calendar
function renderCalendar() {
    const daysContainer = document.getElementById('daysContainer');
    const monthYearHeader = document.getElementById('monthYear');
    const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();
    const firstDayOfMonth = new Date(currentYear, currentMonth - 1, 1).getDay(); // 0-based index
    const today = new Date(); // Current date

    daysContainer.innerHTML = ''; // Clear previous content

    monthYearHeader.textContent = new Date(currentYear, currentMonth - 1).toLocaleString('default', { month: 'long' }) + ' ' + currentYear;

    // Add empty cells for the days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
        const emptyCell = document.createElement('div');
        emptyCell.classList.add('day');
        daysContainer.appendChild(emptyCell);
    }

    // Add the days of the month
    for (let day = 1; day <= daysInMonth; day++) {
        const dayCell = document.createElement('div');
        dayCell.textContent = day;
        dayCell.classList.add('day');
        dayCell.addEventListener('click', function() {
            selectedDate = new Date(currentYear, currentMonth - 1, day);
            openModal(selectedDate);
        });

        // Check if there is a task for the day and add icon
        if (getTasksForDate(new Date(currentYear, currentMonth - 1, day)).length > 0) {
            const taskIcon = document.createElement('div');
            taskIcon.classList.add('task-icon');
            dayCell.appendChild(taskIcon);
        }
        
        // Highlight today's date
        if (currentMonth === today.getMonth() + 1 && currentYear === today.getFullYear() && day === today.getDate()) {
            dayCell.classList.add('today');
        }
        
        daysContainer.appendChild(dayCell);
    }
}

// Function to go to the previous month
function previousMonth() {
    currentMonth--;
    if (currentMonth < 1) {
        currentMonth = 12;
        currentYear--;
    }
    renderCalendar();
}

// Function to go to the next month
function nextMonth() {
    currentMonth++;
    if (currentMonth > 12) {
        currentMonth = 1;
        currentYear++;
    }
    renderCalendar();
}

// Function to go to today's date
function goToToday() {
    const today = new Date();
    currentMonth = today.getMonth() + 1;
    currentYear = today.getFullYear();
    renderCalendar();
}

// Initial render of the calendar
renderCalendar();
