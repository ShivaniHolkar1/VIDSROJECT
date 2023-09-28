// // import React, { useEffect, useState } from "react";
// // import { InputText } from "primereact/inputtext";
// // import { Card } from "primereact/card";
// // import { ScrollPanel } from "primereact/scrollpanel";
// // import { Button } from "primereact/button";

// // function SearchProduct() {
// //   const [data, setData] = useState([]);
// //   const [customer, setCustomers] = useState([]);
// //   const [first, setFirst] = useState(0);
// //   const [rows, setRows] = useState(0);
// //   let [id, setdocumentId] = useState("");

// //   const downloadFileAtURL = (e) => {
// // // console.log(e);
// //     let url=`${process.env.REACT_APP_API_KEY}/document/downloadFile/${e.id  }`;
// //     const fileName = url.split("/").pop();
// //     const aTag = document.createElement("a");
// //     aTag.href = url;
// //     aTag.setAttribute("download", fileName);
// //     document.body.appendChild(aTag);
// //     aTag.click();
// //     aTag.remove();
// //   };

// //   const [query] = useState();
// //   const onPageChange = (e) => {
// //     setFirst(e.first);
// //     setRows(e.rows);
// //   };

// //   async function search(key) {
// //     if (key.length > 1) {
// //       let text = key;
// //       let encoded = window.btoa(text);
// //       let result = await fetch(
// //         `${process.env.REACT_APP_API_KEY}/sample/getHighlightedValue/` + encoded
// //       );
// //       result = await result.json();
// //       console.warn("Tasdiq", result);
// //       setData(result);
// //       setCustomers(result);
// //       // setdocumentId(result.id);
// //       // alert(id)
// //     }
// //   }

// //   return (
// //     <div>
// //       <Card >
// //         <span style={{ marginLeft: "20%" }} className="p-input-icon-left">
// //           <i className="pi pi-search" />

// //           <InputText
// //             type="text"
// //             style={{ width: "300%" }}
// //             value={query}
// //             onKeyDown={(e) => search(e.target.value)}
// //             //onChange
// //             className="p-inputtext-sm form-control"
// //             placeholder="Search"
// //           />
// //         </span>
// //         <br />
// //         <br />

// //         <ScrollPanel style={{ width: "100%", height: "350px" }}>
// //           {data.length > 0 ? (
// //             <div value={customer}>
// //               {customer.map((data) => (
// //                 <div key={data.id}>
// //                   <br />
// //                   <Card >
// //                     <h4>{data.filename}</h4>

// //                     <Button
// //                       style={{
// //                         backgroundColor: "white",
// //                         height: "30px",
// //                         width: "30px",
// //                         color: "#203570",
// //                         float: "right",
// //                       }}
// //                       icon="pi pi-download"
// //                       onClick={() => {
// //                         downloadFileAtURL(data);
// //                       }}
// //                       tooltip="Download "
// //                       tooltipOptions={{
// //                         className: "teal-tooltip",
// //                         position: "bottom",
// //                       }}
// //                       className="p-button-raised  p-button-text"
// //                     />

// //                     <br />
// //                     <br />

// //                     <p dangerouslySetInnerHTML={{ __html: data.content }}></p>

// //                     <label style={{ float: "right" }}>
// //                       <b>Last Edited By:</b>
// //                       {data.edit}{" "}
// //                     </label>
// //                   </Card>
// //                 </div>
// //               ))}
// //             </div>
// //           ) : null}
// //         </ScrollPanel>
// //       </Card>
// //     </div>
// //   );
// // }
// // export default SearchProduct;



// import React, { useState, useRef } from "react";
// import { DataTable } from "primereact/datatable";
// import { Column } from "primereact/column";
// import { InputText } from "primereact/inputtext";
// import { Button } from "primereact/button";
// import { Toast } from "primereact/toast";
// import { useNavigate } from "react-router-dom";
// import { CustomerService } from "../service/CustomerService";

// const DocumentSearch = () => {
//   const [data, setData] = useState([]);
//   const [customer, setCustomers] = useState([]);
//   const [id, setSectionId] = useState([]);
//   const [query] = useState();
//   const toast = useRef(null);
//   const navigate = useNavigate();
//   const customerService = new CustomerService();

// const SEC_FILE_URL = `${process.env.REACT_APP_API_KEY}/document/downloadSec/${id}`;

// const downloadSectionURL = (url) => {
//     const fileName = url.split("/").pop();
//     const aTag = document.createElement("a");
//     aTag.href = url;

//     aTag.setAttribute("download", fileName);
//     document.body.appendChild(aTag);
//     aTag.click();
//     aTag.remove();
//   };

//  async function search(key) {
//     if (key.length > 1) {
//       let text = key;
//       let encoded = window.btoa(text);
//       let result = await fetch(
//         `${process.env.REACT_APP_API_KEY}/sample/getSectionHighlightedValue/` + encoded
//       );
//       result = await result.json();
//       console.warn("Tasdiq", result);


//       // for(let i=0;i<result.length;i++){
//       //   // console.log("result at ",[i]," is ",result[i])
//       //   for(let j=0;j<result[i].content.length;j++){
//       //     // console.log(result[i][j]," is ",result[i].content[j]);
//       //     allSecData.push(result[i].content[j]);
//       //   }
//       // }

//       // console.log("all sections",allSecData);

//       setData(result);
//       setCustomers(result);
//       console.log(customer, "/////////////////////////////////////****");
//     }
//   }

//   const customBody = (rowData, column) => {
//     return <span dangerouslySetInnerHTML={{ __html: rowData[column.field] }} />;
//   };

// const actionbodyTemplate = (rowData) => {
// setSectionId(rowData.id);

//     return (
//       <React.Fragment>
//       <Button
//           style={{
//             backgroundColor: "white",
//             height: "30px",
//             width: "30px",
//             color: "#203570",

//           }}
//           icon="pi pi-file"
//           onClick={() => editProduct(rowData)}
//           className="p-button-raised  p-button-text"
//         />

//         <Button
//           style={{
//             backgroundColor: "white",
//             height: "30px",
//             width: "30px",
//             color: "#203570",
//             float: "right",
//             marginLeft: "40px",
//             marginTop: "-30px",
//           }}
//           icon="pi pi-download"
//           onClick={() => {
//             downloadSectionURL(SEC_FILE_URL);
//           }}
//           tooltip="Download "
//           tooltipOptions={{ className: "teal-tooltip", position: "bottom" }}
//           className="p-button-raised  p-button-text"
//          />
//       </React.Fragment>
//     );
//   };

//   const editProduct = (product) => {
//     customerService.docDataById = product;
//     console.log(customerService.docDataById, "./././././././");
//     navigate("/Version/" + product.Docid);

//     console.log(product, " document data by id.....");
//   };

//   return (
//     <div style={{ height: "470px" }}>
//     <Toast ref={toast} />
//       {/* <Card style={{ height: "450px" }}> */}
//         <span
//           className="p-input-icon-left"
//           style={{ width: "70%", marginLeft: "15%" }}
//         >
//           <i className="pi pi-search" />
//           <InputText
//             type="text"
//             value={query}
//             onKeyDown={(e) => search(e.target.value)}
//             className="p-inputtext-sm form-control"
//             placeholder="Search"
//           />
//         </span>

//         <br />
//         <br />
//         {data.length > 0 ? (
//           <DataTable
//             value={data}
//             paginator
//             scrollable 
//             scrollHeight="340px"
//             responsiveLayout="scroll"
//             paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
//             currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
//             rows={4}
//             rowsPerPageOptions={[10, 20, 50]}
//           >
//             <Column field="name" header="Section Name" />

//             <Column
//             field="content"

//               body={customBody}
//               header="Description"
//             />
//      <Column header="Action" body={actionbodyTemplate} />
//           </DataTable>
//         ) :

//         null}
//       {/* </Card> */}
//     </div>
//   );
// };

// export default DocumentSearch;





// import React, { useState, useEffect, useRef } from 'react';
// import { DataTable } from "primereact/datatable";
// import { Column } from "primereact/column";
// import { InputText } from "primereact/inputtext";
// import { Button } from "primereact/button";
// import { Toast } from "primereact/toast";
// import {  useNavigate,Link } from "react-router-dom";
// import { CustomerService } from "../service/CustomerService";
// import Search from "../Assets/Search.png";
// import Background from "../Assets/Background.png";
// import { Card } from "primereact/card";
// import { Dialog } from 'primereact/dialog';
// import axios from "axios";




// const DocumentSearch = () => {
//   const [data, setData] = useState([]);
//   const [customer, setCustomers] = useState([]);
//   const [docView, setDocViewData] = useState([]);
//   const [query] = useState();
//   const toast = useRef(null);
//   const navigate = useNavigate();
//   const customerService = new CustomerService();
//   const [displayBasic, setDisplayBasic] = useState(false);

//     const [displayPosition, setDisplayPosition] = useState(false);

//     const [position, setPosition] = useState('center');
//     const [secId, setSecId] = useState([]);




//     const dialogFuncMap = {
//         'displayBasic': setDisplayBasic,
//         'displayPosition': setDisplayPosition,

//     }

//     const onClick = (name, position) => {
//       // console.log(position,"///////...........")

//       // console.log(position.id,"//////sjdfsjfjdjgd")
//       setSecId(position.id)


//         dialogFuncMap[`${name}`](true);

//         if (position) {
//             setPosition(position);
//         }
//     }

//     const onHide = (name) => {
//         dialogFuncMap[`${name}`](false);
//     }



//   // function Download()
//   const downloadFileAtURL = (rowData) => {
//     const url = `${process.env.REACT_APP_API_KEY}/document/downloadSec/${rowData.id}`;
//     console.log(rowData, " file to be download");
//     const fileName = url.split("/").pop();
//     const aTag = document.createElement("a");
//     aTag.href = url;
//     aTag.setAttribute("download", fileName);
//     document.body.appendChild(aTag);
//     aTag.click();
//     aTag.remove();
//   };








//   async function search(key) {
//     if (key.length > 1) {
//       let text = key;
//       let encoded = window.btoa(text);
//       let result = await fetch(
//         `${process.env.REACT_APP_API_KEY}/sample/getSectionHighlightedValue/` + encoded
//       );
//       result = await result.json();
//       console.warn("Tasdiq", result);
//       setData(result);
//       setCustomers(result);
//       console.log(customer, "/////////////////////////////////////****");
//     }
//   }

//   const customBody = (rowData, column) => {
//     return <span dangerouslySetInnerHTML={{ __html: rowData[column.field] }} />;
//   };



//   const onClickHeader = (data) => {

//     console.log("all data: ", data);
//     axios
//       .get(`${process.env.REACT_APP_API_KEY}/document/getHtmlContains/${data.id}`)
//       .then((res) => {
//         console.log("All tree-sections", res.data);
//         setDocViewData(res.data.data);
//         // setBoolean(true)
//       });
//   }




//   const actionbodyTemplate = (rowData) => {
//     // console.log(rowData.id, ".////////////////////priya");
//     // setId(rowData.id);
//     return (
//       <React.Fragment>
//          <Button
//     icon="pi pi-folder-open"

//     className="p-button-raised  p-button-text"
//     onMouseDown={() => onClickHeader(rowData)}

//     onClick={() => onClick('displayBasic',rowData)}
//     style={{
//       backgroundColor: "white",
//       height: "30px",
//       width: "30px",
//       color: "#203570",
//     }}
//   />
//      <Dialog  visible={displayBasic} style={{ width: '80vw' }}  onHide={() => onHide('displayBasic')}>

//              <p dangerouslySetInnerHTML={{ __html: docView }}></p>
// </Dialog>


//         <Button
//           style={{
//             backgroundColor: "white",
//             height: "30px",
//             width: "30px",
//             color: "#203570",
//             float: "right",
//             marginLeft: "40px",
//             marginTop: "-30px",
//           }}
//           icon="pi pi-download"
//           onClick={() => {
//             downloadFileAtURL(rowData);
//           }}
//           tooltip="Download "
//           tooltipOptions={{ className: "teal-tooltip", position: "bottom" }}
//           className="p-button-raised  p-button-text"

//         />
//       </React.Fragment>
//     );
//   };

//  const editProduct = (product) => {
//     customerService.docDataById = product;
//     console.log(customerService.docDataById, "./././././././");
//     navigate("/Userversion/" + product.id);

//     console.log(product, " document data by id.....");
//   };


//   return (

//     <div >

//       <Button
//         style={{ backgroundColor: "white", color: "black", height: "37px" }}
//         className="p-button-raised  p-button p-button-secondary p-button-text"
//       >
//         <img
//           style={{ width: "17px",marginRight: "10px", height: "17px" }}
//           src={Search}
//           alt=" Search "
//         />
//         <b> Search Document</b>
//       </Button>
//       <img
//         style={{ height: "55px", float: "right" }}
//         src={Background}
//         alt=" Background "
//       />

// <br/>
// <br/>


//      <Card style={{ height: "500px" }}>
//       <Toast ref={toast} />


//         <span
//           className="p-input-icon-left"
//           style={{ width: "80%",marginLeft:"15%" }}
//         >
//           <i className="pi pi-search" />
//           <InputText
//              style={{marginRight:'7%'}}
//             type="text"
//             value={query}
//             onKeyDown={(e) => search(e.target.value)}
//             className="p-inputtext-sm form-control"
//             placeholder="Search"
//           />
//         </span>

//         <br />
//         <br />
//         {data.length > 0 ? (
//           // <Card>

//           <DataTable
//             value={data}
//             paginator
//             scrollable 
//             scrollHeight="340px"
//             responsiveLayout="scroll"
//             paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
//             currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
//             rows={4}
//             p-datatable-wrapper
//             // rowsPerPageOptions={[10, 20, 50]}
//           >
//             <Column field="name" header="Section Name" />

//             <Column
//               field="content"
//               // style={{
//               //   maxWidth: "800px",
//               //   textOverflow: "ellipsis",
//               //   overflow: "hidden",
//               //   whiteSpace: "nowrap",
//               // }}
//               body={customBody}
//               header="Description"
//             />


//             <Column header="Action" body={actionbodyTemplate} />
//           </DataTable>
//         ) : 

//         null}

//       </Card>
//    </div>
//   );
// };

// export default DocumentSearch;









// import React, { useState, useEffect, useRef } from 'react';
// import { DataTable } from "primereact/datatable";
// import { Column } from "primereact/column";
// import { InputText } from "primereact/inputtext";
// import { Button } from "primereact/button";
// import { Toast } from "primereact/toast";
// import { useNavigate } from "react-router-dom";

// import Search from "../Assets/Search.png";
// import Background from "../Assets/Background.png";
// import { Card } from "primereact/card";
// import { Dialog } from 'primereact/dialog';
// import axios from "axios";
// import { CustomerService } from "../service/CustomerService";




// const DocumentSearch = () => {
//   const [data, setData] = useState([]);
//   const [docId, setDocId] = useState([]);
//   const [customer, setCustomers] = useState([]);
//   const [docView, setDocViewData] = useState();
//   const [uploadedDate,  setUploadedDate] = useState([]);
//   const [query] = useState();
//   const toast = useRef(null);
//   const navigate = useNavigate();
//   const customerService = new CustomerService();


//   const [displayBasic, setDisplayBasic] = useState(false);




//   useEffect(() => {
//     // console.log(docId,"/////rrrr")

//     }, []);


//   const dialogFuncMap = {
//     'displayBasic': setDisplayBasic,
//     // 'displayPosition': setDisplayPosition,

//   }

//   const onClick = (name, position) => {
//     setDocId(position.Docid);
//     console.log(position.Docid,"/////www")



//    dialogFuncMap[`${name}`](true);

//     if (position) {
//       axios
//       .get(`${process.env.REACT_APP_API_KEY}/document/getDocumentToSolrView/${position.Docid}`)
//       .then((res) => {
//         console.log("All tree-sections", res.data);
//         setDocViewData(res.data.htmlData);
//         setUploadedDate(res.data.uploadedDate);

//       });    }
//   }

//   const onHide = (name) => {
//     dialogFuncMap[`${name}`](false);
//   }



//   // DOWNLOAD
//   const downloadFileAtURL = (rowData) => {
//     const url = `${process.env.REACT_APP_API_KEY}/document/downloadSec/${rowData.id}`;
//     console.log(rowData, " file to be download");
//     const fileName = url.split("/").pop();
//     const aTag = document.createElement("a");
//     aTag.href = url;
//     aTag.setAttribute("download", fileName);
//     document.body.appendChild(aTag);
//     aTag.click();
//     aTag.remove();
//   };






// //SEARCH SECTION

