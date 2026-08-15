let draggedTaskId = null;

function showtasklevel() {

    const hightask = document.querySelector(".high");
    const mediumtask = document.querySelector(".medium");
    const lowtask = document.querySelector(".low");

    if (!hightask || !mediumtask || !lowtask) {
        return;
    }

    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    hightask.innerHTML = "<h1>Urgent</h1>";
    mediumtask.innerHTML = "<h1>Moderate</h1>";
    lowtask.innerHTML = "<h1>Low</h1>";

    tasks.forEach((taskObj, index) => {

        const levelDiv = document.createElement("div");

        levelDiv.textContent = taskObj.text;

        levelDiv.dataset.index = index;
        levelDiv.draggable = true;
        levelDiv.classList.add("box");

        levelDiv.addEventListener("dragstart", function() {
            draggedTaskId = index;
        });

        if (taskObj.priority === "high") {
            hightask.appendChild(levelDiv);
        }

        else if (taskObj.priority === "medium") {
            mediumtask.appendChild(levelDiv);
        }

        else if (taskObj.priority === "low") {
            lowtask.appendChild(levelDiv);
        }

    });

    setupDropZone(hightask, "high");
    setupDropZone(mediumtask, "medium");
    setupDropZone(lowtask, "low");
}


function setupDropZone(section, newPriority) {

    section.addEventListener("dragover", function(event) {
        event.preventDefault();
    });

    section.addEventListener("drop", function(event) {

        event.preventDefault();

        if (draggedTaskId === null) {
            return;
        }

        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

        tasks[draggedTaskId].priority = newPriority;

        localStorage.setItem("tasks", JSON.stringify(tasks));

        draggedTaskId = null;

        showtasklevel();
    });
}