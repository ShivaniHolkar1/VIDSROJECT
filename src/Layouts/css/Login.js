


// import { useEffect, useState ,useRef} from "react";
// import { Link, NavLink, useNavigate } from "react-router-dom";
// import { Card } from "primereact/card";
// import { InputText } from "primereact/inputtext";

import { Link, NavLink, Navigate } from "react-router-dom"

// import { Toast } from "primereact/toast";



// const Login = () => {
//   const [userName, usernameupdate] = useState("");
//   const [password, passwordupdate] = useState("");
//   const toast = useRef(null);


//   const usenavigate = useNavigate();

//   useEffect(() => {
//     sessionStorage.clear();
  
//   }, []);

//   const emailRegex =
//     "^[A-Za-z0-9._%+-]+[@]{1}[A-Za-z0-9.-]+[.]{1}[A-Za-z]{2,4}$";
// const ProceedLogin = (e) => {
//     e.preventDefault();
//     if (validate()) {
//         let data = {
//           userName,
//           password,
         
//         };
    
//         console.log(data, "all data");
    
//         fetch(` ${process.env.REACT_APP_API_KEY}/dam/user/login`, {
//           method: "POST",
//           headers: {
//             Accept: "application/json",
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(data),
//         })
//         // .then(
//         //   (result) => {
           
//         //   }

//         .then((res) => {
//           return res.json();
//         })
//         .then((resp) => {
//           // setUserName(resp.emailId)
//           console.log(resp, "//////////ppp/");

//           if (Object.keys(resp).length === 0) {
//             // toast.error("Please Enter valid username");
//           } else {
//             // if (resp.password === password) {
//             //     toast.success('Success');
//             //     sessionStorage.setItem('username',username);
//             //     sessionStorage.setItem('userrole',resp.role);
//             //     usenavigate('/')
//             // }else{
//             //     toast.error('Please Enter valid credentials');
//             // }

//             sessionStorage.setItem("userName", resp.userName);
//             sessionStorage.setItem("userrole", resp.userRole);
//             // sessionStorage.setItem("status", resp.status);
//             if (resp.userRole === "Admin" ) {
//               usenavigate("/dashboardMain");
//             } else if (resp.userRole === "Reviewer") {
//               usenavigate("/reviewermain");
//             } else if (resp.userRole === "Viewer") {
//               usenavigate("/bookmarkdoc");
//             } else {
//               alert("Incorrect credentials...!!");
//             }

          
//           }
//         })
//         .catch((err) => {
//           toast.error("Login Failed due to :" + err.message);
//         });
//     }





//   }

        
      
    
 
        
//     // }






//   //    fetch(`${process.env.REACT_APP_API_KEY}/dam/user/email/` + username)
//   //       .then((res) => {
//   //         return res.json();
//   //       })
//   //       .then((resp) => {
//   //         // setUserName(resp.emailId)
//   //         console.log(resp, "//////////ppp/");

//   //         if (Object.keys(resp).length === 0) {
//   //           // toast.error("Please Enter valid username");
//   //         } else {
//   //           // if (resp.password === password) {
//   //           //     toast.success('Success');
//   //           //     sessionStorage.setItem('username',username);
//   //           //     sessionStorage.setItem('userrole',resp.role);
//   //           //     usenavigate('/')
//   //           // }else{
//   //           //     toast.error('Please Enter valid credentials');
//   //           // }

//   //           sessionStorage.setItem("username", resp.emailId);
//   //           sessionStorage.setItem("userrole", resp.userRole);
//   //           // sessionStorage.setItem("status", resp.status);
//   //           if (resp.userRole === "Admin" ) {
//   //             usenavigate("/dashboardMain");
//   //           } else if (resp.userRole === "Reviewer") {
//   //             usenavigate("/reviewermain");
//   //           } else if (resp.userRole === "Viewer") {
//   //             usenavigate("/bookmarkdoc");
//   //           } else {
//   //             alert("Incorrect credentials...!!");
//   //           }

          
//   //         }
//   //       })
//   //       .catch((err) => {
//   //         toast.error("Login Failed due to :" + err.message);
//   //       });
//   //   }
//   // };

