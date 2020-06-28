import React from "react";

import NavBarBusinessDropdown from "./NavBarBusinessDropdown";

import "./NavBarBusiness.css";

function NavBarBusiness() {
  return (
    <nav class="main-nav-bar">
      <div className="nav-bar-container">
        <div className="nav-bar-logo">Appoint Meet</div>
        <div className="nav-bar-flex-1" />
        <div className="nav-bar-right">
          <NavBarBusinessDropdown />
        </div>
      </div>
    </nav>
  );
}

export default NavBarBusiness;
