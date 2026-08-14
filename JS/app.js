let themeswitcher = document.querySelector("#themebtn");
const form = document.querySelector(".worklist");
let task = document.querySelector("#task");
const recentTaskList = document.querySelector(".recenttask ul");
let dashboard = document.querySelector("#dashboard");
let home = document.querySelector("#homebtn");
let project = document.querySelector("#projects");
let analytics = document.querySelector("#analytics");
let navbutton = document.querySelectorAll("#navigationLinks button");

function setActive(button) {
  navbutton.forEach(btn => {
    btn.classList.remove("active");
  });
  button.classList.add("active");
}
navbutton.forEach(btn => {
  btn.addEventListener("click", () => {
    setActive(btn);
  });
});





dashboard.addEventListener("click", async function() {
  const response = await fetch("pages/dashboard.html");
  const html = await response.text();
  document.querySelector("#content").innerHTML = html;
  setActive(dashboard);
});


home.addEventListener("click", function() {
  
});


project.addEventListener("click", async function() {
  const response = await fetch("pages/projects.html");
  const html = await response.text();
  document.querySelector("#content").innerHTML = html;
  setActive(project);
});


analytics.addEventListener("click", async function() {
  const response = await fetch("pages/analytics.html");
  const html = await response.text();
  document.querySelector("#content").innerHTML = html;
  setActive(analytics);
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
  const overduebtn = document.createElement("button");

  doneBtn.textContent = "✅";
  overduebtn.textContent ="🗑️";
  doneBtn.classList.add("done");
  overduebtn.classList.add("overdue");

  doneBtn.addEventListener("click", function() {
    li.remove();
    saveTasks(); // update storage after removal
    updateStatus();

  });
  overduebtn.addEventListener("click",function(){
    overduebtn.disabled=true;
    updateStatus();
  })

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
