import React, { useEffect,useState,useContext } from "react";
import { Form, Input, Button, Col, Row, InputNumber, Select,message } from "antd";
import {
  CloseCircleOutlined,
  PlusOutlined,
  UserOutlined,
} from "@ant-design/icons";

import axios from "axios";
import { Url } from "../../../constants/ServerUrl";
import { GlobalContext } from "../../../context/GlobalState";


const { Option } = Select;
function FourthStep(props) {
  const contextData = useContext(GlobalContext);

  const [form] = Form.useForm();
  const [isStaffLoaded, setIsStaffLoaded] = useState(false);
  const [staffElement, setStaffElement] = useState([]);
  const [staffKey, setStaffKey] = useState([]);
  const [loading, setLoading] = useState(false);



  const onFinish = (values) => {
    // console.log("Received values of form:", values);
    // props.next();
    setLoading(true);
    let requestBody=values.services
    axios
      .post(Url + "/business/service/" + contextData.loginData.business_id, requestBody)
      .then(function (response) {
        // console.log(response.data);
        setLoading(false);
        props.onAddServiceComplete()


      })
      .catch(function (error) {
        // console.log(error.response);
        message.error("Something went wrong. Please try again");
        setLoading(false);
      });
  };
  const submitForm4 = () => {
    form.submit();
  };
  const checkTime = (rule, value) => {
    // console.log(!value === undefined);
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
    // console.log("checkDuplicateEntry", value);
    let formAllData = form.getFieldValue().services;

    let sameServiceName = false;
    let sameServiceNameCount = 0;
    // console.log("checkDuplicateEntry", formAllData);
    for (let i of formAllData) {
      // console.log(i);
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
    loadStaff()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const staffElement = [];
  // const staffKey = [];

  let loadStaff=()=>{
    setIsStaffLoaded(true);

    axios
      .get(Url + "/staff/" + contextData.loginData.business_id)
      // .get(Url + "/staff/" + "2")
      .then(function (response) {
        // console.log(response.data);
        setIsStaffLoaded(false);
        let staffElementT=[]
        let staffKeyT=[]
        for (let i of response.data) {
          staffElementT.push(
            <Option key={i.staff_id}>
              <UserOutlined /> {i.staff_name}
            </Option>
          );
          staffKeyT.push(i.staff_id);
        }
        setStaffElement(staffElementT)
        setStaffKey(staffKeyT)
      })
      .catch(function (error) {
        // console.log(error.response);
        message.error("Something went wrong. Please try again");
      });
  }
  const handleOnSelect = (value, fieldKey) => {
    // console.log("A" ,value,fieldKey,form.getFieldValue().services )
      // eslint-disable-next-line eqeqeq
    if (value == "select-all") {
      let formAllData = form.getFieldValue().services;
      // console.log(formAllData[fieldKey], staffKey.length);
      // eslint-disable-next-line eqeqeq
      if (formAllData[fieldKey]["staff_list"].length == staffKey.length + 1) {
        formAllData[fieldKey]["staff_list"] = [];
      } else {
        formAllData[fieldKey]["staff_list"] = staffKey.map(key=>key+"");
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
                        name={[field.name, "service_name"]}
                        fieldKey={[field.fieldKey, "service_name"]}
                        validateTrigger={["onChange", "onBlur"]}
                        rules={[
                          {
                            required: true,
                            whitespace: true,
                            message: "Please enter Service Name",
                          },
                          {
                            max: 100,
                            message: "The input exceeds the length limit",
                          },
                        ]}
                      >
                        <Input placeholder="Service Name" />
                      </Form.Item>
                    </Col>
                    <Col className="add-service-field">
                      <Form.Item
                        name={[field.name, "time"]}
                        fieldKey={[field.fieldKey, "time"]}
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

                        name={[field.name, "service_desc"]}
                        fieldKey={[field.fieldKey, "service_desc"]}
                        validateTrigger={["onChange", "onBlur"]}
                        rules={[
                          {
                            required: true,
                            whitespace: true,
                            message: "Please enter Service description",
                          },
                          {
                            max: 100,
                            message: "The input exceeds the length limit",
                          },
                          
                        ]}
                      >
                        <Input placeholder="Service Description" />
                      </Form.Item>
                    <Form.Item
                      style={{ width: "100%" }}
                      name={[field.name, "staff_list"]}
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
                        loading={isStaffLoaded}
                        disabled={isStaffLoaded}
                        maxTagTextLength={30}
                        maxTagCount={10}
                        mode="multiple"
                        style={{ width: "100%" }}
                        placeholder="Please select Staff"
                        // onChange={handleChange}
                        onSelect={(key) => handleOnSelect(key, field.key)}
                      >
                        <Option key="select-all">Select All</Option>
                        {staffElement}
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
        <Button type="primary" onClick={submitForm4}  loading={loading}>
          {props.ButtonName}
        </Button>
      </div>
    </div>
  );
}

export default FourthStep;
