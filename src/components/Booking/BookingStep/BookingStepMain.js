import React, { useState, useEffect } from "react";

import { Steps } from "antd";

import FirstBookingStep from "./FirstBookingStep";
import SecondBookingStep from "./SecondBookingStep";
import ThirdBookingStep from "./ThirdBookingStep";
import FourthBookingStep from "./FourthBookingStep";

import "./BookingStepMain.css";

const { Step } = Steps;

function BookingStepMain(props) {
  const [current, setCurrent] = useState(0);
  const [width, setWidth] = useState(window.innerWidth);
  const [bookingInfo, serBookingInfo] = useState({});
  useEffect(() => {
    window.addEventListener("resize", updateWindowDimensions);
    return () => {
      window.removeEventListener("resize", updateWindowDimensions);
    };
  }, []);
  const updateWindowDimensions = () => {
    // console.log(window.innerWidth);
    setWidth(window.innerWidth);
  };
  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };
  const handleServiceNext = (service) => {
    serBookingInfo({ service: service });
    setCurrent(current + 1);
  };
  const handleStaffNext = (staff) => {
    serBookingInfo({ ...bookingInfo, staff: staff });
    setCurrent(current + 1);
  };
  const handleSlotNext = (slot) => {
    serBookingInfo({ ...bookingInfo, slot: slot });
    setCurrent(current + 1);
  };
  const steps = [
    {
      title: "Service",
      content: (
        <FirstBookingStep
          handleServiceNext={handleServiceNext}
          business_id={props.business_id}
        />
      ),
    },
    {
      title: "Staff",
      content: (
        <SecondBookingStep
          handleStaffNext={handleStaffNext}
          prev={prev}
          service_id={bookingInfo.service && bookingInfo.service.service_id}
        />
      ),
    },
    {
      title: "Time",
      content: (
        <ThirdBookingStep
          handleSlotNext={handleSlotNext}
          prev={prev}
          service_id={bookingInfo.service && bookingInfo.service.service_id}
          staff_id={bookingInfo.staff && bookingInfo.staff.staff_id}
        />
      ),
    },
    {
      title: "Confirm",
      content: <FourthBookingStep prev={prev} bookingInfo={bookingInfo} />,
    },
  ];
  return (
    <>
      <div className="booking-step-form-container">
        <Steps
          progressDot
          current={current}
          direction={width < 670 ? "vertical" : "horizontal"}
        >
          {steps.map((item) => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        <div className="booking-steps-content">{steps[current].content}</div>
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

export default BookingStepMain;
