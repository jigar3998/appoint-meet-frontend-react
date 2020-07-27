import React, { useState, useContext } from "react";
import {
  Link,
  useHistory,
} from "react-router-dom";
import { Form, Input, Button,  message } from "antd";
import LoginNavBar from "./NavBar/LoginNavBar";


import axios from "axios";
import { Url } from "../constants/ServerUrl";
import { GlobalContext } from "../context/GlobalState";

import "./Login.css";

function Login(props) {
  let history = useHistory();
  const contextData = useContext(GlobalContext);

  const [invalidLoginMessage, setInvalidLoginMessage] = useState(false);
  const [loading, setLoading] = useState(false);
  const onFinish = (values) => {
    setInvalidLoginMessage(false);
    setLoading(true);
    // console.log("Success:", values);
    axios
      .post(Url + "/users/login", {
        email: values.email,
        pass: values.password,
      })
      .then(function (response) {
        setLoading(false);
        // console.log(response.data);

        if (response.data.access === "customer") {
          contextData.setLoginData(response.data);
          history.push("/customer/dashboard");
        } else if (response.data.access === "business") {
          contextData.setLoginData(response.data);
          if (response.data.business_id === undefined) {
            history.push("/business/business-info");
          } else {
            history.push("/business/dashboard");
          }
        } else {
          message.error("Something went wrong. Please try again");
        }
      })
      .catch(function (error) {
        // console.log(error.response);
        if (error.response && error.response.status === 400) {
          setLoading(false);
          setInvalidLoginMessage(true);
        } else {
          message.error("Something went wrong. Please try again");
        }
        setLoading(false);
      });
  };

  return (
    <div style={{ position: "relative" }}>
      <LoginNavBar />
      <div className="login-outer">
        <div className="login-left">
          <div className="sign-up-outer">
            <h2>Don’t have an account yet?</h2>
            <Link to="/signup?type=business" className="sign-up-options">
              Sign Up as a Business
            </Link>
            <Link to="/signup?type=customer" className="sign-up-options">
              Sign Up as a Customer
            </Link>
          </div>
        </div>
        <div className="login-right">
          <div className="login-form">
            <Form layout="vertical" size="large" onFinish={onFinish}>
              <div className="login-input-label">Email</div>
              <Form.Item
                className="input-field"
                name="email"
                rules={[
                  {
                    type: "email",
                    message: "The input is not valid E-mail!",
                  },
                  {
                    required: true,
                    message: "Please enter your E-mail!",
                  },
                  {
                    max: 50,
                    message: "The input exceeds the length limit",
                  },
                ]}
              >
                <Input disabled={loading} />
              </Form.Item>
              <div className="login-input-label">Password</div>

              <Form.Item
                className="input-field"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please enter your password!",
                  },
                  {
                    max: 50,
                    message: "The input exceeds the length limit",
                  },
                ]}
              >
                <Input.Password disabled={loading} />
              </Form.Item>
              {invalidLoginMessage && (
                <div style={{ color: "red" }}>Invalid email or password</div>
              )}
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-submit-button"
                  loading={loading}
                >
                  Login
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Login;
