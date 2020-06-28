import React, { createContext, Component, useState, useEffect } from "react";

export const GlobalContext = createContext();

function GlobalState(props) {
  const [loginData, setLoginData] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);

  let setLoginDataL = (data) => {
    setLoginData(data);
    localStorage.setItem("loginData", JSON.stringify(data));
  };
  let loadData = () => {
    if (!isLoaded) {
      let loginDataLocal = JSON.parse(localStorage.getItem("loginData"));
      if (!(loginDataLocal === null)) {
        setLoginData(loginDataLocal);
      }
      setIsLoaded(true);
    }
  };
  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <GlobalContext.Provider
        value={{
          loginData,
          isLoaded,
          setLoginData: setLoginDataL,
        }}
      >
        {props.children}
      </GlobalContext.Provider>
    </div>
  );
}

export default GlobalState;
