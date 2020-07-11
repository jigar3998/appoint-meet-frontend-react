import React from "react";

import NavBarBusinessDropdown from "./NavBarBusinessDropdown";
import NavBarCustomerDropdown from "./NavBarCustomerDropdown";

import { Link, useHistory } from "react-router-dom";

import "./NavBarApplication.css";

function NavBarApplication(props) {
  return (
    <nav class="main-nav-bar">
      <div className="nav-bar-container">
        <div className="nav-bar-logo">
          <Link to="/" style={{ color: "black" }}>
            Appoint Meet
          </Link>
        </div>
        <div className="nav-bar-flex-1" />
        <div className="nav-bar-right">
          {/* <NavBarBusinessDropdown /> */}
          {props.dropdowntype === "business" ? (
            <NavBarBusinessDropdown />
          ) : (
            <NavBarCustomerDropdown />
          )}
          {props.children}
        </div>
      </div>
    </nav>
  );
}

export default NavBarApplication;