//   const validate = () => {
//     let result = true;
//     if (userName === "" || userName === null) {
//       result = false;
//       // toast.warning("Please Enter Username");
//     }
//     if (password === "" || password === null) {
//       result = false;
//       // toast.warning("Please Enter Password");
//     }
//     return result;
//   };
 
//   return (
//     // <Card style={{height:"100%",width:"100%"}} >
//     <>
//      <Toast ref={toast} />
//          <form onSubmit={ProceedLogin} >

     
//         <Card className="loginCard">
//         {/* <h1>Login here</h1> */}
     
          
//               <h3>Digital Accounting Manual System</h3>
//               <br/>
//               <br/>
        
           
//                 <label>
//                   User Name 
//                 </label>
//                 <br/>
              
              
//                 <InputText
//                   value={userName}
//                   pattern={emailRegex}required
//                   style={{borderRadius:"2px",width:"80%",height:"40px"}}
//                   onChange={(e) => usernameupdate(e.target.value)}
//                   className="form-control"
//                 ></InputText>
//                <br/>
//                <br/>
          
//                 <label>
//                   Password 
//                 </label>
//                 <br/>
              

//                 <InputText
//                   type="password"
//                   style={{borderRadius:"2px",width:"80%",height:"40px"}}
//                   // pattern={ passwordPattern}required
//                   value={password}
//                   onChange={(e) => passwordupdate(e.target.value)}
//                   className="form-control"
//                 >
                 
                
//                 </InputText>
//                 <br/>
//                 <br/>

//                 <Link className="btn btn-success" to={'/reset'}>
//                 Forgot Password ?
//               </Link>
//          <br/>
//          <br/>



//               <button type="submit"  style={{borderRadius:"2px"}} className="p-button-sm btn btn-primary">
//                 Login
//               </button>{" "}
            
//               {/* <Button  style={{borderRadius:"2px"}} className="p-button-sm btn btn-primary"onClick={SignUp}>SignUp</Button> */}



  
//               |<Link className="btn btn-success" to={"/register"}>
//                 Add New User
//               </Link>

            
                  


             
                  
          
//               </Card>
//         </form>
       

//         </>
        
   
   
//   );
// };

// export default Login;

















// import { useEffect, useState ,useRef} from "react";
// import { Link, NavLink, useNavigate } from "react-router-dom";
// import { Card } from "primereact/card";
// import { InputText } from "primereact/inputtext";

// import { Toast } from "primereact/toast";
// import { Button } from "primereact/button";



// const Login = () => {
//   const [userName, usernameupdate] = useState("");
//   const [password, passwordupdate] = useState("");
//   const toast = useRef(null);


//   const usenavigate = useNavigate();

//   useEffect(() => {
//     sessionStorage.clear();
  
//   }, []);

//   const emailRegex =
//     "^[A-Za-z0-9._%+-]+[@]{1}[A-Za-z0-9.-]+[.]{1}[A-Za-z]{2,4}$";
// const ProceedLogin = (e) => {
//     e.preventDefault();
//     if (validate()) {

//          let data = {
//           userName,
//           password,
         
//         };
//       fetch(` ${process.env.REACT_APP_API_KEY}/dam/user/login`, {
//                   method: "POST",
//                   headers: {
//                     Accept: "application/json",
//                     "Content-Type": "application/json",
//                   },
//                   body: JSON.stringify(data),
//                 })
      
//   .then((res) => {
//           return res.json();
//         })
//         .then((resp) => {
//           // setUserName(resp.emailId)
//           console.log(resp, "//////////ppp/");







//           // setUserName(resp.emailId)
//           // console.log(resp, "//////////ppp/");

//           if (Object.keys(resp).length === 0) {
//             // toast.error("Please Enter valid username");
//           } else {
//             // if (resp.password === password) {
//             //     toast.success('Success');
//             //     sessionStorage.setItem('username',username);
//             //     sessionStorage.setItem('userrole',resp.role);
//             //     usenavigate('/')
//             // }else{
//             //     toast.error('Please Enter valid credentials');
//             // }

