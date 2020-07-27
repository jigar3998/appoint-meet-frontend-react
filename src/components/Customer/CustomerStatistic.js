import React, { useState, useContext, useEffect } from "react";
import { Statistic, message, Skeleton, Empty } from "antd";

import { Url } from "../../constants/ServerUrl";
import axios from "axios";
import { GlobalContext } from "../../context/GlobalState";

function CustomerStatistic() {
  const contextData = useContext(GlobalContext);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState("NoData");
  let user_id = contextData.loginData.user_id;

  useEffect(() => {
    loadstats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let loadstats = () => {
    setLoading(true);
    axios
      .get(Url + "/customer/stats/" + user_id)
      .then(function (response) {
        // console.log(response.data);
        setLoading(false);
        setStats(response.data);
      })
      .catch(function (error) {
        // console.log(error.response);
        message.error("Something went wrong. Please try again");
        setLoading(false);
        setStats("NoData");
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
      ) : 
      stats === "NoData" ? (
        <Empty style={{ width: "100%" }} />
      ) : (
        <>
          <div style={{ flex: "1", textAlign: "center" }}>
            <Statistic title="Total Booked Appointments" value={stats.totalAppointments} />
          </div>
          <div style={{ flex: "1", textAlign: "center" }}>
            <Statistic title="Total Upcoming Appointments" value={stats.upcomingAppointments} />
          </div>
        </>
      )}
    </>
  );
}

export default CustomerStatistic;
