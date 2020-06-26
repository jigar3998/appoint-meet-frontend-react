import React, { createContext, Component, useState } from "react";

export const GlobalContext = createContext();

function GlobalState(props) {
  const [loginData, setLoginData] = useState({});

  return (
    <div>
      <GlobalContext.Provider
        value={{ loginData: loginData, setLoginData: setLoginData }}
      >
        {props.children}
      </GlobalContext.Provider>
    </div>
  );
}

export default GlobalState;
