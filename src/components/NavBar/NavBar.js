import React from "react";

import NavBarDropdown from "./NavBarDropdown";

import "./NavBar.css";

function NavBar() {
  return (
    <nav class="main-nav-bar">
      <div className="nav-bar-container">
        <div className="nav-bar-logo">Appoint Meet</div>
        <div className="nav-bar-flex-1" />
        <div className="nav-bar-right">
          <NavBarDropdown />
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
