import { TabView, TabPanel } from "primereact/tabview";
import TreeTableDemo from "./TocDocView"

import NotesView from "./NotesView";


import { Button } from "primereact/button";
import openbook from "../Assets/openbook.png";
import Background from "../Assets/Background.png";

const FinancialDocument = () => {
  return (
    <div className="tabview-demo">
         <Button
          style={{ backgroundColor: "white", color: "black", height: "35px" }}
          className="p-button-raised p-button p-button-secondary p-button-text"
        
        >
          <img
            style={{  marginRight: "10px", height: "25px" ,color:"black"}}
            src={openbook}
            alt="openbook"
          />
          <b>Financial Manuals</b>
        </Button>
        <img
          style={{ height: "53px", float: "right" }}
          src={Background}
          alt=" Background "
        />
        <br />
        <br />
      <div className="card">
        <TabView>
          <TabPanel header="TOC View"  leftIcon="pi pi-book"> 
          < TreeTableDemo />
          </TabPanel>

          <TabPanel header="Notes View"  leftIcon="pi pi-file-edit" >
            <NotesView/>
          </TabPanel>
          
        </TabView>
      </div>
    </div>
  );
};
export default FinancialDocument;
