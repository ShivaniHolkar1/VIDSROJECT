import React, { useState, useEffect, useRef } from "react";
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
  const toast = useRef(null);
  const [createdBy, setLoginUser] = useState();
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    sectionName: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },

    description: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },

    reviwer: {
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
  // const statuses = [
  //   "Updated",
  //   "Review Pending",
  //   "Issue Marked",
  //   "Saved as Draft",
  // ];


  useEffect(() => {
    setLoginUser(sessionStorage.getItem('emailId'));
    
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get(
          `${process.env.REACT_APP_API_KEY}/document/SectionBookmarksList/${sessionStorage.getItem('emailId')}`
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
  const downloadFileAtURL = (rowData) => {
    const url = `${process.env.REACT_APP_API_KEY}/document/downloadSec/${rowData.secId}/${sessionStorage.getItem('emailId')}`;
    console.log(rowData, " file to be download");
    const fileName = url.split("/").pop();
    const aTag = document.createElement("a");
    aTag.href = url;
    aTag.setAttribute("download", fileName);
    document.body.appendChild(aTag);
    aTag.click();
    aTag.remove();
  };

  const BookmarkTemplate = (rowData) => {

    const showSuccess4 = () => {
      toast.current.show({
        severity: "success",
        summary: "Section Download Successfully",
        detail: "Section Download",
        life: 3000,
      });
    };

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
        onMouseDown={showSuccess4}
        tooltip="Download "
        tooltipOptions={{ className: "teal-tooltip", position: "bottom" }}
        className="p-button-raised  p-button-text"

      />
    );
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
        <span>{rowData.reviwer}</span>
      </React.Fragment>
    );
  };





  const header = renderHeader();





  const dateBodyTemplate = (bookmarkBy) => {


    return (

      <div>
        {new Intl.DateTimeFormat("en-IN", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit" ,
          hour: "2-digit",
          minute: "2-digit",
        }).format(bookmarkBy.bookmarkBy)}
      </div>
    );
  }





  return (

    <div className="datatable-doc-demo">
      <Toast ref={toast} />
      <div className="card">
        <DataTable
          value={bookmark}
          paginator
          stripedRows
          className="p-datatable-customers"
          header={header}
          rows={6}
          loading={loading}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          dataKey="id"
          rowHover
          selection={selectedCustomers}
          onSelectionChange={(e) => setSelectedCustomers(e.value)}
          filters={filters}
          filterDisplay="menu"
          responsiveLayout="scroll"
          globalFilterFields={[
            "sectionName",
            "description",
            "reviwer",
            "balance",
            "status",
          ]}
          emptyMessage="No documents found."
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
        >
          <Column
            field="sectionName"
            header="Section Name"
            sortable
            style={{
              maxWidth: "200px",
              minWidth: "18rem",
              textOverflow: "ellipsis",
              overflow: "hidden",
              whiteSpace: "nowrap",
            }}
            filter
            filterPlaceholder="Search by Name"

          />



          <Column
            field="reviwer"
            header="Reviewer"
            sortable
            filterField="reviwer"
            style={{ minWidth: "10rem" }}
            body={countryTemplate}
            filter
            filterPlaceholder="Search by Reviewer"
          />







          <Column
            field="DateApproved "
            header="Sent On"
            sortable

            dataType="date"
            body={dateBodyTemplate}
            style={{ minWidth: "10rem" }}

          />




          <Column
            header="Action"
            style={{ minWidth: "4rem" }}
            body={BookmarkTemplate}

          />
        </DataTable>
      </div>
    </div>
  );
};

export default Product;
