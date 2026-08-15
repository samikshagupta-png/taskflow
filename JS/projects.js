// taskUtils.js
const taskKey = "tasks";

function saveTasks(recentTaskList) {
  const tasks = [];
  recentTaskList.querySelectorAll("li").forEach(li => {
    const text = li.querySelector(".Text").textContent;
    const status = li.classList.contains("completed") ? "completed" : "pending";
    tasks.push({ text, status });
  });
  localStorage.setItem(taskKey, JSON.stringify(tasks));
}

function loadTasks(recentTaskList, addTask) {
  const tasks = JSON.parse(localStorage.getItem(taskKey)) || [];
  tasks.forEach(taskObj => {
    addTask(taskObj.text, taskObj.status, recentTaskList);
  });
}

function addTask(taskValue, status = "pending", recentTaskList) {
  const li = document.createElement("li");

  const taskDiv = document.createElement("div");
  taskDiv.classList.add("onetask");

  const textDiv = document.createElement("div");
  textDiv.classList.add("Text");
  textDiv.textContent = taskValue;

  const doneBtn = document.createElement("button");
  const overdueBtn = document.createElement("button");

  doneBtn.textContent = "✅";
  overdueBtn.textContent = "🗑️";
  doneBtn.classList.add("done");
  overdueBtn.classList.add("overdue");

  if (status === "completed") {
    li.classList.add("completed");
  }

  doneBtn.addEventListener("click", function () {
    li.classList.add("completed");
    saveTasks(recentTaskList);
    updateStatus();
    li.remove();
  });

  overdueBtn.addEventListener("click", function () {
    li.remove();
    saveTasks(recentTaskList);
    updateStatus();
  });

  taskDiv.appendChild(textDiv);
  taskDiv.appendChild(doneBtn);
  taskDiv.appendChild(overdueBtn);
  li.appendChild(taskDiv);
  recentTaskList.appendChild(li);
  updateStatus();
}

function updateStatus() {
  const list = document.querySelector(".recenttask ul");
  if (!list) return;

  const total = list.querySelectorAll("li").length;
  const completed = list.querySelectorAll("li.completed").length;
  const pending = total - completed;

  document.getElementById("totaltask").textContent = `Total Tasks: ${total}`;
  document.getElementById("completed").textContent = `Completed: ${completed}`;
  document.getElementById("pending").textContent = `Pending: ${pending}`;
}

export { saveTasks, loadTasks, addTask, updateStatus };
