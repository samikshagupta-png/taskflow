import React, { useState, useEffect } from "react";
import "./project.css";

const projectKey = "projects";

const Project = () => {
  const [projects, setProjects] = useState([]);

  // Load projects from localStorage on mount
  useEffect(() => {
    const savedProjects = JSON.parse(localStorage.getItem(projectKey)) || [];
    setProjects(savedProjects);
  }, []);

  // Save projects to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(projectKey, JSON.stringify(projects));
  }, [projects]);

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    const title = event.target.projecttitle.value.trim();
    const description = event.target.projectdes.value.trim();
    const category = event.target.taskcategory.value;
    const dueDate = event.target.taskDate.value;

    if (!title) return;

    const newProject = {
      id: Date.now(),
      title,
      description,
      category,
      dueDate,
    };

    setProjects([...projects, newProject]);
    event.target.reset();
  };

  // Delete project
  const deleteProject = (id) => {
    const updatedProjects = projects.filter((project) => project.id !== id);
    setProjects(updatedProjects);
  };

  return (
    <div>
      <h1>My projects</h1>
      <p>
        <small>Manage and track all your projects in one place.</small>
      </p>

      <div className="section">
        {/* Project Cards */}
        <div className="firstsection">
          {projects.map((project) => (
            <div key={project.id} className="project-card">
              <div className="project-card-header">
                <h2>{project.title}</h2>
                <button
                  className="delete-project"
                  onClick={() => deleteProject(project.id)}
                >
                  🗑️
                </button>
              </div>

              <p className="project-description">
                {project.description || "No description provided."}
              </p>

              <div className="project-info">
                <span>📁 {project.category}</span>
                <span>📅 {project.dueDate || "No due date"}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Project Form */}
        <div className="secondsection">
          <div className="projectsection">
            <p>Create new projects</p>
            <hr />
            <form onSubmit={handleSubmit}>
              <label htmlFor="projecttitle">Project title:</label>
              <br />
              <input type="text" id="projecttitle" name="projecttitle" required />
              <br />

              <label htmlFor="projectdes">Description:</label>
              <textarea id="projectdes" name="projectdes"></textarea>
              <br />

              <label htmlFor="taskcategory">Category:</label>
              <select id="taskcategory" name="category">
                <option value="web development">Web Development</option>
                <option value="A.I & M.L">A.I & M.L</option>
                <option value="Mobile App">Mobile App</option>
                <option value="coursework">Coursework</option>
              </select>
              <br />
              <br />

              <label htmlFor="taskDate">Due date:</label>
              <input type="date" id="taskDate" name="taskDate" />
              <br />

              <button type="submit" id="createproject">
                <b>Create project</b>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Project;
