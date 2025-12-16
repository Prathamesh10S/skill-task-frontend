import { useEffect, useState } from "react";
import api from "../api/api";

function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([api.get("/employees"), api.get("/tasks")])
      .then(([empRes, taskRes]) => {
        setStats({
          employees: empRes.data.length,
          tasks: taskRes.data.length,
          completed: taskRes.data.filter(
            (t) => t.status === "COMPLETED"
          ).length,
        });
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container">
      <h2>Dashboard</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "20px",
        }}
      >
        {[1, 2, 3].map((i) => (
          <div className="card" key={i}>
            {loading ? (
              <>
                <div className="skeleton skeleton-text" />
                <div className="skeleton skeleton-text" style={{ height: "28px", width: "60%" }} />
              </>
            ) : (
              <>
                <h3>
                  {i === 1
                    ? "Total Employees"
                    : i === 2
                    ? "Total Tasks"
                    : "Completed Tasks"}
                </h3>
                <p style={{ fontSize: "28px", color: i === 3 ? "green" : "black" }}>
                  {i === 1
                    ? stats.employees
                    : i === 2
                    ? stats.tasks
                    : stats.completed}
                </p>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
