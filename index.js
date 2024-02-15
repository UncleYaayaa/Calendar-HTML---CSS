document.addEventListener("DOMContentLoaded", function () {
    const prevBtn = document.getElementById("prev-btn");
    const todayBtn = document.getElementById("today-btn");
    const nextBtn = document.getElementById("next-btn");
    const calendarContainer = document.getElementById("calendar-container");
    const taskList = document.getElementById("task-list");
     // Selecting social media card elements
     const facebookCard = document.getElementById("facebook");
     const twitterCard = document.getElementById("twitter");
     const instagramCard = document.getElementById("instagram");
     const youtubeCard = document.getElementById("Youtube"); // Ensure IDs match case exactly
     const pinterestCard = document.getElementById("Pinterest"); // Ensure IDs match case exactly
  
    let currentDate = new Date();
    renderCalendar(currentDate);
  
    prevBtn.addEventListener("click", function () {
      currentDate.setMonth(currentDate.getMonth() - 1);
      renderCalendar(currentDate);
    });
  
    nextBtn.addEventListener("click", function () {
      currentDate.setMonth(currentDate.getMonth() + 1);
      renderCalendar(currentDate);
    });
  
    todayBtn.addEventListener("click", function () {
      currentDate = new Date();
      renderCalendar(currentDate);
    });
  
    function renderCalendar(date) {
      calendarContainer.innerHTML = "";
      const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];
      const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
      const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
      const monthName = monthNames[date.getMonth()];
      const year = date.getFullYear();
  
      const monthYearHeader = document.createElement("h3");
      monthYearHeader.textContent = `${monthName} ${year}`;
      calendarContainer.appendChild(monthYearHeader);
  
      const table = document.createElement("table");
      const tr = document.createElement("tr");
  
      for (let i = 0; i < 7; i++) {
        const th = document.createElement("th");
        th.textContent = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][i];
        tr.appendChild(th);
      }
      table.appendChild(tr);
  
      let dateCounter = 1;
  
      for (let i = 0; i < 6; i++) {
        const tr = document.createElement("tr");
        for (let j = 0; j < 7; j++) {
          const td = document.createElement("td");
          if (i === 0 && j < firstDayOfMonth) {
            td.textContent = "";
          } else if (dateCounter > daysInMonth) {
            td.textContent = "";
          } else {
            td.textContent = dateCounter;
            const selectedDate = new Date(year, date.getMonth(), dateCounter);
            td.addEventListener("click", function () {
              displayTasks(selectedDate);
            });
            const today = new Date();
            const todayDate = today.getDate();
            const todayMonth = today.getMonth();
            const todayYear = today.getFullYear();
  
            if (
              dateCounter === todayDate &&
              date.getMonth() === todayMonth &&
              date.getFullYear() === todayYear
            ) {
              td.classList.add("highlight");
            }
            dateCounter++;
          }
          tr.appendChild(td);
        }
        table.appendChild(tr);
      }
      calendarContainer.appendChild(table);
    }
  
    function displayTasks(selectedDate) {
      const dateString = selectedDate.toISOString().split("T")[0];
      const tasks = {
        "2024-02-12": ["Task 1", "Task 2"],
        "2024-02-13": ["Task 3", "Task 4"],
        // Add more task data as needed
      };
  
      const taskListData = tasks[dateString] || ["No tasks for this date"];
      taskList.innerHTML = "";
      taskListData.forEach(task => {
        const taskItem = document.createElement("p");
        taskItem.textContent = task;
        taskList.appendChild(taskItem);
      });
    }
 // Adding click event listeners to social media cards
 facebookCard.addEventListener("click", function () {
  createTaskPopup("Facebook");
});

twitterCard.addEventListener("click", function () {
  createTaskPopup("Twitter");
});

instagramCard.addEventListener("click", function () {
  createTaskPopup("Instagram");
});

youtubeCard.addEventListener("click", function () {
  createTaskPopup("Youtube");
});

pinterestCard.addEventListener("click", function () {
  createTaskPopup("Pinterest");
});

// Function to create a task pop-up
function createTaskPopup(socialMedia) {
  // Create a pop-up container element
  const popupContainer = document.createElement("div");
  popupContainer.classList.add("task-popup");

  // Create elements for task input, date selector, time selector, and submit button
  popupContainer.innerHTML = `
      <h3>Create Task for ${socialMedia}</h3>
      <input type="text" id="task-input" placeholder="Enter task...">
      <input type="date" id="task-date">
      <input type="time" id="task-time">
      <button id="submit-task-btn">Submit</button>
  `;

  // Add pop-up container to the document body
  document.body.appendChild(popupContainer);

  // Function to handle task submission
  function submitTask() {
    const taskInput = document.getElementById("task-input").value;
    const taskDate = document.getElementById("task-date").value;
    const taskTime = document.getElementById("task-time").value;

    // Save task locally using localStorage
    const tasks = JSON.parse(localStorage.getItem("tasks")) || {};
    if (!tasks[taskDate]) {
        tasks[taskDate] = [];
    }
    tasks[taskDate].push({ time: taskTime, task: taskInput });
    localStorage.setItem("tasks", JSON.stringify(tasks));

    // Display the saved task within the right section card
    displayTasks(taskDate);

    // Close the pop-up after submitting the task
    document.body.removeChild(popupContainer);
}

// Function to display tasks within the right section card
function displayTasks(selectedDate) {
    const taskList = document.getElementById("task-list");
    taskList.innerHTML = "";

    const tasks = JSON.parse(localStorage.getItem("tasks")) || {};
    const taskListData = tasks[selectedDate] || ["No tasks for this date"];
    taskListData.forEach(task => {
        const taskItem = document.createElement("p");
        taskItem.textContent = `${task.time}: ${task.task}`;
        taskList.appendChild(taskItem);
    });

      // Close the pop-up after submitting the task
      document.body.removeChild(popupContainer);
  }

  // Add event listener to submit button
  const submitBtn = document.getElementById("submit-task-btn");
  submitBtn.addEventListener("click", submitTask);
}
  });