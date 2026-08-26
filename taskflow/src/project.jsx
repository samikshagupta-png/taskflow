import React from "react";
import "./project.css"; // ✅ Import CSS properly

const Project = () => {
  return (
    <>
    
    <div>
      <h1>My projects</h1>
      <p>
        <small>manage and track all your projects in one place.</small>
      </p>

      <div className="section">
        <div className="firstsection">
          {/* You can render project cards here later */}
        </div>

        <div className="secondsection">
          <div className="projectsection">
            <p>Create new projects</p>
            <hr />

            <form>
              <label htmlFor="projecttitle">Project title:</label>
              <br />
              <input
                type="text"
                id="projecttitle"
                name="projecttitle"
                required
              />
              <br />

              <label htmlFor="projectdes">Description:</label>
              <textarea id="projectdes"></textarea>
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
    </>
  );
};

export default Project;
