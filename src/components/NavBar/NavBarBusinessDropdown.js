import React,{useContext} from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import "./NavBarBusinessDropdown.css";

import {GlobalContext} from "../../context/GlobalState";


function NavBarBusinessDropdown() {
  const contextData = useContext(GlobalContext)
  const name = contextData.loginData.first_name
  return (
    <>
      <div className="nav-right-button">
      {name.substring(0,15) + (name.length>15?"...":"")}{" "}
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
        <div className="dropdown-item">Dashboard</div>
        <div className="dropdown-item">My Appointment</div>
        <div className="dropdown-item">My Services</div>
        <div className="dropdown-item">My Staff</div>
        <div className="dropdown-item">Account</div>
        <div className="dropdown-item">Logout</div>
      </div>
    </>
  );
}

export default NavBarBusinessDropdown;
