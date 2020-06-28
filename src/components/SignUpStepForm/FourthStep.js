import React, { useEffect } from "react";
import { Form, Input, Button, Col, Row, InputNumber, Select } from "antd";
import {
  CloseCircleOutlined,
  PlusOutlined,
  UserOutlined,
} from "@ant-design/icons";
const { Option } = Select;
function FourthStep(props) {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Received values of form:", values);
    // props.next();
  };
  const submitForm4 = () => {
    form.submit();
  };
  const checkTime = (rule, value) => {
    console.log(!value === undefined);
    if (!(value === undefined)) {
      if (value < 5) {
        return Promise.reject("Minimum 5 Minutes Required");
      }
      if (value > 480) {
        return Promise.reject("Maximum Minutes allowed is 480");
      }
      return Promise.resolve();
    } else {
      return Promise.reject("Required");
    }
  };
  const checkPrice = (rule, value) => {
    if (!(value === undefined)) {
      return Promise.resolve();
    } else {
      return Promise.reject("Required");
    }
  };
  const checkDuplicateEntry = (rule, value) => {
    console.log("checkDuplicateEntry", value);
    let formAllData = form.getFieldValue().services;

    let sameServiceName = false;
    let sameServiceNameCount = 0;
    console.log("checkDuplicateEntry", formAllData);
    for (let i of formAllData) {
      console.log(i);
      if (i) {
        let serviceName = i.serviceName;
        if (serviceName === value) {
          sameServiceNameCount++;
        }
      
      }
    }
    if (sameServiceNameCount > 1) {
      sameServiceName = true;
    }
    if (!sameServiceName) {
      return Promise.resolve();
    } else {
      return Promise.reject("Services with same name are not allowed");
    }
  };
  useEffect(() => {
    document.getElementById("add-staff-button").click();
  }, []);

  const children = [];
  const all = [];

  for (let i = 10; i < 36; i++) {
    let key = i.toString(36) + i + "key";
    children.push(
      <Option key={key}>
        <UserOutlined /> {" " + i.toString(36) + i}
      </Option>
    );
    all.push(key);
  }
  let x = [];
  x[1] = {
    "staff-list": ["a10key"],
  };
  // const handleChange = (value) => {
  //   console.log(value);
  //   form.setFieldsValue({
  //     services: x,
  //   });
  //   console.log(value);
  //   console.log(form.getFieldValue());
  // };
  const handleOnSelect = (value, fieldKey) => {
    if (value == "select-all") {
      let formAllData = form.getFieldValue().services;
      console.log(formAllData[fieldKey], all.length);
      if (formAllData[fieldKey]["staff-list"].length == all.length + 1) {
        formAllData[fieldKey]["staff-list"] = [];
      } else {
        formAllData[fieldKey]["staff-list"] = all;
      }
      form.setFieldsValue({
        services: formAllData,
      });
    }
  };

  return (
    <div style={{ overflow: "auto", height: "320px", paddingRight: "10px" }}>
      <Form form={form} name="dynamic_form_item" onFinish={onFinish}>
        <Form.List name="services">
          {(fields, { add, remove }) => {
            return (
              <div>
                {fields.map((field, index) => (
                  <Row key={field.key} className="add-service-field-container">
                    <Col className="add-service-field" style={{ width: "55%" }}>
                      <Form.Item
                        name={[field.name, "serviceName"]}
                        fieldKey={[field.fieldKey, "serviceName"]}
                        validateTrigger={["onChange", "onBlur"]}
                        rules={[
                          {
                            required: true,
                            whitespace: true,
                            message: "Please input Service Name",
                          },
                          {
                            validator: checkDuplicateEntry,
                          },
                        ]}
                      >
                        <Input placeholder="Service Name" />
                      </Form.Item>
                    </Col>
                    <Col className="add-service-field">
                      <Form.Item
                        name={[field.name, "duration"]}
                        fieldKey={[field.fieldKey, "duration"]}
                        validateTrigger={["onChange", "onBlur"]}
                        rules={[
                          {
                            validator: checkTime,
                          },
                        ]}
                      >
                        <InputNumber placeholder="Time (min)" />
                      </Form.Item>
                    </Col>
                    <Col className="add-service-field">
                      <Form.Item
                        name={[field.name, "price"]}
                        fieldKey={[field.fieldKey, "price"]}
                        validateTrigger={["onChange", "onBlur"]}
                        rules={[
                          {
                            validator: checkPrice,
                          },
                        ]}
                      >
                        <InputNumber placeholder="Price" min={0} />
                      </Form.Item>
                    </Col>
                    <Form.Item
                      style={{ width: "100%" }}
                      name={[field.name, "staff-list"]}
                      fieldKey={[field.fieldKey, "price"]}
                      validateTrigger={["onChange", "onBlur"]}
                      rules={[
                        {
                          required: true,
                          message: "Select At Least lest One Staff Member",
                        },
                      ]}
                    >
                      <Select
                        loading
                        maxTagTextLength={30}
                        maxTagCount={10}
                        mode="multiple"
                        style={{ width: "100%" }}
                        placeholder="Please select Staff"
                        // onChange={handleChange}
                        onSelect={(key) => handleOnSelect(key, field.key)}
                      >
                        <Option key="select-all">Select All</Option>
                        {children}
                      </Select>
                    </Form.Item>
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
                    <PlusOutlined /> Add Service
                  </Button>
                </Form.Item>
              </div>
            );
          }}
        </Form.List>
      </Form>
      <div className="signup-navigation-button">
        <Button type="primary" onClick={submitForm4}>
          Done
        </Button>
      </div>
    </div>
  );
}

export default FourthStep;
