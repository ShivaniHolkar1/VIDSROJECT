



import { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { ProgressSpinner } from "primereact/progressspinner";


const Login = () => {
  const [ emailId, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const toast = useRef(null);
  const [ emailOtp, setOtp] = useState("");
const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();
 const [ loggedUserData, setLoggedUserData] = useState();
  const [showOtpVerification, setShowOtpVerification] = useState(false);
  const [loading, setLoading] = useState(false);



  
  useEffect(() => {
    sessionStorage.clear();
  }, []);

  const isFormIncomplete =
  !emailId || !password ;
  const proceedLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    if (validate()) {
      let data = {
        emailId,
        password,
      };
      fetch(`${process.env.REACT_APP_API_KEY}/dam/user/login`, {
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
            if(data.status != "Active"){
              toast.current.show({
                severity: "warn",
                summary: "User Inactive",
                detail: "User Status is Inactive  ",
                // life: 3000,
              });
              
            }
            else{
              
              setShowOtpVerification(true); 

              
            
           

            console.warn("Response:", data);
          setLoggedUserData(data)
          toast.current.show({
            severity: "success",
            summary: "Email OTP sent",
            detail: "Email OTP sent on registered mail-id ",
            // life: 3000,
          });
          
            }
           
              if (Object.keys(data).length === 0) {
                console.log(data,">>>>>>>>>")
                
               
                // Handle empty response
              } else {
             
             
                if (data.status === "Inactive") {
                  toast.current.show({
                    severity: "warn",
                    summary: "User Inactive",
                    detail: "The user is inactive. Please contact to your administrator.",
                    life: 6000,
                  });
                
                }
                
              
            else {
              sessionStorage.setItem("userName", data.userName);
              sessionStorage.setItem("userrole", data.userRole);
              sessionStorage.setItem("emailId", data.emailId);
              sessionStorage.setItem("status", data.status);


              // if (data.userRole === "Admin" && data.status === "Active") 
              // {
              //   navigate("/dashboardMain");
              // } else if (data.userRole === "Reviewer" && data.status === "Active") {
              //   navigate("/reviewermain");
              // } else if (data.userRole === "Viewer" && data.status === "Active") {
              //   navigate("/bookmarkdoc");
              // } else {
              //   alert("Incorrect credentials...!!");
              // }
            }
    
               
              }
          });
        } else {
          return response.json().then((errorData) => {
            // Error response handling
            console.warn("Error Response:", errorData);
            const errorMessage = errorData.message || "Error while registering user";
            toast.current.show({
              severity: "warn",
              summary: "Invalid Credentials",
              detail: errorMessage,
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
        });
       
      })

      
     .catch((err) => {
          console.log(err.message,"????")
          toast.current.error("Login Failed due to: " + err.message);
        });
        setLoading(false);
    }
   
  
  };

 


  const validate = () => {
    let result = true;
    let isProceed = true;
    let errors = {};
    if (emailId.trim() === "") {
      result = false;
     
      
    if (!emailId) {
      errors.emailId = "Please enter the userName";
      isProceed = false;
    } else if (!/^[a-zA-Z0-9]+$/.test(emailId)) {
      errors.emailId = "Please enter a valid alphanumeric userName";
      isProceed = false;
    }

  if (!password) {
    errors.password = "Please enter the password";
    isProceed = false;
  }

  setFormErrors(errors);
    }
  
    
  
    return result;
  };





const validateOTP = (otp) => {
  // Regular expression to check the OTP format (alphanumeric and 6 characters long)
  const otpRegex = /^[a-zA-Z0-9]{6}$/;
  return otpRegex.test(otp);
};



const isValidateOTP = () => {
  let isProceed = true;
  let errors = {};



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
  console.warn("loggedUserData...!!!", loggedUserData);

  if (isValidateOTP()) {
    let data = { 
      "emailOtp":emailOtp,
    "emailId":loggedUserData.emailId
};

console.log("data: ",data);

    fetch(`
    ${process.env.REACT_APP_API_KEY}/dam/user/loginUser/forgetPassword/verifyOtp`
    // dam/user/loginUser/forgetPassword/verifyOtp
     , {
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
          console.warn("loggedUserData...!!!", loggedUserData);
          result.json().then((resp) => {
            console.warn("resp", resp);
              if (loggedUserData.userRole === "Admin" && loggedUserData.status === "Active") 
              {
                navigate("/dashboardMain");
              } else if (loggedUserData.userRole === "Reviewer" && loggedUserData.status === "Active") {
                navigate("/reviewermain");
              } else if (loggedUserData.userRole === "Viewer" && loggedUserData.status === "Active") {
                navigate("/bookmarkdoc");
              } else {
                alert("Incorrect credentials...!!");
              }
          });

          toast.current.show({
            severity: "success",
            summary: "OTP Verified ",
            detail: "OTP Verified Successfully",
            life: 2000,
          });
          // navigate("/ConfirmPassword")

        } else {
          toast.current.show({
            severity: "warn",
            summary: "Invalid OTP",
            detail: "You have entered invalid OTP",
            life: 2000,
          });
        }
      },
      (error) => {
        toast.current.show({
          severity: "error",
          summary: "OTP Not Verify",
          detail: "Error while Verify OTP",
          life: 6000,
        });
      }
    );

   
  }
  }
  
 
  return (
    <>
      <Toast ref={toast} />
      
    {loading ? (
        <span className="loading">
          <ProgressSpinner />
        </span>
      ) : null}
  
    
      <form onSubmit={proceedLogin}>
        <Card style={{borderRadius:"2px"}} className="loginCard">
          <div className="card-header">
           <h3 style={{color:"black"}}>DIGITAL ACCOUNTING MANUAL </h3>
          </div>
          <br />
          <div className="card-body">
          <label style={{color:"black"}}>Email Id: <span className="errmsg">*</span></label>
            <br />
            <InputText
              value={ emailId}
              style={{ borderRadius: "2px", width: "100%", height: "40px" }}
              onChange={(e) => setUsername(e.target.value)}
              // className="form-control"
              className={`form-control ${
                formErrors.userName ? "is-invalid" : ""
              }`}
            />

{formErrors.userName && (
                        <div className="invalid-feedback error-message">
                          {formErrors.userName}
                        </div>
                      )}
            <br />
            <br />
            <label style={{color:"black"}}>Password: <span className="errmsg">*</span></label>
            <br />
            <div className="p-inputgroup">

             
<InputText  type="password" style={{height: "40px" }} value={password} onChange={(e) =>setPassword(e.target.value)} toggleMask />
              
            </div>
            {formErrors.password && (
                        <div className="invalid-feedback error-message">
                          {formErrors.password}
                        </div>
                      )}
            <br />
            <Link to={"/reset"}>Forgot Password?</Link>
          </div>
          <div className="footer">
            <button
              type="submit"
              disabled={isFormIncomplete}
              style={{ borderRadius: "2px" }}
              className="p-button-sm btn btn-primary"
            >
              LOGIN
            </button>{" "}
            |&nbsp;&nbsp;
            <Link className="btn btn-success" to={"/register"}>Add New User</Link>
          </div>
          <br/>

          {showOtpVerification && (
           
     
   <div className="footer">
     <hr></hr>
            <br/>
    {/* onSubmit={handleSubmit} */}
     <form className="container" >
   
      <div class="grid">
     
       <div class="col">
      
     
                         <input
                             value={emailOtp}
                             placeholder="Enter OTP"
                             style={{height:"31px"}}
                             onChange={(e) => setOtp(e.target.value)}
                             className={`form-control ${
                               formErrors.emailOtp? "is-invalid" : ""
                             }`}
                           ></input>
                           {formErrors.emailOtp && (
                             <div className="invalid-feedback error-message">
                               {formErrors.emailOtp}
                             </div>
                           )}
                          
                   
     </div>


         <div class="col">
       
         <Button
                       type="submit"
                       style={{borderRadius:"2px"}}
                       label="Verify OTP"
                     onClick={handleSubmit}
                       className="p-button-info p-button-sm"
                     />
         </div>
         </div>
             
               </form>



               </div>

               
          )}
        </Card>
      </form>
                    


   
   


    </>
  );
};