//   async function search(key) {
//     if (key.length > 1) {
//       let text = key;
//       let encoded = window.btoa(text);
//       let result = await fetch(
//         `${process.env.REACT_APP_API_KEY}/sample/getSectionHighlightedValue/` + encoded
//       );
//       result = await result.json();
//       console.warn("Tasdiq", result);
//       setData(result);
//       setCustomers(result);
//       console.log(customer, "/////////////////////////////////////****");
//     }
//   }




//   const customBody = (rowData, column) => {
//     return <span dangerouslySetInnerHTML={{ __html: rowData[column.field] }} />;
//   };



//   const editProduct = (product) => {
//     customerService.docDataById = product;
//     console.log(customerService.docDataById, "./././././././");
//     navigate("/Userversion/" + product.Docid);

//     console.log(product, " document data by id.....");
//   };





//   const actionbodyTemplate = (rowData) => {
//      console.log(rowData.Docid,"///docid");


//     setDocId(rowData.Docid);
//     // console.log(rowData.Docid,"///docid");



//  return (

// < >
// <div style={{display:"flex"}}>

//         <Button
//           icon="pi pi-file"

//           className="p-button-raised  p-button-text"
//           // onMouseDown={() => onClickHeader(rowData)}

//           onClick={() => onClick('displayBasic', rowData)}
//           style={{
//             backgroundColor: "white",
//             height: "30px",
//             width: "30px",
//             color: "#203570",
//             marginRight:"10%"
//           }}
//         />

// <Dialog  visible={displayBasic} style={{ width: '80vw' }}  onHide={() => onHide('displayBasic')}>
// {/* <>{uploadedDate}</> */}

// <div>
//         {new Intl.DateTimeFormat("en-IN", {
//           year: "numeric",
//           month: "2-digit",
//           day: "2-digit",
//           hour: "2-digit",
//           minute: "2-digit",
//         }).format(uploadedDate)}
//       </div>

// <span dangerouslySetInnerHTML={{ __html:docView }} />
// {/* <p dangerouslySetInnerHTML={{ __html: docView }}> </p> */}

// {/* <>{docView}</> */}
// </Dialog>






// <Button
//           icon="pi pi-folder-open"

//           className="p-button-raised  p-button-text"
//           onClick={() => editProduct(rowData)}

//           // onClick={() => onClick('displayBasic', rowData)}
//           style={{
//             backgroundColor: "white",
//             height: "30px",
//             width: "30px",
//             color: "#203570",
//             marginRight:"10%"
//           }}
//         />




//         <Button
//           style={{
//             // backgroundColor: "white",
//             // height: "30px",
//             // width: "30px",
//             // color: "#203570",
//             // float: "right",
//             // marginLeft: "40px",
//             // marginTop: "-30px",
//             backgroundColor: "white",
//             height: "30px",
//             width: "30px",
//             color: "#203570",
//             // display:"flex"
//             //  float: "right",
//             //    marginTop: "-30px",



//           }}
//           icon="pi pi-download"
//           onClick={() => {
//             downloadFileAtURL(rowData);
//           }}
//           tooltip="Download "
//           tooltipOptions={{ className: "teal-tooltip", position: "bottom" }}
//           className="p-button-raised  p-button-text"

//         />
//         </div>
//       </>
//     );
//   };



//   return (

//     <div >

//       <Button
//         style={{ backgroundColor: "white", color: "black", height: "37px" }}
//         className="p-button-raised  p-button p-button-secondary p-button-text"
//       >
//         <img
//           style={{ width: "17px", marginRight: "10px", height: "17px" }}
//           src={Search}
//           alt=" Search "
//         />
//         <b> Search Document</b>
//       </Button>
//       <img
//         style={{ height: "55px", float: "right" }}
//         src={Background}
//         alt=" Background "
//       />

//       <br />
//       <br />



//       <Card style={{ height: "550px" }}>
//         <Toast ref={toast} />


//         <span
//           className="p-input-icon-left"
//           style={{ width: "80%", marginLeft: "15%" }}
//         >
//           <i className="pi pi-search" />
//           <InputText
//             style={{ marginRight: '7%' }}
//             type="text"
//             value={query}
//             onKeyDown={(e) => search(e.target.value)}
//             className="p-inputtext-sm form-control"
//             placeholder="Search"
//           />
//         </span>

//         <br />
//         <br />
//         {data.length > 0 ? (
//           // <Card>

//           <DataTable
//             value={data}
//             paginator
//             scrollable
//             scrollHeight="400px"
//             responsiveLayout="scroll"
//             paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
//             currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
//             rows={6}
//             p-datatable-wrapper
//           // rowsPerPageOptions={[10, 20, 50]}
//           >
//             <Column field="name" 
//                style={{
//                 maxWidth: "210px",
//                 minWidth: "8rem",
//                 textOverflow: "ellipsis",
//                 overflow: "hidden",
//                 whiteSpace: "nowrap",
//               }}
//             header="Section Name" />

//             <Column
//               field="content"
//               // style={{
//               //   maxWidth: "800px",
//               //   textOverflow: "ellipsis",
//               //   overflow: "hidden",
//               //   whiteSpace: "nowrap",
//               // }}
//               body={customBody}
//               header="Description"
//             />


//             <Column header="Action" body={actionbodyTemplate} />
//           </DataTable>
//         ) :

//           null}

//       </Card>
//     </div>
//   );
// };

// export default DocumentSearch;










// import React, { useState, useEffect, useRef } from 'react';
// import { DataTable } from "primereact/datatable";
// import { Column } from "primereact/column";
// import { InputText } from "primereact/inputtext";
// import { Button } from "primereact/button";
// import { Toast } from "primereact/toast";

// import Search from "../Assets/Search.png";
// import Background from "../Assets/Background.png";
// import { Card } from "primereact/card";
// import { Dialog } from 'primereact/dialog';
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { CustomerService } from "../service/CustomerService";




// const DocumentSearch = () => {
//   const [data, setData] = useState([]);
//   const [docId, setDocId] = useState([]);
//   const [customer, setCustomers] = useState([]);
//   const [docView, setDocViewData] = useState();
//   const [uploadedDate, setUploadedDate] = useState([]);
//   const [documentName, setDocumentName] = useState([]);
//   const navigate = useNavigate();
//   const [query] = useState();
//   const toast = useRef(null);
//   const customerService = new CustomerService();

//   const [displayBasic, setDisplayBasic] = useState(false);




//   useEffect(() => {
//     // console.log(docId,"/////rrrr")

//   }, []);


//   const dialogFuncMap = {
//     'displayBasic': setDisplayBasic,
//     // 'displayPosition': setDisplayPosition,

//   }

//   const onClick = (name, position) => {
//     setDocId(position.Docid);
//     console.log(position.Docid, "/////www")



//     dialogFuncMap[`${name}`](true);

//     if (position) {
//       axios
//         .get(`${process.env.REACT_APP_API_KEY}/document/getDocumentToSolrView/${position.Docid}`)
//         .then((res) => {
//           console.log("All tree-sections", res.data);
//           setDocViewData(res.data.htmlData);
//           setUploadedDate(res.data.uploadedDate);
//           setDocumentName(res.data.docName);

//         });
//     }
//   }

//   const onHide = (name) => {
//     dialogFuncMap[`${name}`](false);
//   }



//   // DOWNLOAD
//   const downloadFileAtURL = (rowData) => {
//     const url = `${process.env.REACT_APP_API_KEY}/document/downloadSec/${rowData.id}`;
//     console.log(rowData, " file to be download");
//     const fileName = url.split("/").pop();
//     const aTag = document.createElement("a");
//     aTag.href = url;
//     aTag.setAttribute("download", fileName);
//     document.body.appendChild(aTag);
//     aTag.click();
//     aTag.remove();
//   };






//   //SEARCH SECTION

//   async function search(key) {
//     if (key.length > 1) {
//       let text = key;
//       let encoded = window.btoa(text);
//       let result = await fetch(
//         `${process.env.REACT_APP_API_KEY}/sample/getSectionHighlightedValue/` + encoded
//       );
//       result = await result.json();
//       console.warn("Tasdiq", result);
//       setData(result);
//       setCustomers(result);
//       console.log(customer, "/////////////////////////////////////****");
//     }
//   }




//   const customBody = (rowData, column) => {
//     return <span dangerouslySetInnerHTML={{ __html: rowData[column.field] }} />;
//   };




//   const editProduct = (product) => {
//     customerService.docDataById = product;
//     console.log(customerService.docDataById, "./././././././");
//     navigate("/Userversion/" + product.Docid);

//     console.log(product, " document data by id.....");
//   };



//   const actionbodyTemplate = (rowData) => {
//     console.log(rowData.Docid, "///docid");


//     setDocId(rowData.Docid);
//     // console.log(rowData.Docid,"///docid");



//     return (

//       < >
//         <div style={{ display: "flex" }}>

//           <Button
//             icon="pi pi-file"

//             className="p-button-raised  p-button-text"
//             // onMouseDown={() => onClickHeader(rowData)}

//             onClick={() => onClick('displayBasic', rowData)}
//             style={{
//               backgroundColor: "white",
//               height: "30px",
//               width: "30px",
//               color: "#203570",
//               marginRight: "10%"
//             }}
//           />


//           <Dialog header={
//             <div>

//               {documentName}


//               <div style={{ float: "right" , fontSize: "15px" }}>
//                 {new Intl.DateTimeFormat("en-IN", {
//                   year: "numeric",
//                   month: "2-digit",
//                   day: "2-digit",
//                   hour: "2-digit",
//                   minute: "2-digit",
//                 }).format(uploadedDate)}
//               </div>

//             </div>
//           } visible={displayBasic} style={{ width: '80vw' }} onHide={() => onHide('displayBasic')}>
//             {/* <>{uploadedDate}</> */}



//             <span  className="tocview"  dangerouslySetInnerHTML={{ __html: docView }} />
//             {/* <p dangerouslySetInnerHTML={{ __html: docView }}> </p> */}

//             {/* <>{docView}</> */}
//           </Dialog>

//           <Button
//           icon="pi pi-folder-open"

//           className="p-button-raised  p-button-text"
//           onClick={() => editProduct(rowData)}

//           // onClick={() => onClick('displayBasic', rowData)}
//           style={{
//             backgroundColor: "white",
//             height: "30px",
//             width: "30px",
//             color: "#203570",
//             marginRight:"10%"
//           }}
//         />






//           <Button
//             style={{
//             backgroundColor: "white",
//               height: "30px",
//               width: "30px",
//               color: "#203570",
//             }}
//             icon="pi pi-download"
//             onClick={() => {
//               downloadFileAtURL(rowData);
//             }}
//             tooltip="Download "
//             tooltipOptions={{ className: "teal-tooltip", position: "bottom" }}
//             className="p-button-raised  p-button-text"

//           />
//         </div>
//       </>
//     );
//   };


//   return (

//     <div >

//       <Button
//         style={{ backgroundColor: "white", color: "black", height: "37px" }}
//         className="p-button-raised  p-button p-button-secondary p-button-text"
//       >
//         <img
//           style={{ width: "17px", marginRight: "10px", height: "17px" }}
//           src={Search}
//           alt=" Search "
//         />
//         <b> Search Document</b>
//       </Button>
//       <img
//         style={{ height: "55px", float: "right" }}
//         src={Background}
//         alt=" Background "
//       />

//       <br />
//       <br />



//       <Card style={{ height: "490px" }}>
//         <Toast ref={toast} />


//         <span
//           className="p-input-icon-left"
//           style={{ width: "80%", marginLeft: "15%" }}
//         >
//           <i className="pi pi-search" />
//           <InputText
//             style={{ marginRight: '7%' }}
//             type="text"
//             value={query}
//             onKeyDown={(e) => search(e.target.value)}
//             className="p-inputtext-sm form-control"
//             placeholder="Search"
//           />
//         </span>

//         <br />
//         <br />
//         {data.length > 0 ? (
//           // <Card>

//           <DataTable
//             value={data}
//             paginator
//             scrollable
//             scrollHeight="400px"
//             responsiveLayout="scroll"
//             paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
//             currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
//             rows={6}
//             p-datatable-wrapper
//           // rowsPerPageOptions={[10, 20, 50]}
//           >
//             <Column field="name"
//               style={{
//                 maxWidth: "210px",
//                 minWidth: "8rem",
//                 textOverflow: "ellipsis",
//                 overflow: "hidden",
//                 whiteSpace: "nowrap",
//               }}
//               header="Section Name" />

//             <Column
//               field="content"
//               // style={{
//               //   maxWidth: "800px",
//               //   textOverflow: "ellipsis",
//               //   overflow: "hidden",
//               //   whiteSpace: "nowrap",
//               // }}
//               body={customBody}
//               header="Description"
//             />


//             <Column header="Action" body={actionbodyTemplate} />
//           </DataTable>
//         ) :

//           null}

//       </Card>
//     </div>
//   );
// };

// export default DocumentSearch;

















// import React, { useState, useEffect, useRef } from 'react';
// import { DataTable } from "primereact/datatable";
// import { Column } from "primereact/column";
// import { InputText } from "primereact/inputtext";
// import { Button } from "primereact/button";
// import { Toast } from "primereact/toast";

// import Search from "../Assets/Search.png";
// import Reactangle from "../Assets/Rectangle.png";
// import Group from "../Assets/Group.png";
// import Background from "../Assets/Background.png";
// import { Card } from "primereact/card";
// import { Dialog } from 'primereact/dialog';
// import axios from "axios";
// import { ScrollPanel } from "primereact/scrollpanel";



// const DocumentSearch = () => {
//   const [data, setData] = useState([]);
//   const [secId, setSecId] = useState([]);
//   const [customer, setCustomers] = useState([]);
//   const [docView, setDocViewData] = useState();
//   const [uploadedDate, setUploadedDate] = useState([]);
//   const [documentName, setDocumentName] = useState([]);
//   const [query] = useState();
//   const [loading, setLoading] = useState(true);
//   const toast = useRef(null);

//   const [displayBasic, setDisplayBasic] = useState(false);




//   const dialogFuncMap = {
//     'displayBasic': setDisplayBasic,


//   }

//   const onClick = (name, position) => {
//     setSecId(position.secId);
//     console.log(position.secId, "/////www")



//     dialogFuncMap[`${name}`](true);

//     if (position) {


//       console.log(position)
//       // axios
//       //   .get(`${process.env.REACT_APP_API_KEY}/document/getDocumentToSolrView/${position.Docid}`)
//       //   .then((res) => {
//       //     console.log("All tree-sections", res.data);
//       //     setDocViewData(res.data.htmlData);
//       //     setUploadedDate(res.data.uploadedDate);
//       //     setDocumentName(res.data.docName);


//       //   });


//       axios
//       .get(`${process.env.REACT_APP_API_KEY}/document/getHtmlContains/${position.id}`)
//       .then((res) => {
//         console.log("All tree-sections", res.data);
//         setDocViewData(res.data.data);

//       });




//     }
//   }

//   const onHide = (name) => {
//     dialogFuncMap[`${name}`](false);
//   }



//   // DOWNLOAD
//   const downloadFileAtURL = (rowData) => {
//     const url = `${process.env.REACT_APP_API_KEY}/document/downloadSec/${rowData.id}`;
//     console.log(rowData, " file to be download");
//     const fileName = url.split("/").pop();
//     const aTag = document.createElement("a");
//     aTag.href = url;
//     aTag.setAttribute("download", fileName);
//     document.body.appendChild(aTag);
//     aTag.click();
//     aTag.remove();
//   };






//   //SEARCH SECTION

//   async function search(key) {
//     if (key.length > 1) {
//       let text = key;
//       let encoded = window.btoa(text);
//       let result = await fetch(
//         `${process.env.REACT_APP_API_KEY}/sample/getSectionHighlightedValue/` + encoded
//       );
//       result = await result.json();
//       console.warn("Tasdiq", result);
//       setData(result);
//       setCustomers(result);
//       setLoading(false);
//       console.log(customer, "/////////////////////////////////////****");
//     }
//   }




//   const customBody = (rowData, column) => {
//     return <span dangerouslySetInnerHTML={{ __html: rowData[column.field] }} />;
//   };





//   const secDownload = () => {
//     toast.current.show({
//       severity: "success",
//       summary: "Section Download Successfully",
//       detail: "Section Download",
//       life: 1000,
//     });
//   };



//   const actionbodyTemplate = (rowData) => {
//     console.log(rowData.id, "///docid");


//     setSecId(rowData.id);
//     // console.log(rowData.Docid,"///docid");



//     return (

//       < >
//         <div style={{ display: "flex" }}>

//           <Button
//             icon="pi pi-file"

//             className="p-button-raised  p-button-text"
//             // onMouseDown={() => onClickHeader(rowData)}

