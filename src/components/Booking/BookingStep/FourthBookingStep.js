import React from "react";
import {  Button,  Descriptions } from "antd";

function FourthBookingStep(props) {
  return (
    <div className="booking-confirm-container">
      <Descriptions title={<h2>Booking Information</h2>} bordered>
        <Descriptions.Item label="Service" span={3}>
          just photo
        </Descriptions.Item>
        <Descriptions.Item label="Staff" span={3}>
          business name
        </Descriptions.Item>
        <Descriptions.Item label="price" span={3}>
          100$
        </Descriptions.Item>
        <Descriptions.Item label="Time" span={3}>
          9:00 AM
        </Descriptions.Item>
      </Descriptions>
      <div className="signup-navigation-button">
        <Button onClick={() => props.prev()}>Previous</Button>
        <Button type="primary" onClick={() => "f"}>
          Done
        </Button>
      </div>
    </div>
  );
}

export default FourthBookingStep;
