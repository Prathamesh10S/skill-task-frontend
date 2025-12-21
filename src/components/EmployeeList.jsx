import { useEffect, useState } from "react";
import api from "../api/api";

function EmployeeList({ refreshKey }) {
  const [employees, setEmployees] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");

  // 🔐 Check admin status
  const isAdmin = !!localStorage.getItem("ADMIN_KEY");

  const fetchData = async () => {
    try {
      const empRes = await api.get("/employees");
      const taskRes = await api.get("/tasks");

      setEmployees(empRes.data);
      setTasks(taskRes.data);
      setError("");
    } catch (err) {
      setError("❌ Failed to load data");
    }
  };

  const updateTaskStatus = async (taskId, status) => {
    if (!isAdmin) {
      alert("❌ You are not authorized to update task status");
      return;
    }

    try {
      await api.put(`/tasks/${taskId}/status?status=${status}`);
      fetchData(); // refresh after update
    } catch (err) {
      alert("❌ Authorization failed");
    }
  };

  useEffect(() => {
    fetchData();
  }, [refreshKey]);

  return (
    <div>
      <h3>Employees</h3>

      {!isAdmin && (
        <p style={{ color: "#b45309", marginBottom: "10px" }}>
          🔒 Public view enabled (read-only)
        </p>
      )}

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="list-container">
        {employees.map((emp) => {
          const empTasks = tasks.filter(
            (t) => t.assignedEmployee?.id === emp.id
          );

          return (
            <div key={emp.id} className="list-item">
              <strong>{emp.name}</strong> | Skills: {emp.skills} | Workload:{" "}
              {emp.workload}

              {empTasks.length > 0 && (
                <div style={{ marginTop: "8px", marginLeft: "15px" }}>
                  {empTasks.map((task) => (
                    <div
                      key={task.id}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginTop: "6px",
                      }}
                    >
                      <span>
                        {task.title} —{" "}
                        <strong>{task.status}</strong>
                      </span>

                      {/* 🔐 Admin-only actions */}
                      {isAdmin && (
                        <span>
                          {task.status === "ASSIGNED" && (
                            <button
                              onClick={() =>
                                updateTaskStatus(task.id, "IN_PROGRESS")
                              }
                            >
                              In Progress
                            </button>
                          )}

                          {task.status === "IN_PROGRESS" && (
                            <button
                              onClick={() =>
                                updateTaskStatus(task.id, "COMPLETED")
                              }
                            >
                              Complete
                            </button>
                          )}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default EmployeeList;
