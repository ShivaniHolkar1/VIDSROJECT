import React, { useState, useEffect, useRef } from "react";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import axios from "axios";
import { Toast } from "primereact/toast";
import User from "../Assets/User.png";
import Background from "../Assets/Background.png";
import { NavLink } from "react-router-dom";
import { Dialog } from "primereact/dialog";
import { InputSwitch } from "primereact/inputswitch";
import { v4 as uuidv4 } from 'uuid';


function Product() {
  const [userName, setUserName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [empId, setEmpId] = useState("");
  const [errors, setErrors] = useState({});
  const [changeColor, setChangeColor] = useState(false);
  const [changeColor1, setChangeColor1] = useState(false);
  const cities = [{ name: "Admin" }, { name: "Viewer" }, { name: "Reviewer" }];
  const [displayBasic, setDisplayBasic] = useState(false);
  const [displayBasic3, setDisplayBasic3] = useState(false);
  const [userRole, setUserRole] = useState("");
  const [status, setStatus] = useState("");
  const [isLocked, setisLocked] = useState("");

  const [displayBasic2, setDisplayBasic2] = useState(false);
  const [displayBasic4, setDisplayBasic4] = useState(false);

  const [formErrors, setFormErrors] = useState({});
  const [file, setFile] = useState();
  const [locked, setLocked] = useState();
  const [id, setId] = useState("");
  const [users, setUsers] = useState([]);
  const [deleteId, setDeleteId] = useState([]);
  const toast = useRef(null);
  const [loading, setLoading] = useState(true);
  const [createdBy, setLoginUser] = useState();
  const [userLoginName, setLoginName] = useState();
  const [trigger, setTrigger] = useState(Boolean);
  const [data, setData] = useState([]);
  const [arrayData, setArrayData] = useState();
  const [selectedProducts, setSelectedProducts] = useState(null);
  const [showOtpVerification, setShowOtpVerification] = useState(false);

  useEffect(() => {
    setLoginUser(sessionStorage.getItem("emailId"));
    setLoginName(sessionStorage.getItem("emailId"));

    if (sessionStorage.getItem("trigger")) {
      setTrigger(true);
    } else {
      setTrigger(false);
    }
  }, []);

  const DOC_FILE_URL = `${process.env.REACT_APP_API_KEY}/dam/user/userTemplate `;
  // const USER_FILE_URL = `${process.env.REACT_APP_API_KEY}/dam/user/bulkdownload `;

  const handleClick = () => {
    setChangeColor(!changeColor);
  };
  const handleClick1 = () => {
    setChangeColor1(!changeColor1);
  };

  const IsValidate = () => {
    let isProceed = true;
    let errors = {};

    if (!userName) {
      errors.userName = "Please enter the userName";
      isProceed = false;
    } else if (!/^[a-zA-Z ]+$/.test(userName)) {
      errors.userName = "Please enter a valid Alphabet for userName";
      isProceed = false;
    }

    if (!status) {
      errors.status = "Please select the status";
      isProceed = false;
    }

    if (!emailId) {
      errors.emailId = "Please enter the emailId";
      isProceed = false;
    } else if (
      !/^[A-Za-z0-9._%+-]+[@]{1}[A-Za-z0-9.-]+[.]{1}[A-Za-z]{2,4}$/.test(
        emailId
      )
    ) {
      errors.emailId = "Please enter a valid email";
      isProceed = false;
    }

    if (!userRole) {
      errors.userRole = "Please select the userRole";
      isProceed = false;
    }

    setFormErrors(errors);

    if (!isProceed) {
      toast.warning("Please fill in all the required fields.");
    }

    return isProceed;
  };

  const isFormIncomplete = !userName || !emailId || !status || !userRole;

  const onSubmit = (e) => {
    e.preventDefault();

    if (e.isValidEmail) {
    } else if (e.isValid) {
      console.log("Invalid form input");
    } else if (e.isValidUser) {
    }
  };

  function saveUser() {
    if (IsValidate()) {
      let item = {
        userName,
        emailId,
        empId,
        status,
        userRole,
        createdBy,
        locked,
        userLoginName,
      };
      console.warn("item", item);
      fetch(`${process.env.REACT_APP_API_KEY}/dam/user/${id}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      }).then(
        (result) => {
          if (result.status === 200) {
            //  onHide(name);
            console.warn("result...!!!", result);
            result.json().then((resp) => {
              console.warn("resp", resp);
            });
            getAllUserList();
            toast.current.show({
              severity: "success",
              summary: "User Edited",
              detail: "User Edited Successfully",
              life: 2000,
            });
       onHide('displayBasic');
            
          } else {
            toast.current.show({
              severity: "warn",
              summary: "User Not Edited",
              detail: "Error while Editing User",
              life: 2000,
            });
          }
        },
        (error) => {
          toast.current.show({
            severity: "error",
            summary: "User Not Edited",
            detail: "Error while Editing User",
            life: 2000,
          });
        }
      );
    }
    setShowOtpVerification(true)
  }

  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    userName: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },

    userRole: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },

    emailId: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },

    createdBy: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },

    representative: { value: null, matchMode: FilterMatchMode.IN },
    date: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }],
    },
    balance: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
    },

    status: {
      operator: FilterOperator.OR,
      constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
    },
    activity: { value: null, matchMode: FilterMatchMode.BETWEEN },
  });
  const [globalFilterValue, setGlobalFilterValue] = useState("");

  console.log(createdBy, "?????????????///createdby");
  const statuses = ["Active", "Inactive"];

  useEffect(() => {
    getAllUserList();
  }, []);
  const getAllUserList =()=>{
    axios.get(`${process.env.REACT_APP_API_KEY}/dam/user/list`).then((res) => {
      // setUsers(res.data.reverse());
      
      setData(res.data.reverse());
      setLoading(false);
    });

  }


  
 



  // const FileDownloader = () => {
    // const [error, setError] = useState(null);
  
    const downloadFile = async ( ) => {
     
     
      try {
      
        const userIdArray = selectedProducts.map((product) => product.userId);
  
        const dataToSend = {
          list: userIdArray,
        };
      
  
        const response = await axios.post(
          `${process.env.REACT_APP_API_KEY}/dam/user/userData`,
          dataToSend,
          {
            responseType: 'blob',
          }
        );
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'file.xlsx'); // Set the desired file name here (with .xlsx extension)
        document.body.appendChild(link);
        link.click();
      } catch (err) {
      
      }
    };

  
   // Import the UUID generator

const exportExcel = () => {
  import("xlsx").then((xlsx) => {
    const defaultRow = ["User Id", "User Name", "Email Id", "Role", "Status"];

    // Select specific fields from selectedProducts
    const selectedFields = selectedProducts.map((product) => {
      console.log(product.userId,"??>??????????????userId")
      const userId = uuidv4(); // Generate a unique User Id
      return {
        "User Id": userId,
        "User Name": product.userName,
        "Email Id": product.emailId,
        "Role": product.userRole,
       "Status": product.status,
      };
    });

    
    const rows = [defaultRow, ...selectedFields.map(Object.values)];

    // Create a new worksheet
    const worksheet = xlsx.utils.aoa_to_sheet(rows);

    const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
    const excelBuffer = xlsx.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    saveAsExcelFile(excelBuffer, "SelectedUser");
  });
};

  const saveAsExcelFile = (buffer, fileName) => {
    import("file-saver").then((module) => {
      if (module && module.default) {
        let EXCEL_TYPE =
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
        let EXCEL_EXTENSION = ".xlsx";
        const data = new Blob([buffer], {
          type: EXCEL_TYPE,
        });

        module.default.saveAs(
          data,
          fileName + "_export_" + new Date().getTime() + EXCEL_EXTENSION
        );
      }
    });
  };

  function deleteUser() {
    let item = {
      userLoginName,
    };
    console.warn("item", item);
    fetch(`${process.env.REACT_APP_API_KEY}/dam/user/delete/${deleteId}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    }).then(
      (result) => {
        if (result.status === 200) {
          console.warn("result...!!!", result);
          result.json().then((resp) => {
            console.warn("resp", resp);
          });
          getAllUserList();

          toast.current.show({
            severity: "success",
            summary: "User Deleted",
            detail: "User Deleted Successfully",
            life: 2000,
          });
          // setTimeout(() => {
          //   window.location.reload(false);
          // }, 1300);
        } else {
          toast.current.show({
            severity: "warn",
            summary: "User Not Deleted",
            detail: "Error while Deleting User",
            life: 2000,
          });
        }
      },
      (error) => {
        toast.current.show({
          severity: "error",
          summary: "User Not Deleted",
          detail: "Error while Deleting User",
          life: 2000,
        });
      }
    );
  }

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };
    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  // DOCUMENT DOWNLOAD
  const downloadFileAtURL = (url) => {
    const fileName = url.split("/").pop();
    const aTag = document.createElement("a");
    aTag.href = url;
    aTag.setAttribute("download", fileName);
    document.body.appendChild(aTag);
    aTag.click();
    aTag.remove();
  };

  function validateForm1() {
    let isValid = true;
    const allowedExtensions = ["xls", "xlsx"];

    if (!file) {
      isValid = false;
      errors.file = "Please select a file.";
    } else {
      const fileExtension = file.name.split(".").pop().toLowerCase();
      if (!allowedExtensions.includes(fileExtension)) {
        isValid = false;
        errors.file = "Only Excel files are allowed.";
      }
    }

    return isValid;
  }







  function UpdatedDocument(event) {
    setFile(event.target.files[0]);
  }

  const isVersioncomplete = !file;
  //internal user upload

  function versionUpload(event) {
    event.preventDefault();

    const isValid = validateForm1();

    if (isValid) {
      console.log("Valid form submitted:", { file });

      const url = `${process.env.REACT_APP_API_KEY}/dam/user/bulkupload`;
      const formData = new FormData();

      formData.append("file", file);
      formData.append("userName", sessionStorage.getItem("userName"));
      formData.append("createdBy", sessionStorage.getItem("emailId"));

      axios
        .post(url, formData)
        .then((response) => {
          getAllUserList();
          if (response.status === 200) {
            toast.current.show({
              severity: "success",
              summary: "User Added",
              detail: "User Added successfully.",
            });
          
          } else {
            toast.current.show({
              severity: "warn",
              summary: "User Not Added ",
              detail: "Error while Adding User.",
            });
          }
        })
        .catch((error) => {
          toast.current.show({
            severity: "warn",
            summary: "Duplicates found",
            detail: "Duplicate users found. Please check the list",
          });
        });
    } else {
      setErrors(errors);
    }
  }

  //User Update

  function userUpload(event) {
    event.preventDefault();

    const isValid = validateForm1();

    if (isValid) {
      console.log("Valid form submitted:", { file });

      const url = `${process.env.REACT_APP_API_KEY}/dam/user/bulkupdate`;
      const formData = new FormData();

      formData.append("file", file);
      
      formData.append("editedBy", sessionStorage.getItem("emailId"));

      axios
        .post(url, formData)
        .then((response) => {
          getAllUserList();
          if (response.status === 200) {
            toast.current.show({
              severity: "success",
              summary: "User Added",
              detail: "User Added successfully.",
            });
       
          } else {
            toast.current.show({
              severity: "warn",
              summary: "User Not Added ",
              detail: "Error while Adding User.",
            });
          }
        })
        .catch((error) => {
          toast.current.show({
            severity: "warn",
            summary: "Duplicates found",
            detail: "Duplicate users found. Please check the list",
          });
        });
    } else {
      setErrors(errors);
    }
  }

  // const reload = () => {
  //   window.location.reload(false);
  // };

  function lockedStatus(rowData, e) {
    console.log(e, "eventfor lock");
    // setisLocked(e.target.value);

    let data = {
      isLocked: e.target.value,
      createdBy,
    };

    fetch(
      `${process.env.REACT_APP_API_KEY}/dam/user/lockUser/${rowData.userId}`,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    )
    getAllUserList();
      // .then
      // (result) => {
      //   if (result.status === 200) {
      //     console.warn("result...!!!", result);
      //     result.json().then((resp) => {
      //       console.warn("resp", resp);
      //     });

      //     toast.current.show({
      //       severity: "success",
      //       summary: "User Unlock",
      //       detail: "User Unlock Successfully",
      //       life: 2000,
      //     });
      //   } else {
      //     toast.current.show({
      //       severity: "warn",
      //       summary: "status unlock Failed",
      //       detail: "Error while Unlock User",
      //       life: 2000,
      //     });
      //   }
      // },
      // (error) => {
      //   toast.current.show({
      //     severity: "error",
      //     summary: "status unlock Failed",
      //     detail: "Error while Unlock User",
      //     life: 2000,
      //   });
      // }
      // ();

    setTimeout(() => {
      window.location.reload(false);
    }, 1300);
  }
  //documnet Upload

  const documentUpload = (name) => {
    return (
      <div>
        <Button
          label="No"
          style={{ borderRadius: "2px", color: "#203570" }}
          onClick={() => onHide(name)}
      
          className="p-button-text p-button-sm"
        />
        <Button
          label="Yes"
          className="p-button-sm"
          style={{ borderRadius: "2px", backgroundColor: "#203570" }}
          onClick={() => onHide(name)}
          onMouseDown={versionUpload}
          disabled={isVersioncomplete}
          autoFocus
        />
      </div>
    );
  };

  //userUpload

  const UserUpload = (name) => {
    return (
      <div>
        <Button
          label="No"
          style={{ borderRadius: "2px", color: "#203570" }}
          onClick={() => onHide(name)}
        
          className="p-button-text p-button-sm"
        />
        <Button
          label="Yes"
          className="p-button-sm"
          style={{ borderRadius: "2px", backgroundColor: "#203570" }}
          onClick={() => onHide(name)}
          onMouseDown={userUpload}
          disabled={isVersioncomplete}
          autoFocus
        />
      </div>
    );
  };

  
  const renderHeader = () => {
    const downlaod = () => {
      toast.current.show({
        severity: "success",
        summary: "Template download",
        detail: "Template download Successfully",
        life: 2000,
      });
    };
    return (
      <div >
        {/* <div></div> */}
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            value={globalFilterValue}
            onChange={onGlobalFilterChange}
            placeholder="Search"
            className="p-inputtext-sm"
          />
        </span>
        

        {/* <Button label="Download Selected" onClick={downloadSelectedColumns} /> */}
        {/* className="flex justify-content-between align-items-center"> */}
        <span style={{float:"right"}} >


        {/* {trigger && (
          <div>
            <Button
              style={{
                backgroundColor: "white",
                height: "28px",
                width: "28px",
                color: "#203570",
              }}
              icon="pi pi-upload"
              tooltip="Upload "
              className=" p-button-raised p-button-text"
              tooltipOptions={{
                className: "teal-tooltip",
                position: "top",
              }}
              onClick={() => onClick("displayBasic3")}
            />
            &nbsp;&nbsp;
            <Dialog
              header="Upload User"
              visible={displayBasic3}
              style={{ width: "35vw" }}
              footer={UserUpload("displayBasic3")}
              onHide={() => onHide("displayBasic3")}
            >
              <form onSubmit={userUpload}>
                <input
                  style={{
                    marginTop: "15px",
                    marginLeft: "15px",
                  }}
                  type="file"
                  onChange={UpdatedDocument}
                />
                {errors.file && (
                  <div style={{ color: "red" }}>{errors.file}</div>
                )}
              </form>
            </Dialog>
            <Button
              style={{
                backgroundColor: "white",
                height: "28px",
                width: "28px",
                marginRight: "2rem",
                color: "#203570",
              }}
              icon="pi pi-download"
              onClick={exportExcel}
              // onClick={downloadFile}
              onMouseDown={downlaod }
              
              tooltip="Download"
              tooltipOptions={{
                className: "teal-tooltip",
                position: "top",
              }}
              className="p-button-raised p-button-text"
            />{" "}
     
          </div>
        )} */}

</span>

        {!trigger && (
          <div style={{ display: "flex" ,float:"right"}}>
            <Button
              style={{
                backgroundColor: "white",
                height: "28px",
                width: "28px",
                color: "#203570",
              }}
              icon="pi pi-upload"
              tooltip="Upload "
              className=" p-button-raised p-button-text"
              tooltipOptions={{
                className: "teal-tooltip",
                position: "bottom",
              }}
              onClick={() => onClick("displayBasic2")}
            />
            &nbsp;&nbsp;
            <Button
              style={{
                backgroundColor: "white",
                height: "28px",
                width: "28px",
                color: "#203570",
              }}
              icon="pi pi-download"
              onClick={() => {
                downloadFileAtURL(DOC_FILE_URL);
              }}
              onMouseDown={downlaod}
              tooltip="Template Download "
              tooltipOptions={{ className: "teal-tooltip", position: "bottom" }}
              className="p-button-raised p-button-text"
            />{" "}
            <Dialog
              header="Upload User"
              visible={displayBasic2}
              style={{ width: "35vw" }}
              footer={documentUpload("displayBasic2")}
              onHide={() => onHide("displayBasic2")}
            >
              <form onSubmit={versionUpload}>
                <input
                  style={{
                    marginTop: "15px",
                    marginLeft: "15px",
                  }}
                  type="file"
                  onChange={UpdatedDocument}
                />
                {errors.file && (
                  <div style={{ color: "red" }}>{errors.file}</div>
                )}
              </form>
            </Dialog>
            &nbsp;&nbsp;
            <NavLink to="/UserDetails" className="link1">
              <Button
                label="Add New User"
                className="nextBtn p-button-sm"
                style={{ backgroundColor: "#203570", borderRadius: "2px" }}
              />
            </NavLink>
            &nbsp;
          </div>
        )}
      </div>
    );
  };

  const countryBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span>{rowData.userName}</span>
      </React.Fragment>
    );
  };

  const countryTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span>{rowData.emailId}</span>
      </React.Fragment>
    );
  };

  const createdByTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span>{rowData.createdBy}</span>
      </React.Fragment>
    );
  };

  const statusBodyTemplate = (rowData) => {
    return (
      <span className={`customer-badge status-${rowData.status}`}>
        {rowData.status}
      </span>
    );
  };
  const lockedBodyTemplate = (rowData) => {
    return (
      <>
        <InputSwitch
          style={{ height: "23px" }}
          checked={rowData.locked}
          onChange={(e) => lockedStatus(rowData, e)}
        />
      </>
    );
  };
  const statusFilterTemplate = (options) => {
    return (
      <Dropdown
        value={options.value}
        options={statuses}
        onChange={(e) => options.filterCallback(e.value, options.index)}
        itemTemplate={statusItemTemplate}
        placeholder="Select a Status"
        className="p-column-filter"
        showClear
      />
    );
  };

  const dateBodyTemplate = (createdOn) => {
   
    return (
      <div>
        {new Intl.DateTimeFormat("en-IN", {
          month: "2-digit",
          day: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }).format(createdOn.createdOn)}
      </div>
    );
  };

  const statusItemTemplate = (option) => {
    return <span className={`customer-badge status-${option}`}>{option}</span>;
  };

  const header = renderHeader();

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button
          className="p-button-rounded p-button-text"
          style={{ height: "25px", width: "30px", color: "#203570" }}
          icon="pi pi-user-edit"
          onMouseDown={() => userData(rowData)}
          onClick={() => onClick("displayBasic")}
        />
      </React.Fragment>
    );
  };

  //Update Use Dialog

  const dialogFuncMap = {
    displayBasic: setDisplayBasic,
    displayBasic2: setDisplayBasic2,
    displayBasic3: setDisplayBasic3,
    displayBasic4: setDisplayBasic4,
  };

  const onClick = (name, position) => {
    dialogFuncMap[`${name}`](true);

    if (position) {
    }
  };

  const onHide = (name) => {
   
    dialogFuncMap[`${name}`](false);
  };

  const onDelete = (name, value) => {
    console.log(value.userId, "delete id");
    setDeleteId(value.userId);
    dialogFuncMap[`${name}`](true);
  };

  const renderFooter1 = (name) => {
    return (
      <div>
        <Button
          label="No"
          icon="pi pi-times"
          onClick={() => onHide(name)}
          className="p-button-text p-button-sm"
        />
        <Button
          label="Yes"
          icon="pi pi-check"
          className=" p-button-sm"
          onClick={() => onHide(name)}
          onMouseDown={() => deleteUser()}
          autoFocus
        />
      </div>
    );
  };

  const DeleteUserTemplate = (rowData) => {
    return (
      <div>
        <Button
          style={{ height: "20px", width: "50px", color: "#203570" }}
          icon="pi pi-trash"
          className="p-button-rounded p-button-text"
          onClick={() => onDelete("displayBasic4", rowData)}
        />
      </div>
    );
  };

  const renderFooter = (name) => {
    return (
      <span style={{ float: "right" }}>
        <Button
          label="Cancel"
          style={{ borderRadius: "2px", color: "#203570" }}
          onMouseDown={handleClick}
          className={`text-black p-button-sm  ${
            changeColor === true ? "bg-blue-800 text-white" : "bg-white"
          }`}
          onClick={() => onHide(name)}
        />
  
        <Button
          style={{
            color: "#203570",

            borderRadius: "2px",
          }}
          label="Submit"
          // onMouseUp={handleClick1}
          className={`text-black p-button-sm  ${
            changeColor1 === true ? "bg-blue-800 text-white" : "bg-white"
          }`}
      
          disabled={isFormIncomplete}
          onClick={saveUser}
        />

      </span>
    );
  };

  //UPDATE USER
  function userData(rowdata) {
    setUserName(rowdata.userName);
    setEmailId(rowdata.emailId);
    setEmpId(rowdata.empId);
    setStatus(rowdata.status);
    setUserRole(rowdata.userRole);
    setLocked(rowdata.locked);
    setId(rowdata.userId);
  }

  return (
    <div>
      <Toast ref={toast} />

      <Dialog
        header="Confirmation"
        visible={displayBasic4}
        footer={renderFooter1("displayBasic4")}
        onHide={() => onHide("displayBasic4")}
      >
        <span icon="pi pi-exclamation-triangle">
          Are you sure you want to delete this User?
        </span>
      </Dialog>

      <div className="datatable-doc-demo">
        <Button
          style={{ backgroundColor: "white", color: "black", height: "35px" }}
          className="p-button-raised p-button p-button-secondary p-button-text"
        >
          <img
            style={{ width: "17px", marginRight: "10px", height: "15px" }}
            src={User}
            alt="User"
          />
          <b>User Management</b>
        </Button>
        <img
          style={{ height: "53px", float: "right" }}
          src={Background}
          alt=" Background "
        />
        <br />
        <br />
        <div className="card">
          <DataTable
            value={data}
            paginator
            rowHover
            // editMode="row"
            // dataKey="id"

            stripedRows
            onRowEditComplete={saveUser}
            selection={selectedProducts}
            onSelectionChange={(e) => setSelectedProducts(e.value)}
            loading={loading}
            className="p-datatable-customers"
            header={header}
            rows={8}
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            filters={filters}
            filterDisplay="menu"
            globalFilterFields={[
              "userName",
              "userRole",
              "createdBy",
              "emailId",
              "createdBy",

              "balance",
              "status",
            ]}
            emptyMessage="No Users added."
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
          >
            <Column
              selectionMode="multiple"
              headerStyle={{ width: "3rem" }}
              exportable={false}
            ></Column>
            <Column
              field="userName"
              header="Name"
              sortable
              filter
              filterPlaceholder="Search by Name"
              style={{ minWidth: "10rem" }}
              filterField="userName"
              body={countryBodyTemplate}
            />

            <Column
              field="userRole"
              header="Role"
              sortable
              filter
              filterField="userRole"
              filterPlaceholder="Search by Role"
              style={{ minWidth: "10rem" }}
            />

            <Column
              field="emailId"
              header="Email Id"
              sortable
              style={{ minWidth: "10rem" }}
              body={countryTemplate}
              filter
              filterPlaceholder="Search by Email Id"
            />

            <Column
              field="createdBy"
              header="Created By"
              sortable
              filter
              body={createdByTemplate}
              filterField="createdBy"
              filterPlaceholder="Search by Creater"
              style={{ minWidth: "10rem" }}
            />

            <Column
              field="status"
              header="Status"
              sortable
              filterMenuStyle={{ width: "14rem" }}
              style={{ minWidth: "10rem" }}
              body={statusBodyTemplate}
              filter
              filterPlaceholder="Search by Status"
              filterElement={statusFilterTemplate}
            />

            <Column
              field="createdOn"
              header="Last Edited"
              sortable
              dataType="date"
              body={dateBodyTemplate}
              style={{ minWidth: "8rem" }}
            />

            <Column
              field="locked"
              header="Locked Status"
              body={lockedBodyTemplate}
            />

            <Column
              header="Edit"
              headerStyle={{ width: "2rem" }}
              body={(e) => actionBodyTemplate(e)}
            ></Column>

            <Column
              header="Delete"
              headerStyle={{ width: "2rem" }}
              body={DeleteUserTemplate}
            />
          </DataTable>
        </div>
      </div>

      {/* Update */}
      <div>
        <Toast ref={toast} />

        <Dialog
          header="Edit User"

          visible={displayBasic}
          footer={renderFooter("displayBasic")}
          style={{ width: "80vw" }}
          onHide={() => onHide("displayBasic")}
        >
          <Card
            style={{
              borderLeft: "9px solid #49ABA0 ",
              backgroundColor: "#F3F3F3",
              borderRadius: "1px",
              width: "950px",
              height: "230px",
            }}
          >
            <form onSubmit={onSubmit}>
              <div class="formgrid grid">
                <div class="field col-4">
                  <label for="lastname2" style={{ color: "black" }}>
                    {" "}
                    Name
                  </label>
                  <br />

                  <InputText
                    style={{
                      height: "40px",
                      width: "90%",
                      borderRadius: "2px",
                    }}
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                  ></InputText>
                  {formErrors.userName && (
                    <div className="invalid-feedback error-message">
                      {formErrors.userName}
                    </div>
                  )}
                </div>

                <div class="field col-4">
                  <label for="lastname2" style={{ color: "black" }}>
                    Email ID
                  </label>

                  <br />

                  <InputText
                    style={{
                      height: "40px",
                      width: "90%",
                      borderRadius: "2px",
                    }}
                    value={emailId}
                    onChange={(e) => setEmailId(e.target.value)}
                  ></InputText>
                  {formErrors.emailId && (
                    <div className="invalid-feedback error-message">
                      {formErrors.emailId}
                    </div>
                  )}
                </div>

                <div class="field col-4">
                  <label for="lastname2" style={{ color: "black" }}>
                    EMP ID
                  </label>

                  <br />

                  <InputText
                    style={{
                      height: "40px",
                      width: "90%",
                      borderRadius: "2px",
                    }}
                    value={empId}
                    onChange={(e) => setEmpId(e.target.value)}
                  ></InputText>
                  {formErrors.empId && (
                    <div className="invalid-feedback error-message">
                      {formErrors.empId}
                    </div>
                  )}
                </div>
              </div>

              <div class="formgrid grid">
                <div class="field col-4">
                  <label for="lastname2" style={{ color: "black" }}>
                    {" "}
                    User Role
                  </label>
                  <br />
                  <Dropdown
                    style={{
                      width: "90%",
                      borderRadius: "3px",
                      height: "40px",
                    }}
                    value={userRole}
                    options={cities}
                    onChange={(e) => setUserRole(e.value)}
                    optionLabel="name"
                    optionValue="name"
                    placeholder="Select "
                  />
                </div>

                {formErrors.userRole && (
                  <div className="invalid-feedback error-message">
                    {formErrors.userRole}
                  </div>
                )}

                <div class="field col-4">
                  <label style={{ color: "black" }}>Status</label>
                  <div class="formgroup-inline">
                    <div class="formgroup-inline">
                      <div class="field-radiobutton">
                        <input
                          style={{ height: "20px", width: "20px" }}
                          type="radio"
                          name="status"
                          value="Active"
                          checked={status === "Active"}
                          onChange={(e) => {
                            setStatus(e.target.value);
                          }}
                        />
                        {errors.status && (
                          <div style={{ color: "red" }}>{errors.status}</div>
                        )}
                        <label for="city7">Active</label>
                      </div>

                      <div class="field-radiobutton">
                        <input
                          type="radio"
                          style={{ height: "20px", width: "20px" }}
                          value="Inactive"
                          name="status"
                          checked={status === "Inactive"}
                          onChange={(e) => {
                            setStatus(e.target.value);
                          }}
                        />
                        {errors.status && (
                          <div style={{ color: "red" }}>{errors.status}</div>
                        )}
                        <label for="city8">Inactive</label>
                      </div>
                    </div>
                  </div>
                  {formErrors.status && (
                    <div className="invalid-feedback error-message">
                      {formErrors.status}
                    </div>
                  )}
                </div>
              </div>
            </form>
          </Card>
          <br />
          <br />
        </Dialog>
      </div>
    </div>
  );
}

export default Product;