export default Login;



































// import { useEffect, useState, useRef } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { Card } from "primereact/card";
// import { InputText } from "primereact/inputtext";
// import { Password } from "primereact/password";
// import { Toast } from "primereact/toast";

// const Login = () => {
//   const [userName, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [passwordVisible, setPasswordVisible] = useState(false);
//   const toast = useRef(null);
//   const navigate = useNavigate();


  

//   useEffect(() => {
//     sessionStorage.clear();
//   }, []);

//   const proceedLogin = (e) => {
//     e.preventDefault();
//     if (validate()) {
//       let data = {
//         userName,
//         password,
//       };
//       fetch(`${process.env.REACT_APP_API_KEY}/dam/user/login`, {
//         method: "POST",
//         headers: {
//           Accept: "application/json",
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(data),
//       })
//         .then((res) => {
//           return res.json();
//         })
//         .then((resp) => {

      
//         if (Object.keys(resp).length === 0) {
//             // Handle empty response
//           } else {
//             sessionStorage.setItem("userName", resp.userName);
//             sessionStorage.setItem("userrole", resp.userRole);
//             sessionStorage.setItem("emailId", resp.emailId);
//             sessionStorage.setItem("status", resp.status);
          

//             if (resp.userRole === "Admin" && resp.status === "Active") {
//               navigate("/dashboardMain");
//             } else if (resp.userRole === "Reviewer" && resp.status === "Active") {
//               navigate("/reviewermain");
//             } else if (resp.userRole === "Viewer" && resp.status === "Active") {
//               navigate("/bookmarkdoc");
//             } else {
//               alert("Incorrect credentials...!!");
//             }
//           }


          
//           console.log(resp.developerMessage  , "//////////ppp/");
      
