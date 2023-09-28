


import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Toast } from 'primereact/toast';
import { ProgressSpinner } from "primereact/progressspinner";

const SignUpDemo = () => {
  const [emailId, setEmailId] = useState("");
  const toast = useRef(null);
  const navigate = useNavigate();
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
      
      let data = { emailId };

      fetch(` ${process.env.REACT_APP_API_KEY}/dam/user/loginUser/forgetPassword/sendOtp`, {
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
              summary: "OTP Sent",
              detail: "OTP Sent Successfully",
            });
            setLoading(false);

            setTimeout(() => {
              navigate("/Otp")
            }, 2000)

          } else {
            setLoading(false);

            toast.current.show({
              severity: "warn",
              summary: "OTP Not Send",
              detail: "Please enter valid Email Id",
            });
          }
        },
        (error) => {
          setLoading(false);

          toast.current.show({
            severity: "error",
            summary: "OTP Not Send",
            detail: "Error while Sending OTP",
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
      <Card style={{ width: "30%", marginTop: "8%", borderRadius: "2px", marginLeft: "34%",padding:"20px" ,boxShadow:"0 4px 8px rgba(0, 0, 0, 0.1)"}}>
        <div className="offset-lg-3 col-lg-6">
          <form className="container" onSubmit={handleSubmit}>
            <div className="card">
              <div className="card-header">
                <h3 style={{ color: "black" }}>FORGOT PASSWORD ?</h3>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-lg-6">
                    <div className="form-group">
                      <label style={{ color: "black" }}>
                        Email ID: <span className="errmsg">*</span>
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


                </div>
              </div>
              <div className="card-footer">
                <Button
                  type="submit"
                  style={{ borderRadius: "2px" }}
                  label="Send OTP"
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


