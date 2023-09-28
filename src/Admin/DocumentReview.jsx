import React, { useState, useEffect, useRef } from "react";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { Card } from "primereact/card";
import { NavLink, useParams } from "react-router-dom";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";

import { useNavigate } from "react-router-dom";
import leftIcon from "../Assets/lefticon.png";
import Background from "../Assets/Background.png";
import { Tag } from "primereact/tag";
import axios from "axios";
import plus from "../Assets/plus.png";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ProgressSpinner } from "primereact/progressspinner";

const Product = () => {
  const [section, setSection] = useState([]);
  const { docId } = useParams();
  const [keywords, setKeywords] = useState("");
  const [keyword, setKeyword] = useState("");
  const [displayBasic, setDisplayBasic] = useState(false);
  const [displayBasic1, setDisplayBasic1] = useState(false);
  const [displayBasic2, setDisplayBasic2] = useState(false);
  const [displayBasic3, setDisplayBasic3] = useState(false);
  const navigate = useNavigate();
  const toast = useRef(null);
  const [changeColor, setChangeColor] = useState(false);
  const [changeColor1, setChangeColor1] = useState(false);
  const [changeColor2, setChangeColor2] = useState(false);
  const [users, setUser] = useState([]);
  const [createdBy, setLoginUser] = useState();
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    setLoginUser(sessionStorage.getItem('emailId'));
    console.log("customerService.docId:", docId);
     getData(docId);

  }, []);
  const version = "version1";



  

  useEffect(() => {
    setLoginUser(sessionStorage.getItem('emailId'));
    getAllKeyword();
  
  }, []);


  const getAllKeyword =()=>{

    axios
    .get(`${process.env.REACT_APP_API_KEY}/document/listKeywords/${docId}/${version}`)
    .then((res) => {
      console.log("res: ",res);
      if(res.data[0].keywords){
      setUser(res.data[0].keywords);
    }

    });
  }
  
  console.warn(users, "/.//////////////////////////////////shivani");

  const handleClick = () => {
    setChangeColor(!changeColor);
  };
  const handleClick1 = () => {
    setChangeColor1(!changeColor1);
  };
  const handleClick2 = () => {
    setChangeColor2(!changeColor2);
  };

  //SAVE AS DRAFT
  function SaveasDraft() {
    let data ={
      createdBy
    }

    let reviwer=undefined;
    fetch(
      `${process.env.REACT_APP_API_KEY}/document/uploadSaveAsDraftById/${docId}/${reviwer}`,

      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    ).then(
      (result) => {
        console.warn("result...!!!", result);
        if (result.status === 200) {
          console.warn("result...!!!", result);
          result.json().then((resp) => {
            console.warn("resp", resp);
          });

          toast.current.show({
            severity: "success",
            summary: "Saved As Draft",
            detail: "Saved As Draft Successfully",
            life: 2000,
          });
          setTimeout(() => {
            navigate("/dashboardMain")
          }, 1300);
        } else {
          toast.current.show({
            severity: "warn",
            summary: "Document not Saved As Draft",
            detail: "Error while Document Saved As Draft",
            life: 2000,
          });
        }
      
      },
      (error) => {
        toast.current.show({
          severity: "error",
          summary: "Document not Saved As Draft",
          detail: "Error while Document Saved As Draft",
          life: 2000,
        });
      }
    );
  }

  //delete user
  function deleteUser(docId) {
 
    setLoading(true);
    if (docId) {
      
      let data ={
        createdBy
      }
      
      fetch(
        `${process.env.REACT_APP_API_KEY}/document/deleteDocument/${docId}`,
  
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })

        .then(
          (result) => {
            if (result.status === 200) {
              console.warn("result...!!!", result);
              result.json().then((resp) => {
                console.warn("resp", resp);
              });
              setLoading(false);
    
              toast.current.show({
                severity: "success",
                summary: "Document Deleted",
                detail: "Document Deleted Successfully",
                life: 2000,
              });
            
              setTimeout(() => {
                navigate("/UploadDocument");
              }, 1000);
            } else {
              setLoading(false);
              toast.current.show({
                severity: "warn",
                summary: "Document Not Deleted",
                detail: "Error while Deleted User",
                life: 2000,
              });
            }
          },
          (error) => {
            setLoading(false);
            toast.current.show({
              severity: "error",
              summary: "Document Not Deleted",
              detail: "Error while Deleted User",
              life: 2000,
            });
          }
        );
    
        // .then((res) => {


        //   console.log("deleted successfully");
        //   navigate("/UploadDocument");
        // });
    } else {
     

    
      navigate("/UploadDocument");
    }




  }

  const dialogFuncMap = {
    displayBasic: setDisplayBasic,
    displayBasic1: setDisplayBasic1,
    displayBasic2: setDisplayBasic2,
    displayBasic3: setDisplayBasic3,
  };

  const onClick = (name, position) => {
    console.log(position, "shivani.....");
    setKeyword(position);
    dialogFuncMap[`${name}`](true);
  };

  const onHide = (name) => {
    dialogFuncMap[`${name}`](false);
  };

 


  const renderFooter = (name) => {
    return (
      <div>
        <Button
          label="Cancel"
        
          style={{borderRadius:"2px",color: "#203570"}}
          onClick={() => onHide(name)}
          className="p-button-sm p-button-text"
        />
        <Button
          label="Submit"
          onClick={() => onHide(name)}
          onMouseDown={saveUser}
         
          disabled={isFormIncomplete}
          style={{ backgroundColor: "#203570", borderRadius: "2px" }}
          className="p-button-sm"
          autoFocus
        />

       
      </div>
    );
  };

  

