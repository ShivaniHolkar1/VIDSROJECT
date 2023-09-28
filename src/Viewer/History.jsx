import React, { useState, useEffect } from "react";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { CustomerService } from "../service/CustomerService";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import "../App.css";

export default function AuditHistory ()  {

  const [selectedCustomers, setSelectedCustomers] = useState(null);
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    userName: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },

    description: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },

    reviewer: {
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


  const statuses = [
    "Updated",
    "Review Pending",
    "Issue Marked",
    "Saved as Draft",
  ];

  const customerService = new CustomerService();




  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_KEY}/AuditHistory/list`)
      .then((res) => {
        console.log(res);
        setPosts(res.data);
      });
    console.log(posts, "./././././.aaaaaaaaabbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb");
  }, []);

  const getCustomers = (data) => {
    console.log(data, "/././././");
    return [...(data || [])].map((d) => {
      d.date = new Date(d.date);
      return d;
    });
  };

  

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };
    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const renderHeader = () => {
    return (
      <div className="flex justify-content-between align-items-center">
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            value={globalFilterValue}
            onChange={onGlobalFilterChange}
            placeholder="Search"
            className="p-inputtext-sm"
          />
        </span>
     
      </div>
    );
  };

  const countryBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span>{rowData.description}</span>
      </React.Fragment>
    );
  };

  const countryTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span>{rowData.reviewer}</span>
      </React.Fragment>
    );
  };



  const dateBodyTemplate = (rowData) => {
    let currentTimestamp = Date.now();
    // console.log(currentTimestamp); // get current timestamp
    let date = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit" ,
      hour: "2-digit",
      minute: "2-digit",
     
    }).format(currentTimestamp);
    // console.log(date, "'dsjcfsdjkshivani");
    return date;
    // let timestamp
    // const date = new Date(timestamp)
    // // const date6 = moment().subtract(10, 'days').calendar(); // 02/04/2023
    // const formatDate = moment(date).format("DD/MM/YYYY")
    // return(
    //   <div>{formatDate}</div>
    // )
  };

  const dateFilterTemplate = (options) => {
    return (
      <Calendar
        value={options.value}
        onChange={(e) => options.filterCallback(e.value, options.index)}
        dateFormat="mm/dd/yy"
        placeholder="mm/dd/yyyy"
        mask="99/99/9999"
      />
      
    );
  };

  const statusBodyTemplate = (rowData) => {
    return (
      <span className={`customer-badge status-${rowData.status}`}>
        {rowData.status}
      </span>
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

  const statusItemTemplate = (option) => {
    return <span className={`customer-badge status-${option}`}>{option}</span>;
  };

  const header = renderHeader();

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button
          style={{ backgroundColor: "#203570", height: 30, width: 30 }}
          icon="pi pi-file"
          className="p-button-rounded p-button-sm mr-2"
          onClick={() => editProduct(rowData)}
        />
        {/* <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => confirmDeleteProduct(rowData)} /> */}
      </React.Fragment>
    );
  };

  const editProduct = (product) => {
    customerService.docDataById = product;
    console.log(customerService.docDataById, "./././././././");
    navigate("/Version/" + product.id);

    console.log(product, " document data by id.....");
  };

  return (
    // <Card>


    <div className="datatable-doc-demo">
       <Button
        icon=" pi pi-history"
       style={{ backgroundColor: "white" }}
        label="Audit History"
        
        className="p-button-raised p-button-secondary p-button-text p-button-sm"
      />
      <br />
      <br />
      <div className="card">
        <DataTable
          value={posts}
          paginator
          className="p-datatable-customers"
          header={header}
          rows={10}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          rowsPerPageOptions={[10, 25, 50]}
          dataKey="id"
          rowHover
          size="small"
          selection={selectedCustomers}
          onSelectionChange={(e) => setSelectedCustomers(e.value)}
          filters={filters}
          filterDisplay="menu"
          responsiveLayout="scroll"
          globalFilterFields={[
            "userName",
            "description",
            "reviewer",
            "balance",
            "status",
          ]}
          emptyMessage="No documents found."
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
        >
          <Column
            field="userName"
            header="UserName"
            sortable
            filter
            filterPlaceholder="Search by name"
            style={{ minWidth: "10rem" }}
          />

          <Column
            field="description"
            header="Description"
            sortable
            filterField="description"
            style={{ minWidth: "10rem" }}
            body={countryBodyTemplate}
            filter
            filterPlaceholder="Search by description"
          />
          {/* <Column field="reviewer" sortable header="Reviewer"></Column> */}
          {/* <Column
            field="activity"
            header="Activity"
            sortable
            filterField="reviewer"
            style={{ minWidth: "10rem" }}
            body={countryTemplate}
            filter
            filterPlaceholder="Search by Reviewer"
          /> */}

          {/* <Column
            field="status"
            header="Status"
            sortable
            filterMenuStyle={{ width: "14rem" }}
            style={{ minWidth: "10rem" }}
            body={statusBodyTemplate}
            filter
            filterElement={statusFilterTemplate}
          /> */}

          <Column
            field="createdOn"
            header="createdOn"
            sortable
            currentTimestamp
            filterField="date"
            dataType="date"
            body={dateBodyTemplate}
            style={{ minWidth: "8rem" }}
            filter
            filterElement={dateFilterTemplate}
          />
{/* 
          <Column
            header="View Document"
            body={(e) => actionBodyTemplate(e)}
            exportable={false}
            // style={{ minWidth: "rem" }}
          ></Column> */}
        </DataTable>
        

      </div>
    </div>
    // </Card>
  );
};







// import { FilterMatchMode, FilterOperator } from "primereact/api";
// import { DataTable } from "primereact/datatable";
// import { Column } from "primereact/column";
// import { InputText } from "primereact/inputtext";
// import React, { useState, useEffect, useRef } from "react";
// import { Button } from "primereact/button";
// import { Calendar } from "primereact/calendar";
// import axios from "axios";
// import Background from "../Assets/Background.png";
// import refresh from "../Assets/refresh.png";
// import "../App.css";
// import * as FileSaver from 'file-saver';
// import * as XLSX from 'xlsx';





// export default function AuditHistory() {
//   const [selectedCustomers, setSelectedCustomers] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [posts, setPosts] = useState([]);
//   const dt = useRef(null);
//   const [startIndex, setStartIndex] = useState(0);
// const [endIndex, setEndIndex] = useState(15);
//   const [filters, setFilters] = useState({
//     global: { value: null, matchMode: FilterMatchMode.CONTAINS },
//     userName: {
//       operator: FilterOperator.AND,
//       constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
//     },
//     activity: {
//       operator: FilterOperator.AND,
//       constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
//     },

//     userName_description: {
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
//     // activity: { value: null, matchMode: FilterMatchMode.BETWEEN },
//   });
//   const [globalFilterValue, setGlobalFilterValue] = useState("");

//   const cols = [
//     { field: "activity", header: "Activity" },
//     // { field: "userName", header: "UserName" },
//     { field: "userName_description", header: "UserName_Description" },
//     {  field:"createOn" ,header: "CreatedOn" },
    
//   ];




//   const exportColumns = cols.map((col) => ({
//     title: col.header,
//     dataKey: col.field,
    
//   }));

//   useEffect(() => {
//     axios
//       .get(`${process.env.REACT_APP_API_KEY}/AuditHistory/list`)
//       .then((res) => {
//         // console.log(res);
//         setPosts(res.data);
//         setLoading(false);
//       });
//     // console.log(posts, "./././././.aaaaaaaaabbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb");
//   }, []);

//   const exportCSV = (selectionOnly) => {
//     dt.current.exportCSV({ selectionOnly });
//   };


  

//   const exportPdf = () => {
//     const data= posts.slice(startIndex, endIndex + 1);
//     import("jspdf").then((jsPDF) => {

//       import("jspdf-autotable").then(() => {
//         const doc = new jsPDF.default(0, 0);
//         // doc.autoTable(exportColumns, posts);
//         // doc.save("AuditHistory.pdf");
//         doc.autoTable(exportColumns, data);
//         doc.save('datatable.pdf');
//       });
//     });
//   };

//   const exportExcel = () => {
   
//     import("xlsx").then((xlsx) => {
//       const worksheet = xlsx.utils.json_to_sheet(posts);
//       const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
//       const excelBuffer = xlsx.write(workbook, {
//         bookType: "xlsx",
//         type: "array",
//       });
//       saveAsExcelFile(excelBuffer, "Audit");
//     });
//   };

//   const saveAsExcelFile = (buffer, fileName) => {
//     import("file-saver").then((module) => {
//       if (module && module.default) {
//         let EXCEL_TYPE =
//           "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
//         let EXCEL_EXTENSION = ".xlsx";
//         const data = new Blob([buffer], {
//           type: EXCEL_TYPE,
//         });

//         module.default.saveAs(
//           data,
//           fileName + "export" + new Date().getTime() + EXCEL_EXTENSION
//         );
//       }
//     });
//   };

//   const onGlobalFilterChange = (e) => {
//     const value = e.target.value;
//     let _filters = { ...filters };
//     _filters["global"].value = value;

//     setFilters(_filters);
//     setGlobalFilterValue(value);
//   };

//   const renderHeader = () => {
  
//     return (
//       <div className="flex justify-content-between align-items-center">
//         <span className="p-input-icon-left">
//           <i className="pi pi-search" />
//           <InputText
//             value={globalFilterValue}
//             onChange={onGlobalFilterChange}
//             placeholder="Search"
//             className="p-inputtext-sm"
//           />
//         </span>

//         <div>
//         <Button
//             style={{ height: "30px", width: "30px" }}
//             type="button"
//             icon="pi pi-file"
//             onClick={() => exportCSV(false)}
//             className="mr-2"
//             data-pr-tooltip="CSV"
//             tooltip="Enter your username"
//             tooltipOptions={{ position: "bottom" }}
//           /> 
//           <Button
//             style={{ height: "30px", width: "30px" }}
//             type="button"
//             icon="pi pi-file-excel"
//             onClick={exportExcel}
//             className="p-button-success mr-2"
//             data-pr-tooltip="XLS"
//             tooltip="Enter your username"
//             tooltipOptions={{ position: "bottom" }}
//           />
//           <Button
//             style={{ height: "30px", width: "30px" }}
//             type="button"
//             icon="pi pi-file-pdf"
//             onClick={exportPdf}
//             className="p-button-warning mr-2"
//             data-pr-tooltip="PDF"
//             tooltip="Enter your username"
//             tooltipOptions={{ position: "bottom" }}
//           />
//         </div>
//       </div>
//     );
//   };

//   const countryBodyTemplate = (rowData) => {
//     return (
//       <React.Fragment>
//         <span>{rowData.userName_description}</span>
//       </React.Fragment>
//     );
//   };

//   const dateBodyTemplate = (createOn) => {
//     // console.log(createOn.createOn, ".shivani"); // get current timestamp

//     return (
//       <div>
//         {new Intl.DateTimeFormat("en-IN", {
//           year: "2-digit",
//           month: "2-digit",
//           day: "2-digit",
//           hour: "2-digit",
//           minute: "2-digit",
//         }).format(createOn.createOn)}
//       </div>
//     );
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

//   const header = renderHeader();
//   const handleRangeChange = (event) => {
//     const { first, rows } = event;
  
//     setStartIndex(first);
//     setEndIndex(first + rows - 1);
//   };

//   const csvData = [
//     ['userName', 'userName_description', 'reviewer','activity'],
//     ...posts.map((item) => [item.userName, item.userName_description, item.reviewer,item.activity]),
//   ];

//   const downloadPDF = () => {
//     // Assuming you have a PDF file URL
//     const data = {posts};
//     // const pdfURL = 'https://example.com/sample.pdf';

//     // Generate a unique filename for the downloaded file
//     const filename = 'document.pdf';

//     // Trigger file download
//     // FileSaver.saveAs(pdfURL, filename);
//     FileSaver.saveAs(data, filename);
//   };

//   const downloadExcel = () => {
//     // Assuming you have data in Excel format
//     const data = [
//       ['Name', 'Age'],
//       ['John', 25],
//       ['Jane', 30],
      
//     ];

//     // Create a new workbook
//     const workbook = XLSX.utils.book_new();

//     // Create a worksheet and add data
//     const worksheet = XLSX.utils.aoa_to_sheet(data);
//     XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

//     // Convert the workbook to a buffer
//     const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

//     // Create a Blob from the buffer
//     const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });

//     // Generate a unique filename for the downloaded file
//     const filename = 'document.xlsx';

//     // Trigger file download
//     FileSaver.saveAs(blob, filename);
//   };

//   const downloadWord = () => {
//     // Assuming you have data in Word format
//     const wordData = posts
//     // Convert the Word data to a Blob
//     const blob = new Blob([wordData], { type: 'application/msword' });

//     // Generate a unique filename for the downloaded file
//     const filename = 'document.docx';

//     // Trigger file download
//     FileSaver.saveAs(blob, filename);
//   };

  
//   return (
//     <div className="datatable-doc-demo">
//        {/* <button onClick={downloadPDF}>Download PDF</button>
//       <button onClick={downloadExcel}>Download Excel</button>
//       <button onClick={downloadWord}>Download Word</button> */}
    


//       <Button
//         style={{ backgroundColor: "white", color: "black", height: "35px" }}
//         className="p-button-raised p-button  p-button-secondary p-button-text"
//       >
//         <img
//           style={{ width: "17px", marginRight: "10px", height: "15px" }}
//           src={refresh}
//           alt="refresh "
//         />
//         <b>Audit History</b>
//       </Button>
//       <img
//         style={{ height: "53px", float: "right" }}
//         src={Background}
//         alt=" Background "
//       />
//      <br/>
//      <br/>
//       <div>
//       {/* <CSVLink data={csvData} filename="my-data.csv">
//         CSV
//       </CSVLink>&nbsp;
//       <CSVLink data={csvData} filename="my-data.xlsx" target="_blank">
//         Excel
//       </CSVLink> */}





    
   

//         <DataTable
//           ref={dt}
//           value={posts}
//           paginator
//           className="p-datatable-customers"
//           header={header}
//           onRangeChange={handleRangeChange}
//           rows={10}
//           loading={loading}
//           paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
//           // rowsPerPageOptions={[10, 25, 50]}
//           dataKey="id"
//           rowHover
//           size="small"
//           selection={selectedCustomers}
//           onSelectionChange={(e) => setSelectedCustomers(e.value)}
//           filters={filters}
//           filterDisplay="menu"
//           responsiveLayout="scroll"
//           globalFilterFields={[
//             "userName",
//             "activity",
//             "userName_description",
//             "reviewer",
//             "balance",
//             "status",
//           ]}
//           emptyMessage="No documents found."
//           currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
//         >
//           <Column
//             field="activity"
//             header="Activity"
//             sortable
//             filter
//             filterPlaceholder="Search by Activity"
//              style={{ minWidth: "10rem" }}
//           />
         

//           <Column
//             field="userName_description"
//             header="User Name & Description"
//             sortable
//             filterField="userName_description"
//             style={{
//               maxWidth: "200px",
//               minWidth: "70px",
//               textOverflow: "ellipsis",
//               overflow: "hidden",
//               whiteSpace: "nowrap",
//                minWidth: "15rem"
//             }}
//             body={countryBodyTemplate}
//             filter
//             // style={{ minWidth: "4rem" }}
//             filterPlaceholder="Search by userName_description"
//           />

//           <Column
//             field="createOn"
//             header="Activity Date"
//             sortable
//             currentTimestamp
//             filterField="date"
//             dataType="date"
//             body={dateBodyTemplate}
//             style={{ minWidth: "10rem" }}
//             filter
//             filterElement={dateFilterTemplate}
//           />
//         </DataTable>
      
//       </div>
//     </div>
//   );
// }
