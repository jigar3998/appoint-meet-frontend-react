import React, { useEffect, useState } from "react";
import { Checkbox, TimePicker, Form, Input, Button } from "antd";
import moment from "moment";
const { RangePicker } = TimePicker;
function SecondStep(props) {
  const [form] = Form.useForm();
  const [selectedDays, setSelectedDays] = useState({
    Monday: true,
    Tuesday: true,
    Wednesday: true,
    Thursday: true,
    Friday: true,
    Saturday: false,
    Sunday: false,
  });

  const daysList = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const onFinish = (values) => {
    for (let i of daysList) {
      // console.log(values[`${i}Time`]);
      values[`${i}Time`][0] =
        values[`${i}Time`][0].hours() + ":" + values[`${i}Time`][0].minutes();
      values[`${i}Time`][1] =
        values[`${i}Time`][1].hours() + ":" + values[`${i}Time`][1].minutes();
    }
    console.log("Success:", values);
  };
  const submitForm2 = () => {
    props.next();
    form.submit();
  };
  const onSelectChange = (value) => {
    setSelectedDays({
      ...selectedDays,
      [value.target.id]: value.target.checked,
    });
  };
  return (
    <div>
      <Form
        form={form}
        onFinish={onFinish}
        layout="inline"
        initialValues={{
          ...selectedDays,
          MondayTime: [
            moment("9:00 am", "h:mm a"),
            moment("5:00 pm", "h:mm a"),
          ],
          TuesdayTime: [
            moment("9:00 am", "h:mm a"),
            moment("5:00 pm", "h:mm a"),
          ],
          WednesdayTime: [
            moment("9:00 am", "h:mm a"),
            moment("5:00 pm", "h:mm a"),
          ],
          ThursdayTime: [
            moment("9:00 am", "h:mm a"),
            moment("5:00 pm", "h:mm a"),
          ],
          FridayTime: [
            moment("9:00 am", "h:mm a"),
            moment("5:00 pm", "h:mm a"),
          ],
          SaturdayTime: [
            moment("9:00 am", "h:mm a"),
            moment("5:00 pm", "h:mm a"),
          ],
          SundayTime: [
            moment("9:00 am", "h:mm a"),
            moment("5:00 pm", "h:mm a"),
          ],
        }}
      >
        {daysList.map((day) => {
          return (
            <div className="select-time-day-container">
              <Form.Item
                name={`${day}`}
                valuePropName="checked"
                onChange={onSelectChange}
              >
                <Checkbox>{day}</Checkbox>
              </Form.Item>
              <Form.Item name={`${day}Time`}>
                <RangePicker
                  allowClear={false}
                  format={["h:mm a", "h:mm a"]}
                  disabled={!selectedDays[day]}
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
