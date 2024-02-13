document.addEventListener("DOMContentLoaded", function () {
    const prevBtn = document.getElementById("prev-btn");
    const todayBtn = document.getElementById("today-btn");
    const nextBtn = document.getElementById("next-btn");
    const calendarContainer = document.getElementById("calendar-container");
    const taskList = document.getElementById("task-list");
  
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
  });
  