//           const errorMessage = resp.developerMessage || "Error while registering user";
//           toast.current.show({
//             severity: "warn",
//             summary: "Your Password has been expired Please Reset Again",
//             detail: errorMessage,
//             life: 6000,
//           });
          
//          })
        
//         .catch((err) => {
//           console.log(err.message,"????")
//           toast.current.error("Login Failed due to: " + err.message);
//         });
//     }
  
//   };

 


//   const validate = () => {
//     let result = true;
//     if (userName.trim() === "") {
//       result = false;
//       toast.current.show({
//         severity: "warn",
//         summary: "Validation Error",
//         detail: "Please enter a username",
//         life: 3000,
//       });
//     }
  
//     // Check password strength
//     const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=<>?])[A-Za-z\d!@#$%^&*()_\-+=<>?]{8,}$/;
//     if (!strongPasswordRegex.test(password)) {
//       result = false;
//       toast.current.show({
//         severity: "warn",
//         summary: "Validation Error",
//         detail:
//           "Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one digit, and one special character",
//         life: 3000,
//       });
//     }
  
//     return result;
//   };
  
//   const togglePasswordVisibility = () => {
//     setPasswordVisible(!passwordVisible);
//   };

//   return (
//     <>
//       <Toast ref={toast} />
//       <form onSubmit={proceedLogin}>
//         <Card style={{borderRadius:"2px"}} className="loginCard">
//           <div className="card-header">
//             <h3 style={{color:"black"}}>Digital Accounting Manual System</h3>
//           </div>
//           <br />
//           <div className="card-body">
//           <label style={{color:"black"}}>User Name: <span className="errmsg">*</span></label>
//             <br />
//             <InputText
//               value={userName}
//               style={{ borderRadius: "2px", width: "100%", height: "40px" }}
//               onChange={(e) => setUsername(e.target.value)}
//               className="form-control"
//             />
//             <br />
//             <br />
//             <label style={{color:"black"}}>Password: <span className="errmsg">*</span></label>
//             <br />
//             <div className="p-inputgroup">
//               <Password
//                 value={password}
//                 onClick={togglePasswordVisibility}
//                style={{ borderRadius: "2px", height: "40px" }}
//                 toggleMask={!passwordVisible}
//                 feedback={false}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//             </div>
//             <br />
//             <Link to={"/reset"}>Forgot Password?</Link>
//           </div>
//           <div className="footer">
//             <button
//               type="submit"
//               style={{ borderRadius: "2px" }}
//               className="p-button-sm btn btn-primary"
//             >
//               Login
//             </button>{" "}
//             |&nbsp;&nbsp;
//             <Link className="btn btn-success" to={"/register"}><b>Add New User</b> </Link>
//           </div>
//         </Card>
//       </form>
//     </>
//   );
// };

