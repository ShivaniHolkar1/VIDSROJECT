import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Toast } from "primereact/toast";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Password } from "primereact/password";
import { ProgressSpinner } from "primereact/progressspinner";

const SignUpDemo = () => {
  const [userName, setUsername] = useState("");
  const [loginpassword, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [emailId, setEmailId] = useState("");
  const [showOtpVerification, setShowOtpVerification] = useState(false);
  const [emailOtp, setOtp] = useState(null);
  const navigate = useNavigate();
  const toast = useRef(null);
  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState(Boolean);
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    sessionStorage.clear();
  }, []);

  const IsValidate = () => {
    let isProceed = true;
    let errors = {};

    if (!userName) {
      errors.userName = "Please enter the userName";
      isProceed = false;
    } else if (!/^[a-zA-Z ]+$/.test(userName)) {
      errors.userName = "Please enter a valid  userName";
      isProceed = false;
    }

    if (!loginpassword) {
      errors.loginpassword = "Please enter the password";
      isProceed = false;
    } else {
      // Password requirements
      const minLength = 8;
      const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
      const uppercaseRegex = /[A-Z]/;
      const lowercaseRegex = /[a-z]/;
      const numberRegex = /[0-9]/;

      if (loginpassword.length < minLength) {
        errors.loginpassword= "Password should be at least 8 characters long.";
        isProceed = false;
      } else if (!specialCharRegex.test(loginpassword)) {
        errors.loginpassword=
          "Password should contain at least one special character.";
        isProceed = false;
      } else if (!uppercaseRegex.test(loginpassword)) {
        errors.loginpassword =
          "Password should contain at least one uppercase letter.";
        isProceed = false;
      } else if (!lowercaseRegex.test(loginpassword)) {
        errors.loginpassword =
          "Password should contain at least one lowercase letter.";
        isProceed = false;
      } else if (!numberRegex.test(loginpassword)) {
        errors.loginpassword= "Password should contain at least one number.";
        isProceed = false;
      }
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

    setFormErrors(errors);

    if (!isProceed) {
      toast.warning("Please fill in all the required fields.");
    }

    return isProceed;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (IsValidate()) {
      // data.
      if (loginpassword === confirmpassword) {
        let data = {
          userName,
          password: btoa(loginpassword),

          emailId,
        };
        fetch(`${process.env.REACT_APP_API_KEY}/dam/user/submit`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then((response) => {
            if (response.ok) {
              return response.json().then((data) => {
                // Successful response handling
                console.warn("Response:", data);
                toast.current.show({
                  severity: "success",
                  summary: "User Added",
                  detail: "User Registered Successfully",
                  life: 2000,
                });

                setTimeout(() => {
                  navigate("/Login");
                }, 2000);
              });
            } else {
              return response.json().then((errorData) => {
                // Error response handling
                console.warn("Error Response:", errorData);
                const errorMessage =
                  errorData.message || "Error while registering user";
                toast.current.show({
                  severity: "warn",
                  summary: "User Not Added",
                  detail: errorMessage,
                  life: 2000,
                });
              });
            }
          })
          .catch((error) => {
            // Network or other errors
            console.error("Error:", error);
            toast.current.show({
              severity: "error",
              summary: "User Not Added",
              detail: "Error while registering user",
              life: 2000,
            });
          });
      } else {
        toast.current.show({
          severity: "warn",
          summary: "Password Not matched",
          detail: "Entered Password & Confirm password does not matched",
        });
      }
    }
  };

  const IsValidate1 = () => {
    let isProceed = true;
    let errors = {};

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

    setFormErrors(errors);

    if (!isProceed) {
      toast.warning("Please fill in all the required fields.");
    }

    return isProceed;
  };

  const handleSubmit1 = (e) => {
    e.preventDefault();

    if (IsValidate1()) {
      let data = { emailId };
      setLoading(true);

      fetch(
        ` ${process.env.REACT_APP_API_KEY}/dam/user/loginUser/RegisterEmail/sendOtp`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },

          body: JSON.stringify(data),
        }
      ).then(
        (result) => {
          if (result.status === 200) {
            console.warn("result...!!!", result);
            result.json().then((resp) => {
              console.warn("resp", resp);
            });

            toast.current.show({
              severity: "success",
              summary: "OTP Sent",
              detail: "OTP Sent Successfully",
            });
            setLoading(false);
          } else {
            toast.current.show({
              severity: "warn",
              summary: "OTP Not Send",
              detail: "Please enter valid Email Id",
            });
            setLoading(false);
          }
        },
        (error) => {
          toast.current.show({
            severity: "error",
            summary: "OTP Not Send",
            detail: "Error while Sending OTP",
          });
          setLoading(false);
        }
      );
    }
  };

  const validateOTP = (otp) => {
    
    // Regular expression to check the OTP format (alphanumeric and 6 characters long)
    const otpRegex = /^[a-zA-Z0-9]{6}$/;
    return otpRegex.test(otp);
  };

  const IsValidate2 = () => {
    let isProceed = true;
    let errors = {};

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

    if (!emailOtp) {
      errors.emailOtp = "Please enter the emailOTP";
      isProceed = false;
    } else if (!validateOTP(emailOtp)) {
      errors.emailOtp = "Please enter a valid OTP (alphanumeric, 6 characters)";
      isProceed = false;
    }

    setFormErrors(errors);

    if (!isProceed) {
      toast.warning("Please fill in all the required fields.");
    }

    return isProceed;
  };

  const isFormIncomplete = !emailOtp;
  function verifyOTP(e) {
    e.preventDefault();

    if (IsValidate2()) {
      const data = {
        emailId,
        emailOtp,
      };

      fetch(
        ` ${process.env.REACT_APP_API_KEY}/dam/user/loginUser/RegisterEmail/verifyOtp`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      ).then(
        (result) => {
          if (result.status === 200) {
            
            setIsVerified(true);
            
            console.warn("result...!!!", result);
            result.json().then((resp) => {
              console.warn("resp", resp);
            });
            setShowOtpVerification(true);
            toast.current.show({
              severity: "success",
              summary: "OTP Verified ",
              detail: "OTP Verified Successfully",
            });
          } else {
            toast.current.show({
              severity: "warn",
              summary: "OTP verification failed",
              detail: "Please enter valid Email and OTP",
            });
          }
        },
        (error) => {
          toast.current.show({
            severity: "error",
            summary: "OTP Not Verified",
            detail: "Error while Verifying OTP",
          });
        }
      );
    }
  }

  return (
    <div>
      <Toast ref={toast} />
      {loading ? (
        <span className="loading">
          <ProgressSpinner />
        </span>
      ) : null}

      <Card className="register_module">
        <div className="card_module">
          {/* <div className="offset-lg-3 col-lg-6"> */}
          <form className="container" onSubmit={handleSubmit}>
            <div className="card">
              {/* <b style={{color:"red"}}> {errorMessage} User</b> */}
              {/* <br /> */}
              <div className="card-header">
                <h3 style={{ color: "black" }}>USER REGISTRATION</h3>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-lg-6">
                    <div className="form-group">
                      <label style={{ color: "black" }}>
                        Name : <span className="errmsg">*</span>
                      </label>
                      <br />

                      <input
                        value={userName}
                        // style={{width:"85%"}}
                        onChange={(e) => setUsername(e.target.value)}
                        className={`form-control ${
                          formErrors.userName ? "is-invalid" : ""
                        }`}
                      ></input>
                      {formErrors.userName && (
                        <div className="invalid-feedback error-message">
                          {formErrors.userName}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div class="grid">
                      <div class="col">
                        <div className="form-group">
                          <label style={{ color: "black" }}>
                            Email Id : <span className="errmsg">*</span>
                          </label>
                          <input
                            value={emailId}
                            readOnly={isVerified}
                            onChange={(e) => setEmailId(e.target.value)}
                            className={`form-control ${
                              formErrors.emailId ? "is-invalid" : ""
                            }`}
                          ></input>
                          {formErrors.emailId && (
                            <div className="invalid-feedback error-message">
                              {formErrors.emailId}
                            </div>
                          )}
                        </div>
                       
                      </div>
                      
                      <div class="col">
                        <br />

                        <button
                          label="Send OTP "
                          className="p-button-sm btn btn-primary"
                          style={{
                            height: "35px",
                            borderRadius: "2px",
                            fontSize: "16px",
                          }}
                          onClick={handleSubmit1}
                        >
                          Send OTP
                        </button>
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div class="grid">
                        <div class="col">
                          <label style={{ color: "black" }}>
                            OTP : <span className="errmsg">*</span>
                          </label>
                          <input
                            type="password"
                            readOnly={isVerified}
                            value={emailOtp}
                            onChange={(e) => setOtp(e.target.value)}
                            className={`form-control ${
                              formErrors.emailOtp ? "is-invalid" : ""
                            }`}
                          ></input>
                          {formErrors.emailOtp && (
                            <div className="invalid-feedback error-message">
                              {formErrors.emailOtp}
                            </div>
                          )}
                        </div>

                        <div class="col">
                          <br />

                          <button
                            className="p-button-sm btn btn-primary"
                            disabled={isFormIncomplete}
                            label="Verify OTP "
                            style={{
                              height: "35px",
                              borderRadius: "2px",
                              fontSize: "16px",
                            }}
                            onClick={verifyOTP}
                          >
                            Verify OTP
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group">
                      <label style={{ color: "black" }}>
                        Password :  <span className="errmsg">*</span>
                      </label>
                      <br />

                      <div className="p-inputgroup">
                        <Password
                          style={{ height: "35px", width: "85%" }}
                          value={loginpassword}
                          onChange={(e) => setPassword(e.target.value)}
                          toggleMask
                        />
                      </div>

                      {formErrors.loginpassword && (
                        <div className="invalid-feedback error-message">
                          {formErrors.loginpassword}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="form-group">
                      <label style={{ color: "black" }}>
                        Confirm Password : <span className="errmsg">*</span>
                      </label>
                      <br />

                      <div className="p-inputgroup">
                        <Password
                          style={{ height: "35px", width: "85%" }}
                          value={confirmpassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          toggleMask
                        />
                      </div>

                      {formErrors.confirmpassword && (
                        <div className="invalid-feedback error-message">
                          {formErrors.confirmpassword}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* <div className="col-lg-6">
                    <div className="form-group">
                      <label style={{ color: "black" }}>PhoneNo:</label>
                      <input
                        value={phoneNo}
                        onChange={(e) => setPhoneNo(e.target.value)}
                        type="number"
                        className="form-control"
                      ></input>

                      
                      {formErrors.phoneNo && (
                        <div className="invalid-feedback error-message">
                          {formErrors.phoneNo}
                        </div>
                      )}
                    </div>
                  </div> */}
                </div>
              </div>

              <div className="card-footer">
                {showOtpVerification && (
                  <Button
                    type="submit"
                    style={{ borderRadius: "2px" }}
                    label="Submit"
                    className="p-button-info p-button-sm"
                  />
                )}

                <Button
                  type="button"
                  label="Cancel"
                  style={{ borderRadius: "2px", marginLeft: "20px" }}
                  className="p-button-danger p-button-sm"
                  onClick={() => navigate("/")}
                />
              </div>

              <br />

              <Link
                style={{ marginLeft: "6%" }}
                className="btn btn-success"
                to={"/login"}
              >
                {" "}
                Already have an Account?| Login Now
              </Link>
            </div>
          </form>
        </div>
        {/* </div> */}
      </Card>
    </div>
  );
};

export default SignUpDemo;
