import React from "react";
import { Button } from "antd";
import { Link } from "react-router-dom";

import "./Home.css";

import Navbar from "./NavBar/NavBarHome";

import homeIllustration1 from "../asserts/home-illustration-5.svg";

function Home() {
  return (
    <>
      <Navbar />

      <div className="home-outer-first">
        <div className="home-left">
          <h1>
            {/* Appointment Scheduling Platform for Maximizing Utilization of your
          Precious Time */}
            Utilization of your Precious Time
          </h1>
          <p>
            Appoint-Meet is a simple minimal application to manage all of your
            appointment scheduling process for business and individuals
          </p>
          <Link to="/login">
            <Button type="primary" size="large">
              Get Started
            </Button>
          </Link>
        </div>
        <div className="home-right">
          <img
            src={homeIllustration1}
            alt="home-illustration"
            className="home-illustration"
          />
        </div>
      </div>
    </>
  );
}

export default Home;
