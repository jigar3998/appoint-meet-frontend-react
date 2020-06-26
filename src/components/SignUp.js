import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link,useHistory } from "react-router-dom";
import { Form, Input, Button, Checkbox, message } from "antd";
import LoginNavBar from "./NavBar/LoginNavBar";

import axios from "axios";

import { Url } from "../Constants/ServerUrl";

import "./SignUp.css";
function SignUp() {
  let history = useHistory();

  const [loading, setLoading] = useState(false);
  const [emailAlreadyExists, setEmailAlreadyExists] = useState(false);

  const onFinish = (values) => {
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let type = params.get("type");
    if (!(type === "provider" || type === "user")) {
      message.error("Something went wrong. Please try again");
      return;
    }

    setEmailAlreadyExists(false);
    setLoading(true);
    values.access=type
    console.log("Success:", values);
    axios
      .post(Url + "/users/signup", values)
      .then(function (response) {
        console.log(response);
        history.push("/dashboard");

      })
      .catch(function (error) {
        console.log(error.response);
        if (error.response && error.response.status === 400) {
          setEmailAlreadyExists(true);
          setLoading(false);
        } else {
          message.error("Something went wrong. Please try again");
        }
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <LoginNavBar />
      <div className="signup-outer">
        <div className="login-right">
          <div className="login-form signup-form">
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
                name="fname"
                rules={[
                  {
                    required: true,
                    message: "Please input your first name!",
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
                name="lname"
                rules={[
                  {
                    required: true,
                    message: "Please input your last name!",
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
                name="pass"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                  {
                    min: 5,
                    message: "password not long enough",
                  },
                  {
                    max: 50,
                    message: "The input exceeds the length limit",
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>
              {emailAlreadyExists && (
                <div style={{ color: "red", textAlign: "center" }}>
                  This email already exists. Please enter another email.
                </div>
              )}

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-submit-button"
                  loading={loading}
                >
                  Sign Up
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
