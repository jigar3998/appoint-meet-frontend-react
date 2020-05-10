import React from "react";
import NavBarDashboard from "../NavBar/NavBarDashboard";
import "./Dashboard.css";

import { Statistic, Row, Col, message } from "antd";
import { CopyOutlined } from "@ant-design/icons";
import { CopyToClipboard } from "react-copy-to-clipboard";

import ExternalLink from "../../asserts/external-link.svg";

import ServicesTable from "../DataDisplay/ServicesTable";
import ProviderTable from "../DataDisplay/StaffTable";
import AppointmentTable from "../DataDisplay/AppointmentTable";

function Dashboard() {
  return (
    <>
      <NavBarDashboard />
      <div className="dashboard-container">
        <div>
          <div className="dashboard-statistic container-border">
            <div style={{ flex: "1" }}>
              <Statistic title="Total Appointment" value={753} />
            </div>
            <div style={{ flex: "1" }}>
              <Statistic
                title="Total Revenue"
                value={98000}
                prefix={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="15"
                    height="15"
                    shape-rendering="geometricPrecision"
                    text-rendering="geometricPrecision"
                    image-rendering="optimizeQuality"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    viewBox="0 0 640 640"
                  >
                    <path d="M124.608-.012h391.174c3.354 0 6.095 2.811 6.095 6.26V65.86c0 3.437-2.74 6.248-6.095 6.248H393.607c19.264 22.406 33.024 49.395 39.26 79.052h82.915c3.354 0 6.094 2.8 6.094 6.249v59.622c0 3.437-2.74 6.26-6.094 6.26h-82.915c-7.476 35.516-25.772 67.241-51.355 91.797-33.52 32.161-79.666 52.11-130.383 52.11v.201h-5.634l219.416 250.196c5.93 6.768-4.464 21.827-9.118 21.84l-101.446.578L120.12 372.914c-1.949-2.209-2.445-5.232-1.594-7.902v-97.82H251.13v.19c23.846 0 45.46-9.308 61.11-24.308 6.072-5.835 11.221-12.496 15.202-19.784H124.609c-3.343 0-6.083-2.823-6.083-6.26v-59.623c0-3.448 2.74-6.248 6.083-6.248h202.833c-3.98-7.287-9.13-13.972-15.201-19.783-15.65-15.012-37.265-24.32-61.111-24.32v.19H118.526V6.248c0-3.45 2.74-6.26 6.082-6.26z" />
                  </svg>
                }
              />
            </div>
            <div style={{ flex: "1" }}>
              <Statistic title="Total Services You Provide" value={10} />
            </div>
          </div>
        </div>
        <div className="booking-url-container container-border">
          Your Booking Url:http://localhost:3000/booking/business
          <CopyToClipboard
            text={"http://localhost:3000/booking/business"}
            onCopy={() => message.success("Copied")}
          >
            <CopyOutlined style={{ fontSize: "21px", float: "right" }} />
          </CopyToClipboard>
        </div>
        <div className="dashboard-list">
          <div className="dashboard-list-left">
            <div className="container-border">
              <div className="dashboard-list-title">Upcoming Appointments</div>

              <img
                alt="link"
                src={ExternalLink}
                style={{
                  position: "absolute",
                  top: "15px",
                  right: "15px",
                  width: "20px",
                  height: "20px",
                }}
              />
              <hr />
              <AppointmentTable
                bordered={true}
                pagination={{ pageSize: 14 }}
                tableWidth={[100, 70, 70, 50, 50]}
              />
            </div>
          </div>
          <div className="dashboard-list-right">
            <div className="container-border">
              <div className="dashboard-list-title">Your Services</div>
              <img
                alt="link"
                src={ExternalLink}
                style={{
                  position: "absolute",
                  top: "15px",
                  right: "15px",
                  width: "20px",
                  height: "20px",
                }}
              />
              <hr />
              <ServicesTable
                bordered={true}
                pagination={{ pageSize: 5 }}
                tableWidth={[70, 40, 40]}
              />
            </div>
            <div className="container-border">
              <div className="dashboard-list-title">Your Staff</div>
              <img
                alt="link"
                src={ExternalLink}
                style={{
                  position: "absolute",
                  top: "15px",
                  right: "15px",
                  width: "20px",
                  height: "20px",
                }}
              />
              <hr />
              <ProviderTable
                bordered={true}
                pagination={{ pageSize: 5 }}
                tableWidth={[100, 100]}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
