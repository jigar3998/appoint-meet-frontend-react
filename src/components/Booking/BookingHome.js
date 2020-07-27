import React, { useState, useEffect } from "react";
import { message, Result, Button } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import BusinessInfo from "./BusinessInfo";
import BookingStepMain from "./BookingStep/BookingStepMain";
import NavBarApplication from "../NavBar/NavBarApplication";

import { useHistory, useParams } from "react-router-dom";
import { Url } from "../../constants/ServerUrl";
import axios from "axios";

import "./BookingHome.css";

function BookingHome() {
  let history = useHistory();
  let { id: business_id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    checkBusiness();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let checkBusiness = () => {
    setError(false);
    setLoading(true);
    axios
      .get(Url + "/business/validity/" + business_id)
      .then(function (response) {
        // console.log(response.data.Service_Valid);
        if (response.data.Service_Valid === true) {
          setLoading(false);
        } else {
          setLoading(false);
          setError("NotValidBusinessId");
        }
      })
      .catch(function (error) {
        // console.log(error);
        message.error("Something went wrong. Please try again");
        setLoading(false);
        setError("ServerError");
      });
  };

  return (
    <>
      <NavBarApplication dropdowntype={"customer"} />
      {loading ? (
        <LoadingOutlined
          spin
          style={{fontSize: 40 , width: "100%", textAlign: "center" ,marginTop:"50px"}}
        />
      ) : error ? (
        error === "NotValidBusinessId" ? (
          <Result
            status="warning"
            title="Your Booking Url or Id is not valid"
            extra={
              <Button
                type="primary"
                onClick={() => {
                  history.push("/customer/dashboard");
                }}
              >
                Go to Dashboard
              </Button>
            }
          />
        ) : error === "ServerError" ? (
          <Result
            status="500"
            title="500"
            subTitle="Sorry, something went wrong."
            extra={
              <Button
                type="primary"
                onClick={() => {
                  history.push("/customer/dashboard");
                }}
              >
                Go to Dashboard
              </Button>
            }
          />
        ) : (
          "Error"
        )
      ) : (
        <div className="business-home-container">
          <div className="business-left-container">
            <BusinessInfo />
          </div>
          <div className="business-right-container">
            <BookingStepMain business_id={business_id} />
          </div>
        </div>
      )}
    </>
  );
}

export default BookingHome;