//             sessionStorage.setItem("userName", resp.userName);
//             sessionStorage.setItem("userrole", resp.userRole);
//             // sessionStorage.setItem("status", resp.status);
//             if (resp.userRole === "Admin" ) {
//               usenavigate("/dashboardMain");
//             } else if (resp.userRole === "Reviewer") {
//               usenavigate("/reviewermain");
//             } else if (resp.userRole === "Viewer") {
//               usenavigate("/bookmarkdoc");
//             } else {
//               alert("Incorrect credentials...!!");
//             }

          
//           }
//         })
//         .catch((err) => {
//           toast.error("Login Failed due to :" + err.message);
//         });
//     }
//   };

//   const validate = () => {
//     let result = true;
//     if (userName === "" || userName === null) {
//       result = false;
//       toast.warning("Please Enter UserName");
//     }
//     if (password === "" || password === null) {
//       result = false;
//       toast.warning("Please Enter Password");
//     }
//     return result;
//   };
//   // const resetpage=()=>{
//   //   usenavigate("/reset");
//   // }
 
//   return (
//     // <Card style={{height:"100%",width:"100%"}} >
//     <>
//      <Toast ref={toast} />
//          <form onSubmit={ProceedLogin} >

     
//         <Card className="loginCard">
//         {/* <h1>Login here</h1> */}
     
//         <div className="card-header">
//               <h3>Digital Accounting Manual System</h3>
//               </div>
//               <br/>
//               <div className="card-body">
           
//                 <label>
//                   User Name 
//                 </label>
//                 <br/>
              
              
//                 <InputText
//                   value={userName}
//                   // pattern={emailRegex}required
//                   style={{borderRadius:"2px",width:"80%",height:"40px"}}
//                   onChange={(e) => usernameupdate(e.target.value)}
//                   className="form-control"
//                 ></InputText>
//                <br/>
//                <br/>
          
//                 <label>
//                   Password 
//                 </label>
//                 <br/>
              

//                 <InputText
//                   type="password"
//                   style={{borderRadius:"2px",width:"80%",height:"40px"}}
//                   // pattern={ passwordPattern}required
//                   value={password}
//                   onChange={(e) => passwordupdate(e.target.value)}
//                   className="form-control"
//                  />
//                 <br/>
//                 <br/>
              
  
//                 <Link  to={"/reset"}>
//               Forgot Password ?
//               </Link>
              

//               {/* <Link to="/aboutpage">Go to About Page</Link> */}

//                  {/* <Button label="Forgot password"onclick={resetpage} className="p-button-link" /> */}

             
//                  </div>
                
                
// {/* 
//                <div className="card-footer"> */}


//               <button type="submit"  style={{borderRadius:"2px"}} className="p-button-sm btn btn-primary">
//                 Login
//               </button>{" "}
            
             

//           |<Link className="btn btn-success" to={"/reset"}>
//               Add New User
//               </Link>|
//               <Link className="btn btn-success" to={"/register"}>
//               Add New User
//               </Link>

//               {/* </div> */}
            
                  


             
                  
          
//               </Card>
//         </form>
       
       
//         </>
        
   
   
//   );
// };

// export default Login;









// import { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

// const Login = () => {
//   const [userName, usernameupdate] = useState("");
//   const [password, passwordupdate] = useState("");

//   const usenavigate = useNavigate();

//   useEffect(() => {
//     sessionStorage.clear();
//   }, []);

//   const ProceedLogin = (e) => {
//     e.preventDefault();
//     if (validate()) {
//       ///implentation
//       // console.log('proceed');
//       fetch(`${process.env.REACT_APP_API_KEY}/dam/user/login`)
//         .then((res) => {
//           return res.json();
//         })
//         .then((resp) => {
//           //console.log(resp)
//           if (Object.keys(resp).length === 0) {
//             toast.error("Please Enter valid username");
//           } else {
//             // if (resp.password === password) {
//             //   toast.success("Success");
//             //   sessionStorage.setItem("username", username);
//             //   sessionStorage.setItem("userrole", resp.role);
//             //   usenavigate("/");
//             // } else {
//             //   toast.error("Please Enter valid credentials");
//             // }




