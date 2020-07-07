import React, { useState, useEffect } from "react";
import {  Button } from "antd";

import ServicesTable from "../../DataDisplay/ServicesTable";

function FirstBookingStep(props) {
  const [width, setWidth] = useState(window.innerWidth);
  const [selectedRowKey, setSelectedRowKey] = useState(undefined);
  const [disableButton, setDisableButton] = useState(true);

  useEffect(() => {
    window.addEventListener("resize", updateWindowDimensions);
    return () => {
      window.removeEventListener("resize", updateWindowDimensions);
    };
  }, []);
  const onSelectChange = (key) => {
    // console.log("selectedRowKeys changed: ", selectedRowKeys);
    setSelectedRowKey(key[0]);
    setDisableButton(false)
  };
  const updateWindowDimensions = () => {
    console.log(window.innerWidth);
    setWidth(window.innerWidth);
  };
  const handleNext = () => {
    props.handleServiceNext(selectedRowKey);
  };
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
          business_id={props.business_id}
        />
      </div>
      <div className="signup-navigation-button">
        <Button type="primary" onClick={handleNext} disabled={disableButton}>
          Next
        </Button>
      </div>
    </div>
  );
}

export default FirstBookingStep;
