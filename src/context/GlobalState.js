import React, { createContext, Component, useState, useEffect,useRef } from "react";

export const GlobalContext = createContext();

function GlobalState(props) {
  const [loginData, setLoginData] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [redirectToBusinessInfo, setRedirectToBusinessInfo] = useState(true);
  const stepFormCurrent = useRef(0)
  let setStepFormCurrent=(num)=>{
    stepFormCurrent.current=num
  }

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
          redirectToBusinessInfo,
          stepFormCurrent,
          setLoginData: setLoginDataL,
          setIsLoaded,
          setRedirectToBusinessInfo,
          setStepFormCurrent,
        }}
      >
        {props.children}
      </GlobalContext.Provider>
    </div>
  );
}

export default GlobalState;
