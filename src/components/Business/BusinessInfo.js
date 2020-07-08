import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";

import { message, Skeleton } from "antd";

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
    <div>
      {loading ? (
        <Skeleton active loading={loading} />
      ) : (
        businessInfo && (
          <>
            <h2>Business Info</h2>
            <hr/>
            <h2>{businessInfo.business_name}</h2>
            <p>{businessInfo.business_description}</p>
            <p>{businessInfo.business_address}</p>
            <p>Open Hours</p>
          </>
        )
      )}
    </div>
  );
}

export default BusinessInfo;
