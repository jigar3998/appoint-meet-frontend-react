import React, { useState, useContext, useEffect } from "react";
import { Statistic, message, Skeleton, Empty } from "antd";

import { Url } from "../../constants/ServerUrl";
import axios from "axios";
import { GlobalContext } from "../../context/GlobalState";

function BusinessStatistic() {
  const contextData = useContext(GlobalContext);
  const [loading, setLoading] = useState(true);
  const [businessStats, setBusinessStats] = useState("NoData");
  let business_id = contextData.loginData.business_id;

  useEffect(() => {
    loadbusinessStats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let loadbusinessStats = () => {
    setLoading(true);
    axios
      .get(Url + "/business/stats/" + business_id)
      .then(function (response) {
        // console.log(response.data);
        setLoading(false);
        setBusinessStats(response.data);
      })
      .catch(function (error) {
        // console.log(error.response);
        message.error("Something went wrong. Please try again");
        setLoading(false);
        setBusinessStats("NoData");
      });
  };

  return (
    <>
      {loading ? (
        <Skeleton
          active
          loading={loading}
          paragraph={{ rows: 2, width: "100%" }}
        />
      ) : businessStats === "NoData" ? (
        <Empty style={{width:"100%"}}/>
      ) : (
        <>
          <div style={{ flex: "1" , textAlign: "center" }}>
            <Statistic
              title="Total Appointment"
              value={businessStats.totalAppointment}
            />
          </div>
          <div style={{ flex: "1" , textAlign: "center" }}>
            <Statistic
              title="Total Revenue"
              value={businessStats.totalRevenue}
              prefix={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                  shape-rendering="geometricPrecision"
                  text-rendering="geometricPrecision"
                  image-rendering="optimizeQuality"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  viewBox="0 0 640 640"
                >
                  <path d="M124.608-.012h391.174c3.354 0 6.095 2.811 6.095 6.26V65.86c0 3.437-2.74 6.248-6.095 6.248H393.607c19.264 22.406 33.024 49.395 39.26 79.052h82.915c3.354 0 6.094 2.8 6.094 6.249v59.622c0 3.437-2.74 6.26-6.094 6.26h-82.915c-7.476 35.516-25.772 67.241-51.355 91.797-33.52 32.161-79.666 52.11-130.383 52.11v.201h-5.634l219.416 250.196c5.93 6.768-4.464 21.827-9.118 21.84l-101.446.578L120.12 372.914c-1.949-2.209-2.445-5.232-1.594-7.902v-97.82H251.13v.19c23.846 0 45.46-9.308 61.11-24.308 6.072-5.835 11.221-12.496 15.202-19.784H124.609c-3.343 0-6.083-2.823-6.083-6.26v-59.623c0-3.448 2.74-6.248 6.083-6.248h202.833c-3.98-7.287-9.13-13.972-15.201-19.783-15.65-15.012-37.265-24.32-61.111-24.32v.19H118.526V6.248c0-3.45 2.74-6.26 6.082-6.26z" />
                </svg>
              }
            />
          </div>
          <div style={{ flex: "1" , textAlign: "center" }}>
            <Statistic
              title="Total Services You Provide"
              value={businessStats.totalService}
            />
          </div>
        </>
      )}
    </>
  );
}

export default BusinessStatistic;
