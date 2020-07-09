import React, { useState, useContext, useEffect } from "react";
import { Calendar, Button, message, Spin } from "antd";

import { LoadingOutlined } from "@ant-design/icons";

import { Url } from "../../../constants/ServerUrl";
import axios from "axios";

function ThirdBookingStep(props) {
  const [loading, setLoading] = useState(false);
  const [selectedTime, setSelectedTime] = useState(-1);
  const [selectedTimeDate, setSelectedTimeDate] = useState(-1);
  const [timeSolts, setTimeSolts] = useState([]);
  const [selectedDate, setSelectedDate] = useState([]);

  useEffect(() => {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, "0");
    let mm = String(today.getMonth() + 1).padStart(2, "0");
    let yyyy = today.getFullYear();

    today = yyyy + "-" + mm + "-" + dd;

    loadSlots(today);
    setSelectedDate(today);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let loadSlots = (date) => {
    setLoading(true);
    axios
      .post(Url + "/booking_status/" + props.service_id, {
        staff_id: props.staff_id,
        booking_date: date,
      })
      .then(function (response) {
        console.log(response.data);
        setLoading(false);
        setTimeSolts(response.data);
      })
      .catch(function (error) {
        console.log(error.response);
        message.error("Something went wrong. Please try again");
        setLoading(false);
      });
  };

  const onSelectDate = (value) => {
    // setSelectedDate(value);
    loadSlots(value.format("YYYY-MM-DD"));
    setSelectedDate(value.format("YYYY-MM-DD"));
  };
  const selectTime = (index) => {
    console.log(index);
    index["start_time_slot"]=tConvert(index.start_time_slot.split(":")[0]+":"+index.start_time_slot.split(":")[1])
    index["end_time_slot"]=tConvert(index.end_time_slot.split(":")[0]+":"+index.end_time_slot.split(":")[1])
    setSelectedTime(index);
    setSelectedTimeDate(selectedDate);
  };
  let tConvert = (time) => {
    // Check correct time format and split into components
    time = time
      .toString()
      .match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) {
      // If time format correct
      time = time.slice(1); // Remove full string match value
      time[5] = +time[0] < 12 ? " AM" : " PM"; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join(""); // return adjusted time or original string
  };
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
          // value={value}
          onSelect={onSelectDate}
        />
      </div>
      <div className="time-slots-container">
        <div className="select-date-container-title">Select Time Slots</div>
        <div className="time-slots">
          {/* <div>1 9:00 AM</div> */}
          {loading ? (
            <LoadingOutlined style={{ fontSize: 24 }} spin />
          ) : (
            timeSolts.map((value) => {
              let classname = "";
              if (
                selectedTime.slot_id === value.slot_id &&
                selectedTimeDate === selectedDate
              ) {
                classname = value.booked
                  ? "service-selected booked"
                  : "service-selected not-booked";
              } else {
                classname = value.booked ? "booked" : "not-booked";
              }
              return (
                <div
                  key={value.slot_id}
                  onClick={() => !value.booked && selectTime(value)}
                  className={classname}
                >
                  {tConvert(value.start_time_slot.split(":")[0]+":"+value.start_time_slot.split(":")[1])}
                </div>
              );
            })
          )}
        </div>
      </div>
      <div className="signup-navigation-button">
        <Button onClick={() => props.prev()}>Previous</Button>
        <Button
          type="primary"
          onClick={() =>
            props.handleSlotNext({ ...selectedTime, date: selectedTimeDate })
          }
          disabled={selectedTime === -1}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

export default ThirdBookingStep;
