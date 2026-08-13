



function updateStatus() {
    const total = recentTaskList.querySelectorAll("li").length;
    const completed = recentTaskList.querySelectorAll("li.completed").length;
    const pending = total - completed;

    document.getElementById("completed").textContent = `Completed: ${completed}`;
    document.getElementById("totaltask").textContent = `Total Tasks: ${total}`;
    document.getElementById("pending").textContent = `Pending: ${pending}`;
}