//             onClick={() => onClick('displayBasic', rowData)}
//             style={{
//               backgroundColor: "white",
//               height: "30px",
//               width: "30px",
//               color: "#203570",
//               marginRight: "10%"
//             }}
//           />





//           <Button
//             style={{
//             backgroundColor: "white",
//               height: "30px",
//               width: "30px",
//               color: "#203570",
//             }}
//             icon="pi pi-download"

//             onClick={() => {
//               downloadFileAtURL(rowData);
//             }}
//             // onMouseDown={secDownload}
//             tooltip="Download "
//             tooltipOptions={{ className: "teal-tooltip", position: "bottom" }}
//             className="p-button-raised  p-button-text"

//           />
//         </div>
//       </>
//     );
//   };


//   return (

//     <div >

//       <Button
//         style={{ backgroundColor: "white", color: "black", height: "35px" }}
//         className="p-button-raised  p-button p-button-secondary p-button-text"
//       >
//         <img
//           style={{ width: "15px", marginRight: "10px", height: "17px" }}
//           src={Search}
//           alt=" Search "
//         />
//         <b> Search Document</b>
//       </Button>
//       <img
//         style={{ height: "53px", float: "right" }}
//         src={Background}
//         alt=" Background "
//       />

//       <br />
//       <br />



//       <Card style={{ height: "510px" }}>
//         <Toast ref={toast} />


//         <span
//           className="p-input-icon-left"
//           style={{ width: "80%", marginLeft: "15%" }}
//         >
//           <i className="pi pi-search" />
//           <InputText
//             style={{ marginRight: '7%' }}
//             type="text"
//             value={query}
//             onKeyDown={(e) => search(e.target.value)}
//             className="p-inputtext-sm form-control"
//             placeholder="Search"
//           />
//         </span>

//         <br />
//         <br />
//         {data.length > 0 ? (
//           // <Card>





// <ScrollPanel style={{height: "400px" }}>



// <Dialog header={
//             <div>

//               {documentName}


//               <div style={{ float: "right" , fontSize: "15px" }}>
//                 {new Intl.DateTimeFormat("en-IN", {
//                   year: "numeric",
//                   month: "2-digit",
//                   day: "2-digit",
//                   hour: "2-digit",
//                   minute: "2-digit",
//                 }).format(uploadedDate)}
//               </div>

//             </div>
//           } visible={displayBasic} style={{ width: '80vw' }} onHide={() => onHide('displayBasic')}>
//             {/* <>{uploadedDate}</> */}



//             <span  className="tocview"  dangerouslySetInnerHTML={{ __html: docView }} />
//             {/* <p dangerouslySetInnerHTML={{ __html: docView }}> </p> */}

//             {/* <>{docView}</> */}
//           </Dialog>



//           <DataTable
//             value={data}
//             paginator
//             rowHover
//             loading={loading}
//             // scrollable
//             // scrollHeight="400px"
//             responsiveLayout="scroll"
//             paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
//             currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
//             rows={4}
//             p-datatable-wrapper
//             emptyMessage="No documents found."
//           // rowsPerPageOptions={[10, 20, 50]}
//           >
//             <Column field="name"
//               style={{
//                 maxWidth: "210px",
//                 minWidth: "8rem",
//                 textOverflow: "ellipsis",
//                 overflow: "hidden",
//                 whiteSpace: "nowrap",
//               }}
//               header="Section Name" />

//             <Column
//               field="content"
//               // style={{
//               //   maxWidth: "800px",
//               //   textOverflow: "ellipsis",
//               //   overflow: "hidden",
//               //   whiteSpace: "nowrap",
//               // }}
//               body={customBody}
//               header="Description"
//             />


//             <Column header="Action" body={actionbodyTemplate} />
//           </DataTable>
//           </ScrollPanel>
//         ) :

//           null}
//            {/* <img
//           style={{ float:"right",marginTop:"15%",width: "15%",height:"15%"}}
//           src={Group}
//           alt="Group"
//         />

//          <img
//           style={{ width: "100%", height: "30%" }}
//           src={Reactangle}
//           alt=" Reactangle "
//         /> */}

//       </Card>
//     </div>
//   );
// };

// export default DocumentSearch;









// import React, { useState, useEffect, useRef } from 'react';
// import { DataTable } from "primereact/datatable";
// import { Column } from "primereact/column";
// import { InputText } from "primereact/inputtext";
// import { Button } from "primereact/button";
// import { Toast } from "primereact/toast";

// import Search from "../Assets/Search.png";
// import Reactangle from "../Assets/Rectangle.png";
// import Group from "../Assets/Group.png";
// import Background from "../Assets/Background.png";
// import { Card } from "primereact/card";
// import { Dialog } from 'primereact/dialog';
// import axios from "axios";
// import { ScrollPanel } from "primereact/scrollpanel";
// import { Tag } from 'primereact/tag';






// const DocumentSearch = () => {
//   const [data, setData] = useState([]);
//   const [secId, setSecId] = useState([]);
//   const [customer, setCustomers] = useState([]);
//   const [docView, setDocViewData] = useState();
//   const [uploadedDate, setUploadedDate] = useState([]);
//   const [documentName, setDocumentName] = useState([]);
//   // const [query] = useState();
//   const [query, setQuery] = useState('');
//   const [loading, setLoading] = useState(true);
//   const toast = useRef(null);
//     const [suggestions, setSuggestions] = useState([]);

//   const [displayBasic, setDisplayBasic] = useState(false);
//   const [isInputActive, setInputActive] = useState(false);
//   const [users,  setUsers] = useState([]);




//   const handleInputChange = async (event) => {
//     const value = event.target.value;
//     setQuery(value);
//     setInputActive(value !== '');

//     try {
//       const response = await axios.get('http://localhost:3000/user'); // Replace with the actual URL or path to your JSON data
//       const data = response.data;
//       setSuggestions(data);
//       setUsers(data)
//       // console.log(data.Suggestion,"/?????????")
//     } catch (error) {
//       console.error('Error fetching JSON data:', error);
//     }
//   };

//   const handleSuggestionClick = (value) => {
//     setQuery(value);
//     setSuggestions([]);
//   };

//   const filteredSuggestions = suggestions.filter((item) =>
//     item.keyword.toLowerCase().includes(query.toLowerCase())
//   );

//   const displayedSuggestions = filteredSuggestions.slice(-5); // Limit the displayed suggestions to 2 keywords

//   const usersSuggestions = users.slice(-5); 

//   const dialogFuncMap = {
//     'displayBasic': setDisplayBasic,


//   }

//   const onClick = (name, position) => {
//     setSecId(position.secId);
//     console.log(position.secId, "/////www")



//     dialogFuncMap[`${name}`](true);

//     if (position) {


//       console.log(position)
//       // axios
//       //   .get(`${process.env.REACT_APP_API_KEY}/document/getDocumentToSolrView/${position.Docid}`)
//       //   .then((res) => {
//       //     console.log("All tree-sections", res.data);
//       //     setDocViewData(res.data.htmlData);
//       //     setUploadedDate(res.data.uploadedDate);
//       //     setDocumentName(res.data.docName);


//       //   });


//       axios
//       .get(`${process.env.REACT_APP_API_KEY}/document/getHtmlContains/${position.id}`)
//       .then((res) => {
//         console.log("All tree-sections", res.data);
//         setDocViewData(res.data.data);

//       });




//     }
//   }

//   const onHide = (name) => {
//     dialogFuncMap[`${name}`](false);
//   }



//   // DOWNLOAD
//   const downloadFileAtURL = (rowData) => {
//     const url = `${process.env.REACT_APP_API_KEY}/document/downloadSec/${rowData.id}`;
//     console.log(rowData, " file to be download");
//     const fileName = url.split("/").pop();
//     const aTag = document.createElement("a");
//     aTag.href = url;
//     aTag.setAttribute("download", fileName);
//     document.body.appendChild(aTag);
//     aTag.click();
//     aTag.remove();
//   };






//   //SEARCH SECTION

//   async function search(key) {

//     if (key.length > 1) {
//       let text = key;
//       let encoded = window.btoa(text);
//       let result = await fetch(
//         `${process.env.REACT_APP_API_KEY}/sample/getSectionHighlightedValue/` + encoded
//       );
//       result = await result.json();
//       console.warn("Tasdiq", result);
//       setData(result);
//       setCustomers(result);

//       setLoading(false);
//       console.log(customer, "/////////////////////////////////////****");
//     }
//   }

//   console.log(users,"??????ppppp")



//   const customBody = (rowData, column) => {
//     return <span dangerouslySetInnerHTML={{ __html: rowData[column.field] }} />;
//   };


//   const handleClearInput = () => {
//     setQuery('');
//   };




//   const secDownload = () => {
//     toast.current.show({
//       severity: "success",
//       summary: "Section Download Successfully",
//       detail: "Section Download",
//       life: 1000,
//     });
//   };



//   const actionbodyTemplate = (rowData) => {
//     console.log(rowData.id, "///docid");


//     setSecId(rowData.id);
//     // console.log(rowData.Docid,"///docid");



//     return (

//       < >
//         <div style={{ display: "flex" }}>

//           <Button
//             icon="pi pi-file"

//             className="p-button-raised  p-button-text"
//             // onMouseDown={() => onClickHeader(rowData)}

//             onClick={() => onClick('displayBasic', rowData)}
//             style={{
//               backgroundColor: "white",
//               height: "30px",
//               width: "30px",
//               color: "#203570",
//               marginRight: "10%"
//             }}
//           />





//           <Button
//             style={{
//             backgroundColor: "white",
//               height: "30px",
//               width: "30px",
//               color: "#203570",
//             }}
//             icon="pi pi-download"

//             onClick={() => {
//               downloadFileAtURL(rowData);
//             }}
//             // onMouseDown={secDownload}
//             tooltip="Download "
//             tooltipOptions={{ className: "teal-tooltip", position: "bottom" }}
//             className="p-button-raised  p-button-text"

//           />
//         </div>
//       </>
//     );
//   };


//   return (

//     <div >

//       <Button
//         style={{ backgroundColor: "white", color: "black", height: "35px" }}
//         className="p-button-raised  p-button p-button-secondary p-button-text"
//       >
//         <img
//           style={{ width: "15px", marginRight: "10px", height: "17px" }}
//           src={Search}
//           alt=" Search "
//         />
//         <b> Search Document</b>
//       </Button>
//       <img
//         style={{ height: "53px", float: "right" }}
//         src={Background}
//         alt=" Background "
//       />

//       <br />
//       <br />



//       <Card style={{ height: "510px" }}>
//         <Toast ref={toast} />
//         <div className="autocomplete">
// {/*           
//         <b>Hi Aman,what can i help you find today?</b>
//           <br/>
//           <br/> */}
//      <div className="card-container">
//         <span
//           className="p-input-icon-left"


//           style={{ marginLeft: "20%",width:"57%" }}
//         >



//      <div className={`input-container ${isInputActive ? 'active' : ''}`}>
//      <div class="layout-sidebar-filter-content p-input-icon-left p-fluid p-input-icon-right">
//       <i class="pi pi-search"></i>
//      <InputText  
//      style={{ borderRadius: "2px",  width:"660px"}}
//      type="text" 
//      value={query}
//      onChange={handleInputChange}
//      onKeyDown={(e) => search(e.target.value)}

//      placeholder="Search"
//       aria-label="Search input"
//        autocomplete="off"
//        class="p-inputtext p-component p-filled"/>
//        <i class="clear-icon pi pi-times"
//          onClick={handleClearInput}
//        ></i>
//      </div>


//           {/* <InputText

//             type="text"
//             className="input"
//             value={query}
//             onChange={handleInputChange}
//             onKeyDown={(e) => search(e.target.value)}


//             placeholder="Search"
//           />
//          */}
//          </div>
//         </span>



//         {displayedSuggestions.length > 0 && (
//         <ul className="suggestions">
//           {displayedSuggestions.map((item) => (
//             <li
//               key={item.keyword}
//               className="suggestion"
//               onClick={() => handleSuggestionClick(item.keyword)}
//             >
//               {item.keyword}
//             </li>
//           ))}
//         </ul>
//       )}
// </div>
// </div>
// <br/>





//   {/* {displayedSuggestions.length > 0 && (
//         <>
//           {displayedSuggestions.map((item) => (

//             <li
//               key={item.Suggestion}

//               onClick={() => handleSuggestionClick(item.Suggestion)}
//             >
//              <Tag style={{ backgroundColor: "#49ABA0"}} > {item.Suggestion}</Tag>
//             </li>
//           ))}
//         </>
//       )} */}







//         {data.length > 0 ? (
//           // <Card>





// <ScrollPanel style={{height: "390px" }}>
// {/* <b>You may also be interested in</b>  
//   <br/>  */}
// {/* {usersSuggestions.map((item) => (
//         <Tag style={{ backgroundColor: "#D2D7E2",color:"#2D2D2D"}} className="mr-2" > {item.Suggestion}</Tag>
//         ))} */}
// {/* 
//         {usersSuggestions.length > 0 && (
//         <>
//           {usersSuggestions.map((item) => (

//              <Tag style={{ backgroundColor: "#D2D7E2",color:"#2D2D2D"}} className="mr-2" > {item.Suggestion}</Tag>

//           ))}
//         </>
//       )} */}

//         <br/>

// <Dialog header={
//             <div>

//               {documentName}


//               <div style={{ float: "right" , fontSize: "15px" }}>
//                 {new Intl.DateTimeFormat("en-IN", {
//                   year: "numeric",
//                   month: "2-digit",
//                   day: "2-digit",
//                   hour: "2-digit",
//                   minute: "2-digit",
//                 }).format(uploadedDate)}
//               </div>

//             </div>
//           } visible={displayBasic} style={{ width: '80vw' }} onHide={() => onHide('displayBasic')}>
//             {/* <>{uploadedDate}</> */}



//             <span  className="tocview"  dangerouslySetInnerHTML={{ __html: docView }} />
//             {/* <p dangerouslySetInnerHTML={{ __html: docView }}> </p> */}

//             {/* <>{docView}</> */}
//           </Dialog>

// <br/>
// {/* <br/> */}

//           <DataTable
//             value={data}
//             paginator
//             rowHover
//             loading={loading}
//             // scrollable
//             // scrollHeight="400px"
//             responsiveLayout="scroll"
//             paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
//             currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
//             rows={4}
//             p-datatable-wrapper
//             emptyMessage="No documents found."
//           // rowsPerPageOptions={[10, 20, 50]}
//           >
//             <Column field="name"
//               style={{
//                 maxWidth: "210px",
//                 minWidth: "8rem",
//                 textOverflow: "ellipsis",
//                 overflow: "hidden",
//                 whiteSpace: "nowrap",
//               }}
//               header="Section Name" />

//             <Column
//               field="content"
//               // style={{
//               //   maxWidth: "800px",
//               //   textOverflow: "ellipsis",
//               //   overflow: "hidden",
//               //   whiteSpace: "nowrap",
//               // }}
//               body={customBody}
//               header="Description"
//             />


//             <Column header="Action" body={actionbodyTemplate} />
//           </DataTable>
//           </ScrollPanel>
//         // ) :

//         //   null}

//         ) : (
//           <></>
//           // <div className="empty-message">No documents found.</div>
//           )}

// <div class="image-container">
//   <img class="float-image" src={Group} alt="Group" />
//   <img class="full-image" src={Reactangle} alt="Reactangle" />
// </div>





//            {/* <img
//           style={{ float:"right",marginTop:"15%",width: "15%",height:"15%"}}
//           src={Group}
//           alt="Group"
//         />

//          <img
//           style={{ width: "100%", height: "30%" }}
//           src={Reactangle}
//           alt=" Reactangle "
//         /> */}

//       </Card>

//       </div>


//   );
// };

// export default DocumentSearch;



















// import React, { useState, useEffect, useRef } from 'react';
// import { DataTable } from "primereact/datatable";
// import { Column } from "primereact/column";
// import { InputText } from "primereact/inputtext";
// import { Button } from "primereact/button";
// import { Toast } from "primereact/toast";

// import Search from "../Assets/Search.png";
// import Reactangle from "../Assets/Rectangle.png";
// import Group from "../Assets/Group.png";
// import Background from "../Assets/Background.png";
// import { Card } from "primereact/card";
// import { Dialog } from 'primereact/dialog';
// import axios from "axios";
// import { ScrollPanel } from "primereact/scrollpanel";
// import { Tag } from 'primereact/tag';






