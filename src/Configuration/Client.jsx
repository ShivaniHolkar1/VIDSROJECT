
// import React, { useState } from "react";
// import { InputText } from "primereact/inputtext";
// import { Button } from "primereact/button";
// import { Card } from "primereact/card";

// const Client = () => {
//   const [state, setState] = useState("white");
//   const [show, setShow] = useState(false);
//   const [days, setDays] = useState("");
//   const [errors, setErrors] = useState({});
//   const [changeColor, setChangeColor] = useState(false);
//   const [changeColor1, setChangeColor1] = useState(false);
//   const handleClick = () => {
//     setChangeColor(!changeColor);
//   };

//   const handleClick1 = () => {
//     setChangeColor1(!changeColor1);
//   };


//   function Allfun(e){
//      myfun();
//      myfun1();
//      myfun2();
//      myfun3();
//      myfun4();
//      myfun5();
//      myfun6();


     

//      const validateForm = () => {
//       let errors = {};
//       let isValid = true;
  
//        if (!days) {
//         errors.days = "This Field is required. ";
//         isValid = false;
//     };

//     setErrors(errors);
//     return isValid;
//   };


//      if (validateForm()) {
//       console.log("Valid form submitted:", { days});
//     }
    
//     e.preventDefault();


//   }


//   function myfun() {
//     if (state === "white") {
//       setState("red");
//     } else {
//       setState("red");
//     }
//   }

//   function myfun1() {
//     if (state === "yellow") {
//       setState("green");
//     } else {
//       setState("green");
//     }
//   }

//   function myfun2() {
//     if (state === "yellow") {
//       setState("grey");
//     } else {
//       setState("grey");
//     }
//   }

//   function myfun3() {
//     if (state === "yellow") {
//       setState("blue");
//     } else {
//       setState("blue");
//     }
//   }

//   function myfun4() {
//     if (state === "yellow") {
//       setState("pink");
//     } else {
//       setState("pink");
//     }
//   }

//   function myfun5() {
//     if (state === "yellow") {
//       setState("violet");
//     } else {
//       setState("violet");
//     }
//   }

//   function myfun6() {
//     if (state === "yellow") {
//       setState("orange");
//     } else {
//       setState("orange");
//     }
//   }


//   return (
//     <div>
//       <Card
//         style={{
//           borderLeft: "8px solid #49ABA0 ",
//           backgroundColor: "#F3F3F3",
//           height: "270px",
//           width: "95%",
//         }}
//         className="configCard"
//       >
        
//         <Button
//           icon="pi pi-external-link"
//           className="p-button-rounded p-button-outlined"
//         />
//         <br />
//         <br />
        

//         <div className="field">
//           <label htmlFor="username1" className="block">
//             No.of Days For Expiry
//           </label>
//           <InputText
//            name={days}
//             style={{ width: "250px" }}
//             id="username1"
//             aria-describedby="username1-help"
//             className=" p-inputtext-sm block"
//             onChange={(e) => {
//               setDays(e.target.value);
//             }}
//           />
//           {errors.days && (
//           <div style={{ color: "red" }}>{errors.days}</div>
//           )}
//           </div>

//         <label>Choose Client Color</label>
//         <br />
//         <br />
//         <div style={{ display: "flex" }}>
//           <div
//             style={{
//               width: "20px",
//               height: "20px",
//               borderRadius: "50%",
//               backgroundColor: state,
//             }}
//           >
//             S
//           </div>
//           &nbsp;&nbsp;
//           <i
//             className="pi pi-plus-circle"
//             onClick={() => setShow(!show)}
//             style={{ fontSize: "1.5rem" }}
//           >
//             {show === true ? "" : ""}
//           </i>
//           &nbsp;&nbsp;
//           {show && (
//             <div style={{ display: "flex" }}>
//               <div
//                 style={{
//                   width: "20px",
//                   height: "20px",
//                   borderRadius: "50%",
//                   backgroundColor: "red",
//                 }}
//                 onClick={myfun}
//               ></div>
//               &nbsp;&nbsp;
           
