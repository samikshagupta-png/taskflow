import React, { useEffect, useState } from "react";
import "./analytics.css";

const AnalyticsPage = () => {
  const [tasks, setTasks] = useState([]);

  // Load tasks from localStorage on mount
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
  }, []);

  // Save tasks back to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData("taskIndex", index);
  };

  const handleDrop = (e, newPriority) => {
    e.preventDefault();
    const index = e.dataTransfer.getData("taskIndex");
    if (index === null) return;

    const updatedTasks = [...tasks];
    updatedTasks[index].priority = newPriority;
    setTasks(updatedTasks);
  };

  const allowDrop = (e) => {
    e.preventDefault();
  };

  const renderTasks = (priority) =>
    tasks
      .filter((task) => task.priority === priority)
      .map((task, index) => (
        <div
          key={index}
          className="box"
          draggable
          onDragStart={(e) => handleDragStart(e, index)}
        >
          {task.text}
        </div>
      ));

  return (
    <div className="main">
      <div
        className="high"
        onDragOver={allowDrop}
        onDrop={(e) => handleDrop(e, "high")}
      >
        <h2>Urgent</h2>
        {renderTasks("high")}
      </div>

      <div
        className="medium"
        onDragOver={allowDrop}
        onDrop={(e) => handleDrop(e, "medium")}
      >
        <h2>Moderate</h2>
        {renderTasks("medium")}
      </div>

      <div
        className="low"
        onDragOver={allowDrop}
        onDrop={(e) => handleDrop(e, "low")}
      >
        <h2>Extra</h2>
        {renderTasks("low")}
      </div>
    </div>
  );
};

export default AnalyticsPage;
