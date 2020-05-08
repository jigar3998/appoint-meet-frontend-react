import React, { useState, useEffect } from "react";
import { Form, Input, Button, Radio, Table, Space } from "antd";

import ServicesTable from "../../DataDisplay/ServicesTable";

function FirstBookingStep(props) {
  const [width, setWidth] = useState(window.innerWidth);

  const onSelectChange = (selectedRowKeys) => {
    console.log("selectedRowKeys changed: ", selectedRowKeys);
  };
  const updateWindowDimensions = () => {
    console.log(window.innerWidth);
    setWidth(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener("resize", updateWindowDimensions);
    return () => {
      window.removeEventListener("resize", updateWindowDimensions);
    };
  }, []);

  return (
    <div className="service-container">
      <div className="service-title">Select Service</div>
      <div className="service-div-container">
        <ServicesTable
          rowSelection={{
            type: "radio",
            onChange: onSelectChange,
          }}
          bordered={true}
          pagination={{ pageSize: 5 }}
          scroll={width < 560 ? { x: 460 } : {}}
          tableWidth={[200, 100, 100]}
        />
      </div>
      <div className="signup-navigation-button">
        <Button type="primary" onClick={() => props.next()}>
          Next
        </Button>
      </div>
    </div>
  );
}

export default FirstBookingStep;