// export default Login;












  // import { useEffect, useState, useRef } from "react";
  // import { Link, useNavigate } from "react-router-dom";
  // import { Card } from "primereact/card";
  // import { InputText } from "primereact/inputtext";
  // import { Password } from "primereact/password";
  // import { Toast } from "primereact/toast";

  // const Login = () => {
  //   const [userName, setUsername] = useState("");
  //   const [password, setPassword] = useState("");
  //   const [passwordVisible, setPasswordVisible] = useState(false);
  //   const toast = useRef(null);
  //   const navigate = useNavigate();


    

  //   useEffect(() => {
  //     sessionStorage.clear();
  //   }, []);

  //   const proceedLogin = (e) => {
  //     e.preventDefault();
  //     if (validate()) {
  //       let data = {
  //         userName,
  //         password,
  //       };
  //       fetch(`${process.env.REACT_APP_API_KEY}/dam/user/login`, {
  //         method: "POST",
  //         headers: {
  //           Accept: "application/json",
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(data),
  //       })
  //         .then((res) => {
  //           return res.json();
  //         })
  //         .then((resp) => {

        
  //         if (Object.keys(resp).length === 0) {
  //             // Handle empty response
  //           } else {
  //             sessionStorage.setItem("userName", resp.userName);
  //             sessionStorage.setItem("userrole", resp.userRole);
  //             sessionStorage.setItem("emailId", resp.emailId);
  //             sessionStorage.setItem("status", resp.status);
            

  //             if (resp.userRole === "Admin" && resp.status === "Active") {
  //               navigate("/dashboardMain");
  //             } else if (resp.userRole === "Reviewer" && resp.status === "Active") {
  //               navigate("/reviewermain");
  //             } else if (resp.userRole === "Viewer" && resp.status === "Active") {
  //               navigate("/bookmarkdoc");
  //             } else {
  //               alert("Incorrect credentials...!!");
  //             }
  //           }


            
  //           // console.log(resp.developerMessage  , "//////////ppp/");
        
  //           // const errorMessage = resp.developerMessage || "Error while registering user";
  //           // toast.current.show({
  //           //   severity: "warn",
  //           //   summary: "Your Password has been expired ",
  //           //   detail: errorMessage,
  //           //   life: 6000,
  //           // });
            
  //         })
          
  //         .catch((err) => {
  //           console.log(err.message,"????")
  //           toast.current.error("Login Failed due to: " + err.message);
  //         });
  //     }
    
  //   };

  


  //   const validate = () => {
  //     let result = true;
  //     if (userName.trim() === "") {
  //       result = false;
  //       toast.current.show({
  //         severity: "warn",
  //         summary: "Validation Error",
  //         detail: "Please enter a username",
  //         life: 3000,
  //       });
  //     }
    
  //     // Check password strength
  //     const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=<>?])[A-Za-z\d!@#$%^&*()_\-+=<>?]{8,}$/;
  //     if (!strongPasswordRegex.test(password)) {
  //       result = false;
  //       toast.current.show({
  //         severity: "warn",
  //         summary: "Validation Error",
  //         detail:
  //           "Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one digit, and one special character",
  //         life: 3000,
  //       });
  //     }
    
  //     return result;
  //   };
    
  //   const togglePasswordVisibility = () => {
  //     setPasswordVisible(!passwordVisible);
  //   };

  //   return (
  //     <>
  //       <Toast ref={toast} />
  //       <form onSubmit={proceedLogin}>
  //         <Card style={{borderRadius:"2px"}} className="loginCard">
  //           <div className="card-header">
  //             <h3 style={{color:"black"}}>DIGITAL ACCOUNTING MANUAL </h3>
  //           </div>
  //           <br />
  //           <div className="card-body">
  //           <label style={{color:"black"}}>User Name: <span className="errmsg">*</span></label>
  //             <br />
  //             <InputText
  //               value={userName}
  //               style={{ borderRadius: "2px", width: "100%", height: "40px" }}
  //               onChange={(e) => setUsername(e.target.value)}
  //               className="form-control"
  //             />
  //             <br />
  //             <br />
  //             <label style={{color:"black"}}>Password: <span className="errmsg">*</span></label>
  //             <br />
  //             <div className="p-inputgroup">
  //               <Password
  //                 value={password}
                 
  //               style={{ borderRadius: "2px", height: "40px" }}
  //                 toggleMask={!passwordVisible}
  //                 feedback={false}
  //                 onChange={(e) => setPassword(e.target.value)}
  //               />
  //             </div>
  //             <br />
  //             <Link to={"/reset"}>Forgot Password?</Link>
  //           </div>
  //           <div className="footer">
  //             <button
  //               type="submit"
  //               style={{ borderRadius: "2px" }}
  //               className="p-button-sm btn btn-primary"
  //             >
  //               LOGIN
  //             </button>{" "}
  //             |&nbsp;&nbsp;
  //             <Link className="btn btn-success" to={"/register"}>Add New User</Link>
  //           </div>
  //         </Card>
  //       </form>
  //     </>
  //   );
  // };

  // export default Login;






