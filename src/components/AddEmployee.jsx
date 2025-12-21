import { useState } from "react";
import api from "../api/api";

function AddEmployee({ onEmployeeAdded }) {
  const [name, setName] = useState("");
  const [skills, setSkills] = useState("");
  const [error, setError] = useState("");

  const isAdmin = !!localStorage.getItem("ADMIN_KEY");

  const addEmployee = async () => {
    if (!isAdmin) {
      setError("❌ You are not authorized to add employees");
      return;
    }

    try {
      await api.post("/employees", { name, skills });
      setName("");
      setSkills("");
      setError("");
      onEmployeeAdded();
    } catch (err) {
      setError("❌ Authorization failed");
    }
  };

  return (
    <div>
      <h3>Add Employee</h3>

      <div className="form-row">
        <input
          placeholder="Employee name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Skills (JAVA,SQL)"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
        />

        <button onClick={addEmployee}>Add</button>
      </div>

      {error && <p style={{ color: "red", marginTop: "8px" }}>{error}</p>}
    </div>
  );
}

export default AddEmployee;
