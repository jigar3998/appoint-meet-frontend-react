import React,{useContext} from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import "antd/dist/antd.less";

import Navbar from "./components/NavBar/NavBar";
import Home from "./components/Home";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import ProviderForm from "./components/SignUpStepForm/StepFormMain";
import BookingHome from "./components/Booking/BookingHome";
import Dashboard from "./components/Business/Dashboard";
import Appointments from "./components/Business/Appointments";
import Services from "./components/Business/Services";
import Staff from "./components/Business/Staff";
import BusinessRoute from "./Authentication/BusinessRoute";
import CustomerRoute from "./Authentication/CustomerRoute";
import DefaultRoute from "./Authentication/DefaultRoute";


import {GlobalContext} from "./context/GlobalState";

function App() {
  const contextData = useContext(GlobalContext)

console.log(contextData)
  return (
      <Router>
        {contextData.isLoaded ? (
          <>
            <DefaultRoute exact path="/" component={() => <Home />} />
            <DefaultRoute exact path="/login" component={() => <Login />} />
            <DefaultRoute exact path="/signup" component={() => <SignUp />} />
            <BusinessRoute
              exact
              path="/business/business-info"
              component={() => <ProviderForm />}
            />
            <BusinessRoute
              exact
              path="/business/dashboard"
              component={() => <Dashboard />}
            />
            <BusinessRoute
              exact
              path="/business/appointment"
              component={() => <Appointments />}
            />
            <BusinessRoute
              exact
              path="/business/services"
              component={() => <Services />}
            />
            <BusinessRoute exact path="/business/staff" component={() => <Staff />} />

            <CustomerRoute
              exact
              path="/booking/:id"
              component={() => <BookingHome />}
            />
          </>
        ) : (
          <></>
        )}
      </Router>
  );
}

export default App;