// const DocumentSearch = () => {
//   const [data, setData] = useState([]);
//   const [secId, setSecId] = useState([]);
//   const [customer, setCustomers] = useState([]);
//   const [docView, setDocViewData] = useState();
//   const [uploadedDate, setUploadedDate] = useState([]);
//   const [documentName, setDocumentName] = useState([]);
//   // const [query] = useState();
//   const [query, setQuery] = useState('');
//   const [loading, setLoading] = useState(true);
//   const toast = useRef(null);
//     const [suggestions, setSuggestions] = useState([]);

//   const [displayBasic, setDisplayBasic] = useState(false);
//   const [isInputActive, setInputActive] = useState(false);
//   const [users,  setUsers] = useState([]);




//   const handleInputChange = async (event) => {
//     const value = event.target.value;
//     setQuery(value);
//     setInputActive(value !== '');


//     axios
//       .get(`${process.env.REACT_APP_API_KEY}/sample/getSuggestions/${value}`)
//       .then((res) => {
//         console.log("All keyword data", res.data);
//         // setUsers(res.data)
//         setSuggestions(res.data);
//         // setDocViewData(res.data.data);
//         // setDocumentName(res.data.do)

//       });


//     try {
//       const response = await axios.get(`${process.env.REACT_APP_API_KEY}/sample/getStringSuggestion/${value}`); // Replace with the actual URL or path to your JSON data
//       const data = response.data;
//       // setSuggestions(data);
//       setUsers(data)

//       // console.log(data.Suggestion,"/?????????")
//     } catch (error) {
//       console.error('Error fetching JSON data:', error);
//     }
//   };

//   const handleSuggestionClick = (value) => {
//     setQuery(value);
//     setSuggestions([]);
//   };

//   const filteredSuggestions = suggestions.filter((item) =>
//     item.toLowerCase().includes(query.toLowerCase())
//   );

//   const displayedSuggestions = filteredSuggestions.slice(-5); // Limit the displayed suggestions to 2 keywords

//   const usersSuggestions = users.slice(-5); 

//   const dialogFuncMap = {
//     'displayBasic': setDisplayBasic,


//   }

//   const onClick = (name, position) => {
//     setSecId(position.secId);
//     console.log(position.secId, "/////www")



//     dialogFuncMap[`${name}`](true);

//     if (position) {


//       console.log(position)
//       // axios
//       //   .get(`${process.env.REACT_APP_API_KEY}/document/getDocumentToSolrView/${position.Docid}`)
//       //   .then((res) => {
//       //     console.log("All tree-sections", res.data);
//       //     setDocViewData(res.data.htmlData);
//       //     setUploadedDate(res.data.uploadedDate);
//       //     setDocumentName(res.data.docName);


//       //   });


//       axios
//       .get(`${process.env.REACT_APP_API_KEY}/document/getHtmlContains/${position.id}`)
//       .then((res) => {
//         console.log("All tree-sections", res.data);
//         setDocViewData(res.data.data);

//       });




//     }
//   }

//   const onHide = (name) => {
//     dialogFuncMap[`${name}`](false);
//   }



//   // DOWNLOAD
//   const downloadFileAtURL = (rowData) => {
//     const url = `${process.env.REACT_APP_API_KEY}/document/downloadSec/${rowData.id}`;
//     console.log(rowData, " file to be download");
//     const fileName = url.split("/").pop();
//     const aTag = document.createElement("a");
//     aTag.href = url;
//     aTag.setAttribute("download", fileName);
//     document.body.appendChild(aTag);
//     aTag.click();
//     aTag.remove();
//   };






//   //SEARCH SECTION

//   async function search(key) {

//     if (key.length > 1) {
//       let text = key;
//       let encoded = encodeURIComponent(text);
//       console.log(encoded,"????")
//       // console.log(decoded,"decode string")
//       let result = await fetch(
//         `${process.env.REACT_APP_API_KEY}/sample/getSectionHighlightedValue/` + encoded
//       );
//       result = await result.json();
//       console.warn("Tasdiq", result);
//       setData(result);
//       setCustomers(result);

//       setLoading(false);
//       console.log(customer, "/////////////////////////////////////****");
//     }
//   }

//   console.log(users,"??????ppppp")



//   const customBody = (rowData, column) => {
//     return <span dangerouslySetInnerHTML={{ __html: rowData[column.field] }} />;
//   };


//   const handleClearInput = () => {
//     setQuery('');
//   };




//   const secDownload = () => {
//     toast.current.show({
//       severity: "success",
//       summary: "Section Download Successfully",
//       detail: "Section Download",
//       life: 1000,
//     });
//   };



//   const actionbodyTemplate = (rowData) => {
//     console.log(rowData.id, "///docid");


//     setSecId(rowData.id);
//     // console.log(rowData.Docid,"///docid");



//     return (

//       < >
//         <div style={{ display: "flex" }}>

//           <Button
//             icon="pi pi-file"

//             className="p-button-raised  p-button-text"
//             // onMouseDown={() => onClickHeader(rowData)}

//             onClick={() => onClick('displayBasic', rowData)}
//             style={{
//               backgroundColor: "white",
//               height: "30px",
//               width: "30px",
//               color: "#203570",
//               marginRight: "10%"
//             }}
//           />





//           <Button
//             style={{
//             backgroundColor: "white",
//               height: "30px",
//               width: "30px",
//               color: "#203570",
//             }}
//             icon="pi pi-download"

//             onClick={() => {
//               downloadFileAtURL(rowData);
//             }}
//             onMouseDown={secDownload}
//             tooltip="Download "
//             tooltipOptions={{ className: "teal-tooltip", position: "bottom" }}
//             className="p-button-raised  p-button-text"

//           />
//         </div>
//       </>
//     );
//   };


//   return (

//     <div >

//       <Button
//         style={{ backgroundColor: "white", color: "black", height: "35px" }}
//         className="p-button-raised  p-button p-button-secondary p-button-text"
//       >
//         <img
//           style={{ width: "15px", marginRight: "10px", height: "17px" }}
//           src={Search}
//           alt=" Search "
//         />
//         <b> Search Document</b>
//       </Button>
//       <img
//         style={{ height: "53px", float: "right" }}
//         src={Background}
//         alt=" Background "
//       />

//       <br />
//       <br />



//       <Card style={{ height: "510px" }}>
//         <Toast ref={toast} />
//         <div className="autocomplete">
// {/*           
//         <b>Hi Aman,what can i help you find today?</b>
//           <br/>
//           <br/> */}
//      <div className="card-container">
//         <span
//           className="p-input-icon-left"


//           style={{ marginLeft: "20%",width:"57%" }}
//         >



//      <div className={`input-container ${isInputActive ? 'active' : ''}`}>
//      <div class="layout-sidebar-filter-content p-input-icon-left p-fluid p-input-icon-right">
//       <i class="pi pi-search"></i>
//      <InputText  
//      style={{ borderRadius: "2px",  width:"660px"}}
//      type="text" 
//      value={query}
//      onChange={handleInputChange}
//      onKeyDown={(e) => search(e.target.value)}

//      placeholder="Search"
//       aria-label="Search input"
//        autocomplete="off"
//        class="p-inputtext p-component p-filled"/>
//        <i class="clear-icon pi pi-times"
//          onClick={handleClearInput}
//        ></i>
//      </div>


//           {/* <InputText

//             type="text"
//             className="input"
//             value={query}
//             onChange={handleInputChange}
//             onKeyDown={(e) => search(e.target.value)}


//             placeholder="Search"
//           />
//          */}
//          </div>
//         </span>



//         {displayedSuggestions.length > 0 && (
//         <ul className="suggestions">
//           {displayedSuggestions.map((item) => (
//             <li
//               key={item}
//               className="suggestion"
//               onClick={() => handleSuggestionClick(item)}
//             >
//               {item}
//             </li>
//           ))}
//         </ul>
//       )}
// </div>
// </div>
// <br/>





//   {/* {displayedSuggestions.length > 0 && (
//         <>
//           {displayedSuggestions.map((item) => (

//             <li
//               key={item.Suggestion}

//               onClick={() => handleSuggestionClick(item.Suggestion)}
//             >
//              <Tag style={{ backgroundColor: "#49ABA0"}} > {item.Suggestion}</Tag>
//             </li>
//           ))}
//         </>
//       )} */}







//         {data.length > 0 ? (
//           // <Card>





// <ScrollPanel style={{height: "390px" }}>
// {/* <b>You may also be interested in........</b>   */}

// {/* {usersSuggestions.map((item) => (
//         <Tag style={{ backgroundColor: "#D2D7E2",color:"#2D2D2D"}} className="mr-2" > {item.Suggestion}</Tag>
//         ))} */}




//         {/* {usersSuggestions.length > 0 && (
//         <>
//           {usersSuggestions.map((item) => (

//           <div   dangerouslySetInnerHTML={{ __html: item }}></div> 
//             //  <Tag style={{ backgroundColor: "#D2D7E2",color:"#2D2D2D"}} className="mr-2" > {item}</Tag>

//           ))}
//         </>
//       )}   */}

//         <br/>

// <Dialog header={
//             <div>

//               {documentName}


//               <div style={{ float: "right" , fontSize: "15px" }}>
//                 {new Intl.DateTimeFormat("en-IN", {
//                   year: "numeric",
//                   month: "2-digit",
//                   day: "2-digit",
//                   hour: "2-digit",
//                   minute: "2-digit",
//                 }).format(uploadedDate)}
//               </div>

//             </div>
//           } visible={displayBasic} style={{ width: '80vw' }} onHide={() => onHide('displayBasic')}>
//             {/* <>{uploadedDate}</> */}



//             <span  className="tocview"  dangerouslySetInnerHTML={{ __html: docView }} />
//             {/* <p dangerouslySetInnerHTML={{ __html: docView }}> </p> */}

//             {/* <>{docView}</> */}
//           </Dialog>

// <br/>
// {/* <br/> */}

//           <DataTable
//             value={data}
//             paginator
//             rowHover
//             loading={loading}
//             // scrollable
//             // scrollHeight="400px"
//             responsiveLayout="scroll"
//             paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
//             currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
//             rows={4}
//             p-datatable-wrapper
//             emptyMessage="No documents found."
//           // rowsPerPageOptions={[10, 20, 50]}
//           >
//             <Column field="name"
//               style={{
//                 maxWidth: "210px",
//                 minWidth: "8rem",
//                 textOverflow: "ellipsis",
//                 overflow: "hidden",
//                 whiteSpace: "nowrap",
//               }}
//               header="Section Name" />

//             <Column
//               field="content"
//               // style={{
//               //   maxWidth: "800px",
//               //   textOverflow: "ellipsis",
//               //   overflow: "hidden",
//               //   whiteSpace: "nowrap",
//               // }}
//               body={customBody}
//               header="Description"
//             />


//             <Column header="Action" body={actionbodyTemplate} />
//           </DataTable>
//           </ScrollPanel>
//         // ) :

//         //   null}

//         ) : (
//           <></>
//           // <div className="empty-message">No documents found.</div>
//           )}

// <div class="image-container">
//   <img class="float-image" src={Group} alt="Group" />
//   <img class="full-image" src={Reactangle} alt="Reactangle" />
// </div>





//            {/* <img
//           style={{ float:"right",marginTop:"15%",width: "15%",height:"15%"}}
//           src={Group}
//           alt="Group"
//         />

//          <img
//           style={{ width: "100%", height: "30%" }}
//           src={Reactangle}
//           alt=" Reactangle "
//         /> */}

//       </Card>

//       </div>


//   );
// };

// export default DocumentSearch;












// import React, { useState, useEffect, useRef } from 'react';
// import { DataTable } from "primereact/datatable";
// import { Column } from "primereact/column";
// import { InputText } from "primereact/inputtext";
// import { Button } from "primereact/button";
// import { Toast } from "primereact/toast";

// import Search from "../Assets/Search.png";
// import Reactangle from "../Assets/Rectangle.png";
// import Group from "../Assets/Group.png";
// import Background from "../Assets/Background.png";
// import { Card } from "primereact/card";
// import { Dialog } from 'primereact/dialog';
// import axios from "axios";
// import { ScrollPanel } from "primereact/scrollpanel";
// import { Tag } from 'primereact/tag';






// const DocumentSearch = () => {
//   const [data, setData] = useState([]);
//   const [secId, setSecId] = useState([]);
//   const [customer, setCustomers] = useState([]);
//   const [docView, setDocViewData] = useState();
//   const [uploadedDate, setUploadedDate] = useState([]);
//   const [documentName, setDocumentName] = useState([]);
//   // const [query] = useState();
//   const [query, setQuery] = useState('');
//   const [loading, setLoading] = useState(true);
//   const toast = useRef(null);
//   const [suggestions, setSuggestions] = useState([]);
//   const [displayBasic, setDisplayBasic] = useState(false);
//   const [isInputActive, setInputActive] = useState(false);
//   const [users,  setUsers] = useState([]);
//   const [uploadedBy,  setLoginUser] = useState([]);





//   useEffect(() => {

//      setLoginUser(sessionStorage.getItem('userName'));

//   }, []);




//   const handleInputChange = async (event) => {
//     const value = event.target.value;
//     setQuery(value);
//     setInputActive(value !== '');


//     axios
//     .get(`${process.env.REACT_APP_API_KEY}/sample/getSuggestions/${value}`)
//       .then((res) => {
//         console.log("All keyword data", res.data);
//         // setUsers(res.data)
//         setSuggestions(res.data);
//         // setDocViewData(res.data.data);
//         // setDocumentName(res.data.do)

//       });


//     try {
//       const response = await axios.get(`${process.env.REACT_APP_API_KEY}/sample/getStringSuggestion/${value}`); // Replace with the actual URL or path to your JSON data
//       const data = response.data;
//       // setSuggestions(data);
//       setUsers(data)

//       // console.log(data.Suggestion,"/?????????")
//     } catch (error) {
//       console.error('Error fetching JSON data:', error);
//     }
//   };

//   const handleSuggestionClick = (value) => {
//     setQuery(value);
//     setSuggestions([]);
//   };

//   const filteredSuggestions = suggestions.filter((item) =>
//     item.toLowerCase().includes(query.toLowerCase())
//   );

//   const displayedSuggestions = filteredSuggestions.slice(-5); // Limit the displayed suggestions to 2 keywords

//   const usersSuggestions = users.slice(-5); 

//   const dialogFuncMap = {
//     'displayBasic': setDisplayBasic,


//   }

//   const onClick = (name, position) => {
//     setSecId(position.secId);
//     console.log(position.secId, "/////www")



//     dialogFuncMap[`${name}`](true);

//     if (position) {


//       console.log(position)



//       axios
//       .get(`${process.env.REACT_APP_API_KEY}/document/getHtmlContains/${position.id}`)
//       .then((res) => {
//         console.log("All tree-sections", res.data);
//         setDocViewData(res.data.data);
//          setDocumentName(res.data.docName)
//       });




//     }
//   }

//   const onHide = (name) => {
//     dialogFuncMap[`${name}`](false);
//   }



//   // DOWNLOAD
//   const downloadFileAtURL = (rowData) => {
//     const url = `${process.env.REACT_APP_API_KEY}/document/downloadSec/${rowData.id}`;
//     console.log(rowData, " file to be download");
//     const fileName = url.split("/").pop();
//     const aTag = document.createElement("a");
//     aTag.href = url;
//     aTag.setAttribute("download", fileName);
//     document.body.appendChild(aTag);
//     aTag.click();
//     aTag.remove();
//   };






//   //SEARCH SECTION

//   async function search(key) {

//     if (key.length > 1) {
//       let text = key;

//     //   const handleEncodeClick = () => {
//     //     const encoded = btoa(inputString);
//     //     setEncodedString(encoded);
//     // }
//       let encoded = encodeURIComponent(text);
//       console.log(encoded,"????")
//       // console.log(decoded,"decode string")
//       let result = await fetch(
//         `${process.env.REACT_APP_API_KEY}/sample/getSectionHighlightedValue/` + encoded
//       );
//       result = await result.json();
//       console.warn("Tasdiq", result);
//       setData(result);
//       setCustomers(result);

//       setLoading(false);
//       console.log(customer, "/////////////////////////////////////****");
//     }
//   }

//   console.log(users,"??????ppppp")



//   const customBody = (rowData, column) => {
//     return <span dangerouslySetInnerHTML={{ __html: rowData[column.field] }} />;
//   };


//   const handleClearInput = () => {
//     setQuery('');
//   };




//   const secDownload = () => {
//     toast.current.show({
//       severity: "success",
//       summary: "Section Download Successfully",
//       detail: "Section Download",
//       life: 1000,
//     });
//   };



//   const actionbodyTemplate = (rowData) => {
//     console.log(rowData.id, "///docid");


//     setSecId(rowData.id);
//     // console.log(rowData.Docid,"///docid");



