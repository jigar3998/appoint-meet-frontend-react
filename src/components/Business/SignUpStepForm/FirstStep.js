import React from "react";
import { Form, Input, Button } from "antd";
function FirstStep(props) {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log(values);
    props.BusinessInfoNext(values);
  };
  const submitForm1 = () => {
    form.submit();
  };
  return (
    <div className="business-info">
      <Form onFinish={onFinish} layout="vertical" hideRequiredMark form={form}>
        <Form.Item
          name="business_name"
          label="Business Name"
          rules={[
            {
              required: true,
              message: "Business Name is required",
            },
            {
              max: 100,
              message: "The input exceeds the length limit",
            },

            {
              min: 3,
              message: "name is not long enough",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="business_category"
          label="Business category"
          rules={[
            {
              required: true,
              message: "Business category is required",
            },
            {
              min: 3,
              message: "Business category is not long enough",
            },
            {
              max: 100,
              message: "The input exceeds the length limit",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="business_description"
          label="Business Description"
          rules={[
            {
              required: true,
              message: "Business description is required",
            },
            {
              min: 3,
              message: "Description is not long enough",
            },
            {
              max: 200,
              message: "The input exceeds the length limit",
            },
          ]}
        >
          <Input.TextArea autoSize />
        </Form.Item>
        <Form.Item
          name="business_address"
          label="Business address"
          rules={[
            {
              required: true,
              message: "Business address is required",
            },
            {
              min: 3,
              message: "Address is not long enough",
            },
            {
              max: 200,
              message: "The input exceeds the length limit",
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
