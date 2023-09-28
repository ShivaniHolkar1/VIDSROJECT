



import React, { useState, useEffect } from "react";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import axios from "axios";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { useNavigate } from "react-router-dom";
import { Tooltip } from 'primereact/tooltip';

const Product = () => {
  const [selectedCustomers, setSelectedCustomers] = useState(null);
  const [posts, setPosts] = useState([]);
  const [allFilterData, setAllFilteredData] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [loginUser, setLoginUser] = useState('');

  const statuses = [
    "Updated",
    "Review Pending",
    "Issue Marked",
    "Saved as Draft",
  ];
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    filename: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
    description: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
    uplodedBy: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
    date: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }],
    },
    status: {
      operator: FilterOperator.OR,
      constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
    },
  });
  const [globalFilterValue, setGlobalFilterValue] = useState("");

  const filterData = (allData) => {
    const emailId = sessionStorage.getItem('emailId');
    const filteredData = allData.filter((data) => data.reviewer[0] === emailId);
    setAllFilteredData(filteredData);
  };
  // console.log(allFilterData,"filterdata...///")

  useEffect(() => {
     setLoginUser(sessionStorage.getItem('emailId'));

    axios
      .get(`${process.env.REACT_APP_API_KEY}/sample/getAllDisableDoc`)
      .then((res) => {
        console.log(res.data, "All doc data...!!!");
        filterData(res.data.reverse());
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
          <Tooltip  target={`.custom-tooltip-btn-${rowData.id}`}>
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
        <span>{rowData.uplodedBy}</span>
      </React.Fragment>
    );
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

  const editProduct = (product) => {
    navigate("/reviewerversion/" + product.id);
    console.log(product, " document data by id.....");
  };

  const statusBodyTemplate = (rowData) => {
    return (
      <span
        className={`customer-badge ${rowData.enable ? "status-pending" : "status-approved"}`}
      >
        {rowData.enable ? " Review Pending" : "Approved"}
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

  const dateBodyTemplate = (uploadedDate) => {
    console.log("uploadedDate:",uploadedDate);

    return (
    
      <div>
        {new Intl.DateTimeFormat("en-IN", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit" ,
          hour: "2-digit",
          minute: "2-digit",
        }).format(uploadedDate.timestamp[0])}
      </div>
    );
      }

  const header = renderHeader();

  return (
    <div className="datatable-doc-demo">
      <div className="card">
        <DataTable
          value={allFilterData}
          paginator
          loading={loading}
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
          globalFilterFields={["filename", "description", "uplodedBy", "status"]}
          emptyMessage="No documents found."
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
        >
          <Column
            field="filename"
            header="Document Name"
            sortable
            filter
            filterPlaceholder="Search by Name"
            style={{ minWidth: "10rem" }}
          />

          <Column
            field="description"
            header="Description"
            sortable
            filterField="description"
            style={{
              maxWidth: "200px",
              minWidth: "70px",
              textOverflow: "ellipsis",
              overflow: "hidden",
              whiteSpace: "nowrap",
            }}
            body={countryBodyTemplate}
            filter
            filterPlaceholder="Search by Description"
          />

          <Column
            field="status"
            header="Status"
            sortable
            // filterMenuStyle={{ width: "14rem" }}
            style={{ minWidth: "10rem" }}
            body={statusBodyTemplate}
            // filter
            // filterElement={statusFilterTemplate}
          />

          <Column
            field="uplodedBy"
            header="Sent By"
            sortable
            filterField="uplodedBy"
            style={{ minWidth: "10rem" }}
            body={countryTemplate}
            filter
            filterPlaceholder="Search by Name"
          />

<Column
            field="uploadedDate"
            header="Sent On"
            sortable
            dataType="date"
             body={dateBodyTemplate}
            style={{ minWidth: "10rem" }}
           
          />
          <Column
            header="View"
            body={actionBodyTemplate}
            exportable={false}
          ></Column>
        </DataTable>
      </div>
    </div>
  );
};

export default Product;


