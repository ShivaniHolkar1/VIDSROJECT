import React, { useRef, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { Card } from "primereact/card";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { useState } from "react";
import { Toast } from "primereact/toast";
import { useNavigate, NavLink } from "react-router-dom";
import leftIcon from "../Assets/lefticon.png";
import Background from "../Assets/Background.png";

function UserDetails() {
  const [userName, setUserName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [empId, setEmpId] = useState("");
  const [status, setStatus] = useState("");
  const [userRole, setUserRole] = useState("");
  const toast = useRef(null);
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState({});
  const [changeColor, setChangeColor] = useState(false);
  const [changeColor1, setChangeColor1] = useState(false);
  const [createdBy, setLoginUser] = useState();
  const [userLoginName, setUserLoginName] = useState();
  const cities = [{ name: "Admin" }, { name: "Viewer" }, { name: "Reviewer" }];

  const handleClick = () => {
    setChangeColor(!changeColor);
  };

  const handleClick1 = () => {
    setChangeColor1(!changeColor1);
  };

  useEffect(() => {
    setLoginUser(sessionStorage.getItem("emailId"));
    setUserLoginName(sessionStorage.getItem("emailId"));
  }, []);

  console.log(createdBy, "?????????");

  const IsValidate = () => {
    let isProceed = true;
    let errors = {};

    if (!userName) {
      errors.userName = "Please enter the userName";
      isProceed = false;
    } else if (!/^[a-zA-Z ]+$/.test(userName)) {
      errors.userName = "Please enter a valid Alphabet for userName";
      isProceed = false;
    }

    if (!status) {
      errors.status = "Please select the status";
      isProceed = false;
    }

    if (!emailId) {
      errors.emailId = "Please enter the emailId";
      isProceed = false;
    } else if (
      !/^[A-Za-z0-9._%+-]+[@]{1}[A-Za-z0-9.-]+[.]{1}[A-Za-z]{2,4}$/.test(
        emailId
      )
    ) {
      errors.emailId = "Please enter a valid email";
      isProceed = false;
    }

    if (!userRole) {
      errors.userRole = "Please select the userRole";
      isProceed = false;
    }

    setFormErrors(errors);

    if (!isProceed) {
      toast.warning("Please fill in all the required fields.");
    }

    return isProceed;
  };

  const isFormIncomplete =
    !userName || !emailId || !empId || !status || !userRole;

  const onSubmit = (e) => {
    e.preventDefault();

    if (e.isValidEmail) {
    } else if (e.isValid) {
      console.log("Invalid form input");
    } else if (e.isValidUser) {
    }
  };

  function saveUser() {
    if (IsValidate()) {
      console.warn({ userName, emailId, empId, status, userRole, createdBy });
      let data = {
        userName,
        emailId,
        empId,
        status,
        userRole,
        createdBy,
        userLoginName,
      };

      console.log(data, "all data");

      fetch(`${process.env.REACT_APP_API_KEY}/dam/user/`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then(
        (result) => {
          if (result.status === 200) {
            result.json().then((resp) => {
              console.warn("resp", resp);

              toast.current.show({
                severity: "success",
                summary: "User Added",
                detail: "User Added Successfully",
                life: 2000,
              });

              setTimeout(() => {
                navigate("/role");
              }, 2000);
            });
          } else {
            result.json().then((resp) => {
              console.warn("resp", resp.developerMessage);

              toast.current.show({
                severity: "warn",
                summary: "User Not Added",
                detail: resp.developerMessage || "Error while Adding User",
                life: 2000,
              });
            });
          }
        },
        (error) => {
          toast.current.show({
            severity: "error",
            summary: "User Not Added",
            detail: "Error while Adding User",
            life: 2000,
          });
        }
      );
    }
  }

  function Cancel() {
    navigate("/role");
  }

  return (
    <div>
      <Toast ref={toast} />
      <NavLink to="/role" className="link1">
        <Button
          style={{ backgroundColor: "white", color: "black", height: "37px" }}
          className="p-button-raised  p-button p-button-secondary p-button-text"
        >
          <img
            style={{ width: "25px", marginRight: "10px", height: "25px" }}
            src={leftIcon}
            alt="leftIcon "
          />
          <b>Add New User</b>
        </Button>
      </NavLink>
      <img
        style={{ height: "55px", float: "right" }}
        src={Background}
        alt=" Background "
      />

      <br />
      <br />

      <Card style={{ height: "440px" }}>
        <label>
          <b style={{ color: "black" }}>User Details</b>
        </label>
        <br />
        <br />
        <Card
          style={{
            borderLeft: "9px solid #49ABA0 ",
            backgroundColor: "#F3F3F3",
            borderRadius: "1px",
            width: "950px",
            height: "280px",
          }}
        >
          <form onSubmit={onSubmit}>
            <div class="formgrid grid">
              <div class="field col-4">
                <label for="lastname2" style={{ color: "black" }}>
                  Name
                </label>
                <br />

                <InputText
                  style={{ height: "40px", width: "90%", borderRadius: "2px" }}
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                ></InputText>
                {formErrors.userName && (
                  <div className="invalid-feedback error-message">
                    {formErrors.userName}
                  </div>
                )}
              </div>

              <div class="field col-4">
                <label for="lastname2" style={{ color: "black" }}>
                  Email ID
                </label>

                <br />

                <InputText
                  style={{ height: "40px", width: "90%", borderRadius: "2px" }}
                  value={emailId}
                  onChange={(e) => setEmailId(e.target.value)}
                ></InputText>
                {formErrors.emailId && (
                  <div className="invalid-feedback error-message">
                    {formErrors.emailId}
                  </div>
                )}
              </div>

              <div class="field col-4">
                <label for="lastname2" style={{ color: "black" }}>
                  EMP ID
                </label>

                <br />

                <InputText
                  style={{ height: "40px", width: "90%", borderRadius: "2px" }}
                  value={empId}
                  onChange={(e) => setEmpId(e.target.value)}
                ></InputText>
                {formErrors.empId && (
                  <div className="invalid-feedback error-message">
                    {formErrors.empId}
                  </div>
                )}
              </div>
            </div>

            <div class="formgrid grid">
              <div class="field col-4">
                <label for="lastname2" style={{ color: "black" }}>
                  {" "}
                  User Role
                </label>
                <br />
                <Dropdown
                  style={{ width: "90%", borderRadius: "3px", height: "41px" }}
                  value={userRole}
                  options={cities}
                  onChange={(e) => setUserRole(e.value)}
                  optionLabel="name"
                  optionValue="name"
                  placeholder="Select "
                />
              </div>
              <div class="field col-4">
                <label style={{ color: "black" }}>Status</label>
                <div class="formgroup-inline">
                  <div class="field-radiobutton">
                    <input
                      style={{ height: "20px", width: "20px" }}
                      type="radio"
                      name="status"
                      value="Active"
                      onChange={(e) => {
                        setStatus(e.target.value);
                      }}
                    />

                    <label for="city7">Active</label>
                  </div>

                  <div class="field-radiobutton">
                    <input
                      type="radio"
                      style={{ height: "20px", width: "20px" }}
                      name="status"
                      value="Inactive"
                      onChange={(e) => {
                        setStatus(e.target.value);
                      }}
                    />

                    <label for="city8">Inactive</label>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </Card>
        <br />
        <br />

        <span style={{ float: "right" }}>
          <Button
            label="Cancel"
            style={{
              marginTop: "7%",
              color: "#203570",
              borderRadius: "2px",
            }}
            onMouseDown={handleClick}
            onClick={Cancel}
            className={`text-black p-button-sm  ${
              changeColor === true ? "bg-blue-800 text-white" : "bg-white"
            }`}
          />
          &nbsp;
          <Button
            style={{
              color: "#203570",
              marginTop: "7%",
              borderRadius: "2px",
            }}
            label="Submit"
            onMouseDown={handleClick1}
            className={`text-black p-button-sm  ${
              changeColor1 === true ? "bg-blue-800 text-white" : "bg-white"
            }`}
            disabled={isFormIncomplete}
            onClick={saveUser}
          />
        </span>
      </Card>
    </div>
  );
}

export default UserDetails;
