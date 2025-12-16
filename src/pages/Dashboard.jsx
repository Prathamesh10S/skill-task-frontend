import { useEffect, useState } from "react";
import api from "../api/api";

function Dashboard() {
  const [stats, setStats] = useState({
    employees: 0,
    tasks: 0,
    completed: 0,
  });

  useEffect(() => {
    Promise.all([api.get("/employees"), api.get("/tasks")]).then(
      ([empRes, taskRes]) => {
        setStats({
          employees: empRes.data.length,
          tasks: taskRes.data.length,
          completed: taskRes.data.filter(
            (t) => t.status === "COMPLETED"
          ).length,
        });
      }
    );
  }, []);

  return (
    <div className="container">
      <h2>Dashboard</h2>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
        <div className="card">
          <h3>Total Employees</h3>
          <p style={{ fontSize: "28px" }}>{stats.employees}</p>
        </div>

        <div className="card">
          <h3>Total Tasks</h3>
          <p style={{ fontSize: "28px" }}>{stats.tasks}</p>
        </div>

        <div className="card">
          <h3>Completed Tasks</h3>
          <p style={{ fontSize: "28px", color: "green" }}>
            {stats.completed}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
