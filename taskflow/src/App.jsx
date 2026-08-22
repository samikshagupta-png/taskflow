import { useState } from "react";
import "./App.css";

function App() {
  const [task, setTask] = useState("");
  const [priority, setPriority] = useState("");
  const [tasks, setTasks] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task) return;
    setTasks([...tasks, { text: task, priority }]);
    setTask("");
    setPriority("");
  };

  return (
    <>
      <nav>
        <h1 className="brand">Taskflow</h1>
        <button id="themebtn">🌞</button>
      </nav>
      <hr></hr>
      <br></br>
      <div id="navigationLinks">
        <button id="homebtn">Home</button>
        <button id="dashboard">Dashboard</button>
        <button id="projects">Projects</button>
        <button id="analytics">Analytics</button>
      </div>

      <br></br>
      <h2 id="username"></h2>

      <div id="content">
        <div id="createtask">
          <div className="hero">
            <h3>Create Task</h3>
            <form className="worklist" onSubmit={handleSubmit}>
              <input
                type="text"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                placeholder="Add your task"
              />
              <p>Select Priority:</p>
              <label>
                <input
                  type="radio"
                  name="priority"
                  value="high"
                  checked={priority === "high"}
                  onChange={(e) => setPriority(e.target.value)}
                />{" "}
                High
                <input
                  type="radio"
                  name="priority"
                  value="medium"
                  checked={priority === "medium"}
                  onChange={(e) => setPriority(e.target.value)}
                />{" "}
                Medium
                <input
                  type="radio"
                  name="priority"
                  value="low"
                  checked={priority === "low"}
                  onChange={(e) => setPriority(e.target.value)}
                />{" "}
                Low
              </label>
              <button type="submit" id="createbtn">
                <b>Create</b>
              </button>
            </form>

            <div className="recenttask">
              <p>
                <u>Recent Tasks:</u>
              </p>
              <ul>
                {tasks.map((t, i) => (
                  <li key={i}>
                    {t.text} ({t.priority})
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div id="currentprogress"></div>
    </>
  );
}

export default App;
