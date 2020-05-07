import React, { useState } from "react";
import { Form, Input, Button, Radio } from "antd";

function SecondBookingStep(props) {
  const [selected, setSelected] = useState(null);
  const provider = [
    "Provider A",
    "Provider A",
    "Provider A",
    "Provider A",
    "Provider A",
    "Provider A",
    "Provider A",
    "Provider A",
    "Provider A",
    "Provider A",
    "Provider A",
    "Provider A",
    "Provider A",
    "Provider A",
    "Provider A",
  ];
  const select = (index) => {
    console.log(index);
    setSelected(index);
  };
  return (
    <div className="service-container">
      <div className="service-title">Select Provider</div>
      <div className="service-div-container">
        {provider.map((value, index) => (
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
        <Button onClick={() => props.prev()}>Previous</Button>
        <Button type="primary" onClick={() => props.next()}>
          Next
        </Button>
      </div>
    </div>
  );
}

export default SecondBookingStep;
