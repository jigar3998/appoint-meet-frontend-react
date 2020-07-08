import React, { useState, useEffect } from "react";
import {
  useParams,
} from "react-router-dom";

import {
  message,
  Skeleton,
} from "antd";

import BookingStepMain from "./BookingStep/BookingStepMain";

import "./BookingHome.css";
import { Url } from "../../constants/ServerUrl";
import axios from "axios";

function BookingHome() {
  const [loading, setLoading] = useState(false);
  const [businessInfo, setBusinessInfo] = useState(undefined);
  let { id: business_id } = useParams();

  useEffect(() => {
    loadbusinessInfo();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let loadbusinessInfo = () => {
    setLoading(true);
    axios
      .get(Url + "/business/" + business_id)
      .then(function (response) {
        console.log(response.data);
        setLoading(false);
        setBusinessInfo(response.data[0]);
      })
      .catch(function (error) {
        console.log(error.response);
        message.error("Something went wrong. Please try again");
        setLoading(false);
      });
  };

  return (
    <>
      <h3>ID: {business_id}</h3>
      <div className="business-home-container">
        <div className="business-left-container">
          {loading ? (
            <Skeleton active loading={loading} />
          ) : (
            businessInfo && 
            <>
              <h1>{businessInfo.business_name}</h1>
              <p>{businessInfo.business_description}</p>
              <p>{businessInfo.business_address}</p>
              <p>Open Hours</p>
            </>
          )}
        </div>
        <div className="business-right-container">
          <BookingStepMain business_id={business_id} />
        </div>
      </div>
    </>
  );
}

export default BookingHome;
