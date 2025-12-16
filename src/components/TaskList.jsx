import { useEffect, useState } from "react";
import api from "../api/api";

function TaskList({ refreshKey }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    setLoading(true);
    const res = await api.get("/tasks");
    setTasks(res.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchTasks();
  }, [refreshKey]);

  if (loading) {
    return (
      <div>
        <h3>All Tasks (Overview)</h3>
        {[1, 2, 3].map((i) => (
          <div key={i} className="list-item skeleton skeleton-card" />
        ))}
      </div>
    );
  }

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
