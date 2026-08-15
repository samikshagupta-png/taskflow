const taskKey = "tasks";

function loadDashboardTasks() {
  const section = document.querySelector("#recenttasksection");
  if (!section) return; // guard against null

  const tasks = JSON.parse(localStorage.getItem(taskKey)) || [];
  section.innerHTML = `
    <h2>Recent-tasks</h2>
    <ul id="recenttasklist"></ul>
  `;

  const list = section.querySelector("#recenttasklist");

  // tasks are now objects { text, status }
  tasks.forEach(taskObj => {
    const li = document.createElement("li");
    li.textContent = taskObj.text;

    if (taskObj.status === "completed") {
      li.classList.add("completed");
    }

    list.appendChild(li);
  });

  updateStatus();
}

function updateStatus() {
  const list = document.querySelector("#recenttasklist");
  if (!list) return;

  const total = list.querySelectorAll("li").length;
  const completed = list.querySelectorAll("li.completed").length;
  const pending = total - completed;

  document.getElementById("totaltask").textContent = `Total Tasks: ${total}`;
  document.getElementById("completed").textContent = `Completed: ${completed}`;
  document.getElementById("pending").textContent = `Pending: ${pending}`;
}

// Run only when dashboard section exists
window.addEventListener("DOMContentLoaded", () => {
  if (document.querySelector("#recenttasksection")) {
    loadDashboardTasks();
  }
});
