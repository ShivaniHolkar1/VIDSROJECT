
import { TabView, TabPanel } from "primereact/tabview";
import { Button } from "primereact/button";

import BookmarkDemo from "./BookmarkDemo";
import BookmarkSection from "./BookmarkSection"
import Bookmark from "../Assets/Bookmark.png";
import Background from "../Assets/Background.png";


const DashboardMain = () => {
  return (
    <div className="tabview-demo">
        {/* <Button
        icon=" pi pi-bookmark"
        style={{ backgroundColor: "white", color: "black" }}
        label="Bookmarks"
        className="p-button-raised p-button-secondary p-button-text p-button-sm"
      />
      <br />
      <br /> */}


<Button
        style={{ backgroundColor: "white", color: "black",  height: "37px" }}
        className="p-button-raised  p-button p-button-secondary p-button-text"
      >
        <img
          style={{ width: "14px",marginRight: "10px", height: "17px" }}
          src={Bookmark}
          alt=" Bookmark "
        />
        <b> Bookmarks</b>
      </Button>
      <img
        style={{ height: "55px", float: "right" }}
        src={Background}
        alt=" Background "
      />
      <br />
      <br />
      <div className="card">
      <TabView  className="tabview-header-icon">
           
           <TabPanel    header="Bookmark Document " >
             <BookmarkDemo></BookmarkDemo>
           </TabPanel>
           <TabPanel    header="Bookmark Section" >
             <BookmarkSection></BookmarkSection>
           </TabPanel>
         </TabView>
      </div>
    </div>
  );
};
export default DashboardMain;
