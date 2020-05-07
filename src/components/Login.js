import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Form, Input, Button, Checkbox } from "antd";
import LoginNavBar from "./NavBar/LoginNavBar";

import "./Login.css";
function Login(props) {
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div style={{ position: "relative" }}>
      <LoginNavBar />
      <div className="login-outer">
        <div className="login-left">
          <div className="sign-up-outer">
            {/* <h1>Sign Up</h1> */}
            <h2>Don’t have an account yet?</h2>
            <Link to="/signup-provider" className="sign-up-options">
              Sign Up as a Service Provider
            </Link>
            <Link to="/signup" className="sign-up-options">
              Sign Up as a User
            </Link>
            <p>*You can change your account type any time in the settings</p>
          </div>
        </div>
        <div className="login-right">
          <div className="login-form">
            <Form
              layout="vertical"
              size="large"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
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
                <Input />
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
                    max: 50,
                    message: "The input exceeds the length limit",
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-submit-button"
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
