import React, { useState, useEffect,useRef } from "react";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import axios from "axios";

const Product = () => {
  const [selectedCustomers, setSelectedCustomers] = useState(null);
  const [bookmark, setBookmark] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useRef(null);
  const [createdBy, setLoginUser] = useState();


  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    documentName: {
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

  

  useEffect(() => {
    setLoginUser(sessionStorage.getItem('emailId'));

    const fetchData = async () => {
      try {
        const { data: response } = await axios.get(
          `${process.env.REACT_APP_API_KEY}/document/list/${sessionStorage.getItem('emailId')}`
        );
        setBookmark(response.reverse());
      } catch (error) {
        console.error(error.message);
      }
      setLoading(false);
    };
    

    fetchData();
  }, []);

 


 
 ////BOOKMARK DOCUMENT DOWNLOAD
 const version ="version1"
  const downloadFileAtURL = (rowData) => {
    const url = `${process.env.REACT_APP_API_KEY}/document/downloadFile/${rowData.docId}/${version}/${sessionStorage.getItem('emailId')}`;
    console.log(rowData, " file to be download");
    const fileName = url.split("/").pop();
    const aTag = document.createElement("a");
    aTag.href = url;
    aTag.setAttribute("download", fileName);
    document.body.appendChild(aTag);
    aTag.click();
    aTag.remove();
  };

  const docDownload = () => {
    toast.current.show({
      severity: "success",
      summary: "Document Download Successfully",
      detail: "Document Download",
      life: 6000,
    });
  };

  const BookmarkTemplate = (rowData) => {
    

    return (   


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
          onMouseDown={docDownload}
          tooltip="Download "
          tooltipOptions={{ className: "teal-tooltip", position: "bottom" }}
          className="p-button-raised  p-button-text"
         
        />
      
    );
  };





  const dateBodyTemplate = (createdOn) => {

    return (
    
      <div>
        {new Intl.DateTimeFormat("en-IN", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit" ,
          hour: "2-digit",
          minute: "2-digit",
        }).format(createdOn.createdOn)}
      </div>
    );
      }
 

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };
    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };
;
  const renderHeader = () => {
    return (
      <div className="flex justify-content-between align-items-center">
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            value={globalFilterValue}
            onChange={onGlobalFilterChange}
            placeholder=" Search"
            className="p-inputtext-sm"
          />
        </span>

      </div>
    );
  };

  const countryTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span>{rowData.reviewer}</span>
      </React.Fragment>
    );
  };

  

  const header = renderHeader();

  return (
    <>
     <Toast ref={toast} />
    
    <div  className="datatable-doc-demo">
     
      <div  className="card">
        <DataTable
          value={bookmark}
          paginator
          className="p-datatable-customers"
          header={header}
          rows={6}
          loading={loading}
          stripedRows
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          dataKey="id"
          rowHover
          selection={selectedCustomers}
          onSelectionChange={(e) => setSelectedCustomers(e.value)}
          filters={filters}
          filterDisplay="menu"
          globalFilterFields={[
            "documentName",
            "description",
            "reviewer",
            "balance",
            "status",
          ]}
          emptyMessage="No documents found."
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
        >
          <Column
            field="documentName"
            header="Document Name"
            sortable
            filter
            style={{
              maxWidth: "200px",
              minWidth: "18rem",
              textOverflow: "ellipsis",
              overflow: "hidden",
              whiteSpace: "nowrap",
            }}
            filterPlaceholder="Search by Name"
           
          />

         <Column
            field="Reviewer"
            header="Reviewer"
            sortable
            filterField="reviewer"
            style={{ minWidth: "8rem" }}
            body={countryTemplate}
            filter
            filterPlaceholder="Search by Reviewer"
          />



          <Column
            field="createdOn"
            header="Sent On"
            sortable
            dataType="date"
             body={dateBodyTemplate}
            style={{ minWidth: "10rem" }}
           
          />
      <Column header="Action"   style={{ minWidth: "4rem" }} body={BookmarkTemplate} />
        </DataTable>
      </div>
    </div>
    </>
  );
};

export default Product;
