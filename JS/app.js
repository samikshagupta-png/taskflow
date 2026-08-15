import { saveTasks, loadTasks, addTask, updateStatus } from "./projects.js";
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




form.addEventListener("submit", function(event) {
  event.preventDefault();
  const taskValue = task.value.trim();

  if (taskValue) {
    addTask(taskValue,"pending",recentTaskList);
    saveTasks(recentTaskList);
    task.value = "";
  }
});
window.addEventListener("DOMContentLoaded", () => {
  loadTasks(recentTaskList, addTask);
});

// load saved tasks on page load
window.addEventListener("DOMContentLoaded", loadTasks);
