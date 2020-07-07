import React,{useContext} from "react";
import { Route, Redirect } from "react-router-dom";

import {GlobalContext} from "../context/GlobalState";



const CustomerRoute = ({
  component: Component,
  ...rest
}) => {
  const contextData = useContext(GlobalContext)
  console.log("from business authintiacation",contextData)
  return (
    <Route
      {...rest}
      render={props => {
        if (contextData.loginData && contextData.loginData.user_id!==undefined && contextData.loginData.access==="customer") {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/login",
              }}
            />
          );
        }
      }}
    />
  );
};
export default CustomerRoute;