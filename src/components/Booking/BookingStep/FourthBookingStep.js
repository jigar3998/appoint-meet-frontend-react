import React, { useState, useContext } from "react";
import { Button, Descriptions, message } from "antd";

import { Url } from "../../../constants/ServerUrl";
import axios from "axios";
import { GlobalContext } from "../../../context/GlobalState";

function FourthBookingStep(props) {
  const contextData = useContext(GlobalContext);

  const [loading, setLoading] = useState(false);

  let book = () => {
    axios
      .post(Url + "/booking/" + contextData.loginData.user_id, {
        slot_id: props.bookingInfo.slot.slot_id,
        staff_id: props.bookingInfo.staff.staff_id,
        booking_date: props.bookingInfo.slot.date,
      })
      .then(function (response) {
        console.log(response.data);
        setLoading(false);
        message.success("appointment booked successfully.");
      })
      .catch(function (error) {
        console.log(error.response);
        message.error("Something went wrong. Please try again");
        setLoading(false);
      });
  };

  console.log(props.bookingInfo);
  return (
    <div className="booking-confirm-container">
      <Descriptions title={<h2>Booking Information</h2>} bordered>
        <Descriptions.Item label="Service" span={3}>
          {props.bookingInfo.service.service_name}
        </Descriptions.Item>
        <Descriptions.Item label="Staff" span={3}>
          {props.bookingInfo.staff.staff_name}
        </Descriptions.Item>
        <Descriptions.Item label="price" span={3}>
          {props.bookingInfo.service.service_price} ₹
        </Descriptions.Item>
        <Descriptions.Item label="Date" span={3}>
          {props.bookingInfo.slot.date}
        </Descriptions.Item>
        <Descriptions.Item label="Time" span={3}>
          {props.bookingInfo.slot.start_time_slot} to{" "}
          {props.bookingInfo.slot.end_time_slot}
        </Descriptions.Item>
      </Descriptions>
      <div className="signup-navigation-button">
        <Button onClick={() => props.prev()}>Previous</Button>
        <Button type="primary" onClick={() => book()} loading={loading}>
          Done
        </Button>
      </div>
    </div>
  );
}

export default FourthBookingStep;
