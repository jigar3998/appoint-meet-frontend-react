import React from "react";
import NavBarBusiness from "../NavBar/NavBarBusiness";
import "./Services.css";
import ServicesTable from "../DataDisplay/ServicesTable";

import { PlusOutlined } from "@ant-design/icons";

import { Button } from "antd";
import {Link } from "react-router-dom";


function Services() {
  return (
    <>
      <NavBarBusiness />
      <div className="services-container container-border" >
        <div className="services-list-title">
          Your Services
          <div style={{ flex: 1 }} />
          <Link to="/business/add-service">

          <Button className="services-add-button">
            <PlusOutlined />
            Add Services
          </Button>
          </Link>
        </div>
        {/* <hr /> */}


        <div className="service-table">
          <ServicesTable
            bordered={true}
            pagination={{ pageSize: 8 }}
            expandable={true}
            // tableWidth={[70, 40, 40]}
          />
        </div>
      </div>
    </>
  );
}

export default Services;
