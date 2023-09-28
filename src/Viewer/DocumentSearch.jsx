// import React, { useEffect, useState } from "react";
// import { InputText } from "primereact/inputtext";
// import { Card } from "primereact/card";
// import { ScrollPanel } from "primereact/scrollpanel";
// import { Button } from "primereact/button";

// function SearchProduct() {
//   const [data, setData] = useState([]);
//   const [customer, setCustomers] = useState([]);
//   const [first, setFirst] = useState(0);
//   const [rows, setRows] = useState(0);
//   let [id, setdocumentId] = useState("");

//   const downloadFileAtURL = (e) => {
// // console.log(e);
//     let url=`${process.env.REACT_APP_API_KEY}/document/downloadFile/${e.id  }`;
//     const fileName = url.split("/").pop();
//     const aTag = document.createElement("a");
//     aTag.href = url;
//     aTag.setAttribute("download", fileName);
//     document.body.appendChild(aTag);
//     aTag.click();
//     aTag.remove();
//   };

//   const [query] = useState();
//   const onPageChange = (e) => {
//     setFirst(e.first);
//     setRows(e.rows);
//   };

//   async function search(key) {
//     if (key.length > 1) {
//       let text = key;
//       let encoded = window.btoa(text);
//       let result = await fetch(
//         `${process.env.REACT_APP_API_KEY}/sample/getHighlightedValue/` + encoded
//       );
//       result = await result.json();
//       console.warn("Tasdiq", result);
//       setData(result);
//       setCustomers(result);
//       // setdocumentId(result.id);
//       // alert(id)
//     }
//   }

//   return (
//     <div>
//       <Card >
//         <span style={{ marginLeft: "20%" }} className="p-input-icon-left">
//           <i className="pi pi-search" />

//           <InputText
//             type="text"
//             style={{ width: "300%" }}
//             value={query}
//             onKeyDown={(e) => search(e.target.value)}
//             //onChange
//             className="p-inputtext-sm form-control"
//             placeholder="Search"
//           />
//         </span>
//         <br />
//         <br />

//         <ScrollPanel style={{ width: "100%", height: "350px" }}>
//           {data.length > 0 ? (
//             <div value={customer}>
//               {customer.map((data) => (
//                 <div key={data.id}>
//                   <br />
//                   <Card >
//                     <h4>{data.filename}</h4>

//                     <Button
//                       style={{
//                         backgroundColor: "white",
//                         height: "30px",
//                         width: "30px",
//                         color: "#203570",
//                         float: "right",
//                       }}
//                       icon="pi pi-download"
//                       onClick={() => {
//                         downloadFileAtURL(data);
//                       }}
//                       tooltip="Download "
//                       tooltipOptions={{
//                         className: "teal-tooltip",
//                         position: "bottom",
//                       }}
//                       className="p-button-raised  p-button-text"
//                     />

//                     <br />
//                     <br />

//                     <p dangerouslySetInnerHTML={{ __html: data.content }}></p>

//                     <label style={{ float: "right" }}>
//                       <b>Last Edited By:</b>
//                       {data.edit}{" "}
//                     </label>
//                   </Card>
//                 </div>
//               ))}
//             </div>
//           ) : null}
//         </ScrollPanel>
//       </Card>
//     </div>
//   );
// }
// export default SearchProduct;

// import React, { useState, useRef } from "react";
// import { DataTable } from "primereact/datatable";
// import { Column } from "primereact/column";

// import { InputText } from "primereact/inputtext";
// import { Button } from "primereact/button";
// import { Toast } from "primereact/toast";

// import {  useNavigate } from "react-router-dom";
// import { CustomerService } from "../service/CustomerService";

// const DocumentSearch = () => {
//   const [data, setData] = useState([]);
//   const [customer, setCustomers] = useState([]);
//   const [query] = useState();
//   const [loading, setLoading] = useState(false);
//   const toast = useRef(null);
//   const navigate = useNavigate();
//   const customerService = new CustomerService();

//   // function Download()
//   const downloadFileAtURL = (rowData) => {
//     const url = `${process.env.REACT_APP_API_KEY}/document/downloadFile/${rowData.id}`;

//     console.log(rowData, " file to be download");
//     const fileName = url.split("/").pop();
  
//     const aTag = document.createElement("a");
//     aTag.href = url;
//     aTag.setAttribute("download", fileName);
//     document.body.appendChild(aTag);
//     aTag.click();
//     aTag.remove();
//   };
//   const docDownload = () => {
//     // toast.current.show({
//     //   severity: "success",
//     //   summary: "Document Download Successfully",
//     //   detail: "Document Download",
//     //   life: 3000,
//     // });
//   };

//   async function search(key) {
//     if (key.length > 1) {
//       let text = key;
//       let encoded = window.btoa(text);
//       let result = await fetch(
//         `${process.env.REACT_APP_API_KEY}/sample/getHighlightedValue/` + encoded
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

//   const actionbodyTemplate = (rowData) => {
//     console.log(rowData, ".////////////////////shivani");
//     // setId(rowData.id);
//     return (
//       <React.Fragment>
//         <Button
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
//             downloadFileAtURL(rowData);
//           }}
//           tooltip="Download "
//           tooltipOptions={{ className: "teal-tooltip", position: "bottom" }}
//           className="p-button-raised  p-button-text"
//           onMouseDown={docDownload}
//         />
//       </React.Fragment>
//     );
//   };

//   const editProduct = (product) => {
//     customerService.docDataById = product;
//     console.log(customerService.docDataById, "./././././././");
//     navigate("/userversion/" + product.id);

//     console.log(product, " document data by id.....");
//   };

//   return (
//     <div style={{ height: "450px" }}>
//       <Toast ref={toast} />
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
//           // <Card>

//           <DataTable
//             value={data}
//             paginator
//             scrollable scrollHeight="300px"
//             responsiveLayout="scroll"
//             paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
//             currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
//             rows={4}
//             p-datatable-wrapper
//             rowsPerPageOptions={[10, 20, 50]}
//           >
//             <Column field="filename" header="Document Name" />

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

//             <Column field="edit" header="Last Updated" />
//             <Column header="Action" body={actionbodyTemplate} />
//           </DataTable>
//         ) : // </Card>

//         null}
//       {/* </Card> */}
//     </div>
//   );
// };

// export default DocumentSearch;


