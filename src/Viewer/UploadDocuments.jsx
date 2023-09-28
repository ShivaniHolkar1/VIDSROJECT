import React, { useState } from "react";
import { TabView, TabPanel } from "primereact/tabview";
import DocumentDetails from "./DocumentDetails";
import SelectReviewer from "./SelectReviewer";
import { Button } from "primereact/button";
import DocumentReview from "./DocumentReview";
import { NavLink } from "react-router-dom";

function UploadDocument() {
  const [activeIndex, setActiveIndex] = useState(0);

  const items = [
    { label: "Document Details" },
    { label: "Document Review" },
    { label: "Select Review" },
  ];

  return (
    <div className="card">
    <NavLink to="/DashboardMain" className="link1">
      <Button
        icon=" pi pi-chevron-circle-left"
        style={{ backgroundColor: "white" }}
        label="Review Documents"
        className="p-button-sm p-button-raised p-button-text p-button-plain"
      />
     </NavLink>
      <br />
      <br />

      <TabView
        activeIndex={activeIndex}
        onTabChange={(e) => setActiveIndex(e.index)}
      >
        <TabPanel header="Document Details">
          <DocumentDetails />
        </TabPanel>

        <TabPanel header="Document Review">
          <DocumentReview />
          
        </TabPanel>
        <TabPanel header="Select Reviewer">
          <SelectReviewer />
        </TabPanel>
      </TabView>
    </div>
  );
}
export default UploadDocument;
