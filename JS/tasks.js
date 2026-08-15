
function setupTaskSearch() {

    const searchtask = document.querySelector("#searchtask");
    const forms = document.querySelector(".searchlist");
    const searchlists = document.querySelector(".searchlists");

    // If dashboard isn't loaded, stop
    if (!searchtask || !forms || !searchlists) {
        return;
    }
  
const taskKey = "tasks";
if (forms) {
  forms.addEventListener("submit", function (event) {
    event.preventDefault();

    const searchvalue = searchtask.value.trim().toLowerCase();

    if (searchvalue === "") {
      searchlists.innerHTML = "<p>Please enter a task to search.</p>";
      return;
    }

    Showtask(searchvalue);

    searchtask.value = "";
  });
}
}

function Showtask(searchvalue){
  const searchlists =
        document.querySelector(".searchlists");


    if (!searchlists) {
        return;
    }

  const tasks = JSON.parse(localStorage.getItem(taskKey)) || [];
  searchlists.innerHTML="";
  const matchingTasks = tasks.filter(function(taskObj){
    return taskObj.text.toLowerCase().includes(searchvalue);
  });
  if(matchingTasks.length === 0){
    searchlists.innerHTML = "<p>No matching task found.</p>";
        return;
  }
  const ul = document.createElement("ul");
  matchingTasks.forEach(function(taskObj){
    const lis=document.createElement("li");
    lis.textContent = taskObj.text;
    if(taskObj.status){
      lis.textContent +=` : ${taskObj.status}  status`;
    }
    if(taskObj.priority){
      lis.textContent += `-${taskObj.priority}`
    }
    ul.appendChild(lis);
  });
  searchlists.appendChild(ul);
  

}


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