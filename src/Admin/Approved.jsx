import React, { useState, useEffect } from "react";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";

import axios from "axios";
import { Button } from "primereact/button";
import "../App.css";
import {  useNavigate } from "react-router-dom";
import { CustomerService } from "../service/CustomerService";

import { Tooltip } from 'primereact/tooltip';

const Product = () => {
  const [selectedCustomers, setSelectedCustomers] = useState(null);
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const customerService = new CustomerService();
  const [loading, setLoading] = useState(true);
 const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
   

    filename: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },

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
      .get(`${process.env.REACT_APP_API_KEY}/sample/getAllApprovedDocument`)
      .then((res) => {
       setPosts(res.data.reverse());
        setLoading(false);


        
console.log(res.data,"??????")
const uniqueReviewers = [...new Set(res.data.map((doc) => doc.reviewer[0]))];


console.log(uniqueReviewers,"?????/////////?")

      });
   
  },[] );

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };
    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };




  const renderHeader = () => {
    return (
      <div style={{display:"flex"}}>
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
      </div>
    );
  };





  const countryBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <div>
          <Tooltip style={{width:"30%"}} target={`.custom-tooltip-btn-${rowData.id}`}>
            {rowData.description}
          </Tooltip>
          <div className={`custom-tooltip-btn-${rowData.id}`}>
            {rowData.description}
          </div>
        </div>
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




  const actionbodyTemplate = (rowData) => {
  
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

  
  const editProduct = (product) => {
    customerService.docDataById = product;
   
    navigate("/Version/" + product.id);

    console.log(product, " document data by id.....");
  };

  const dateBodyTemplate = (DateApproved) => {
    

    return (
    
      <div>
        {new Intl.DateTimeFormat("en-IN", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit" ,
          hour: "2-digit",
          minute: "2-digit",
        }).format(DateApproved.DateApproved)}
      </div>
    );
      }

  const header = renderHeader();



  return (
    <div className="datatable-doc-demo">
      <div className="card">
        <DataTable
          value={posts}
          paginator
          loading={loading}
          stripedRows
          className="p-datatable-customers"
          header={header}
          rows={7}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          dataKey="id"
          rowHover
          size="small"
          selection={selectedCustomers}
          onSelectionChange={(e) => setSelectedCustomers(e.value)}
          filters={filters}
          filterDisplay="menu"
          responsiveLayout="scroll"
          globalFilterFields={[
            "filename",
            "description",
            "reviewer",
            "balance",
            "status",
          ]}
          emptyMessage="No documents found."
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
        >
          <Column
            field="filename"
            header="Document Name"
            sortable
            style={{
              maxWidth: "200px",
              minWidth: "8rem",
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
              minWidth: "25rem",
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
  filterField="reviewer"
  filterMatchMode="equals"
  style={{ minWidth: "10rem" }}
  filter
  filterPlaceholder="Search by Reviewer"
  body={countryTemplate}
/>

<Column
            field="DateApproved"
            header="Sent On"
            sortable
            dataType="date"
             body={dateBodyTemplate}
            style={{ minWidth: "10rem" }}
           
          />


           <Column header="Action" body={actionbodyTemplate} />
        </DataTable>
      </div>
    </div>
  );
};

export default Product;
