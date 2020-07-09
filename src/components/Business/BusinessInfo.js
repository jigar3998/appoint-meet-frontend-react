import React, { useState, useContext, useEffect } from "react";

import { message, Skeleton, Descriptions } from "antd";

import { Url } from "../../constants/ServerUrl";
import axios from "axios";
import { GlobalContext } from "../../context/GlobalState";

function BusinessInfo() {
  const contextData = useContext(GlobalContext);

  const [loading, setLoading] = useState(false);
  const [businessInfo, setBusinessInfo] = useState(undefined);
  let business_id = contextData.loginData.business_id;
  useEffect(() => {
    loadbusinessInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let loadbusinessInfo = () => {
    setLoading(true);
    axios
      .get(Url + "/business/" + business_id)
      .then(function (response) {
        console.log("hmrtygrtvhehf", response.data);
        setLoading(false);
        setBusinessInfo(response.data);
      })
      .catch(function (error) {
        console.log(error.response);
        message.error("Something went wrong. Please try again");
        setLoading(false);
      });
  };
  let tConvert = (time) => {
    // Check correct time format and split into components
    time = time
      .toString()
      .match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) {
      // If time format correct
      time = time.slice(1); // Remove full string match value
      time[5] = +time[0] < 12 ? " AM" : " PM"; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join(""); // return adjusted time or original string
  };
  let week = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return (
    <div>
      {loading ? (
        <Skeleton active loading={loading} />
      ) : (
        businessInfo && (
          <>
            {/* <h2 style={{ marginLeft: "5px", marginRight: "5px" }}>
              Business Info
            </h2>
            <hr />
            <h2 style={{ marginLeft: "5px", marginRight: "5px" }}>
              {businessInfo.business_name}
            </h2>
            <p style={{ marginLeft: "5px", marginRight: "5px" }}>
              {businessInfo.business_description}
            </p>
            <p style={{ marginLeft: "5px", marginRight: "5px" }}>
              {businessInfo.business_address}
            </p>
            <p style={{ marginLeft: "5px", marginRight: "5px" }}>Open Hours</p>
            {businessInfo.time.map((time) => (
              <p>
                {time.open_time} to {time.close_time}
              </p>
            ))} */}
            <Descriptions title={<h2>Business Information</h2>} bordered>
              <Descriptions.Item label="Name" span={3}>
                {businessInfo.business_name}
              </Descriptions.Item>
              <Descriptions.Item label="Category" span={3}>
                {businessInfo.industry}
              </Descriptions.Item>
              <Descriptions.Item label="Description" span={3}>
                {businessInfo.business_description}
              </Descriptions.Item>
              <Descriptions.Item label="Address" span={3}>
                {businessInfo.business_address}
              </Descriptions.Item>
              <Descriptions.Item label="Open Hours" span={3}>
                {/* sdfsdf <br /> */}
                {businessInfo.time.map((time) => {
                  return (
                    <div style={{marginBottom:"5px"}}>
                      {week[time.day_of_week]} :{" "}
                      {time.open_time === null ? "closed" : tConvert(
                      time.open_time.split(":")[0] +
                        ":" +
                        time.open_time.split(":")[1]
                    ) +
                    " to " +
                    tConvert(
                      time.close_time.split(":")[0] +
                        ":" +
                        time.close_time.split(":")[1]
                    )}
                    </div>
                  );
                })}
              </Descriptions.Item>
            </Descriptions>
          </>
        )
      )}
    </div>
  );
}

export default BusinessInfo;
