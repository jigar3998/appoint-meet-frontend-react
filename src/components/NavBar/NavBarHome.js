import React from "react";
import { Link, useHistory } from "react-router-dom";

// import NavBarDropdown from "./NavBarBusinessDropdown";

import "./NavBarHome.css";

function NavBarHome() {
  return (
    <nav class="main-nav-bar">
      <div className="nav-bar-container">
        <div className="nav-bar-logo">Appoint Meet</div>
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
