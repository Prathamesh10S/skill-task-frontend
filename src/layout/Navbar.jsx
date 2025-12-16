import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-brand">Task Assigner</div>

      <nav className="navbar-links">
        <NavLink to="/" end>
          Dashboard
        </NavLink>
        <NavLink to="/employees">
          Employees
        </NavLink>
        <NavLink to="/tasks">
          Tasks
        </NavLink>
      </nav>
    </header>
  );
}

export default Navbar;
