import React, { Component } from "react";
import { TabView, TabPanel } from "primereact/tabview";
import { SplitButton } from "primereact/splitbutton";
import Email from "./Email";
import Client from "./Client";
import { Button } from "primereact/button";
import Password from "./Password";
import configuration from "../Assets/configuration.png";
import Background from "../Assets/Background.png";

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

  tabHeaderIIITemplate(options) {
    const items = [
      { label: "Update", icon: "pi pi-refresh" },
      { label: "Delete", icon: "pi pi-times" },
      { label: "Upload", icon: "pi pi-upload" },
    ];

    return (
      <SplitButton
        label="Header III"
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
        {/* <img src={ configuration } alt=" configuration " /> */}

        <Button
          style={{ backgroundColor: "white", color: "black", height: "35px" }}
          className="p-button-raised p-button  p-button-secondary p-button-text"
        >
          <img
            style={{ width: "20px",marginRight: "10px", height: "20px" }}
            src={configuration}
            alt=" configuration "
          />
          <b> Configuration</b>
        </Button>
        <img
          style={{ height: "53px", float: "right" }}
          src={Background}
          alt=" Background "
        />
        <br />
        <br />
        <div className="card">
          <TabView className="tabview-header-icon">
            <TabPanel header="Password Configuration">
              <Password></Password>
            </TabPanel>
            {/* <TabPanel header="Client Configuration">
              <Client></Client>
            </TabPanel> */}
            <TabPanel header=" Email & SMTP Configuration">
              <Email></Email>
            </TabPanel>
          </TabView>
        </div>
      </div>
    );
  }
}
