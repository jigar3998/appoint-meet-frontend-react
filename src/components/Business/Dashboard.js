import React, { useContext } from "react";
import "./Dashboard.css";


import NavBarApplication from "../NavBar/NavBarApplication";
import CopyUrl from "./CopyUrl";
import BusinessStatistic from "./BusinessStatistic";
import BusinessInfo from "./BusinessInfo";

import { GlobalContext } from "../../context/GlobalState";

function Dashboard() {
  const contextData = useContext(GlobalContext);
  // console.log(window.location.host);
  return (
    <>
      <NavBarApplication dropdowntype={"business"} />
      <div className="dashboard-container">
        <div className="dashboard-statistic container-border">
          <BusinessStatistic />
        </div>
        <div className="booking-url-container container-border">
          <CopyUrl
            title={`Your Booking Url : http://${window.location.host}/booking/${contextData.loginData.business_id}`}
            copytext={`http://${window.location.host}/booking/${contextData.loginData.business_id}`}
          />
        </div>
        <div
          className="booking-url-container container-border"
          style={{ overflow: "auto" }}
        >
          <BusinessInfo />
        </div>
       {/*  <div className="dashboard-list">
          <div className="dashboard-list-left">
            <div
              className="container-border"
              // style={{ overflow: "auto"}}
            >
              <div className="dashboard-list-title">Upcoming Appointments</div>
              <Link to="/business/appointment">
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
              </Link>

              <hr />
              <AppointmentTable
                bordered={true}
                pagination={{ pageSize: 14 }}
                // tableWidth={[200, 150, 150, 100, 100]}
              />
            </div>
          </div>
          <div className="dashboard-list-right">
            <div className="container-border">
              <div className="dashboard-list-title">Services</div>
              <Link to="/business/services">
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
              </Link>

              <hr />
              <ServicesTable
                bordered={true}
                pagination={{ pageSize: 5 }}
                // tableWidth={[200, 100, 100]}
              />
            </div>
            <div className="container-border">
              <div className="dashboard-list-title">Staff</div>
              <Link to="/business/staff">
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
              </Link>

              <hr />
              <StaffTable
                bordered={true}
                pagination={{ pageSize: 5 }}
                // tableWidth={[200, 200]}
              />
            </div>
          </div>
        </div> */}
      </div>
    </>
  );
}

export default Dashboard;
