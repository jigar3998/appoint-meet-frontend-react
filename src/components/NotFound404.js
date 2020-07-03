import React from "react";
import { Result, Button } from "antd";
import {  Link } from "react-router-dom";

import Svg404 from "../asserts/404-1.svg";

export default function NotFound404() {
  return (
    <Result
      // status="404"
      title="404"
      icon={
        <img
          alt="link"
          src={Svg404}
          style={{
            width:"80%",
            maxWidth:"400px"
          }}
        />
      }
      subTitle="Sorry, the page you visited does not exist."
      extra={<Link to="/"><Button type="primary">Back Home</Button></Link>}
    
    />
  );
}
