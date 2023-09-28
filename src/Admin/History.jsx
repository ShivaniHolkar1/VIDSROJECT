import { FilterMatchMode, FilterOperator } from "primereact/api";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import React, { useState, useEffect, useRef } from "react";
import { Button } from "primereact/button";
import axios from "axios";
import { Tooltip } from 'primereact/tooltip';
import Background from "../Assets/Background.png";
import refresh from "../Assets/refresh.png";
import "../App.css";
import "jspdf-autotable";

export default function AuditHistory() {
  const [selectedCustomers, setSelectedCustomers] = useState(null);
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const dt = useRef(null);

  const DOC_FILE_URL = `${process.env.REACT_APP_API_KEY}/AuditHistory/download/excel/${sessionStorage.getItem('emailId')} `;
  const CSV_FILE_URL = `${process.env.REACT_APP_API_KEY}/AuditHistory/download/csv/${sessionStorage.getItem('emailId')} `;
  const PDF_FILE_URL = `${process.env.REACT_APP_API_KEY}/AuditHistory/download/pdf/${sessionStorage.getItem('emailId')} `;

  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    userName: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
    activity: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },

    userName_description: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },



  });
  const [globalFilterValue, setGlobalFilterValue] = useState("");

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_KEY}/AuditHistory/list`)
      .then((res) => {

        setPosts(res.data);
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





  // DOCUMENT DOWNLOAD
  const downloadFileAtURL = (url) => {
    const fileName = url.split("/").pop();
    const aTag = document.createElement("a");
    aTag.href = url;
    aTag.setAttribute("download", fileName);
    document.body.appendChild(aTag);
    aTag.click();
    aTag.remove();
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

        <div>


          <Button
            style={{
              backgroundColor: "green",
              height: "28px",
              width: "28px",
              color: "black",
            }}
            icon="pi pi-file-excel"
            onClick={() => {
              downloadFileAtURL(DOC_FILE_URL);
            }}
            tooltip="XLS "
            tooltipOptions={{ className: "teal-tooltip", position: "bottom" }}
            className="p-button-success mr-2"

          />{" "}



          <Button
            style={{
              backgroundColor: "blue",
              height: "28px",
              width: "28px",
              color: "black",
            }}
            icon="pi pi-file"
            onClick={() => {
              downloadFileAtURL(CSV_FILE_URL);
            }}
            tooltip="CSV  "
            tooltipOptions={{ className: "teal-tooltip", position: "bottom" }}
            className="mr-2"

          />{" "}



          <Button
            style={{
              backgroundColor: "orange",
              height: "28px",
              width: "28px",
              color: "black",
            }}
            icon="pi pi-file-pdf"
            onClick={() => {
              downloadFileAtURL(PDF_FILE_URL);
            }}
            tooltip="PDF "
            tooltipOptions={{ className: "teal-tooltip", position: "bottom" }}
            className="p-button-warning mr-2"

          />{" "}
        </div>
      </div>
    );
  };

  const dateBodyTemplate = (createOn) => {


    return (
      <div>
        {new Intl.DateTimeFormat("en-IN", {
          year: "2-digit",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        }).format(createOn.createOn)}
      </div>
    );
  };

  const countryBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <div>
          <Tooltip position="top" style={{ width: "30%" }} target={`.custom-tooltip-btn-${rowData.id}`}>
            {rowData.userName_description}
          </Tooltip>
          <div className={`custom-tooltip-btn-${rowData.id}`}>
            {rowData.userName_description}
          </div>
        </div>
      </React.Fragment>
    );
  };



  const header = renderHeader();






  return (
    <div className="datatable-doc-demo">


      <Button
        style={{ backgroundColor: "white", color: "black", height: "35px" }}
        className="p-button-raised p-button  p-button-secondary p-button-text"
      >
        <img
          style={{ width: "17px", marginRight: "10px", height: "15px" }}
          src={refresh}
          alt="refresh "
        />
        <b>Audit History</b>
      </Button>
      <img
        style={{ height: "53px", float: "right" }}
        src={Background}
        alt=" Background "
      />
      <br />
      <br />
      <div>
        <DataTable
          ref={dt}
          value={posts}
          paginator
          className="p-datatable-customers"
          header={header}
          stripedRows
          rows={13}
          loading={loading}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"

          dataKey="id"
          rowHover
          size="small"
          selection={selectedCustomers}
          onSelectionChange={(e) => setSelectedCustomers(e.value)}
          filters={filters}
          filterDisplay="menu"
          // responsiveLayout="scroll"
          globalFilterFields={[
            "userName",
            "activity",
            "userName_description",
            "reviewer",
            "balance",
            "status",
          ]}
          emptyMessage="No documents found."
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
        >
          <Column
            field="activity"
            header="Activity"
            sortable
            filter
            filterPlaceholder="Search by Activity"
            style={{ minWidth: "6rem" }}
          />


          <Column
            field="userName_description"
            header="User Name & Description"
            sortable
            filterField="userName_description"
            body={countryBodyTemplate}

            style={{
              maxWidth: "500px",
              textOverflow: "ellipsis",
              overflow: "hidden",
              whiteSpace: "nowrap",
              minWidth: "15rem"
            }}

            filter
            filterPlaceholder="Search by userName_description"
          />

          <Column
            bodyStyle={{ width: "11rem" }}
            field="createOn"
            header="Activity Date"
            sortable
            dataType="date"
            body={dateBodyTemplate}
            style={{ minWidth: "10rem" }}

          />
        </DataTable>

      </div>
    </div>
  );
}

