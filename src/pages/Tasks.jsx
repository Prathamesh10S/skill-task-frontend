import { useState } from "react";
import AddTask from "../components/AddTask";
import TaskList from "../components/TaskList";

function Tasks() {
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <div className="container">
      <h2>Task Management</h2>

      <div className="card">
        <AddTask onTaskAdded={() => setRefreshKey((k) => k + 1)} />
      </div>

      <div className="card">
        <TaskList refreshKey={refreshKey} />
      </div>
    </div>
  );
}

export default Tasks;
