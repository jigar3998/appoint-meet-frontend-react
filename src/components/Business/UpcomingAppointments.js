import React from "react";
import NavBarApplication from "../NavBar/NavBarApplication";
import "./Appointments.css";
import AppointmentTable from "./AppointmentTable";


function UpcomingAppointments() {
  return (
    <>
      <NavBarApplication dropdowntype={"business"}/>
      <div className="services-container container-border">
        <div className="services-list-title">
          <h2 style={{fontSize:"22px"}}>Your Upcoming Appointments</h2>        
          <div style={{ flex: 1 }} />
        </div>
        {/* <hr /> */}

        <div className="service-table">
          <AppointmentTable
            bordered={true}
            pagination={{ pageSize: 14 }}
            urlPath={"/business/appointments/upcoming/"}

            // tableWidth={[100, 70, 70, 50, 50]}
          />
        </div>
      </div>
    </>
  );
}

export default UpcomingAppointments;
