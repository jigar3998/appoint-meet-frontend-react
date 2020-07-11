import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";

import "./NavBarBusinessDropdown.css";

import { GlobalContext } from "../../context/GlobalState";
import { message } from "antd";

import { Url } from "../../constants/ServerUrl";
import axios from "axios";

function NavBarBusinessDropdown() {
  let history = useHistory();

  const contextData = useContext(GlobalContext);
  const name = contextData.loginData.first_name;
  let handleLogout = () => {
    message.loading({ content: "Loading...", key: "logout" });
    axios
      .get(Url + "/users/logout")
      .then(async (response) => {
        console.log(response.data);
        if (response.data.logout === true) {
          // to reset global state
          // history.push("/");

          await contextData.setLoginData({});
          // contextData.setIsLoaded(false)
          await contextData.setRedirectToBusinessInfo(true);
          localStorage.clear();
          history.push("/");
          message.success({
            content: "You have been successfully logged out.",
            key: "logout",
            duration: 2,
          });
        } else {
          message.error({
            content: "Something went wrong. Please try again",
            key: "logout",
            duration: 2,
          });
        }
      })
      .catch(function (error) {
        console.log(error.response);
        message.error({
          content: "Something went wrong. Please try again",
          key: "logout",
          duration: 2,
        });
      });
  };
  return (
    <>
      <div className="nav-right-button">
        {name.substring(0, 15) + (name.length > 15 ? "..." : "")}{" "}
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
        <Link to="/business/dashboard">
          <div className="dropdown-item">Dashboard</div>
        </Link>
        <Link to="/business/upcoming-appointments">
          <div className="dropdown-item">Upcoming Appointments</div>
        </Link>
        <Link to="/business/completed-appointments">
          <div className="dropdown-item">Completed Appointments</div>
        </Link>
        <Link to="/business/services">
          <div className="dropdown-item">My Services</div>
        </Link>
        <Link to="/business/staff">
          <div className="dropdown-item">My Staff</div>
        </Link>
        <Link to="/business/account">
          <div className="dropdown-item">Account</div>
        </Link>
        <Link to="#">
          <div className="dropdown-item" onClick={handleLogout}>
            Logout
          </div>
        </Link>
      </div>
    </>
  );
}

export default NavBarBusinessDropdown;