// import { useEffect, useState, useRef } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { Card } from "primereact/card";
// import { InputText } from "primereact/inputtext";
// import { Password } from "primereact/password";
// import { Toast } from "primereact/toast";

// const Login = () => {
//   const [userName, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [passwordVisible, setPasswordVisible] = useState(false);
//   const [loginAttempts, setLoginAttempts] = useState(0);
//   const [isScreenLocked, setIsScreenLocked] = useState(false);
//   const [secondsRemaining, setSecondsRemaining] = useState(0);

//   const MAX_LOGIN_ATTEMPTS = 3;
//   const LOCK_DURATION = 30; // 30 seconds
//   // const LOGIN_TIMEOUT = 60000; // 60 seconds

//   const toast = useRef(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     sessionStorage.clear();
//   }, []);

//   useEffect(() => {
//     let timer;
//     if (isScreenLocked && secondsRemaining > 0) {
//       timer = setInterval(() => {
//         setSecondsRemaining((prevSeconds) => prevSeconds - 1);
//       }, 1000);
//     }

//     return () => clearInterval(timer);
//   }, [isScreenLocked, secondsRemaining]);

//   useEffect(() => {
//     if (isScreenLocked && secondsRemaining <= 0) {
//       setIsScreenLocked(false);
//       setLoginAttempts(0);
//     }
//   }, [isScreenLocked, secondsRemaining]);

//   const proceedLogin = (e) => {
//     e.preventDefault();
//     if (!isScreenLocked && validate()) {
//       let data = {
//         userName,
//         password,
//       };
//       fetch(`${process.env.REACT_APP_API_KEY}/dam/user/login`, {
//         method: "POST",
//         headers: {
//           Accept: "application/json",
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(data),
//       })
//         .then((res) => {
//           return res.json();
//         })
//         .then((resp) => {
//           if (Object.keys(resp).length === 0) {
//             // Handle empty response
//           } else {
//             sessionStorage.setItem("userName", resp.userName);
//             sessionStorage.setItem("userrole", resp.userRole);
//             sessionStorage.setItem("emailId", resp.emailId);
//             sessionStorage.setItem("status", resp.status);

//             if (resp.userRole === "Admin" && resp.status === "Active") {
//               navigate("/dashboardMain");
//             } else if (resp.userRole === "Reviewer" && resp.status === "Active") {
//               navigate("/reviewermain");
//             } else if (resp.userRole === "Viewer" && resp.status === "Active") {
//               navigate("/bookmarkdoc");
//             } else {
//               alert("Incorrect credentials...!!");
//               handleIncorrectAttempt();
//             }
//           }
//         })
//         .catch((err) => {
//           console.log(err.message, "????");
//           toast.current.error("Login Failed due to: " + err.message);
//         });
//     }
//   };

//   const handleIncorrectAttempt = () => {
//     setLoginAttempts((prevAttempts) => prevAttempts + 1);
//     if (loginAttempts >= MAX_LOGIN_ATTEMPTS - 1) {
//       setIsScreenLocked(true);
//       setSecondsRemaining(LOCK_DURATION);
//     }
//   };

//   const validate = () => {
//     let result = true;
//     if (userName.trim() === "") {
//       result = false;
//       toast.current.show({
//         severity: "warn",
//         summary: "Validation Error",
//         detail: "Please enter a username",
//         life: 3000,
//       });
//     }