//     return (

//       < >
//         <div style={{ display: "flex" }}>

//           <Button
//             icon="pi pi-file"

//             className="p-button-raised  p-button-text"
//             // onMouseDown={() => onClickHeader(rowData)}

//             onClick={() => onClick('displayBasic', rowData)}
//             style={{
//               backgroundColor: "white",
//               height: "30px",
//               width: "30px",
//               color: "#203570",
//               marginRight: "10%"
//             }}
//           />





//           <Button
//             style={{
//             backgroundColor: "white",
//               height: "30px",
//               width: "30px",
//               color: "#203570",
//             }}
//             icon="pi pi-download"

//             onClick={() => {
//               downloadFileAtURL(rowData);
//             }}
//             onMouseDown={secDownload}
//             tooltip="Download "
//             tooltipOptions={{ className: "teal-tooltip", position: "bottom" }}
//             className="p-button-raised  p-button-text"

//           />
//         </div>
//       </>
//     );
//   };

//   const header=()=>{
//     return(<> {documentName}</>)

//   }

//   return (

//     <div >


//       <Button
//         style={{ backgroundColor: "white", color: "black", height: "35px" }}
//         className="p-button-raised  p-button p-button-secondary p-button-text"
//       >
//         <img
//           style={{ width: "15px", marginRight: "10px", height: "17px" }}
//           src={Search}
//           alt=" Search "
//         />
//         <b> Search Document</b>
//       </Button>
//       <img
//         style={{ height: "53px", float: "right" }}
//         src={Background}
//         alt=" Background "
//       />

//       <br />
//       <br />



//       <Card style={{ height: "520px" }}>
//         <Toast ref={toast} />
//         <div className="autocomplete">

//      <div className="card-container">
//         <span
//           className="p-input-icon-left"


//           style={{ marginLeft: "20%",width:"57%" }}
//         >



//      <div className={`input-container ${isInputActive ? 'Active' : ''}`}>


//      <div class="layout-sidebar-filter-content p-input-icon-left p-fluid p-input-icon-right">
//       <i class="pi pi-search"></i>

//      <InputText  
//     //  style={{display:"flex", alignItems: "center",
//     //  justifyContent:"center"}}
//       style={{ borderRadius: "2px",  width:"660px"}}
//      type="text" 
//      value={query}
//      onChange={handleInputChange}
//      onKeyDown={(e) => search(e.target.value)}

//      placeholder="Search"
//       aria-label="Search input"
//        autocomplete="off"
//        class="p-inputtext p-component p-filled"/>

//       <i class="clear-icon pi pi-times"
//          onClick={handleClearInput}
//        ></i>

//      </div>




//           {/* <InputText

//             type="text"
//             className="input"
//             value={query}
//             onChange={handleInputChange}
//             onKeyDown={(e) => search(e.target.value)}


//             placeholder="Search"
//           />
//          */}
//          </div>
//         </span>



//          {displayedSuggestions.length > 0 && (
//         <ul className="suggestions">
//           {displayedSuggestions.map((item) => (
//             <li
//               key={item}
//               className="suggestion"
//               onClick={() => handleSuggestionClick(item)}
//             >
//               {item}
//             </li>
//           ))}
//         </ul>
//       )}




// </div>
// </div>
// <br/>


// {/*  


//    {displayedSuggestions.length > 0 && (
//         <>
//           {displayedSuggestions.map((item) => (

//             <li
//               key={item.Suggestion}

//               onClick={() => handleSuggestionClick(item.Suggestion)}
//             >
//              <Tag style={{ backgroundColor: "#49ABA0"}} > {item.Suggestion}</Tag>
//             </li>
//           ))}
//         </>
//       )}  */}







//         {data.length > 0 ? (
//           // <Card>





// <div>
// <b style={{color:"black"}}>You may also be interested in........</b> 
// <br/> 
// {/* 
// {usersSuggestions.map((item) => (
//         <Tag style={{ backgroundColor: "#D2D7E2",color:"#2D2D2D"}} className="mr-2" > {item.Suggestion}</Tag>
//         ))} */}




//          {usersSuggestions.length > 0 && (
//         <>
//           {usersSuggestions.map((item) => (


//              <Tag style={{ backgroundColor: "#D2D7E2",color:"#2D2D2D"}} className="mr-2" > 

//              <div dangerouslySetInnerHTML={{ __html: item }}></div>
//              </Tag>

//           ))}
//         </>
//       )}    

//         <br/>

// <Dialog header={header} 
// visible={displayBasic} style={{ width: '80vw' }} onHide={() => onHide('displayBasic')}>
//             {/* <>{uploadedDate}</> */}



//             <span  className="tocview"  dangerouslySetInnerHTML={{ __html: docView }} />
//             {/* <p dangerouslySetInnerHTML={{ __html: docView }}> </p> */}

//             {/* <>{docView}</> */}
//           </Dialog>

// <br/>
// {/* <br/> */}

//           <DataTable
//             value={data}
//             paginator
//             rowHover
//             loading={loading}
//             stripedRows
//             scrollable
//             scrollHeight="330px"

//             paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
//             currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
//             rows={4}
//             p-datatable-wrapper
//             emptyMessage="No documents found."
//           // rowsPerPageOptions={[10, 20, 50]}
//           >
//             <Column field="name"
//               style={{
//                 maxWidth: "210px",
//                 minWidth: "8rem",
//                 textOverflow: "ellipsis",
//                 overflow: "hidden",
//                 whiteSpace: "nowrap",
//               }}
//               header="Section Name" />

//             <Column
//               field="content"
//              body={customBody}
//               header="Description"
//             />


//             <Column header="Action" body={actionbodyTemplate} />
//           </DataTable>
//           </div>


//         ) : (



//           <>

//            <b style={{display:"flex", alignItems: "center",justifyContent:"center"}}>Hi {uploadedBy} ,what can i help you find today?</b>


// {/*          
// <img class="float-image" src={Group} alt="Group" />
// <img class="full-image" src={Reactangle} alt="Reactangle" />
//            */}

//           </>
//           // <div className="empty-message">No documents found.</div>
//           )}

// {/* <div class="image-container">


// </div> */}




//       </Card>

//       </div>


//   );
// };

// export default DocumentSearch;





// import React, { useState, useEffect, useRef } from 'react';
// import { DataTable } from "primereact/datatable";
// import { Column } from "primereact/column";
// import { InputText } from "primereact/inputtext";
// import { Button } from "primereact/button";
// import { Toast } from "primereact/toast";

// import Search from "../Assets/Search.png";
// import Reactangle from "../Assets/Rectangle.png";
// import Group from "../Assets/Group.png";
// import Background from "../Assets/Background.png";
// import { Card } from "primereact/card";
// import { Dialog } from 'primereact/dialog';
// import axios from "axios";
// import { ScrollPanel } from "primereact/scrollpanel";
// import { Tag } from 'primereact/tag';






// const DocumentSearch = () => {
//   const [data, setData] = useState([]);
//   const [secId, setSecId] = useState([]);
//   const [customer, setCustomers] = useState([]);
//   const [docView, setDocViewData] = useState();
//   const [uploadedDate, setUploadedDate] = useState([]);
//   const [documentName, setDocumentName] = useState([]);
//   // const [query] = useState();
//   const [query, setQuery] = useState('');
//   const [loading, setLoading] = useState(true);
//   const toast = useRef(null);
//   const [suggestions, setSuggestions] = useState([]);
//   const [displayBasic, setDisplayBasic] = useState(false);
//   const [isInputActive, setInputActive] = useState(false);
//   const [users, setUsers] = useState([]);
//   const [uploadedBy, setLoginUser] = useState([]);
//   const [searchExecuted, setSearchExecuted] = useState(false);
//   const [searchResults, setSearchResults] = useState([]);





//   useEffect(() => {

//     setLoginUser(sessionStorage.getItem('userName'));

//   }, []);




//   const handleInputChange = async (event) => {
//     const value = event.target.value;
//     setQuery(value);
//     setInputActive(value !== '');


//     axios
//       .get(`${process.env.REACT_APP_API_KEY}/sample/getSuggestions/${value}`)
//       .then((res) => {
//         console.log("All keyword data", res.data);
//         // setUsers(res.data)
//         setSuggestions(res.data);
//         // setDocViewData(res.data.data);
//         // setDocumentName(res.data.do)

//       });


//     try {
//       const response = await axios.get(`${process.env.REACT_APP_API_KEY}/sample/getStringSuggestion/${value}`); // Replace with the actual URL or path to your JSON data
//       const data = response.data;
//       // setSuggestions(data);
//       setUsers(data)

//       // console.log(data.Suggestion,"/?????????")
//     } catch (error) {
//       console.error('Error fetching JSON data:', error);
//     }
//   };

//   const handleSuggestionClick = (value) => {
//     setQuery(value);
//     setSuggestions([]);
//   };

//   const filteredSuggestions = suggestions.filter((item) =>
//     item.toLowerCase().includes(query.toLowerCase())
//   );

//   const displayedSuggestions = filteredSuggestions.slice(-5); // Limit the displayed suggestions to 2 keywords

//   const usersSuggestions = users.slice(-5);

//   const dialogFuncMap = {
//     'displayBasic': setDisplayBasic,


//   }

//   const onClick = (name, position) => {
//     setSecId(position.secId);
//     console.log(position.secId, "/////www")



//     dialogFuncMap[`${name}`](true);

//     if (position) {


//       console.log(position)



//       axios
//         .get(`${process.env.REACT_APP_API_KEY}/document/getHtmlContains/${position.id}`)
//         .then((res) => {
//           console.log("All tree-sections", res.data);
//           setDocViewData(res.data.data);
//           setDocumentName(res.data.docName)
//         });




//     }
//   }

//   const onHide = (name) => {
//     dialogFuncMap[`${name}`](false);
//   }



//   // DOWNLOAD
//   const downloadFileAtURL = (rowData) => {
//     const url = `${process.env.REACT_APP_API_KEY}/document/downloadSec/${rowData.id}`;
//     console.log(rowData, " file to be download");
//     const fileName = url.split("/").pop();
//     const aTag = document.createElement("a");
//     aTag.href = url;
//     aTag.setAttribute("download", fileName);
//     document.body.appendChild(aTag);
//     aTag.click();
//     aTag.remove();
//   };






//   //SEARCH SECTION

//   async function search(key) {

//     if (key.length > 1) {
//       let text = key;

//       //   const handleEncodeClick = () => {
//       //     const encoded = btoa(inputString);
//       //     setEncodedString(encoded);
//       // }
//       let encoded = encodeURIComponent(text);
//       console.log(encoded, "????")
//       // console.log(decoded,"decode string")
//       let result = await fetch(
//         `${process.env.REACT_APP_API_KEY}/sample/getSectionHighlightedValue/` + encoded
//       );
//       result = await result.json();
//       console.warn("Tasdiq", result);
//       setData(result);
//       setSearchExecuted(true);
//       setSearchResults(result);

//       setCustomers(result);

//       setLoading(false);
//       console.log(customer, "/////////////////////////////////////****");
//     }
//   }

//   console.log(users, "??????ppppp")



//   const customBody = (rowData, column) => {
//     return <span dangerouslySetInnerHTML={{ __html: rowData[column.field] }} />;
//   };


//   const handleClearInput = () => {
//     setQuery('');
//   };




//   const secDownload = () => {
//     toast.current.show({
//       severity: "success",
//       summary: "Section Download Successfully",
//       detail: "Section Download",
//       life: 1000,
//     });
//   };



//   const actionbodyTemplate = (rowData) => {
//     console.log(rowData.id, "///docid");


//     setSecId(rowData.id);
//     // console.log(rowData.Docid,"///docid");



//     return (

//       < >
//         <div style={{ display: "flex" }}>

//           <Button
//             icon="pi pi-file"

//             className="p-button-raised  p-button-text"
//             // onMouseDown={() => onClickHeader(rowData)}

//             tooltip="View Section"
//             tooltipOptions={{ className: "teal-tooltip", position: "bottom" }}
//             onClick={() => onClick('displayBasic', rowData)}
//             style={{
//               backgroundColor: "white",
//               height: "30px",
//               width: "30px",
//               color: "#203570",
//               marginRight: "10%"
//             }}
//           />





//           <Button
//             style={{
//               backgroundColor: "white",
//               height: "30px",
//               width: "30px",
//               color: "#203570",
//             }}
//             icon="pi pi-download"

//             onClick={() => {
//               downloadFileAtURL(rowData);
//             }}
//             onMouseDown={secDownload}
//             tooltip="Download "
//             tooltipOptions={{ className: "teal-tooltip", position: "bottom" }}
//             className="p-button-raised  p-button-text"

//           />
//         </div>
//       </>
//     );
//   };

//   const header = () => {
//     return (<> {documentName}</>)

//   }

//   return (

//     <div >


//       <Button
//         style={{ backgroundColor: "white", color: "black", height: "35px" }}
//         className="p-button-raised  p-button p-button-secondary p-button-text"
//       >
//         <img
//           style={{ width: "15px", marginRight: "10px", height: "17px" }}
//           src={Search}
//           alt=" Search "
//         />
//         <b> Search Document</b>
//       </Button>
//       <img
//         style={{ height: "53px", float: "right" }}
//         src={Background}
//         alt=" Background "
//       />

//       <br />
//       <br />



//       <Card style={{ height: "520px" }}>
//         <Toast ref={toast} />
//         <div className="autocomplete">

//           <div className="card-container">
//             <span
//               className="p-input-icon-left"


//               style={{ marginLeft: "20%", width: "57%" }}
//             >



//               <div className={`input-container ${isInputActive ? 'Active' : ''}`}>


//                 <div class="layout-sidebar-filter-content p-input-icon-left p-fluid p-input-icon-right">
//                   <i class="pi pi-search"></i>

//                   <InputText
//                     //  style={{display:"flex", alignItems: "center",
//                     //  justifyContent:"center"}}
//                     style={{ borderRadius: "2px", width: "660px" }}
//                     type="text"
//                     value={query}
//                     onChange={handleInputChange}
//                     onKeyDown={(e) => search(e.target.value)}

//                     placeholder="Search"
//                     aria-label="Search input"
//                     autocomplete="off"
//                     class="p-inputtext p-component p-filled" />

//                   <i class="clear-icon pi pi-times"
//                     onClick={handleClearInput}
//                   ></i>

//                 </div>




//                 {/* <InputText
           
//             type="text"
//             className="input"
//             value={query}
//             onChange={handleInputChange}
//             onKeyDown={(e) => search(e.target.value)}
           
          
//             placeholder="Search"
//           />
//          */}
//               </div>
//             </span>



//             {displayedSuggestions.length > 0 && (
//               <ul className="suggestions">
//                 {displayedSuggestions.map((item) => (
//                   <li
//                     key={item}
//                     className="suggestion"
//                     onClick={() => handleSuggestionClick(item)}
//                   >
//                     {item}
//                   </li>
//                 ))}
//               </ul>
//             )}




//           </div>
//         </div>
//         <br />


//         {/*  


//    {displayedSuggestions.length > 0 && (
//         <>
//           {displayedSuggestions.map((item) => (
            
//             <li
//               key={item.Suggestion}
             
//               onClick={() => handleSuggestionClick(item.Suggestion)}
//             >
//              <Tag style={{ backgroundColor: "#49ABA0"}} > {item.Suggestion}</Tag>
//             </li>
//           ))}
//         </>
//       )}  */}





// {searchExecuted && searchResults.length === 0 && (
//               <b className='notfound'>No results found.</b>
//             )}

//         {data.length > 0 ? (
//           // <Card>






//           // <div>
          
//           //   <b style={{ color: "black" }}>You may also be interested in........</b>
//           //   <br />
      


//           //   {usersSuggestions.length > 0 && (
//           //     <>
//           //       {usersSuggestions.map((item) => (


//           //         <Tag style={{ backgroundColor: "#D2D7E2", color: "#2D2D2D" }} className="mr-2" >

//           //           <div dangerouslySetInnerHTML={{ __html: item }}></div>
//           //         </Tag>

//           //       ))}
//           //     </>
//           //   )}

//           //   <br />

//           //   <Dialog header={header}
//           //     visible={displayBasic} style={{ width: '80vw' }} onHide={() => onHide('displayBasic')}>
//           //     {/* <>{uploadedDate}</> */}



//           //     <span className="tocview" dangerouslySetInnerHTML={{ __html: docView }} />
//           //     {/* <p dangerouslySetInnerHTML={{ __html: docView }}> </p> */}

//           //     {/* <>{docView}</> */}
//           //   </Dialog>

//           //   <br />
//           //   {/* <br/> */}

