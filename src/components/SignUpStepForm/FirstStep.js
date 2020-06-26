import React, { useEffect } from "react";
import { Form, Input, Button, Radio } from "antd";
function FirstStep(props) {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log(values);
  };
  const submitForm1 = () => {
    props.next();
    form.submit();
  };
  return (
    <div className="business-info">
      <Form onFinish={onFinish} layout="vertical" hideRequiredMark form={form}>
        <Form.Item
          name="business-name"
          label="Business Name"
          rules={[
            {
              required: true,
              message: "Business Name is required",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="business-category"
          label="Business category"
          rules={[
            {
              required: true,
              message: "Business category is required",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="business-description"
          label="Business Description"
          rules={[
            {
              required: true,
              message: "Business description is required",
            },
          ]}
        >
          <Input.TextArea autoSize />
        </Form.Item>
        <Form.Item
          name="business-address"
          label="Business address"
          rules={[
            {
              required: true,
              message: "Business address is required",
            },
          ]}
        >
          <Input.TextArea autoSize />
        </Form.Item>
        {/* <Form.Item>
          <Button type="primary" onClick={submitForm1}>
            Submit
          </Button>
        </Form.Item> */}
      </Form>
      <div className="signup-navigation-button">
        <Button type="primary" onClick={submitForm1}>
          Next
        </Button>
      </div>
    </div>
  );
}

export default FirstStep;
