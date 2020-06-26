import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import "antd/dist/antd.less";

import Navbar from "./components/NavBar/NavBar";
import Home from "./components/Home";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import ProviderForm from "./components/SignUpStepForm/StepFormMain";
import BookingHome from "./components/Booking/BookingHome";
import Dashboard from "./components/Provider/Dashboard";
import Appointments from "./components/Provider/Appointments";
import Services from "./components/Provider/Services";
import Staff from "./components/Provider/Staff";
import GlobalState from "./context/GlobalState";

function App() {
  return (
    <GlobalState>
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
        <Route exact path="/business-info">
          <ProviderForm />
        </Route>
        <Route exact path="/booking/:id" children={<BookingHome />} />
        <Route exact path="/dashboard" children={<Dashboard />} />
        <Route exact path="/appointment" children={<Appointments />} />
        <Route exact path="/services" children={<Services />} />
        <Route exact path="/staff" children={<Staff />} />
      </Router>
    </GlobalState>
  );
}

export default App;
