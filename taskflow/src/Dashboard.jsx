import React, { useEffect, useState } from "react";
import "./dashboard.css";


const Dashboard = () => {
  
  const [tasks, setTasks] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  // Load tasks from localStorage on mount
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
  }, []);

  // Save tasks back to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Counters
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.status === "completed").length;
  const pendingTasks = totalTasks - completedTasks;

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    const value = searchValue.trim().toLowerCase();

    if (value === "") {
      setSearchResults([{ text: "Please enter a task to search." }]);
      return;
    }

    const matches = tasks.filter((taskObj) =>
      taskObj.text.toLowerCase().includes(value)
    );

    if (matches.length === 0) {
      setSearchResults([{ text: "No matching task found." }]);
    } else {
      setSearchResults(matches);
    }

    setSearchValue("");
  };

  return (
    <>
      

      <div className="mainbox">
        <div className="first">
          <div className="status">
          <div id="totaltask">Total Tasks: {totalTasks}</div>
          <div id="completed">Completed: {completedTasks}</div>
          <div id="pending">Pending: {pendingTasks}</div>
        </div>

        <div id="recenttasksection">
          <h2>Recent-tasks:</h2>
          <ul id="recenttasklist">
            {tasks.map((taskObj, index) => (
              <li
                key={index}
                className={taskObj.status === "completed" ? "completed" : ""}
              >
                {taskObj.text}
              </li>
            ))}
          </ul>
        </div>

        </div>
        <br />

        <div className="searchsection">
          <form className="searchlist" onSubmit={handleSearch}>
          <input
            type="text"
            id="searchtask"
            name="task"
            placeholder="search task"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />

          <div className="prioritydiv">
            <label htmlFor="priority">Priority:</label>
            <select id="taskpriority" name="priority">
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>

          <button type="submit" id="searchbtn">
            <b>search</b>
          </button>
        </form>
        </div>

        <div className="searchlists">
          {searchResults.length > 0 && (
            <ul>
              {searchResults.map((taskObj, index) => (
                <li key={index}>
                  {taskObj.text}
                  {taskObj.status && ` : ${taskObj.status} status`}
                  {taskObj.priority && ` - ${taskObj.priority}`}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
