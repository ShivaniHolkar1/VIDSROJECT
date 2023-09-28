
import { useEffect, useState ,useRef} from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";

import { Toast } from "primereact/toast";



const Login = () => {
  const [username, usernameupdate] = useState("");
  const [password, passwordupdate] = useState("");
  const toast = useRef(null);


  const usenavigate = useNavigate();

  useEffect(() => {
    sessionStorage.clear();
  
  }, []);

  const emailRegex =
    "^[A-Za-z0-9._%+-]+[@]{1}[A-Za-z0-9.-]+[.]{1}[A-Za-z]{2,4}$";
const ProceedLogin = (e) => {
    e.preventDefault();
    if (validate()) {
     fetch(`${process.env.REACT_APP_API_KEY}/dam/user/email/` + username)
        .then((res) => {
          return res.json();
        })
        .then((resp) => {
          // setUserName(resp.emailId)
          console.log(resp, "//////////ppp/");

          if (Object.keys(resp).length === 0) {
            // toast.error("Please Enter valid username");
          } else {
            // if (resp.password === password) {
            //     toast.success('Success');
            //     sessionStorage.setItem('username',username);
            //     sessionStorage.setItem('userrole',resp.role);
            //     usenavigate('/')
            // }else{
            //     toast.error('Please Enter valid credentials');
            // }

            sessionStorage.setItem("username", resp.emailId);
            sessionStorage.setItem("userrole", resp.userRole);
            // sessionStorage.setItem("status", resp.status);
            if (resp.userRole === "Admin" ) {
              usenavigate("/dashboardMain");
            } else if (resp.userRole === "Reviewer") {
              usenavigate("/reviewermain");
            } else if (resp.userRole === "Viewer") {
              usenavigate("/bookmarkdoc");
            } else {
              alert("Incorrect credentials...!!");
            }

          
          }
        })
        .catch((err) => {
          toast.error("Login Failed due to :" + err.message);
        });
    }
  };

  const validate = () => {
    let result = true;
    if (username === "" || username === null) {
      result = false;
      toast.warning("Please Enter Username");
    }
    if (password === "" || password === null) {
      result = false;
      toast.warning("Please Enter Password");
    }
    return result;
  };
 
  return (
    // <Card style={{height:"100%",width:"100%"}} >
    <>
     <Toast ref={toast} />
         <form onSubmit={ProceedLogin} >

     
        <Card className="loginCard">
        {/* <h1>Login here</h1> */}
     
          
              <h3>Digital Accounting Manual System</h3>
              <br/>
              <br/>
        
           
                <label>
                  User Name 
                </label>
                <br/>
              
              
                <InputText
                  value={username}
                  pattern={emailRegex}required
                  style={{borderRadius:"2px",width:"80%",height:"40px"}}
                  onChange={(e) => usernameupdate(e.target.value)}
                  className="form-control"
                ></InputText>
               <br/>
               <br/>
          
                <label>
                  Password 
                </label>
                <br/>
              

                <InputText
                  type="password"
                  style={{borderRadius:"2px",width:"80%",height:"40px"}}
                  // pattern={ passwordPattern}required
                  value={password}
                  onChange={(e) => passwordupdate(e.target.value)}
                  className="form-control"
                >
                 
                
                </InputText>
                <br/>
                <br/>

                <Link className="btn btn-success" to={'/reset'}>
                Forgot Password ?
              </Link>
         <br/>
         <br/>



              <button type="submit"  style={{borderRadius:"2px"}} className="p-button-sm btn btn-primary">
                Login
              </button>{" "}
            
              {/* <Button  style={{borderRadius:"2px"}} className="p-button-sm btn btn-primary"onClick={SignUp}>SignUp</Button> */}



  
              |<Link className="btn btn-success" to={"/register"}>
                Add New User
              </Link>

            
                  


             
                  
          
              </Card>
        </form>
       

        </>
        
   
   
  );
};

export default Login;










// // 

// import React, {  useRef,useEffect  } from "react";
// import { InputText } from "primereact/inputtext";
// import { Card } from "primereact/card";

// import { Button } from "primereact/button";
// import { useState } from "react";
// import { Toast } from "primereact/toast";
// import { useNavigate, NavLink } from "react-router-dom";

