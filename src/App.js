import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import 'antd/dist/antd.less';

import Navbar from "./components/NavBar/NavBar";
import Home from "./components/Home";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import ProviderForm from "./components/SignUpStepForm/StepFormMain";

function App() {
  return (
    <Router>
      <Route exact path="/">
        <Navbar />
        <Home />
      </Route>
      <Route exact path="/login">
        <Login />
      </Route>
      <Route exact path="/signup">
        <SignUp />
      </Route>
      <Route exact path="/signup-provider">
        <ProviderForm />
      </Route>
    </Router>
  );
}

export default App;