//             sessionStorage.setItem("userName", resp.userName);
//             sessionStorage.setItem("userrole", resp.userRole);
//             // sessionStorage.setItem("status", resp.status);
//             if (resp.userRole === "Admin" ) {
//               usenavigate("/dashboardMain");
//             } else if (resp.userRole === "Reviewer") {
//               usenavigate("/reviewermain");
//             } else if (resp.userRole === "Viewer") {
//               usenavigate("/bookmarkdoc");
//             } else {
//               alert("Incorrect credentials...!!");
//             }

//           }
//         })
//         .catch((err) => {
//           toast.error("Login Failed due to :" + err.message);
//         });
//     }
//   };

//   const ProceedLoginusingAPI = (e) => {
//     e.preventDefault();
//     if (validate()) {
//       ///implentation
//       // console.log('proceed');
//       let inputobj = { userName: userName, password: password };
//       fetch("https://localhost:44308/User/Authenticate", {
//         method: "POST",
//         headers: { "content-type": "application/json" },
//         body: JSON.stringify(inputobj),
//       })
//         .then((res) => {
//           return res.json();
//         })
//         .then((resp) => {
//           console.log(resp);
//           if (Object.keys(resp).length === 0) {
//             toast.error("Login failed, invalid credentials");
//           } else {
//             toast.success("Success");
//             sessionStorage.setItem("userName", userName);
//             sessionStorage.setItem("jwttoken", resp.jwtToken);
//             usenavigate("/");
//           }
//           // if (Object.keys(resp).length === 0) {
//           //     toast.error('Please Enter valid username');
//           // } else {
//           //     if (resp.password === password) {
//           //         toast.success('Success');
//           //         sessionStorage.setItem('username',username);
//           //         usenavigate('/')
//           //     }else{
//           //         toast.error('Please Enter valid credentials');
//           //     }
//           // }
//         })
//         .catch((err) => {
//           toast.error("Login Failed due to :" + err.message);
//         });
//     }
//   };
//   const validate = () => {
//     let result = true;
//     if (userName === "" || userName === null) {
//       result = false;
//       toast.warning("Please Enter Username");
//     }
//     if (password === "" || password === null) {
//       result = false;
//       toast.warning("Please Enter Password");
//     }
//     return result;
//   };
//   return (
//     <div className="row">
//       <div className="offset-lg-3 col-lg-6" style={{ marginTop: "100px" }}>
//         <form onSubmit={ProceedLogin} className="container">
//           <div className="card">
//             <div className="card-header">
//               <h2>User Login</h2>
//             </div>
//             <div className="card-body">
//               <div className="form-group">
//                 <label>
//                   User Name <span className="errmsg">*</span>
//                 </label>
//                 <input
//                   value={userName}
//                   onChange={(e) => usernameupdate(e.target.value)}
//                   className="form-control"
//                 ></input>
//               </div>
//               <div className="form-group">
//                 <label>
//                   Password <span className="errmsg">*</span>
//                 </label>
//                 <input
//                   type="password"
//                   value={password}
//                   onChange={(e) => passwordupdate(e.target.value)}
//                   className="form-control"
//                 ></input>
//                   <Link className="btn btn-success" to={"/reset"}>
//                 Forgot Password?
//               </Link>
//               </div>
//             </div>
//             <div className="card-footer">
//               <button type="submit" className="btn btn-primary">
//                 Login
//               </button>{" "}
//               |
//               <Link className="btn btn-success" to={"/register"}>
//                 New User
//               </Link>
            
//             </div>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;



function login(){
  return(
    <>
    <>about page</>

    <Link className="btn btn-success" to={"/register"}>
               New User
              </Link>
           <>
           <Link className="btn btn-success" to="/reset">
               New User
              </Link>
              <NavLink
  to="/reset"
 
></NavLink>
            
           </> 
    </>

  )
}
export default login