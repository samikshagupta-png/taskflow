let themeswitcher = document.querySelector("#themebtn");
const form = document.querySelector(".worklist");
let task = document.querySelector("#task");
const recentTaskList = document.querySelector(".recenttask ul");
let dashboard = document.querySelector("#dashboard");


dashboard.addEventListener("click", async function() {
  const response = await fetch("pages/dashboard.html");
  const html = await response.text();
  document.querySelector("#content").innerHTML = html;
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

// consistent key name
const taskKey = "tasks";

function saveTasks() {
  const tasks = [];
  recentTaskList.querySelectorAll(".Text").forEach(textDiv => {
    tasks.push(textDiv.textContent);
  });
  localStorage.setItem(taskKey, JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem(taskKey)) || [];
  tasks.forEach(taskValue => {
    addTask(taskValue);
  });
}

function addTask(taskValue) {
  const li = document.createElement("li");

  const taskDiv = document.createElement("div");
  taskDiv.classList.add("onetask");

  const textDiv = document.createElement("div");
  textDiv.classList.add("Text");
  textDiv.textContent = taskValue;

  const doneBtn = document.createElement("button");

  doneBtn.textContent = "Complete";
  doneBtn.classList.add("done");

  doneBtn.addEventListener("click", function() {
    li.remove();
    saveTasks(); // update storage after removal
    updateStatus();

  });

  taskDiv.appendChild(textDiv);
  taskDiv.appendChild(doneBtn);
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
