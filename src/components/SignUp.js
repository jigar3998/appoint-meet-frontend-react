import React, { useState,useContext } from "react";
import {  useHistory } from "react-router-dom";
import { Form, Input, Button,  message } from "antd";
import LoginNavBar from "./NavBar/LoginNavBar";

import "./SignUp.css";

import axios from "axios";
import { Url } from "../constants/ServerUrl";
import {GlobalContext} from "../context/GlobalState";

function SignUp() {
  let history = useHistory();
  const contextData = useContext(GlobalContext)


  const [loading, setLoading] = useState(false);
  const [emailAlreadyExists, setEmailAlreadyExists] = useState(false);

  const onFinish = (values) => {
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let type = params.get("type");
    if (!(type === "business" || type === "customer")) {
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
        console.log(response.data);
        contextData.setLoginData(response.data)
        history.push("/business/business-info");
      })
      .catch(function (error) {
        console.log(error.response);
        if (error.response && error.response.status === 400 && error.response.data.error_message==="email already exists") {
          setEmailAlreadyExists(true);
        } else {
          message.error("Something went wrong. Please try again");
        }
        setLoading(false);
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
                    message: "Please enter your first name!",
                  },
                  {
                    max: 50,
                    message: "The input exceeds the length limit",
                  },
                  {
                    pattern: new RegExp(/^[a-zA-Z]+$/),
                    message: "The enter valid name",
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
                    message: "Please enter your last name!",
                  },
                  {
                    max: 50,
                    message: "The input exceeds the length limit",
                  },
                  {
                    pattern: new RegExp(/^[a-zA-Z]+$/),
                    message: "The enter valid name",
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
                    message: "Please enter your E-mail!",
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
                    message: "Please enter your password!",
                  },
                  {
                    min: 8,
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
