import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";

import { GlobalContext } from "../context/GlobalState";

import { message } from "antd";

const BookingRoute = ({ component: Component, ...rest }) => {
  // console.log(window.location);
  const contextData = useContext(GlobalContext);
  // console.log("from business authintiacation", contextData);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (
          contextData.loginData &&
          contextData.loginData.user_id !== undefined
        ) {
          if (contextData.loginData.access === "customer") {
            return <Component {...props} />;
          } else if (contextData.loginData.access === "business") {
            message.warning(
              "You must log in as a customer to book an appointment!"
            );
            return (
              <Redirect
                to={{
                  pathname: "/business/dashboard",
                }}
              />
            );
          }
        } else {
            message.warning(
                "You must log in to book an appointment!"
              );
          return (
            <Redirect
              to={{
                pathname: `/login`,
              }}
            />
          );
        }
      }}
    />
  );
};
export default BookingRoute;
