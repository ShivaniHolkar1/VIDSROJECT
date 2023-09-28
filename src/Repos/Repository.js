import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { useFormik } from "formik";
import { classNames } from "primereact/utils";
import { useNavigate } from "react-router";

function Display() {
  const navigate = useNavigate();


  const isFormFieldValid = (username) =>
    !!(formik.touched[username] && formik.errors[username]);

  const getFormErrorMessage = (username) => {
    return (
      isFormFieldValid(username) && (
        <small className="p-error">{formik.errors[username]}</small>
      )
      
    );
   
  };
 


  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },

    validate: (data) => {
      let errors = {};

      if (!data.username) {
        errors.username = "Name is required.";
      }

      if (!data.password) {
        errors.password = "Email is required.";
      }
    },

    onSubmit: (data) => {
    
      console.log(data, "user data");
      if (data.username === "Admin" && data.password === "admin") {
        localStorage.setItem("role", "Admin");
        navigate("/dashboardMain");
        window.location.reload(false);
      } else if (data.username === "Reviewer" && data.password === "reviewer") {
        localStorage.setItem("role", "Reviewer");
        
        navigate("/reviewermain");
       window.location.reload(false);
      
        
      } else if (data.username === "Viewer" && data.password === "viewer") {
        localStorage.setItem("role", "Viewer");
        navigate("/bookmarkdoc");
        window.location.reload(false);
      }
    },
    
  });
  

  return (
    <div>
      <Card className="loginCard">
        <h2>Login Here......</h2>
        <form onSubmit={formik.handleSubmit} className="p-fluid loginForm">
          <div>
            <label htmlFor="name">username</label>

            <InputText
               id="username"
                name="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              className={classNames({
                "p-invalid": isFormFieldValid("username"),
              })}
              autoFocus
            />
            {getFormErrorMessage("username")}
          </div>

          <div>
            <label htmlFor="name">Password</label>

            <InputText
               id="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              autoFocus
            />
          </div>

          <Button type="submit" label="Submit" className="submitButton" />
        </form>
      </Card>
    </div>
  );
}

export default Display;



// import React, { useState, useEffect } from "react";
// import { InputText } from "primereact/inputtext";
// import { Button } from "primereact/button";
// import { useNavigate } from "react-router";


// function LoginForm() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();


//   const handleEmailChange = (e) => setEmail(e.target.value);
//   const handlePasswordChange = (e) => setPassword(e.target.value);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     localStorage.setItem("email", email);
//     localStorage.setItem("password", password);
//   };

//   useEffect(() => {
//     const storedEmail = localStorage.getItem("email");
//     const storedPassword = localStorage.getItem("password");

//     if (storedEmail && storedPassword) {
//       setEmail(storedEmail);
//       setPassword(storedPassword);
//     }
//     navigate("/dashboardMain");
    
    
//   }, []);

//   return (
//     <form onSubmit={handleSubmit}>
//       <InputText type="email" value={email} onChange={handleEmailChange} />
//       <InputText type="password" value={password} onChange={handlePasswordChange} />
//       <Button type="submit">Login</Button>
//     </form>
//   );
// }
// export default LoginForm;