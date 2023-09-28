import React, { useState } from "react";
import { TabView, TabPanel } from "primereact/tabview";
import DocumentDetails from "./DocumentDetails";
import SelectReviewer from "./SelectReviewer";
import { Button } from "primereact/button";
import DocumentReview from "./DocumentReview";
import { NavLink } from "react-router-dom";
import leftIcon from "../Assets/lefticon.png";
import Background from "../Assets/Background.png";

function UploadDocument() {
  const [activeIndex, setActiveIndex] = useState(0);
 

  return (
    <div className="card">
  <NavLink to="/DashboardMain" className="link1">
<Button
  style={{ backgroundColor: "white", color: "black",  height: "37px" }}
  className="p-button-raised  p-button p-button-secondary p-button-text"
>
  <img
    style={{width: "25px",marginRight: "10px", height: "25px" }}
    src={leftIcon}
    alt="leftIcon "
  />
  <b> Upload Document</b>
</Button>
</NavLink>
<img
  style={{ height: "55px", float: "right" }}
  src={Background}
  alt=" Background "
/>

<br />
<br />




      <TabView
       
        activeIndex={activeIndex}
         onTabChange={(e) => setActiveIndex(e.index)}
       
      >
        <TabPanel  header="Document Details" >
         
          <DocumentDetails />
         
        </TabPanel>

        <TabPanel disabled header="Document Review"  >
          <DocumentReview />
        </TabPanel>
        <TabPanel  disabled header="Select Reviewer" >
          <SelectReviewer />
        </TabPanel>
      </TabView>
    </div>
  );
}
export default UploadDocument;