//     const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=<>?])[A-Za-z\d!@#$%^&*()_\-+=<>?]{8,}$/;
//     if (!strongPasswordRegex.test(password)) {
//       result = false;
//       toast.current.show({
//         severity: "warn",
//         summary: "Validation Error",
//         detail:
//           "Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one digit, and one special character",
//         life: 3000,
//       });
//     }

//     return result;
//   };

//   const togglePasswordVisibility = () => {
//     setPasswordVisible(!passwordVisible);
//   };

//   return (
//     <>
//       <Toast ref={toast} />
//       {isScreenLocked && (
//         <div
//           style={{
//             position: "fixed",
//             top: 0,
//             left: 0,
//             width: "100%",
//             height: "100%",
//             background: "rgba(0, 0, 0, 0.)",
//             // background: "transperent",
            
//             zIndex: 9999,
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             color: "black",
//             fontSize: "24px",
//           }}
//         >
//           Your account has been locked due to multiple incorrect login attempts. Please try again after {secondsRemaining} seconds.
//         </div>
//       )}
//       {!isScreenLocked && (
//           <form onSubmit={proceedLogin}>
//         <Card style={{borderRadius:"2px"}} className="loginCard">
//           <div className="card-header">
//             <h3 style={{color:"black"}}>Digital Accounting Manual System</h3>
//           </div>
//           <br />
//           <div className="card-body">
//           <label style={{color:"black"}}>User Name: <span className="errmsg">*</span></label>
//             <br />
//             <InputText
//               value={userName}
//               style={{ borderRadius: "2px", width: "100%", height: "40px" }}
//               onChange={(e) => setUsername(e.target.value)}
//               className="form-control"
//             />
//             <br />
//             <br />
//             <label style={{color:"black"}}>Password: <span className="errmsg">*</span></label>
//             <br />
//             <div className="p-inputgroup">
//               <Password
//                 value={password}
//                 onClick={togglePasswordVisibility}
//                style={{ borderRadius: "2px", height: "40px" }}
//                 toggleMask={!passwordVisible}
//                 feedback={false}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//             </div>
//             <br />
//             <Link to={"/reset"}>Forgot Password?</Link>
//           </div>
//           <div className="footer">
//             <button
//               type="submit"
//               style={{ borderRadius: "2px" }}
//               className="p-button-sm btn btn-primary"
//             >
//               Login
//             </button>{" "}
//             |&nbsp;&nbsp;
//             <Link className="btn btn-success" to={"/register"}><b>Add New User</b> </Link>
//           </div>
//         </Card>
//       </form>
//       )}
//     </>
//   );
// };

// export default Login;








// import { useEffect, useState, useRef } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { Card } from "primereact/card";
// import { InputText } from "primereact/inputtext";
// import { Password } from "primereact/password";
// import { Toast } from "primereact/toast";

// const Login = () => {
//   const [userName, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const toast = useRef(null);
//   const [formErrors, setFormErrors] = useState({});
//   const navigate = useNavigate();



  
//   useEffect(() => {
//     sessionStorage.clear();
//   }, []);

//   const proceedLogin = (e) => {
//     e.preventDefault();
//     if (validate()) {
//       let data = {
//         userName,
//         password,
//       };
//       fetch(`${process.env.REACT_APP_API_KEY}/dam/user/login`, {
//         method: "POST",
//         headers: {
//           Accept: "application/json",
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(data),
//       })
//       .then((response) => {
//         if (response.ok) {
//           return response.json().then((data) => {
//             // Successful response handling
//             console.warn("Response:", data);
          
           
//               if (Object.keys(data).length === 0) {
//                 console.log(data,">>>>>>>>>")
               
//                 // Handle empty response
//               } else {
//                 sessionStorage.setItem("userName", data.userName);
//                 sessionStorage.setItem("userrole", data.userRole);
//                 sessionStorage.setItem("emailId", data.emailId);
//                 sessionStorage.setItem("status", data.status);
//                 if (data.status === "Inactive") {
//                   toast.current.show({
//                     severity: "warn",
//                     summary: "User Inactive",
//                     detail: "The user is inactive. Please contact your administrator.",
//                     life: 6000,
//                   });
//                 }
              
