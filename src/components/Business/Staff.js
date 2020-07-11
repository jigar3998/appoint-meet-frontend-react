import React from "react";
import NavBarApplication from "../NavBar/NavBarApplication";
import "./Staff.css";
import StaffTable from "../DataDisplay/StaffTable";

import { PlusOutlined } from "@ant-design/icons";

import { Button } from "antd";
import { Link } from "react-router-dom";

function Staff() {
  return (
    <>
      <NavBarApplication dropdowntype={"business"}/>
      <div className="services-container container-border" style={{overflow:"auto"}}>
        <div className="services-list-title">
        <h2 style={{fontSize:"22px"}}>Your Staff</h2>        

          
          <div style={{ flex: 1 }} />
          <Link to="/business/add-staff">
            <Button className="services-add-button">
              <PlusOutlined />
              Add Staff
            </Button>
          </Link>
        </div>

        <div className="service-table">
          <StaffTable
            bordered={true}
            pagination={{ pageSize: 8 }}
            // tableWidth={[100, 100]}
          />
        </div>
      </div>
    </>
  );
}

export default Staff;
