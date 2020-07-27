import React, { useEffect,useContext,useState } from "react";
import { Form, Input, Button, Col, Row,message } from "antd";
import { CloseCircleOutlined, PlusOutlined } from "@ant-design/icons";

import { Url } from "../../../constants/ServerUrl";
import { GlobalContext } from "../../../context/GlobalState";

import axios from "axios";


function ThirdStep(props) {
  const contextData = useContext(GlobalContext);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);



  const onFinish = (values) => {
    // console.log("Received values of form:", values);
    let requestBody=values.staff
    // console.log(requestBody)
    
    setLoading(true);

    axios
      .post(Url + "/business/staff/" + contextData.loginData.business_id, requestBody)
      // .post(Url + "/business/staff/" + "29", requestBody)
      .then(function (response) {
        // console.log(response.data);
        setLoading(false);
        props.onAddStaffComplete();
      })
      .catch(function (error) {
        // console.log(error.response);
        message.error("Something went wrong. Please try again");
        setLoading(false);
      });
  };
  
  const submitForm3 = () => {
    form.submit();
  };
  useEffect(() => {
    document.getElementById("add-staff-button").click();
  }, []);

  return (
    <div style={{ overflow: "auto", height: "320px" }}>
      <Form form={form} name="dynamic_form_item" onFinish={onFinish}>
        <Form.List name="staff">
          {(fields, { add, remove }) => {
            return (
              <div>
                {fields.map((field, index) => (
                  <Row key={field.key} className="add-staff-field-container">
                    <Col className="add-staff-field">
                      <Form.Item
                        name={[field.name, "staff_name"]}
                        fieldKey={[field.fieldKey, "staff_name"]}
                        validateTrigger={["onChange", "onBlur"]}
                        rules={[
                          {
                            required: true,
                            message: "Please enter staff name!",
                          },
                          {
                            max: 50,
                            message: "The input exceeds the length limit",
                          },
                          {
                            pattern: new RegExp(/^[a-zA-Z ]+$/),
                            message: "The enter valid name",
                          },
                        ]}
                      >
                        <Input placeholder="name" />
                      </Form.Item>
                    </Col>
                    <Col className="add-staff-field">
                      <Form.Item
                        name={[field.name, "email"]}
                        fieldKey={[field.fieldKey, "email"]}
                        validateTrigger={["onChange", "onBlur"]}
                        rules={[
                          {
                            type: "email",
                            message: "The input is not valid E-mail!",
                          },
                          {
                            required: true,
                            message: "Please enter staff E-mail!",
                          },   {
                            max: 50,
                            message: "The input exceeds the length limit",
                          },
                        ]}
                      >
                        <Input placeholder="email" />
                      </Form.Item>
                    </Col>
                    {fields.length > 1 ? (
                      <CloseCircleOutlined
                        className="dynamic-delete-button"
                        onClick={() => {
                          remove(field.name);
                        }}
                      />
                    ) : null}
                  </Row>
                ))}

                <Form.Item
                  //  style={{paddingRight:"20px"}}
                  style={{ textAlign: "center" }}
                >
                  <Button
                    id="add-staff-button"
                    type="dashed"
                    onClick={() => {
                      add();
                    }}
                    style={{ width: "80%" }}
                  >
                    <PlusOutlined /> Add Staff
                  </Button>
                </Form.Item>
              </div>
            );
          }}
        </Form.List>
      </Form>
      <div className="signup-navigation-button">
        <Button type="primary" onClick={submitForm3} loading={loading}> 
          {props.ButtonName}
        </Button>
      </div>
    </div>
  );
}

export default ThirdStep;
