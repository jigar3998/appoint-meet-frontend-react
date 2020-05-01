import React from "react";
import { Checkbox, TimePicker, Form, Input, Button } from "antd";
import moment from "moment";
const { RangePicker } = TimePicker;
function SecondStep(props) {
  const [form] = Form.useForm();

  const list = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const onFinish = (values) => {
    console.log("Success:", values);
    props.next()

  };
  const submitForm2 = () => {
    form.submit();
  };
  return (
    <div>
      <Form
      form={form}
        onFinish={onFinish}
        layout="inline"
        initialValues={{
          Monday: true,
          Tuesday: true,
          Wednesday: true,
          Thursday: true,
          Friday: true,
          Saturday: false,
          Sunday: false,
          "Monday-time": [
            moment("9:00 am", "h:mm a"),
            moment("5:00 pm", "h:mm a"),
          ],
          "Tuesday-time": [
            moment("9:00 am", "h:mm a"),
            moment("5:00 pm", "h:mm a"),
          ],
          "Wednesday-time": [
            moment("9:00 am", "h:mm a"),
            moment("5:00 pm", "h:mm a"),
          ],
          "Thursday-time": [
            moment("9:00 am", "h:mm a"),
            moment("5:00 pm", "h:mm a"),
          ],
          "Friday-time": [
            moment("9:00 am", "h:mm a"),
            moment("5:00 pm", "h:mm a"),
          ],
          "Saturday-time": [
            moment("9:00 am", "h:mm a"),
            moment("5:00 pm", "h:mm a"),
          ],
          "Sunday-time": [
            moment("9:00 am", "h:mm a"),
            moment("5:00 pm", "h:mm a"),
          ],
        }}
      >
        {list.map((day) => {
          return (
            <div className="select-time-day-container">
              <Form.Item name={`${day}`} valuePropName="checked">
                <Checkbox
                >
                  {day}
                </Checkbox>
              </Form.Item>
              <Form.Item name={`${day}-time`}>
                <RangePicker
                  allowClear={false}
                  format={["h:mm a", "h:mm a"]}
                />
              </Form.Item>
            </div>
          );
        })}
      </Form>
      <div className="signup-navigation-button">
        <Button type="primary" onClick={submitForm2}>
          Next
        </Button>
      </div>
    </div>
  );
}

export default SecondStep;
