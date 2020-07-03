import React, { useContext } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import "antd/dist/antd.less";

import Navbar from "./components/NavBar/NavBar";
import Home from "./components/Home";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import ProviderForm from "./components/Business/SignUpStepForm/StepFormMain";
import BookingHome from "./components/Booking/BookingHome";
import Dashboard from "./components/Business/Dashboard";
import Appointments from "./components/Business/Appointments";
import Services from "./components/Business/Services";
import Staff from "./components/Business/Staff";
import AddService from "./components/Business/AddService";
import AddStaff from "./components/Business/AddStaff";
import BusinessRoute from "./authentication/BusinessRoute";
import CustomerRoute from "./authentication/CustomerRoute";
import DefaultRoute from "./authentication/DefaultRoute";
import NotFound404 from "./components/NotFound404";

import { GlobalContext } from "./context/GlobalState";

function App() {
  const contextData = useContext(GlobalContext);

  console.log(contextData);
  return (
    <Router>
      {contextData.isLoaded ? (
        <Switch>
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
          <BusinessRoute
            exact
            path="/business/staff"
            component={() => <Staff />}
          />
          <BusinessRoute
            exact
            path="/business/add-service"
            component={() => <AddService />}
          />
          <BusinessRoute
            exact
            path="/business/add-staff"
            component={() => <AddStaff />}
          />

          <CustomerRoute
            exact
            path="/booking/:id"
            component={() => <BookingHome />}
          />
          <Route component={NotFound404} />
        </Switch>
      ) : (
        <></>
      )}
    </Router>
  );
}

export default App;
