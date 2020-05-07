import React, { useEffect } from "react";
import { Form, Input, Button, Col, Row } from "antd";
import { CloseCircleOutlined, PlusOutlined } from "@ant-design/icons";

function ThirdStep(props) {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Received values of form:", values);
  };
  const submitForm3 = () => {
    props.next();
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
                        name={[field.name, "lastName"]}
                        fieldKey={[field.fieldKey, "lastName"]}
                        validateTrigger={["onChange", "onBlur"]}
                        rules={[
                          {
                            required: true,
                            whitespace: true,
                            message: "Please input name",
                          },
                        ]}
                      >
                        <Input placeholder="name" />
                      </Form.Item>
                    </Col>
                    <Col className="add-staff-field">
                      <Form.Item
                        name={[field.name, "firstName"]}
                        fieldKey={[field.fieldKey, "firstName"]}
                        validateTrigger={["onChange", "onBlur"]}
                        rules={[
                          {
                            required: true,
                            whitespace: true,
                            message: "Please input email",
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
        <Button type="primary" onClick={submitForm3}>
          Next
        </Button>
      </div>
    </div>
  );
}

export default ThirdStep;