//           //   <DataTable
//           //     value={data}
//           //     paginator
//           //     rowHover
//           //     loading={loading}
//           //     stripedRows
//           //     scrollable
//           //     scrollHeight="330px"

//           //     paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
//           //     currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
//           //     rows={4}
//           //     p-datatable-wrapper
//           //     emptyMessage="No documents found."
//           //   // rowsPerPageOptions={[10, 20, 50]}
//           //   >
//           //     <Column field="name"
//           //       style={{
//           //         maxWidth: "210px",
//           //         minWidth: "8rem",
//           //         textOverflow: "ellipsis",
//           //         overflow: "hidden",
//           //         whiteSpace: "nowrap",
//           //       }}
//           //       header="Section Name" />

//           //     <Column
//           //       field="content"
//           //       body={customBody}
//           //       header="Description"
//           //     />


//           //     <Column header="Action" body={actionbodyTemplate} />
//           //   </DataTable>
//           // </div>

// <></>
//         ) : (



//           <>



//             {/*          
// <img class="float-image" src={Group} alt="Group" />
// <img class="full-image" src={Reactangle} alt="Reactangle" />
//            */}

//           </>
//           // <div className="empty-message">No documents found.</div>
//         )}

//         {/* <div class="image-container">


// </div> */}




//       </Card>

//     </div>


//   );
// };

// export default DocumentSearch;





// import React, { useState, useEffect, useRef } from 'react';
// import { DataTable } from "primereact/datatable";
// import { Column } from "primereact/column";
// import { InputText } from "primereact/inputtext";
// import { Button } from "primereact/button";
// import { Toast } from "primereact/toast";

// import Search from "../Assets/Search.png";
// import Reactangle from "../Assets/Rectangle.png";
// import Group from "../Assets/Group.png";
// import Background from "../Assets/Background.png";
// import { Card } from "primereact/card";
// import { Dialog } from 'primereact/dialog';
// import axios from "axios";
// import { ScrollPanel } from "primereact/scrollpanel";
// import { Tag } from 'primereact/tag';






// const DocumentSearch = () => {
//   const [data, setData] = useState([]);
//   const [secId, setSecId] = useState([]);
//   const [customer, setCustomers] = useState([]);
//   const [docView, setDocViewData] = useState();

//   const [documentName, setDocumentName] = useState([]);
//   // const [query] = useState();
//   const [query, setQuery] = useState('');
//   const [loading, setLoading] = useState(true);
//   const toast = useRef(null);
//   const [suggestions, setSuggestions] = useState([]);
//   const [displayBasic, setDisplayBasic] = useState(false);
//   const [isInputActive, setInputActive] = useState(false);
//   const [users, setUsers] = useState([]);
//   const [uploadedBy, setLoginUser] = useState([]);
//   const [searchResults, setSearchResults] = useState([]);
//   const [createdBy,  setLoginUser1] = useState()
//   const [searchExecuted, setSearchExecuted] = useState(false);

//   let [changeText, setChangeText] = useState(Boolean);


//   useEffect(() => {

//     setLoginUser(sessionStorage.getItem('userName'));
//     setLoginUser1(sessionStorage.getItem('userName'));
//     // axios
//     // .get(`${process.env.REACT_APP_API_KEY}/document/getDocById/${id}`)
//     // .then((res) => {
//     //   setDocumentName(res.data.documentName);
//     //   setChangeText(res.data.bookmarks);
//     //   setChangeEnable(res.data.enable);
     
//     // });

//   }, []);




//   const handleInputChange = async (event) => {
//     const value = event.target.value;
//     setQuery(value);

//     setInputActive(value !== '');
//     setSearchExecuted(false);


//     axios
//       .get(`${process.env.REACT_APP_API_KEY}/sample/getSuggestions/${value}`)
//       .then((res) => {
//         console.log("All keyword data", res.data);
//         // setUsers(res.data)
//         setSuggestions(res.data);


//       });


//     try {
//       const response = await axios.get(`${process.env.REACT_APP_API_KEY}/sample/getStringSuggestion/${value}`); // Replace with the actual URL or path to your JSON data
//       const data = response.data;
//       // setSuggestions(data);
//       setUsers(data)

//       // console.log(data.Suggestion,"/?????????")
//     } catch (error) {
//       console.error('Error fetching JSON data:', error);
//     }
//   };

//   const handleSuggestionClick = (value) => {
//     setQuery(value);
//     setSuggestions([]);

//   };

//   const filteredSuggestions = suggestions.filter((item) =>
//     item.toLowerCase().includes(query.toLowerCase())
//   );

//   const displayedSuggestions = filteredSuggestions.slice(-5); // Limit the displayed suggestions to 2 keywords

//   const usersSuggestions = users.slice(-5);

//   const dialogFuncMap = {
//     'displayBasic': setDisplayBasic,


//   }

//   const onClick = (name, position) => {
//     setSecId(position.secId);
//     console.log(position.secId, "/////www")



//     dialogFuncMap[`${name}`](true);

//     if (position) {


//       console.log(position)



//       axios
//         .get(`${process.env.REACT_APP_API_KEY}/document/getHtmlContains/${position.id}`)
//         .then((res) => {
//           console.log("All tree-sections", res.data);
//           setDocViewData(res.data.data);
//           setDocumentName(res.data.docName)
//         });




//     }
//   }

//   const onHide = (name) => {
//     dialogFuncMap[`${name}`](false);
//   }



//   // DOWNLOAD
//   const downloadFileAtURL = (rowData) => {
//     const url = `${process.env.REACT_APP_API_KEY}/document/downloadSec/${rowData.id}`;
//     console.log(rowData, " file to be download");
//     const fileName = url.split("/").pop();
//     const aTag = document.createElement("a");
//     aTag.href = url;
//     aTag.setAttribute("download", fileName);
//     document.body.appendChild(aTag);
//     aTag.click();
//     aTag.remove();
//   };






//   //SEARCH SECTION

//   async function search(key) {

//     if (key.length > 1) {
//       let text = key;



//       let encoded = encodeURIComponent(text);
//       console.log(encoded, "????")
//       // console.log(decoded,"decode string")
//       let result = await fetch(
//         `${process.env.REACT_APP_API_KEY}/sample/getSectionHighlightedValue/` + encoded
//       );
//       result = await result.json();
//       console.log("data", result);


//       setData(result);
//       setSearchResults(result);
//       setSearchExecuted(true);

//       setCustomers(result);

//       setLoading(false);
//       console.log(customer, "/////////////////////////////////////****");

//     }
//     //
//   }


//   console.log(users, "??????ppppp")



//   const customBody = (rowData, column) => {
//     return <span dangerouslySetInnerHTML={{ __html: rowData[column.field] }} />;
//   };


//   const handleClearInput = () => {
//     setQuery('');
//     setSearchExecuted(false);
//   };




//   const secDownload = () => {
//     toast.current.show({
//       severity: "success",
//       summary: "Section Download Successfully",
//       detail: "Section Download",
//       life: 1000,
//     });
//   };



//   const actionbodyTemplate = (rowData) => {
//     console.log(rowData.id, "///docid");


//     setSecId(rowData.id);
//     // console.log(rowData.Docid,"///docid");



//     return (

//       < >
//         <div style={{ display: "flex" }}>

//           <Button
//             icon="pi pi-file"

//             className="p-button-raised  p-button-text"
//             // onMouseDown={() => onClickHeader(rowData)}

//             tooltip="View Section"
//             tooltipOptions={{ className: "teal-tooltip", position: "bottom" }}
//             onClick={() => onClick('displayBasic', rowData)}
//             style={{
//               backgroundColor: "white",
//               height: "30px",
//               width: "30px",
//               color: "#203570",
//               marginRight: "10%"
//             }}
//           />





//           <Button
//             style={{
//               backgroundColor: "white",
//               height: "30px",
//               width: "30px",
//               color: "#203570",
//             }}
//             icon="pi pi-download"

//             onClick={() => {
//               downloadFileAtURL(rowData);
//             }}
//             onMouseDown={secDownload}
//             tooltip="Download "
//             tooltipOptions={{ className: "teal-tooltip", position: "bottom" }}
//             className="p-button-raised  p-button-text"

//           />
//         </div>
//       </>
//     );
//   };

//   const header = () => {
//     return (<> {documentName}
    
//     <Button
//             visible={!changeText}
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
//             onClick={() => BookmarkSection()}
        
//           />
//           <Button
//             visible={changeText}
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
//               BookmarkSection();
//             }}
         
//           />{" "}
        
    
    
//     </>)

//   }


  
//   //SECTION BOOKMARK
//   function BookmarkSection() {
  
//     let data = {
//       createdBy
//     };
//     const version="version1";
//     // version
//   fetch(`${process.env.REACT_APP_API_KEY}/document/setSectionBookmark/${secId}/${version}`, {
//     method: "PUT",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(data),
//   }).then(
//     (result) => {
//       if (result.status === 200) {
//         console.warn("result...!!!", result);
//         result.json().then((resp) => {
//           console.warn("resp", resp);
//         });
  
//         toast.current.show({
//           severity: "success",
//           summary: "Section Bookmark",
//           detail: "Section Bookmark Successfully",
//           life: 2000,
//         });
//         // setTimeout(() => {
//         //   window.location.reload(false);
//         // }, 2000);
//       } else {
//         toast.current.show({
//           severity: "warn",
//           summary: "Section Not Bookmark",
//           detail: "Error while Bookmark Section",
//           life: 2000,
//         });
//       }
      
//     },
//     (error) => {
//       toast.current.show({
//         severity: "error",
//         summary: "Section Not Bookmark",
//         detail: "Error while Bookmark Section",
//         life: 2000,
//       });
//     }
//   );
 
//   }
  

//   return (

//     <div >


//       <Button
//         style={{ backgroundColor: "white", color: "black", height: "35px" }}
//         className="p-button-raised  p-button p-button-secondary p-button-text"
//       >
//         <img
//           style={{ width: "15px", marginRight: "10px", height: "17px" }}
//           src={Search}
//           alt=" Search "
//         />
//         <b> Search Document</b>
//       </Button>
//       <img
//         style={{ height: "53px", float: "right" }}
//         src={Background}
//         alt=" Background "
//       />

//       <br />
//       <br />



//       <Card style={{ height: "87vh" }}>
//         <Toast ref={toast} />
//         <div className="autocomplete">

//           <div className="card-container">
//             <span
//               className="p-input-icon-left"


//               style={{ marginLeft: "20%", width: "57%" }}
//             >



//               <div className={`input-container ${isInputActive ? 'Active' : ''}`}>


//                 <div class="layout-sidebar-filter-content p-input-icon-left p-fluid p-input-icon-right">
//                   <i class="pi pi-search"></i>

//                   <InputText
                   
//                     style={{ borderRadius: "2px", width: "660px" }}
//                     type="text"
//                     value={query}
//                     placeholder='Search...'
//                     onChange={handleInputChange}
//                     onKeyDown={(e) => search(e.target.value)}

//                     aria-label="Search input"
//                     autocomplete="off"
//                     class="p-inputtext p-component p-filled" 
//                     />

//                   <i class="clear-icon pi pi-times"
//                     onClick={handleClearInput}
//                   ></i>

//                 </div>





//                 {/* <InputText
           
//             type="text"
//             className="input"
//             value={query}
//             onChange={handleInputChange}
//             onKeyDown={(e) => search(e.target.value)}
           
          
//             placeholder="Search"
//           />
//          */}
//               </div>
//             </span>



//             {displayedSuggestions.length > 0 && (
//               <ul className="suggestions">
//                 {displayedSuggestions.map((item) => (
//                   <li
//                     key={item}
//                     className="suggestion"
//                     onClick={() => handleSuggestionClick(item)}
//                   >
//                     {item}
//                   </li>
//                 ))}
//               </ul>
//             )}




//           </div>
//         </div>

//         {/* {searchResults.length === 0 && (
//         <p style={{display:"flex", alignItems: "center",justifyContent:"center"}}>No results found.</p>
//       )} */}

//         {searchExecuted && searchResults.length === 0 && (
//           <b className='notfound'>No results found.</b>
//         )}
//         <br />

//         {data.length > 0 ? (
//           // <Card>





//           <div>
//             {/* <b style={{ color: "black" }}>You may also be interested in........</b>
//             <br /> */}
//             {/* 
// {usersSuggestions.map((item) => (
//         <Tag style={{ backgroundColor: "#D2D7E2",color:"#2D2D2D"}} className="mr-2" > {item.Suggestion}</Tag>
//         ))} */}




//             {/* {usersSuggestions.length > 0 && (
//               <>
//                 {usersSuggestions.map((item) => (


//                   <Tag style={{ backgroundColor: "#D2D7E2", color: "#2D2D2D" }} className="mr-2" >

//                     <div dangerouslySetInnerHTML={{ __html: item }}></div>
//                   </Tag>

//                 ))}
//               </>
//             )}

//             <br /> */}

//             <Dialog header={header}
//               visible={displayBasic} style={{ width: '80vw' }} onHide={() => onHide('displayBasic')}>
//               {/* <>{uploadedDate}</> */}



//               <span className="tocview" dangerouslySetInnerHTML={{ __html: docView }} />
//               {/* <p dangerouslySetInnerHTML={{ __html: docView }}> </p> */}

//               {/* <>{docView}</> */}
//             </Dialog>

//             {/* <br /> */}
//             {/* <br/> */}


//             <DataTable
//               value={data}
//               paginator
//               rowHover
//               loading={loading}
//               stripedRows
//               scrollable
//               scrollHeight="330px"

//               paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
//               currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
//               rows={4}
//               p-datatable-wrapper
//               emptyMessage="No documents found."
//             // rowsPerPageOptions={[10, 20, 50]}
//             >
//               <Column field="name"
//                 style={{
//                   maxWidth: "210px",
//                   minWidth: "8rem",
//                   textOverflow: "ellipsis",
//                   overflow: "hidden",
//                   whiteSpace: "nowrap",
//                 }}
//                 header="Section Name" />

//               <Column
//                 field="content"
//                 body={customBody}
//                 header="Description"
//               />


//               <Column header="Action" body={actionbodyTemplate} />


//             </DataTable>

//             {/* ) : (
//         <div>No documents found after the search.</div>
//       )} */}
//           </div>





//         ) : (

//           <>
//             {/* <p>No result Found</p> */}
//           </>




//         )}








//       </Card>

//     </div>


//   );
// };

// export default DocumentSearch;





// import React, { useState, useEffect, useRef } from 'react';
// import { DataTable } from "primereact/datatable";
// import { Column } from "primereact/column";
// import { InputText } from "primereact/inputtext";
// import { Button } from "primereact/button";
// import { Toast } from "primereact/toast";

// import Search from "../Assets/Search.png";
// import Reactangle from "../Assets/Rectangle.png";
// import Group from "../Assets/Group.png";
// import Background from "../Assets/Background.png";
// import { Card } from "primereact/card";
// import { Dialog } from 'primereact/dialog';
// import axios from "axios";
// import { ScrollPanel } from "primereact/scrollpanel";
// import { Tag } from 'primereact/tag';






// const DocumentSearch = () => {
//   const [data, setData] = useState([]);
//   const [secId, setSecId] = useState([]);
//   const [customer, setCustomers] = useState([]);
//   const [docView, setDocViewData] = useState();

//   const [documentName, setDocumentName] = useState([]);
  
//   const [query, setQuery] = useState('');
//   const [loading, setLoading] = useState(true);
//   const toast = useRef(null);
//   const [suggestions, setSuggestions] = useState([]);
//   const [displayBasic, setDisplayBasic] = useState(false);
//   const [isInputActive, setInputActive] = useState(false);
//   const [users, setUsers] = useState([]);
//   const [createdBy, setLoginUser] = useState([]);
//   const [searchResults, setSearchResults] = useState([]);

//   const [searchExecuted, setSearchExecuted] = useState(false);



//   useEffect(() => {

//     setLoginUser(sessionStorage.getItem('userName'));

//   }, []);




//   const handleInputChange = async (event) => {
//     const value = event.target.value;
//     setQuery(value);

//     setInputActive(value !== '');
//     // setSearchExecuted(true);


//     axios
//       .get(`${process.env.REACT_APP_API_KEY}/sample/getSuggestions/${value}`)
//       .then((res) => {
//         console.log("All keyword data", res.data);
//         setUsers(res.data)
//         setSuggestions(res.data);


//       });


//     try {
//       const response = await axios.get(`${process.env.REACT_APP_API_KEY}/sample/getStringSuggestion/${value}`); // Replace with the actual URL or path to your JSON data
//       const data = response.data;
//       // setSuggestions(data);
//       setUsers(data)