// function UserDetails() {
//   const [userName, setUserName] = useState("");
//   const [oldPassword, setOldPassword] = useState("");
//   const [newPassword, setNewPassword] = useState("");
 

//   const toast = useRef(null);
//   const navigate = useNavigate();
  
//   const [changeColor, setChangeColor] = useState(false);
//   const [changeColor1, setChangeColor1] = useState(false);
//   const [errorMessage, setErrorMessage] = useState('');
//   const [emailerrorMessage, setEmailErrorMessage] = useState('');
//   const [empiderrorMessage, setEmpidErrorMessage] = useState('');
//   const [createdBy,  setLoginUser] = useState();

//   const cities = [{ name: "Admin" }, { name: "Viewer" }, { name: "Reviewer" }];

//   const handleClick = () => {
//     setChangeColor(!changeColor);
//   };


//   const handleClick1 = () => {
//     setChangeColor1(!changeColor1);
//   };






//   const handleChange = (event) => {
//     const value = event.target.value;
//     setUserName(value);
//     const pattern = /^[A-Za-z\s]+$/;

//     if (!pattern.test(value)) {
//       setErrorMessage(<span style={{ color: 'red' }}> Field must contain only letters and spaces.</span>);
//     } else {
//       setErrorMessage('');
//     }
//   };





//   const handleEmail = (event) => {
//     const value = event.target.value;
//     setOldPassword(value);
//     // const emailpattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

//     // if (!emailpattern.test(value)) {
//     //   setEmailErrorMessage(<span style={{ color: 'red' }}>Please enter a valid email address.</span>);
//     // } else {
//     //   setEmailErrorMessage('');
//     // }
//   };



  
//   const EmployeeID = (event) => {
//     const value = event.target.value;
//     setNewPassword(value);
//     // const pattern = /^[A-Za-z0-9]+$/;

//     // if (!pattern.test(value)) {
//     //   setEmpidErrorMessage(<span style={{ color: 'red' }}> Field must contain only Alphanumeric Charactor.</span>);
//     // } else {
//     //   setEmpidErrorMessage('');
//     // }
//   };




// //   const isFormIncomplete =
// //     !userName || !emailId || !empId || !status || !userRole;










//   const onSubmit = (e) => {
//     e.preventDefault();

//     // Perform submit logic here
//     if (e.isValidEmail) {
//       // Proceed with form submission or update
//       // console.log('Form submitted:', value);
//     } else if (e.isValid) {
//       // Display an error message or handle invalid form input
//       console.log('Invalid form input');
//     } else if (e.isValidUser) {

//     }


//   };

//   function saveUser() {
//     console.warn({  userName,oldPassword,newPassword, });
//     let data = {
//       userName,
//       oldPassword,
//       newPassword,

   
//     };

//     console.log(data, "all data");

//     fetch(` ${process.env.REACT_APP_API_KEY}/dam/user/foragetPassword`, {
//       method: "POST",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(data),
//     }).then(
//       (result) => {
//         if (result.status === 200) {
//           console.warn("result...!!!", result);
//           result.json().then((resp) => {
//             console.warn("resp", resp);
//           });

//           toast.current.show({
//             severity: "success",
//             summary: "Password Reset",
//             detail: "Password reset Successfully",
//             life: 6000,
//           });
//           setTimeout(() => {
//             navigate("/");
//           }, 1000);
//         } else {
//           toast.current.show({
//             severity: "warn",
//             summary: "Password Not Reset",
//             detail: "Error while Reset Password",
//             life: 6000,
//           });
//         }

//       },
//       (error) => {
//         toast.current.show({
//           severity: "error",
//           summary: "User Not Added",
//           detail: "Error while Adding User",
//           life: 6000,
//         });
//       }
//     );
//   }

//   function Cancel() {
//     navigate("/");
//   }





//   return (
//     <div>

//       <Toast ref={toast} />
      
    

//       <Card style={{width:"40%",marginLeft:"30%"}}>


//       <div className="card-header">
//     <h3>User Registeration</h3>
//      </div>
//      <div className="card-body">
//           <form onSubmit={onSubmit}>
//             <div class="formgrid grid">
//               <div class="field col-12">
//                 <label for="lastname2">User Name</label>

//                 <br />


