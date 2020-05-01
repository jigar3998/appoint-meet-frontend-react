import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

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
