import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Form, Input, Button, Checkbox } from "antd";
import LoginNavBar from "./NavBar/LoginNavBar";

import "./SignUp.css";
function SignUp() {
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <LoginNavBar />
      <div className="signup-outer">
        <div className="login-right">
          <div className="login-form">
            <h1>Sign Up</h1>
            <br />
            <Form
              name="basic"
              layout="vertical"
              size="large"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <div className="login-input-label">First Name</div>
              <Form.Item
                className="input-field"
                name="first-name"
                rules={[
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
              <div className="login-input-label">Last Name</div>
              <Form.Item
                className="input-field"
                name="last-name"
                rules={[
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
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUp;