//                 <InputText
//                   style={{ height: "55%", width: "90%", borderRadius: "2px" }}
//                   value={userName}
//                   placeholder="User Name"

//                   onChange={handleChange}
                  

//                 />
//                   {errorMessage && <div>{errorMessage}</div>}
                
//               </div>
// <br/>
//               <div class="field col-12">
//                 <label for="lastname2">Old Password</label>

//                 <br />


//                 <InputText
//                   style={{ height: "55%", width: "90%", borderRadius: "2px" }}
//                   value={oldPassword}
//                   placeholder="Old Password"
//                   onChange={handleEmail}
//                 />
//                {emailerrorMessage && <div>{emailerrorMessage}</div>}
            
//               </div>

//               <div class="field col-12">
//                 <label for="lastname2">New Password</label>

//                 <br />

//                 <InputText
//                   style={{ height: "55%", width: "90%", borderRadius: "2px" }}
//                   value={newPassword}
//                   placeholder="New Password"
//                   onChange={EmployeeID}
//                 />
//                   {empiderrorMessage && <div>{empiderrorMessage}</div>}
                
             
//               </div>

//             </div>


//           </form>
//           </div>
       
//         <br />
//         <br />

//         <div className="card-footer">
//         {/* <span style={{ float: "right" }}> */}
//           <button
//             label="Cancel"
            
//             onMouseDown={handleClick}
//             onClick={Cancel}
//          className="btn btn-primary p-button-sm"
//             // className={`text-black p-button-sm  ${changeColor === true ? "blue text-white" : "bg-white"
//             //   }`}
//         >Cancel</button>&nbsp;

//           <Button
//             style={{

//               color: "#203570",
//               marginTop: "7%",
//               borderRadius: "2px",
//             }}
//             label="Submit"
//             onMouseDown={handleClick1}
//             className={`text-black p-button-sm  ${changeColor1 === true ? "blue text-white" : "bg-white"
//               }`}
//             // disabled={isFormIncomplete}
//             onClick={saveUser}
//           />
//         {/* </span> */}
//         </div>
//         </Card>
//     </div>
//   );
// }

// export default UserDetails;



// import React, { useState, useRef } from 'react';
// import { ConfirmDialog } from 'primereact/confirmdialog';
// import { Button } from 'primereact/button';
// import { Toast } from 'primereact/toast';

// const ConfirmDialogDemo = () => {
//   const toast = useRef(null);
//   const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);

//   const accept = () => {
//     handleDelete();
//     toast.current.show({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted', life: 3000 });
//     setShowConfirmationDialog(false);
//   };

//   const reject = () => {
//     toast.current.show({ severity: 'warn', summary: 'Rejected', detail: 'Delete operation canceled', life: 3000 });
//     setShowConfirmationDialog(false);
//   };

//   const handleDelete = () => {
//     // Perform delete operation
//     console.log("Record deleted.");
//     // Your custom delete logic here
//   };

//   const confirmDelete = () => {
//     setShowConfirmationDialog(true);
//   };

//   return (
//     <div>
//       <Toast ref={toast} />

//       <div className="card">
//         <ConfirmDialog
//           visible={showConfirmationDialog}
//           onHide={() => setShowConfirmationDialog(false)}
//           message="Do you want to delete this record?"
//           header="Delete Confirmation"
//           icon="pi pi-info-circle"
//           acceptClassName="p-button-danger"
//           accept={accept}
//           reject={reject}
//         />

//         <h5>Delete Record</h5>
//         <Button onClick={confirmDelete} icon="pi pi-times" label="Delete" className="p-button-danger" />
//       </div>
//     </div>
//   );
// };

// export default ConfirmDialogDemo;


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
//             background: "rgba(0, 0, 0, 0.8)",
//             zIndex: 9999,
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             color: "white",
//             fontSize: "24px",
//           }}
//         >
//           Your account has been locked due to multiple incorrect login attempts. Please try again after {secondsRemaining} seconds.
//         </div>
//       )}
//       {!isScreenLocked && (
//         <form onSubmit={proceedLogin}>
//           <Card style={{ borderRadius: "2px" }} className="loginCard">
//             {/* Rest of the component code */}
//           </Card>
//         </form>
//       )}
//     </>
//   );
// };

// export default Login;
