import React, { useState, useContext, useEffect } from "react";
import { Statistic, message, Skeleton, Empty } from "antd";

import { Url } from "../../constants/ServerUrl";
import axios from "axios";
import { GlobalContext } from "../../context/GlobalState";

function CustomerStatistic() {
  const contextData = useContext(GlobalContext);
  // change
  const [loading, setLoading] = useState(false);
  const [businessStats, setBusinessStats] = useState("NoData");
  let business_id = contextData.loginData.business_id;

  useEffect(() => {
    // change
    // loadbusinessStats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let loadbusinessStats = () => {
    setLoading(true);
    axios
      .get(Url + "/business/stats/" + business_id)
      .then(function (response) {
        console.log(response.data);
        setLoading(false);
        setBusinessStats(response.data);
      })
      .catch(function (error) {
        console.log(error.response);
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
      ) : // change
      // ) : businessStats === "NoData" ? (
      false ? (
        <Empty style={{ width: "100%" }} />
      ) : (
        <>
          <div style={{ flex: "1", textAlign: "center" }}>
            <Statistic title="Total Booked Appointments" value={500} />
          </div>
          <div style={{ flex: "1", textAlign: "center" }}>
            <Statistic title="Total Upcoming Appointments" value={15} />
          </div>
        </>
      )}
    </>
  );
}

export default CustomerStatistic;
