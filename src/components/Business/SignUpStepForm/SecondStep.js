import React, {  useState, useContext } from "react";
import { Checkbox, TimePicker, Form,  Button, message } from "antd";
import moment from "moment";

import axios from "axios";
import { Url } from "../../../constants/ServerUrl";
import { GlobalContext } from "../../../context/GlobalState";

const { RangePicker } = TimePicker;
function SecondStep(props) {
  const contextData = useContext(GlobalContext);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
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
    let timeDetails = {};
    for (let i of daysList) {
      // console.log(values[`${i}Time`]);
      timeDetails[i] = values[i];
      timeDetails[`${i}Time`] = [
        values[`${i}Time`][0].hours() + ":" + values[`${i}Time`][0].minutes(),
        values[`${i}Time`][1].hours() + ":" + values[`${i}Time`][1].minutes(),
      ];
    }

    setLoading(true);
    // console.log("Success:", values);
    // console.log("Success:", timeDetails);
    // console.log("Success:", props.businessInfo);

    axios
      .post(Url + "/business/signup/" + contextData.loginData.user_id, {
        business_name: props.businessInfo.business_name,
        industry_name: props.businessInfo.business_category,
        business_desc: props.businessInfo.business_description,
        business_add: props.businessInfo.business_address,
        time: timeDetails,
      })
      .then(function (response) {
        // console.log(response.data);
        setLoading(false);
        setData(response)
      })
      .catch(function (error) {
        // console.log(error.response);
        message.error("Something went wrong. Please try again");
        setLoading(false);
      });
  };
  const setData = async (response) => {
    props.next();
    await contextData.setRedirectToBusinessInfo(false);
    
    await contextData.setLoginData({
      ...contextData.loginData,
      business_id: response.data.business_id,
    });

  };
  const submitForm2 = () => {
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
        <Button type="primary" onClick={submitForm2} loading={loading}>
          Next
        </Button>
      </div>
    </div>
  );
}

export default SecondStep;
