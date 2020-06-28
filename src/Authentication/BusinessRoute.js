import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";

import { GlobalContext } from "../context/GlobalState";

const BusinessRoute = ({ component: Component, ...rest }) => {
  const contextData = useContext(GlobalContext);
  console.log("from business authintiacation");
  return (
    <Route
      {...rest}
      render={(props) => {
        if (
          contextData.loginData && contextData.loginData.user_id!==undefined &&
          contextData.loginData.access == "business"
        ) {
          if (rest.path !== "/business/business-info" && contextData.loginData.business_id===undefined
          ) {
            return (
              <Redirect
                to={{
                  pathname: "/business/business-info",
                }}
              />
            );
          } 
          else if(rest.path === "/business/business-info" && contextData.loginData.business_id!==undefined){
            return (
              <Redirect
                to={{
                  pathname: "/business/dashboard",
                }}
              />
            );
          }
          else {
            return <Component {...props} />;
          }
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
export default BusinessRoute;
