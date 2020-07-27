import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { message, Skeleton } from "antd";

import "./BookingHome.css";
import { Url } from "../../constants/ServerUrl";
import axios from "axios";


function BusinessInfo() {
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
          // console.log(response.data);
          setLoading(false);
          setBusinessInfo(response.data);
        })
        .catch(function (error) {
          // console.log(error.response);
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
      let week = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return (
        <>
              {loading ? (
            <Skeleton active loading={loading} />
          ) : (
            businessInfo && (
              <>
                <h1>{businessInfo.business_name}</h1>
                <hr />
                <div style={{ marginBottom: "10px" }}>
                <b> Category:</b>
                  <br />
                  {businessInfo.industry}
                </div>
                <div style={{ marginBottom: "10px" }}>
                <b>Description:</b>
                  <br />
                  {businessInfo.business_description}
                </div>
                <div style={{ marginBottom: "10px" }}>
                <b>Address:</b>
                  <br />
                  {businessInfo.business_address}
                </div>
                <div ><b>Open Hours:</b></div>
                <table>
                  <tr>
                    <th style={{width:"50px"}}></th>
                    <th></th>
                  </tr>
                  {businessInfo.time.map((time) => {
                    return (
                        <tr>
                          <td> {week[time.day_of_week]}</td>
                          <td>
                            {time.open_time === null
                              ? "closed"
                              : tConvert(
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
                          </td>
                        </tr>
                    );
                  })}
                </table>
              </>
            )
          )}
        </>
    )
}

export default BusinessInfo
