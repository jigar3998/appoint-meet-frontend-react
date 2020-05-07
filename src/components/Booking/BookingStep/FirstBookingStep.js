import React, { useState } from "react";
import { Form, Input, Button, Radio } from "antd";

function FirstBookingStep(props) {
  const [selected, setSelected] = useState(null);
  const services = [
    "Service A | 500$ | 30min",
    "Service A 500$ 30min",
    "Service A 500$ 30min",
    "Service A 500$ 30min",
    "Service A 500$ 30min",
    "Service A 500$ 30min",
    "Service A 500$ 30min",
    "Service A 500$ 30min",
    "Service A 500$ 30min",
    "Service A 500$ 30min",
    "Service A 500$ 30min",
    "Service A 500$ 30min",
    "Service A 500$ 30min",
  ];
  const select = (index) => {
    console.log(index);
    setSelected(index);
  };
  return (
    <div className="service-container">
      <div className="service-title">Select Service</div>
      <div className="service-div-container">
        {services.map((value, index) => (
          <div
            onClick={() => select(index)}
            className={
              selected == index ? "service-selected service-div" : "service-div"
            }
          >
            {value}
          </div>
        ))}
      </div>
      <div className="signup-navigation-button">
        <Button type="primary" onClick={() => props.next()}>
          Next
        </Button>
      </div>
    </div>
  );
}

export default FirstBookingStep;