//   const cancel=()=>{
// window.location.reload(false)
//   }


  //withdraw document
  const DeleteFooter = (name) => {
    return (
      <div>
        <Button
          label="No"
          style={{borderRadius:"2px",color: "#203570"}}
          onClick={() => onHide(name)}
        
          className="p-button-sm p-button-outlined"
        />
        <Button
          label="Yes"
          style={{ backgroundColor: "#203570", borderRadius: "2px" }}
          onMouseDown={() => deleteUser(docId)}
          // onMouseUp={Deletedoc}
          onClick={() => onHide(name)}
          className="p-button-sm"
          autoFocus
        />

    
      </div>
    );
  };



  const DraftDoc = (name) => {
    return (
      <div>
        <Button
          label="No"
        
          style={{borderRadius:"2px",color: "#203570"}}
          onClick={() => onHide(name)}
          className="p-button-sm p-button-outlined"
        />
        <Button
          label="Yes"
          style={{ backgroundColor: "#203570", borderRadius: "2px" }}
          onMouseDown={SaveasDraft}
          onClick={() => onHide(name)}
          className="p-button-sm"
          autoFocus
        />

      
      </div>
    );
  };
  

  const isFormIncomplete = !keywords;











function saveUser() {
  const version = "version1";
  
  const data = { keywords,createdBy };
  const apiUrl = `${process.env.REACT_APP_API_KEY}/document/saveKeywords/${docId}/${version}`;

  fetch(apiUrl, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.status === 200) {
      
        toast.current.show({
          severity: "success",
          summary: "Successful",
          detail: "The keyword was added successfully.",
        });
        getAllKeyword();
      } else {
       
        response.json().then((errorData) => {
          console.log(errorData.developerMessage ,"errordata")
          toast.current.show({
            severity: "error",
            summary: "Failed",
            detail: errorData.developerMessage|| "An error occurred during the adding keyword.",
          });
        });
      }
      getAllKeyword();
    })
    .catch((error) => {
     
      toast.current.show({
        severity: "error",
        summary: "Failed",
        detail: "Failed to fetch. An error occurred during the adding keyword.",
      });
    });
    getAllKeyword();
 
}




  const DeleteKeyword = () => {
    let data = { keyword,createdBy };
    const version = "version1";

    fetch(
      `${process.env.REACT_APP_API_KEY}/document/deleteKeywords/${docId}/${version}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
   

      })

    .then((response) => {
      if (response.status === 200) {
      
        toast.current.show({
          severity: "success",
          summary: "Delete Successful",
          detail: "The keyword was Deleted successfully.",
        });
        getAllKeyword();
      } else {
     
        toast.current.show({
          severity: "error",
          summary: "Delete Failed",
          detail: "An error occurred during the Delete Keyword.",
        });
      }
      getAllKeyword();
    })
    .catch((error) => {
      
      toast.current.show({
        severity: "error",
        summary: "Delete Failed",
        detail: "An error occurred during the Delete Keyword.",
      });
    });

    getAllKeyword();
    
  };

  


  //DELETE KEYWORD

  const deletekeyword = (name) => {
    return (
      <div>
        <Button
          label="No"
          style={{ borderRadius: "2px", color: "#203570" }}
          onClick={() => onHide(name)}
          className="p-button-sm p-button-outlined"
        />
        &nbsp;&nbsp;
        <Button
          label="Yes"
          className="p-button-sm"
          style={{ backgroundColor: "#203570", borderRadius: "2px" }}
          onMouseDown={() => DeleteKeyword()}
          
          onClick={() => onHide(name)}
          autoFocus
        />
      </div>
    );
  };


  //document
  const getData = async (docId) => {
    const version = "version1";
    // axios
    //   .get(
    //     `${process.env.REACT_APP_API_KEY}/document/getallsectionsbydocid/${docId}/${version}`
    //   )

    //   .then((res) => {
    //     setSection(res.data);

    //     console.log(
    //       res.data,
    //       "data of sections///////////////////////////////"
    //     );
    //   });



      const data = {
        userName:sessionStorage.getItem('emailId')
      };
      console.log("data: ", data);
      fetch(`${process.env.REACT_APP_API_KEY}/document/getallsectionsbydocid/${docId}/${version}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then((res) => {
        res.json().then((resp) => {
          console.log(resp, "data of allsections");
          setSection(resp);
        }
        )
      });




  };

  const save = async () => {
    navigate("/selectReviewer/" + docId);
    console.log(docId, "shivani.//.///.///.//.//");
  };

  return (
    <div>
      <Toast ref={toast} />
      {loading ? (
            <span className="loading">
              <ProgressSpinner />
            </span>
          ) : null}

      <NavLink to="/UploadDocument" className="link1">
        <Button
          style={{ backgroundColor: "white", color: "black", height: "37px" }}
          className="p-button-raised  p-button p-button-secondary p-button-text"
        >
          <img
            style={{ width: "25px", marginRight: "10px", height: "25px" }}
            src={leftIcon}
            alt="leftIcon "
          />
          <b> Review Document</b>
        </Button>
      </NavLink>
      <img
        style={{ height: "55px", float: "right" }}
        src={Background}
        alt=" Background "
      />

      <br />
      <br />
      <Card >
        <Button
          style={{
            backgroundColor: "white",
            float: "right",
            color: "black",
            height: "37px",
          }}
          className=" p-button p-button-secondary p-button-text"
          onClick={() => onClick("displayBasic")}
        >
          <img
            style={{ width: "15px", marginRight: "5px", height: "15px" }}
            src={plus}
            alt="plus "
          />
          <p style={{ color: "#203570" }}> Add Keywords</p>
        </Button>
        <Dialog
          icon="pi pi-plus-circle"
          header="Add Keyword"
          visible={displayBasic}
          style={{ width: "25vw" }}
          footer={renderFooter("displayBasic")}
          onHide={() => onHide("displayBasic")}
        >
          <InputText
            type="text "
            style={{ width: "95%", borderRadius: "2px", height: "7vh" }}
            placeholder="Enter Keyword"
            onChange={(e) => {
              setKeywords(e.target.value);
            }}
          />
        </Dialog>
       
     
        {users.map((keywords) => (
          <Tag
            style={{
              backgroundColor: "#49ABA0",
              color:"#203570",
              marginRight: "3px",
              borderRadius: "12px",
              marginTop:"2px"
            }}
            icon="pi pi-times"
            onClick={() => onClick("displayBasic3", keywords)}
          >
            &nbsp;
            {keywords}
          </Tag>
        ))}
        &nbsp;
        <br />
        <br />
        <hr />
        <Dialog
          header="Delete Keyword ?"
          visible={displayBasic3}
          style={{ width: "30vw" }}
          footer={deletekeyword("displayBasic3")}
          onHide={() => onHide("displayBasic3")}
        >
          <p>Are you sure you want to delete this keyword ?</p>
        </Dialog>
   
        <DataTable
           rowHover
           stripedRows
          value={section}
          scrollable
        >
          <Column field="sectionName" header="Identified Section"></Column>
        </DataTable>
       
       
      <br/>
        <div style={{ float: "right" }}>
          &nbsp;
          <Button
            label="Withdraw"
            style={{
              color: "#203570",
              borderRadius: "2px",
            
            }}
            onClick={() => onClick("displayBasic1")}
            onMouseDown={handleClick2}
            className={`text-black p-button-sm  ${
              changeColor2 === true ? "bg-blue-800 text-white" : "bg-white"
            }`}
          />
          <Dialog
            header="Withdraw Document ?"
            visible={displayBasic1}
            style={{ width: "40vw" }}
            footer={DeleteFooter("displayBasic1")}
            onHide={() => onHide("displayBasic1")}
          >
            <p>
              Are you sure you want to withdraw this document, you will lose all
              data saved to the system
            </p>
          </Dialog>
          &nbsp;

          <Dialog
            header="Save As Draft Document "
            visible={displayBasic2}
            style={{ width: "40vw" }}
            footer={DraftDoc("displayBasic2")}
            onHide={() => onHide("displayBasic2")}
          >
            <p>
              Are you sure you want to Save As Draft this Document?
            </p>
          </Dialog>
          <Button
            label="Save as Draft"
            style={{
              color: "#203570",
              borderRadius: "2px",
             
            }}
            onMouseDown={handleClick}
           onClick={() => onClick("displayBasic2")}
           className={`text-black p-button-sm  ${
              changeColor === true ? "bg-blue-800 text-white" : "bg-white"
            }`}
          />
          &nbsp;
          <Button
            label="Next"
            style={{
              color: "#203570",
              borderRadius: "2px",
           
            }}
            onClick={save}
            onMouseDown={handleClick1}
            className={`text-black p-button-sm  ${
              changeColor1 === true ? "bg-blue-800 text-white" : "bg-white"
            }`}
          ></Button>
        </div>
        <br/>
        <br/>
       
      </Card>
    </div>
  );
};
export default Product;
