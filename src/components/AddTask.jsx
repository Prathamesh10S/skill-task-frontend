import { useState } from "react";
import api from "../api/api";

function AddTask({ onTaskAdded }) {
  const [title, setTitle] = useState("");
  const [skill, setSkill] = useState("");

  const createTask = async () => {
    if (!title || !skill) return;

    await api.post("/tasks", {
      title,
      requiredSkill: skill,
    });

    setTitle("");
    setSkill("");

    onTaskAdded(); // auto refresh
  };

  return (
    <div>
      <h3>Create Task</h3>

      <div className="form-row">
        <input
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          placeholder="Required skill"
          value={skill}
          onChange={(e) => setSkill(e.target.value)}
        />

        <button onClick={createTask}>Create</button>
      </div>
    </div>
  );
}

export default AddTask;
