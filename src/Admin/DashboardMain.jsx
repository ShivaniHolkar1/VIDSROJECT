import { TabView, TabPanel } from "primereact/tabview";
import Document from "./Document";
import Bookmark from "./Bookmark";
import Approved from "./Approved";
import SavedAsDraft from "./SavedAsDraft";
import { Button } from "primereact/button";
import document from "../Assets/document.png";
import Background from "../Assets/Background.png";

const DashboardMain = () => {
  return (
    <div className="tabview-demo">
         <Button
          style={{ backgroundColor: "white", color: "black", height: "35px" }}
          className="p-button-raised p-button p-button-secondary p-button-text"
        
        >
          <img
            style={{  marginRight: "10px", height: "15px" }}
            src={document}
            alt="document"
          />
          <b>Document Management</b>
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
          <TabPanel header="Sent for Review"  leftIcon="pi pi-file"> 
            <Document></Document>
          </TabPanel>

          <TabPanel  leftIcon="pi pi-verified" header="Approved ">
            <Approved></Approved>
          </TabPanel>
          <TabPanel header="Bookmarks" leftIcon=" pi pi-bookmark">
            <Bookmark className="innerTab"></Bookmark>
          </TabPanel>
          <TabPanel header="Save As Draft" leftIcon=" pi pi-file-edit">
            <SavedAsDraft className="innerTab"></SavedAsDraft>
          </TabPanel>
        </TabView>
      </div>
    </div>
  );
};
export default DashboardMain;

