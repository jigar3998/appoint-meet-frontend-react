import React, { useContext } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import "antd/dist/antd.less";

// import Navbar from "./components/NavBar/NavBar";
import Home from "./components/Home";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import ProviderForm from "./components/Business/SignUpStepForm/StepFormMain";
import BookingHome from "./components/Booking/BookingHome";
import BusinessDashboard from "./components/Business/Dashboard";
import BusinessUpcomingAppointments from "./components/Business/UpcomingAppointments";
import BusinessCompletedAppointments from "./components/Business/CompletedAppointments";
import Services from "./components/Business/Services";
import Staff from "./components/Business/Staff";
import AddService from "./components/Business/AddService";
import AddStaff from "./components/Business/AddStaff";
import BusinessAccount from "./components/Business/Account";
import CustomerDashboard from "./components/Customer/Dashboard";
import CustomerAccount from "./components/Customer/Account";
import CustomerUpcomingAppointments from "./components/Customer/UpcomingAppointments";
import CompletedAppointments from "./components/Customer/CompletedAppointments";
import BusinessRoute from "./authentication/BusinessRoute";
import CustomerRoute from "./authentication/CustomerRoute";
import DefaultRoute from "./authentication/DefaultRoute";
import BookingRoute from "./authentication/BookingRoute";
import NotFound404 from "./components/NotFound404";

import { GlobalContext } from "./context/GlobalState";

import axios from "axios";
axios.defaults.withCredentials = true

function App() {
  const contextData = useContext(GlobalContext);

  // console.log(contextData);
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
            component={() => <BusinessDashboard />}
          />
          <BusinessRoute
            exact
            path="/business/upcoming-appointments"
            component={() => <BusinessUpcomingAppointments />}
          />
          <BusinessRoute
            exact
            path="/business/completed-appointments"
            component={() => <BusinessCompletedAppointments />}
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
          <BusinessRoute
            exact
            path="/business/account"
            component={() => <BusinessAccount />}
          />

          <CustomerRoute
            exact
            path="/customer/dashboard"
            component={() => <CustomerDashboard />}
          />
          <CustomerRoute
            exact
            path="/customer/account"
            component={() => <CustomerAccount />}
          />
          <CustomerRoute
            exact
            path="/customer/upcoming-appointments"
            component={() => <CustomerUpcomingAppointments />}
          />
          <CustomerRoute
            exact
            path="/customer/completed-appointments"
            component={() => <CompletedAppointments />}
          />
          <BookingRoute
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
