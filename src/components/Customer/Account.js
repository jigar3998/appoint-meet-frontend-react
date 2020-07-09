import React, { useContext } from "react";
import NavBarApplication from "../NavBar/NavBarApplication";

import "./Account.css";

import User from "../../asserts/user.svg";
import { GlobalContext } from "../../context/GlobalState";

function Account() {
  const contextData = useContext(GlobalContext);
  let name =
    contextData.loginData.first_name + " " + contextData.loginData.last_name;
  let email = contextData.loginData.user_email_id;
  let accountType = contextData.loginData.access;
  return (
    <div>
      <NavBarApplication dropdowntype={"customer"} />
      <div className="dashboard-container">
        <div className="container-border account-container">
          <div className="account-letf ">
            <img
              src={User}
              alt="home-illustration"
              className="user-illustration"
            />
          </div>
          <div className="account-right">
            <hr />

            <div className="account-details"> Name : {name}</div>
            <hr />
            <div className="account-details"> Email : {email}</div>
            <hr />
            <div className="account-details"> Account Type : {accountType}</div>
            <hr />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Account;
