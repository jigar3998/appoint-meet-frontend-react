import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link,useHistory } from "react-router-dom";
import { Form, Input, Button, Checkbox,message } from "antd";
import LoginNavBar from "./NavBar/LoginNavBar";

import "./Login.css";

import axios from "axios";

import { Url } from "../Constants/ServerUrl";

function Login(props) {
  let history = useHistory();
  
  const [invalidLoginMessage, setInvalidLoginMessage] = useState(false);
  const [loading, setLoading] = useState(false);
  const onFinish = (values) => {
    setInvalidLoginMessage(false);
    setLoading(true);
    console.log("Success:", values);
    axios
      .post(Url + "/users/login", {
        id: "2",
        pass: "user1",
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error.response.status);
        if (error.response && error.response.status === 400) {
          setInvalidLoginMessage(true);
          setLoading(false);
        }
        else{
          message.error('Something went wrong. Please try again');
        }
      });
  };

  return (
    <div style={{ position: "relative" }}>
      <LoginNavBar />
      <div className="login-outer">
        <div className="login-left">
          <div className="sign-up-outer">
            {/* <h1>Sign Up</h1> */}
            <h2>Don’t have an account yet?</h2>
            <Link to="/signup?type=provider" className="sign-up-options">
              Sign Up as a Service Provider
            </Link>
            <Link to="/signup?type=user" className="sign-up-options">
              Sign Up as a User
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
                    message: "Please input your E-mail!",
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
                    message: "Please input your password!",
                  },
                  {
                    min: 8,
                    message: "Password must have at least 8 characters",
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
