// import React, { useState, useEffect } from "react";
// import { FilterMatchMode, FilterOperator } from "primereact/api";
// import { DataTable } from "primereact/datatable";
// import { Column } from "primereact/column";
// import { InputText } from "primereact/inputtext";
// import { Dropdown } from "primereact/dropdown";

// import { Calendar } from "primereact/calendar";

// import axios from "axios";
// import "../App.css";

// const Product = () => {
//   const [selectedCustomers, setSelectedCustomers] = useState(null);

//   const [posts, setPosts] = useState([]);

//   const [filters, setFilters] = useState({
//     global: { value: null, matchMode: FilterMatchMode.CONTAINS },
//     documentname: {
//       operator: FilterOperator.AND,
//       constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
//     },

//     description: {
//       operator: FilterOperator.AND,
//       constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
//     },

//     reviewer: {
//       operator: FilterOperator.AND,
//       constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
//     },
//     representative: { value: null, matchMode: FilterMatchMode.IN },
//     date: {
//       operator: FilterOperator.AND,
//       constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }],
//     },
//     balance: {
//       operator: FilterOperator.AND,
//       constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
//     },

//     status: {
//       operator: FilterOperator.OR,
//       constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
//     },
//     activity: { value: null, matchMode: FilterMatchMode.BETWEEN },
//   });
//   const [globalFilterValue, setGlobalFilterValue] = useState("");

//   const statuses = [
//     "Updated",
//     "Review Pending",
//     "Issue Marked",
//     "Saved as Draft",
//   ];

//   useEffect(() => {
//     axios
//       .get(`${process.env.REACT_APP_API_KEY}/sample/getAllEnableDoc`)
//       .then((res) => {
//         console.log(res, "///////////////////////////shivani");
//         setPosts(res.data);
//       });
//     console.log(posts, "./././././.shivania");
//   }, []);

//   const onGlobalFilterChange = (e) => {
//     const value = e.target.value;
//     let _filters = { ...filters };
//     _filters["global"].value = value;

//     setFilters(_filters);
//     setGlobalFilterValue(value);
//   };

// //   const renderHeader = () => {
// //     return (
// //       <div className="flex justify-content-between align-items-center">
// //         <span className="p-input-icon-left">
// //           <i className="pi pi-search" />
// //           <InputText
// //             value={globalFilterValue}
// //             onChange={onGlobalFilterChange}
// //             placeholder="Search"
// //             className="p-inputtext-sm"
// //           />
// //         </span>
// //       </div>
// //     );
// //   };

//   const countryBodyTemplate = (rowData) => {
//     return (
//       <React.Fragment>
//         <span>{rowData.description}</span>
//       </React.Fragment>
//     );
//   };

//   const countryTemplate = (rowData) => {
//     return (
//       <React.Fragment>
//         <span>{rowData.reviewer}</span>
//       </React.Fragment>
//     );
//   };

//   const dateBodyTemplate = (rowData) => {
//     let currentTimestamp = Date.now();
//     console.log(currentTimestamp); // get current timestamp
//     let date = new Intl.DateTimeFormat("en-US", {
//       year: "numeric",
//       month: "2-digit",
//       day: "2-digit",
      
//     }).format(currentTimestamp);
//     console.log(date, "'dsjcfsdjkshivani");
//     return date;
//   };

//   const dateFilterTemplate = (options) => {
//     return (
//       <Calendar
//         value={options.value}
//         onChange={(e) => options.filterCallback(e.value, options.index)}
//         dateFormat="mm/dd/yy"
//         placeholder="mm/dd/yyyy"
//         mask="99/99/9999"
//       />
//     );
//   };

//   const statusBodyTemplate = (rowData) => {
//     return (
//       <span className={`customer-badge status-${rowData.status}`}>
//         {rowData.status}
//       </span>
//     );
//   };

//   const statusFilterTemplate = (options) => {
//     return (
//       <Dropdown
//         value={options.value}
//         options={statuses}
//         onChange={(e) => options.filterCallback(e.value, options.index)}
//         itemTemplate={statusItemTemplate}
//         placeholder="Select a Status"
//         className="p-column-filter"
//         showClear
//       />
//     );
//   };

//   const statusItemTemplate = (option) => {
//     return <span className={`customer-badge status-${option}`}>{option}</span>;
//   };

// //   const header = renderHeader();

//   return (
//     <div className="datatable-doc-demo">
//     <br/>
//       <div className="card">
//         <DataTable
//           value={posts}
//           paginator
//           className="p-datatable-customers"
//         //   header={header}
//           rows={10}
//           paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
//         //   rowsPerPageOptions={[10, 25, 50]}
//           dataKey="id"
//           rowHover
//           size="small"
//           selection={selectedCustomers}
//           onSelectionChange={(e) => setSelectedCustomers(e.value)}
//           filters={filters}
//           filterDisplay="menu"
//           responsiveLayout="scroll"
//           globalFilterFields={[
//             "documentname",
//             "description",
//             "reviewer",
//             "balance",
//             "status",
//           ]}
//           emptyMessage="No documents found."
//         //   currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
//         >
//           <Column
//             field="documentname"
//             header="Document Name"
//             sortable
//             filter
//             filterPlaceholder="Search by name"
//             style={{ minWidth: "10rem" }}
//           />

//           {/* <Column
//             field="docData"
//             header="Description"
//             sortable
//             filterField="description"
//             style={{
//               maxWidth: "200px",
//               minWidth: "70px",
//               textOverflow: "ellipsis",
//               overflow: "hidden",
//               whiteSpace: "nowrap",
//             }}
//             body={countryBodyTemplate}
//             filter
//             filterPlaceholder="Search by description"
//           /> */}
        
//           <Column
//             field="reviewer"
//             header="Reviewer"
//             sortable
//             filterField="reviewer"
//             style={{ minWidth: "10rem" }}
//             body={countryTemplate}
//             filter
//             filterPlaceholder="Search by Reviewer"
//           />

//           {/* <Column
//             field="S tatus"
//             header="Status"
//             sortable
//             filterMenuStyle={{ width: "14rem" }}
//             style={{ minWidth: "10rem" }}
//             body={statusBodyTemplate}
//             filter
//             filterElement={statusFilterTemplate}
//           /> */}

//           <Column
//             field="timestamp"
//             header="Sent On"
//             sortable
//             currentTimestamp
//             filterField="date"
//             dataType="date"
//             body={dateBodyTemplate}
//             style={{ minWidth: "8rem" }}
//             filter
//             filterElement={dateFilterTemplate}
//           />
//         </DataTable>
//       </div>
//     </div>
//   );
// };

// export default Product;



function Notification(){
  return(
    <>
    <p>Notification page</p>
    </>
  )
}

export default Notification;