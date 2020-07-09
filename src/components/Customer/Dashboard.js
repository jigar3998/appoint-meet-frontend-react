import React from "react";
import NavBarApplication from "../NavBar/NavBarApplication";

function Dashboard() {
  return (
    <div>
      <NavBarApplication dropdowntype={"customer"} />
      Customer Dashboard
      <div className="dashboard-container">
        <div>
          <div className="dashboard-statistic container-border">Stats</div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
