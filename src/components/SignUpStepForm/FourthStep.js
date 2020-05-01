import React, { useEffect } from "react";
import { Form, Input, Button, Col, Row, InputNumber } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

function FourthStep(props) {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Received values of form:", values);
    props.next();
  };
  const submitForm4 = () => {
    form.submit();
  };
  const checkTime = (rule, value) => {
    if(value){
        if (value<5) {
            return Promise.reject("Minimum 5 Minutes Required");
        }
        if (value>480) {
            return Promise.reject("Maximum Minutes allowed is 480");
        }
        return Promise.resolve();
    }
    else{
        return Promise.reject("Required");

    }
    
  };
  const checkPrice = (rule, value) => {
    if(value){
        return Promise.resolve();
    }
    else{
        return Promise.reject("Required");

    }
    
  };
  useEffect(() => {
    document.getElementById("add-staff-button").click();
  }, []);
  return (
    <div style={{ overflow: "auto", height: "300px" }}>
      <Form form={form} name="dynamic_form_item" onFinish={onFinish}>
        <Form.List name="services">
          {(fields, { add, remove }) => {
            return (
              <div>
                {fields.map((field, index) => (
                  <Row key={field.key} className="add-staff-field-container">
                    <Col className="add-service-field" style={{ width: "55%" }}>
                      <Form.Item
                        name={[field.name, "serviceName"]}
                        fieldKey={[field.fieldKey, "serviceName"]}
                        // validateTrigger={["onChange", "onBlur"]}

                        rules={[
                          {
                            required: true,
                            whitespace: true,
                            message: "Please input Service Name",
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
                        <InputNumber
                          placeholder="Time (min)"
                        />
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

                    {fields.length > 1 ? (
                      <MinusCircleOutlined
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
          Next
        </Button>
      </div>
    </div>
  );
}

export default FourthStep;
