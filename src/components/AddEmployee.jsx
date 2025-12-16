import { useState } from "react";
import api from "../api/api";

function AddEmployee({ onEmployeeAdded }) {
  const [name, setName] = useState("");
  const [skills, setSkills] = useState("");

  const addEmployee = async () => {
    if (!name || !skills) return;

    await api.post("/employees", {
      name,
      skills,
    });

    setName("");
    setSkills("");

    onEmployeeAdded(); // refresh list automatically
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
    </div>
  );
}

export default AddEmployee;
