//TaskForm.jsx
import { useState } from "react";

export default function TaskForm({ onAddTask }) {
  const [task, setTask] = useState("");
  const [priority, setPriority] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task) return;
    onAddTask({ text: task, priority });
    setTask("");
    setPriority("");
  };

  return (
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
        /> High
        <input
          type="radio"
          name="priority"
          value="medium"
          checked={priority === "medium"}
          onChange={(e) => setPriority(e.target.value)}
        /> Medium
        <input
          type="radio"
          name="priority"
          value="low"
          checked={priority === "low"}
          onChange={(e) => setPriority(e.target.value)}
        /> Low
      </label>
      <button type="submit" id="createbtn">
        <b>Create</b>
      </button>
    </form>
  );
}
