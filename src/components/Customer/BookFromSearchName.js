import React, { useState, useEffect } from "react";
import {  message, Select, Button } from "antd";
import { useHistory } from "react-router-dom";
import { Url } from "../../constants/ServerUrl";
import axios from "axios";

const { Option } = Select;

function BookFromSearchName() {
  const [loading, setLoading] = useState(true);
  const [businessInfo, setBusinessLotInfo] = useState([]);
  const [selectedBusinessId, setSelectedBusinessId] = useState(undefined);

  const getBusinessInfo = () => {
    setLoading(true);
    axios
      .get(Url + "/business")
      .then(function (response) {
        // console.log(response.data);
        setBusinessLotInfo(response.data);
        setLoading(false);
      })
      .catch(function (error) {
        message.error("Something went wrong. Please try again");
        // console.log(error);
        setLoading(false);
      });
  };
  useEffect(() => {
    getBusinessInfo();
  }, []);

  function onChange(value) {
    setSelectedBusinessId(value);
  }

  let history = useHistory();

  let book = () => {
    if (selectedBusinessId === undefined) {
      message.warning("Please Select Business First");
      return;
    }
    history.push("/booking/" + selectedBusinessId);
  };

  return (
    <>
      <div style={{ width: "100%" }}>
        <Select
          size="large"
          loading={loading}
          showSearch
          style={{ width: "calc(100% - 68px)" }}
          placeholder="Search Business by Name"
          optionFilterProp="children"
          onChange={onChange}
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {businessInfo.map((info, index) => (
            <Option key={index} value={info.business_id}>
              {info.business_address}
            </Option>
          ))}
        </Select>
        <Button
          style={{ width: "68px" }}
          type="primary"
          size="large"
          onClick={book}
        >
          Book
        </Button>
      </div>
    </>
  );
}

export default BookFromSearchName;
