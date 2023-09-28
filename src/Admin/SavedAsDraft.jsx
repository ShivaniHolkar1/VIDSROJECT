import React, { useState, useEffect } from "react";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../App.css";
import { Tooltip } from 'primereact/tooltip';

const SaveasDraft = () => {
  const [selectedCustomers, setSelectedCustomers] = useState(null);
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

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
    axios
      .get(`${process.env.REACT_APP_API_KEY}/document/listSaveAsDraft`)
      .then((res) => {
        setPosts(res.data.reverse());

        setLoading(false);
      });
  }, []);

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
        <div>
          <Tooltip style={{width:"30%"}} target={`.custom-tooltip-btn-${rowData.docId}`}>
            {rowData.description}
          </Tooltip>
          <div className={`custom-tooltip-btn-${rowData.docId}`}>
            {rowData.description}
          </div>
        </div>
      </React.Fragment>
    );
  };
  


  const dateBodyTemplate = (uploadedDate) => {
  

    return (
      <div>
        {new Intl.DateTimeFormat("en-IN", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit" ,
          hour: "2-digit",
          minute: "2-digit",
        }).format(uploadedDate.uploadedDate)}
      </div>
    );
  };

  

  const header = renderHeader();

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-folder-open"
          className="nextBtn p-button-sm"
          onClick={() => editProduct(rowData)}
          style={{
            backgroundColor: "#203570",
            height: 30,
            width: 30,
            borderRadius: "2px",
          }}
        />
      </React.Fragment>
    );
  };

  const editProduct = (rowData) => {
    navigate("/DraftDoc/" + rowData.docId);
  };

  return (
    <div className="datatable-doc-demo">
      <div className="card">
        <DataTable
          value={posts}
          paginator
          className="p-datatable-customers"
          header={header}
          rows={7}
          stripedRows
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          loading={loading}
          dataKey="id"
          rowHover
          size="small"
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
            style={{
              maxWidth: "200px",
              minWidth: "12rem",
              textOverflow: "ellipsis",
              overflow: "hidden",
              whiteSpace: "nowrap",
            }}
            filter
            filterPlaceholder="Search by Name"
           
          />

          <Column
            field="description"
            header="Description"
            sortable
            filterField="description"
            style={{
              maxWidth: "170px",
              minWidth: "20rem",
              textOverflow: "ellipsis",
              overflow: "hidden",
              whiteSpace: "nowrap",
            }}
            body={countryBodyTemplate}
            filter
            filterPlaceholder="Search by Description"
          />

          <Column
            field="reviewer"
            header="Reviewer"
            sortable
            filter
            filterPlaceholder="Search by Reviewer"
            style={{ minWidth: "10rem" }}
          />


 

          <Column
            field="uploadedDate"
            header="Sent On"
            sortable
            dataType="date"
            body={dateBodyTemplate}
            
          />



          <Column
            header="View"
            body={(e) => actionBodyTemplate(e)}
            exportable={false}
          ></Column>
        </DataTable>
      </div>
    </div>
  );
};

export default SaveasDraft;
