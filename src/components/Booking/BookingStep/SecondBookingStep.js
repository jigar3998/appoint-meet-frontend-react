import React, { useState, useEffect } from "react";

import {  Button } from "antd";

import StaffTable from "../../DataDisplay/StaffTable";
function SecondBookingStep(props) {
  const [width, setWidth] = useState(window.innerWidth);
  const [selectedRowKey, setSelectedRowKey] = useState(undefined);
  const [disableButton, setDisableButton] = useState(true);


  const onSelectChange = (key,row) => {
    // console.log("selectedRowKeys changed: ", selectedRowKeys);
    setSelectedRowKey(row[0]);
    setDisableButton(false)
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
  // console.log("props",props);
  const handleNext = () => {
    props.handleStaffNext(selectedRowKey);
  };
  return (
    <div className="service-container">
      <div className="service-title">Select Staff</div>
      <div className="service-div-container">
        <StaffTable
          rowSelection={{
            type: "radio",
            onChange: onSelectChange,
          }}
          bordered={true}
          pagination={{ pageSize: 5 }}
          scroll={width < 560 ? { x: 460 } : {}}
          tableWidth={[200, 200]}
          service_id={props.service_id}
        />
      </div>
      <div className="signup-navigation-button">
        <Button onClick={() => props.prev()}>Previous</Button>
        <Button type="primary" onClick={handleNext} disabled={disableButton}>
          Next
        </Button>
      </div>
    </div>
  );
}

export default SecondBookingStep;
