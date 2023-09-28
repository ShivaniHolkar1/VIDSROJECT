

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";

const Login = () => {
  const [username, usernameupdate] = useState("");
 

  const usenavigate = useNavigate();
 
  const login_url = "https://login-stg.pwc.com/openam/oauth2/authorize";
  const reponse_type = "code";
  const client_id = "urn:ipzyatgcaswv001.pwcglb.com";
  const redirect_url = "https://ipzyatgcaswv001.pwcglb.com";
  const scope = "openid";
  const grant_type = "authorization_code";
  const secret = "NymifqabiwKnfD7BeHcR";
  const access_token = "https://login-stg.pwc.com/openam/oauth2/access_token";
  const user_info = "https://login-stg.pwc.com/openam/oauth2/userinfo";
  const REACT_APP_API_KEY = "https://ipzyatgcaswv001.pwcglb.com/api";


  useEffect(() => {
    sessionStorage.clear();
    const queryParams = new URLSearchParams(window.location.search);
    const code = queryParams.get("code");

    if (code) {
      getAccessToken(code);
    } else {
      const loginUrl = `${login_url}?response_type=${reponse_type}&client_id=${client_id}&redirect_uri=${redirect_url}&scope=${scope}`;
      window.location.href = loginUrl;
    }
  }, []);

  function getAccessToken(code) {
    // console.log("code: ", code);
    const data = new URLSearchParams({
      code: code,
      redirect_uri: redirect_url,
      grant_type: grant_type,
      client_id: client_id,
      client_secret: secret,
    });

    axios
      .post(access_token, data)
      .then((response) => {
        ProceedLogin(response.data);
      })
      .catch((error) => {
        console.error(error);
        alert("Error while getting userinfo");
      });
  }

  function getTokenInfo(token) {
    try {
      return jwt_decode(token);
    } catch (error) {
      return null;
    }
  }

  function ProceedLogin(data) {
    // e.preventDefault();
    // console.log("token data: ",data);

    const allUserData = getTokenInfo(data.id_token);
// console.log("extracted token data: ",allUserData);
    usernameupdate(allUserData.upn);

    if (true) {
      fetch(
        `${process.env.REACT_APP_API_KEY}/dam/user/email/` + allUserData.upn
      )
        .then((res) => {
          return res.json();

        })
        .then((resp) => {
          // console.log(resp, "///////////");
          // console.log("userData: ",resp);
          
         
            sessionStorage.setItem("userName", resp.emailId);
            sessionStorage.setItem("userrole", resp.userRole);

            if (resp.userRole === "Admin" && resp.status === true) {
              usenavigate("/dashboardMain");
            } else if (resp.userRole === "Reviewer" && resp.status === true) {
              usenavigate("/reviewermain");
            } else if (resp.userRole === "Viewer" && resp.status === true) {
              usenavigate("/bookmarkdoc");
            } else {
               alert("incorrect credentials...!!")
            }
          
        })
        .catch((err) => {
          const logoutUrl = "https://login-stg.pwc.com/openam/UI/Logout";
          window.location.href = logoutUrl;
        });
    }
  }

  const validate = () => {
    let result = true;
    if (username === "" || username === null) {
      result = false;
      //   toast.warning("Please Enter Username");
    }
    // if (password === "" || password === null) {
    //   result = false;
    //   //   toast.warning("Please Enter Password");
    // }
    return result;
  };

  // return (
  //   <Card style={{ height: "800px" }}>
  //     <form onSubmit={ProceedLogin}>
  //       <Card className="loginCard">
  //         {/*
  //             <h2>User Login</h2>
  //        */}
  //         <label>User Name</label>
  //         <br />
  //         <InputText
  //           value={username}
  //           onChange={(e) => usernameupdate(e.target.value)}
  //           className="form-control"
  //         ></InputText>
  //         <br />
  //         <label>Password</label>
  //         <br />
  //         <InputText
  //           type="password"
  //           value={password}
  //           onChange={(e) => passwordupdate(e.target.value)}
  //           className="form-control"
  //         ></InputText>
  //         <br />
  //         <Button type="submit" className="btn btn-primary">
  //           Login
  //         </Button>{" "}
  //         |
  //         <Link className="btn btn-success" to={"/register"}>
  //           New User
  //         </Link>
  //       </Card>
  //     </form>
  //   </Card>
  // );
};

  // return <div>{/* your display component JSX here */}</div>;


export default Login;