//               <div
//                 style={{
//                   width: "20px",
//                   height: "20px",
//                   borderRadius: "50%",
//                   backgroundColor: "green",
//                 }}
//                 onClick={myfun1}
//               ></div>
//               &nbsp;&nbsp;
//               <div
//                 style={{
//                   width: "20px",
//                   height: "20px",
//                   borderRadius: "50%",
//                   backgroundColor: "grey",
//                 }}
//                 onClick={myfun2}
//               ></div>
//               &nbsp;&nbsp;
//               <div
//                 style={{
//                   width: "20px",
//                   height: "20px",
//                   borderRadius: "50%",
//                   backgroundColor: "blue",
//                 }}
//                 onClick={myfun3}
//               ></div>
//               &nbsp;&nbsp;
//               <div
//                 style={{
//                   width: "20px",
//                   height: "20px",
//                   borderRadius: "50%",
//                   backgroundColor: "pink",
//                 }}
//                 onClick={myfun4}
//               ></div>
//               &nbsp;&nbsp;
//               <div
//                 style={{
//                   width: "20px",
//                   height: "20px",
//                   borderRadius: "50%",
//                   backgroundColor: "violet",
//                 }}
//                 onClick={myfun5}
//               ></div>
//               &nbsp;&nbsp;
//               <div
//                 style={{
//                   width: "20px",
//                   height: "20px",
//                   borderRadius: "50%",
//                   backgroundColor: "orange",
//                 }}
//                 onClick={myfun6}
//               ></div>
//               &nbsp;&nbsp;
//             </div>
//           )}
//         </div>

       
//       </Card>
//       <br/>
//       <br/>
//       <br/>
//       <Button
//         style={{ marginLeft: "86%", color: "#203570" }}
//         label="Reset"
        
//         onMouseDown={handleClick}
//         className={`text-black p-button-sm  ${
//           changeColor === true ? "bg-blue-800 text-white" : "bg-white"
//         }`}
//       />
//       <Button
//         style={{ float: "right", color: "#203570" }}
//         onClick={Allfun}
//         label="Save"
       
//         onMouseDown={handleClick1}
//         className={`text-black p-button-sm  ${
//           changeColor1 === true ? "bg-blue-800 text-white" : "bg-white"
//         }`}
//       />
//     </div>
//   );
// };

// export default Client;




import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Card } from "primereact/card";

