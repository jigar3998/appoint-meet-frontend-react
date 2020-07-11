import React, { useState } from "react";
import { Input } from "antd";

import { message } from "antd";

import { useHistory } from "react-router-dom";

const { Search } = Input;

function BookFromUrl() {
  let history = useHistory();

  let checkBusiness = (url) => {
    try {
      if (Number.isInteger(+url)) {
        history.push("/booking/" +url);
        return;
      }
      console.log(window.location.host);
      url = new URL(url);
      console.log(url);
      let pathname = url.pathname.split("/");
      console.log(pathname);
      if (
        window.location.host === url.host &&
        pathname[1] === "booking" &&
        Number.isInteger(+pathname[2])
      ) {
        history.push("/booking/" + +pathname[2]);
      } else {
        message.error("Please Enter Valid Url or ID");
      }
    } catch (e) {
      console.log(e);
      message.error("Please Enter Valid Url or ID");
    }
  };

  return (
    <>
      <div style={{ width: "100%" }}>
        <Search
          onSearch={(value) => checkBusiness(value)}
          enterButton={"Book"}
          size="large"
          placeholder="Enter Url or ID"
        />
      </div>
    </>
  );
}

export default BookFromUrl;
