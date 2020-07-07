import React, { useState } from "react";
import { Calendar,  Button } from "antd";
import moment from "moment";

function ThirdBookingStep(props) {
  const [value, setValue] = useState(moment("2017-01-25"));
  // eslint-disable-next-line no-unused-vars
  const [selectedValue, setSelectedValue] = useState(moment("2017-01-25"));
  const [selected, setSelected] = useState(null);
  const timeSolts = [
    "9:00 AM",
    "9:00 AM",
    "9:00 AM",
    "9:00 AM",
    "9:00 AM",
    "9:00 AM",
    "9:00 AM",
    "9:00 AM",
    "9:00 AM",
    "9:00 AM",
    "9:00 AM",
    "9:00 AM",
  ];
  const onSelect = (value) => {
    setValue(value);
    setSelectedValue(value);
  };

  const onPanelChange = (value) => {
    setValue(value);
  };
  const select = (index) => {
    console.log(index);
    setSelected(index);
  };
  console.log(props)
  return (
    <div className="select-time-step">
      <div className="select-date-container">
        {/* <Alert
          message={`You selected date: ${
            selectedValue && selectedValue.format("YYYY-MM-DD")
          }`}
        /> */}
        <div className="select-date-container-title">Select Date</div>
        <Calendar
          fullscreen={false}
          value={value}
          onSelect={onSelect}
          onPanelChange={onPanelChange}
        />
      </div>
      <div className="time-slots-container">
        <div className="select-date-container-title">Select Time Slots</div>
        <div className="time-slots">
          {/* <div>1 9:00 AM</div> */}
          {timeSolts.map((value, index) => (
            <div
              onClick={() => select(index)}
              className={selected === index ? "service-selected" : ""}
            >
              {value}
            </div>
          ))}
        </div>
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

export default ThirdBookingStep;
