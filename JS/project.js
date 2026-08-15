const projectKey = "projects";
function initProjects() {

    const projectForm =
        document.querySelector(
            ".projectsection form"
        );


    const projectContainer =
        document.querySelector(
            ".firstsection"
        );

const projectKey = "projects";




function initProjects() {

    const projectForm =
        document.querySelector(".projectsection form");

    const projectContainer =
        document.querySelector(".firstsection");


    if (!projectForm || !projectContainer) {
        return;
    }


    // Load saved projects

    loadProjects(projectContainer);


    // Create project

    projectForm.addEventListener("submit", function (event) {

        event.preventDefault();


        const title =
            document
                .querySelector("#projecttitle")
                .value
                .trim();


        const description =
            document
                .querySelector("#projectdes")
                .value
                .trim();


        const category =
            document
                .querySelector("#taskcategory")
                .value;


        const dueDate =
            document
                .querySelector("#taskDate")
                .value;


        if (!title) {
            return;
        }


        const project = {

            id: Date.now(),

            title: title,

            description: description,

            category: category,

            dueDate: dueDate

        };


        // Get old projects

        const projects =
            JSON.parse(
                localStorage.getItem(projectKey)
            ) || [];


        // Add new project

        projects.push(project);


        // Save

        localStorage.setItem(
            projectKey,
            JSON.stringify(projects)
        );


        // Display new card

        displayProject(
            project,
            projectContainer
        );


        // Clear form

        projectForm.reset();

    });

}


// ========================================
// LOAD PROJECTS
// ========================================

function loadProjects(projectContainer) {

    const projects =
        JSON.parse(
            localStorage.getItem(projectKey)
        ) || [];


    projects.forEach(function (project) {

        displayProject(
            project,
            projectContainer
        );

    });

}


// ========================================
// DISPLAY PROJECT CARD
// ========================================

function displayProject(
    project,
    projectContainer
) {

    const card =
        document.createElement("div");


    card.classList.add("project-card");


    card.innerHTML = `

        <div class="project-card-header">

            <h2>${project.title}</h2>

            <button class="delete-project">
                🗑️
            </button>

        </div>


        <p class="project-description">

            ${
                project.description ||
                "No description provided."
            }

        </p>


        <div class="project-info">

            <span>
                📁 ${project.category}
            </span>

            <span>
                📅 ${
                    project.dueDate ||
                    "No due date"
                }
            </span>

        </div>

    `;


    // ========================================
    // DELETE PROJECT
    // ========================================

    const deleteBtn =
        card.querySelector(".delete-project");


    deleteBtn.addEventListener(
        "click",
        function () {

            // Remove card

            card.remove();


            // Get projects

            let projects =
                JSON.parse(
                    localStorage.getItem(projectKey)
                ) || [];


            // Remove selected project

            projects = projects.filter(
                function (item) {

                    return item.id !== project.id;

                }
            );


            // Save updated projects

            localStorage.setItem(
                projectKey,
                JSON.stringify(projects)
            );

        }
    );


    projectContainer.appendChild(card);

}
    // Safety check

    if (!projectForm || !projectContainer) {
        return;
    }


    // Show saved projects

    loadProjects(projectContainer);


    // CREATE PROJECT

    projectForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const title =
                document
                    .querySelector("#projecttitle")
                    .value
                    .trim();


            const description =
                document
                    .querySelector("#projectdes")
                    .value
                    .trim();


            const category =
                document
                    .querySelector("#taskcategory")
                    .value;


            const dueDate =
                document
                    .querySelector("#taskDate")
                    .value;


            // Don't create empty project

            if (!title) {
                return;
            }


            // Project object

            const project = {

                id: Date.now(),

                title: title,

                description: description,

                category: category,

                dueDate: dueDate

            };


            // Get existing projects

            const projects =
                JSON.parse(
                    localStorage.getItem(projectKey)
                ) || [];


            // Add new project

            projects.push(project);


            // Save

            localStorage.setItem(
                projectKey,
                JSON.stringify(projects)
            );


            // Display immediately

            displayProject(
                project,
                projectContainer
            );


            // Clear form

            projectForm.reset();

        }
    );

}


// ==========================
// LOAD PROJECTS
// ==========================

function loadProjects(projectContainer) {

    const projects =
        JSON.parse(
            localStorage.getItem(projectKey)
        ) || [];


    projects.forEach(project => {

        displayProject(
            project,
            projectContainer
        );

    });

}


// ==========================
// DISPLAY PROJECT CARD
// ==========================

function displayProject(
    project,
    projectContainer
) {

    const card =
        document.createElement("div");


    card.classList.add(
        "project-card"
    );


    card.innerHTML = `

        <div class="project-card-header">

            <h2>
                ${project.title}
            </h2>

            <button class="delete-project">
                🗑️
            </button>

        </div>


        <p class="project-description">

            ${
                project.description ||
                "No description provided."
            }

        </p>


        <div class="project-info">

            <span>
                📁 ${project.category}
            </span>


            <span>
                📅 ${
                    project.dueDate ||
                    "No due date"
                }
            </span>

        </div>

    `;


    // DELETE BUTTON

    const deleteBtn =
        card.querySelector(
            ".delete-project"
        );


    deleteBtn.addEventListener(
        "click",
        function () {

            card.remove();


            let projects =
                JSON.parse(
                    localStorage.getItem(
                        projectKey
                    )
                ) || [];


            projects =
                projects.filter(
                    item =>
                        item.id !== project.id
                );


            localStorage.setItem(
                projectKey,
                JSON.stringify(projects)
            );

        }
    );


    projectContainer.appendChild(card);

}