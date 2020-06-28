import React from "react";
import NavBarBusiness from "../NavBar/NavBarBusiness";
import "./Staff.css";
import StaffTable from "../DataDisplay/StaffTable";

import { PlusOutlined } from "@ant-design/icons";

import { Button } from "antd";

function Staff() {
  return (
    <>
      <NavBarBusiness />
      <div className="services-container container-border">
        <div className="services-list-title">
          Your Staff
          <div style={{ flex: 1 }} />
          <Button className="services-add-button">
            <PlusOutlined />
            Add Staff
          </Button>
        </div>

        <div className="service-table">
        <StaffTable
                bordered={true}
                pagination={{ pageSize: 5 }}
                tableWidth={[100, 100]}
              />
        </div>
      </div>
    </>
  );
}

export default Staff;
