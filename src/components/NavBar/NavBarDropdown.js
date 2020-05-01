import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import "./NavBarDropdown.css";

function NavBarDropdown() {
  return (
    <>
      <div className="nav-right-button">
        Account{" "}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          fill="gray"
          viewBox="0 0 18 18"
        >
          <path d="M5 8l4 4 4-4z" />
        </svg>
      </div>

      <div className="dropdown">
        <Link to="/login">
          <div className="dropdown-item button">Login / Sign Up</div>
        </Link>
        <hr />
        <div className="dropdown-item">My Appointments</div>
        <div className="dropdown-item">Add Service</div>
        <div className="dropdown-item">Setting</div>
        <div className="dropdown-item">Logout</div>
      </div>
    </>
  );
}

export default NavBarDropdown;
