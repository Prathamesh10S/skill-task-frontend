import { useState } from "react";
import api from "../api/api";

function AddTask({ onTaskAdded }) {
  const [title, setTitle] = useState("");
  const [skill, setSkill] = useState("");
  const [error, setError] = useState("");

  const isAdmin = !!localStorage.getItem("ADMIN_KEY");

  const createTask = async () => {
    if (!isAdmin) {
      setError("❌ You are not authorized to create tasks");
      return;
    }

    try {
      await api.post("/tasks", {
        title,
        requiredSkill: skill,
      });

      setTitle("");
      setSkill("");
      setError("");
      onTaskAdded();
    } catch (err) {
      setError("❌ Authorization failed");
    }
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

      {error && <p style={{ color: "red", marginTop: "8px" }}>{error}</p>}
    </div>
  );
}

export default AddTask;
