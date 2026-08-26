import React, { useState, useEffect } from "react";
import "./App.css";

const Home = () => {
  const taskKey = "tasks";
  const [tasks, setTasks] = useState([]);
  const [taskValue, setTaskValue] = useState("");
  const [priority, setPriority] = useState("");

  // Load tasks from localStorage on mount
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem(taskKey)) || [];
    setTasks(storedTasks);
  }, []);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(taskKey, JSON.stringify(tasks));
  }, [tasks]);

  // Add new task
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!taskValue || !priority) return;

    const newTask = {
      text: taskValue,
      status: "pending",
      priority: priority,
    };

    setTasks([...tasks, newTask]);
    setTaskValue("");
    setPriority("");
  };

  // Mark task as completed
  const markCompleted = (index) => {
    const updated = [...tasks];
    updated[index].status = "completed";
    setTasks(updated);
  };

  // Delete task
  const deleteTask = (index) => {
    const updated = tasks.filter((_, i) => i !== index);
    setTasks(updated);
  };

  // Counters
  const total = tasks.length;
  const completed = tasks.filter((t) => t.status === "completed").length;
  const pending = total - completed;

  return (
    <main>
      <h2 id="username"></h2>

      <div id="content">
        <div id="createtask">
          <div className="hero">
            <h3>Create Task</h3>
            <form className="worklist" onSubmit={handleSubmit}>
              <input
                type="text"
                id="task"
                name="task"
                placeholder="Add your task"
                value={taskValue}
                onChange={(e) => setTaskValue(e.target.value)}
              />
              <p>Select Priority:</p>
              <label id="option">
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
                  <li
                    key={i}
                    className={t.status === "completed" ? "completed" : ""}
                    data-priority={t.priority}
                  >
                    <div className="onetask">
                      <div className="Text">{t.text}</div>
                      <button
                        className="done"
                        onClick={() => markCompleted(i)}
                      >
                        ✅
                      </button>
                      <button
                        className="overdue"
                        onClick={() => deleteTask(i)}
                      >
                        🗑️
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <br />
          </div>
        </div>
      </div>

      <div id="currentprogress">
        
      </div>
    </main>
  );
};

export default Home;
