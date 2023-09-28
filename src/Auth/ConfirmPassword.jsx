
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Toast } from 'primereact/toast';
import { Password } from "primereact/password";
import { ProgressSpinner } from "primereact/progressspinner";

const SignUpDemo = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const toast = useRef(null);
  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState(false);
 



  useEffect(() => {
    sessionStorage.clear();
  }, []);



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

    if (!password) {
      errors.password = "Please enter the password";
      isProceed = false;
    } else if (password.length < 8) {
      errors.password = "Password should be at least 8 characters long";
      isProceed = false;
    } else if (!/\d/.test(password)) {
      errors.password = "Password should contain at least one digit";
      isProceed = false;
    } else if (!/[a-zA-Z]/.test(password)) {
      errors.password = "Password should contain at least one letter";
      isProceed = false;
    } else {
      // Password is valid
      isProceed = true;
    }

    if (!confirmPassword) {
      errors.confirmPassword = "Please enter the password";
      isProceed = false;
    } else if (confirmPassword.length < 8) {
      errors.confirmPassword = "Password should be at least 8 characters long";
      isProceed = false;
    } else if (!/\d/.test(confirmPassword)) {
      errors.confirmPassword = "Password should contain at least one digit";
      isProceed = false;
    } else if (!/[a-zA-Z]/.test(confirmPassword)) {
      errors.confirmPassword = "Password should contain at least one letter";
      isProceed = false;
    } else {
      // Password is valid
      isProceed = true;
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
        
        "password": btoa(password),
        "confirmPassword": btoa(confirmPassword),
        // password,
        // confirmPassword

      };

      console.log("data to reset password: ", data);

      if (data.password === data.confirmPassword) {
        fetch(` ${process.env.REACT_APP_API_KEY}/dam/user/loginUser/forgetPassword/createNewPassword`, {
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
                summary: "Password Reset",
                detail: "Password Reset Successfully",
              });

             
              
              setTimeout(() => {
                navigate("/Login")
              }, 2000)
            } else {
              setLoading(false);
              toast.current.show({
                severity: "warn",
                summary: "Incorrect Credentials",
                detail: "Please enter valid data",
              });
            }
          },
          (error) => {
            setLoading(false);
            toast.current.show({
              severity: "error",
              summary: "Password Not Reset",
              detail: "Error while Reseting Password",
            });
          }
        );
      }
      else {
        setLoading(false);
        toast.current.show({
          severity: "warn",
          summary: "Password Not matched",
          detail: "Entered Password & Confirm password does not matched",
        });
      }
     
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
        
      <Card style={{ width: "30%", marginTop: "8%", borderRadius: "2px", marginLeft: "34%",padding:"20px" ,boxShadow:"0 4px 8px rgba(0, 0, 0, 0.1)"}} >
        <div className="offset-lg-3 col-lg-6">
          <form className="container" onSubmit={handleSubmit}>
            <div className="card">
              <div className="card-header">
                <h3 style={{ color: "black" }}>CREATE PASSWORD</h3>
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
                        onChange={(e) => setEmailId(e.target.value)}
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
                        Password: <span className="errmsg">*</span>
                      </label>
                      <br />

                      <div className="p-inputgroup">


                        <Password style={{ height: "40px" }} value={password} onChange={(e) => setPassword(e.target.value)} toggleMask />
                      </div>

                      {formErrors.password && (
                        <div className="invalid-feedback error-message">
                          {formErrors.password}
                        </div>
                      )}
                    </div>
                  </div>


                  <div className="col-lg-6">
                    <div className="form-group">
                      <label style={{ color: "black" }}>
                        Confirm Password: <span className="errmsg">*</span>
                      </label>



                      <div className="p-inputgroup">

                        <Password style={{ height: "40px" }} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} toggleMask />
                      </div>
                      {formErrors.confirmPassword && (
                        <div className="invalid-feedback error-message">
                          {formErrors.confirmPassword}
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
                  label="Reset Password"

                  className="p-button-info p-button-sm"
                />
                {/* &nbsp;    <Button
                  type="button"
                  label="Cancel"
                  style={{borderRadius:"2px"}}
                  className="p-button-danger p-button-sm"
                  onClick={() => navigate("/Login")}
                /> */}
              </div>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default SignUpDemo;








