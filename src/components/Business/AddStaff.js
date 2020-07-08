import React from "react";
import ThirdStep from "./SignUpStepForm/ThirdStep";
import NavBarApplication from "../NavBar/NavBarApplication";
import { useHistory } from "react-router-dom";


function AddStaff() {
  let history = useHistory();

  const onAddStaffComplete = () => {
    history.push("/business/staff");
  };
  return (
    <div>
        <NavBarApplication dropdowntype={"business"}/>

      <div className="signup-step-form-container">
        <h1 style={{ marginTop: "-30px", textAlign: "center" }}>Add Staff</h1>
        <hr/>
        <div className="steps-content">
          <ThirdStep
            onAddStaffComplete={onAddStaffComplete}
            ButtonName={"Done"}
          />
        </div>
      </div>
    </div>
  );
}

export default AddStaff;
