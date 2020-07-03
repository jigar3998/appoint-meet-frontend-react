import React from "react";
import FourthStep from "./SignUpStepForm/FourthStep";
import NavBarBusiness from "../NavBar/NavBarBusiness";
import { useHistory } from "react-router-dom";


function AddService() {
  let history = useHistory();

  const onAddServiceComplete = () => {
    history.push("/business/services");

  };
  return (
    <div>
      <NavBarBusiness />
      <div className="signup-step-form-container">
        <h1 style={{ marginTop: "-30px", textAlign: "center" }}>Add Service</h1>
        <hr/>
        <div className="steps-content">
          <FourthStep
            onAddServiceComplete={onAddServiceComplete}
            ButtonName={"Done"}
          />
        </div>
      </div>
    </div>
  );
}

export default AddService;