//             else {
//               // ...
//             }
    
//                 if (data.userRole === "Admin" && data.status === "Active") {
//                   navigate("/dashboardMain");
//                 } else if (data.userRole === "Reviewer" && data.status === "Active") {
//                   navigate("/reviewermain");
//                 } else if (data.userRole === "Viewer" && data.status === "Active") {
//                   navigate("/bookmarkdoc");
//                 } else {
//                   alert("Incorrect credentials...!!");
//                 }
//               }
//           });
//         } else {
//           return response.json().then((errorData) => {
//             // Error response handling
//             console.warn("Error Response:", errorData);
//             const errorMessage = errorData.message || "Error while registering user";
//             toast.current.show({
//               severity: "warn",
//               summary: "User Not Added",
//               detail: errorMessage,
//               life: 6000,
//             });
//           });
//         }
//       })
//       .catch((error) => {
//         // Network or other errors
//         console.error("Error:", error);
//         toast.current.show({
//           severity: "error",
//           summary: "User Not Added",
//           detail: "Error while registering user",
//           life: 6000,
//         });
//       })

//      .catch((err) => {
//           console.log(err.message,"????")
//           toast.current.error("Login Failed due to: " + err.message);
//         });
//     }
  
//   };

 


//   const validate = () => {
//     let result = true;
//     let isProceed = true;
//     let errors = {};
//     if (userName.trim() === "") {
//       result = false;
     
      
//     if (!userName) {
//       errors.userName = "Please enter the userName";
//       isProceed = false;
//     } else if (!/^[a-zA-Z0-9]+$/.test(userName)) {
//       errors.userName = "Please enter a valid alphanumeric userName";
//       isProceed = false;
//     }

//   if (!password) {
//     errors.password = "Please enter the password";
//     isProceed = false;
//   }

//   setFormErrors(errors);
//     }
  
//     // Check password strength
//     // const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=<>?])[A-Za-z\d!@#$%^&*()_\-+=<>?]{8,}$/;
//     // if (!strongPasswordRegex.test(password)) {
//     //   result = false;
//     //   toast.current.show({
//     //     severity: "warn",
//     //     summary: "Validation Error",
//     //     detail:
//     //       "Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one digit, and one special character",
//     //     life: 3000,
//     //   });
//     // }
  
//     return result;
//   };
  
 
//   return (
//     <>
//       <Toast ref={toast} />

    
//       <form onSubmit={proceedLogin}>
//         <Card style={{borderRadius:"2px"}} className="loginCard">
//           <div className="card-header">
//            <h3 style={{color:"black"}}>DIGITAL ACCOUNTING MANUAL </h3>
//           </div>
//           <br />
//           <div className="card-body">
//           <label style={{color:"black"}}>User Name: <span className="errmsg">*</span></label>
//             <br />
//             <InputText
//               value={userName}
//               style={{ borderRadius: "2px", width: "100%", height: "40px" }}
//               onChange={(e) => setUsername(e.target.value)}
//               // className="form-control"
//               className={`form-control ${
//                 formErrors.userName ? "is-invalid" : ""
//               }`}
//             />

// {formErrors.userName && (
//                         <div className="invalid-feedback error-message">
//                           {formErrors.userName}
//                         </div>
//                       )}
//             <br />
//             <br />
//             <label style={{color:"black"}}>Password: <span className="errmsg">*</span></label>
//             <br />
//             <div className="p-inputgroup">
             
// <Password style={{height: "40px" }} value={password} onChange={(e) =>setPassword(e.target.value)} toggleMask />
              
//             </div>
//             {formErrors.password && (
//                         <div className="invalid-feedback error-message">
//                           {formErrors.password}
//                         </div>
//                       )}
//             <br />
//             <Link to={"/reset"}>Forgot Password?</Link>
//           </div>
//           <div className="footer">
//             <button
//               type="submit"
//               style={{ borderRadius: "2px" }}
//               className="p-button-sm btn btn-primary"
//             >
//               LOGIN
//             </button>{" "}
//             |&nbsp;&nbsp;
//             <Link className="btn btn-success" to={"/register"}>Add New User</Link>
//           </div>
//         </Card>
//       </form>
//     </>
//   );
// };

// export default Login;
