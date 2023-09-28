import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { Card } from "primereact/card";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Dropdown } from "primereact/dropdown";
import { ScrollPanel } from "primereact/scrollpanel";
import { TabView, TabPanel } from "primereact/tabview";

const Product = () => {
  const [notes, setNotes] = useState("");

  const [selectedCustomers, setSelectedCustomers] = useState(null);
  const [section, setSection] = useState([]);
  const [sectionData, setSectionData] = useState([]);
  let [changeText, setChangeText] = useState(Boolean);
  let [secBookmark, setSecBookmark] = useState(Boolean);
  let [sectionId, setsectionId] = useState("");
  let [secId, setsecId] = useState("");
  const [keyword, setKeyword] = useState("");
  const [upload, setUpload] = useState("");
 
  const [displayBasic5, setDisplayBasic5] = useState(false);
  const [displayBasic6, setDisplayBasic6] = useState(false);

  const [displayBasic4, setDisplayBasic4] = useState(false);
  const [displayBasic3, setDisplayBasic3] = useState(false);
 
  const [displayBasic, setDisplayBasic] = useState(false);
  const [displayBasic2, setDisplayBasic2] = useState(false);
  const [displayModal, setDisplayModal] = useState(false);
  const [displayMaximizable, setDisplayMaximizable] = useState(false);

  const [displayResponsive, setDisplayResponsive] = useState(false);
  const [position, setPosition] = useState("center");

  const [displayPosition, setDisplayPosition] = useState(false);
  const [displayPosition1, setDisplayPosition1] = useState(false);
  const [version, setversion] = useState([]);

  const [comment, setComment] = useState("");
  const { id } = useParams();
  const [loading] = useState(false);
  const [users, setUsers] = useState([]);
  const [values, setValues] = useState([]);
  const [allnotes, setAllNotes] = useState(null);
  const [file, setFile] = useState();
  const toast = useRef(null);

  let [actionButtons, setActionButtons] = useState(false);

 

  const onCityChange = (e) => {
    console.log(e.target.value.name);
    setNotes(e.target.value.name);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("refresh prevented");
  };

  //notes
  function saveUser() {
    console.warn({ notes });
    let data = { secId: sectionId, notes };

    console.log(data, "all data");

    fetch(`${process.env.REACT_APP_API_KEY}/dam/notes/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },

      body: JSON.stringify(data),
    }).then((result) => {
      if (result.status === 200) {
        console.warn("result...!!!", result);
        result.json().then((resp) => {
          console.warn("resp", resp);
         
         
        });
        toast.current.show({
          severity: "success",
          summary: "Notes Added",
          detail: "Notes Added Successfully",
          life: 2000,
          
        });
       
        setTimeout(()=>{
          // navigate('/role');
        },4000);
      }
  
      
       else {
        toast.current.show({
          severity: "warn",
          summary: "Notes Not Added",
          detail: "Error while Adding Notes",
          life: 2000,
        });
        

      }


    },
    (error)=>{
      toast.current.show({
        severity: "error",
        summary: "Notes Not Added",
        detail: "Error while Adding Notes",
        life: 2000,
      });
   
    });
   
    // }

    
  }

 
  // download

  const DOC_FILE_URL = `${process.env.REACT_APP_API_KEY}/document/downloadFile/${id}`;

  const SEC_FILE_URL = `${process.env.REACT_APP_API_KEY}/document/downloadSec/${sectionId}`;

  const handleChange = () => {
    setChangeText(!changeText);
  };

  const sectionbookmark = () => {
    setSecBookmark(!secBookmark);
  };

  useEffect(() => {

    setActionButtons(false);
    
    getData(id);
    axios
      .get(`${process.env.REACT_APP_API_KEY}/document/getDocById/${id}`)
      .then((res) => {
        console.log(res, "document data1234");
        setChangeText(res.data.bookmarks);
        console.log(changeText, "bookmarked....!!!!");
        

      });




    axios
      .get(
        `${process.env.REACT_APP_API_KEY}/document/getAllDocVersionsByDocId/${id}`
      )
      .then((res) => {
        console.log(res.data, "version data");
        setValues(res.data);
        console.log(values, "all document version data");
      });
  }, []);

  function getDocDataByDocId(docId) {
    axios
      .get(`${process.env.REACT_APP_API_KEY}/document/sectionsbyid/${docId}`)

      .then((res) => {
        console.log(res, "data of sections");
        setSection(res.data);
        // setSecBookmark(res.data[0].bookmarks);

        // setChangeText(res.data.bookmarked[0])
      });
  }

  function AllNotes() {
    fetch(`${process.env.REACT_APP_API_KEY}/dam/notes/list`)
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        setAllNotes(resp);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  //EDIT NOTES

  const EditAllNotes = (e) => {
    e.preventDefault();
    const data = { secId, notes };
    fetch(`${process.env.REACT_APP_API_KEY}/dam/notes/${secId}`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => {
        alert("Saved successfully.");
        // navigate("/Version");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  function deleteNotes(rowData) {
    console.log(rowData, "dete////");
    fetch(
      `${process.env.REACT_APP_API_KEY}/dam/notes/deleteById/${rowData.id}`,
      {
        method: "DELETE",
      } ).then((result) => {
      result.json().then((resp) => {
        console.warn(resp);
      });
      
     
    });
    window.location.reload(false);
  }

  const Removefunction = (secId) => {
    console.log(secId, ".//////.....section data..... ");
    fetch(`${process.env.REACT_APP_API_KEY}/dam/notes/delete/${sectionId}`, {
      method: "DELETE",
    }).then((res) => {
        alert("Removed successfully.");
        // window.location.reload();
      })
      .catch((err) => {
        console.log(err.message);
      });
      window.location.reload(false);
  };

  //DOCUMENT BOOKMARK

  const bookmark = async () => {
    console.log("Bookmarked...!!", id);
    axios
      .put(`${process.env.REACT_APP_API_KEY}/document/setBookmark/${id}`)
      .then((res) => {
        console.log(res, "bookmarked applied///////////////,///");
      });

      setTimeout(()=>{
        window.location.reload(false);
      },1000);
  };





  const showSuccess =()=>{
    toast.current.show({severity:'success', summary: 'Document Bookmark Successfully', detail:'Document Bookmarked', life: 3000});
  }

  const showSuccess2 =()=>{
    toast.current.show({severity:'warn', summary: 'Document UnBookmark Successfully', detail:'Document UnBookmarked', life: 3000});
  }

  
  const showSuccess3 =()=>{
    toast.current.show({severity:'success', summary: 'x Bookmark Successfully', detail:'Document Bookmarked', life: 3000});
  }

  const showSuccess4 =()=>{
    toast.current.show({severity:'warn', summary: 'Document UnBookmark Successfully', detail:'Document UnBookmarked', life: 3000});
  }

  const secUpload =()=>{

    toast.current.show({severity:'success', summary: 'Section Uploaded Successfully', detail:'Section Uploaded', life: 3000});
  }

  const docUpload =()=>{

    toast.current.show({severity:'success', summary: 'Document Uploaded Successfully', detail:'Document Uploaded', life: 3000});
  }

  //SECTION BOOKMARK

  const BookmarkSection = async () => {
    console.log("Bookmarked...!!", id);
    axios
      .put(
        `${process.env.REACT_APP_API_KEY}/document/setSectionBookmark/${sectionId}`
      )
      .then((res) => {
        console.log(res, "bookmarked applied///////////////,///");
        // setUser(res.data);
      });
      setTimeout(()=>{
        window.location.reload(false);
      },1000);
  };

  const fetchData = (rowData) => {
    setActionButtons(true);
    console.log(rowData, " single row data...@@");
    setsectionId(rowData.secId);

    setSectionData(rowData);

    //BYTE TO STRING CONVERSION

    const decoder = new TextDecoder("UTF-8");

    const toString = (bytes) => {
      const rowData = new Uint8Array(bytes);
      return decoder.decode(rowData);
    };
    console.log(
      toString,
      "./////////////////////....shivani.................,,,////"
    );

    axios
      .get(`${process.env.REACT_APP_API_KEY}/dam/notes/${rowData.secId}`)

      .then((res) => {
        console.log(res, "notes of sections");
        setAllNotes(res.data);
      });
  };

  const getData = async (id) => {
    console.log(id, "inside");

    axios
      .get(`${process.env.REACT_APP_API_KEY}/document/sectionsbyid/${id}`)

      .then((res) => {
        console.log(res, "data of allsections");
        setSection(res.data);
        setSecBookmark(res.data[0].bookmarks);
      });
  };

  // function Download(){
  const downloadFileAtURL = (url) => {
    const fileName = url.split("/").pop();
    const aTag = document.createElement("a");
    aTag.href = url;
    aTag.setAttribute("download", fileName);
    document.body.appendChild(aTag);
    aTag.click();
    aTag.remove();
  };

  
  const docDownload =()=>{

    toast.current.show({severity:'success', summary: 'Document Download Successfully', detail:'Document Download', life: 3000});
  }

  const downloadSectionURL = (url) => {
    const fileName = url.split("/").pop();
    const aTag = document.createElement("a");
    aTag.href = url;
    aTag.setAttribute("download", fileName);
    document.body.appendChild(aTag);
    aTag.click();
    aTag.remove();
  };
   
  const secDownload =()=>{

    toast.current.show({severity:'success', summary: 'Section Download Successfully', detail:'Section Download', life: 3000});
  }

  // };
  const actionBodyTemplate = (rowData) => {
    return (
      <Button
        style={{ height: "20px", width: "20px", color: "#203570" }}
        onClick={() => fetchData(rowData)}
        icon="pi pi-chevron-circle-right"
        className="p-button-rounded p-button-text"
      />
    );
  };

  const getComment = async (rowData) => {
    console.log(rowData, "akshay.........222222");
    const res = await fetch(
      `${process.env.REACT_APP_API_KEY}/comment/${sectionId}`
    );
    const data = await res.json();
    setUsers(data);

    console.log(users, "sds./////////./////////////");
  };

  function saveComment() {
    console.warn({ comment, createdBy: "Shivani" });

    let data = { secId: sectionId, comment, createdBy: "shivani" };
    console.log(data, "all data");

    fetch(`${process.env.REACT_APP_API_KEY}/comment/addcomment`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((result) => {
      if (result.status === 200) {
        console.warn("result...!!!", result);
        result.json().then((resp) => {
          console.warn("resp", resp);
         
        });
        toast.current.show({
          severity: "success",
          summary: "Comment Added",
          detail: "Comment Added Successfully",
          life: 6000,
          
        });
        //  navigate("/role")
      } else {
        toast.current.show({
          severity: "warn",
          summary: "Comment Not Added",
          detail: "Error while Adding Comment",
          life: 6000,
        });
        

      }


    },
    (error)=>{
      toast.current.show({
        severity: "error",
        summary: "Comment Not Added",
        detail: "Error while Adding Comment",
        life: 6000,
      });
   
    });
    
  }
  

  const dialogFuncMap = {
    displayBasic: setDisplayBasic,
    displayBasic2: setDisplayBasic2,
    displayBasic3: setDisplayBasic3,
    displayModal: setDisplayModal,
    displayBasic5: setDisplayBasic5,
    displayBasic6: setDisplayBasic6,
    displayMaximizable: setDisplayMaximizable,
    displayPosition: setDisplayPosition,
    displayPosition1: setDisplayPosition1,
    displayResponsive: setDisplayResponsive,
  };

  const onClick = (name, position) => {
    dialogFuncMap[`${name}`](true);

    if (position) {
      setPosition(position);
    }
  };

  const onHide = (name) => {
    dialogFuncMap[`${name}`](false);
  };
  //DOCUMENT UPLOAD

  const documentUpload = (name) => {
    return (
      <div>
        <Button
          label="No"
          onClick={() => onHide(name)}
          className="p-button-text p-button-sm"
        />
        <Button
          label="Yes"
          className="p-button-sm"
          onMouseDown={() => onHide(name)}
          onClick={submit}
          onMouseEnter={docUpload}
          autoFocus
        />
      </div>
    );
  };

  //SECTION UPLOAD

  const sectionupload = (name) => {
    return (
      <div>
        <Button
          label="No"
          onClick={() => onHide(name)}
          className="p-button-text p-button-sm"
        />
        <Button
          label="Yes"
          className="p-button-sm"
          onClick={() => onHide(name)}
          onMouseDown={handleSubmit}
          onMouseEnter={secUpload}
          autoFocus
        />
      </div>
    );
  };

  //COMMENT
  const AddComment = (name) => {
    return (
      <div>
        <Button
          label="Cancel"
          icon="pi pi-times"
          onClick={() => onHide(name)}
          className="p-button-sm p-button-text"
        />
        <Button
          label="Submit"
          onClick={() => onHide(name)}
          onMouseDown={saveComment}
          icon="pi pi-check"
          className="p-button-sm"
          autoFocus
        />
      </div>
    );
  };

  //ADD NOTES

  const AddNotes = (name) => {
    return (
      <div>
        <Button
          label="Cancel"
          icon="pi pi-times"
          onClick={() => onHide(name)}
          className="p-button-sm p-button-text"
        />

        <Button
          style={{ backgroundColor: "#203570" }}
          label="Yes"
          className="p-button-sm"
          onMouseDown={saveUser}
          icon="pi pi-check"
          onClick={() => onHide(name)}
          autoFocus
        />
      </div>
    );
  };

  // function saveUser() {
  //   console.warn({ upload });
  //   let data = { upload };
  //   fetch(
  //     `http://192.168.1.59:8080/sample/addTerm/` + upload,

  //     {
  //       method: "POST",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(data),
  //     }
  //   ).then((result) => {
  //     result.json().then((resp) => {
  //       console.warn("resp", resp);
  //     });
  //   });
  // }

  //keyword

  const renderFooter = (name) => {
    return (
      <div>
        <Button
          label="No"
          onClick={() => onHide(name)}
          className="p-button-sm p-button-text"
        />
        <Button
          label="Yes"
          onMouseEnter={saveUser}
          onClick={() => onHide(name)}
          style={{ backgroundColor: "#203570" }}
          className="p-button-sm"
          autoFocus
        />

        {/* // onClick={() => onHide(name)} */}
      </div>
    );
  };

  //DELETE ALL NOTES

  const DeleteAll = (name) => {
    return (
      <div>
        <Button
          label="No"
          icon="pi pi-times"
          onClick={() => onHide(name)}
          className="p-button-sm p-button-text"
        />
        <Button
          label="Yes"
          onMouseEnter={() => {
            Removefunction(secId);
          }}
          onClick={() => onHide(name)}
          icon="pi pi-check"
          className="p-button-sm"
          autoFocus
        />
      </div>
    );
  };

  //DELETE PARTICULAR NOTES
  const Delete = (name) => {
    return (
      <div>
        <Button
          label="No"
          icon="pi pi-times"
          onClick={() => onHide(name)}
          className="p-button-sm p-button-text"
        />
        <Button
          label="Yes"
          // onMouseEnter={() => deleteNotes(item.id)}
          onClick={() => onHide(name)}
          icon="pi pi-check"
          className="p-button-sm"
          autoFocus
        />
      </div>
    );
  };

  //EDIT NOTES

  const CommentTemplate = (rowData) => {
    console.log(rowData, "action body.....");
    return (
      <Button
        style={{ height: "20px", width: "20px", color: "#203570" }}
        tooltip="Comment"
        tooltipOptions={{ className: "teal-tooltip", position: "bottom" }}
        onClick={() => onClick("displayPosition1", "right")}
        icon="pi pi-comment"
        className="p-button-rounded p-button-text"
      />
    );
  };

  const NotesTemplate = (rowData) => {
    console.log(rowData, "action body.....");
    return (
      <Button
        style={{ height: "20px", width: "20px", color: "#203570" }}
        onClick={() => onClick("displayPosition", "right")}
        icon="pi pi-file-edit"
        tooltip="Notes"
        tooltipOptions={{ className: "teal-tooltip", position: "bottom" }}
        className="p-button-rounded p-button-text"
      />
    );
  };

  const AllNotesTemplate = (rowData) => {
    console.log(rowData, "action body.....");
    return (
      <div>
        <Button
          style={{
            // marginLeft: "300px",
            height: "20px",
            width: "20px",
            color: "#203570",
          }}
          icon="pi pi-file-edit"
          className="p-button-rounded p-button-text"
        />
      </div>
    );
  };

  const DeleteNotesTemplate = (rowData) => {
    console.log(rowData, "action body.....");
    return (
      <div>
        <Button
          style={{ height: "20px", width: "20px", color: "#203570" }}
          icon="pi pi-trash"
          onClick={() => deleteNotes(rowData)}
          className="p-button-rounded p-button-text"
        />
      </div>
    );
  };

  function onSelectVersion(rowData) {
    console.log(rowData, "selected value...!!!");
    setversion(rowData.value);

    getDocDataByDocId(rowData.value.docId);

    // setId(rowData.value.docId);
  }

  // //Section Upload

  function Documentupload(event) {
    setFile(event.target.files[0]);
  }

  function handleSubmit(event) {
    event.preventDefault();

    const url = `${process.env.REACT_APP_API_KEY}/document/uploadSec`;

    const formData = new FormData();

    formData.append("file", file);
    formData.append("id", id);
    console.log(
      formData,
      "////////////////////Section Data................//////////"
    );
    axios.post(url, formData).then((res) => {});
    window.location.reload(false);
  }

  ///upload updated document

  function UpdatedDocument(event) {
    setFile(event.target.files[0]);
  }

  function submit(event) {
    event.preventDefault();
    window.location.reload(false);

    const url = `${process.env.REACT_APP_API_KEY}/document/uploadNewVersions`;

    //http://192.168.1.59:8080/sample/document
    const formData = new FormData();

    formData.append("file", file);
    formData.append("docId", id);
    console.log(formData, "//////////////////////////////");
    axios.post(url, formData).then((res) => {});
    window.location.reload(false);
  }

  

  


  //EDIT NOTES

  function updateUser(e) {
    if (e.which === 13) {
      console.log(e, " enter event");
    }
  }

  const onRowEditComplete = (e) => {
    console.log(e);

    const notes = {
      notes: e.newData.notes,
      // notesName:"test",
      // secId: e.newData.secId,
      // id:"",
      // createdOn:123434
    };

    fetch(`${process.env.REACT_APP_API_KEY}/dam/notes/${e.newData.secId}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(notes),
    }).then((result) => {
      
      console.log("rsult", result);

      result.json().then((resp) => {
        console.warn(resp);
      });
    });
  };

  const textEditor = (options) => {
    return (
      <InputText
        type="text"
        value={options.value}
        onChange={(e) => options.editorCallback(e.target.value)}
      />
    );
  };

  // const header = renderHeader();
  return (
    <div>
      <Toast ref={toast} />
      <NavLink to="/DashboardMain" className="link1">
        <Button
          style={{ backgroundColor: "white", height: "30px", color: "#203570" }}
          icon="pi pi-chevron-circle-left"
          label="Document Name"
          className="p-button-raised p-button-secondary p-button-text"
        />
        &nbsp;
      </NavLink>
      <Button
        visible={!changeText}
        style={{
          backgroundColor: "white",
          height: "30px",
          width: "30px",
          color: "#203570",
        }}
        icon="pi pi-bookmark"
        className=" p-button-raised p-button-text"
        onClick={bookmark}
        tooltip="Bookmark"
        tooltipOptions={{ className: "teal-tooltip", position: "bottom" }}
        name="bookmark Document"
        onMouseDown={showSuccess}
      />
      <Button
        visible={changeText}
        style={{
          backgroundColor: "white",
          height: "30px",
          width: "30px",
          color: "#203570",
        }}
        icon="pi pi-bookmark-fill"
        className=" p-button-raised p-button-text"
        onClick={bookmark}
        tooltip=" Bookmark"
        tooltipOptions={{ className: "teal-tooltip", position: "bottom" }}
        name="bookmark Document"
        onMouseDown={showSuccess2}
      />
      &nbsp;
      <Button
        style={{
          backgroundColor: "white",
          height: "30px",
          width: "30px",
          color: "#203570",
        }}
        icon="pi pi-download"
        onClick={() => {
          downloadFileAtURL(DOC_FILE_URL);
        }}
        tooltip="Download "
        tooltipOptions={{ className: "teal-tooltip", position: "bottom" }}
        className="p-button-raised  p-button-text"
        // onMouseDown={handleClick3}
        onMouseDown={docDownload}
    
      />{" "}
      &nbsp;
      <Button
        style={{
          backgroundColor: "white",
          height: "30px",
          width: "30px",
          color: "#203570",
        }}
        tooltip="Share "
        tooltipOptions={{ className: "teal-tooltip", position: "bottom" }}
        icon="pi pi-external-link"
        className="p-button-raised p-button-text"
      />
      &nbsp;
      <Button
        style={{
          backgroundColor: "white",
          height: "30px",
          width: "30px",
          color: "#203570",
        }}
        tooltip="Upload "
        className=" p-button-raised p-button-text"
        tooltipOptions={{ className: "teal-tooltip", position: "bottom" }}
        icon="pi pi-upload"
        onClick={() => onClick("displayBasic6")}
      />
      <Dialog
        header="Upload particular version"
        visible={displayBasic6}
        style={{ width: "35vw" }}
        footer={documentUpload("displayBasic6")}
        onHide={() => onHide("displayBasic6")}
      >
        <form>
          <input
            style={{ marginTop: "15px", marginLeft: "15px" }}
            type="file"
            onChange={UpdatedDocument}
          />
        </form>
      </Dialog>
      <Dropdown
        style={{ backgroundColor: "white",
        float: "right",
        color: "#203570"}}
        value={version}
        options={values}
        onChange={(e) => onSelectVersion(e)}
        optionLabel="version"
        placeholder="Select"
      />
      <br />
      <br />
      <Card>
        <div class="grid">
          <div class="col-4">
            <div className="datatable-scroll-demo">
              <Card
                style={{
                  borderLeft: "8px solid #49ABA0",
                  backgroundColor: "#F3F3F3",
                  // width: "400px",
                }}
              >
                <ScrollPanel style={{ width: "100%", height: "350px" }}>
                  <DataTable
                    value={section}
                    rowHover
                    header={"Identified Sections"}
                    selection={selectedCustomers}
                    onSelectionChange={(e) => setSelectedCustomers(e.value)}
                    loading={loading}
                    size="small"
                  >
                    <Column field="sectionName"></Column>
                    <Column
                      field="comment"
                      body={CommentTemplate}
                      bodyStyle={{ height: "2rem" }}
                      headerStyle={{ width: "2rem" }}
                    ></Column>

                    <Column
                      field="Notes"
                      body={NotesTemplate}
                      bodyStyle={{ height: "2rem" }}
                      headerStyle={{ width: "2rem" }}
                    ></Column>

                    <Column
                      bodyStyle={{ height: "1rem" }}
                      body={actionBodyTemplate}
                    />
                  </DataTable>
                </ScrollPanel>
              </Card>
            </div>
          </div>

          <div class="col-8">
            <Card
              style={{
                borderLeft: "8px solid #49ABA0",
                backgroundColor: "#F3F3F3",
              }}
            >
              <div className="tabview-demo">
                <div className="card">
                  <TabView className="tabview-header-icon">
                    <TabPanel className="tabview-header" header="Section">
                      {/* leftIcon="pi pi-calendar" */}
                      <ScrollPanel style={{ width: "100%", height: "315px" }}>
                        <br />

                        <div style={{ display: "flex", float: "right" }}>
                          &nbsp;
                          <Button
                            visible={actionButtons}
                            style={{
                              backgroundColor: "white",
                              height: "30px",
                              width: "30px",
                              color: "#203570",
                            }}
                            icon="pi pi-upload"
                            tooltip="Upload "
                            className=" p-button-raised p-button-text"
                            tooltipOptions={{
                              className: "teal-tooltip",
                              position: "bottom",
                            }}
                            onClick={() => onClick("displayBasic5")}
                          />
                          <Dialog
                            header="Upload particular section"
                            visible={displayBasic5}
                            style={{ width: "35vw" }}
                            footer={sectionupload("displayBasic5")}
                            onHide={() => onHide("displayBasic5")}
                          >
                            <form onSubmit={handleSubmit}>
                              <input
                                style={{
                                  marginTop: "15px",
                                  marginLeft: "15px",
                                }}
                                type="file"
                                onChange={Documentupload}
                              />
                            </form>
                          </Dialog>
                          &nbsp;
                          <Button
                            visible={!sectionData.bookmarks && actionButtons}
                            style={{
                              backgroundColor: "white",
                              height: "30px",
                              width: "30px",
                              color: "#203570",
                            }}
                            icon="pi pi-bookmark"
                            tooltip="Bookmark "
                            tooltipOptions={{
                              className: "teal-tooltip",
                              position: "bottom",
                            }}
                            className=" p-button-raised p-button-text"
                            onClick={BookmarkSection}
                            onMouseDown={showSuccess3}
                          />
                          <Button
                            visible={sectionData.bookmarks && actionButtons}
                            style={{
                              backgroundColor: "white",
                              height: "30px",
                              width: "30px",
                              color: "#203570",
                            }}
                            tooltip="Bookmark "
                            tooltipOptions={{
                              className: "teal-tooltip",
                              position: "bottom",
                            }}
                            icon="pi pi-bookmark-fill"
                            className=" p-button-raised p-button-text"
                            onClick={BookmarkSection}
                            onMouseDown={showSuccess4}
                          />{" "}
                          &nbsp;
                          <Button
                            visible={actionButtons}
                            style={{
                              backgroundColor: "white",
                              height: "30px",
                              width: "30px",
                              color: "#203570",
                            }}
                            icon="pi pi-download"
                            onClick={() => {
                              downloadSectionURL(SEC_FILE_URL);
                            }}
                            onMouseDown={secDownload}
                            tooltip="Download "
                            tooltipOptions={{
                              className: "teal-tooltip",
                              position: "bottom",
                            }}
                            className="p-button-raised p-button-text"
                          />{" "}
                          &nbsp;
                        </div>
                        <br />

                        {/* SECTION DATA */}
                        <div>
                          <b>{sectionData.sectionName}</b>
                          <br />
                          <br />
                          {sectionData.sectionContaion}
                        </div>
                        <hr />

                        <br />

                        <DataTable
                          value={users}
                          rowHover
                          selection={selectedCustomers}
                          onSelectionChange={(e) =>
                            setSelectedCustomers(e.value)
                          }
                          loading={loading}
                        >
                          <Column field="comment" header="Comments" />
                        </DataTable>

                        <Button
                          style={{
                            float: "right",

                            backgroundColor: "#203570",
                          }}
                          label="View"
                          className="p-button-sm"
                          onClick={() => getComment()}
                        />
                      </ScrollPanel>
                    </TabPanel>
                    <TabPanel header=" Keyword">
                      <ScrollPanel style={{ width: "100%", height: "305px" }}>
                        <Button
                          style={{ float: "right", color: "#203570" }}
                          label="Add Keywords"
                          className="p-button-text p-button-sm"
                          icon="pi pi-plus-circle"
                          onClick={() => onClick("displayBasic")}
                        />
                        <Dialog
                          header="Add Keywords"
                          visible={displayBasic}
                          style={{ width: "25vw" }}
                          footer={renderFooter("displayBasic")}
                          onHide={() => onHide("displayBasic")}
                        >
                          <InputText
                            type="text "
                            placeholder="Enter Keyword"
                            onChange={(e) => {
                              setUpload(e.target.value);
                            }}
                          />
                        </Dialog>
                      </ScrollPanel>
                    </TabPanel>

                     <TabPanel header="Notes">
                      <ScrollPanel style={{ width: "100%", height: "305px" }}>
                        <DataTable
                          value={allnotes}
                          rowHover
                          editMode="row"
                          dataKey="id"
                          onRowEditComplete={onRowEditComplete}
                          responsiveLayout="scroll"
                          selection={selectedCustomers}
                          onSelectionChange={(e) =>
                            setSelectedCustomers(e.value)
                          }
                          loading={loading}
                        >
                          <Column
                            field="notes"
                            header="Notes"
                            editor={(options) => textEditor(options)}
                          />

                          <Column header="Edit" rowEditor></Column>

                          <Column
                            header="Delete"
                            headerStyle={{ width: "2rem" }}
                            body={DeleteNotesTemplate}
                          />
                        </DataTable>

                        <Dialog
                          header="Delete All Notes"
                          visible={displayBasic3}
                          style={{ width: "27vw" }}
                          footer={DeleteAll("displayBasic3")}
                          onHide={() => onHide("displayBasic3")}
                        >
                          <p>Are You Sure You Want to Delete All Notes ?</p>
                        </Dialog> 

                    </ScrollPanel>

                  <Button
                          style={{ color: "#203570", float: "right" }}
                          label="Delete All"
                          onClick={() => {
                            Removefunction(secId);
                          }}
                         
                          className="p-button-outlined p-button-sm"
                        /> 
                    {/* </ScrollPanel> */}
                    </TabPanel>
                  </TabView>
                </div>
              </div>


{/* <b>Comment</b> */}
                {/* <div>
                  {users.map((user) => (
                    <div key={user.comment}>{user.comment}</div>
                  ))}
                  <div> 
                  
                  
                    <Button
                      style={{
                        float: "right",
                        marginLeft: "10px",
                        backgroundColor: "#203570",
                      }}
                     
                      label="View"
                      className="p-button-sm"
                      onClick={() => getComment()}
                    /> 
              </div> 
                 </div> 
                */}

                   
            </Card>
          </div>
          {/* </div> */}

          <div class="col-4">
            {/* ADD NOTES */}

            <Dialog
              header="Add Notes"
              visible={displayPosition}
              position={position}
              modal
              style={{ width: "35vw" }}
              footer={AddNotes("displayPosition")}
              onHide={() => onHide("displayPosition")}
              draggable={false}
              resizable={false}
            >
              <InputTextarea
                type="text "
                placeholder="Enter Notes here..."
                onChange={(e) => {
                  setNotes(e.target.value);
                }}
                rows={4}
                cols={46}
              />
            </Dialog>

            {/* ADD COMMENT */}

            <Dialog
              header="Add Comment"
              visible={displayPosition1}
              position={position}
              modal
              style={{ width: "35vw" }}
              footer={AddComment("displayPosition1")}
              onHide={() => onHide("displayPosition1")}
              draggable={false}
              resizable={false}
            >
              <InputTextarea
                type="text "
                placeholder="Enter Comment here..."
                onChange={(e) => {
                  setComment(e.target.value);
                }}
                rows={4}
                cols={46}
              />
            </Dialog>

            {/* DELETE PARTICULAR NOTES */}
            <Dialog
              header="Delete Particular Notes"
              visible={displayBasic4}
              style={{ width: "27vw" }}
              footer={Delete("displayBasic4")}
              onHide={() => onHide("displayBasic4")}
            >
              <p>Are You Sure You Want to Delete Particular Notes ?</p>
            </Dialog>
          </div>
        </div>

       
      </Card>
    </div>
  );
};
export default Product;






















// import React, { useState, useEffect, useRef } from "react";
// import { Button } from "primereact/button";
// import { Toast } from "primereact/toast";
// import { Card } from "primereact/card";
// import { NavLink, useParams } from "react-router-dom";
// import axios from "axios";
// import { Dropdown } from "primereact/dropdown";
// import { Accordion, AccordionTab } from "primereact/accordion";
// import { ScrollPanel } from 'primereact/scrollpanel';


// const Product = () => {
//   const [section, setSection] = useState([]);
//   let [changeText, setChangeText] = useState(Boolean);
//   let [sectionBookmark, setsectionBookmark] = useState(Boolean);
//   let [sectionId, setsectionId] = useState("");
//   const { id } = useParams();
//   const [values, setValues] = useState([]);
//   const [version, setversion] = useState([]);
//   const toast = useRef(null);
 
//   let [approveDoc, setApproveDoc] = useState(Boolean);

  
//   //download

//   const DOC_FILE_URL = `${process.env.REACT_APP_API_KEY}/document/downloadFile/${id}`;

//   const SEC_FILE_URL = `${process.env.REACT_APP_API_KEY}/document/downloadSec/${sectionId}`;

//   useEffect(() => {
//     getData(id);
//     axios
//       .get(`${process.env.REACT_APP_API_KEY}/document/getDocById/${id}`)
//       .then((res) => {
//         console.log(res, "document data1234");
//         setChangeText(res.data.bookmarks);
        
//         setApproveDoc(res.data.approved);
        
//         console.log(changeText, "bookmarked....!!!!");
//       });

//     axios
//       .get(
//         `${process.env.REACT_APP_API_KEY}/document/getAllDocVersionsByDocId/${id}`
//       )
//       .then((res) => {
//         console.log(res.data, "version data");
//         setValues(res.data);
//         console.log(values, "all document version data");
//       });
//   }, []);

//   function getDocDataByDocId(docId) {
//     axios
//       .get(`${process.env.REACT_APP_API_KEY}/document/sectionsbyid/${docId}`)

//       .then((res) => {
//         console.log(res, "data of sections");
//         setSection(res.data);
//       });
//   }

//   //DOCUMENT BOOKMARK

//   const bookmark = async () => {
//     console.log("Bookmarked...!!", id);
//     axios
//       .put(`${process.env.REACT_APP_API_KEY}/document/setBookmark/${id}`)
//       .then((res) => {
//         console.log(res, "bookmarked applied///////////////,///");
//       });

//     setTimeout(() => {
//       // window.location.reload(false);
//     }, 1000);
//   };
//   const showSuccess = () => {
//     toast.current.show({
//       severity: "success",
//       summary: "Document Bookmark Successfully",
//       detail: "Document Bookmarked",
//       life: 3000,
//     });
//   };

//   const showSuccess2 = () => {
//     toast.current.show({
//       severity: "warn",
//       summary: "Document UnBookmark Successfully",
//       detail: "Document UnBookmarked",
//       life: 3000,
//     });
//   };

//   const showSuccess3 = () => {
//     toast.current.show({
//       severity: "success",
//       summary: "Section Bookmark Successfully",
//       detail: "Section Bookmarked",
//       life: 3000,
//     });
//   };

//   const showSuccess4 = () => {
//     toast.current.show({
//       severity: "warn",
//       summary: "Section UnBookmark Successfully",
//       detail: "Section UnBookmarked",
//       life: 3000,
//     });
//   };

//   //SECTION BOOKMARK

//   const BookmarkSection = async () => {
//     console.log("Bookmarked...!!", id);
//     axios
//       .put(
//         `${process.env.REACT_APP_API_KEY}/document/setSectionBookmark/${sectionId}`
//       )
//       .then((res) => {
//         console.log(res, "bookmarked applied///////////////,///");
//         window.location.reload(false);
//       });
//   };

//   const getData = async (id) => {
//     console.log(id, "insides////////////////////////////////////shivani");

//     axios
//       .get(`${process.env.REACT_APP_API_KEY}/document/sectionsbyid/${id}`)

//       .then((res) => {
//         console.log(res, "data of allsections");
//         setSection(res.data);
//       });
//   };



  
  

//   // function Download(){
//   const downloadFileAtURL = (url) => {
//     const fileName = url.split("/").pop();
//     const aTag = document.createElement("a");
//     aTag.href = url;
//     aTag.setAttribute("download", fileName);
//     document.body.appendChild(aTag);
//     aTag.click();
//     aTag.remove();
//   };

//   const docDownload = () => {
//     toast.current.show({
//       severity: "success",
//       summary: "Document Download Successfully",
//       detail: "Document Download",
//       life: 3000,
//     });
//   };

//   const downloadSectionURL = (url) => {
//     const fileName = url.split("/").pop();
//     const aTag = document.createElement("a");
//     aTag.href = url;

//     aTag.setAttribute("download", fileName);
//     document.body.appendChild(aTag);
//     aTag.click();
//     aTag.remove();
//   };

//   const secDownload = () => {
//     toast.current.show({
//       severity: "success",
//       summary: "Section Download Successfully",
//       detail: "Section Download",
//       life: 3000,
//     });
//   };

  

 


//   function onSelectVersion(rowData) {
//     console.log(rowData, "selected value...!!!");
//     setversion(rowData.value);

//     getDocDataByDocId(rowData.value.docId);
//   }



//   function onClickHeader(rowData) {
//     console.log("rowdata of accordation tab", rowData);
//     setsectionId(rowData.secId);
//     setsectionBookmark(rowData.bookmarks);
//   }


 

  

//   return (
//     <div>
//       <Toast ref={toast} />
//       <NavLink to="/reviewermain" className="link1">
//         <Button
//           style={{ backgroundColor: "white", height: "30px", color: "#203570" }}
//           icon="pi pi-chevron-circle-left"
//           label="Document Name"
//           className="p-button-raised p-button-secondary p-button-text"
//         />
//         &nbsp;
//       </NavLink>
//       <Button
//         visible={!changeText}
//         style={{
//           backgroundColor: "white",
//           height: "30px",
//           width: "30px",
//           color: "#203570",
//         }}
//         icon="pi pi-bookmark"
//         className=" p-button-raised p-button-text"
//         onClick={bookmark}
//         tooltip="Bookmark"
//         tooltipOptions={{ className: "teal-tooltip", position: "bottom" }}
//         name="bookmark Document"
//         // onMouseDown={showSuccess}
//       />
//       <Button
//         visible={changeText}
//         style={{
//           backgroundColor: "white",
//           height: "30px",
//           width: "30px",
//           color: "#203570",
//         }}
//         icon="pi pi-bookmark-fill"
//         className=" p-button-raised p-button-text"
//         onClick={bookmark}
//         tooltip=" Bookmark"
//         tooltipOptions={{ className: "teal-tooltip", position: "bottom" }}
//         name="bookmark Document"
//         // onMouseDown={showSuccess2}
//       />
//       &nbsp;
//       <Button
//         style={{
//           backgroundColor: "white",
//           height: "30px",
//           width: "30px",
//           color: "#203570",
//         }}
//         icon="pi pi-download"
//         onClick={() => {
//           downloadFileAtURL(DOC_FILE_URL);
//         }}
//         tooltip="Download "
//         tooltipOptions={{ className: "teal-tooltip", position: "bottom" }}
//         className="p-button-raised  p-button-text"
//          onMouseDown={docDownload}
//       />{" "}
//       &nbsp;
//       <Button
//         style={{
//           backgroundColor: "white",
//           height: "30px",
//           width: "30px",
//           color: "#203570",
//         }}
//         tooltip="Share "
//         tooltipOptions={{ className: "teal-tooltip", position: "bottom" }}
//         icon="pi pi-external-link"
//         className="p-button-raised p-button-text"
//       />
//       &nbsp;
    
     
//       <Dropdown
//         style={{ backgroundColor: "white", float: "right", color: "#203570" }}
//         value={version}
//         options={values}
//         onChange={(e) => onSelectVersion(e)}
//         optionLabel="version"
//         placeholder="Select"
//       />
//       <br />
//       <br />
//       <Card>
//       <ScrollPanel style={{ width: '100%', height: '360px' }}>
//         <Accordion>
//           {section.map((item) => (
//             <AccordionTab
//               header={item.sectionName}
//              onClick={() => onClickHeader(item)}
//             >

              
//               <div style={{ display: "flex", float: "right" }}>
//                 &nbsp;
  
              
//                 <Button
//                   visible={!sectionBookmark}
//                   style={{
//                     backgroundColor: "white",
//                     height: "30px",
//                     width: "30px",
//                     color: "#203570",
//                   }}
//                   icon="pi pi-bookmark"
//                   tooltip="Bookmark "
//                   tooltipOptions={{
//                     className: "teal-tooltip",
//                     position: "bottom",
//                   }}
//                   className=" p-button-raised p-button-text"
//                   onClick={BookmarkSection}
//                   onMouseDown={showSuccess3}
//                 />
//                 <Button
//                   visible={sectionBookmark}
//                   style={{
//                     backgroundColor: "white",
//                     height: "30px",
//                     width: "30px",
//                     color: "#203570",
//                   }}
//                   tooltip="Bookmark "
//                   tooltipOptions={{
//                     className: "teal-tooltip",
//                     position: "bottom",
//                   }}
//                   icon="pi pi-bookmark-fill"
//                   className=" p-button-raised p-button-text"
//                   onClick={BookmarkSection}
//                   onMouseDown={showSuccess4}
//                 />{" "}
//                 &nbsp;
//                 <Button
//                   style={{
//                     backgroundColor: "white",
//                     height: "30px",
//                     width: "30px",
//                     color: "#203570",
//                   }}
//                   icon="pi pi-download"
//                   onClick={() => {
//                     downloadSectionURL(SEC_FILE_URL);
//                   }}
//                   tooltip="Download "
//                   tooltipOptions={{
//                     className: "teal-tooltip",
//                     position: "bottom",
//                   }}
//                   className="p-button-raised p-button-text"
//                   onMouseDown={secDownload}
//                 />{" "}
//                 &nbsp;
//               </div>

//               <p>{item.sectionContaion}</p>
//             </AccordionTab>
//           ))}
//         </Accordion>
//         </ScrollPanel>
       

     
//       </Card>



//     </div>
//   );
// };
// export default Product;







// import React, { useState, useEffect, useRef } from "react";
// import { Button } from "primereact/button";
// import { Toast } from "primereact/toast";
// import { Card } from "primereact/card";
// import { NavLink, useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { Dialog } from "primereact/dialog";
// import { Dropdown } from "primereact/dropdown";
// import leftIcon from "../Assets/lefticon.png";
// import Background from "../Assets/Background.png";
// import { InputText } from "primereact/inputtext";
// import { Tag } from "primereact/tag";
// // import Section from "../Assets/Section.png";
// import plus from "../Assets/plus.png";
// import { DataTable } from "primereact/datatable";
// import { Column } from "primereact/column";

// const Product = () => {
//   let [changeText, setChangeText] = useState(Boolean);
//   const [section, setSection] = useState([]);
//   let [changeEnable, setChangeEnable] = useState(Boolean);
//   const [displayBasic, setDisplayBasic] = useState(false);
//   const [displayBasic5, setDisplayBasic5] = useState(false);
//   const [displayBasic2, setDisplayBasic2] = useState(false);
//   const [displayBasic3, setDisplayBasic3] = useState(false);
//   const [changeColor, setChangeColor] = useState(false);
//   const [changeColor2, setChangeColor2] = useState(false);
//   const { id } = useParams();
//   const [values, setValues] = useState([]);
//   const [version, setversion] = useState([]);
//   const [versiondata, setVersionData] = useState([]);
//   const [file, setFile] = useState();
//   const toast = useRef(null);
//   const [errors, setErrors] = useState({});
//   const [keywords, setKeywords] = useState("");
//   const [users, setUser] = useState([]);
//   const [keyword, setKeyword] = useState("");
//   const [secId, setsecId] = useState([]);
//   const [secId1, updatedSetsecId] = useState();
//   const [documentName, setDocumentName] = useState([]);

 

//   //DOWNLOAD

//   const DOC_FILE_URL = `${process.env.REACT_APP_API_KEY}/document/downloadFile/${id}/${version}`;
 

//   useEffect(() => {

    
  
  
//     const version = "version1";
//     setversion(version);
//     // setDocumentName(version);
//     // getDocDataByDocId(version);
   
  

//     getData(id);

//     // get all data by doc id
//     axios
//       .get(`${process.env.REACT_APP_API_KEY}/document/getDocById/${id}`)
//       .then((res) => {
//         console.log(res, "document data1234//////nnnn");
//         setDocumentName(res.data.docName);
//         setChangeText(res.data.bookmarks);
//         setChangeEnable(res.data.enable);
       
       
//         // setVersionData(res.data.version)
//         console.log(changeText, "bookmarked....!!!!");
//       });

//     // get all keywords by doc id

//     axios
//       .get(
//         `${process.env.REACT_APP_API_KEY}/document/listKeywords/${id}/${version}`
//       )
//       .then((res) => {
//         console.log(res.data, "document data1234");
//         setUser(res.data[0].keywords);
//       });
   
//     // get all sections by doc id
//     axios
//       .get(
//         `${process.env.REACT_APP_API_KEY}/document/getallsectionsbydocid/${id}/${version}`
//       )

//       .then((res) => {
//         console.log(res, "data of allsections");
//         setSection(res.data);
       
//         console.log(section, "///changeblesection data");
//         // setsectionBookmark(res.data.bookmarks);
//       });

//     // get all version by doc id
//     axios
//       .get(
//         `${process.env.REACT_APP_API_KEY}/document/getAllDocVersionsByDocId/${id}`
//       )
//       .then((res) => {
//         console.log(res.data, "version data");
//         setValues(res.data);
        
//       });
//   }, []);


//   function getDocDataByDocId(data) {
//     console.log(data, "////////////////////vijaya");
//     setVersionData(data)
  
   
//    axios
//       .get(
//         `${process.env.REACT_APP_API_KEY}/document/getallsectionsbydocid/${id}/${data}`
//       )
//   .then((res) => {
//         console.log(res.data, "data of ///sections");
//         setSection(res.data);
      
        
//       });
//   }

//   //DOCUMENT BOOKMARK

//   const bookmark = async () => {
//     console.log("Bookmarkedversion...!!", version);
   
    
//     axios
//       .put(`${process.env.REACT_APP_API_KEY}/document/setBookmark/${id}/${version}`)
//       .then((res) => {
//         console.log(res, "bookmarked applied///////////////,///");
//       });

//    window.location.reload(false);
   
//   };
 
 
//   const BookmarkSection = async (rowData) => {
//     console.log("Bookmarked...!!", rowData);
//     axios
//       .put(
      
//         `${process.env.REACT_APP_API_KEY}/document/setSectionBookmark/${rowData.secId}`
//       )
//       .then((res) => {
//         console.log(res, "bookmarked applied///////////////,///");
//         window.location.reload(false);
//       });
//   };

//   const getData = async (id) => {
//     console.log(id, "inside");
//   };

//   // DOCUMENT DOWNLOAD
//   const downloadFileAtURL = (url) => {
//     const fileName = url.split("/").pop();
//     const aTag = document.createElement("a");
//     aTag.href = url;
//     aTag.setAttribute("download", fileName);
//     document.body.appendChild(aTag);
//     aTag.click();
//     aTag.remove();
//   };

//   const docDownload = () => {
//     toast.current.show({
//       severity: "success",
//       summary: "Document Download Successfully",
//       detail: "Document Download",
//       life: 3000,
//     });
//   };

//   //SECTION DOWNLOAD
//   const downloadSectionURL = (rowData) => {
//     const url = `${process.env.REACT_APP_API_KEY}/document/downloadSec/${rowData.secId}`;

//     const fileName = url.split("/").pop();
//     const aTag = document.createElement("a");
//     aTag.href = url;

//     aTag.setAttribute("download", fileName);
//     document.body.appendChild(aTag);
//     aTag.click();
//     aTag.remove();
//   };

//   const secDownload = () => {
//     toast.current.show({
//       severity: "success",
//       summary: "Section Download Successfully",
//       detail: "Section Download",
//       life: 3000,
//     });
//   };

 


//   const dialogFuncMap = {
//     displayBasic2: setDisplayBasic2,
//     displayBasic5: setDisplayBasic5,

//     displayBasic: setDisplayBasic,
//     displayBasic3: setDisplayBasic3,
//   };

//   const onClick = (name, position) => {
   
//     // console.log(position, "shivani.....",name);
//     setKeyword(position);
//     //  updatedSetsecId(position.secId);
     
//     dialogFuncMap[`${name}`](true);
//   };









//   const onHide = (name) => {
   
//     dialogFuncMap[`${name}`](false);
//   };

//   //DOCUMENT UPLOAD

//   const documentUpload = (name) => {
//     return (
//       <div>
//         <Button
//           label="No"
//           onClick={() => onHide(name)}
//           className="p-button-text p-button-sm"
//         />
//         <Button
//           label="Yes"
//           className="p-button-sm"
//           // onMouseDown={() => onHide(name)}
//           onClick={versionUpload}
//           // onMouseUp={docUpload}
//           autoFocus
//         />
//       </div>
//     );
//   };


  
//   function onSelectVersion(rowData) {
//     setversion(rowData);
//   getDocDataByDocId(rowData);
    
  
//     axios
//     .get(
//       `${process.env.REACT_APP_API_KEY}/document/listKeywords/${id}/${rowData}`
//     )
//     .then((res) => {
//       console.log(res.data, "document data1234----");
   
//       setUser(res.data[0].keywords);
//       setChangeEnable(res.data[0].enable);
//       setChangeText(res.data[0].bookmarks);
//       setDocumentName(res.data[0].docName);
  

//     });
 
  

//   }


//   //SECTION UPDATE

//   const validateForm = () => {
//     let errors = {};
//     let isValid = true;

//     if (!file) {
//       errors.file = "This Feild is required. ";
//       isValid = false;
//     }

//     setErrors(errors);
//     return isValid;
//   };



 
//   //UPLOAD UPDATED DOCUMENT

  
//   function versionUpload() {
//     console.log("hello");
//     // const docId=id;
//     // event.preventDefault();
//     if (validateForm()) {
//       console.log("Valid form submitted:", { file });
//     }
//     const url = `${process.env.REACT_APP_API_KEY}/document/uploadNewVersions`;
//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("docId", id);
//     axios.post(url, formData).then(
//       (res) => {
//         console.log(res);
//       },
//       (error) => {
//         alert(error);
//       }
//     );

//     setTimeout(() => {
//       window.location.reload(false);
//     }, 1000);
//   }

//   // function onClickHeader(rowData) {
//   //   setsecId(rowData.secId);
//   //   console.log("rowdata of accordation tab", rowData.secId);

   
//   // }

//   //PRINT SECTION
//   const handlePrint = (rowData) => {
//     // console.log(rowData.sectionContaion, "handlePrint//////////////");
//     const content = rowData.sectionContaion;
//     window.print(content);
//   };


//   const isFormIncomplete = !keywords;
//   //post keyword
//   function saveUser() {
//     let data = { keywords };
//     fetch(
//       `${process.env.REACT_APP_API_KEY}/document/saveKeywords/${id}/${version}`,

//       {
//         method: "POST",
//         headers: {
//           Accept: "application/json",
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(data),
//       }
//     ).then((result) => {
//       result.json().then((resp) => {
//         // console.warn("resp", resp);
//       });
//     });
//     window.location.reload(false);
//   }
//   // DELETE KEYWORD

//   const DeleteKeyword = () => {
//     let data = { keyword };
  
//     fetch(
//       `${process.env.REACT_APP_API_KEY}/document/deleteKeywords/${id}/${version}`,
//       {
//         method: "DELETE",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(data),
//       }
//     )
//       .then((response) => response.json())
//       .then((data) => {
//         console.log(data); // Handle response data as needed
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//     window.location.reload(false);
//   };

//   //keyword

//   const renderFooter = (name) => {
//     return (
//       <div>
//         <Button
//           label="Cancel"
//           style={{borderRadius:"2px"}}
//           onClick={() => onHide(name)}
//           className="p-button-sm p-button-text"
//         />
//         <Button
//           label="Submit"
          
//           onClick={() => onHide(name)}
//           onMouseDown={saveUser}
//           disabled={isFormIncomplete}
//           style={{ backgroundColor: "#203570" ,borderRadius:"2px"}}
//           className="p-button-sm"
//           autoFocus
//         />

//         {/* // onClick={() => onHide(name)} */}
//       </div>
//     );
//   };

//   //DELETE KEYWORD

//   const deletekeyword = (name) => {
//     return (
//       <div>
//         <Button
//           label="No"
//           style={{borderRadius:"2px"}}
//           onClick={() => onHide(name)}
//           className="p-button-sm p-button-outlined"
//         />
//         &nbsp;&nbsp;
//         <Button
//           label="Yes"
//           className="p-button-sm"
//           style={{ backgroundColor: "#203570" ,borderRadius:"2px"}}
//           onMouseDown={() => DeleteKeyword()}
//           onClick={() => onHide(name)}
//           autoFocus
//         />
//       </div>
//     );
//   };
//   const actionBodyTemplate = (rowData) => {
//     // console.log(rowData,"///////////vijjjjj")
//     // setsecId(rowData.secId);
//     // handleSubmit(rowData)
//     return (
//       <React.Fragment>
//         {/* style={{ display: "flex" }} */}
//         <div >
//           <Button
//             style={{
//               backgroundColor: "white",
//               height: "30px",
//               width: "30px",
//               color: "#203570",
//             }}
//             icon="pi pi-print"
//             tooltip="Print Section "
//             className=" p-button-text"
//             tooltipOptions={{
//               className: "teal-tooltip",
//               position: "bottom",
//             }}
//             id="print-content"
//             onClick={() => handlePrint(rowData)}
//           />
//           &nbsp;
         
          
//           &nbsp;
//           <Button
//             visible={!rowData.bookmarks}
//             style={{
//               backgroundColor: "white",
//               height: "30px",
//               width: "30px",
//               color: "#203570",
//             }}
//             icon="pi pi-bookmark"
//             tooltip="Bookmark "
//             tooltipOptions={{
//               className: "teal-tooltip",
//               position: "bottom",
//             }}
//             className="  p-button-text"
//             onClick={() => BookmarkSection(rowData)}
//             //  onMouseDown={showSuccess3}
//             // onClick={()=>{BookmarkSection(item)}}
//           />
//           <Button
//             visible={rowData.bookmarks}
//             style={{
//               backgroundColor: "white",
//               height: "30px",
//               width: "30px",
//               color: "#203570",
//             }}
//             tooltip="Bookmark "
//             tooltipOptions={{
//               className: "teal-tooltip",
//               position: "bottom",
//             }}
//             icon="pi pi-bookmark-fill"
//             className=" p-button-text"
//             onClick={() => {
//               BookmarkSection(rowData);
//             }}
//             // onClick={() => BookmarkSection(item)}
//             // onMouseDown={showSuccess4}
//           />{" "}
//           &nbsp;
//           <Button
//             style={{
//               backgroundColor: "white",
//               height: "30px",
//               width: "30px",
//               color: "#203570",
//             }}
//             icon="pi pi-download"
//             onClick={() => {
//               downloadSectionURL(rowData);
//             }}
//             tooltip="Download "
//             tooltipOptions={{
//               className: "teal-tooltip",
//               position: "bottom",
//             }}
//             className=" p-button-text"
//             onMouseDown={secDownload}
//           />{" "}
//           &nbsp;
//         </div>
//       </React.Fragment>
//     );
//   };

//   return (
//     <div>
//       <Toast ref={toast} />
//       <NavLink to="/usersearch" className="link1">
//         <Button
//           style={{ backgroundColor: "white", color: "black", height: "37px" }}
//           className="p-button-raised  p-button p-button-secondary p-button-text"
//         >
//           <img
//             style={{ width: "25px", marginRight: "10px", height: "25px" }}
//             src={leftIcon}
//             alt="leftIcon "
//           />
//           <b>{documentName}</b>
          
//         </Button>
//       </NavLink>
//       <img
//         style={{ height: "55px", float: "right" }}
//         src={Background}
//         alt=" Background "
//       />
//       &nbsp;
//       <Button
//         visible={!changeText}
//         style={{
//           backgroundColor: "white",
//           height: "37px",
//           width: "37px",
//           color: "#203570",
//         }}
//         icon="pi pi-bookmark"
//         className=" p-button-raised p-button-text"
//         onClick={bookmark}
//         tooltip="Bookmark"
//         tooltipOptions={{ className: "teal-tooltip", position: "bottom" }}
//         name="bookmark Document"
//         // onMouseDown={showSuccess}
//       />
//       <Button
//         visible={changeText}
//         style={{
//           backgroundColor: "white",
//           height: "37px",
//           width: "37px",
//           color: "#203570",
//         }}
//         icon="pi pi-bookmark-fill"
//         className=" p-button-raised p-button-text"
//         onClick={bookmark}
//         tooltip=" Bookmark"
//         tooltipOptions={{ className: "teal-tooltip", position: "bottom" }}
//         name="bookmark Document"
//         // onMouseDown={showSuccess2}
//       />
//       &nbsp;
//       <Button
//         style={{
//           backgroundColor: "white",
//           height: "37px",
//           width: "37px",
//           color: "#203570",
//         }}
//         icon="pi pi-download"
//         onClick={() => {
//           downloadFileAtURL(DOC_FILE_URL);
//         }}
//         tooltip="Download "
//         tooltipOptions={{ className: "teal-tooltip", position: "bottom" }}
//         className="p-button-raised p-button-text"
//         onMouseDown={docDownload}
//       />{" "}
//       &nbsp;
//       <Button
//         style={{
//           backgroundColor: "white",
//           height: "37px",
//           width: "37px",
//           color: "#203570",
//         }}
//         tooltip="Share "
//         tooltipOptions={{ className: "teal-tooltip", position: "bottom" }}
//         icon="pi pi-external-link"
//         className=" p-button-raised p-button-text"
//       />
//       &nbsp;
   
   
     
//       <Dropdown
//         style={{ backgroundColor: "white", height: "39px", color: "#203570" }}
//         placeholder="Select "
//         value={versiondata}
//         options={values}
//         onChange={(e) => onSelectVersion(e.value)}
//         optionLabel="version"
//         optionValue="version"
        
//       />
//       <br />
//       <br />
//       <Card>
//         <Button
//           style={{
//             backgroundColor: "white",
//             float: "right",
//             color: "black",
//             height: "37px",
//           }}
//           className=" p-button p-button-secondary p-button-text"
//           onClick={() => onClick("displayBasic")}
//         >
//           <img
//             style={{ width: "15px", marginRight: "5px", height: "15px" }}
//             src={plus}
//             alt="plus "
//           />
//           <p style={{ color: "#203570" }}> Add Keywords</p>
//         </Button>
//         <Dialog
//           icon="pi pi-plus-circle"
//           header="Add Keyword"
//           visible={displayBasic}
//           style={{ width: "25vw" }}
//           footer={renderFooter("displayBasic")}
//           onHide={() => onHide("displayBasic")}
//         >
//           <InputText
//             type="text "
//             style={{ width: "100%" }}
//             placeholder="Enter Keyword "
//             onChange={(e) => {
//               setKeywords(e.target.value);
//             }}
//           />
//         </Dialog>
//         {/* <Button
//           style={{
//             backgroundColor: "white",
//             color: "black",
//           }}
//           className=" p-button p-button-secondary p-button-text"
//         >
//           <img
//             style={{ width: "22px", marginRight: "5px", height: "22px" }}
//             src={Section}
//             alt="Section "
//           />
//           <b> Identified Sections</b>
//         </Button>
//         <br /> */}
//         {users.map((keywords) => (
//           <Tag
//             style={{
//               backgroundColor: "#49ABA0",
//               marginRight: "3px",
//               borderRadius: "12px",
//             }}
//             icon="pi pi-times"
//             onClick={() => onClick("displayBasic3", keywords)}
//           >
//             {keywords}
//           </Tag>
//           // <Button >{item}</Button>
//         ))}
//         &nbsp;
//         <br />
//         <br />
//         <hr />
//         <Dialog
//           header="Delete Keyword ?"
//           visible={displayBasic3}
//           style={{ width: "30vw" }}
//           footer={deletekeyword("displayBasic3")}
//           onHide={() => onHide("displayBasic3")}
//         >
//           <p>Are you sure you want to delete this keyword ?</p>
//         </Dialog>
//         {/* <ScrollPanel style={{ width: "100%", height: "360px" }}>
//           <div id="accordion-container">
//             <Accordion activeIndex={0}>
//               {section.map((item) => (
                
//                 <AccordionTab
//                   header={item.sectionName
//                   }
                  
                  
//                   onClick={() => onClickHeader(item)}
//                 >
//                   <div style={{ display: "flex", float: "right" }}>
//                     <Button
//                       style={{
//                         backgroundColor: "white",
//                         height: "30px",
//                         width: "30px",
//                         color: "#203570",
//                       }}
//                       icon="pi pi-print"
//                       tooltip="Print Section "
//                       className=" p-button-raised p-button-text"
//                       tooltipOptions={{
//                         className: "teal-tooltip",
//                         position: "bottom",
//                       }}
//                       id="print-content"
//                       onClick={() => handlePrint(item)}
//                     />
//                     &nbsp;
//                     <Button
//                       style={{
//                         backgroundColor: "white",
//                         height: "30px",
//                         width: "30px",
//                         color: "#203570",
//                       }}
//                       icon="pi pi-upload"
//                       tooltip="Update "
//                       className=" p-button-raised p-button-text"
//                       tooltipOptions={{
//                         className: "teal-tooltip",
//                         position: "bottom",
//                       }}
//                       onClick={() => onClick("displayBasic5")}
//                     />
//                     <Dialog
//                       header="Update particular section"
//                       visible={displayBasic5}
//                       style={{ width: "35vw" }}
//                       footer={sectionupload("displayBasic5")}
//                       onHide={() => onHide("displayBasic5")}
//                     >
//                       <form onSubmit={handleSubmit}>
//                         <input
//                           style={{
//                             marginTop: "15px",
//                             marginLeft: "15px",
//                           }}
//                           type="file"
//                           onChange={Documentupload}
//                         />
//                         {errors.file && (
//                           <div style={{ color: "red" }}>{errors.file}</div>
//                         )}
//                       </form>
//                     </Dialog>
//                     &nbsp;
//                     <Button
//                       visible={!item.bookmarks}
//                       style={{
//                         backgroundColor: "white",
//                         height: "30px",
//                         width: "30px",
//                         color: "#203570",
//                       }}
//                       icon="pi pi-bookmark"
//                       tooltip="Bookmark "
//                       tooltipOptions={{
//                         className: "teal-tooltip",
//                         position: "bottom",
//                       }}
//                       className=" p-button-raised p-button-text"
//                       onClick={() => BookmarkSection(item)}
//                       //  onMouseDown={showSuccess3}
//                       // onClick={()=>{BookmarkSection(item)}}
//                     />
//                     <Button
//                       visible={item.bookmarks}
//                       style={{
//                         backgroundColor: "white",
//                         height: "30px",
//                         width: "30px",
//                         color: "#203570",
//                       }}
//                       tooltip="Bookmark "
//                       tooltipOptions={{
//                         className: "teal-tooltip",
//                         position: "bottom",
//                       }}
//                       icon="pi pi-bookmark-fill"
//                       className=" p-button-raised p-button-text"
//                       // onClick={()=>{BookmarkSection(item)}}
//                       onClick={() => BookmarkSection(item)}
//                       // onMouseDown={showSuccess4}
//                     />{" "}
//                     &nbsp;
//                     <Button
//                       style={{
//                         backgroundColor: "white",
//                         height: "30px",
//                         width: "30px",
//                         color: "#203570",
//                       }}
//                       icon="pi pi-download"
//                       onClick={() => {
//                         downloadSectionURL(item);
//                       }}
//                       tooltip="Download "
//                       tooltipOptions={{
//                         className: "teal-tooltip",
//                         position: "bottom",
//                       }}
//                       className="p-button-raised p-button-text"
//                       onMouseDown={secDownload}
//                     />{" "}
//                     &nbsp;
//                   </div>

//                   <p>{item.sectionContaion}</p>
//                 </AccordionTab>
//               ))}
//             </Accordion>
//           </div>
          
//         </ScrollPanel>
//  */}
//         <DataTable 
//         scrollable
//          scrollHeight="400px"
//           value={section} 
//          responsiveLayout="scroll">
          
//           <Column field="sectionName" header="Identified Sections"></Column>

//           <Column  header="Action"  body={ (e)=>actionBodyTemplate(e)} ></Column>

//         </DataTable>
       
//       </Card>
//     </div>
//   );
// };
// export default Product;

// ///Notes :replace rowData  with item to view Accordation













// import React, { useState, useEffect, useRef } from "react";
// import { Button } from "primereact/button";
// import { Toast } from "primereact/toast";
// import { Card } from "primereact/card";
// import { NavLink, useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { Dialog } from "primereact/dialog";
// import { Dropdown } from "primereact/dropdown";
// import leftIcon from "../Assets/lefticon.png";
// import Background from "../Assets/Background.png";
// import { InputText } from "primereact/inputtext";
// import { Tag } from "primereact/tag";
// // import Section from "../Assets/Section.png";
// import plus from "../Assets/plus.png";
// import { DataTable } from "primereact/datatable";
// import { Column } from "primereact/column";

// const Product = () => {
//   let [changeText, setChangeText] = useState(Boolean);
//   const [section, setSection] = useState([]);
//   let [changeEnable, setChangeEnable] = useState(Boolean);
//   const [displayBasic, setDisplayBasic] = useState(false);
//   const [displayBasic5, setDisplayBasic5] = useState(false);
//   const [displayBasic2, setDisplayBasic2] = useState(false);
//   const [displayBasic3, setDisplayBasic3] = useState(false);
//   const [changeColor, setChangeColor] = useState(false);
//   const [changeColor2, setChangeColor2] = useState(false);
//   const { id } = useParams();
//   const [values, setValues] = useState([]);
//   const [version, setversion] = useState([]);
//   const [versiondata, setVersionData] = useState([]);
//   const [file, setFile] = useState();
//   const toast = useRef(null);
//   const [errors, setErrors] = useState({});
//   const [keywords, setKeywords] = useState("");
//   const [users, setUser] = useState([]);
//   const [keyword, setKeyword] = useState("");
//   const [secId, setsecId] = useState([]);
//   const [secId1, updatedSetsecId] = useState();
//   const [documentName, setDocumentName] = useState([]);

 

//   const handleClick = () => {
//     setChangeColor(!changeColor);
//   };

//   const handleClick2 = () => {
//     setChangeColor2(!changeColor2);
//   };

//   //DOWNLOAD

//   const DOC_FILE_URL = `${process.env.REACT_APP_API_KEY}/document/downloadFile/${id}/${version}`;
 

//   useEffect(() => {

    
  
  
//     const version = "version1";
//     setversion(version);
//     // setDocumentName(version);
//     // getDocDataByDocId(version);
   
  

//     getData(id);

//     // get all data by doc id
//     axios
//       .get(`${process.env.REACT_APP_API_KEY}/document/getDocById/${id}`)
//       .then((res) => {
//         console.log(res, "document data1234//////nnnn");
//         setDocumentName(res.data.docName);
//         setChangeText(res.data.bookmarks);
//         setChangeEnable(res.data.enable);
       
       
//         // setVersionData(res.data.version)
//         console.log(changeText, "bookmarked....!!!!");
//       });

//     // get all keywords by doc id

//     axios
//       .get(
//         `${process.env.REACT_APP_API_KEY}/document/listKeywords/${id}/${version}`
//       )
//       .then((res) => {
//         console.log(res.data, "document data1234");
//         setUser(res.data[0].keywords);
//       });
   
//     // get all sections by doc id
//     axios
//       .get(
//         `${process.env.REACT_APP_API_KEY}/document/getallsectionsbydocid/${id}/${version}`
//       )

//       .then((res) => {
//         console.log(res, "data of allsections");
//         setSection(res.data);
       
//         console.log(section, "///changeblesection data");
//         // setsectionBookmark(res.data.bookmarks);
//       });

//     // get all version by doc id
//     axios
//       .get(
//         `${process.env.REACT_APP_API_KEY}/document/getAllDocVersionsByDocId/${id}`
//       )
//       .then((res) => {
//         console.log(res.data, "version data");
//         setValues(res.data);
        
//       });
//   }, []);


//   function getDocDataByDocId(data) {
//     console.log(data, "////////////////////vijaya");
//     setVersionData(data)
  
   
//    axios
//       .get(
//         `${process.env.REACT_APP_API_KEY}/document/getallsectionsbydocid/${id}/${data}`
//       )
//   .then((res) => {
//         console.log(res.data, "data of ///sections");
//         setSection(res.data);
      
        
//       });
//   }

//   //DOCUMENT BOOKMARK

//   const bookmark = async () => {
//     console.log("Bookmarkedversion...!!", version);
   
    
//     axios
//       .put(`${process.env.REACT_APP_API_KEY}/document/setBookmark/${id}/${version}`)
//       .then((res) => {
//         console.log(res, "bookmarked applied///////////////,///");
//       });

//    window.location.reload(false);
   
//   };
 
 
//   const BookmarkSection = async (rowData) => {
//     console.log("Bookmarked...!!", rowData);
//     axios
//       .put(
      
//         `${process.env.REACT_APP_API_KEY}/document/setSectionBookmark/${rowData.secId}/${version}`
//       )
//       .then((res) => {
//         console.log(res, "bookmarked applied///////////////,///");
//         window.location.reload(false);
//       });
//   };

//   const getData = async (id) => {
//     console.log(id, "inside");
//   };

//   // DOCUMENT DOWNLOAD
//   const downloadFileAtURL = (url) => {
//     const fileName = url.split("/").pop();
//     const aTag = document.createElement("a");
//     aTag.href = url;
//     aTag.setAttribute("download", fileName);
//     document.body.appendChild(aTag);
//     aTag.click();
//     aTag.remove();
//   };

//   const docDownload = () => {
//     toast.current.show({
//       severity: "success",
//       summary: "Document Download Successfully",
//       detail: "Document Download",
//       life: 3000,
//     });
//   };

//   //SECTION DOWNLOAD
//   const downloadSectionURL = (rowData) => {
//     const url = `${process.env.REACT_APP_API_KEY}/document/downloadSec/${rowData.secId}`;

//     const fileName = url.split("/").pop();
//     const aTag = document.createElement("a");
//     aTag.href = url;

//     aTag.setAttribute("download", fileName);
//     document.body.appendChild(aTag);
//     aTag.click();
//     aTag.remove();
//   };

//   const secDownload = () => {
//     toast.current.show({
//       severity: "success",
//       summary: "Section Download Successfully",
//       detail: "Section Download",
//       life: 3000,
//     });
//   };

 

//   const enable = () => {
//     toast.current.show({
//       severity: "success",
//       summary: "Document Enabled Successfully",
//       detail: "Document Enable",
//       life: 3000,
//     });
//   };

//   const disable = () => {
//     toast.current.show({
//       severity: "success",
//       summary: "Document Disabled Successfully",
//       detail: "Document Disabled",
//       life: 3000,
//     });
//   };

//   // const docUpload = () => {
//   //   alert("hii")
//   //   toast.current.show({
//   //     severity: "success",
//   //     summary: "Document Uploaded Successfully",
//   //     detail: "Document Uploaded",
//   //     life: 3000,
//   //   });
//   // };

//   const dialogFuncMap = {
//     displayBasic2: setDisplayBasic2,
//     displayBasic5: setDisplayBasic5,

//     displayBasic: setDisplayBasic,
//     displayBasic3: setDisplayBasic3,
//   };

//   const onClick = (name, position) => {
   
//     // console.log(position, "shivani.....",name);
//     setKeyword(position);
//     //  updatedSetsecId(position.secId);
     
//     dialogFuncMap[`${name}`](true);
//   };

//   const onMouseDown = (name, position) => {
  
//      updatedSetsecId(position.secId);
     
//     dialogFuncMap[`${name}`](true);
//   };









//   const onHide = (name) => {
   
//     dialogFuncMap[`${name}`](false);
//   };

//   //DOCUMENT UPLOAD

//   const documentUpload = (name) => {
//     return (
//       <div>
//         <Button
//           label="No"
//           onClick={() => onHide(name)}
//           className="p-button-text p-button-sm"
//         />
//         <Button
//           label="Yes"
//           className="p-button-sm"
//           // onMouseDown={() => onHide(name)}
//           onClick={versionUpload}
//           // onMouseUp={docUpload}
//           autoFocus
//         />
//       </div>
//     );
//   };

//   //SECTION UPLOAD

//   const sectionupload = (name) => {
//     return (
//       <div>
//         <Button
//           label="No"
//           style={{borderRadius:"2px"}}
//           onClick={() => onHide(name)}
//           className="p-button-text p-button-sm"
//         />
//         <Button
//           label="Yes"
//           className="p-button-sm"
//           style={{borderRadius:"2px"}}
//           onClick={() => onHide(name)}
//           onMouseDown={handleSubmit}
//           // onMouseUp={secUpload}
//           autoFocus
//         />
//       </div>
//     );
//   };

//   function onSelectVersion(rowData) {
//     setversion(rowData);
//   getDocDataByDocId(rowData);
    
  
//     axios
//     .get(
//       `${process.env.REACT_APP_API_KEY}/document/listKeywords/${id}/${rowData}`
//     )
//     .then((res) => {
//       console.log(res.data, "document data1234----");
   
//       setUser(res.data[0].keywords);
//       setChangeEnable(res.data[0].enable);
//       setChangeText(res.data[0].bookmarks);
//       setDocumentName(res.data[0].docName);
  

//     });
 
  

//   }


//   //SECTION UPDATE

//   const validateForm = () => {
//     let errors = {};
//     let isValid = true;

//     if (!file) {
//       errors.file = "This Feild is required. ";
//       isValid = false;
//     }

//     setErrors(errors);
//     return isValid;
//   };

//   function Documentupload(event) {
//     setFile(event.target.files[0]);
//   }

//   function handleSubmit(event) {
//     event.preventDefault();
//     if (validateForm()) {
//       console.log("Valid form submitted:", { file });
//     }

//     const url =`${process.env.REACT_APP_API_KEY}/document/updateSec`;

//     const formData = new FormData();

//     formData.append("file", file);
//     formData.append("docId", id);
//     formData.append("secId",secId1);
   
//     // console.log(
//     //   formData,
//     //   "////////////////////Section Data................//////////"
//     // );
//     axios.put(url, formData).then((res) => {});
//     // window.location.reload(false);
//     setTimeout(() => {
//       window.location.reload(false);
//     }, 1000);

   
//   }



  

//   function versionUpload() {
//     console.log("hello");
//     // const docId=id;
//     // event.preventDefault();
//     if (validateForm()) {
//       console.log("Valid form submitted:", { file });
//     }
//     const url = `${process.env.REACT_APP_API_KEY}/document/uploadNewVersions`;
//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("docId", id);
//     axios.post(url, formData).then(
//       (res) => {
//         console.log(res);
//       },
//       (error) => {
//         alert(error);
//       }
//     );

//     setTimeout(() => {
//       window.location.reload(false);
//     }, 1000);
//   }

//   // function onClickHeader(rowData) {
//   //   setsecId(rowData.secId);
//   //   console.log("rowdata of accordation tab", rowData.secId);

   
//   // }

//   //PRINT SECTION
//   const handlePrint = (rowData) => {
//     // console.log(rowData.sectionContaion, "handlePrint//////////////");
//     const content = rowData.sectionContaion;
//     window.print(content);
//   };


 
//   const isFormIncomplete = !keywords;
//   //post keyword
//   function saveUser() {
//     let data = { keywords };
//     fetch(
//       `${process.env.REACT_APP_API_KEY}/document/saveKeywords/${id}/${version}`,

//       {
//         method: "POST",
//         headers: {
//           Accept: "application/json",
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(data),
//       }
//     ).then((result) => {
//       result.json().then((resp) => {
//         // console.warn("resp", resp);
//       });
//     });
//     window.location.reload(false);
//   }
//   // DELETE KEYWORD

//   const DeleteKeyword = () => {
//     let data = { keyword };
  
//     fetch(
//       `${process.env.REACT_APP_API_KEY}/document/deleteKeywords/${id}/${version}`,
//       {
//         method: "DELETE",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(data),
//       }
//     )
//       .then((response) => response.json())
//       .then((data) => {
//         console.log(data); // Handle response data as needed
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//     window.location.reload(false);
//   };

//   //keyword

//   const renderFooter = (name) => {
//     return (
//       <div>
//         <Button
//           label="Cancel"
//           style={{borderRadius:"2px"}}
//           onClick={() => onHide(name)}
//           className="p-button-sm p-button-text"
//         />
//         <Button
//           label="Submit"
          
//           onClick={() => onHide(name)}
//           onMouseDown={saveUser}
//           disabled={isFormIncomplete}
//           style={{ backgroundColor: "#203570" ,borderRadius:"2px"}}
//           className="p-button-sm"
//           autoFocus
//         />

//         {/* // onClick={() => onHide(name)} */}
//       </div>
//     );
//   };

//   //DELETE KEYWORD

//   const deletekeyword = (name) => {
//     return (
//       <div>
//         <Button
//           label="No"
//           style={{borderRadius:"2px"}}
//           onClick={() => onHide(name)}
//           className="p-button-sm p-button-outlined"
//         />
//         &nbsp;&nbsp;
//         <Button
//           label="Yes"
//           className="p-button-sm"
//           style={{ backgroundColor: "#203570" ,borderRadius:"2px"}}
//           onMouseDown={() => DeleteKeyword()}
//           onClick={() => onHide(name)}
//           autoFocus
//         />
//       </div>
//     );
//   };
//   const actionBodyTemplate = (rowData) => {
//     // console.log(rowData,"///////////vijjjjj")
//     // setsecId(rowData.secId);
//     // handleSubmit(rowData)
//     return (
//       <React.Fragment>
//         {/* style={{ display: "flex" }} */}
//         <div >
//           <Button
//             style={{
//               backgroundColor: "white",
//               height: "30px",
//               width: "30px",
//               color: "#203570",
//             }}
//             icon="pi pi-print"
//             tooltip="Print Section "
//             className=" p-button-text"
//             tooltipOptions={{
//               className: "teal-tooltip",
//               position: "bottom",
//             }}
//             id="print-content"
//             onClick={() => handlePrint(rowData)}
//           />
         
       
//           &nbsp;
//           <Button
//             visible={!rowData.bookmarks}
//             style={{
//               backgroundColor: "white",
//               height: "30px",
//               width: "30px",
//               color: "#203570",
//             }}
//             icon="pi pi-bookmark"
//             tooltip="Bookmark "
//             tooltipOptions={{
//               className: "teal-tooltip",
//               position: "bottom",
//             }}
//             className="  p-button-text"
//             onClick={() => BookmarkSection(rowData)}
//             //  onMouseDown={showSuccess3}
//             // onClick={()=>{BookmarkSection(item)}}
//           />
//           <Button
//             visible={rowData.bookmarks}
//             style={{
//               backgroundColor: "white",
//               height: "30px",
//               width: "30px",
//               color: "#203570",
//             }}
//             tooltip="Bookmark "
//             tooltipOptions={{
//               className: "teal-tooltip",
//               position: "bottom",
//             }}
//             icon="pi pi-bookmark-fill"
//             className=" p-button-text"
//             onClick={() => {
//               BookmarkSection(rowData);
//             }}
//             // onClick={() => BookmarkSection(item)}
//             // onMouseDown={showSuccess4}
//           />{" "}
//           &nbsp;
//           <Button
//             style={{
//               backgroundColor: "white",
//               height: "30px",
//               width: "30px",
//               color: "#203570",
//             }}
//             icon="pi pi-download"
//             onClick={() => {
//               downloadSectionURL(rowData);
//             }}
//             tooltip="Download "
//             tooltipOptions={{
//               className: "teal-tooltip",
//               position: "bottom",
//             }}
//             className=" p-button-text"
//             onMouseDown={secDownload}
//           />{" "}
//           &nbsp;
//         </div>
//       </React.Fragment>
//     );
//   };

//   return (
//     <div>
//       <Toast ref={toast} />
//       <NavLink to="/usersearch" className="link1">
//         <Button
//           style={{ backgroundColor: "white", color: "black", height: "37px" }}
//           className="p-button-raised  p-button p-button-secondary p-button-text"
//         >
//           <img
//             style={{ width: "25px", marginRight: "10px", height: "25px" }}
//             src={leftIcon}
//             alt="leftIcon "
//           />
//           <b>{documentName}</b>
          
//         </Button>
//       </NavLink>
//       <img
//         style={{ height: "55px", float: "right" }}
//         src={Background}
//         alt=" Background "
//       />
//       &nbsp;
//       <Button
//         visible={!changeText}
//         style={{
//           backgroundColor: "white",
//           height: "37px",
//           width: "37px",
//           color: "#203570",
//         }}
//         icon="pi pi-bookmark"
//         className=" p-button-raised p-button-text"
//         onClick={bookmark}
//         tooltip="Bookmark"
//         tooltipOptions={{ className: "teal-tooltip", position: "bottom" }}
//         name="bookmark Document"
//         // onMouseDown={showSuccess}
//       />
//       <Button
//         visible={changeText}
//         style={{
//           backgroundColor: "white",
//           height: "37px",
//           width: "37px",
//           color: "#203570",
//         }}
//         icon="pi pi-bookmark-fill"
//         className=" p-button-raised p-button-text"
//         onClick={bookmark}
//         tooltip=" Bookmark"
//         tooltipOptions={{ className: "teal-tooltip", position: "bottom" }}
//         name="bookmark Document"
//         // onMouseDown={showSuccess2}
//       />
//       &nbsp;
//       <Button
//         style={{
//           backgroundColor: "white",
//           height: "37px",
//           width: "37px",
//           color: "#203570",
//         }}
//         icon="pi pi-download"
//         onClick={() => {
//           downloadFileAtURL(DOC_FILE_URL);
//         }}
//         tooltip="Download "
//         tooltipOptions={{ className: "teal-tooltip", position: "bottom" }}
//         className="p-button-raised p-button-text"
//         onMouseDown={docDownload}
//       />{" "}
//       &nbsp;
//       <Button
//         style={{
//           backgroundColor: "white",
//           height: "37px",
//           width: "37px",
//           color: "#203570",
//         }}
//         tooltip="Share "
//         tooltipOptions={{ className: "teal-tooltip", position: "bottom" }}
//         icon="pi pi-external-link"
//         className=" p-button-raised p-button-text"
//       />
//       &nbsp;

     
//       <Dropdown
//         style={{ backgroundColor: "white", color: "#203570" }}
//         placeholder="Select "
//         value={versiondata}
//         className="custom-dropdown" 
//         options={values}
//         onChange={(e) => onSelectVersion(e.value)}
//         optionLabel="version"
//         optionValue="version"
        
//       />
//       <br />
//       <br />
//       <Card>
//         <Button
//           style={{
//             backgroundColor: "white",
//             float: "right",
//             color: "black",
//             height: "37px",
//           }}
//           className=" p-button p-button-secondary p-button-text"
//           onClick={() => onClick("displayBasic")}
//         >
//           <img
//             style={{ width: "15px", marginRight: "5px", height: "15px" }}
//             src={plus}
//             alt="plus "
//           />
//           <p style={{ color: "#203570" }}> Add Keywords</p>
//         </Button>
//         <Dialog
//           icon="pi pi-plus-circle"
//           header="Add Keyword"
//           visible={displayBasic}
//           style={{ width: "25vw" }}
//           footer={renderFooter("displayBasic")}
//           onHide={() => onHide("displayBasic")}
//         >
//           <InputText
//             type="text "
//             style={{ width: "100%" }}
//             placeholder="Enter Keyword "
//             onChange={(e) => {
//               setKeywords(e.target.value);
//             }}
//           />
//         </Dialog>
    
//         {users.map((keywords) => (
//           <Tag
//             style={{
//               backgroundColor: "#49ABA0",
//               marginRight: "3px",
//               borderRadius: "12px",
//             }}
//             icon="pi pi-times"
//             onClick={() => onClick("displayBasic3", keywords)}
//           >
//             {keywords}
//           </Tag>
//           // <Button >{item}</Button>
//         ))}
//         &nbsp;
//         <br />
//         <br />
//         <hr />
//         <Dialog
//           header="Delete Keyword ?"
//           visible={displayBasic3}
//           style={{ width: "30vw" }}
//           footer={deletekeyword("displayBasic3")}
//           onHide={() => onHide("displayBasic3")}
//         >
//           <p>Are you sure you want to delete this keyword ?</p>
//         </Dialog>
       
//         <DataTable 
//         scrollable
//          scrollHeight="400px"
//           value={section} 
//         //  responsiveLayout="scroll"
//          >
          
//           <Column field="sectionName" header="Identified Sections"></Column>

//           <Column  header="Action"  body={ (e)=>actionBodyTemplate(e)} ></Column>

//         </DataTable>
     
//       </Card>
//     </div>
//   );
// };
// export default Product;

// /Notes :replace rowData  with item to view Accordation