const Client = () => {
  const [state, setState] = useState("white");
  const [show, setShow] = useState(false);
  const [days, setDays] = useState("");
  const [errors, setErrors] = useState({});
  const [changeColor, setChangeColor] = useState(false);
  const [changeColor1, setChangeColor1] = useState(false);
  const handleClick = () => {
    setChangeColor(!changeColor);
  };

  const handleClick1 = () => {
    setChangeColor1(!changeColor1);
  };


  function Allfun(e){
     myfun();
     myfun1();
     myfun2();
     myfun3();
     myfun4();
     myfun5();
     myfun6();


     

     const validateForm = () => {
      let errors = {};
      let isValid = true;
  
       if (!days) {
        errors.days = "This Feild is required. ";
        isValid = false;
    };

    setErrors(errors);
    return isValid;
  };


     if (validateForm()) {
      console.log("Valid form submitted:", { days});
    }
    
    e.preventDefault();


  }


  function myfun() {
    if (state === "white") {
      setState("red");
    } else {
      setState("red");
    }
  }

  function myfun1() {
    if (state === "yellow") {
      setState("green");
    } else {
      setState("green");
    }
  }

  function myfun2() {
    if (state === "yellow") {
      setState("grey");
    } else {
      setState("grey");
    }
  }

  function myfun3() {
    if (state === "yellow") {
      setState("blue");
    } else {
      setState("blue");
    }
  }

  function myfun4() {
    if (state === "yellow") {
      setState("pink");
    } else {
      setState("pink");
    }
  }

  function myfun5() {
    if (state === "yellow") {
      setState("violet");
    } else {
      setState("violet");
    }
  }

  function myfun6() {
    if (state === "yellow") {
      setState("orange");
    } else {
      setState("orange");
    }
  }

  const [state1, setState1] = React.useState({days:""});
  
  function reset(e) {
    e.preventDefault();

    setState1({ days:"" });

  }




  function saveData()
{
  let data={days,state}
// console.warn(data);
  fetch(`${process.env.REACT_APP_API_KEY}/dam/Configurations/clientConfiguration`, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body:JSON.stringify(data)
  }).then((resp)=>{
    // console.warn("resp",resp);;
    resp.json().then((result)=>{
      console.warn("result",result)
    })
  })
}
  return (
    <div style={{height:"400px"}}>
       <br/>
      <Card
        style={{
          borderLeft: "8px solid #49ABA0 ",
          backgroundColor: "#F3F3F3",
         
          marginLeft:"2%",
          width: "95%",
          borderRadius:"2px"
        }}
        className="configCard"
      >
        


        <Button
          icon="pi pi-external-link"
          className="p-button-rounded p-button-outlined"
        />
        <br/>
<br/>
        

        <div className="field">
          <label style={{color:"black"}}  htmlFor="username1" className="block">
            No.of Days For Expiry
          </label>
          <InputText
           name={days}
           value={days}
            style={{ width: "250px" }}
            id="username1"
            aria-describedby="username1-help"
            className=" p-inputtext-sm block"
            onChange={(e) => {
              setDays(e.target.value);
            }}
            // onChange={(e) => {
            //   setState1({ ...state1, days: e.target.value });
            // }}
          />
          {errors.days && (
          <div style={{ color: "red" }}>{errors.days}</div>
          )}
          </div>


        <label style={{color:"black"}} >Choose Client Color</label>
        <br />
        <br />
        <div style={{ display: "flex" }}>
          <div
            style={{
              width: "20px",
              height: "20px",
              borderRadius: "50%",
              backgroundColor: state,
            }}
          >
            S
          </div>
          &nbsp;&nbsp;
          <i
            className="pi pi-plus-circle"
            onClick={() => setShow(!show)}
            style={{ fontSize: "1.5rem" }}
          >
            {show === true ? "" : ""}
          </i>
          &nbsp;&nbsp;
          {show && (
            <div style={{ display: "flex" }}>
              <div
                style={{
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  backgroundColor: "red",
                }}
                onClick={myfun}
              ></div>
              &nbsp;&nbsp;
           
              <div
                style={{
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  backgroundColor: "green",
                }}
                onClick={myfun1}
              ></div>
              &nbsp;&nbsp;
              <div
                style={{
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  backgroundColor: "grey",
                }}
                onClick={myfun2}
              ></div>
              &nbsp;&nbsp;
              <div
                style={{
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  backgroundColor: "blue",
                }}
                onClick={myfun3}
              ></div>
              &nbsp;&nbsp;
              <div
                style={{
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  backgroundColor: "pink",
                }}
                onClick={myfun4}
              ></div>
              &nbsp;&nbsp;
              <div
                style={{
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  backgroundColor: "violet",
                }}
                onClick={myfun5}
              ></div>
              &nbsp;&nbsp;
              <div
                style={{
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  backgroundColor: "orange",
                }}
                onClick={myfun6}
              ></div>
              &nbsp;&nbsp;
            </div>
          )}
        </div>
      </Card>
      <br/>
      <br/>
      <br/>

      <div style={{display:"flex", marginLeft: "85%"}}>
      
      <Button
       style={{ borderRadius:"2px", color: "#203570",marginRight: "5%" }}
        label="Reset"
        onClick={reset}
        onMouseDown={handleClick}
        className={`text-black p-button-sm  ${
          changeColor === true ? "bg-blue-800 text-white" : "bg-white"
        }`}
      />
 
  <Button
        style={{ borderRadius:"2px", color: "#203570" }}
        onClick={Allfun}
        label="Save"
        onMouseUp={handleClick1}
        onMouseDown={saveData}
        className={`text-black p-button-sm  ${
          changeColor1 === true ? "bg-blue-800 text-white" : "bg-white"
        }`}
      />
        </div>




     
    </div>
  );
};

export default Client;