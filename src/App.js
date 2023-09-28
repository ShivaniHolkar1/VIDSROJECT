import "./App.css";
import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css"; //icons
import "primeflex/primeflex.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import Sidebar from "./Layouts/Sidebar";
import Reset from "./Auth/Reset";

import LoginWithUser from "./Auth/LoginWithUser";
import Idam from "./Auth/Idam";
import Otp from "./Auth/Otp";
import ConfirmPassword from "./Auth/ConfirmPassword";
import LoginPassword from "./Auth/LoginPassword";
import Navbar from "./Layouts/Navbar";
import NotesView from "./Admin/NotesView";



import DashboardMain from "./Admin/DashboardMain";
import SectionSearch from "./Admin/SectionSearch";
import UploadDocument from "./Admin/UploadDocument";
import ConfigMain from "./Configuration/ConfigMain";
import AuditHistory from "./Admin/History";
import Role from "./Admin/Role";
import UserDetails from "./Admin/UserDetails";
import Version from "./Admin/Version";
import DocumentReview from "./Admin/DocumentReview";
import SelectReviewer from "./Admin/SelectReviewer";
import BookmarkDemo from "./Admin/BookmarkDemo";
import DocumentDetails from "./Admin/DocumentDetails";
import BookmarkSection from "./Admin/BookmarkSection";
import Approved from "./Admin/Approved";
import DraftDoc from "./Admin/DraftDoc";
import SaveAsDraft from "./Admin/SavedAsDraft";
import TocDocView from "./Admin/TocDocView";
import Help from "./Layouts/Help";
import Notification from "./Layouts/Notification"
import ReviewerMain from "./Reviewer/RevieverMain";
import History from "./Reviewer/History";
import ReviewerVersion from "./Reviewer/ReviewerVersion";
import ReviewerSearch from "./Reviewer/ReviewerSearch";
import FinancialDocument from "./Admin/FinacialDocument";



import Userversion from "./Viewer/Userversion";
import UserSearch from "./Viewer/UserSearch";
import BookmarkDoc from "./Viewer/BookmarkDoc";

function App() {
  return (
    <div className="App">
       
      <BrowserRouter>
      
    
      
        <Sidebar></Sidebar>
        <div className="allRoutes">
       

        <Routes>
        <Route path="/" element={<LoginWithUser  />}></Route>
        <Route path="/Login" element={<Login />}></Route>
        <Route path="/Idam" element={<Idam />}></Route>
        <Route path="/register" element={<Register />}></Route>
         <Route path="/reset" element={<Reset />} ></Route>
         <Route path="/Otp" element={<Otp />} ></Route>
         <Route path="/ConfirmPassword" element={< ConfirmPassword/>} ></Route>
         <Route path="/LoginPassword" element={< LoginPassword/>} ></Route>
         <Route path="/Navbar" element={< Navbar/>} ></Route>
         <Route path="/help" element={<Help />} />
          
          <Route path="dashboardMain" element={<DashboardMain />}></Route>
          <Route path="sectionSearch" element={<SectionSearch />} />
          <Route path="configMain" element={<ConfigMain />} />
          <Route path="history" element={<AuditHistory />} />
          <Route path="role" element={<Role />} />
          <Route path="UserDetails" element={<UserDetails />} />
          <Route path="UploadDocument" element={<UploadDocument />} />
          <Route path="/version/:id" element={<Version />} />
          <Route path="/documentReview/:docId" element={<DocumentReview />} />
          <Route path="/DraftDoc/:docId" element={<DraftDoc />} />
          <Route path="/selectReviewer/:docId" element={<SelectReviewer />} />
          <Route path="bookmarkdemo" element={<BookmarkDemo />} />
          <Route path="documentdetails" element={<DocumentDetails />} />
          <Route path="BookmarkSection" element={<BookmarkSection />} />
          <Route path="Approved" element={<Approved />} />
          <Route path="saveAsDraft" element={<SaveAsDraft />} />
          <Route path="notification" element={<Notification />} />
          <Route path="tocDocView" element={<TocDocView />} />
           {/* <Route path="notesView" element={<NotesView />} />
         <Route path="FinacialDocument" element={<FinancialDocument />} /> */}

          <Route path="reviewermain" element={<ReviewerMain />}></Route>
          <Route path="history" element={<History />} />
          <Route path="ReviewerSearch" element={<ReviewerSearch />} />
          <Route path="/reviewerversion/:id" element={<ReviewerVersion />} />
          {/* <Route path="FinacialDocument" element={<FinancialDocument />} /> */}
          <Route path="tocDocView" element={<TocDocView />} />
          {/* <Route path="notesView" element={<NotesView />} /> */}


          <Route path="bookmarkdoc" element={<BookmarkDoc />} />
          <Route path="/userversion/:id" element={<Userversion />} />
          <Route path="usersearch" element={<UserSearch />} />
          {/* <Route path="FinacialDocument" element={<FinancialDocument />} /> */}
           <Route path="tocDocView" element={<TocDocView />} />
           {/* <Route path="notesView" element={<NotesView />} /> */}


        
        </Routes>
       
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
