// script.js
document.addEventListener("DOMContentLoaded", function () {
    const prevBtn = document.getElementById("prev-btn");
    const todayBtn = document.getElementById("today-btn");
    const nextBtn = document.getElementById("next-btn");
    const calendarContainer = document.getElementById("calendar-container");
    const taskList = document.getElementById("task-list");
  
    // Initialize date object
    let currentDate = new Date();
  
    // Render initial calendar
    renderCalendar(currentDate);
  
    // Event listeners for buttons
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
  
    // Function to render calendar
    function renderCalendar(date) {
      calendarContainer.innerHTML = ""; // Clear previous calendar
  
      const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];
      const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
      const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
      const monthName = monthNames[date.getMonth()];
      const year = date.getFullYear();
  
      // Display month and year
      const monthYearHeader = document.createElement("h3");
      monthYearHeader.textContent = `${monthName} ${year}`;
      calendarContainer.appendChild(monthYearHeader);
  
      // Create table for days
      const table = document.createElement("table");
      const tr = document.createElement("tr");
  
      // Add days of the week headers
      for (let i = 0; i < 7; i++) {
        const th = document.createElement("th");
        th.textContent = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][i];
        tr.appendChild(th);
      }
      table.appendChild(tr);
  
      let dateCounter = 1;
      // Create the calendar grid
      for (let i = 0; i < 6; i++) {
        const tr = document.createElement("tr");
        for (let j = 0; j < 7; j++) {
          const td = document.createElement("td");
          if (i === 0 && j < firstDayOfMonth) {
            // Empty cells before the start of the month
            td.textContent = "";
          } else if (dateCounter > daysInMonth) {
            // Empty cells after the end of the month
            td.textContent = "";
          } else {
            td.textContent = dateCounter;
            td.addEventListener("click", function () {
              displayTasks(new Date(year, date.getMonth(), dateCounter));
            });
            if (dateCounter === date.getDate() && date.getMonth() === currentDate.getMonth() && date.getFullYear() === currentDate.getFullYear()) {
              // Highlight current date
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
  
    // Function to display tasks for selected date
    function displayTasks(selectedDate) {
      // Example: You would fetch tasks from a database or some other data source here
      // For this example, let's just display a sample task
      const dateString = selectedDate.toDateString();
      const task = `Sample Task for ${dateString}`;
      taskList.innerHTML = `<p>${task}</p>`;
    }
  });
  