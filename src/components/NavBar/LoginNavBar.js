import React from "react";
import {  Link } from "react-router-dom";

import "./LoginNavBar.css";

function LoginNavBar() {
  return (
    <div className="login-nav">
      <Link to="/">
        <span className="login-nav-title">Appoint Meet</span>
      </Link>
    </div>
  );
}

export default LoginNavBar;
