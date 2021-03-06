import React, { useContext } from "react";
import NavBarApplication from "../NavBar/NavBarApplication";

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
      <NavBarApplication dropdowntype={"business"} />
      <div className="dashboard-container container-border">
        <h2
          style={{ fontSize: "25px", textAlign: "center", marginTop: "30px" }}
        >
          Account Information
        </h2>
        <div className=" account-container">
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