//       // console.log(data.Suggestion,"/?????????")
//     } catch (error) {
//       console.error('Error fetching JSON data:', error);
//     }
//   };

//   const handleSuggestionClick = (value) => {
//     setQuery(value);
//     setSuggestions([]);

//   };

//   const filteredSuggestions = suggestions.filter((item) =>
//     item.toLowerCase().includes(query.toLowerCase())
//   );

//   const displayedSuggestions = filteredSuggestions.slice(-4); // Limit the displayed suggestions to 2 keywords

//   // const usersSuggestions = users.slice(-5);

//   const dialogFuncMap = {
//     'displayBasic': setDisplayBasic,


//   }

//   const onClick = (name, position) => {
//     setSecId(position.secId);
//     console.log(position.secId, "/////www")



//     dialogFuncMap[`${name}`](true);

//     if (position) {


//       console.log(position)



//       axios
//         .get(`${process.env.REACT_APP_API_KEY}/document/getHtmlContains/${position.id}`)
//         .then((res) => {
//           console.log("All tree-sections", res.data);
//           setDocViewData(res.data.data);
//           setDocumentName(res.data.docName)
//         });




//     }
//   }

//   const onHide = (name) => {
//     dialogFuncMap[`${name}`](false);
//   }



//   // DOWNLOAD
//   const downloadFileAtURL = (rowData) => {
//     const url = `${process.env.REACT_APP_API_KEY}/document/downloadSec/${rowData.id}/${createdBy}`;
//     console.log(rowData, " file to be download");
//     const fileName = url.split("/").pop();
//     const aTag = document.createElement("a");
//     aTag.href = url;
//     aTag.setAttribute("download", fileName);
//     document.body.appendChild(aTag);
//     aTag.click();
//     aTag.remove();
//   };






//   //SEARCH SECTION

//   async function search(key) {
//     console.log("key:",key);

//     setSuggestions([]);

    
    
//     if (key.keyCode===13  && key.target.value.length > 1) {
//       let text = key.target.value;
//       let encoded = encodeURIComponent(text);
//       console.log(encoded, "????")
//       let result = await fetch(
//         `${process.env.REACT_APP_API_KEY}/sample/getSectionHighlightedValue/` + encoded
//       );
//       result = await result.json();
//       console.log("data", result);


//       setData(result);
//       setSearchResults(result);
//       if(result.length>0){
//         setSuggestions([]);

//         setSearchExecuted(false);
//       }else{
//         setSearchExecuted(true);
//       }

//       setCustomers(result);
   
//       setLoading(false);
//       console.log(customer, "/////////////////////////////////////****");

//     }else{
//       console.log("press enter");
//       setSearchResults([])
//     }
//     //
//   }


//   async function searchOnClick(e,key) {
//     console.log(e,"key:",key);

//     setSuggestions([]);

   
    
//     if (e.type==='click' && key.length> 1) {
//       let text = key;
//       let encoded = encodeURIComponent(text);
//       console.log(encoded, "????")
//       let result = await fetch(
//         `${process.env.REACT_APP_API_KEY}/sample/getSectionHighlightedValue/` + encoded
//       );
//       result = await result.json();
//       console.log("data", result);


//       setData(result);
//       setSearchResults(result);
//       if(result.length>0){
//         setSuggestions([]);

//         setSearchExecuted(false);
//       }else{
//         setSearchExecuted(true);
//       }

//       setCustomers(result);
      
//       setLoading(false);
//       console.log(customer, "/////////////////////////////////////****");

//     }else{
//       console.log("press enter");
//       setSearchResults([])
//     }
//     //
//   }


//   console.log(users, "??????ppppp")



//   const customBody = (rowData, column) => {
//     return <span dangerouslySetInnerHTML={{ __html: rowData[column.field] }} />;
//   };


//   const handleClearInput = () => {
//     setQuery('');
//     setSearchExecuted(false);
//   };




//   const secDownload = () => {
//     toast.current.show({
//       severity: "success",
//       summary: "Section Download Successfully",
//       detail: "Section Download",
//       life: 1000,
//     });
//   };



//   const actionbodyTemplate = (rowData) => {
//     console.log(rowData.id, "///docid");


//     setSecId(rowData.id);
//     // console.log(rowData.Docid,"///docid");



//     return (

//       < >
//         <div style={{ display: "flex" }}>

//           <Button
//             icon="pi pi-file"

//             className="p-button-raised  p-button-text"
//             // onMouseDown={() => onClickHeader(rowData)}

//             tooltip="View Section"
//             tooltipOptions={{ className: "teal-tooltip", position: "bottom" }}
//             onClick={() => onClick('displayBasic', rowData)}
//             style={{
//               backgroundColor: "white",
//               height: "30px",
//               width: "30px",
//               color: "#203570",
//               marginRight: "10%"
//             }}
//           />





//           <Button
//             style={{
//               backgroundColor: "white",
//               height: "30px",
//               width: "30px",
//               color: "#203570",
//             }}
//             icon="pi pi-download"

//             onClick={() => {
//               downloadFileAtURL(rowData);
//             }}
//             // onMouseDown={secDownload}
//             tooltip="Download "
//             tooltipOptions={{ className: "teal-tooltip", position: "bottom" }}
//             className="p-button-raised  p-button-text"

//           />
//         </div>
//       </>
//     );
//   };

//   const header = () => {
//     return (<> {documentName}</>)

//   }

//   return (

//     <div >


//       <Button
//         style={{ backgroundColor: "white", color: "black", height: "35px" }}
//         className="p-button-raised  p-button p-button-secondary p-button-text"
//       >
//         <img
//           style={{ width: "15px", marginRight: "10px", height: "17px" }}
//           src={Search}
//           alt=" Search "
//         />
//         <b> Search Document</b>
//       </Button>
//       <img
//         style={{ height: "53px", float: "right" }}
//         src={Background}
//         alt=" Background "
//       />

//       <br />
//       <br />



//       <Card style={{ height: "87vh" }}>
//         <Toast ref={toast} />
//         <div className="autocomplete">

//           <div className="card-container">
//             <span
//               className="p-input-icon-left"


//               style={{ marginLeft: "20%", width: "57%" }}
//             >



//               <div className={`input-container ${isInputActive ? 'Active' : ''}`}>


//                 <div class="layout-sidebar-filter-content p-input-icon-left p-fluid p-input-icon-right">
//                   <i class="pi pi-search"></i>

//                   <InputText
                  
//                     style={{ borderRadius: "2px",width:"660px"}}
//                     type="text"
//                     value={query}
//                     placeholder='Search...'
//                     onChange={handleInputChange}
//                     onKeyDown={(e) => search(e)}
//                     class="p-inputtext  p-component p-filled" 
                   
//                     />


//                   <i class="clear-icon pi pi-times"
//                     onClick={handleClearInput}
//                   ></i>

//                 </div>





//               </div>
//             </span>



//             {displayedSuggestions.length > 0 && (
//               <ul className="suggestions">
//                 {displayedSuggestions.map((item) => (
//                   <li
//                     key={item}
//                     className="suggestion"
//                     onClick={() => handleSuggestionClick(item)}
//                   >
//                    <span onClick={(e)=>searchOnClick(e,query)}> {item}</span>
//                   </li>
//                 ))}
//               </ul>
//             )}




//           </div>
//         </div>

//         {/* {searchResults.length === 0 && (
//         <p style={{display:"flex", alignItems: "center",justifyContent:"center"}}>No results found.</p>
//       )} */}

//         {searchExecuted && searchResults.length === 0 && (
//           <b className='notfound'>No results found.</b>
//         )}
//         <br />

//         {data.length > 0 ? (
//           // <Card>





//           <div>
//             {/* <b style={{ color: "black" }}>You may also be interested in........</b>
//             <br /> */}
//             {/* 
// {usersSuggestions.map((item) => (
//         <Tag style={{ backgroundColor: "#D2D7E2",color:"#2D2D2D"}} className="mr-2" > {item.Suggestion}</Tag>
//         ))} */}




//             {/* {usersSuggestions.length > 0 && (
//               <>
//                 {usersSuggestions.map((item) => (


//                   <Tag style={{ backgroundColor: "#D2D7E2", color: "#2D2D2D" }} className="mr-2" >

//                     <div dangerouslySetInnerHTML={{ __html: item }}></div>
//                   </Tag>

//                 ))}
//               </>
//             )}

//             <br /> */}

//             <Dialog header={header}
//               visible={displayBasic} style={{ width: '80vw' }} onHide={() => onHide('displayBasic')}>
//               {/* <>{uploadedDate}</> */}



//               <span className="tocview" dangerouslySetInnerHTML={{ __html: docView }} />
//               {/* <p dangerouslySetInnerHTML={{ __html: docView }}> </p> */}

//               {/* <>{docView}</> */}
//             </Dialog>

//             {/* <br />
//            */}


//             <DataTable
//               value={data}
//               paginator
//               rowHover
//               loading={loading}
//               stripedRows
//               scrollable
//               scrollHeight="330px"

//               paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
//               currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
//               rows={4}
//               p-datatable-wrapper
//               emptyMessage="No documents found."
//             // rowsPerPageOptions={[10, 20, 50]}
//             >
//               <Column field="name"
//                 style={{
//                   maxWidth: "210px",
//                   minWidth: "8rem",
//                   textOverflow: "ellipsis",
//                   overflow: "hidden",
//                   whiteSpace: "nowrap",
//                 }}
//                 header="Section Name" />

//               <Column
//                 field="content"
//                 body={customBody}
//                 header="Description"
//               />


//               <Column header="Action" body={actionbodyTemplate} />


//             </DataTable>

//             {/* ) : (
//         <div>No documents found after the search.</div>
//       )} */}
//           </div>





//         ) : (

//           <>
//             {/* <p>No result Found</p> */}
//           </>




//         )}








//       </Card>

//     </div>


//   );
// };

// export default DocumentSearch;









// import React, { useState, useEffect, useRef } from 'react';
// import { DataTable } from "primereact/datatable";
// import { Column } from "primereact/column";
// import { InputText } from "primereact/inputtext";
// import { Button } from "primereact/button";
// import { Toast } from "primereact/toast";

// import Search from "../Assets/Search.png";
// import Reactangle from "../Assets/Rectangle.png";
// import Group from "../Assets/Group.png";
// import Background from "../Assets/Background.png";
// import { Card } from "primereact/card";
// import { Dialog } from 'primereact/dialog';
// import axios from "axios";
// import { ScrollPanel } from "primereact/scrollpanel";
// import { Tag } from 'primereact/tag';






// const DocumentSearch = () => {
//   const [data, setData] = useState([]);
//   const [secId, setSecId] = useState([]);
//   const [customer, setCustomers] = useState([]);
//   const [docView, setDocViewData] = useState();

//   const [documentName, setDocumentName] = useState([]);
  
//   const [query, setQuery] = useState('');
//   const [loading, setLoading] = useState(true);
//   const toast = useRef(null);
//   const [suggestions, setSuggestions] = useState([]);
//   const [displayBasic, setDisplayBasic] = useState(false);
//   const [isInputActive, setInputActive] = useState(false);
//   const [users, setUsers] = useState([]);
//   const [createdBy, setLoginUser] = useState([]);
//   const [searchResults, setSearchResults] = useState([]);

//   const [searchExecuted, setSearchExecuted] = useState(false);



//   useEffect(() => {

//     setLoginUser(sessionStorage.getItem('userName'));

//   }, []);




//   const handleInputChange = async (event) => {
//     const value = event.target.value;
//     setQuery(value);

//     setInputActive(value !== '');
//     // setSearchExecuted(true);


//     axios
//       .get(`${process.env.REACT_APP_API_KEY}/sample/getSuggestions/${value}`)
//       .then((res) => {
//         console.log("All keyword data", res.data);
//         setUsers(res.data)
//         setSuggestions(res.data);


//       });


//     try {
//       const response = await axios.get(`${process.env.REACT_APP_API_KEY}/sample/getStringSuggestion/${value}`); // Replace with the actual URL or path to your JSON data
//       const data = response.data;
//       // setSuggestions(data);
//       setUsers(data)

//       // console.log(data.Suggestion,"/?????????")
//     } catch (error) {
//       console.error('Error fetching JSON data:', error);
//     }
//   };

//   const handleSuggestionClick = (value) => {
//     setQuery(value);
//     setSuggestions([]);

//   };

//   const filteredSuggestions = suggestions.filter((item) =>
//     item.toLowerCase().includes(query.toLowerCase())
//   );

//   const displayedSuggestions = filteredSuggestions.slice(-4); // Limit the displayed suggestions to 2 keywords

//   // const usersSuggestions = users.slice(-5);

//   const dialogFuncMap = {
//     'displayBasic': setDisplayBasic,


//   }

//   const onClick = (name, position) => {
//     setSecId(position.secId);
//     console.log(position.secId, "/////www")



//     dialogFuncMap[`${name}`](true);

//     if (position) {


//       console.log(position)



//       axios
//         .get(`${process.env.REACT_APP_API_KEY}/document/getHtmlContains/${position.id}`)
//         .then((res) => {
//           console.log("All tree-sections", res.data);
//           setDocViewData(res.data.data);
//           setDocumentName(res.data.docName)
//         });




//     }
//   }

//   const onHide = (name) => {
//     dialogFuncMap[`${name}`](false);
//   }



//   // DOWNLOAD
//   const downloadFileAtURL = (rowData) => {
//     const url = `${process.env.REACT_APP_API_KEY}/document/downloadSec/${rowData.id}/${createdBy}`;
//     console.log(rowData, " file to be download");
//     const fileName = url.split("/").pop();
//     const aTag = document.createElement("a");
//     aTag.href = url;
//     aTag.setAttribute("download", fileName);
//     document.body.appendChild(aTag);
//     aTag.click();
//     aTag.remove();
//   };






//   //SEARCH SECTION
  

//   async function search(key) {
//     console.log("key:",key);
//     let outputText='';
//     let text;
//     const field=key.target.value;
//     if (field.includes('"')) {
//       outputText = field.replace(/\\/g, "").replace(/"/g, '');
//       console.log("output_text:", outputText);
//       text = `"${outputText}"`;
//     }
//     else{
//       outputText=field;
//       console.log("output_text: without phrase", outputText);
//       text = `${outputText}`;
//     }
    

//     setSuggestions([]);

    
    
//     if (key.keyCode===13  && key.target.value.length > 1) {

//       console.log("text to search: ",text);
//       let encoded = encodeURIComponent(text);
//       console.log(encoded, "????")
     
// const data={
//   value:encoded
// }
//       fetch(`${process.env.REACT_APP_API_KEY}/sample/getSectionHighlightedValue`, {
//         method: "POST",
//         headers: {
//           Accept: "application/json",
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(data),
//       }).then(
//         (result) => {
//           console.log(result,"result");
//           result.json().then((result) => {
//             console.warn("resp", result);

//             setData(result);
//           setSearchResults(result);
//           if(result.length>0){
//             setSuggestions([]);
    
//             setSearchExecuted(false);
//           }else{
//             setSearchExecuted(true);
//           }
    
//           setCustomers(result);
       
//           setLoading(false);
//           console.log(customer, "/////////////////////////////////////****");
    
//           });
          
//         })
     


   
//     }else{
//       console.log("press enter");
//       setSearchResults([])
//     }
//     //
//   }
  


//   async function searchOnClick(e,key) {
//     console.log(e,"key:",key);


//     // console.log("key:",key);
  
//     setSuggestions([]);

 

//     if (e.type==='click' && key.length> 1) {
//       let text = key;
//       console.log("text to search: ",text);
//       let encoded = encodeURIComponent(text);
//       console.log(encoded, "????")
     
// const data={
//   value:encoded
// }
//       fetch(`${process.env.REACT_APP_API_KEY}/sample/getSectionHighlightedValue`, {
//         method: "POST",
//         headers: {
//           Accept: "application/json",
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(data),
//       }).then(
//         (result) => {
//           console.log(result,"result");
//           result.json().then((result) => {
//             console.warn("resp", result);

//             setData(result);
//           setSearchResults(result);
//           if(result.length>0){
//             setSuggestions([]);
    
//             setSearchExecuted(false);
//           }else{
//             setSearchExecuted(true);
//           }
    
//           setCustomers(result);
       
//           setLoading(false);
//           console.log(customer, "/////////////////////////////////////****");
    
//           });
          
//         })
     


   
//     }else{
//       console.log("press enter");
//       setSearchResults([])
//     }
//     //
//   }


//   console.log(users, "??????ppppp")



//   const customBody = (rowData, column) => {
//     return <span dangerouslySetInnerHTML={{ __html: rowData[column.field] }} />;
//   };


