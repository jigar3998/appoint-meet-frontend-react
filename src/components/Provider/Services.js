import React from "react";
import NavBarDashboard from "../NavBar/NavBarDashboard";
import "./Services.css";
import ServicesTable from "../DataDisplay/ServicesTable";

import { PlusOutlined } from "@ant-design/icons";

import { Button } from "antd";

function Services() {
  return (
    <>
      <NavBarDashboard />
      <div className="services-container container-border">
        <div className="services-list-title">
          Your Services
          <div style={{ flex: 1 }} />
          <Button className="services-add-button">
            <PlusOutlined />
            Add Services
          </Button>
        </div>
        {/* <hr /> */}


        <div className="service-table">
          <ServicesTable
            bordered={true}
            pagination={{ pageSize: 5 }}
            tableWidth={[70, 40, 40]}
          />
        </div>
      </div>
    </>
  );
}

export default Services;
