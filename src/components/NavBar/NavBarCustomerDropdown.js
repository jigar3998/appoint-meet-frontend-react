import React, { useContext } from "react";
import {
  Link,
  useHistory,
} from "react-router-dom";

import "./NavBarCustomerDropdown.css";

import { GlobalContext } from "../../context/GlobalState";
import { message } from "antd";

import { Url } from "../../constants/ServerUrl";
import axios from "axios";

function NavBarCustomerDropdown() {
  let history = useHistory();

  const contextData = useContext(GlobalContext);
  const name = contextData.loginData.first_name;
  let handleLogout = () => {
    message.loading({ content: 'Loading...', key:"logout" });
    axios
      .get(Url + "/users/logout")
      .then(function (response) {
        console.log(response.data);
        if (response.data.logout===true) {
          // to reset global state
          contextData.setLoginData({});
          // contextData.setIsLoaded(false)
          contextData.setRedirectToBusinessInfo(true);
          localStorage.clear();
          history.push("/");
          message.success({ content: 'You have been successfully logged out.', key:"logout", duration: 2 });
  
        } else {
          message.error({ content: "Something went wrong. Please try again", key:"logout", duration: 2 });

        }
      })
      .catch(function (error) {
        console.log(error.response);
        message.error({ content: "Something went wrong. Please try again", key:"logout", duration: 2 });

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
        <Link to="/customer/dashboard">
          <div className="dropdown-item">Dashboard</div>
        </Link>
        <Link to="/customer/upcoming-appointments">
          <div className="dropdown-item">Upcoming Appointment</div>
        </Link>
        <Link to="/customer/completed-appointments">
          <div className="dropdown-item">Completed Appointment</div>
        </Link>
        <Link to="/customer/account">
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

export default NavBarCustomerDropdown;
