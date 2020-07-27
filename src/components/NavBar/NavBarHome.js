import React from "react";
import { Link, useHistory } from "react-router-dom";

// import NavBarDropdown from "./NavBarBusinessDropdown";

import "./NavBarHome.css";

function NavBarHome() {
  return (
    <nav className="main-nav-bar">
      <div className="nav-bar-container">
        <div className="nav-bar-logo">
        <Link to="/" style={{ color: "black" }}>
            Appoint Meet
          </Link>
        </div>
        <div className="nav-bar-flex-1" />
        <div className="nav-bar-right-login">
          {/* <NavBarDropdown /> */}
          <Link to="/login">
            <div className="dropdown-item login-button">Login / Sign Up</div>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default NavBarHome;