//   const handleClearInput = () => {
//     setQuery('');
//     setSearchExecuted(false);
//   };




//   const secDownload = () => {
//     toast.current.show({
//       severity: "success",
//       summary: "Section Download Successfully",
//       detail: "Section Download",
//       life: 1000,
//     });
//   };



//   const actionbodyTemplate = (rowData) => {
//     console.log(rowData.id, "///docid");


//     setSecId(rowData.id);
//     // console.log(rowData.Docid,"///docid");



//     return (

//       < >
//         <div style={{ display: "flex" }}>

//           <Button
//             icon="pi pi-file"

//             className="p-button-raised  p-button-text"
//             // onMouseDown={() => onClickHeader(rowData)}

//             tooltip="View Section"
//             tooltipOptions={{ className: "teal-tooltip", position: "bottom" }}
//             onClick={() => onClick('displayBasic', rowData)}
//             style={{
//               backgroundColor: "white",
//               height: "30px",
//               width: "30px",
//               color: "#203570",
//               marginRight: "10%"
//             }}
//           />





//           <Button
//             style={{
//               backgroundColor: "white",
//               height: "30px",
//               width: "30px",
//               color: "#203570",
//             }}
//             icon="pi pi-download"

//             onClick={() => {
//               downloadFileAtURL(rowData);
//             }}
//             // onMouseDown={secDownload}
//             tooltip="Download "
//             tooltipOptions={{ className: "teal-tooltip", position: "bottom" }}
//             className="p-button-raised  p-button-text"

//           />
//         </div>
//       </>
//     );
//   };

//   const header = () => {
//     return (<> {documentName}</>)

//   }

//   return (

//     <div >


//       <Button
//         style={{ backgroundColor: "white", color: "black", height: "35px" }}
//         className="p-button-raised  p-button p-button-secondary p-button-text"
//       >
//         <img
//           style={{ width: "15px", marginRight: "10px", height: "17px" }}
//           src={Search}
//           alt=" Search "
//         />
//         <b> Search Document</b>
//       </Button>
//       <img
//         style={{ height: "53px", float: "right" }}
//         src={Background}
//         alt=" Background "
//       />

//       <br />
//       <br />



//       <Card style={{ height: "87vh" }}>
//         <Toast ref={toast} />
//         <div className="autocomplete">

//           <div className="card-container">
         
//             <span
//               className="p-input-icon-left"
//                style={{ marginLeft: "23%", width: "57%" }}
//               // className="inputfound"
//   >    <div className={`input-container ${isInputActive ? 'Active' : ''}`}>


//                 <div class="layout-sidebar-filter-content p-input-icon-left p-fluid p-input-icon-right">
//                   <i class="pi pi-search"></i>

//                   <InputText
                  
//                     style={{ borderRadius: "2px",width:"660px"}}
//                     type="text"
//                     value={query}
//                     placeholder='Search...'
//                     onChange={handleInputChange}
//                     onKeyDown={(e) => search(e)}
//                     class="p-inputtext  p-component p-filled" 
                   
//                     />


//                   <i class="clear-icon pi pi-times"
//                     onClick={handleClearInput}
//                   ></i>

//                 </div>





//               </div>
//             </span>



//             {displayedSuggestions.length > 0 && (
//               <ul className="suggestions">
//                 {displayedSuggestions.map((item) => (
//                   <li
//                     key={item}
//                     className="suggestion"
//                     onClick={() => handleSuggestionClick(item)}
//                   >
//                    <span onClick={(e)=>searchOnClick(e,query)}> {item}</span>
//                   </li>
//                 ))}
//               </ul>
//             )}




//           </div>
//         </div>

//         {/* {searchResults.length === 0 && (
//         <p style={{display:"flex", alignItems: "center",justifyContent:"center"}}>No results found.</p>
//       )} */}

//         {searchExecuted && searchResults.length === 0 && (
//           <b className='notfound'>No results found.</b>
//         )}
//         <br />

//         {data.length > 0 ? (
//           // <Card>





//           <div>
//             {/* <b style={{ color: "black" }}>You may also be interested in........</b>
//             <br /> */}
//             {/* 
// {usersSuggestions.map((item) => (
//         <Tag style={{ backgroundColor: "#D2D7E2",color:"#2D2D2D"}} className="mr-2" > {item.Suggestion}</Tag>
//         ))} */}




//             {/* {usersSuggestions.length > 0 && (
//               <>
//                 {usersSuggestions.map((item) => (


//                   <Tag style={{ backgroundColor: "#D2D7E2", color: "#2D2D2D" }} className="mr-2" >

//                     <div dangerouslySetInnerHTML={{ __html: item }}></div>
//                   </Tag>

//                 ))}
//               </>
//             )}

//             <br /> */}

//             <Dialog header={header}
//               visible={displayBasic} style={{ width: '80vw' }} onHide={() => onHide('displayBasic')}>
//               {/* <>{uploadedDate}</> */}



//               <span className="tocview" dangerouslySetInnerHTML={{ __html: docView }} />
//               {/* <p dangerouslySetInnerHTML={{ __html: docView }}> </p> */}

//               {/* <>{docView}</> */}
//             </Dialog>

//             {/* <br />
//            */}


//             <DataTable
//               value={data}
//               paginator
//               rowHover
//               loading={loading}
//               stripedRows
//               scrollable
//               scrollHeight="66.5vh"

//               paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
//               currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
//               rows={6}
//               p-datatable-wrapper
//               emptyMessage="No documents found."
//             // rowsPerPageOptions={[10, 20, 50]}
//             >
//               <Column field="name"
//                 style={{
//                   maxWidth: "210px",
//                   minWidth: "8rem",
//                   textOverflow: "ellipsis",
//                   overflow: "hidden",
//                   whiteSpace: "nowrap",
//                 }}
//                 header="Section Name" />

//               <Column
//                 field="content"
//                 body={customBody}
//                 header="Description"
//               />


//               <Column header="Action" body={actionbodyTemplate} />


//             </DataTable>

//             {/* ) : (
//         <div>No documents found after the search.</div>
//       )} */}
//           </div>





//         ) : (

//           <>
//             {/* <p>No result Found</p> */}
//           </>




//         )}








//       </Card>

//     </div>


//   );
// };

// export default DocumentSearch;





import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import Search from "../Assets/Search.png";
// import Reactangle from "../Assets/Rectangle.png";
// import Group from "../Assets/Group.png";
import Background from "../Assets/Background.png";
import { Card } from "primereact/card";
import { Dialog } from 'primereact/dialog';
import axios from "axios";
// import { ScrollPanel } from "primereact/scrollpanel";
// import { Tag } from 'primereact/tag';






const DocumentSearch = () => {
  const [data, setData] = useState([]);
  const [secId, setSecId] = useState([]);
  const [customer, setCustomers] = useState([]);
  const [docView, setDocViewData] = useState();

  const [documentName, setDocumentName] = useState([]);
  
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const toast = useRef(null);
  const [suggestions, setSuggestions] = useState([]);
  const [displayBasic, setDisplayBasic] = useState(false);
  const [isInputActive, setInputActive] = useState(false);
  const [users, setUsers] = useState([]);
  const [createdBy, setLoginUser] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  const [searchExecuted, setSearchExecuted] = useState(false);



  useEffect(() => {

    setLoginUser(sessionStorage.getItem('userName'));

  }, []);




  const handleInputChange = async (event) => {
    const value = event.target.value;
    setQuery(value);

    setInputActive(value !== '');
    // setSearchExecuted(true);


    axios
      .get(`${process.env.REACT_APP_API_KEY}/sample/getSuggestions/${value}`)
      .then((res) => {
        console.log("All keyword data", res.data);
        setUsers(res.data)
        setSuggestions(res.data);


      });


    try {
      const response = await axios.get(`${process.env.REACT_APP_API_KEY}/sample/getStringSuggestion/${value}`); // Replace with the actual URL or path to your JSON data
      const data = response.data;
      // setSuggestions(data);
      setUsers(data)

      // console.log(data.Suggestion,"/?????????")
    } catch (error) {
      console.error('Error fetching JSON data:', error);
    }
  };

  const handleSuggestionClick = (value) => {
    setQuery(value);
    setSuggestions([]);

  };

  const filteredSuggestions = suggestions.filter((item) =>
    item.toLowerCase().includes(query.toLowerCase())
  );

  const displayedSuggestions = filteredSuggestions.slice(-4); // Limit the displayed suggestions to 2 keywords

  // const usersSuggestions = users.slice(-5);

  const dialogFuncMap = {
    'displayBasic': setDisplayBasic,


  }

  const onClick = (name, position) => {
    setSecId(position.secId);
    console.log(position.secId, "/////www")



    dialogFuncMap[`${name}`](true);

    if (position) {


      console.log(position)



      axios
        .get(`${process.env.REACT_APP_API_KEY}/document/getHtmlContains/${position.id}`)
        .then((res) => {
          console.log("All tree-sections", res.data);
          setDocViewData(res.data.data);
          setDocumentName(res.data.docName)
        });




    }
  }

  const onHide = (name) => {
    dialogFuncMap[`${name}`](false);
  }



  // DOWNLOAD
  const downloadFileAtURL = (rowData) => {
    const url = `${process.env.REACT_APP_API_KEY}/document/downloadSec/${rowData.id}/${createdBy}`;
    console.log(rowData, " file to be download");
    const fileName = url.split("/").pop();
    const aTag = document.createElement("a");
    aTag.href = url;
    aTag.setAttribute("download", fileName);
    document.body.appendChild(aTag);
    aTag.click();
    aTag.remove();
  };






  //SEARCH SECTION
  

  async function search(key) {
    // console.log( key.target.value,"????")
    // console.log("key:",key);
    // let outputText='';
    // let text;
    // const field=key.target.value;
    // if (field.includes('"')) {
    //   outputText = field.replace(/\\/g, "").replace(/"/g, '');
    //   console.log("output_text:", outputText);
    //   text = `${outputText}`;
    // }
    // else{
    //   outputText=field;
    //   console.log("output_text: without phrase", outputText);
    //   text = `${outputText}`;
    // }
    

    setSuggestions([]);

    
    
    if (key.keyCode===13  && key.target.value.length > 1) {
      let text = key.target.value;
      // console.log("text to search: ",text);
      const encoded = encodeURIComponent(text);
      // console.log(encoded, "????")
     
     
const data={
  value:encoded
}
      fetch(`${process.env.REACT_APP_API_KEY}/sample/getSectionHighlightedValue`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then(
        (result) => {
          console.log(result,"result");
          result.json().then((result) => {
            console.warn("resp", result);

            setData(result);
          setSearchResults(result);
          if(result.length>0){
            setSuggestions([]);
    
            setSearchExecuted(false);
          }else{
            setSearchExecuted(true);
          }
    
          setCustomers(result);
       
          setLoading(false);
          console.log(customer, "/////////////////////////////////////****");
    
          });
          
        })
     


   
    }else{
      console.log("press enter");
      setSearchResults([])
    }
    //
  }



  async function searchOnClick(e,key) {
    console.log(e,"key:",key);


    // console.log("key:",key);
  
    setSuggestions([]);

 

    if (e.type==='click' && key.length> 1) {
      console.log(key,"????????")
      let text = key.target.value;
      console.log("text to search: ",text);
      let encoded = encodeURIComponent(text);
      console.log(encoded, "????")
     
const data={
  value:encoded
}
      fetch(`${process.env.REACT_APP_API_KEY}/sample/getSectionHighlightedValue`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then(
        (result) => {
          console.log(result,"result");
          result.json().then((result) => {
            console.warn("resp", result);

            setData(result);
          setSearchResults(result);
          if(result.length>0){
            setSuggestions([]);
    
            setSearchExecuted(false);
          }else{
            setSearchExecuted(true);
          }
    
          setCustomers(result);
       
          setLoading(false);
          console.log(customer, "/////////////////////////////////////****");
    
          });
          
        })
     


   
    }else{
      console.log("press enter");
      setSearchResults([])
    }
    //
  }


  console.log(users, "??????ppppp")



  const customBody = (rowData, column) => {
    return <span dangerouslySetInnerHTML={{ __html: rowData[column.field] }} />;
  };


  const handleClearInput = () => {
    setQuery('');
    setSearchExecuted(false);
  };




  const secDownload = () => {
    toast.current.show({
      severity: "success",
      summary: "Section Download Successfully",
      detail: "Section Download",
      life: 1000,
    });
  };



  const actionbodyTemplate = (rowData) => {
    console.log(rowData.id, "///docid");


    setSecId(rowData.id);
    // console.log(rowData.Docid,"///docid");



    return (

      < >
        <div style={{ display: "flex" }}>

          <Button
            icon="pi pi-file"

            className="p-button-raised  p-button-text"
            // onMouseDown={() => onClickHeader(rowData)}

            tooltip="View Section"
            tooltipOptions={{ className: "teal-tooltip", position: "bottom" }}
            onClick={() => onClick('displayBasic', rowData)}
            style={{
              backgroundColor: "white",
              height: "30px",
              width: "30px",
              color: "#203570",
              marginRight: "10%"
            }}
          />





          <Button
            style={{
              backgroundColor: "white",
              height: "30px",
              width: "30px",
              color: "#203570",
            }}
            icon="pi pi-download"

            onClick={() => {
              downloadFileAtURL(rowData);
            }}
            // onMouseDown={secDownload}
            tooltip="Download "
            tooltipOptions={{ className: "teal-tooltip", position: "bottom" }}
            className="p-button-raised  p-button-text"

          />
        </div>
      </>
    );
  };

  const header = () => {
    return (<> {documentName}</>)

  }

  return (

    <div >


      <Button
        style={{ backgroundColor: "white", color: "black", height: "35px" }}
        className="p-button-raised  p-button p-button-secondary p-button-text"
      >
        <img
          style={{ width: "15px", marginRight: "10px", height: "17px" }}
          src={Search}
          alt=" Search "
        />
        <b> Search Document</b>
      </Button>
      <img
        style={{ height: "53px", float: "right" }}
        src={Background}
        alt=" Background "
      />

      <br />
      <br />



      <Card style={{ height: "87vh" }}>
        <Toast ref={toast} />
        <div className="autocomplete">

          <div className="card-container">
         
            <span
              className="p-input-icon-left"
               style={{ marginLeft: "23%", width: "57%" }}
              // className="inputfound"
  >    <div className={`input-container ${isInputActive ? 'Active' : ''}`}>


                <div class="layout-sidebar-filter-content p-input-icon-left p-fluid p-input-icon-right">
                  <i class="pi pi-search"></i>

                  <InputText
                  
                    style={{ borderRadius: "2px",width:"660px"}}
                    type="text"
                    value={query}
                    placeholder='Search...'
                    onChange={handleInputChange}
                    onKeyDown={(e) => search(e)}
                    class="p-inputtext  p-component p-filled" 
                   
                    />


                  <i class="clear-icon pi pi-times"
                    onClick={handleClearInput}
                  ></i>

                </div>





              </div>
            </span>



            {displayedSuggestions.length > 0 && (
              <ul className="suggestions">
                {displayedSuggestions.map((item) => (
                  <li
                    key={item}
                    className="suggestion"
                    onClick={() => handleSuggestionClick(item)}
                  >
                   <span onClick={(e)=>searchOnClick(e,query)}> {item}</span>
                  </li>
                ))}
              </ul>
            )}




          </div>
        </div>

   
        {searchExecuted && searchResults.length === 0 && (
          <b className='notfound'>No results found.</b>
        )}
        <br />

        {data.length > 0 ? (
     




          <div>
            

            <Dialog header={header}
              visible={displayBasic} style={{ width: '80vw' }} onHide={() => onHide('displayBasic')}>
           
              <span style={{whiteSpace:'pre-line'}} className="tocview"  dangerouslySetInnerHTML={{ __html: docView }} />
             
            </Dialog>


            <DataTable
              value={data}
              paginator
              rowHover
              loading={loading}
              stripedRows
              scrollable
              scrollHeight="66.5vh"

              paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
              currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
              rows={6}
              p-datatable-wrapper
              emptyMessage="No documents found."
            // rowsPerPageOptions={[10, 20, 50]}
            >
              <Column field="name"
                style={{
                  maxWidth: "210px",
                  minWidth: "8rem",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                }}
                header="Section Name" />

              <Column
                field="content"
                body={customBody}
                header="Description"
              />


              <Column header="Action" body={actionbodyTemplate} />


            </DataTable>

            {/* ) : (
        <div>No documents found after the search.</div>
      )} */}
          </div>





        ) : (

          <>
            {/* <p>No result Found</p> */}
          </>




        )}








      </Card>

    </div>


  );
};

export default DocumentSearch;





