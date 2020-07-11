import React from "react";
import NavBarApplication from "../NavBar/NavBarApplication";
import CustomerStatistic from "./CustomerStatistic";

import BookFromUrl from "./BookFromUrl";

function Dashboard() {
  return (
    <div>
      <NavBarApplication dropdowntype={"customer"} />
      <div className="dashboard-container">
        <div className="dashboard-statistic container-border"><CustomerStatistic/></div>
        <div
          className="container-border dashboard-margin"
          style={{ padding: "20px", paddingTop: "10px" ,marginTop:"20px"}}
        >
          <h2>Book Appointment</h2>
          <BookFromUrl />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
