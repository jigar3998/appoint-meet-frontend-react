import React, { useState } from "react";

import { Steps, Button, message } from "antd";
import LoginNavBar from "../NavBar/LoginNavBar";

import FirstStep from "./FirstStep";
import SecondStep from "./SecondStep";
import ThirdStep from "./ThirdStep";
import FourthStep from "./FourthStep";

import "./StepFormMain.css";

const { Step } = Steps;

function StepFormMain() {
  const [current, setCurrent] = useState(3);
  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };
  const steps = [
    {
      title: "Your Business",
      content: <FirstStep next={next}/>,
    },
    {
      title: "Timing",
      content: <SecondStep next={next}/>,
    },
    {
      title: "Staff",
      content: <ThirdStep next={next}/>,
    },
    {
      title: "Services",
      content: <FourthStep />,
    },
  ];
  return (
    <>
      <LoginNavBar />
      <div className="signup-step-form-container">
        <Steps progressDot current={current}>
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
