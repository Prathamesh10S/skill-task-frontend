import { useEffect, useState } from "react";
import api from "../api/api";

function TaskList({ refreshKey }) {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const res = await api.get("/tasks");
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, [refreshKey]);

  return (
    <div>
      <h3>All Tasks (Overview)</h3>

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
