import { useEffect, useState } from "react";
import api from "../api/api";

function EmployeeList({ refreshKey }) {
  const [employees, setEmployees] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    const [empRes, taskRes] = await Promise.all([
      api.get("/employees"),
      api.get("/tasks"),
    ]);
    setEmployees(empRes.data);
    setTasks(taskRes.data);
    setLoading(false);
  };

  const updateTaskStatus = async (taskId, status) => {
    await api.put(`/tasks/${taskId}/status?status=${status}`);
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, [refreshKey]);

  if (loading) {
    return (
      <div>
        <h3>Employees</h3>
        {[1, 2, 3].map((i) => (
          <div key={i} className="list-item skeleton skeleton-card" />
        ))}
      </div>
    );
  }

  return (
    <div>
      <h3>Employees</h3>

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
                        marginTop: "6px",
                      }}
                    >
                      <span>
                        {task.title} — <strong>{task.status}</strong>
                      </span>

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
