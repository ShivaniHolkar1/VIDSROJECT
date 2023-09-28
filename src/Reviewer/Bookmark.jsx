import React, { Component } from "react";
import { TabView, TabPanel } from "primereact/tabview";
import { SplitButton } from "primereact/splitbutton";

import BookmarkDemo from "./BookmarkDemo";
import BookmarkSection from "./BookmarkSection"
import { Card } from "primereact/card";

export default class DashboardMain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex1: 1,
      activeIndex2: 0,
    };

    this.tabHeaderITemplate = this.tabHeaderITemplate.bind(this);
    this.tabHeaderIITemplate = this.tabHeaderIITemplate.bind(this);
    this.tabHeaderIIITemplate = this.tabHeaderIIITemplate.bind(this);
    this.tabHeaderIVTemplate = this.tabHeaderIVTemplate.bind(this);
   
    
    // this.tabHeaderIVTemplate = this.tabHeaderIVTemplate.bind(this);
  }

  tabHeaderITemplate(options) {
    return (
      <button
        type="button"
        onClick={options.onClick}
        className={options.className}
      >
        <i className="pi pi-prime mr-2" />
        {options.titleElement}
      </button>
    );
  }



  tabHeaderIVTemplate(options) {
    return (
      <button
        type="button"
        onClick={options.onClick}
        className={options.className}
      >
        <i className="pi pi-prime mr-2" />
        {options.titleElement}
      </button>
    );
  }

  tabHeaderIIITemplate(options) {
    const items = [
      { label: "Update", icon: "pi pi-refresh" },
      { label: "Delete", icon: "pi pi-times" },
      { label: "Upload", icon: "pi pi-upload" },
      { label: "Upload", icon: "pi pi-upload" },
    ];

    return (
      <SplitButton
        label="Header IV"
        icon="pi pi-plus"
        onClick={options.onClick}
        className="px-2"
        model={items}
      ></SplitButton>
    );
  }

  tabHeaderIITemplate(options) {
    return (
      <div
        className="flex align-items-center px-3"
        style={{ cursor: "pointer" }}
        onClick={options.onClick}
      ></div>
    );
  }

  render() {
    return (
      <div className="tabview-demo">
        <div className="card">
     
          <TabView  className="tabview-header-icon">
           
            <TabPanel    header="Bookmark Document ">
              <BookmarkDemo></BookmarkDemo>
            </TabPanel>
            <TabPanel    header="Bookmark Section">
              <BookmarkSection></BookmarkSection>
            </TabPanel>
          </TabView>
      
        </div>
      </div>
    );
  }
}
