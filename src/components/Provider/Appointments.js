import React from "react";
import NavBarDashboard from "../NavBar/NavBarDashboard";
import "./Appointments.css";
import AppointmentTable from "../DataDisplay/AppointmentTable";

import { PlusOutlined } from "@ant-design/icons";

import { Button } from "antd";

function Appointments() {
  return (
    <>
      <NavBarDashboard />
      <div className="services-container container-border">
        <div className="services-list-title">
          Your Upcoming Appointments
          <div style={{ flex: 1 }} />

        </div>
        {/* <hr /> */}


        <div className="service-table">
        <AppointmentTable
                bordered={true}
                pagination={{ pageSize: 14 }}
                tableWidth={[100, 70, 70, 50, 50]}
              />
        </div>
      </div>
    </>
  );
}

export default Appointments;
