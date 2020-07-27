import React, { useState, useEffect, useContext } from "react";

import { Steps } from "antd";
import LoginNavBar from "../../NavBar/LoginNavBar";
import { useHistory } from "react-router-dom";

import FirstStep from "./FirstStep";
import SecondStep from "./SecondStep";
import ThirdStep from "./ThirdStep";
import FourthStep from "./FourthStep";

import "./StepFormMain.css";

import { GlobalContext } from "../../../context/GlobalState";

const { Step } = Steps;

function StepFormMain() {
  let history = useHistory();

  const contextData = useContext(GlobalContext);

  const [current, setCurrentT] = useState(contextData.stepFormCurrent.current);
  const [width, setWidth] = useState(window.innerWidth);
  const [businessInfo, setBusinessInfo] = useState();

  useEffect(() => {
    window.addEventListener("resize", updateWindowDimensions);
    return () => {
      window.removeEventListener("resize", updateWindowDimensions);
    };
  }, []);
  let setCurrent = (num) => {
    contextData.setStepFormCurrent(num);
    setCurrentT(num);
  };
  const updateWindowDimensions = () => {
    // console.log(window.innerWidth);
    setWidth(window.innerWidth);
  };
  const BusinessInfoNext = (data) => {
    setBusinessInfo(data);
    setCurrent(current + 1);
  };
  const next = () => {
    setCurrent(current + 1);
  };

  // const prev = () => {
  //   setCurrent(current - 1);
  // };
  const onAddServiceComplete = () => {
    history.push("/business/dashboard");
    contextData.setRedirectToBusinessInfo(true);
    setCurrent(0);

  };
  const onAddStaffComplete = () => {
    setCurrent(current + 1);
  };
  const steps = [
    {
      title: "Your Business",
      content: <FirstStep BusinessInfoNext={BusinessInfoNext} />,
    },
    {
      title: "Timing",
      content: <SecondStep next={next} businessInfo={businessInfo} />,
    },
    {
      title: "Staff",
      content: (
        <ThirdStep
          onAddStaffComplete={onAddStaffComplete}
          ButtonName={"Next"}
        />
      ),
    },
    {
      title: "Services",
      content: (
        <FourthStep
          onAddServiceComplete={onAddServiceComplete}
          ButtonName={"Next"}
        />
      ),
    },
  ];
  return (
    <>
      <LoginNavBar />
      <div className="signup-step-form-container">
        <Steps
          progressDot
          current={current}
          direction={width < 690 ? "vertical" : "horizontal"}
        >
          {steps.map((item) => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        <div className="steps-content">{steps[current].content}</div>
        <div className="steps-action">
          {/* <div className="signup-navigation-button">
            {current > 0 && <Button onClick={() => prev()}>Previous</Button>}
            {current < steps.length - 1 && (
              <Button type="primary" onClick={() => next()}>
                Next
              </Button>
            )}
            {current === steps.length - 1 && (
              <Button
                type="primary"
                onClick={() => message.success("Processing complete!")}
              >
                Done
              </Button>
            )}
          </div> */}
        </div>
      </div>
    </>
  );
}

export default StepFormMain;
