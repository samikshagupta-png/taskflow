function showChart() {

    const canvas = document.querySelector("#taskChart");

    if (!canvas) {
        return;
    }

    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    const total = tasks.length;

    const completed = tasks.filter(
        task => task.status === "completed"
    ).length;

    const pending = total - completed;

    new Chart(canvas, {
        type: "pie",

        data: {
            labels: ["Completed", "Pending"],

            datasets: [{
                data: [completed, pending]
            }]
        },

        options: {
            responsive: true
        }
    });
}