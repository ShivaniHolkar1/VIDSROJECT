
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Toast } from 'primereact/toast';
import { ProgressSpinner } from "primereact/progressspinner";

const SignUpDemo = () => {
  const [emailOtp, setOtp] = useState("");
  const [emailId, setEmail] = useState("");
  const toast = useRef(null);
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    sessionStorage.clear();
  }, []);





  const validateOTP = (otp) => {
    // Regular expression to check the OTP format (alphanumeric and 6 characters long)
    const otpRegex = /^[a-zA-Z0-9]{6}$/;
    return otpRegex.test(otp);
  };



  const IsValidate = () => {
    let isProceed = true;
    let errors = {};

    if (!emailId) {
      errors.emailId = "Please enter the emailId";
      isProceed = false;
    } else if (!/^[A-Za-z0-9._%+-]+[@]{1}[A-Za-z0-9.-]+[.]{1}[A-Za-z]{2,4}$/.test(emailId)) {
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


  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    if (IsValidate()) {
      
      let data = {
        emailId,
        emailOtp,


      };

      fetch(` ${process.env.REACT_APP_API_KEY}/dam/user/loginUser/forgetPassword/verifyOtp`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
      }).then(
        (result) => {
          if (result.status === 200) {
            console.warn("result...!!!", result);
            result.json().then((resp) => {
              console.warn("resp", resp);
            });
           
            setLoading(false);
            toast.current.show({
              severity: "success",
              summary: "OTP Verified ",
              detail: "OTP Verified Successfully",
            });
           

            setTimeout(() => {
              navigate("/ConfirmPassword")
            }, 2000)

          } else {
            setLoading(false);
            toast.current.show({
              severity: "warn",
              summary: "OTP verification failed",
              detail: "Please enter valid Email and OTP"
            });
          }
        },
        (error) => {
          setLoading(false);
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
   
      <Card style={{ width: "30%", marginTop: "8%", borderRadius: "2px", marginLeft: "34%" ,padding:"20px" ,boxShadow:"0 4px 8px rgba(0, 0, 0, 0.1)"}}>
        <div className="offset-lg-3 col-lg-6">
          <form className="container" onSubmit={handleSubmit}>
            <div className="card">
              <div className="card-header">
                <h3 style={{ color: "black" }}>OTP VERIFICATION</h3>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-lg-6">
                    <div className="form-group">
                      <label style={{ color: "black" }}>
                        Email Id: <span className="errmsg">*</span>
                      </label>
                      <input
                        value={emailId}
                        onChange={(e) => setEmail(e.target.value)}
                        className={`form-control ${formErrors.emailId ? "is-invalid" : ""
                          }`}
                      ></input>
                      {formErrors.emailId && (
                        <div className="invalid-feedback error-message">
                          {formErrors.emailId}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group">
                      <label style={{ color: "black" }}>
                        OTP: <span className="errmsg">*</span>
                      </label>
                      <input
                      type="password"
                        value={emailOtp}
                        onChange={(e) => setOtp(e.target.value)}
                        className={`form-control ${formErrors.emailOtp ? "is-invalid" : ""
                          }`}
                      ></input>
                      {formErrors.emailOtp && (
                        <div className="invalid-feedback error-message">
                          {formErrors.emailOtp}
                        </div>
                      )}
                    </div>
                  </div>



                </div>
              </div>
              <div className="card-footer">
                <Button
                  type="submit"
                  style={{ borderRadius: "2px" }}
                  label="Verify OTP"

                  className="p-button-info p-button-sm"
                />

              </div>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default SignUpDemo;
