import React, { Component } from "react";
import { TabView, TabPanel } from "primereact/tabview";
import { SplitButton } from "primereact/splitbutton";
import ReviewerDoc from "./ReviewerDoc";
import Bookmark from "./Bookmark";


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
          <TabView  className="tabview-header-icon innerTab">
            <TabPanel header="Documents" leftIcon=" pi pi-file">
              <ReviewerDoc className="innerTab"></ReviewerDoc>
             
            </TabPanel>
          
            <TabPanel    header="Bookmarks" leftIcon= " pi pi-bookmark">
              <Bookmark className="innerTab"></Bookmark>
            </TabPanel>
           
          </TabView>
        </div>
      </div>
    );
  }
}
