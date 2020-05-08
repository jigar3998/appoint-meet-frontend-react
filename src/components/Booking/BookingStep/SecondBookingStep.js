import React, { useState, useEffect } from "react";

import { Form, Input, Button, Radio, Table, Space } from "antd";

import ProviderTable from "../../DataDisplay/ProviderTable";
function SecondBookingStep(props) {
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
      <div className="service-title">Select Provider</div>
      <div className="service-div-container">
        <ProviderTable
          rowSelection={{
            type: "radio",
            onChange: onSelectChange,
          }}
          bordered={true}
          pagination={{ pageSize: 5 }}
          scroll={width < 560 ? { x: 460 } : {}}
          tableWidth={[200, 200]}
        />
      </div>
      <div className="signup-navigation-button">
        <Button onClick={() => props.prev()}>Previous</Button>
        <Button type="primary" onClick={() => props.next()}>
          Next
        </Button>
      </div>
    </div>
  );
}

export default SecondBookingStep;
