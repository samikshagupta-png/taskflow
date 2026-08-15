import { saveTasks, loadTasks, addTask, updateStatus } from "./projects.js";

// Example: search functionality
function showSearchResults(searchValue) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const section = document.querySelector("#recenttasksection");

  section.innerHTML = `
    <h2>Search Results</h2>
    <ul id="searchtasklist"></ul>
  `;

  const list = section.querySelector("#searchtasklist");

  tasks.forEach((taskObj, index) => {
    if (taskObj.text.toLowerCase().includes(searchValue.toLowerCase())) {
      addTask(taskObj.text, taskObj.status, list);
    }
  });
}
