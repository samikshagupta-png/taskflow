let themeswitcher = document.querySelector("#themebtn");
const form = document.querySelector(".worklist");
let task = document.querySelector("#task");
const recentTaskList = document.querySelector(".recenttask ul");
let dashboard = document.querySelector("#dashboard");
let home = document.querySelector("#homebtn");
let project = document.querySelector("#projects");
let analytics = document.querySelector("#analytics");
let navbutton = document.querySelectorAll("#navigationLinks button");

dashboard.addEventListener("click", async function() {
  const response = await fetch("pages/dashboard.html");
  const html = await response.text();
  document.querySelector("#content").innerHTML = html;

  // call dashboard loader after injection
  if (typeof loadDashboardTasks === "function") {
    loadDashboardTasks();
  }
});

home.addEventListener("click",function(){
  window.location.href="index.html";
});
project.addEventListener("click", async function() {
  const response = await fetch("pages/projects.html");
  const html = await response.text();
  document.querySelector("#content").innerHTML = html;

  // call dashboard loader after injection
  if (typeof loadDashboardTasks === "function") {
    loadDashboardTasks();
  }
});
analytics.addEventListener("click", async function() {
  const response = await fetch("pages/analytics.html");
  const html = await response.text();
  document.querySelector("#content").innerHTML = html;

  // call dashboard loader after injection
  if (typeof loadDashboardTasks === "function") {
    loadDashboardTasks();
  }
});
const gradients = [
  "linear-gradient(to right, #d0c2dc, #FFFFFF)", 
  "linear-gradient(to right, #6fb9f6, #e9b7b7)", 
  "linear-gradient(to right, #8d8a8a, #5555da)", 
  "linear-gradient(to right, #f3ecec, #b6b6be)"  
];

let current = 0; 
themeswitcher.addEventListener("click", function() {
  document.body.style.background = gradients[current];
  current = (current + 1) % gradients.length;
});
if (typeof loadDashboardTasks === "function") {
    loadDashboardTasks();
}


// ✅ Save both text and status
function saveTasks() {
  const tasks = [];
  recentTaskList.querySelectorAll("li").forEach(li => {
    const text = li.querySelector(".Text").textContent;
    const status = li.classList.contains("completed") ? "completed" : "pending";
    tasks.push({ text, status });
  });
  localStorage.setItem(taskKey, JSON.stringify(tasks));
}

// ✅ Load tasks with status
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem(taskKey)) || [];
  tasks.forEach(taskObj => {
    addTask(taskObj.text, taskObj.status);
  });
}

// ✅ Add task with status
function addTask(taskValue, status = "pending") {
  const li = document.createElement("li");

  const taskDiv = document.createElement("div");
  taskDiv.classList.add("onetask");

  const textDiv = document.createElement("div");
  textDiv.classList.add("Text");
  textDiv.textContent = taskValue;

  const doneBtn = document.createElement("button");
  const overduebtn = document.createElement("button");

  doneBtn.textContent = "✅";
  overduebtn.textContent = "🗑️";
  doneBtn.classList.add("done");
  overduebtn.classList.add("overdue");

  // restore status when loading
  if (status === "completed") {
    li.classList.add("completed");
  }

  doneBtn.addEventListener("click", function() {
    li.classList.add("completed");   // mark as completed
    saveTasks();
    updateStatus();
    taskDiv.remove();
    li.remove();
  });

  overduebtn.addEventListener("click", function() {
    li.remove();                     // delete task
    saveTasks();
    updateStatus();
  });

  taskDiv.appendChild(textDiv);
  taskDiv.appendChild(doneBtn);
  taskDiv.appendChild(overduebtn);
  li.appendChild(taskDiv);
  recentTaskList.appendChild(li);
  updateStatus();
}

form.addEventListener("submit", function(event) {
  event.preventDefault();
  const taskValue = task.value.trim();

  if (taskValue) {
    addTask(taskValue);
    saveTasks();
    task.value = "";
  }
});

// load saved tasks on page load
window.addEventListener("DOMContentLoaded", loadTasks);
