import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from "react-router-dom";

import BookingStepMain from "./BookingStep/BookingStepMain";

import "./BookingHome.css";

function BookingHome() {
  let { id } = useParams();
  return (
    <>
      <h3>ID: {id}</h3>
      <div className="business-home-container">
        <div className="business-left-container">
          <h1>Service Name</h1>
          <p>Address</p>
          <p>Email</p>
          <p>Open Hours</p>
        </div>
        <div className="business-right-container">
          <BookingStepMain />
        </div>
      </div>
    </>
  );
}

export default BookingHome;
