import React,{useContext} from "react";
import { Route, Redirect } from "react-router-dom";

import {GlobalContext} from "../context/GlobalState";


const DefaultRoute = ({
  component: Component,
  ...rest
}) => {
  const contextData = useContext(GlobalContext)
  // console.log("from default authintiacation",contextData)
  return (
    <Route
      {...rest}
      render={props => {
        if (contextData.loginData && contextData.loginData.user_id!==undefined && contextData.loginData.access==="business") {
          return <Redirect
          to={{
            pathname: "/business/dashboard",
          }}
        />;
        } 
        else if(contextData.loginData && contextData.loginData.user_id!==undefined && contextData.loginData.access==="customer"){
            return <Redirect
          to={{
            pathname: "/customer/dashboard",
          }}
        />;
        }
        else {
          return (
            <Component {...props} />
          );
        }
      }}
    />
  );
};
export default DefaultRoute;