import { useEffect, useState } from "react";
import api from "../api/api";

function TaskList({ refreshKey }) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    api.get("/tasks").then((res) => setTasks(res.data));
  }, [refreshKey]);

  return (
    <div>
      <h3>All Tasks</h3>
      <div className="list-container">
        {tasks.map((t) => (
          <div key={t.id} className="list-item">
            <strong>{t.title}</strong> | {t.status} | Assigned to:{" "}
            {t.assignedEmployee?.name || "UNASSIGNED"}
          </div>
        ))}
      </div>
    </div>
  );
}

export default TaskList;
