import { useState } from "react";
import AddEmployee from "../components/AddEmployee";
import EmployeeList from "../components/EmployeeList";

function Employees() {
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <div className="container">
      <h2>Employee Management</h2>

      <div className="card">
        <AddEmployee onEmployeeAdded={() => setRefreshKey((k) => k + 1)} />
      </div>

      <div className="card">
        <EmployeeList refreshKey={refreshKey} />
      </div>
    </div>
  );
}

export default Employees;
